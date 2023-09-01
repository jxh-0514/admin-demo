<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-08-31 09:55:54
 * @LastEditors: 杭
 * @LastEditTime: 2023-09-01 17:34:31
-->
<!-- 文件预览 -->
<template>
  <div>
    <el-table :data="excelData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in excelHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="previewFn(scope.row)"
            >预览</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="预览" append-to-body :visible.sync="dialog.dialogVisible">
      <div :class="[checkClass]" class="check" />
      <div v-if="dialog.isPdf" v-loading="iframeLoading" class="pdfClass">
        <iframe
          :src="dialog.src"
          style="width: 100%; height: 100%"
          type="application/x-google-chrome-pdf"
        />
      </div>
      <!-- <div v-else-if="dialog.isExcel" class="excelClass" v-html="excelHtml" /> -->
      <div v-else-if="dialog.isExcel">
        <el-table
          :data="excelData"
          border
          stripe
          :header-cell-style="{ background: '#F5F4F7' }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
            :resizable="false"
            align="center"
          />
          <el-table-column
            v-for="(value, key, index) in excelData[0]"
            :key="index"
            :prop="key"
            :label="key"
          />
        </el-table>
      </div>
      <div v-else-if="dialog.isWord" class="wordClass" v-html="wordHtml" />
      <div v-else class="imgfile">
        <img style="width: 100%; height: 100%" :src="dialog.src" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import mammoth from "mammoth";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      excelHtml: "",
      wordHtml: "",
      excelData: [
        {
          name: "pdf",
          url: "https://www.dcloud.io/docs/a/unipush/manufacturer.pdf",
        },
        {
          name: "word",
          url: "http://oss.mcweb.club/1.doc",
        },
        {
          name: "图片.jpg",
          url: "http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg",
        },
        {
          name: "pdf",
          url: "/camera/player.pdf",
        },
      ],
      excelHeader: [{ prop: "name", label: "文件名称🙂" }],
      dialog: {
        dialogVisible: false,
        src: "",
        isPdf: false,
        isExcel: false,
        isWord: false,
      },
      checkClass: "",
      iframeLoading: false,
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
    // 预览
    previewFn(item) {
      if (
        !(
          item.url.includes(".png") ||
          item.url.includes(".jpg") ||
          item.url.includes(".jpeg") ||
          item.url.includes(".bmp") ||
          item.url.includes(".JPG") ||
          item.url.includes(".PNG") ||
          item.url.includes(".JPEG") ||
          item.url.includes(".BMP") ||
          item.url.includes(".pdf") ||
          item.url.includes(".txt") ||
          item.url.includes(".xls") ||
          item.url.includes(".doc")
        )
      ) {
        this.$message.warn("文件类型不支持预览");
        return false;
      }
      if (item.url.includes(".pdf") || item.url.includes(".txt")) {
        this.dialog.isPdf = true;
        this.dialog.isExcel = false;
        this.dialog.isWord = false;
        this.dialog.src = "";
        // this.iframeLoading = true;
        // downloadFileByUniq(encodeURIComponent(item.url))
        //   .then((res) => {
        //     const blob = new Blob([res], {
        //       type: item.url.includes(".pdf") ? "application/pdf;" : "",
        //     });
        //     const href = window.URL.createObjectURL(blob);
        //     this.dialog.src = href;
        //   })
        //   .finally(() => {
        //     this.iframeLoading = false;
        //   });

        // const blob = new Blob(res, {
        //     type: item.url.includes(".pdf") ? "application/pdf;" : "",
        //   });
        //   const href = window.URL.createObjectURL(blob);
        //   this.dialog.src = href;

        fetch(item.url)
          .then((res) => res.blob())
          .then((blob) => {
            const href = window.URL.createObjectURL(blob);
            this.dialog.src = href;
          });
      } else if (item.url.includes(".xls")) {
        this.dialog.isExcel = true;
        this.dialog.isWord = false;
        this.dialog.isPdf = false;
        // downloadFileByUniq2(encodeURIComponent(item.url)).then((data) => {
        //   const workbook = XLSX.read(new Uint8Array(data), { type: "array" }); // 解析数据
        //   var worksheet = workbook.Sheets[workbook.SheetNames[0]]; // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
        //   // this.excelHtml = XLSX.utils.sheet_to_html(worksheet) // 渲染成html
        //   const sheet2JSONOpts = {
        //     /** Default value for null/undefined values */
        //     defval: "", // 给defval赋值为空的字符串,不然没值的这列就不显示
        //   };
        //   // 渲染成json
        //   this.excelData = XLSX.utils.sheet_to_json(worksheet, sheet2JSONOpts);
        //   console.log(this.excelData);
        // });
        const workbook = XLSX.read(new Uint8Array(data), { type: "array" }); // 解析数据
        var worksheet = workbook.Sheets[workbook.SheetNames[0]]; // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
        // this.excelHtml = XLSX.utils.sheet_to_html(worksheet) // 渲染成html
        const sheet2JSONOpts = {
          /** Default value for null/undefined values */
          defval: "", // 给defval赋值为空的字符串,不然没值的这列就不显示
        };
        // 渲染成json
        this.excelData = XLSX.utils.sheet_to_json(worksheet, sheet2JSONOpts);
        console.log(this.excelData);
      } else if (item.url.includes(".doc")) {
        var vm = this;
        this.dialog.isWord = true;
        this.dialog.isExcel = false;
        this.dialog.isPdf = false;
        // downloadFileByUniq2(encodeURIComponent(item.url)).then((data) => {
        //   mammoth
        //     .convertToHtml({ arrayBuffer: new Uint8Array(data) })
        //     .then(function (resultObject) {
        //       vm.$nextTick(() => {
        //         vm.wordHtml = resultObject.value;
        //       });
        //     });
        // });
      } else {
        this.dialog.isPdf = false;
        this.dialog.isExcel = false;
        this.dialog.isWord = false;
        this.dialog.src = item.url;
      }
      this.dialog.dialogVisible = true;
      this.checkClass = "check" + item.intinvoicestatus;
    },
  },
};
</script>
<style lang="scss" scoped>
.pdfClass {
  width: 100%;
  height: 500px;
}
</style>
