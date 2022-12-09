<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-12-07 17:12:32
 * @LastEditors: 杭
 * @LastEditTime: 2022-12-09 14:30:14
-->
<!-- 人脸试别---活体检测 -->
<template>
  <div>
    <p class="tip">{{ tipTxt }}</p>
    <div class="photoBox">
      <video
        @play="onPlay($event)"
        ref="myVideo"
        id="myVideo"
        preload="auto"
        loop
        playsinline
        muted
        autoplay
        webkit-playsinline="true"
        v-show="!isOpenMouth"
      ></video>
      <canvas id="overlay" ref="overlay" v-show="!isOpenMouth"></canvas>
      <span
        id="hoverTxt"
        :class="hovertxt ? 'active' : ''"
        v-show="!isOpenMouth"
        >{{ hovertxt }}</span
      >
    </div>
  </div>
</template>

<script>
// import {
//   detectSingleFace,
//   nets,
//   matchDimensions,
//   resizeResults,
//   draw,
//   SsdMobilenetv1Options,
//   Box,
// } from "face-api.js";
import * as faceapi from "face-api.js";
export default {
  components: {},

  data() {
    return {
      options: null,
      isOpenMouth: false, // 张嘴是否通过
      isTwinkle: false, // 眨眼是否通过
      hovertxt: "",
      tipTxt: "模型初始化中...",
      vid: "",
      vid_width: 200,
      vid_height: 200,
      overlay: "",
      palyFlag: false,
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 指定面部检测器
    this.options = new faceapi.SsdMobilenetv1Options({
      // 最小置信阈值
      // 默认值：0.5
      minConfidence: 0.9,
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.vid = this.$refs.myVideo;
    this.vid_width = this.$refs.myVideo.width;
    this.vid_height = this.$refs.myVideo.height;
    this.overlay = this.$refs.overlay;
    this.overlayCC = this.$refs.overlay.getContext("2d");
    this.init();
  },

  methods: {
    async init() {
      // const res = await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      const video = this.vid;
      const canvas = this.overlay;
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]).then(
        () => {
          this.tipTxt = "模型加载成功";
          navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
          navigator.getUserMedia(
            { video: {} },
            (stream) => {
              video.srcObject = stream;
              this.palyFlag = true;
            },
            (err) => {
              this.palyFlag = false;
              console.error(err);
            }
          );
        },
        () => {
          this.tipTxt = "模型加载错误，即将重试";
        }
      );
    },
    async onPlay() {},
  },
};
</script>
<style lang="scss" scoped>
.x-face-detect-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotateY(180deg);
  // overflow: hidden;
  canvas {
    position: absolute;
    top: 0;
  }
  video {
    object-fit: fill;
  }
}
.photoBox {
  width: 5.625rem;
  height: 5.625rem;
  border-radius: 50%;
  /* border: 2px dashed red; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.9375rem;
  background: url(/src/assets/imgs/circlebg.png) no-repeat;
  background-size: cover;
  video,
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #hoverTxt {
    display: flex;
    position: absolute;
    width: 100%;
    height: 1.5rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
    top: -1.5rem;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    -moz-transition: 0.2s;
    -ms-transition: 0.2s;
    -o-transition: 0.2s;
    &.active {
      top: 0 !important;
      transition: 0.2s;
      -webkit-transition: 0.2s;
      -moz-transition: 0.2s;
      -ms-transition: 0.2s;
      -o-transition: 0.2s;
    }
  }
}
</style>
