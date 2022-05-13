<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <el-button @click="dian">传值</el-button>
    <HelloWorld />
    <!-- <Fmap2 v-show="flag == true" /> -->
    <el-button class="ml-15" type="primary" @click="onSearchChange">切换</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import Fmap2 from '@/components/fmap2/fmap2.vue'

export default {
  name: 'Home',
  data () {
    return {
      flag: false,
    }
    
  },  
  components: {
    HelloWorld,
    // Fmap2
  },
  methods: {
    dian(){
      this.bus.$emit('chuanchuan')
    },
    onSearchChange () {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="less" >
.home{
  margin:0;
  padding: 0;
  overflow: hidden;  
 
}
</style>
