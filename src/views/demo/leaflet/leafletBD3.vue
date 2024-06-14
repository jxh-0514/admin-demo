<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2024-06-14 14:50:58
 * @LastEditors: 杭
 * @LastEditTime: 2024-06-14 15:46:05
-->
<!-- leaflet中切换百度和图片图层 -->
<template>
	<div class="leaflet-container">
		<InitMap class="map-box" @mapLoad="mapLoad" />
		<el-button type="primary" @click="onSwitchMapMode">切换底图</el-button>
	</div>
</template>

<script>
import L from "leaflet";
// import "leaflet-plugin-trackplayback";
// import "leaflet-plugin-trackplayback/dist/control.trackplayback";
// import "leaflet-plugin-trackplayback/dist/control.playback.css";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import startPic from "@/assets/start.png";
import endPic from "@/assets/end.png";
export default {
	name: "",
	components: {
		InitMap: () => import("./initMap.vue"),
	},
	props: {},
	data() {
		return {
			map: null,
			imageOverLay: null,
			//mapType: 3, // mapType:3 --- 百度  mapType:0 --- 室内图
			bounds: [
				[0, 0],
				[0, 0],
			],
			mapList: [
				{
					id: 1,
					mapID: "BAIDU",
					mapName: "百度地图",
					mapType: 3,
					webUrl: "http://map.baidu.com",
				},
				{
					id: 2,
					mapID: "njn",
					mapName: "南京南站",
					mapType: 0,
					webUrl: "/Upload/20240606154231443Bd4.jpg",
				},
			],
			lineData: [], // 轨迹数据
			trackLength: 0, // 切片数据长度
			currentIndex: 0, // 当前切片下标
			polyline: null,
			trackplayback: null,
			trackplaybackControl: null,
			currentTrackIndex: 0, // 当前轨迹下标
			timer: null,
			startAndEndMarkers: [], //存放起始图标
			Options: {
				clockOptions: {
					speed: 1,
					maxSpeed: 10,
				},
				// 轨迹点配置项
				trackPointOptions: {
					isDraw: false,
					useCanvas: true,
					stroke: false,
					color: "#ef0300",
					fill: true,
					fillColor: "#ef0300",
					opacity: 1,
					radius: 4,
				},
				// 轨迹线配置项
				trackLineOptions: {
					isDraw: true,
					stroke: true,
					// color: "#1C54E2",
					color: "#ccc",
					weight: 4,
					fill: false,
					fillColor: "#000",
					opacity: 1,
				},
				targetOptions: {
					useImg: true,
					imgUrl: icon,
					width: 25,
					height: 25,
					color: "#fff",
					fillColor: "#9FD12D",
				},
			},
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {
		this.clearTime();
		this.clearMapLayers();
		if (this.map) {
			this.map = null;
		}
	},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},

	methods: {
		mapLoad(map) {
			this.map = map;
		},
		// 获取底图信息并设置
		getMapInfo(data) {
			if (Object.keys(data).length === 0) return; // 判断非leaflet地图，跳过后续步骤
			let img = new Image();
			// let url = this.$baseUrl + data.webUrl;
			let url = require("@/assets/aa.jpg");
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
				// this.map.fitBounds(this.bounds);
			};
		},
		drawLine(lineData) {
			if (this.polyline) {
				console.log("清除上一条轨迹线");
				this.map.removeLayer(this.polyline);
				this.polyline = null;
			}
			if (this.startAndEndMarkers.length > 0) {
				// 清除起始图标
				for (let i = 0; i < this.startAndEndMarkers.length; i++) {
					this.startAndEndMarkers[i].removeFrom(this.map);
				}
			}
			this.polyline = L.polyline(lineData, {
				weight: 4,
				className: "dashLines",
			}).addTo(this.map);

			// 创建起点和终点标记
			const startMarker = L.marker(this.lineData[0]).addTo(this.map);
			const endMarker = L.marker(this.lineData[this.lineData.length - 1]).addTo(this.map);
			// 设置标记的图标
			startMarker.setIcon(
				L.icon({
					iconUrl: startPic,
					iconSize: [40, 40], // 图标大小
					iconAnchor: [20, 40], // 图标定位点
				})
			);
			endMarker.setIcon(
				L.icon({
					iconUrl: endPic,
					iconSize: [40, 40], // 图标大小
					iconAnchor: [20, 40], // 图标定位点
				})
			);
			this.startAndEndMarkers = [startMarker, endMarker];

			// 缩放至轨迹范围
			this.map.fitBounds(this.polyline.getBounds());
		},
		onSwitchMapMode() {
			console.log("切换地图模式");
			// 清除地图上的所有图层和标记
			this.clearMapLayers();
			// 每次调用的时候随机mapList中的数据
			const randomIndex = Math.floor(Math.random() * this.mapList.length);
			const mapData = this.mapList[randomIndex];
			if (mapData.mapType === 0) {
				this.switchToSimpleMode(mapData);
				this.lineData = this.generateIndoorTrackData(20);
			} else {
				this.switchToBaiduMode();
				this.lineData = this.generateTrackData(20);
			}
			this.drawLine(this.lineData);
		},
		clearMapLayers() {
			// 移除地图上的所有图层
			// if (this.map) {
			// 	this.map.eachLayer((layer) => {
			// 		this.map.removeLayer(layer);
			// 	});
			// }

			// 清除地图标记
			if (this.marker) {
				this.map.removeLayer(this.marker);
				this.marker = null;
			}

			// 清除地图瓦片图层
			if (this.tileLayer) {
				this.tileLayer.remove();
				this.tileLayer = null;
			}

			// 清除图片图层
			if (this.imageOverLay) {
				this.imageOverLay.remove();
				this.imageOverLay = null;
			}
		},
		switchToSimpleMode(mapData) {
			this.map.options.crs = L.CRS.Simple;
			this.map.setMinZoom(-3);
			this.getMapInfo(mapData);
		},
		switchToBaiduMode(mapData) {
			this.map.options.crs = L.CRS.Baidu;
			this.map.setMinZoom(1);
			// this.map.setMaxZoom(12);
			this.map.setView([39.904211, 116.407395], 12);
			this.tileLayer = L.tileLayer.baidu({ layer: "vec" }).addTo(this.map);
		},
		clearTime() {
			clearInterval(this.timer);
			this.timer = null;
			console.log("====================================");
			console.log("清除定时器---leaflet");
			console.log("====================================");
		},
		// 模拟轨迹点
		generateTrackData(numPoints) {
			const trackData = [];
			const startTime = Date.now(); // 当前时间戳作为起始时间

			// 初始经纬度坐标，可以根据需要调整
			let lat = 39.904211;
			let lng = 116.407395;

			for (let i = 0; i < numPoints; i++) {
				trackData.push({
					lat: lat,
					lng: lng,
					time: startTime + i * 1, // 每个点时间间隔1秒
				});

				// 模拟轨迹移动，可以根据需要调整移动步长
				lat += (Math.random() - 0.5) * 0.1; // 随机在[-0.0005, 0.0005]范围内变化
				lng += (Math.random() - 0.5) * 0.1; // 随机在[-0.0005, 0.0005]范围内变化
			}

			return trackData;
		},
		// 模拟室内图轨迹点
		generateIndoorTrackData(numPoints) {
			const trackData = [];
			const startTime = Date.now(); // 当前时间戳作为起始时间

			// 初始坐标，可以根据需要调整，假设这是室内地图的某个中心点
			let lat = 1500;
			let lng = 2500;

			for (let i = 0; i < numPoints; i++) {
				trackData.push({
					lat,
					lng,
					time: startTime + i * 1, // 每个点时间间隔1秒
				});

				// 模拟室内轨迹移动，步长更小，变化范围更有限
				lat += Math.random() * 100;
				lng += Math.random() * 100;
			}

			return trackData;
		},
		// drawLine(linedata) {
		// 	// 停止播放并清除现有的trackplayback
		// 	if (this.trackplayback) {
		// 		this.trackplayback.stop();
		// 		// this.trackplayback.dispose();
		// 		this.trackplayback = null;
		// 	}

		// 	if (this.trackplaybackControl) {
		// 		this.trackplaybackControl.remove(); // 从地图上移除控制器
		// 		this.trackplaybackControl = null;
		// 	}

		// 	this.clearTime();

		// 	this.trackplayback = L.trackplayback(linedata, this.map, this.Options);
		// 	this.trackplaybackControl = L.trackplaybackcontrol(this.trackplayback);
		// 	this.trackplaybackControl.addTo(this.map);
		// 	this.trackplayback.start(); //开始自动播放

		// 	// 室内图点与点之间的连线
		// 	if (this.polyline) {
		// 		console.log("清除上一条轨迹线");
		// 		this.map.removeLayer(this.polyline);
		// 		this.polyline = null;
		// 	}
		// 	this.polyline = L.polyline(linedata, {
		// 		weight: 4,
		// 		className: "dashLines",
		// 	}).addTo(this.map);

		// 	// 缩放至轨迹范围
		// 	this.map.fitBounds(this.polyline.getBounds());

		// 	// 监听轨迹播放结束事件
		// 	this.timer = setInterval(() => {
		// 		// 轨迹列表最后一条与当前播放的轨迹下标相同则关闭定时器
		// 		if (this.trackLength - 1 === this.currentIndex) {
		// 			this.clearTime();
		// 			console.log("清除定时器===当前为最后一条时===");
		// 		} else if (this.trackplayback.getCurTime() >= this.trackplayback.getEndTime()) {
		// 			// 不是最后一条轨迹但是当前轨迹播放结束时
		// 			console.log("轨迹播放中----");
		// 			this.getTra();
		// 			this.clearTime();
		// 		}
		// 	}, 1000);
		// },
	},
};
</script>
<style lang="scss" scoped>
.leaflet-container {
	width: 100%;
	height: 100%;
	.map-box {
		width: 100%;
		height: calc(100vh - 90px);
	}
}
::deep.leaflet-map-pane canvas {
	z-index: 201; // 强制改变轨迹插件图层，使运动的轨迹线在完整轨迹线之上，避免出现重合时线有透明度
}
</style>
