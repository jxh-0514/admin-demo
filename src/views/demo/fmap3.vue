<template>
  <div id="fmap"></div>
</template>

<script>
//  const boxData = require('../../static/data/box.json')
//  const boxData1 = require('../../static/data/box1.json')
//  const positionData = require('../../static/data/position.json')
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
// import '../../static/fengmap.min.js'
import "../../../public/latestfengmap.js";

// import './fmap2/js/fengmap.core.min.js'
// import './fmap2/js/fengmap.control.min.js'
// import './fmap2/js/fengmap.analyzer.min.js'
// import './fmap2/js/fengmap.navi.min.js'

// import '../js/fengmap.map.min.js'
export default {
  data() {
    return {
      map: null,
      locationMarker: null,
      initData: {},
      initResult: [],
    };
  },
  mounted() {
    this.openMap();
  },
  methods: {
    openMap() {
      let fmapID = "10347";
      let mapOptions = {
        container: document.getElementById("fmap"),
        // 地图数据位置
        // mapServerURL: "http://test6.fengmap.com/FMDemoStorage/data/10347",
        mapServerURL: "./data2/" + fmapID,
        // 主题数据位置
        mapThemeURL: "./data2/theme",
        defaultThemeName: "2001",
        //设置比例尺级别可缩放范围， 通常室内地图使用到的范围为16级到23级。即：[16,23]。
        mapScaleLevelRange: [16, 23],
        // 必要，地图应用名称，通过蜂鸟云后台创建
        appName: "塘桥",
        // 必要，地图应用密钥，通过蜂鸟云后台获取
        key: "290bc66a0262df68c7caad8f331b24c5",
        backgroundColorint: "#000",

        // appName: "蜂鸟研发SDK_2_0",
        // key: "57c7f309aca507497d028a9c00207cf8",
        // mapID: "1321274646113083394",
      };
      this.map = new fengmap.FMMap(mapOptions);
      this.map.openMapById(fmapID, (error) => {
        console.log(error);
      });
      var defaultBoxColor, selectBoxModel, storageModel;
      var aa = [];
      this.map.on("mapClickNode", (event) => {
        var boxModel = event.target;
        console.log(
          "aa",
          event,
          event.eventInfo.coord.x,
          event.eventInfo.coord.y
        );
        if (selectBoxModel && boxModel != selectBoxModel) {
          selectBoxModel.setColor(defaultBoxColor);
          storageModel.setColor("#C0C0C0");
        }
        if (boxModel && boxModel.nodeType == fengmap.FMNodeType.BOX) {
          //货柜高亮
          var group = this.map.getFMGroup(1); //楼层id=1
          storageModel = group
            .getOrCreateLayer("transport")
            .getTransport(boxModel.fid); //点击货物，货柜高亮
          storageModel.setColor("#E4393C");
          this.moveToCenter(storageModel);
          //原始颜色
          var color = boxModel.color;
          defaultBoxColor = color;
          selectBoxModel = boxModel;
          //设置高亮
          boxModel.setColor("#FF0000");
          //显示详情数据
          // showDetail(boxModel);
        }
      });
      this.map.on("loadComplete", () => {
        console.log("地图加载完成！");
        //显示指北针
        this.map.showCompass = true;
        this.loadScrollFloorCtrl();
        this.loadScaleCtrl();
        //加载色块
        this.loadblock();
        // this.fidField().then(()=>{
        //    this.initBox1();
        //    this.getPosition();
        // });

        // var locationMarkers = new fengmap.FMLocationMarker({
        //       x: 12677284.932865864,
        //       y: 2633482.7522291224,
        //       url: '../../../static/images/blueImageMarker.png',
        //       groupID: 1,
        //       size: 55,
        //       height: 5,
        //       callback: function () {
        //           console.log('定位点marker加载完成！');
        //       }
        //   });
        //   this.map.addLocationMarker(locationMarkers);
        // console.log('bbb',locationMarkers)
      });
    },
    loadblock() {
      let block = new fengmap.FMDynamicModel(this.map, {
        //  url: 'https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf',
        url: "https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf",
        coord: { x: 12677284.932865864, y: 2633482.7522291224 },
        callback: function(data) {
          console.log("ttt", data);
        },
      });
      block.setScale(1000);
      console.log("aaa", block);
    },
    // 加载滚动型楼层切换控件
    loadScrollFloorCtrl() {
      let toolCtlOpt = {
        position: fengmap.FMControlPosition.RIGHT_TOP,
        init2D: true,
        groupsButtonNeeded: false,
        viewModeButtonNeeded: true,
        offset: {
          x: -20,
          y: 20,
        },
        // 配置图片资源的路径地址
        imgURL: "../../static/images/",
      };
      let scrollFloorControl = new fengmap.FMToolControl(this.map, toolCtlOpt);
    },
    // 加载滚动型楼层切换控件
    loadScaleCtrl() {
      let zoomCtlOpt = {
        //设置显示的位置为左上角
        position: fengmap.FMControlPosition.LEFT_TOP,
        //位置x,y的偏移量
        offset: {
          x: 30,
          y: 100,
        },
        //可设置自定义图片路径
        imgURL: "../../static/images/",
      };
      //创建放大缩小控件
      let zoomControl = new fengmap.FMZoomControl(this.map, zoomCtlOpt);
      //注册地图级别变化事件
      this.map.on("scaleLevelChanged", () => {
        console.log("当前级别：", this.map.scaleLevel);
      });
    },
    // 加载集装箱货柜
    fidField() {
      return new Promise((resolve) => {
        this.map.openTransportJson("../../../static/data/fid1.json", function(
          data
        ) {
          data.every(function(item) {
            item.setColor("#C0C0C0");
            item.setStrokeColor("#A0A0A0");
          });
          resolve();
        });
      });
    },
    //渲染初始货箱
    initBox() {
      for (var i = 0; i < boxData.length; i++) {
        var data = boxData[i];
        if (data) {
          this.addBoxFunc(data);
        }
      }
    },
    //渲染初始货箱
    initBox1() {
      for (var i = 0; i < boxData1.length; i++) {
        var data = boxData1[i];
        if (data) {
          this.addBoxFunc(data);
        }
      }
    },
    //模拟数据添加盒子
    addBoxFunc(data) {
      if (!data || !data.name) {
        return;
      }
      var name = data.name;
      var length = data.length;
      var width = data.width;
      var height = data.height;
      var operation = data.operation;
      var fid = data.FID;
      var color = data.color;
      var box = new fengmap.FreightBox({
        width: parseFloat(width) / 100,
        height: parseFloat(height) / 100,
        length: parseFloat(length) / 100,
        time: new Date().getTime(),
      });
      box.setColor(color);
      box.createTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
      box.name = name;
      box.fid = fid;
      this.map.addBox(1, fid, box);
      this.initData[name] = box;
      this.map.sortBox(1, fid);
      this.initResult.push(data);
    },
    //移动到对应模型
    moveToCenter(model) {
      //将货位模型聚焦到视野中心
      this.map.moveTo({
        x: model.mapCoord.x,
        y: model.mapCoord.y,
        z: 0,
        groupID: model.groupID,
        time: 0.5,
      });
    },
    //循环定位
    getPosition() {
      var index = 0;
      var timer = setInterval(() => {
        if (index > positionData.length - 1) {
          // index=0;
          clearInterval(timer);
          this.addBox("B01-101", 10);
        } else {
          this.updateLocation(positionData[index]);
          if (positionData[index].x == "12677292.696621861") {
            //到达仓库B位置
            this.deleteBox("B01-101");
          }
        }
        index++;
      }, 800);
    },
    //定位标记
    updateLocation(data) {
      if (!this.locationMarker) {
        this.locationMarker = new fengmap.FMLocationMarker({
          x: data.x,
          y: data.y,
          url: "../../../static/images/blueImageMarker.png",
          groupID: 1,
          size: 55,
          height: 1,
          callback: function() {
            console.log("定位点marker加载完成！");
          },
        });
        this.map.addLocationMarker(this.locationMarker);
      } else {
        this.locationMarker.moveTo({ x: data.x, y: data.y, groupID: 1 });
      }
    },
    //增加盒子
    addBox(name, fid) {
      var boxinfo = {
        name: name,
        FID: fid,
        color: "#F26077",
        operation: "add",
        length: 210,
        width: 222,
        height: 20,
      };
      var box = new fengmap.FreightBox({
        width: parseFloat(boxinfo.width) / 100,
        height: parseFloat(boxinfo.height) / 100,
        length: parseFloat(boxinfo.length) / 100,
        time: new Date().getTime(),
      });
      box.setColor(boxinfo.color);
      box.boxStatus = "OUT(出库)";
      box.createTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
      this.map.addBox(1, boxinfo.FID, box);
      box.name = boxinfo.name;
      this.initData[box.name] = box;
      this.map.sortBox(1, boxinfo.FID);
      this.initResult.push(boxinfo);
    },
    //删除盒子
    deleteBox(boxName) {
      this.initResult.map((item, index) => {
        if (boxName == item.name) {
          this.initResult.splice(index, 1);
          var boxObj = this.initData[item.name];
          var boxParent = boxObj.parent;
          boxParent.removeBox(boxObj);
          boxParent.computeNormalBoxPos();
          this.map.sortBox(1, item.FID);
        }
      });
    },
  },
};
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
