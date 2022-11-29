<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-09-21 15:00:22
 * @LastEditors: 杭
 * @LastEditTime: 2022-11-29 13:52:59
-->
<!-- 西瓜播放器 -->
<template>
  <div>
    <div id="mse"></div>
  </div>
</template>

<script>
import Player from "xgplayer/dist/core_player";
import play from "xgplayer/dist/controls/play";
import fullscreen from "xgplayer/dist/controls/fullscreen";
import progress from "xgplayer/dist/controls/progress";
import volume from "xgplayer/dist/controls/volume";
import pip from "xgplayer/dist/controls/pip";
import flex from "xgplayer/dist/controls/flex";
export default {
  components: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // window.addEventListener("resize", function () {
    //   document.getElementById("mse").style.height = window.innerHeight + "px";
    // });
    this.initPlayer();
  },

  methods: {
    initPlayer() {
      //===========================flv格式=========================
      //   let player = new FlvJsPlayer({
      //     id: "mse",
      //     isLive: false,
      //     playsinline: false,
      //     url: "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv",
      //     autoplay: true,
      //     height: "500",
      //     width: "100%",
      //   });
      // ==========================hls格式=======================
      let player = new HlsPlayer({
        id: "mse",
        isLive: true,
        // url: "rtmp://r2bj.vzan.com/v/1126653464_231435244367094402?zbid=1126653464&tpid=1361853375",
        url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
        // url: "http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003.m3u8",
        autoplay: true,
        playsinline: true,
        height: "500",
        width: "100%",
      });
      //   let player = new Player({
      //     id: "mse",
      //     url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
      //     controlPlugins: [play, fullscreen, progress, volume, pip, flex],
      //     pip: true, //打开画中画功能
      //   });
    },
  },
};
</script>
<style lang="scss" scoped>
#mse {
  width: 100%;
  height: 500px;
}
</style>
