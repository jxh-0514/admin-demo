<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-09-23 15:27:57
 * @LastEditors: 杭
 * @LastEditTime: 2023-09-09 16:40:25
-->
<!-- 封装的flv插件 -->
<template>
  <div>
    <video style="width: 100%" id="video" controls autoplay></video>

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
import FlvExtend from "flv-extend";
export default {
  components: {},

  data() {
    return {
      flv: null,
      player: null,
      videoUrl:
        "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
      inputValue: "",
    };
  },

  computed: {},

  watch: {},
  destroyed() {
    // destroy
    this.destroy();
  },
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
      this.flv = new FlvExtend({
        element: videoElement, // *必传
        frameTracking: false, // 开启追帧设置
        updateOnStart: false, // 点击播放后更新视频
        updateOnFocus: false, // 获得焦点后更新视频
        reconnect: true, // 开启断流重连
        reconnectInterval: 3000, // 断流重连间隔
      });

      this.play();
    },
    play() {
      // 调用 init 方法初始化视频
      // init 方法的参数与 flvjs.createPlayer 相同，并返回 flvjs.player 实例
      this.player = this.flv.init(
        {
          type: "flv",
          url: this.videoUrl,
          isLive: true,
        },
        {
          enableStashBuffer: false, // 如果您需要实时（最小延迟）来进行实时流播放，则设置为false
          autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
          stashInitialSize: 128, // 减少首帧显示等待时长
        }
      );

      // 直接调用play即可播放
      this.player.play();
    },
    // 销毁播放器
    destroy() {
      if (!this.player) return;
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = null;
      console.log("====================================");
      console.log("页面销毁");
      console.log("====================================");
    },
    playBtn() {
      console.log("播放");
      this.videoUrl = this.inputValue;
      this.play();
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
