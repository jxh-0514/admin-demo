<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-09-21 15:00:22
 * @LastEditors: 杭
 * @LastEditTime: 2023-09-09 16:32:34
-->
<!-- 西瓜播放器 -->
<template>
  <div>
    <div id="mse"></div>

    <div class="play-url-item">
      <div class="play-url">
        <el-input
          v-model="inputValue"
          size="medium"
          placeholder="请输入播放地址"
          clearable
        ></el-input>
      </div>
      <div class="play-btn">
        <el-button type="primary" size="medium" @click="playBtn()"
          >播放</el-button
        >
      </div>
    </div>
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
    return {
      player: null,
      inputValue: "",
      videoUrl:
        "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
    };
  },

  computed: {},

  watch: {},
  destroyed() {
    if (!this.player) return;
    this.player.destroy();
  },

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
      this.player = new HlsPlayer({
        id: "mse",
        isLive: true,
        // url: "rtmp://r2bj.vzan.com/v/1126653464_231435244367094402?zbid=1126653464&tpid=1361853375",
        // url: "http://192.168.1.63:6796/camera/play/hls/gaode2/index.m3u8",
        url: this.videoUrl,
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
    playBtn() {
      this.player.pause();
      this.videoUrl = this.inputValue;
      this.initPlayer();
    },
  },
};
</script>
<style lang="scss" scoped>
#mse {
  width: 100%;
  height: 500px;
}
.play-url-item {
  margin: 30px;
  display: flex;
  align-items: center;
}

.play-url-item + .play-url-item {
  margin-top: 10px;
}

.play-url {
  width: 100%;
}

.play-btn {
  flex-shrink: 0;
  margin-left: 10px;
}
</style>
