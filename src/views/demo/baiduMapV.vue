<template>
  <div>
    <div id="map"></div>
    <canvas id="canvas"></canvas>
    <div id="test"></div>
  </div>
</template>

<script>
var aa = 123;
var map = null;
var opts = {
  width: 200, // 信息窗口宽度
  height: 100, // 信息窗口高度
  title: "故宫博物院", // 信息窗口标题
  message: "这里是故宫",
};
var infoWindow = new BMap.InfoWindow(
  "地址：北京市东城区王府井大街88号乐天银泰百货八层",
  opts
); // 创建信息窗口对象
// function btnMarker(e) {
//             var marker = new BMap.Marker(new BMap.Point(e[0], e[1]));  // 创建标注
//             // map.addOverlay(marker);              // 将标注添加到地图中
//             var opts = {
//                 width : 200,     // 信息窗口宽度
//                 height: 100,     // 信息窗口高度
//                 title : "故宫博物院" , // 信息窗口标题
//                 message:"这里是故宫"
//             }
//             var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象
//             marker.addEventListener("click", function(){
//                 map.openInfoWindow(infoWindow, new BMap.Point(e[0], e[1])); //开启信息窗口
//             });
//         }
export default {
  data() {
    return {
      randomCount: 100, //设置点数量
      mapvLayer: null,
      point: [],
      data: [],
      citys: [
        "北京",
        "天津",
        "上海",
        "重庆",
        "石家庄",
        "太原",
        "呼和浩特",
        "哈尔滨",
        "长春",
        "沈阳",
        "济南",
        "南京",
        "合肥",
        "杭州",
        "南昌",
        "福州",
        "郑州",
        "武汉",
        "长沙",
        "广州",
        "南宁",
        "西安",
        "银川",
        "兰州",
        "西宁",
        "乌鲁木齐",
        "成都",
        "贵阳",
        "昆明",
        "拉萨",
        "海口",
      ],
    };
  },
  watch: {
    point() {},
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      map = new BMap.Map("map"); //创建map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 5); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      // this.map.setMapStyle({
      //     style: 'midnight'
      // });

      //获取地图中心点
      map.addEventListener("dragend", function () {
        //alert("你点击了地图");
        // alert("当前地图中心点：" + map.getCenter().lng + "," + map.getCenter().lat);
        map.clearOverlays();
        var marker1 = new BMap.Marker(
          new BMap.Point(map.getCenter().lng, map.getCenter().lat)
        ); // 创建标注
        map.addOverlay(marker1); // 将标注添加到地图中
      });

      // 构造数据
      for (var i = 0; i < this.randomCount; i++) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(
          this.citys[parseInt(Math.random() * this.citys.length)]
        );
        this.data.push({
          geometry: {
            type: "Point",
            coordinates: [
              cityCenter.lng - 5 + Math.random() * 10,
              cityCenter.lat - 5 + Math.random() * 10,
            ],
          },
          // 具体点的icon设置
          // iconOptions: {
          //     url: ['images/flag.png', 'https://mapv.baidu.com/examples/images/marker.png', 'images/star.png'][this.randomCount % 3], // 非聚合时点的icon,可设置为空
          //     width: 50 / 3,
          //     height: this.randomCount % 3 === 2 ? 50 / 3 : 77 / 3
          // }
        });
      }

      var dataSet = new mapv.DataSet(this.data);
      var options = {
        // shadowColor: 'rgba(255, 250, 50, 1)',
        // shadowBlur: 10,
        // 非聚合点的颜色和大小，未设置icon或icon获取失败时使用
        fillStyle: "rgba(255, 50, 0, 1.0)",
        size: 50 / 3 / 2, // 非聚合点的半径
        // 非聚合时点的icon设置，会被具体点的设置覆盖，可设置为空
        iconOptions: {
          url: "http://rfiq.cn:6794/Upload/20211213161931805CtD.png",
          width: 50 / 3,
          height: 77 / 3,
          offset: {
            x: 0,
            y: 0,
          },
        },
        minSize: 8, // 聚合点最小半径
        maxSize: 31, // 聚合点最大半径
        globalAlpha: 0.8, // 透明度
        clusterRadius: 150, // 聚合像素半径
        maxClusterZoom: 18, // 最大聚合的级别
        maxZoom: 19, // 最大显示级别
        minPoints: 5, // 最少聚合点数，点数多于此值才会被聚合
        extent: 400, // 聚合的细腻程度，越高聚合后点越密集
        label: {
          // 聚合文本样式
          show: true, // 是否显示
          fillStyle: "white",
          // shadowColor: 'yellow',
          // font: '20px Arial',
          // shadowBlur: 10,
        },
        gradient: { 0: "blue", 0.5: "yellow", 1.0: "rgb(255,0,0)" }, // 聚合图标渐变色
        draw: "cluster",
        methods: {
          click(point) {
            if (point) {
              if (point.iconOptions) {
                console.log(point.iconOptions.url);
              }
              // 通过children可以拿到被聚合的所有点
              console.log(point.geometry.coordinates);

              // var marker = new BMap.Marker(new BMap.Point(point.geometry.coordinates[0], point.geometry.coordinates[1]));  // 创建标注
              // map.addOverlay(marker);              // 将标注添加到地图中
              var point2 = new BMap.Point(
                point.geometry.coordinates[0],
                point.geometry.coordinates[1]
              );
              // map.addEventListener("click", function(){
              map.openInfoWindow(infoWindow, point2); //开启信息窗口
              // });
            }
          },
          //  mousemove: function(item) { // 鼠标移动事件，对应鼠标经过的元素对象值
          //     console.log('鼠标移动事件',item);
          //     if (item !== null && item.geometry) {
          //         var point2 = new BMap.Point(item.geometry.coordinates[0], item.geometry.coordinates[1])
          //     map.openInfoWindow(infoWindow, point2); //开启信息窗口
          // }},
        },
      };
      // this.mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

      // this.map.addEventListener('click', function (e) {
      //     alert('点击位置经纬度：' + e.point.lng + ',' + e.point.lat);
      //     console.log('地图点击事件',e);
      // });

      // ================================================================================
      this.timer = setInterval(() => {
        console.log(123);

        this.data = [];
        map.clearOverlays();
        for (var i = 0; i < this.randomCount; i++) {
          var cityCenter = mapv.utilCityCenter.getCenterByCityName(
            this.citys[parseInt(Math.random() * this.citys.length)]
          );
          this.data.push({
            geometry: {
              type: "Point",
              coordinates: [
                cityCenter.lng - 5 + Math.random() * 10,
                cityCenter.lat - 5 + Math.random() * 10,
              ],
            },
            // 具体点的icon设置
            iconOptions: {
              url: [
                "images/flag.png",
                "http://rfiq.cn:6794/Upload/20211213161931805CtD.png",
                "images/star.png",
              ][this.randomCount % 3], // 非聚合时点的icon,可设置为空
              width: 50 / 3,
              height: this.randomCount % 3 === 2 ? 50 / 3 : 77 / 3,
            },
          });
        }
        var dataSet = new mapv.DataSet(this.data);
        var options = {
          // shadowColor: 'rgba(255, 250, 50, 1)',
          // shadowBlur: 10,
          // 非聚合点的颜色和大小，未设置icon或icon获取失败时使用
          fillStyle: "rgba(255, 50, 0, 1.0)",
          size: 50 / 3 / 2, // 非聚合点的半径
          // 非聚合时点的icon设置，会被具体点的设置覆盖，可设置为空
          // iconOptions: {
          //     url: 'images/marker.png',
          //     width: 50 / 3,
          //     height: 77 / 3,
          //     offset: {
          //         x: 0,
          //         y: 0
          //     }
          // },
          minSize: 8, // 聚合点最小半径
          maxSize: 31, // 聚合点最大半径
          globalAlpha: 0.8, // 透明度
          clusterRadius: 150, // 聚合像素半径
          maxClusterZoom: 18, // 最大聚合的级别
          maxZoom: 19, // 最大显示级别
          minPoints: 5, // 最少聚合点数，点数多于此值才会被聚合
          extent: 400, // 聚合的细腻程度，越高聚合后点越密集
          label: {
            // 聚合文本样式
            show: true, // 是否显示
            fillStyle: "white",
            // shadowColor: 'yellow',
            // font: '20px Arial',
            // shadowBlur: 10,
          },
          gradient: { 0: "blue", 0.5: "yellow", 1.0: "rgb(255,0,0)" }, // 聚合图标渐变色
          draw: "cluster",
          methods: {
            click(point) {
              if (point) {
                if (point.iconOptions) {
                  console.log(point.iconOptions.url);
                }
                // 通过children可以拿到被聚合的所有点
                console.log(point.children);
              }
            },
          },
        };
        this.mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
        // clearInterval(this.timer);
        // this.timer = null
      }, 3000);
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style>
#map {
  width: 98vw;
  height: 96vh;
}
</style>
