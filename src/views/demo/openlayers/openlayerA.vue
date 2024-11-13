<!-- openlayer地图 -->
<template>
	<div id="map"></div>
</template>

<script>
import { Map, View } from "ol";
// 图层
import { Vector, Tile } from "ol/layer";
// openLayers自带的数据源
import OSM from "ol/source/OSM";
// 其他地图的数据源
import XYZ from "ol/source/XYZ";
import "ol/ol.css";

// 图形
import { Point, LineString, Polygon, Circle } from "ol/geom";
// 样式
import { Style, Icon, Fill, Stroke } from "ol/style";
import { format } from "ol/coordinate";
import MousePosition from "ol/control/MousePosition.js";
// 几何图形类
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";

import pointUrl from "@/assets/marker.png";

export default {
	name: "openlayerA",
	components: {},
	props: {},
	data() {
		return {
			// 缩放层级
			zoom: 16,
			//   定位中心点
			center: {
				lon: 113.27,
				lat: 23.13,
			},
			map: null,
			point: null,
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.initMap();
	},

	methods: {
		initMap() {
			let tileOSM = new Tile({
				// ol自带的数据源
				source: new OSM(),
				// 如果要引入其他地图的数据源，通过XYZ引入
				// source: new XYZ({
				//   url: "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=你的密钥，",
				// }),
			});

			let view = new View({
				zoom: this.zoom,
				center: [this.center.lon, this.center.lat],
				//坐标系
				projection: "EPSG:4326",
			});
			// 建议将map实例放在全局变量中，如果放在data中，数据量太大会造成ol卡死
			this.map = new Map({
				layers: [tileOSM],
				view,
				target: "map",
			});

			// 绘制点
			const point = this.createPoint([113.27, 23.13]);
			this.map.addLayer(point);

			// 绘制线
			const line = this.createLine([
				[113.266674, 23.133626],
				[113.267876, 23.130086],
			]);
			this.map.addLayer(line);

			// 需要注意的是，画面的数据格式是三维数组
			const polygon = this.createPolygon([
				[
					[113.270665, 23.130365],
					[113.274807, 23.131674],
					[113.274485, 23.127876],
				],
			]);
			this.map.addLayer(polygon);

			// 点击事件
			this.map.on("click", (e) => {
				if (this.point) {
					this.point.getSource().clear();
					this.map.removeLayer(this.point);
				}

				// 画点,将point的矢量图层保存下来，
				this.point = this.createPoint(e.coordinate);
				this.map.addLayer(this.point);
			});
		},
		/** 给矢量图层添加style有两种方式，一种是给style属性赋值一个方法，在方法中将style返回，
                返回时style必须是一个数组，另外一种就是直接给style属性赋值对象，第一种方式可以同时添加多个
                Style的实例对象，只需要将它们都放在同一个数组中即可，而第二种方式只能添加一个Style的实例对象。
                let vector = new Vector({
                source: vectorSource,
                style: new Style({
                image: new Icon({
                    anchorXUnits: "pixels",
                    anchorYUnits: "pixels",
                    src: require("../assets/images/position.png"),
                    scale: 0.2,
                }),
                }),
            });
            */
		// 画点
		createPoint(coordinates) {
			let styleList = [
				new Style({
					image: new Icon({
						// anchorXUnits: "pixels",
						// anchorYUnits: "pixels",
						src: pointUrl,
						scale: 0.5,
					}),
				}),
			];
			let point = new Point(coordinates);

			return this.createLayer(point, styleList);
		},
		// 画线
		createLine(coordinates) {
			let line = new LineString(coordinates);

			let styleList = [
				new Style({
					stroke: new Stroke({
						color: "#f00",
						width: 2,
					}),
				}),
			];

			return this.createLayer(line, styleList);
		},
		// 画多边形
		createPolygon(coordinates) {
			let polygon = new Polygon(coordinates);

			let styleList = [
				new Style({
					stroke: new Stroke({
						color: "#EE82EE",
						width: 1,
					}),

					fill: new Fill({
						color: "rgba(238,130,238, 0.25)",
					}),
				}),
			];

			return this.createLayer(polygon, styleList);
		},
		/**
		 * 绘制图层
		 * @param { Object }  source 数据源
		 * @param { Array }  style  style数组
		 */
		createLayer(source, style) {
			let feature = new Feature(source);
			let vectorSource = new VectorSource({
				features: [feature],
			});

			let vector = new Vector({
				source: vectorSource,
				style: function (feature) {
					return style;
				},
			});
			return vector;
		},
	},
};
</script>
<style lang="scss" scoped>
#map {
	height: 94vh;
}
// 去除右下角水印
::v-deep .ol-attribution {
	display: none;
}
// 去除左上角控制栏
::v-deep .ol-control {
	display: none;
}
</style>
