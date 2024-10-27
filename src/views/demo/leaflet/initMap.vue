<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2024-06-06 13:56:29
 * @LastEditors: 杭
 * @LastEditTime: 2024-06-06 15:59:19
-->
<!-- 初始化leaflet地图 -->
<template>
	<div ref="Lmap" class="Lmap"></div>
</template>

<script>
export default {
	name: "",
	components: {},
	props: {},
	data() {
		return {
			mapObj: null,
			tileLayer: null,
			center: [39.904211, 116.407395],
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {
		this.removeMap();
	},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.mapObj = this.initMap();
	},

	methods: {
		initMap() {
			const dom = this.$refs.Lmap;
			const map = L.map(dom, {
				center: this.center,
				// crs: L.CRS.Baidu,
				attributionControl: false,
				zoomControl: false,
				doubleClickZoom: false,
				dragging: true,
				zoom: 12,
				// minZoom: 1,
				zoomSnap: 0.1,
			});
			this.$emit("mapLoad", map); // 地图初始化完成发送事件
			return map;
		},
		removeMap() {
			if (this.mapObj) {
				this.mapObj.remove();
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.Lmap {
	width: 100%;
	height: 100%;
}
</style>
