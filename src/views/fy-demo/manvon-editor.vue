<template>
  <div>
    <mavon-editor
      v-model="content"
      :toolbars="toolbars"
      :imageFilter="uploadBefore"
      @imgAdd="$imgAdd"
      ref="md"
      @save="saveMavon"
    />
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      content: "", // 内容部分
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
     saveMavon(value, render) {
            console.log("this is render" + render);
            console.log("this is value" + value);
            console.log(this.$refs.md.d_render);
        },
        // 富文本编辑器
        uploadBefore(f) {
            if (f.size > 2016324) {
                this.gb.msgToast("error", "图片限制大小为2M");
                return false;
            } else {
                return true;
            }
        },
        // 将图片上传到服务器，返回地址替换到md中
        async $imgAdd(pos, $file) {
            console.log(pos, $file);
            // var formData = new FormData();
            // formData.append("file", $file);
            // uploadImage(formData).then(res => {
            //     if (res.code == 200) {
            //         var url = res.url;
            //         this.$refs.md.$img2Url(pos, url);
            //         this.saving = false;
            //     }
            // });
        },
  },
};
</script>

<style scoped></style>
