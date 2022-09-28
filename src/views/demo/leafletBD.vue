<!-- leaflet引入百度地图 -->
<template>
  <div class="left-let-page">
    <div id="map"></div>
    <el-button @click="changeMap">切换地图</el-button>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/utils/tileLayer.baidu.js";
export default {
  components: {},

  data() {
    return {
      map: null,
      mapUrl: L.icon({
        // iconUrl: require("@/assets/404_images/404.png"),
        iconUrl:
          "https://www.cnlogo8.com/d/file/2022/0814/cnlogo8yzsehaz3wn3.svg",
        iconSize: [34, 34],
        iconAnchor: [12, 25],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      flag: true,
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initDate();
  },

  methods: {
    changeMap() {
      this.flag = !this.flag;
      //   this.initDate();
      if (this.flag) {
        console.log("当前leaflet");
        L.tileLayer(
          "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
        ).addTo(this.map);
      } else {
        console.log("当前百度");
        L.tileLayer.baidu({ layer: "vec" }).addTo(this.map);
      }
    },
    initDate() {
      this.map = L.map("map", {
        minZoom: 3,
        maxZoom: 14,
        center: [40.02404009136253, 116.50641060224784], // 地图中心
        zoom: 8, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
        crs: L.CRS.EPSG3857,
      });
      L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      ).addTo(this.map);

      // this.map = L.map("map", {
      //   minZoom: 3,
      //   maxZoom: 18,
      //   center: [39.56, 116.2],
      //   zoom: 8,
      //   zoomControl: false,
      //   attributionControl: true,
      //   crs: L.CRS.Baidu,
      // });
      // L.tileLayer.baidu({ layer: "vec" }).addTo(this.map);

      this.markerPopup();
    },
    markerPopup() {
      let arr = [
        { point: [39.9, 116.3], data: "1111" },
        { point: [39.9, 116.2], data: "2222" },
      ]; //模拟数据
      this.gem = [];
      for (let i = 0; i < arr.length; i++) {
        const marker = L.marker(arr[i].point, { icon: this.mapUrl }).addTo(
          this.map
        );
        this.gem.push(marker);
        //监听marker点击事件，通过curData绑定点击事件需要传递的数据
        marker.on("click", () => {
          this.curData = arr[i];
        });
        //给marker绑定标牌
        //标牌上按钮的点击事件绑定window上的a方法，这样就能调用vue的方法，并且通过marker点击事件能获取到循环传递的参数
        marker.bindPopup(
          `<div style='width:138px;'><a id='aa' onclick='aa()' style='color:red'>收藏${i}</a></div>`
        );
        console.log("循环", i, arr[i].point);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.left-let-page {
  #map {
    width: 100%;
    height: 84vh;
    margin: auto;
  }
}
</style>
