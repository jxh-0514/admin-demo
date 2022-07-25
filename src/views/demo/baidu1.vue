<template>
<div class="header">
  <div id="allmap">百度点聚合</div>
  <div id="position" class="main"></div>
</div>
</template>

<script>
// import '@/js/MarkerCluster';
var map = null;
export default {
    data() {
        return {
            // map: null,
            markerClusterer: null,
            timer: null,
        }
    },
    mounted () {
        this.initMap(); 
        // 实时获取所在位置
        // this.position();
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {
        initMap() {
            map = new BMap.Map('allmap');
            // this.map = new BMap.Map('allmap', {mapType: BMAP_HYBRID_MAP});
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
            map.enableScrollWheelZoom(true);
            console.log('加载百度地图');
            
            // this.timer = setInterval(() => {
                console.log(1111);
                map.clearOverlays()
                var aa = []
                var marker = null
                this.timer = null
                
                // this.markerClusterer = new BMapLib.MarkerClusterer(this.map, { markers: null });
                for (var i=0;i<100;i++) {
                    marker = new BMap.Marker(new BMap.Point(116.404+(Math.random()-0.3), 39.925+(Math.random()-0.3)));                    
                    aa.push(marker)
                }            
                this.markerClusterer = new BMapLib.MarkerClusterer(map, { markers: aa });
            // },10000)

            // this.timer = setInterval(() => {
            //     console.log(1111);
            //     map.clearOverlays()
            //     aa = []
            //     marker = null
            //     this.timer = null
                
            //     // this.markerClusterer = new BMapLib.MarkerClusterer(this.map, { markers: null });
            //     for (var i=0;i<100;i++) {
            //         marker = new BMap.Marker(new BMap.Point(116.404+(Math.random()-0.3), 39.925+(Math.random()-0.3)));                    
            //         aa.push(marker)
            //     }            
            //     this.markerClusterer = new BMapLib.MarkerClusterer(map, { markers: aa });
            // },10000)    
            
            function xun() {
                map.clearOverlays()
                aa = []
                marker = null
                this.timer = null
                
                // this.markerClusterer = new BMapLib.MarkerClusterer(this.map, { markers: null });
                for (var i=0;i<100;i++) {
                    marker = new BMap.Marker(new BMap.Point(116.404+(Math.random()-0.3), 39.925+(Math.random()-0.3)));                    
                    aa.push(marker)
                }            
                this.markerClusterer = new BMapLib.MarkerClusterer(map, { markers: aa });
            }
            setInterval(xun, 3000);
        },
        position() {
            map = new BMap.Map('allmap');
            // var index = 0;
            map.centerAndZoom(new BMap.Point(121.491, 31.233), 11); 
            map.enableScrollWheelZoom(true);
            var geolocation = new BMap.Geolocation({ maximumAge: 10 });
            function getPosition() {
                // index ++;
                
                geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == 0){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    document.getElementById('position').innerHTML = '您的位置：'+ r.address.province + r.address.city + r.address.district + r.address.street;
                    console.log('您的位置：'+r.point.lng+','+r.point.lat)
                    console.log(JSON.stringify(r));
                    console.log(r);
                    
                }
                else {
                    alert('failed'+this.getStatus());
                }        
                }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                })
            }
                getPosition();

            // setInterval(getPosition, 2000);
        }
    }
}
</script>

<style>
    #allmap {
        width: 100vw;
        height: 96vh;
    }
    .header {
        position: relative;
    }
    .main {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 100px;
        border: 1px solid #f00;
        background-color: #fff;
    }
</style>