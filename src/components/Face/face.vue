<!-- 人脸识别 -->
<template>
  <div class="face">
    <div class="container">
      <video id="video" preload autoplay loop muted></video>
      <canvas id="canvas" width="581" height="436"></canvas>
      <canvas id="canvas1" width="581" height="436"></canvas>
    </div>
    <div class="btns">
      <el-button type="primary" @click="start">打开摄像头</el-button>
      <el-button type="primary" @click="screenshot">手动截图</el-button>
      <el-button type="primary" @click="keepImg">保存图片</el-button>
      <p class="tips">
        1、首先打开摄像头；2、将人像放在框中自动截取，也可点击手动截取。截取的图片将会出现在下方未保存图片栏；3、最后点击保存，下方可预览保存后的图片。
      </p>
    </div>
    <div class="imgs" v-show="imgView">
      <p>未保存图片</p>
      <canvas id="shortCut" width="140" height="140"></canvas>
      <p>已保存图片</p>
      <div id="img"></div>
    </div>
  </div>
</template>
<script>
import "@/utils/tracking.js";
import "@/utils/face.js";

export default {
  name: "face",
  props: ["faceView"],
  data() {
    return {
      saveArray: {},
      imgView: false,
    };
  },
  methods: {
    // 打开摄像头
    start() {
      var saveArray = {};
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      // eslint-disable-next-line no-undef
      var tracker = new window.tracking.ObjectTracker("face");
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      // eslint-disable-next-line no-undef
      this.trackerTask = window.tracking.track("#video", tracker, {
        camera: true,
      });
      tracker.on("track", function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function (rect) {
          context.strokeStyle = "#fff";
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.fillStyle = "#fff";
          saveArray.x = rect.x;
          saveArray.y = rect.y;
          saveArray.width = rect.width;
          saveArray.height = rect.height;
        });
      });
      var canvas1 = document.getElementById("canvas1");
      var context1 = canvas1.getContext("2d");
      context1.strokeStyle = "#69fff1";
      context1.moveTo(190, 118);
      context1.lineTo(390, 118);
      context1.lineTo(390, 318);
      context1.lineTo(190, 318);
      context1.lineTo(190, 118);
      context1.stroke();
      setInterval(() => {
        if (
          saveArray.x > 200 &&
          saveArray.x + saveArray.width < 400 &&
          saveArray.y > 120 &&
          saveArray.y + saveArray.height < 320 &&
          saveArray.width < 180 &&
          saveArray.height < 180
        ) {
          console.log(saveArray);
          this.getPhoto();
          for (var key in saveArray) {
            delete saveArray[key];
          }
        }
      }, 2000);
    },
    // 获取人像照片
    getPhoto() {
      var video = document.getElementById("video");
      var can = document.getElementById("shortCut");
      var context2 = can.getContext("2d");
      context2.drawImage(video, 210, 130, 210, 210, 0, 0, 140, 140);
      this.imgView = true;
    },
    // 截屏
    screenshot() {
      this.getPhoto();
    },
    // 将canvas转化为图片
    convertCanvasToImage(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    //将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 保存图片
    keepImg() {
      var can = document.getElementById("shortCut");
      var img = document.getElementById("img");
      var photoImg = document.createElement("img");
      photoImg.src = this.convertCanvasToImage(can).src;
      img.appendChild(photoImg);
      //获取到转化为base64的图片地址
      this.$emit(
        "canvasToImage",
        this.dataURLtoFile(this.convertCanvasToImage(can).src, "person.jpg")
      );

      console.log(
        this.dataURLtoFile(this.convertCanvasToImage(can).src, "person.jpg")
      );
    },
    clearCanvas() {
      var c = document.getElementById("canvas");
      var c1 = document.getElementById("canvas1");
      var cxt = c.getContext("2d");
      var cxt1 = c1.getContext("2d");
      cxt.clearRect(0, 0, 581, 436);
      cxt1.clearRect(0, 0, 581, 436);
    },
    closeFace() {
      console.log("关闭人脸识别窗口");
      this.imgView = false;
      this.clearCanvas();
      // 停止侦测
      this.trackerTask.stop();
      console.log(this.trackerTask);
      // 关闭摄像头
      var video = document.getElementById("video");
      video.srcObject.getTracks()[0].stop();
    },
  },
  watch: {
    faceView(v) {
      if (v == false) {
        this.trackerTask && this.closeFace();
      }
    },
    imgView(v) {
      if (v == true) {
        this.$message.success({
          message: "截取成功！点击保存图片",
          offset: 380,
          duration: 1000,
        });
      }
    },
  },
  destroyed() {},
};
</script>
<style scoped lang="scss">
.face {
  .container {
    background: #000;
    position: relative;
    width: 540px;
    height: 436px;
    #canvas1 {
      position: absolute;
    }
    video,
    #canvas,
    #canvas1 {
      position: absolute;
      width: 540px;
      height: 436px;
    }
  }
  .btns {
    padding: 10px;
    .tips {
      font-size: 14px;
      color: #666;
      margin: 10px 0;
      line-height: 24px;
    }
  }
  .imgs {
    padding: 10px;
    p {
      font-size: 16px;
    }
  }
}
</style>
