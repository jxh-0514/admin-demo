<template>
  <div class="edit_container">
    <el-button  @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      :title="dialogTitle"
      :append-to-body="true"
      class="editor_dialog"
      :visible.sync="dialogVisible"
      width="70%"
      @closed="editorDialogClose"
    >
      <!-- <tinymce-editor
            v-model="addForm.content"
            ref="editor"            
          ></tinymce-editor> -->
        <tinymce-editor ref="myTinymce" :tinymceHtml="content"></tinymce-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveArticle">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
// import Editor from "@tinymce/tinymce-vue";
import TinymceEditor from "@/components/Editor.vue";
export default {
    components: { TinymceEditor },
    data() {
        return {
            content: '',           
            dialogTitle: '富文本',
            dialogVisible: false,            
        }
    },
    methods: {
        handleClose(done) {
            this.dialogVisible = false
        },
        saveArticle() {

        },
        editorDialogClose() {
            this.dialogVisible = false
        }
    },
}
</script>

<style>
.tox-tinymce-aux{

  z-index: 2009!important;

}
</style>