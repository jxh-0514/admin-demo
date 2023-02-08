<!-- 测试页面 -->
<template>
  <div>
    <div id="map"></div>
    <div id="info_container">
      {{ size }}
    </div>
  </div>
</template>

<script>
import L from "leaflet";
// 平滑缩放插件
import "projektpro-leaflet-smoothwheelzoom";
export default {
  components: {},

  data() {
    return {
      map: null,
      center: [39.90553, 116.391305],
      zoom: 5,
      size: 0,
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
    this.showZoom();
  },

  methods: {
    // 初始化地图
    init() {
      this.map = L.map("map", {
        center: this.center,
        zoom: this.zoom,
        scrollWheelZoom: false, // 禁用原始缩放功能
        smoothWheelZoom: true, // 使用平滑缩放
        smoothSensitivity: 1, // 缩放速度  默认 1
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      //绘制圆
      var CircleMarker = L.circleMarker([39.90553, 116.391305], {
        fillColor: "#0383ff",
        fillOpacity: 0.5,
        radius: 20,
      }).addTo(this.map);
      this.map.on("zoom", () => {
        this.showZoom();
      });
    },
    showZoom() {
      this.size = this.map.getZoom().toFixed(2);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#map {
  width: 100vw;
  height: 100vh;
}
#info_container {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 50%;
  margin-top: 8px;
  padding: 8px;
  transform: translateX(-50%);
  width: 200px;
  line-height: 64px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  font-size: 24px;
}
</style>
