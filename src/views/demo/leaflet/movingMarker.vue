<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-03-10 16:44:18
 * @LastEditors: 杭
 * @LastEditTime: 2023-03-10 17:22:03
-->
<!-- marker移动 -->
<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import movingMarker from "@/utils/movingMarker.js";
export default {
  components: {},

  data() {
    return {
      map: null,
      imageOverLay: null,
      parisKievLL: [
        [48.8567, 2.3508],
        [50.45, 30.523333],
      ],
      londonParisRomeBerlinBucarest: [
        [51.507222, -0.1275],
        [48.8567, 2.3508],
        [41.9, 12.5],
        [52.516667, 13.383333],
        [44.4166, 26.1],
      ],
      londonBrusselFrankfurtAmsterdamLondon: [
        [51.507222, -0.1275],
        [50.85, 4.35],
        [50.116667, 8.683333],
        [52.366667, 4.9],
        [51.507222, -0.1275],
      ],
      barcelonePerpignanPauBordeauxMarseilleMonaco: [
        [41.385064, 2.173403],
        [42.698611, 2.895556],
        [43.3017, -0.3686],
        [44.837912, -0.579541],
        [43.296346, 5.369889],
        [43.738418, 7.424616],
      ],
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initLeaflet();
  },

  methods: {
    initLeaflet() {
      this.map = L.map("map", {
        center: [36.09, 120.35],
        zoom: 13,
        preferCanvas: true,
      });
      this.tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(
        this.map
      );
      this.map.fitBounds(this.londonParisRomeBerlinBucarest);
      this.state();
      //   this.mov3();
      this.mov4();
      //   this.mov5();
    },
    // 点击开始/暂停
    state() {
      var marker1 = L.Marker.movingMarker(this.parisKievLL, [20000]).addTo(
        this.map
      );
      L.polyline(this.parisKievLL).addTo(this.map);
      marker1.once("click", function () {
        marker1.start();
        marker1.closePopup();
        marker1.unbindPopup();
        marker1.on("click", function () {
          if (marker1.isRunning()) {
            marker1.pause();
          } else {
            marker1.start();
          }
        });
        setTimeout(function () {
          marker1.bindPopup("<b>点我暂停 !</b>").openPopup();
        }, 2000);
      });

      marker1.bindPopup("<b>点我开始</b> !</b>", {
        closeOnClick: false,
      });
      marker1.openPopup();
    },
    mov3() {
      //添加一个循环走的标记
      var marker3 = L.Marker.movingMarker(
        this.londonBrusselFrankfurtAmsterdamLondon,
        [2000, 2000, 2000, 2000],
        {
          autostart: true,
          loop: true,
        }
      ).addTo(this.map);

      marker3.loops = 0;
      marker3.bindPopup("", {
        closeOnClick: false,
      });

      //=========================================================================
      //设置循环loop事件，进行循环次数计数
      marker3.on("loop", function (e) {
        marker3.loops++;
        if (e.elapsedTime < 50) {
          marker3.getPopup().setContent("<b>Loop: " + marker3.loops + "</b>");
          marker3.openPopup();
          setTimeout(function () {
            marker3.closePopup();

            if (!marker1.isEnded()) {
              marker1.openPopup();
            } else {
              if (marker4.getLatLng().equals([45.816667, 15.983333])) {
                marker4.bindPopup("点击地图使我移动 !");
                marker4.openPopup();
              }
            }
          }, 2000);
        }
      });
    },
    mov4() {
      //marker4的默认位置
      var marker4 = L.Marker.movingMarker([[45.816667, 15.983333]], []).addTo(
        this.map
      );

      //设置地图的点击事件，使标记移动到点击的位置
      this.map.on("click", function (e) {
        marker4.moveTo(e.latlng, 2000);
      });
    },
    mov5() {
      var marker5 = L.Marker.movingMarker(
        this.barcelonePerpignanPauBordeauxMarseilleMonaco,
        10000,
        {
          autostart: true,
        }
      ).addTo(this.map);

      marker5.addStation(1, 2000);
      marker5.addStation(2, 2000);
      marker5.addStation(3, 2000);
      marker5.addStation(4, 2000);

      L.polyline(this.barcelonePerpignanPauBordeauxMarseilleMonaco, {
        color: "green",
      }).addTo(this.map);
    },
  },
};
</script>
<style lang="scss" scoped>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
