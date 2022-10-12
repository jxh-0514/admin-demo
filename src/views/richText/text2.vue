<template>
  <div class="edit_container">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
    <h1>实时预览</h1>
    <div v-html="content"></div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调⽤编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: "",
      editorOption: {},
      dialogVisible: false,
    };
  },
  methods: {
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorReady() {}, // 准备富文本编辑器
    // 内容改变事件
    onEditorChange(editor) {
      // 富⽂本中的内容，这边可以将富⽂本内容进⾏操作
      let html = editor.html;
      // 例如将获取到的⽂本中的图⽚或视频的尺⼨改为宽100%，⾼度⾃适应，⼀般在移动端避免尺⼨不⼀致
      html = html.replace(
        /\<img/gi,
        '<img style="max-width: 100%;width: 100%;height:auto"'
      );
      html = html.replace(
        /\<video/gi,
        '<video style="max-width: 100%;width: 100%;height:auto"'
      );
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>
<style>
.tox-tinymce-aux {
  z-index: 2009 !important;
}
</style>
