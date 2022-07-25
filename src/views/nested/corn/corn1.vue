<template>
  <div class="cronDemo">
    <el-popover v-model="isShow">
      <el-input slot="reference" @click="cronPopover=true" 
        v-model="cron" placeholder="请输入定时策略" 
        style="margin-left: -50%">
      </el-input>
      <cron @change="changeCron" @close="cronPopover=false" ></cron>
    </el-popover>
  </div>
</template>
 
<script>
  import {cron} from 'vue-cron';
  export default {
    components: {cron},
    data(){
      return {
        isShow: false,
        cron:'',
        cronPopover: false,
      }
    },
    methods: {
      changeCron(val){
        this.cron=val
      },
    }
  }
</script>
<style lang="scss" scoped>
    .cronDemo{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
