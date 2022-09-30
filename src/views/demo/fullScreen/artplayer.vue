<!-- artplayer播放器 -->
<template>
  <div>
    <div class="artplayer-app"></div>
  </div>
</template>

<script>
import Artplayer from "artplayer";
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
    this.init();
  },

  methods: {
    init() {
      var art = new Artplayer({
        container: ".artplayer-app",
        // url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
        url: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
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
  },
};
</script>
<style lang="scss" scoped>
.artplayer-app {
  width: 100%;
  height: 50vh;
}
</style>
