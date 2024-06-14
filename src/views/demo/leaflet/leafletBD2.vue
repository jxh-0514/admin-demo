<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-05-25 11:33:24
 * @LastEditors: 杭
 * @LastEditTime: 2024-06-14 15:13:21
-->
<template>
	<div>
		<div id="map-switch">切换</div>
		<div id="map"></div>
	</div>
</template>

<script>
import L from "leaflet";
import "@/utils/tileLayer.baidu.js";
import icon from "leaflet/dist/images/marker-icon-2x.png";
export default {
	data() {
		return {
			mapMode: "baidu", // 底图模式，simple 表示简单坐标，baidu 表示百度坐标
			map: null,
			tileLayer: null,
			bounds: [
				[0, 0],
				[3750, 5000],
			],
			mapUrl: require("@/assets/aa.jpg"),
			marker: null,
			icon: L.icon({
				iconUrl: icon,
				iconSize: [26, 42],
				iconAnchor: [13, 42],
				shadowSize: [41, 41],
				shadowAnchor: [13, 41],
			}),
		};
	},
	mounted() {
		this.initMap();
	},
	methods: {
		// 初始化地图
		initMap() {
			// 创建地图对象
			this.map = L.map("map", {
				center: [39.904211, 116.407395],
				// center: [1876, 2500],
				zoom: 12,
				// minZoom: -3,
				// maxZoom: 5,
				crs: L.CRS.Baidu,
				zoomSnap: 0.1,
			});

			this.map.on("click", (e) => {
				console.log("点击", e.latlng);
			});
			// 创建底图对象
			if (this.mapMode === "baidu") {
				this.tileLayer = L.tileLayer.baidu({ layer: "vec" }).addTo(this.map);
			} else {
				// 默认为简单坐标模式
				this.map.options.crs = L.CRS.Simple;
				this.map.setView([this.bounds[1][0] / 2, this.bounds[1][1] / 2], -3);
				this.tileLayer = L.imageOverlay(this.mapUrl, this.bounds, {
					interactive: true, //允许地图触发事件
				}).addTo(this.map);
			}

			// 创建模式切换控件
			L.DomEvent.disableClickPropagation(document.getElementById("map-switch"));
			L.DomEvent.on(document.getElementById("map-switch"), "click", this.onSwitchMapMode.bind(this));

			// 监听缩放级别变化
			this.map.on("zoomend", () => {
				const zoomLevel = this.map.getZoom();
				console.log("当前缩放级别:", zoomLevel);
			});
		},
		// 切换底图模式
		onSwitchMapMode() {
			// 移除所有图层、标记和覆盖物
			if (this.marker) {
				this.map.eachLayer(() => {
					this.map.removeLayer(this.marker);
				});
			}

			// 释放地图对象占用的内存
			//   this.map.remove();
			if (this.mapMode === "baidu") {
				// 切换为简单坐标模式
				this.mapMode = "simple";
				this.tileLayer.remove();
				// this.tileLayer = L.tileLayer(
				//   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				//   {
				//     attribution:
				//       'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
				//   }
				// ).addTo(this.map);
				this.map.options.crs = L.CRS.Simple;
				this.map.setMinZoom(-3);
				this.map.setMaxZoom(5);
				this.map.setView([this.bounds[1][0] / 2, this.bounds[1][1] / 2], -3);
				this.tileLayer = L.imageOverlay(this.mapUrl, this.bounds, {
					interactive: true, //允许地图触发事件
				}).addTo(this.map);
				let point = [1200, 2500];
				this.marker = L.marker(point, { icon: this.icon }).addTo(this.map);
			} else {
				// 切换为百度坐标模式
				this.mapMode = "baidu";
				this.tileLayer.remove();
				this.tileLayer = null;
				this.map.options.crs = L.CRS.Baidu;
				// this.map.setZoom(5)
				this.map.setMinZoom(1);
				this.map.setMaxZoom(12);
				this.map.setView([39.904211, 116.407395], 5);
				this.tileLayer = L.tileLayer.baidu({ layer: "vec" }).addTo(this.map);
				let point = [39.904211, 116.407395];
				this.marker = L.marker(point, { icon: this.icon }).addTo(this.map);
			}
		},
	},
};
</script>

<style>
#map {
	height: calc(100vh - 120px);
}
#map-switch {
	/* width: 40px; */
	height: 30px;
	color: #fff;
	position: absolute;
	bottom: 20px;
	left: 20px;
	background-color: rgb(34, 82, 212);
	padding: 5px;
	border-radius: 5px;
	cursor: pointer;
}
</style>
