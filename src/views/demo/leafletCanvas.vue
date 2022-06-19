<template>
  <div  id="map">

  </div>
</template>

<script>
// import  "@/utils/leaflet.canvas-markers"
import('leaflet-canvas-marker-xrr2021')

import L from "leaflet";
export default {
   data(){
     return {
        map:null,
        bounds: [
          [0,0],[3750,5000]
        ],
        // bounds: [
        //   [0,0],[1014,556]
        // ],
        center: [
         1876,2500
        ],
        crs: L.CRS.Simple,
        tiles:'',
        ciLayer:'',
        mapUrl:require('@/assets/aa.jpg'),
        imageOverLay: null,
     }
   },
   mounted(){
     this.init()
   },
   methods:{
      init(){
         this.map = L.map('map', {           
            // center: [50, 250],
            center: [1876,2500],
            // center: [39.905963, 116.390813],
            zoom: -3,
            crs: L.CRS.Simple,
            // continuousWorld: true,
            bounds: this.bounds,
            // noWrap: true,
            minZoom: -3,
            preferCanvas: true //使用canvas模式渲染矢量图形 
        });

        //添加底图
        //  this.tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{minZoom: 3,continuousWorld: true,bounds: this.bounds}).addTo(this.map);
        //  this.tiles = L.imageOverlay(this.mapUrl).addTo(this.map);
        //  this.tiles = L.tileLayer(this.mapUrl,{continuousWorld: true,bounds: this.bounds}).addTo(this.map);
        //  this.tiles = L.tileLayer(this.mapUrl,{continuousWorld: true,bounds: this.bounds}).addTo(this.map);
        //  this.tiles.addOnClickListener((event, data) => {
        //     let centerPoint = []
        //     centerPoint[0] = event.latlng.lng
        //     centerPoint[1] = event.latlng.lat
        //     this.map.panTo([centerPoint[1],centerPoint[0]])
        //     this.showModal(data[0].data.options.alt)
        //  });
         this.imageOverLay = L.imageOverlay(this.mapUrl, this.bounds, {
        interactive: true, //允许地图触发事件
      }).addTo(this.map);
        //使用canvas模式渲染marker
         this.ciLayer = L.canvasIconLayer({}).addTo(this.map);
         for (var i = 0; i < 100000; i++) {  
            var lat = 1876 + (Math.random() - Math.random()) * 3;
            var lng = 2500 + (Math.random() - Math.random()) * 3;
            // var lat = 39.905963 + (Math.random() - Math.random()) * 3;
            // var lng = 116.390813 + (Math.random() - Math.random()) * 3;

            //在这里设置图片和文字，调整位置，让文字显示在图片上
            var icon = L.icon({
                iconUrl: require('@/assets/404_images/404_cloud.png'),
                iconSize: [34, 34],
                iconAnchor: [40, 20],

                //添加文字
                text:i.toString(),
                textAnchor: [5, 0],         
                textFont:'14px bold',       //设置字体大小和样式
                textFillStyle:'#FFFFFF'     //设置字体颜色
            });

            var marker = L.marker([lat, lng], {
                    icon: icon
                })
                .bindPopup("I Am " + i); //绑定气泡窗口

            this.ciLayer.addLayer(marker);
        }
      }
   }
}
</script>

<style scoped>
#map{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>