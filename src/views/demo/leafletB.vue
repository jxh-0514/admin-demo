<!-- marker弹窗点击事件 -->
<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
//window.a = this.func //将vue方法挂载到window对象
export default {
    
  components: {},
    
  data() {
    return {
      map: null,
    //   mapUrl: require("@/assets/404_images/404.png"),
      bounds: [
        [0, 0],
        [1014, 556],
      ],
      imageOverLay: null,
      curData:'',
      gem: [],
      mapUrl: L.icon({
        iconUrl: require("@/assets/404_images/404.png"),
        iconSize: [34, 34],
        iconAnchor: [12, 25],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      pFlag: false,
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initLeaflet();
    
  },

  methods: {
    initLeaflet() {
      this.map = L.map("map", {
        center: [39.905963, 116.390813],
        zoom: 15,
        // continuousWorld: true,
        preferCanvas: true, //使用canvas模式渲染矢量图形
      });
      // this.tiles = L.tileLayer(this.mapUrl,{continuousWorld: true}).addTo(this.map);
      this.tiles = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(
        this.map
      );
    //   this.map.on("click", this.addEventMarker);
    this.markerPopup()
    },
    // 方法一  只能一个marker
    //添加点marker
    // addEventMarker(row) {
    //   console.log("====================================");
    //   console.log("row", row);
    //   console.log("====================================");
    //   if (this.marker) {
    //     //移除上一个事件mark
    //     this.marker.remove();
    //     this.marker = null;
    //   }
    //   var latlng = L.latLng(row.latlng.lat, row.latlng.lng);
    //   var eventMarker = L.marker(latlng, {
    //     // name:{hh:'ssss'},
    //     icon: L.icon({
    //       iconUrl: require(`@/assets/404_images/404.png`),
    //       iconSize: [40, 40],
    //       iconAnchor: [10, 10],
    //       tooltipAnchor: [0, -15],
    //     }),
    //   });
    //   eventMarker.addTo(this.map);
    //   this.map.setZoom(13);
    //   this.map.setView(latlng);
    //   this.marker = eventMarker;
    //   eventMarker.on("click", (e) => {
    //     var popup = L.popup();
    //     popup
    //       .setLatLng(e.latlng)
    //       .setContent(
    //         `<div id="event-popup">
    //     <div><span>${row.accidentSort == 1 ? "事故单位" : "事件单位"}:</span>${
    //           row.accidentUnitName
    //         }</div>
    // <div class="popup-detail"><span class="detail-button" id="hahah">
    // <botton>详情>></button><span></div></div>`,
    //         { className: "event-popup" }
    //       )
    //       .openOn(this.map);
    //   });

    //   this.map.on("popupopen", (ev1) => {
    //     let popupEle = ev1.popup.getElement();
    //     let ss = popupEle.querySelector(".detail-button");
    //     let id = ss.getAttribute("id");
    //     ss.addEventListener("click", (ev) => {
    //       console.log(this, `选中的是${id}`);
    //     });
    //   });
    // },
    // 方法二 
    markerPopup() {
        let arr = [
            {point:[39.905530, 116.391305],data:'1111'},
            {point:[39.905530, 116.491305],data:'2222'}
        ] //模拟数据
        this.gem = []
        for (let i = 0; i < arr.length; i++){
            const marker = L.marker(arr[i].point, {icon: this.mapUrl}).addTo(this.map);
            this.gem.push(marker)
            //监听marker点击事件，通过curData绑定点击事件需要传递的数据
            marker.on('click',()=>{
                this.curData = arr[i]
            })
            //给marker绑定标牌
            //标牌上按钮的点击事件绑定window上的a方法，这样就能调用vue的方法，并且通过marker点击事件能获取到循环传递的参数
            marker.bindPopup(
            `<div style='width:138px'><a id='aa' style='color:red'>收藏</a></div>`);
            console.log('循环', i, arr[i].point);
        }
        this.showPopup()
    },
    showPopup() {
        this.gem.map(item => {
            item.on('click', e => {
                if(this.pFlag) {
                    this.popupFlag()
                }
                this.$nextTick(() => {
                    const editRegion = document.getElementById("aa");
                    // const editRegion = document.getElementsByClassName("editRegion");
                    // const editRegion = document.querySelector(".editRegion");
                    console.log(editRegion);
                    editRegion.onclick = (e) => {
                    console.log('====================================');
                    console.log('点击', this.curData.data, e);
                    console.log('====================================');
                    this.pFlag = true
                    };
                })
            })
        })
    },
    popupFlag() {
        this.map.closePopup();
        this.pFlag = false
    }  
  }     
};
</script>
<style lang='scss' scoped>
#map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>