<!-- 百度路书 -->
<template>
  <div>
    <el-col
      :span="showCarTeam ? 19 : 24"
      style="height: 824px; margin-top: 5px"
    >
      <p>{{ carMessage }}</p>
      <div style="position: absolute; z-index: 1; padding: 20px">
        <el-button-group>
          <el-button plain type="primary" @click="start" size="small"
            >播放</el-button
          >
          <el-button plain type="primary" @click="pause" size="small"
            >暂停</el-button
          >
          <el-button plain type="primary" @click="stop" size="small"
            >停止</el-button
          >
          <el-button plain type="primary" @click="zoomInOrOut" size="small"
            >缩放</el-button
          >
        </el-button-group>
        <el-dropdown
          split-button
          type="primary"
          size="small"
          @command="handleCommand"
        >
          运动速度{{ speed }}米/秒
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="50">50米/秒</el-dropdown-item>
            <el-dropdown-item :command="100">100米/秒</el-dropdown-item>
            <el-dropdown-item :command="200">200米/秒</el-dropdown-item>
            <el-dropdown-item :command="400">400米/秒</el-dropdown-item>
            <el-dropdown-item :command="800">800米/秒</el-dropdown-item>
            <el-dropdown-item :command="1600">1600米/秒</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div
        id="mymap4TrackPlay"
        v-loading="loadMapData"
        style="width: 100%; min-height: 100%"
      ></div>
    </el-col>
  </div>
</template>

<script>
import img from "@/assets/arrow.png";
export default {
  components: {},

  data() {
    return {
      showCarTeam: false,
      carMessage: "轨迹回放",
      speed: 50,
      loadMapData: false,
      map: null,
      gpsArr: [
        // { lng: 116.404844, lat: 40 },
        { lng: 116.404844, lat: 40.056057 },
        { lng: 116.404944, lat: 40.056157 },
        { lng: 116.404844, lat: 40.056257 },
        { lng: 116.405844, lat: 40.056357 },
        { lng: 116.404854, lat: 40.056357 },
        { lng: 116.406854, lat: 40.056457 },
        { lng: 116.404874, lat: 40.056557 },
        { lng: 116.404944, lat: 40.057657 },
        { lng: 116.404454, lat: 40.055757 },
      ],
      arrPois: [],
      lushu: null,
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMap();
  },

  methods: {
    // 初始化地图
    initMap() {
      this.map = new BMap.Map("mymap4TrackPlay");
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 6);
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      var mapType1 = new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        anchor: BMAP_ANCHOR_TOP_RIGHT,
      });

      var overView = new BMap.OverviewMapControl();
      var overViewOpen = new BMap.OverviewMapControl({
        isOpen: true,
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      });

      this.map.addControl(mapType1); //2D图，混合图
      this.map.addControl(overView); //添加默认缩略地图控件
      this.map.addControl(overViewOpen); //右下角，打开

      this.api();
    },
    //速度调整
    handleCommand(command) {
      this.speed = command;
      this.lushu._opts.speed = command;
    },
    //开始播放
    start() {
      this.lushu.start();
    },
    //停止播放
    stop() {
      this.lushu.stop();
    },
    //暂停播放
    pause() {
      this.lushu.pause();
    },
    //地图控件缩放
    zoomInOrOut() {
      this.showselect ? (this.showselect = false) : (this.showselect = true);
      this.showCarTeam ? (this.showCarTeam = false) : (this.showCarTeam = true);
    },

    // ===========================================
    //获取位置信息
    api() {
      // this.gpsArr = this.dataList;
      //开始位置 结束位置 开始时间，结束时间
      var startPoint,
        endPoint,
        workStartTime,
        workEntTime,
        carNum,
        startMile,
        endMile;

      for (let i = 0 && this.gpsArr.length > 0; i < this.gpsArr.length; i++) {
        var p0 = this.gpsArr[i].lng;
        var p1 = this.gpsArr[i].lat;
        var point = new BMap.Point(p0, p1);
        //业务逻辑
        if (i === 0) {
          //开始位置
          startPoint = point;
          // workStartTime = this.gpsArr[i].time;
          // carNum = this.gpsArr[i].platenumber;
          // startMile = this.gpsArr[i].mile;
          // initWight = this.gpsArr[i].weight;
        }
        // if (i > 0) {
        //   if (this.gpsArr[i].weight > initWight) {
        //     wightAdd += this.gpsArr[i].weight - initWight;
        //   } else {
        //     wightRemove += initWight - this.gpsArr[i].weight;
        //   }
        //   initWight = this.gpsArr[i].weight;
        // }
        //结束位置
        endPoint = point;
        // workEntTime = this.gpsArr[i].time;
        // endMile = this.gpsArr[i].mile;
        this.arrPois.push(point);
      }

      var startIcon = new BMap.Icon(
        img,
        // require("../../../assets/img/start.png"),
        new BMap.Size(48, 48)
      );
      var markerStart = new BMap.Marker(startPoint, { icon: startIcon }); // 创建标注
      var endIcon = new BMap.Icon(
        img,
        // require("../../../assets/img/end.png"),
        new BMap.Size(48, 48)
      );
      var markerEnd = new BMap.Marker(endPoint, { icon: endIcon }); // 创建标注
      //添加开始结束点
      this.map.addOverlay(markerStart);
      this.map.addOverlay(markerEnd);
      markerStart.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      //画轨迹
      var polyLine = new BMap.Polyline(this.arrPois, {
        strokeColor: "red", //设置颜色
        strokeWeight: 5, //宽度
        strokeOpacity: 0.5, //透明度
        strokeStyle: "dashed", //虚线
      });

      var polyline2 = new BMap.Polyline(
        [
          new BMap.Point(116.399, 39.91),
          new BMap.Point(116.405, 39.92),
          new BMap.Point(116.423493, 39.907445),
        ],
        {
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 0.5,
        }
      );
      this.map.addOverlay(polyline2);

      console.log("轨迹", polyLine, this.arrPois);
      this.map.addOverlay(polyLine);
      this.map.setViewport(this.arrPois);
      // this.map.addOverlay(polyLine);
      //创建路书
      this.lushu = new BMapLib.LuShu(this.map, this.arrPois, {
        defaultContent: "",
        autoView: true,
        icon: new BMap.Icon(
          img,
          //   require("../../../assets/img/car.png"),
          new BMap.Size(52, 26),
          { anchor: new BMap.Size(27, 13) }
        ),
        speed: this.speed,
        enableRotation: true, //是否设置marker随着道路的走向进行旋转
        landmarkPois: [],
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
