<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-06-08 23:32:53
 * @LastEditors: 杭
 * @LastEditTime: 2023-06-08 23:52:09
-->
<!-- canvas水印 -->
<template>
  <div>
    <img :src="img" alt="" ref="imageCon" />
    <button @click="handleAddWaterMark">添加水印</button>
    <el-switch
      v-model="model"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="铺满"
      inactive-text="单图"
      @change="handleSwitch"
    ></el-switch>
    <img :src="markImg" alt="" />
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      img: require("@/assets/gdjx.png"),
      markImg: "",
      model: false,
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
    handleSwitch(val) {
      console.log("开关", val, this.model);
    },
    handleAddWaterMark() {
      let content = "我就是一个水印";
      let height = 80; //两个水印之间的垂直高度
      let width = 70; //两个水印之间的水平高度
      let fontSize = 14; //水印字体大小
      let imageCon = this.$refs.imageCon; //获取图片
      let canvas = document.createElement("canvas"); //创建canvas容器
      canvas.width = imageCon.width; //设置canvas容器宽度
      canvas.height = imageCon.height; //设置canvas容器高度

      let ctx = canvas.getContext("2d"); //获取2d画笔

      //在canvas画布上绘制图片 ctx.drawImage(图片, x位置, y位置,  图像宽度, 图像高度);
      ctx.drawImage(imageCon, 0, 0, imageCon.width, imageCon.height);

      //设置文本画笔的样式
      ctx.textAlign = "left"; //设置文本对齐方式
      ctx.textBaseline = "top"; //设置文本基线
      ctx.font = `${fontSize}px Microsoft Yahei`; //设置文本字体属性
      ctx.fillStyle = "rgba(1, 255, 255,1)"; //设置文本字体颜色

      //在canvas画布上绘制文字 ctx.fillText(文字内容, x位置, y位置, 文本最大宽度)
      if (this.model) {
        // 水印铺满模式
        ctx.rotate((17 * Math.PI) / 180); //文本旋转角度设置
        let i = 0,
          j = 0,
          waterMarkerWidth = content.split("").length * fontSize;
        for (i = 0; i < imageCon.width / waterMarkerWidth; i++) {
          for (j = 0; j < imageCon.height / (height - 20); j++) {
            if (j == 0) {
              ctx.fillText(
                content,
                i * (waterMarkerWidth + width),
                -height,
                imageCon.width
              );
            }
            ctx.fillText(
              content,
              i * (waterMarkerWidth + width),
              j * height,
              imageCon.width
            );
          }
        }
      } else {
        ctx.fillText(
          content,
          imageCon.width - (content.split("").length * 14 + 10),
          imageCon.height - (14 + 10),
          imageCon.width
        ); //14为文字大小
      }

      this.markImg = canvas.toDataURL("image/png"); //把canvas转base64输出
    },
  },
};
</script>
<style lang="scss" scoped></style>
