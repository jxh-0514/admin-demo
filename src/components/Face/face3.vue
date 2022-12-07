<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-12-07 17:12:32
 * @LastEditors: 杭
 * @LastEditTime: 2022-12-07 17:24:10
-->
<!-- 人脸试别---活体检测 -->
<template>
  <div></div>
</template>

<script>
import {
  detectSingleFace,
  nets,
  matchDimensions,
  resizeResults,
  draw,
  SsdMobilenetv1Options,
  Box,
} from "face-api.js";
export default {
  components: {},

  data() {
    return {
      options: null,
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 指定面部检测器
    this.options = new SsdMobilenetv1Options({
      // 最小置信阈值
      // 默认值：0.5
      minConfidence: 0.9,
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.canvas = this.$refs["canvas"] as HTMLCanvasElement;
    // this.video = this.$refs["video"] as HTMLVideoElement;
    this.init();
  },

  methods: {
    async init() {
      await nets.ssdMobilenetv1.loadFromUri("/models");
    },
    /** @name 调用摄像头 */
    getUserMedia() {
      //   success: NavigatorUserMediaSuccessCallback,
      //   error: NavigatorUserMediaErrorCallback
      //优先使用前置摄像头（如果有的话）：{ video: { facingMode: "user" } }
      //强制使用后置摄像头：{ video: { facingMode: { exact: "environment" } } }
      // video: {
      //    width: { min: 1024, ideal: 1280, max: 1920 },
      //    height: { min: 776, ideal: 720, max: 1080 }
      // }
      //ideal（应用最理想的）值
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: this.width },
          height: { ideal: this.height },
        },
      };
      if (navigator.mediaDevices.getUserMedia) {
        // 最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        // webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        // firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        // 旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    },
    /** @name 初始化取景框 */
    initViewFinder() {
      if (!this.video) return;
      const marginLeft = (this.video.videoWidth - this.boxWidth) / 2;
      const marginTop = (this.video.videoHeight - this.boxHeight) / 2;
      if (this.canvas) {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
      }
      this.viewFinderBox = {
        topLeft: {
          x: marginLeft,
          y: marginTop,
        },
        topRight: {
          x: marginLeft + this.boxWidth,
          y: marginTop,
        },
        bottomLeft: {
          x: marginLeft,
          y: marginTop + this.boxHeight,
        },
        bottomRight: {
          x: marginLeft + this.boxWidth,
          y: marginTop + this.boxHeight,
        },
      };
    },
    /** @name 绘制取景框 */
    drawViewFinder() {
      const context = this.canvas?.getContext("2d");
      const rectWith = 50;
      if (!context) return;
      context.clearRect(
        0,
        0,
        this.canvas?.width || 0,
        this.canvas?.height || 0
      );
      const fontLeft = this.video ? (this.video.videoWidth - 200) / 2 : 200;
      context.font = "20px Arial";
      context.fillText("请保持脸部在取景框内", fontLeft, 50);
      const keys = Object.keys(this.viewFinderBox);
      keys.forEach((key) => {
        const point = this.viewFinderBox[key];
        if (!point) return;
        context.moveTo(point.x, point.y);
        switch (key) {
          case "topLeft":
            context.lineTo(point.x + rectWith, point.y);
            context.moveTo(point.x, point.y);
            context.lineTo(point.x, point.y + rectWith);
            break;
          case "topRight":
            context.lineTo(point.x - rectWith, point.y);
            context.moveTo(point.x, point.y);
            context.lineTo(point.x, point.y + rectWith);
            break;
          case "bottomLeft":
            context.lineTo(point.x + rectWith, point.y);
            context.moveTo(point.x, point.y);
            context.lineTo(point.x, point.y - rectWith);
            break;
          case "bottomRight":
            context.lineTo(point.x - rectWith, point.y);
            context.moveTo(point.x, point.y);
            context.lineTo(point.x, point.y - rectWith);
            break;
          default:
            break;
        }
      });
      context.lineWidth = 2;
      context.strokeStyle = "white";
      context.stroke();
    },
    /** @name 人脸检测 */
    async detectFace() {
      // eslint-disable-next-line no-promise-executor-return
      //非常重要：防止卡死
      await new Promise((resolve) => requestAnimationFrame(resolve));
      //绘制取景框
      this.drawViewFinder();
      if (
        !this.canvas ||
        !this.video ||
        !this.video.currentTime ||
        this.video.paused ||
        this.video.ended
      )
        return this.detectFace();
      // 检测图像中具有最高置信度得分的脸部
      const result = await detectSingleFace(this.video, this.options);
      if (!result) return this.detectFace();
      // 匹配尺寸
      const dims = matchDimensions(this.canvas, this.video, true);
      // 调整检测到的框的大小，以防显示的图像的大小与原始
      const resizedResult = resizeResults(result, dims);
      const box = resizedResult.box;
      // 检测框是否在取景框内
      if (!this.checkInViewFinder(box)) return this.detectFace();
      this.drawViewFinder();
      // 将检测结果绘制到画布（此处不用，可以直接用来绘制检测到的人脸盒子）
      // draw.drawDetections(this.canvas, resizedResult.box);
      this.drawBox(box, "识别中");
      this.video.pause();
      //截取人脸图片
      const image = await this.cameraShoot(
        this.video,
        resizedResult.box.topLeft,
        resizedResult.box.width,
        resizedResult.box.height
      );
      if (!image) {
        this.drawBox(box, "识别失败");
        await delay(1000);
        this.video.play();
        return this.detectFace();
      }
      let files = new window.File([image], "人脸头像.jpeg", {
        type: "image/jpeg",
      });
      //调用接口传入截取的人脸头像进行检测
      const detectResult = await this.computedService.faceDetect(
        this.formId,
        files
      );
      if (!detectResult) {
        this.drawBox(box, "识别失败");
        await delay(1000);
        this.video.play();
        return this.detectFace();
      }
      //停止视频
      this.handleStopVideo();
    },
    /** @name 截取快照 */
    cameraShoot() {
      // video: HTMLVideoElement,
      // startPoint: { x: number; y: number },
      // width: number,
      // height: number
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(
          video,
          startPoint.x - 40,
          startPoint.y - 40,
          width + 80,
          height + 80,
          0,
          0,
          canvas.width,
          canvas.height
        );
      return (
        (new Promise() < Blob) |
        (null >
          ((resolve) =>
            // eslint-disable-next-line no-promise-executor-return
            canvas.toBlob(resolve, "image/jpeg")))
      );
    },
    /** @name 绘制box（带文字标签） */
    drawBox(box, label) {
      if (!this.canvas) return;
      const context = this.canvas.getContext("2d");
      context?.clearRect(box.x, box.y, box.width, box.height);
      const drawBox = new draw.DrawBox(box, {
        label: label,
      });
      drawBox.draw(this.canvas);
    },
    /** @name 停止video */
    handleStopVideo() {
      //   this.stream
      //     ?.getTracks()
      //     .forEach((track: MediaStreamTrack) => track.stop());
    },
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
</style>
