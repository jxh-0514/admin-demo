<template>
  <div id="mapB"></div>
</template>

<script>
import ('leaflet-canvas-markers')
import L from "leaflet";
export default {
    data() {
        return {
            map:null,
            mapUrl:require('@/assets/404_images/404.png'),
            bounds: [
                [0,0],[1014,556]
            ],
            imageOverLay: null,
        }
    },
    mounted() {
        this.initLeaflet()
    },
    methods: {
        initLeaflet () {
            // if (this.map) {
            //     this.map.remove()
            // }
            // this.map = this.initLeafletMap('mapB')
            this.map = L.map('mapB', {           
                center: [39.905963, 116.390813],
                zoom: 15,                
                // continuousWorld: true,
                preferCanvas: true, //使用canvas模式渲染矢量图形                 
            });
            // this.tiles = L.tileLayer(this.mapUrl,{continuousWorld: true}).addTo(this.map);
            this.tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',).addTo(this.map);
            // this.imageOverLay = L.imageOverlay(this.mapUrl, this.bounds, {
            //     interactive: true, //允许地图触发事件
            // }).addTo(this.map);
        },

        // initLeafletMap  (id, zoom = 16)  {
        //     let normalMap = L.tileLayer(this.mapUrl,this.bounds)
        //     // let normal = L.layerGroup([normalMap])
        //     let map = L.map(id, {
        //         crs: L.CRS.Simple,
        //         center: [500, 275],
        //         zoom: zoom,
        //         layers: [normalMap],
        //         zoomControl: true,
        //         trackResize: true,
        //         continuousWorld: true,
        //     });
        //     //初始化绘制插件
        //     // L.PM.initialize();
        //     //中文
        //     // map.pm.setLang('zh')

        //     // 比例尺
        //     L.control.scale({maxWidth:200,metric:true,imperial:false}).addTo(map)
        //     return map
        // },
        // 加载海量点==================
        loadMarkers () {
        // 清除海量点
        if (this.ciLayer) {
            this.map.removeLayer(this.ciLayer)
        }
        let params = {
            highLat: mapDrag(this.map)[0],
            highLng: mapDrag(this.map)[1],
            lowLat: mapDrag(this.map)[2],
            lowLng: mapDrag(this.map)[3]
        }
        // 接口请求海量点
        getMarkerList(params).then(res => {
            if (res.code === 0) {
            let data = res.data
            // 使用canvas模式渲染marker
            this.ciLayer = L.canvasIconLayer({}).addTo(this.map)

            data.forEach(res => {
                let iconUrl = require(`@/assets/404_images/404.png`)
                let icon = L.icon({
                iconUrl: iconUrl,
                iconSize: [16, 25],
                iconAnchor: [8, 12.5]
                })
        
                res.list.forEach(retail => {
                let marker = L.marker([retail.latitude, retail.longitude], {
                    icon: icon
                }).bindPopup('<div class="dialog-marker-warp">\n' +
                    '                <p class="flex-row marker-grid-name">' + res.gridName + '</p>\n' +
                    '                <p class="marker-shop-name">' + retail.name + '</p>\n' +
                    '                <p class="marker-address">' + retail.address + '</p>\n' +
                    '                <div class="flex-row marker-license">' +
                    '                  <p>证号：</p>' +
                    '                  <p>' + retail.no +'</p>' +
                    '                </div>\n' +
                    '                <div class="flex-row marker-name">' +
                    '                  <p>负责人：</p>' +
                    '                  <p>' + retail.userName +'</p>' +
                    '                </div>\n' +
                    '                <div class="flex-row marker-phone">' +
                    '                  <p>电&emsp;话：</p>' +
                    '                  <p>' + retail.userPhone +'</p>' +
                    '                </div>\n' +
                    '        </div>')
                this.ciLayer.addLayer(marker)
                })
            })

            // 以下, this.map.removeLayer(this.ciLayer) 后,优化清空后再加载marker偏移
            let center = this.map.getCenter()
            this.map.panTo([center.lat, center.lng], {
                animate: true
            })
            }
        })
        },
        //海量点点击事件============
        loadMarkersB () {
            // 清除海量点
            if (this.ciLayer) {
                this.map.removeLayer(this.ciLayer)
            }
            let params = {
                highLat: mapDrag(this.map)[0],
                highLng: mapDrag(this.map)[1],
                lowLat: mapDrag(this.map)[2],
                lowLng: mapDrag(this.map)[3]
            }
            // 接口请求海量点
            getMarkerList(params).then(res => {
                if (res.code === 0) {
                let data = res.data
                // 使用canvas模式渲染marker
                this.ciLayer = L.canvasIconLayer({}).addTo(this.map)

                data.forEach(res => {
                    let iconUrl = require(`@/assets/404_images/404.png`)
                    let icon = L.icon({
                    iconUrl: iconUrl,
                    iconSize: [16, 25],
                    iconAnchor: [8, 12.5]
                    })
            
                    res.list.forEach(retail => {
                    let marker = L.marker([retail.latitude, retail.longitude], {
                        icon: icon
                    })
                    // marker.on('click', (res) => {}) 点击事件无效

                    this.ciLayer.addLayer(marker)
                    })
                })

                // 覆盖点点击事件
                this.ciLayer.addOnClickListener((_, data) => {
                    this.markerIconShow(data[0].data)
                })
                
                // 以下, this.map.removeLayer(this.ciLayer) 后,优化清空后再加载marker偏移
                let center = this.map.getCenter()
                this.map.panTo([center.lat, center.lng], {
                    animate: true
                })
                }
            })
        },
    }
}
</script>

<style>
#mapB{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>