<!-- 封装的fev插件 -->
<template>
  <div>
    <video id="video" controls autoplay></video>
  </div>
</template>

<script>
import FlvExtend from "flv-extend";
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
      const videoElement = document.getElementById("video");
      // 配置需要的功能
      const flv = new FlvExtend({
        element: videoElement, // *必传
        frameTracking: false, // 开启追帧设置
        updateOnStart: false, // 点击播放后更新视频
        updateOnFocus: false, // 获得焦点后更新视频
        reconnect: true, // 开启断流重连
        reconnectInterval: 0, // 断流重连间隔
      });

      // 调用 init 方法初始化视频
      // init 方法的参数与 flvjs.createPlayer 相同，并返回 flvjs.player 实例
      const player = flv.init(
        {
          type: "flv",
          url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
          //   url: "http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv",
          isLive: true,
        },
        {
          enableStashBuffer: false, // 如果您需要实时（最小延迟）来进行实时流播放，则设置为false
          autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
          stashInitialSize: 128, // 减少首帧显示等待时长
        }
      );

      // 直接调用play即可播放
      player.play();
    },
  },
};
</script>
<style lang="scss" scoped></style>
