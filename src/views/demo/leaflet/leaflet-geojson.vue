<!-- 测试geojson -->
<template>
	<div class="leaflet-geojson">
		<InitMap class="map-box" @mapLoad="mapLoad" />
	</div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// 修复 Leaflet 默认图标路径问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import geojson from "@/views/demo/leaflet/map.json";
export default {
	name: "leaflet-geojson",
	components: {
		InitMap: () => import("./initMap.vue"),
	},
	props: {},
	data() {
		return {
			map: null,
			tileLayer: null,
			imageOverLay: null,
			bounds: [
				[0, 0],
				[0, 0],
			],
			geojson: {
				type: "Feature",
				properties: {
					name: "Coors Field",
					amenity: "Baseball Stadium",
					popupContent: "This is where the Rockies play!",
				},
				geometry: {
					// type: "Point",
					// coordinates: [104, 39],
					type: "LineString",
					coordinates: [
						[113.9213, 0.7892],
						[53.8478, 23.421],
						[101.97, 4.21],
					],
				},
			},
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},

	methods: {
		mapLoad(map) {
			this.map = map;
			this.map.options.crs = L.CRS.Simple; // 设置坐标系
			this.map.setMinZoom(-3);
			// this.getMapInfo();
			this.addGeojson();
			// 设置语言为中文
			this.map.pm.setLang("zh");
			this.addControls();
			this.customDrawingStyle();
			// 监听绘制完成事件
			this.map.on("pm:create", this.pmCreate);

			// 监听图形删除事件
			this.map.on("pm:remove", this.pmRemove);
		},
		// 获取底图信息并设置
		getMapInfo() {
			let img = new Image();
			let url = require("@/assets/gdjx.png");
			img.src = url;
			img.onload = () => {
				const w = img.width;
				const h = img.height;
				this.bounds = [
					[0, 0],
					[h, w],
				];
				// 判断当前是否第一次加载地图图层
				if (this.imageOverLay) {
					this.imageOverLay.setUrl(url);
					this.imageOverLay.setBounds(this.bounds);
					console.log("非第一次加载地图---", url, this.bounds);
				} else {
					this.imageOverLay = L.imageOverlay(url, this.bounds, {
						interactive: true, //允许地图触发事件
					}).addTo(this.map);
					console.log("首次加载地图---", this.bounds);
				}
				this.map.fitBounds(this.bounds);
			};
		},
		addGeojson() {
			const data = this.convertToGeoJSON(geojson);
			// 使用L.geoJSON显示数据，并自定义样式和交互
			const geoJsonLayer = L.geoJSON(data, {
				style: function (feature) {
					return {
						fillColor: feature.properties.fill, // 使用属性中的填充颜色
						color: feature.properties.stroke, // 使用属性中的颜色
						weight: 5,
						opacity: 1,
						fillOpacity: 0.7,
					};
				},
				onEachFeature: function (feature, layer) {
					// 为每个 feature 绑定弹出层，显示名称
					if (feature.properties && feature.properties.title) {
						layer.bindPopup(`
        <strong>${feature.properties.title}</strong><br>
        Type: ${feature.properties.typeTitle}<br>
        Connect Point: ${feature.properties.connectPoint.x}, ${feature.properties.connectPoint.y}
      `);
					}
				},
			}).addTo(this.map);

			// 计算 GeoJSON 数据的边界并自动缩放
			const geoJsonBounds = geoJsonLayer.getBounds();
			this.map.fitBounds(geoJsonBounds);

			// 在每个多边形的中心添加标题
			data.features.forEach((feature) => {
				if (feature.properties && feature.properties.title && feature.properties.center) {
					const center = feature.properties.center;
					const title = feature.properties.title;

					// 创建包含标题的标记
					L.marker(center, {
						icon: L.divIcon({
							className: "polygon-title",
							html: `<span">${title}</span>`,
							iconSize: [100, 20],
						}),
					}).addTo(this.map);
				}
			});
		},
		// 数据转换
		convertToGeoJSON(data) {
			// 初始化 GeoJSON 对象
			const geoJSON = {
				type: "FeatureCollection",
				features: [],
			};

			data.forEach((item) => {
				// 解析点的坐标，生成坐标数组
				const points = item.points || "";
				const coordinates = points.split(" ").map((point) => {
					const [x, y] = point.split(",").map(parseFloat);
					return [x, y];
				});

				// 创建一个 Feature 对象
				const feature = {
					type: "Feature",
					geometry: {
						type: "Polygon",
						coordinates: [coordinates], // GeoJSON 中的坐标格式要求多边形的数组
					},
					properties: {
						// 你可以在这里添加其他属性字段，例如:
						title: item.attrTitle || null,
						fill: item.type.fill || "#3388ff", // 默认填充颜色
						stroke: item.type.stroke || "#3388ff", // 默认描边颜色
						connectPoint: item.connectPoint || null,
						typeTitle: item.type.title || null,
					},
				};

				// const center = this.getPolygonCentroid(coordinates);
				const center = [item.attrDataY, item.attrDataX];
				feature.properties.center = center;

				// 添加到 features 列表中
				geoJSON.features.push(feature);
			});

			return geoJSON;
		},
		// 计算多边形的质心（中心）
		getPolygonCentroid(points) {
			let area = 0;
			let x = 0;
			let y = 0;
			const count = points.length;

			// 使用多边形质心计算公式
			for (let i = 0; i < count; i++) {
				const [x1, y1] = points[i];
				const [x2, y2] = points[(i + 1) % count];

				const crossProduct = x1 * y2 - x2 * y1;
				area += crossProduct;
				x += (x1 + x2) * crossProduct;
				y += (y1 + y2) * crossProduct;
			}

			area *= 0.5;
			const factor = 1 / (6 * area);
			return [y * factor, x * factor];
		},
		// 添加控件
		addControls() {
			this.map.pm.addControls({
				position: "topright",
				drawCircleMarker: false, // 禁用绘制圆标记
				rotateMode: false, // 禁用旋转模式
			});
		},
		// 自定义绘制样式
		customDrawingStyle() {
			this.map.pm.setPathOptions(
				{
					color: "orange", // 线的颜色
					fillColor: "green", // 填充的颜色
					fillOpacity: 0.4, // 填充的透明度
				},
				{
					ignoreShapes: ["Circle"], // 忽略某些图形的更改
				}
			);
		},
		// 绘制完成事件
		pmCreate(event) {
			console.log("绘制完成事件", event);

			const layer = event.layer;
			const shapeType = event.shape; // 获取绘制图形的类型

			let coordinates = [];

			// 根据绘制图形的类型获取坐标集合
			switch (shapeType) {
				case "Polygon":
					coordinates = layer._latlngs[0];
					break;
				case "Rectangle":
					coordinates = layer._latlngs[0];
					break;
				case "Circle":
					const center = layer._latlngs;
					const radius = layer.getRadius();
					console.log("圆形", center, radius);
					// 这里可以根据需要将圆形转换为多边形，以便获得更多点的坐标
					// coordinates = convertCircleToPolygon(center, radius, numPoints);
					break;
				default:
					break;
			}

			console.log("绘制图形点位", coordinates);
		},
		// 图形删除事件
		pmRemove(e) {
			// 关闭全局删除模式
			this.map.pm.disableGlobalRemovalMode();
		},
	},
};
</script>
<style lang="scss" scoped>
.leaflet-geojson {
	width: 100%;
	height: 100%;
	.map-box {
		width: 100%;
		height: calc(100vh - 90px);
	}
}
</style>
