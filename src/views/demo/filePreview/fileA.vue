<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-01-17 14:45:53
 * @LastEditors: 杭
 * @LastEditTime: 2023-01-17 18:16:37
-->
<!-- 文件预览 -->
<template>
  <div>
    <el-button @click="preview(fileUrl)">PDF文件预览</el-button>
    <el-button @click="preview(fileUrlB)">word文件预览</el-button>
    <el-button @click="preview(fileUrlC)">excel文件预览</el-button>
    <el-dialog :visible.sync="dialog" width="60%" @close="closeDialog">
      <iframe :src="fileUrl" frameborder="0" width="100%" height="600"></iframe>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      dialog: false,
      fileUrl: "https://www.dcloud.io/docs/a/unipush/manufacturer.pdf",
      fileUrlB: "https://kdocs.cn/l/cuqZylVo4siA?f=201",
      fileUrlC: "https://kdocs.cn/l/cvFo5pOUp3Tc?f=201",
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
    closeDialog() {
      this.fileUrl = "";
    },
    // 使用微软官方预览地址
    preview(row) {
      let index = row.lastIndexOf(".");
      let ext = row.substr(index);
      console.log("地址", ext);
      if (ext == ".xls" || ext == ".doc") {
        this.fileUrl = `https://view.officeapps.live.com/op/view.aspx?src=${row}`;
      } else {
        this.fileUrl = row;
      }
      this.dialog = true;
    },
  },
};
</script>
<style lang="scss" scoped></style>
