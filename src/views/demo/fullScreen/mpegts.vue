<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-09-13 08:42:22
 * @LastEditors: 杭
 * @LastEditTime: 2023-09-13 09:18:19
-->
<!-- mpegts播放器 -->
<template>
  <div>
    <video
      id="videoElement"
      controls
      autoplay
      muted
      width="90%"
      height="80%"
    ></video>

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
import mpegts from "mpegts.js";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      flvPlayer: null,
      videoUrl:
        "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
      inputValue: "",
    };
  },

  computed: {},

  watch: {},

  destroyed() {
    this.destroy();
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMpegts();
  },

  methods: {
    // mpegts播放器
    initMpegts() {
      this.destroy();
      if (mpegts.getFeatureList().mseLivePlayback) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = mpegts.createPlayer({
          type: "flv", // could also be mpegts, m2ts, flv
          isLive: true,
          url: this.videoUrl,
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
        var playPromise = this.flvPlayer.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              console.log("播放", _);
              // Automatic playback started!
              // Show playing UI.
              // this.flvPlayer.play();
            })
            .catch((error) => {
              console.log("暂停", error);
              // Auto-play was prevented
              // Show paused UI.
              // this.muted = false;

              // 重新加载
              // this.initFlv();
            });
        }
      }
    },
    destroy() {
      if (!this.flvPlayer) return;
      // 销毁flv
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = null;
    },
    playBtn() {
      this.videoUrl = this.inputValue;
      this.initMpegts();
    },
  },
};
</script>
<style lang="scss" scoped>
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
