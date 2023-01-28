<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-01-20 20:19:11
 * @LastEditors: 杭
 * @LastEditTime: 2023-01-20 21:22:39
-->
<!-- chrome共享屏幕 -->
<template>
  <div>
    <h1>共享屏幕，stream流，录屏</h1>
    <video id="myVideo" autoplay playsinline muted></video>
    <el-button type="primary" @click="shareScreen">共享桌面</el-button>
    <el-button type="primary" @click="startRecording">开始录屏</el-button>
    <el-button type="primary" @click="stopRecording">停止录屏</el-button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      mediaRecorder: null,
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  methods: {
    async shareScreen() {
      // 共享屏幕，窗口，标签
      // 提示用户去选择和授权捕获展示的内容或部分内容
      if (!this.isShare()) return;
      let localStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      });
      // 播放共享视频流
      this.playStream(localStream);
      // 准备录制
      this.getMediaStream(localStream);
    },
    // 在视频标签中播放视频流
    playStream(stream) {
      const video = document.getElementById("myVideo");
      // 将流中的视频流加入到视频中
      video.srcObject = stream;
    },
    // 获得共享流，准备录制
    getMediaStream(mediaStream) {
      console.log("mediaStream", mediaStream);
      // MediaStream api 对 mimeType 参数的支持是【有限的】
      // webm 是 Google 专门为web端推出的一种视频格式
      // 100% 开源和兼容Chrome 浏览器和Android 设备
      const options = {
        // 音视频码率
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: "video/webm",
      };
      // MediaRecorder,用于录制媒体流的api,将录制的数据保存成一个文件
      this.mediaRecorder = new MediaRecorder(mediaStream, options);
    },
    // 开始录制
    startRecording() {
      this.mediaRecorder.start();
      this.mediaRecorder.onstart = () => {
        console.log("录屏---开始");
      };
      // 当有可用数据
      this.mediaRecorder.ondataavailabel = (e) => {
        console.log("当有可用数据", e);
        const bObj = new Blob([e.data], { type: "video/mp4" });
        this.downBlob(bObj);
      };
    },
    // 停止录制
    stopRecording() {
      console.log("录屏---停止");
      this.mediaRecorder.stop();
    },
    // 下载Blob
    downBlob(blob) {
      // 将Blob对象转换成一个URl地址
      const blobUrl = URL.createObjectURL(blob);
      // 新建一个A标签,设置链接为链接地址
      const a = document.createElement("a");
      // 将A标签添加到页面
      document.body.appendChild(a);
      // 将链接添加到A标签中
      a.href = blobUrl;
      // 设置a标签download属性文件名
      a.download = "myVideo.mp4";
      a.click();
      // 释放URL地址
      URl.revokeObjectURL(blobUrl);
    },
    // 判断浏览器是否支持
    isShare() {
      if (
        navigator.mediaDevices &&
        "getDisplayMedia" in navigator.mediaDevices
      ) {
        return true;
      } else {
        this.$message.warning("不支持getDisplayMedia");
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
#myVideo {
  width: 100%;
  display: block;
}
</style>
