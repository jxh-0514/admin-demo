<template>
  <div>
    <!-- 人脸识别 -->
    <!-- <el-dialog
      :visible.sync="openFaceView"
      width="581px"
      :show-close="false"
      v-loading="faceloading"
      element-loading-text="人脸识别中"
    > -->
    <div class="ovf" style="padding: 20px">
      <el-upload
        v-if="!videoinput"
        class="upload-demo"
        action
        multiple
        :limit="1"
        :file-list="fileList"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">点击上传人像图片</el-button>
      </el-upload>
      <div v-if="videoinput">
        <el-button size="small" type="primary" @click="checkFace"
          >点击进行人脸识别</el-button
        >
        <div slot="tip" class="el-upload__tip">此功能需到非IE浏览器进行</div>
      </div>
      <div class="dialog-footer">
        <el-button @click="openFaceView = false">取 消</el-button>
        <el-button type="primary" @click="postFace()">确 定</el-button>
      </div>
    </div>
    <!-- </el-dialog> -->
    <el-dialog :visible.sync="checkFaceView" width="581px" :show-close="false">
      <Face :faceView="checkFaceView" @canvasToImage="getImgFile"></Face>
    </el-dialog>
  </div>
</template>
<script>
// import { verifyFace } from "../../request/api"; //引入人脸识别接口
import Face from "@/components/Face/face.vue"; // 引入人脸识别组件
export default {
  name: "MyClassRoom",
  data() {
    return {
      openFaceView: true,
      faceloading: false,
      videoinput: false,
      fileList: [],
      face: "",
      checkFaceView: false,
    };
  },
  components: {
    Face,
  },

  methods: {
    // 弹出人脸识别框
    checkFace() {
      this.checkFaceView = true;
    },
    // 限制上传照片
    handleExceed() {
      this.$message.warning({
        message: "不要重复上传！",
        offset: 380,
        duration: 1000,
      });
    },
    // 移除人像图片
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传的文件
    handleChange(file) {
      this.face = file.raw;
    },
    // 获取截取图片
    getImgFile(d) {
      this.face = d;
      this.checkFaceView = false;
    },
    // 人脸识别完毕
    postFace() {
      this.faceloading = true;
      this.checkFaceView = false;
      let formData = new FormData();
      formData.append("face", this.face);
      /*人脸识别接口，把获取到的照片传到后台，我这里使用了封装axios。需要注意使用   config.headers = {'Content-Type':'multipart/form-data'} 传照片
       */
      //   verifyFace(formData, { isUpload: true })
      //     .then((res) => {
      //       console.log(res);
      //       if (res.code == 0) {
      //         this.faceloading = false;
      //         this.$message.success({
      //           message: "人脸识别成功！",
      //           offset: 380,
      //           duration: 1000,
      //         });
      //       } else {
      //         this.$message.error({
      //           message: "人脸识别失败！",
      //           offset: 380,
      //           duration: 1000,
      //         });
      //         this.faceloading = false;
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      this.faceloading = false;
      this.$message.success({
        message: "人脸识别成功！",
        offset: 380,
        duration: 1000,
      });
    },
  },
  created() {
    // 判断有无摄像头
    var deviceList = [];
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          deviceList.push(device.kind);
        });
        if (deviceList.indexOf("videoinput") == "-1") {
          console.info("没有摄像头");
          return false;
        } else {
          console.info("有摄像头");
          this.videoinput = true;
        }
      })
      .catch(function (err) {
        alert(err.name + ": " + err.message);
      });
  },
};
</script>
