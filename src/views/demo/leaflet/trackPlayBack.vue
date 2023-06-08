<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-06-08 16:28:47
 * @LastEditors: 杭
 * @LastEditTime: 2023-06-08 20:44:02
-->
<!-- leaflet---轨迹回放 -->
<template>
  <div>
    <div id="LmapHis"></div>
  </div>
</template>

<script>
import L from "leaflet";
import { lZoom } from "@/utils/zoom.js";
import "leaflet-plugin-trackplayback";
import "leaflet-plugin-trackplayback/dist/control.trackplayback";
import "leaflet-plugin-trackplayback/dist/control.playback.css";
import startPic from "@/assets/start.png";
import endPic from "@/assets/end.png";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      LmapHis: null,
      bounds: [
        [0, 0],
        [3750, 5000],
      ],
      center: [500, 900],
      crs: L.CRS.Simple,
      imageOverLay: null,
      marker: null,
      myGroup: null, //存放定位图标
      startAndEndMarkers: [], //存放起始图标
      windowWidth: "",
      windowHeight: "",
      polyline: null,
      trackplayback: null,
      trackplaybackControl: null,
      Options: {
        // the play options
        clockOptions: {
          // the default speed
          // caculate method: fpstime * Math.pow(2, speed - 1)
          // fpstime is the two frame time difference
          speed: 1,
          // the max speed
          maxSpeed: 65,
        },
        // 轨迹点配置项
        trackPointOptions: {
          // whether draw track point
          isDraw: false,
          // whether use canvas to draw it, if false, use leaflet api `L.circleMarker`
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
          // whether draw track line
          isDraw: true,
          stroke: true,
          // color: "#1C54E2",
          color: "#ccc",
          weight: 4,
          fill: false,
          fillColor: "#000",
          opacity: 1,
        },
        // target options
        targetOptions: {
          // whether use image to display target, if false, the program provide a default
          useImg: true,
          // if useImg is true, provide the imgUrl
          imgUrl: require("@/assets/person.png"),
          // the width of target, unit: px
          width: 25,
          // the height of target, unit: px
          height: 25,
          // the stroke color of target, effective when useImg set false
          color: "#fff",
          // the fill color of target, effective when useImg set false
          fillColor: "#9FD12D",
        },
      },
      mapUrl: require("@/assets/aa.jpg"),
      linedata: [
        { lat: 30, lng: 116, time: 1502529180 },
        { lat: 30, lng: 136, time: 1502529280 },
        { lat: 30, lng: 125, time: 1502529480 },
        { lat: 30, lng: 136, time: 1502529680 },
        { lat: 30, lng: 246, time: 1502529880 },
        { lat: 30, lng: 356, time: 1502530080 },
        { lat: 30, lng: 466, time: 1502530280 },
        { lat: 80, lng: 566, time: 1502530480 },
        { lat: 160, lng: 566, time: 1502536080 },
        { lat: 280, lng: 566, time: 1502538080 },
        { lat: 400, lng: 566, time: 1502539080 },
      ],
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //输出当前窗口的宽
    this.windowWidth =
      document.documentElement.clientWidth - 240 ||
      document.body.clientWidth - 240;
    //输出当前窗口的高
    this.windowHeight =
      document.documentElement.clientHeight - 50 ||
      document.body.clientHeight - 50;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initLeaflet();
  },

  methods: {
    // 初始化地图
    initLeaflet() {
      this.LmapHis = L.map("LmapHis", {
        center: this.center,
        crs: this.crs,
        zoomControl: false,
        zoom: -2,
        minZoom: -3,
        doubleClickZoom: false,
        attributionControl: false, //去掉右下角的attribution
        // preferCanvas: true, //使用canvas模式渲染矢量图形（设置线段dashLines时不能启用这个）
      });
      // this.LmapHis.zoomControl.setPosition("topright"); // 缩放按钮在右边
      this.initImage();
      this.drawLine();
    },
    // 初始化图层
    initImage() {
      const image = this.mapUrl;
      const zoom = lZoom(
        this.bounds[1][0],
        this.bounds[1][1],
        this.windowWidth,
        this.windowHeight
      );
      this.LmapHis.setView(
        [this.bounds[1][0] / 2, this.bounds[1][1] / 2],
        zoom
      );
      this.imageOverLay = L.imageOverlay(image, this.bounds, {
        interactive: true, //允许地图触发事件
      }).addTo(this.LmapHis);
    },
    // 绘制轨迹线
    drawLine() {
      // 有历史数据先清除
      this.removeAndDispose();
      this.trackplayback = L.trackplayback(
        this.linedata,
        this.LmapHis,
        this.Options
      );
      this.trackplaybackControl = L.trackplaybackcontrol(this.trackplayback);
      this.trackplaybackControl.addTo(this.LmapHis);
      this.trackplayback.start(); //开始自动播放
      // 室内图点与点之间的连线
      this.polyline = L.polyline(this.linedata, {
        weight: 4,
        className: "dashLines",
      }).addTo(this.LmapHis);
      // 创建起点和终点标记
      const startMarker = L.marker(this.linedata[0]).addTo(this.LmapHis);
      const endMarker = L.marker(this.linedata[this.linedata.length - 1]).addTo(
        this.LmapHis
      );
      // 设置标记的图标
      startMarker.setIcon(
        L.icon({
          iconUrl: startPic,
          iconSize: [40, 40], // 图标大小
          iconAnchor: [20, 20], // 图标定位点
        })
      );
      endMarker.setIcon(
        L.icon({
          iconUrl: endPic,
          iconSize: [40, 40], // 图标大小
          iconAnchor: [20, 20], // 图标定位点
        })
      );
      this.startAndEndMarkers = [startMarker, endMarker];
    },
    // 监听时间变化
    tick() {
      this.trackplayback.on("tick", (e) => {
        // 1.从控件中获取当前运动点信息
        // const data = linedata.find((item) => item.time === this.trackplaybackControl._slider.valueAsNumber);
        // 2.从绘制点的方法中获取运动点信息
        // let obj = linedata[0]; // 先取出第一个点
        // const data =
        //   this.trackplayback.draw._bufferTracks[0][
        //     this.trackplayback.draw._bufferTracks[0].length - 1
        //   ]; // 获取当前点的信息
        // console.log("--- tick ---", e, data);
      });
    },
    removeAndDispose() {
      if (
        this.trackplayback &&
        document.getElementsByClassName("leaflet-control-playback")[0]
      ) {
        document.getElementsByClassName("leaflet-control-playback")[0].remove();
        this.trackplayback.stop(); // 停止播放
        this.trackplayback.dispose(); //销毁播放器
        this.clearTime();
        if (this.polyline !== null) {
          this.LmapHis.removeLayer(this.polyline); //清除轨迹线
        }
        if (this.startAndEndMarkers.length != 0) {
          // 清除起始图标
          for (let i = 0; i < this.startAndEndMarkers.length; i++) {
            this.startAndEndMarkers[i].removeFrom(this.LmapHis);
          }
        }
      }
    },
    removeAll() {
      this.trackplayback && this.trackplayback.off("tick"); // 取消监听事件
      this.imageOverLay && this.LmapHis.removeLayer(this.imageOverLay); //删除图层
      this.removeAndDispose();
    },
  },
};
</script>
<style lang="scss" scoped>
#LmapHis {
  width: 100%;
  height: 90vh;
}
.leaflet-container {
  //   background: none;
  background: #ccc;
}
::v-deep .leaflet-map-pane canvas {
  z-index: 201; // 强制改变轨迹插件图层，使运动的轨迹线在完整轨迹线之上，避免出现重合时线有透明度
}
.dashLines {
  stroke-dasharray: 5; //虚线长度
  // stroke: #f00;
  stroke: #1c54e2;
}
::v-deep .leaflet-control {
  .sliderContainer {
    input {
      -webkit-appearance: auto;
    }
  }
}
</style>
