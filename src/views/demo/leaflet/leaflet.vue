<template>
	<div id="Leaflet1">
		<l-map :zoom="2" :center="[9.93428, 30.335098]" style="height: 94vh; width: 99vw">
			<l-tile-layer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution="&copy; <a href='http://osm.org/copyrighte'>OpenStreetMap</a> contributors" />
			<v-marker-cluster>
				<l-marker v-for="(item, i) in mapData" :key="i" :icon="defaultIcon" :lat-lng="[item.LATITUDE, item.LONGITUDE]">
					<l-popup :content="item.ADM1NAME">
						<button @click="btn">按钮</button>
					</l-popup>
				</l-marker>
			</v-marker-cluster>
		</l-map>
		<el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
			<el-table :data="gridData">
				<el-table-column property="date" label="日期" width="150"></el-table-column>
				<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>
			</el-table>
		</el-drawer>
	</div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const mapData = [];
export default {
	name: "Leaflet1",
	components: {
		LMap,
		LTileLayer,
		LMarker,
		LPopup,
		"v-marker-cluster": Vue2LeafletMarkerCluster,
	},
	data() {
		return {
			mapData,
			defaultIcon: L.icon({
				iconUrl: icon,
				iconSize: [26, 42],
				iconAnchor: [13, 42],
				shadowUrl: iconShadow,
				shadowSize: [41, 41],
				shadowAnchor: [13, 41],
			}),
			table: false,
			gridData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
			],
		};
	},
	created() {
		let self = this;
		fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places.geojson")
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				self.mapData = json.features.slice(0, 3000).map((x) => {
					return x.properties;
				});
			});
	},
	mounted() {},
	methods: {
		btn() {
			this.table = true;
		},
	},
};
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
