<!-- vue-esign电子签名 -->
<template>
  <div id="app">
    <!-- 做使用el-dialog做签字的弹框 -->
    <el-dialog title="签字" :visible.sync="dialogVisible" width="800px" append-to-body>
      <!-- 使用这个签名组件 -->
      <vue-esign
        ref="esign"
        class="mySign"
        :width="800"
        :height="300"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor.sync="bgColor"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleGenerate" type="primary">生成签字图片</el-button>
        <el-button @click="handleReset">清空画板</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 审查人点击确认签字按钮触发签字 -->
    <div class="checkMan">
      <h2>审查人</h2>
      <el-button plain @click="dialogVisible = true" type="primary">点击签字</el-button>
      <!-- 用户用来预览签字图片的地方 -->
      <img v-show="resultImg !== '' " :src="resultImg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      dialogVisible: false, // 弹框是否开启
      lineWidth: 6, // 画笔的线条粗细
      lineColor: "#000000", // 画笔的颜色
      bgColor: "", // 画布的背景颜色
      resultImg: "", // 最终画布生成的base64图片
      isCrop: true, // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
    };
  },
  methods: {
    // 清空画板
    handleReset() {
      this.$refs.esign.reset();
    },
    // 生成签字图
    handleGenerate() {
      this.$refs.esign
        .generate() // 使用生成器调用把签字的图片转换成为base64图片格式
        .then((res) => {
          this.resultImg = res;
        })
        .catch((err) => {
          // 画布没有签字时会执行这里提示一下
          this.$message({
            type: "warning",
            message: "请签名后再生成签字图片",
          });
        });

      // 在这里向后端发请求把转换后的base64文件传给后端，后端接收以后再转换成图片做静态图片存储
      // 当然也可以把base64转成流文件blob格式的，类似上传给后端这样，具体哪种方式看后端要求
      setTimeout(() => {
        // 这里要使用定时器稍微延后以后就能取到base64数据了，当然也可以再加一个确认按钮，如：确认使用这张base64签名图片
        // 点击确认以后，在其回调函数中，再把base64的签名图片传给后端用于存储
        console.log('我是签字后的base64图片',this.resultImg);
      }, 200);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  padding: 60px;
  .checkMan {
    width: 400px;
    height: 360px;
    text-align: center;
    border: 1px solid #e9e9e9;
    padding-top: 40px;
    h2 {
      margin-bottom: 20px;
    }
    .el-button {
      margin-bottom: 20px;
    }
    img {
      width: 100%;
      height: 200px;
    }
  }
}
/deep/ .el-dialog__body {
  // 设置一下签字区域的虚线边框
  .mySign {
    border: 1px dashed #000;
  }
}
</style>