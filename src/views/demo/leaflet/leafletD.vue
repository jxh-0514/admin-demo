<!-- 自适应屏幕大小缩放图层 -->
<template>
	<div id="map"></div>
</template>

<script>
import L from "leaflet";
export default {
	name: "",
	components: {},
	props: {},
	data() {
		return {
			map: null,
			bounds: [
				[0, 0],
				[3750, 5000],
			],
			center: [0, 0],
			crs: L.CRS.Simple,
			imageOverLay: null,
			mapUrl: require("@/assets/aa.jpg"),
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.initLeaflet();
		// 窗口缩放,地图自适应缩放
		window.onresize = () => {
			this.map.invalidateSize(true);
			this.map.fitBounds(this.bounds);
		};
	},

	methods: {
		// 初始化地图
		initLeaflet() {
			this.map = L.map("map", {
				center: this.center,
				crs: this.crs,
				zoomControl: false,
				zoom: 2,
				minZoom: -3,
				zoomSnap: 0.1,
				doubleClickZoom: false,
				attributionControl: false, //去掉右下角的attribution
				// preferCanvas: true, //使用canvas模式渲染矢量图形（设置线段dashLines时不能启用这个）
			});
			// this.map.zoomControl.setPosition("topright"); // 缩放按钮在右边
			this.initImage();
		},
		// 初始化图层
		initImage() {
			let img = new Image();
			let url = this.mapUrl;
			img.src = url;
			img.onload = () => {
				let w = img.width;
				let h = img.height;
				this.bounds = [
					[0, 0],
					[h, w],
				];
				// 创建图层
				L.imageOverlay(url, this.bounds).addTo(this.map);
				// 设置地图图层区域
				this.map.fitBounds(this.bounds);
			};
		},
	},
};
</script>
<style lang="scss" scoped>
#map {
	width: 100%;
	height: 95vh;
}
</style>
