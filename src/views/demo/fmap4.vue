<template>
  <div id="fmap"></div>
</template>

<script>
// import '../js/fengmap.map.min1.js'
// import '../js/fengmap.effect.min.js'
// import '../js/fengmap.analyser.min.js'
// import '../js/fengmap.plugin.min.js'
export default {
  data () {
    this.map = null
    return {}
  },
  mounted () {
    this.openMap()
  },
  methods: {
    openMap () {
      let fmapID = '10347'
      let mapOptions = {
        container: document.getElementById('fmap'),
        // 地图数据位置
        // mapServerURL: '../../static/data/' + fmapID,
        // // 主题数据位置
        // mapThemeURL: '../../static/data/theme',
        // defaultThemeName: '2001',
        // 必要，地图应用名称，通过蜂鸟云后台创建
        appName: '蜂鸟研发SDK_2_0',
        // 必要，地图应用密钥，通过蜂鸟云后台获取
        key: '57c7f309aca507497d028a9c00207cf8'

        // appName: "蜂鸟研发SDK_2_0",
        // key: "57c7f309aca507497d028a9c00207cf8",
        // mapID: "1321274646113083394",
      }
      this.map = new fengmap.FMMap(mapOptions)
      this.map.openMapById(fmapID, (error) => {
        console.log(error)
      })

      this.map.on('loadComplete', () => {
        console.log('地图加载完成！')

        this.loadScrollFloorCtrl()
      })
    },
    // 加载滚动型楼层切换控件
    loadScrollFloorCtrl () {
      let scrollFloorCtlOpt = {
        position: fengmap.FMControlPosition.RIGHT_TOP,
        showBtnCount: 6,
        allLayer: false,
        needAllLayerBtn: true,
        offset: {
          x: -20,
          y: 20
        },
        // 配置图片资源的路径地址，'./'是在static文件下
        imgURL: '../../static/images/'
      }
      let scrollFloorControl = new fengmap.FMScrollGroupsControl(
        this.map,
        scrollFloorCtlOpt
      )
      // 楼层切换
      scrollFloorControl.onChange((groups, allLayer) => {
        console.log(groups)
      })
    }
  }
}
</script>

<style>
#fmap {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    touch-action: none;
    -ms-touch-action: none;
}
</style>
