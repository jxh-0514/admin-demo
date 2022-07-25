<template>
  <div class="sign">
    <sign-canvas
      class="sign-canvas"
      ref="SignCanvas"
      :options="options"
      v-model="value"
    />
    <div class="btnList" ref="btnList">
      <el-button type="danger"  size="small" @click="clearSignImg">清空</el-button>
      <el-button type="primary"  size="small" class="ml30 mr30" @click="saveSignImg">保存</el-button>
      <el-button type="primary"  size="small" @click="back">返回</el-button>
    </div>
  </div>
</template>
 
<script>
//接口引入
// import { signShipmentsContract } from "../../api/userMG";
import SignCanvas from "sign-canvas";
export default {
//   name: "signDialog",
  components: {
    SignCanvas
  },
  //props: {
    //组件传递的值
    //visible: {
      //type: Boolean,
      //default: false,
    //},
    //图片信息Base64
    //src: {
      //type: String,
      //default: null,
    //},
  //},
  data() {
    return {
      value: null,
      //配置
      options: {
        lastWriteSpeed: 1, //书写速度 [Number] 可选
        lastWriteWidth: 2, //下笔的宽度 [Number] 可选
        lineCap: "round", //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
        lineJoin: "round", //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
        canvasWidth: "750", //canvas宽高 [Number] 可选
        canvasHeight: "500", //高度  [Number] 可选
        isShowBorder: false, //是否显示边框 [可选]
        bgColor: "#fcc", //背景色 [String] 可选
        borderWidth: 1, // 网格线宽度  [Number] 可选
        borderColor: "#ff787f", //网格颜色  [String] 可选
        writeWidth: 5, //基础轨迹宽度  [Number] 可选
        maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
        minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
        writeColor: "#101010", // 轨迹颜色  [String] 可选
        isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
        imgType: "png", //下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
      },
    };
  },
  created() {
 
  },
  mounted() {
    let windowHeight = document.documentElement.clientHeight;
    let btnList = this.$refs.btnList.offsetHeight;
    let windowWidth = document.documentElement.clientWidth;
    this.options.canvasWidth = windowWidth;
    this.options.canvasHeight = windowHeight - btnList;
    // console.log(this.$refs.SignCanvas.saveAsImg(),"this.$refs.SignCanvas.saveAsImg()")
 
  },
  methods: {
    //清除画板
    clearSignImg() {
      this.$refs.SignCanvas.canvasClear();
    },
    // 保存图片
    // saveSignImg() {
    //   console.log(this.value, "value");
    //   if (this.value == null) {
    //     this.$toast.fail("请先签名");
    //   } else {
    //     this.$dialog
    //       .confirm({
    //         title: "签名确认",
    //         message: "请先确认签名是否正确,一旦签名成功，无法撤销",
    //       })
    //       .then(() => {
    //         console.log(1);
    //         const img = this.$refs.SignCanvas.saveAsImg();
    //         this.signShipmentsContractFun(img);
    //       })
    //       .catch(() => {
    //         console.log(2);
    //         this.$toast.fail({
    //           message: "签名取消,请重新签名",
    //           onClose: () => {
    //             this.$refs.SignCanvas.canvasClear();
    //           },
    //         });
    //       });
    //   }
    // },
    saveSignImg() {
      console.log(this.value, "value");
      if (this.value == null) {
        this.$message.fail("请先签名");
      } else {
        this.$dialog
          .confirm({
            title: "签名确认",
            message: "请先确认签名是否正确,一旦签名成功，无法撤销",
          })
          .then(() => {
            console.log(1);
            const img = this.$refs.SignCanvas.saveAsImg();
            this.signShipmentsContractFun(img);
          })
          .catch(() => {
            console.log(2);
            this.$toast.fail({
              message: "签名取消,请重新签名",
              onClose: () => {
                this.$refs.SignCanvas.canvasClear();
              },
            });
          });
      }
    },
    //下载图片/
    // downloadSignImg() {
    //   this.$refs.SignCanvas.downloadSignImg();
    // },
    back() {
      this.$router.back(-1);
    },
    // 签名
    signShipmentsContractFun(img) {
      let params = {
        contractId: this.$route.query.contractId,
        carrierContractPicture: img,
        contractInfoDto: JSON.parse(this.$route.query.contractList),
      };
      signShipmentsContract(params)
        .then((res) => {
          console.log(res, "签名");
          if (res.code == 200) {
            this.$toast.success({
              message: "保存成功",
              onClose: () => {
                this.$router.back(-1);
              },
            });
          } else {
            this.$toast.fail(res.msg);
          }
        })
        .catch((error) => {});
    },
  },
};
</script>
 
<style lang="scss" scoped>
.btnList {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
}
.sign-canvas {
  display: block;
  margin: 0 auto;
  background: #F1F1F1 !important;
  border-radius: 8px;
}
</style>