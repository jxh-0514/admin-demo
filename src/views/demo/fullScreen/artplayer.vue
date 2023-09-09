<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-09-30 18:48:37
 * @LastEditors: 杭
 * @LastEditTime: 2023-09-09 16:45:14
-->
<!-- artplayer播放器 -->
<template>
  <div>
    <div class="artplayer-app"></div>

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
import Artplayer from "artplayer";
export default {
  components: {},

  data() {
    return {
      player: null,
      videoUrl:
        "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
      inputValue: "",
    };
  },

  computed: {},

  watch: {},
  destroyed() {
    if (this.player && this.player.destroy) {
      this.player.destroy(false);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.player = new Artplayer({
        container: ".artplayer-app",
        url: this.videoUrl,
        autoplay: true,
        muted: true,
        isLive: false,
        flip: true,
        playbackRate: true, //倍速
        aspectRatio: true, //长宽比
        setting: true, //设置
        screenshot: true, //截图
        // moreVideoAttr: {
        //   crossOrigin: "anonymous",
        // }, // 可选
        hotkey: true, //端点
        pip: true, //画中画
        fullscreen: true, //全屏
        fullscreenWeb: true, //网页全屏
        subtitleOffset: true, //字幕偏移
        miniProgressBar: true, //迷你进度条
      });
    },
    playBtn() {
      // this.videoUrl = this.inputValue;
      this.player.switchUrl(this.inputValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.artplayer-app {
  width: 100%;
  height: 50vh;
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
