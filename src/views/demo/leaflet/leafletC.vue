<template>
  <div class="vue-leaflet-container">
    <l-map
      id="lmap"
      ref="map"
      style="width: 100%; height: 94vh"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <!-- <v-marker-cluster> -->
      <template v-for="(marker, index) in markers">
        <l-marker
          :key="index"
          :icon="defaultIcon"
          :lat-lng="[marker.lat, marker.lng]"
          @click="handleMarkerClick(marker)"
        >
          <!-- <l-popup :content="cardTemplate" :options="popupOptions" /> -->
          <!-- 优化 -->
          <l-popup
            :content="cardTemplate[0] + marker.id + cardTemplate[1]"
            :options="popupOptions"
          />
        </l-marker>
      </template>
      <!-- </v-marker-cluster>  -->
    </l-map>
  </div>
</template>
<script>
import L from "leaflet";
import Vue from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import icon from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Pane from "../leafletComponents/PopupContent";
export default {
  name: "LeafletC",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    Pane,
  },
  data() {
    return {
      zoom: 5,
      center: [39.90553, 116.391305],
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
      attribution:
        "&copy; <a href='http://osm.org/copyrighte'>OpenStreetMap</a> contributors",
      markers: [],
      defaultIcon: L.icon({
        iconUrl: icon,
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        shadowUrl: iconShadow,
        shadowSize: [41, 41],
        shadowAnchor: [13, 41],
      }),
      // cardTemplate:
      //   "<div id='pane' style='width: 300px; height: 240px;'></div>",
      // 优化
      cardTemplate: [
        '<div style="width: 300px; height: 240px;" id="pane_',
        '" />',
      ],
      popupOptions: {
        className: "mypopup",
      },
      pane: null,
      stationAlarmNum: { 1: 10, 2: 8, 3: 12 },
    };
  },
  created() {
    // this.setMarkers();
  },
  mounted() {
    this.setMarkers();
    console.log("====================================");
    console.log(123, this.$refs.map);
    console.log("====================================");
    var that = this;
    this.$refs.map.mapObject.on("popupopen", (e) => {
      // this.pane.$mount("#pane");
      // 优化
      console.log("监听弹窗");
      // 加定时器解决多次点击播放器报错问题
      setTimeout(() => {
        that.pane.$mount("#pane_" + that.pane.id);
      }, 200);
    });
  },
  methods: {
    setMarkers() {
      this.$nextTick(() => {
        let arr = [
          {
            id: 1,
            name: "测试站点1",
            lat: 39.90553,
            lng: 116.391305,
            data: "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv",
          },
          {
            id: 2,
            name: "测试站点2",
            lat: 40.90553,
            lng: 116.393305,
            data: "http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003.m3u8",
          },
          { id: 3, name: "测试站点3", lat: 41.90553, lng: 116.395305 },
        ];
        this.markers = arr;
      });
    },
    handleMarkerClick(station) {
      console.log("点击", station);
      if (this.pane != null) {
        console.log("销毁弹窗");
        // this.$refs.map.mapObject.closePopup();
        this.pane.$destroy();
        this.pane = null;
      }
      var Component = Vue.extend(Pane);
      this.pane = new Component({ propsData: { popupData: station.data } });
      this.pane.alarmNum = this.stationAlarmNum[station.id];
      this.pane.name = station.name;
      this.pane.id = station.id;
      // setTimeout(() => {
      //   this.pane.$mount("#pane_" + this.pane.id);
      // }, 200);
      // console.log("构造完成");
    },
    // setMarkers() {
    //   fetch(
    //     "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places.geojson"
    //   )
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((json) => {
    //       this.markers = json.features.slice(0, 10).map((x) => {
    //         return x.properties;
    //       });
    //     });
    // },
  },
};
</script>
<style>
/* 弹出层内容 */
/* #lmap >>> .mypopup .leaflet-popup-content-wrapper .leaflet-popup-content {
  margin: 0 auto !important;
  text-align: center;
  width: 120px !important;
  height: 100px !important;
  font-size: 14px;
} */
</style>
<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
