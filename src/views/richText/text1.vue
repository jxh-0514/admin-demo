<template>
    <div>
        <el-button  @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
            <VueEditor class="rich" v-model="content"></VueEditor>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>   
        
        <h1>实时预览</h1>
        <div v-html="content"></div>
    </div>
    
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
    components:{
        VueEditor
    },
    data() {
        return {
            content: '',
            dialogVisible: false
        }
    },
    methods: {
    handleClose(done) {
        this.dialogVisible = false
      }
  },
}
</script>

<style lang="scss" scoped>
.rich{
    width: 80%;
    height: 500px;
    margin: 0 auto 50px;
}
</style>