<!-- marker弹窗点击事件 -->
<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import iconA from "leaflet/dist/images/marker-icon-2x.png";
import Vue from "vue";
import popupContent from "../leafletComponents/PopupContent";
export default {
  components: {
    popupContent,
  },

  data() {
    return {
      map: null,
      //   mapUrl: require("@/assets/404_images/404.png"),
      bounds: [
        [0, 0],
        [1014, 556],
      ],
      imageOverLay: null,
      curData: "",
      gem: [],
      mapUrl: L.icon({
        iconUrl: require("@/assets/404_images/404.png"),
        iconSize: [34, 34],
        iconAnchor: [12, 25],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      mapUrlB: L.icon({
        iconUrl: iconA,
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        shadowSize: [41, 41],
        shadowAnchor: [13, 41],
      }),
      iconUrl:
        "https://ms.bdimg.com/pacific/0/pic/-84529569_189684464.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00",
      content:
        '<div id="mapDialog_container" ref="mapDialog_container" style="width: 300px;height:200px;"></div>',
      markerData: { test: "测试" },
      pane: null,
      gem: [],
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    window.aa = this.func;
  },
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
      // this.markerPopup();
      // this.timer = setInterval(() => {
      //   this.markerPopup();
      // }, 2000);
      this.extendPopup();
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
    // markerPopup() {
    //     let arr = [
    //         {point:[39.905530, 116.391305],data:'1111'},
    //         {point:[39.905530, 116.491305],data:'2222'}
    //     ] //模拟数据
    //     this.gem = []
    //     for (let i = 0; i < arr.length; i++){
    //         const marker = L.marker(arr[i].point, {icon: this.mapUrl}).addTo(this.map);
    //         this.gem.push(marker)
    //         //监听marker点击事件，通过curData绑定点击事件需要传递的数据
    //         marker.on('click',()=>{
    //             this.curData = arr[i]
    //         })
    //         //给marker绑定标牌
    //         //标牌上按钮的点击事件绑定window上的a方法，这样就能调用vue的方法，并且通过marker点击事件能获取到循环传递的参数
    //         marker.bindPopup(
    //         `<div style='width:138px'><a id='aa' style='color:red'>收藏</a></div>`);
    //         console.log('循环', i, arr[i].point);
    //     }
    //     this.showPopup()
    // },
    // 方法三
    extendPopup() {
      // let point = new Bmap.Point(39.90563, 116.391305);
      let arr = [
        {
          point: [39.91553, 116.391305],
          data: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
          // data: "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv",
        },
        {
          point: [39.91553, 116.395305],
          data: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
          // data: "http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003.m3u8",
        },
      ];
      this.gem = [];
      for (let i = 0; i < arr.length; i++) {
        const marker = L.marker(arr[i].point, { icon: this.mapUrlB }).addTo(
          this.map
        );
        marker.info = arr[i].data;
        this.gem.push(marker);
        let popup = L.popup().setContent(this.content);
        marker.bindPopup(popup);
        marker.on("click", (e) => {
          console.log("点击marker", e);
          // 点击marker显示弹窗并显示flv监控视频
          // 判断有pane时，则销毁
          if (this.pane != null) {
            this.pane.$destroy();
          }
          // 创建构造器
          let Profile = Vue.extend(popupContent);
          // 创建 Profile 实例，并挂载到一个元素上。
          this.pane = new Profile({
            propsData: { popupData: e.target.info },
          });
          // 加定时器解决第二次点击marker视频报错问题
          setTimeout(() => {
            this.pane.$mount("#mapDialog_container");
          }, 200);
        });
      }
      // const marker = L.marker([39.90953, 116.391305], {
      //   icon: this.mapUrl,
      // }).addTo(this.map);
      // 自定义弹窗
      // let popup = L.popup()
      //   .setLatLng([39.90953, 116.391305])
      //   .setContent(this.content)
      //   .openOn(this.map);

      // // 创建构造器
      // let Profile = Vue.extend(popupContent);
      // // 创建 Profile 实例，并挂载到一个元素上。
      // let data = { aa: "弹窗" };
      // new Profile({ propsData: { popupData: data } }).$mount(
      //   "#mapDialog-container"
      // );

      // marker.on("click", () => {
      //   console.log("点击");
      //   popup.openOn(this.map);
      // });
    },
    // 方法四
    markerPopup() {
      let arr = [
        { point: [39.90553, 116.391305], data: "1111" },
        { point: [39.90553, 116.395305], data: "2222" },
      ]; //模拟数据
      if (this.marker_group) {
        console.log("清除");
        this.marker_group.clearLayers();
      }
      this.gem = [];

      for (let i = 0; i < arr.length; i++) {
        const marker = L.marker(arr[i].point, { icon: this.mapUrl }).addTo(
          this.map
        );
        this.gem.push(marker);
        //监听marker点击事件，通过curData绑定点击事件需要传递的数据
        marker.on("click", () => {
          this.curData = arr[i];
        });
        //给marker绑定标牌
        //标牌上按钮的点击事件绑定window上的a方法，这样就能调用vue的方法，并且通过marker点击事件能获取到循环传递的参数
        marker.bindPopup(
          `<div style='width:138px;'><a id='aa' onclick='aa()' style='color:red'>收藏${i}</a></div>`
        );
        console.log("循环", i, arr[i].point);
      }
      this.marker_group = new L.layerGroup(this.gem).addTo(this.map);
      console.log("12312", this.marker_group);
    },
    func() {
      console.log("123", this.curData);
    },
    showPopup() {
      this.gem.map((item) => {
        item.on("click", (e) => {
          const editRegion = document.getElementById("aa");
          // const editRegion = document.getElementsByClassName("editRegion");
          // const editRegion = document.querySelector(".editRegion");
          console.log(editRegion);
          editRegion.onclick = (e) => {
            console.log("====================================");
            console.log("点击", this.curData.data, e);
            console.log("====================================");
          };
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 95vh;
}
</style>
