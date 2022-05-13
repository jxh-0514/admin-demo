<template>

  <div id="fengmap">12121212121212</div>

  
</template>
<!--<script src="../js/fengmap.map.min.js"></script>-->
<script>
// import fengmap from "fengmap/build/fengmap.map.min"; //核心包
// import "fengmap/build/fengmap.analyser.min"; //分析器
// import "fengmap/build/fengmap.plugin.min"; //插件包
// import "fengmap/build/fengmap.effect.min"; //特效包
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    map:'',
    options:'',
  },
  data() {
    return {};
  },
  mounted() {
    this.bus.$on('chuanchuan',()=>{
     console.log('接到了');
    })
    // this.start()
  },
  methods: {
    start() {
    this.options = {
      appName: "蜂鸟研发SDK_2_0",
      key: "57c7f309aca507497d028a9c00207cf8",
      mapID: "1321274646113083394",
      container: document.getElementById("fengmap"),
    };
    this.map = new fengmap.FMMap(this.options);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// .main{
//   margin:0;
//   padding: 0;
//   overflow: hidden;
//   width: 1000px;
//   height: 1000px;
//   position: relative;
// }
#fengmap {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90px;
   canvas{
    top:10%;
  }
}
</style>
