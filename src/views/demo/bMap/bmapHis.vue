<template>
  <div class="bmapHis-box">
    <div id="bmapHis"></div>
    <div class="tool" v-show="isShow">
      <div class="btn-box">
        <div class="tool-item" @click="startOrStop">
          <img :src="isPlay ? stop : play" alt="开始/暂停" />
        </div>
        <div class="tool-item" @click="restartBtn">
          <img :src="restart" alt="重置" />
        </div>
        <div class="tool-item" @click="speedDown">
          <img :src="slow" alt="速率-" />
        </div>
        <i>x{{ beishu }}</i>
        <div class="tool-item" @click="speedUp">
          <img :src="quick" alt="速率+" />
        </div>
        <div class="tool-item ml50">开始时间：{{ startTime }}</div>
        <div class="tool-item ml50">结束时间：{{ endTime }}</div>
        <div class="tool-item ml50">当前时间：{{ currentTime }}</div>
      </div>
      <div class="range-box">
        <input
          class="range"
          type="range"
          min="0"
          :max="maxNum"
          v-model="progress"
          @change="onProgressChange"
          @mousedown="onProgressDdown"
        />
      </div>
    </div>
  </div>
</template>

<script>
import startPic from "@/assets/start.png";
import endPic from "@/assets/end.png";
import { lushuData } from "@/utils/lushuData.js"; //路书假数据
export default {
  components: {},
  props: {
    // 轨迹数据
    linedata: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      bmapHis: null,
      playback: null,
      beishu: 1, // 倍数
      speed: 500,
      icon: require("@/assets/marker.png"),
      play: require("@/assets/marker.png"),
      restart: require("@/assets/marker.png"),
      slow: require("@/assets/marker.png"),
      stop: require("@/assets/marker.png"),
      quick: require("@/assets/marker.png"),
      person: require("@/assets/person.png"),
      isPlay: false, // 是否开始
      arrPois: [],
      lushu: null,
      gpsArr: [
        { lng: 116.404844, lat: 40.056057, time: 1234654655465 },
        { lng: 116.404944, lat: 40.056157, time: 546456456 },
        { lng: 116.404844, lat: 40.056257, time: 453453 },
        { lng: 116.405844, lat: 40.056357, time: 45675 },
        { lng: 116.404854, lat: 40.056357, time: 7452745 },
        { lng: 116.406854, lat: 40.056457, time: 4524 },
        { lng: 116.404874, lat: 40.056557, time: 75272 },
        { lng: 116.404944, lat: 40.057657, time: 75272 },
        { lng: 116.404454, lat: 40.055757, time: 75675675675 },
      ],
      timer: null, // 列表定时器
      timerB: null, // 轨迹线定时器
      polyLine: null, //轨迹线
      lineTmp: null, //走过的路线
      markerPoint: [], //走过的点
      isEndPoint: false, // 是否到达终点
      isShow: true, //是否显示控件
      progress: 0,
      progressBarWidth: 0,
      maxNum: 0, // 进度条最大值
      moveLine: null, //移动的轨迹线
    };
  },

  computed: {
    startTime() {
      if (this.linedata.length > 0 && this.lushu) {
        return timeStampTurnDate(this.linedata[0].inTimeStamp);
      }
    },
    endTime() {
      if (this.linedata.length > 0 && this.lushu) {
        return timeStampTurnDate(
          this.linedata[this.linedata.length - 5].inTimeStamp
        );
      }
    },
    currentTime() {
      if (this.linedata.length > 0 && this.lushu) {
        return timeStampTurnDate(this.linedata[this.lushu.i].inTimeStamp);
      }
    },
  },

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initBmap();
  },

  methods: {
    setMapCenterByIndex(index) {
      const point = lushuData[index]; //假数据示例
      this.bmapHis.panTo(point); //平滑移动到中心点
      this.bmapHis.panTo(point); //平滑移动到中心点
      // this.bmapHis.setCenter(point);//设置中心点
    },
    setLushuIndex(index) {
      this.lushu._opts.loop = false;
      this.lushu._opts.autoView = false;
      this.lushu.i = index; //将运动点下标设置为当前位置
      // this.lushu._path.splice(index + 1);//从路径数组_path中移除index+1之后的所有元素，保留路径数组中的前index+1个元素。确保Lushu对象仅在当前位置之前的路径上移动。
      console.log("当前下标===", this.lushu, this.lushu._path[index]);
      this.lushu._marker.setPosition(this.lushu._path[index]); //将marker设置为当前位置
      // let points = [];
      // let arr = lushuData.slice(0, index); //截取当前位置之前的所有轨迹点数据
      // arr.forEach((e) => {
      //   points.push(new BMap.Point(e.lng, e.lat));
      // });
      // this.lushu._map.addOverlay(this.addPolyLine(arr)); // 绘制进度条控制的轨迹线
      this.isPlay = true;
      this.start(); // 控制进度条时暂停播放，避免无法清除轨迹线
    },
    updateProgress(index) {
      this.setMapCenterByIndex(index);
      this.setLushuIndex(index);
    },
    onProgressChange(event) {
      const index = event.target.value;
      console.log("当前点", index);
      this.updateProgress(index);
    },
    onProgressDdown() {
      this.isPlay = false;
      this.pause(); // 控制进度条时暂停播放，避免无法清除轨迹线
      console.log("鼠标按下");
    },
    initBmap() {
      this.removeAll();
      this.bmapHis = new BMap.Map("bmapHis", {
        enableMapClick: false, //关闭地图可点
      });
      this.bmapHis.centerAndZoom(
        new BMap.Point(120.58945366039603, 31.30338986219441),
        10
      ); // 设置中心点
      this.bmapHis.enableScrollWheelZoom(); // 开启滚轮缩放
      this.bmapHis.clearOverlays(); // 清除轨迹缓存
      this.drawLine();
    },
    // 开始/暂停
    startOrStop() {
      this.isPlay = !this.isPlay;
      this.isPlay ? this.start() : this.pause();
    },
    start() {
      // 如果到达终点再点击播放则清除运动的轨迹线
      if (this.isEndPoint) {
        this.markerPoint = [];
      }
      this.lushu.start();
      this.isEndPoint = false; //重置是否到达终点开关
    },
    pause() {
      this.lushu.pause();
      // this.clearTime();
    },
    // 重置
    restartBtn() {
      this.lushu.stop();
      this.lushu.start();
      this.isPlay = true;
      // this.beishu = 1;
      // this.setSpeed();
      this.markerPoint = [];
    },
    // 减速
    speedDown() {
      if (this.beishu === 1) return;
      this.beishu -= 1;
      this.setSpeed();
    },
    speedUp() {
      if (this.beishu === 10) return;
      this.beishu += 1;
      this.setSpeed();
    },
    setSpeed() {
      // this.speed = this.speed * this.beishu;
      this.lushu._opts.speed = this.speed * this.beishu;
    },
    // 创建起始点---图片，坐标点
    createStartAndEndMarker(pic, point) {
      const icon = new BMap.Icon(pic, new BMap.Size(60, 60), {
        anchor: new BMap.Size(30, 60),
      });
      const marker = new BMap.Marker(point, { icon: icon }); // 创建标注
      this.bmapHis.addOverlay(marker); //添加标注
    },
    // 绘制完整轨迹线
    createLine(points) {
      this.polyLine = new BMap.Polyline(points, {
        strokeColor: "#1C54E2", //设置颜色
        strokeWeight: 5, //宽度
        strokeOpacity: 1, //透明度
        strokeStyle: "dashed", //虚线
      });
      this.bmapHis.addOverlay(this.polyLine);
    },
    // 绘制运动轨迹线
    addPolyLine(points) {
      return (this.moveLine = new BMap.Polyline(points, {
        strokeColor: "#ccc",
        strokeWeight: 5,
        strokeOpacity: 1,
      }));
    },
    //获取位置信息
    drawLine() {
      this.bmapHis.clearOverlays(); // 清除轨迹缓存
      // ============ 假数据示例 =============
      this.maxNum = lushuData.length - 5; //设置进度条最大值
      this.createPolyLine(lushuData, this.bmapHis);
    },
    createPolyLine(data, bmap) {
      let that = this;
      let points = [];
      points = data;
      this.bmapHis.setViewport(points);
      this.createStartAndEndMarker(startPic, data[0]); // 起点图标
      this.createStartAndEndMarker(endPic, data[data.length - 1]); // 终点图标
      this.createLine(points); //绘制完整轨迹线
      //设置路书动画---重写_move方法
      BMapLib.LuShu.prototype._move = function (initPos, targetPos, effect) {
        let pointsArr = [initPos, targetPos]; //获取两个相邻的点
        let me = this,
          //当前的帧数
          currentCount = 0,
          //步长，米/秒
          timer = 10,
          step = this._opts.speed / (1000 / timer),
          //初始坐标
          init_pos = this._projection.lngLatToPoint(initPos),
          //获取结束点的(x,y)坐标
          target_pos = this._projection.lngLatToPoint(targetPos),
          //总的步长
          count = Math.round(me._getDistance(init_pos, target_pos) / step);
        // 画运动的轨迹线操作
        this._map.removeOverlay(that.moveLine); //先清空之前的轨迹线
        let arr = data.slice(0, me.i); //再获取第一个点到当前位置的所有点数据
        this._map.addOverlay(that.addPolyLine(arr)); //再绘制轨迹线
        //如果小于1直接移动到下一点
        if (count < 1) {
          me._moveNext(++me.i);
          return;
        }
        me._intervalFlag = setInterval(() => {
          //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
          if (currentCount >= count) {
            clearInterval(me._intervalFlag);
            // console.log("两点之间当前帧数大于总帧数的时候，则说明已经完成移动", me.i, me._path.length - 1);
            //移动的点已经超过总的长度
            if (me.i > me._path.length) {
              console.log("移动的点已经超过总的长度");
              return;
            }
            // 移动到终点(运动的点可能有差)
            if (me.i === me._path.length - 5) {
              that.finishPlay();
            }
            //运行下一个点
            me._moveNext(++me.i);
          } else {
            currentCount++;
            let x = effect(init_pos.x, target_pos.x, currentCount, count),
              y = effect(init_pos.y, target_pos.y, currentCount, count),
              pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
            //设置marker
            if (currentCount == 1) {
              let proPos = null;
              if (me.i - 1 >= 0) {
                proPos = me._path[me.i - 1];
              }
              if (me._opts.enableRotation == true) {
                me.setRotation(proPos, initPos, targetPos);
              }
              if (me._opts.autoView) {
                if (!me._map.getBounds().containsPoint(pos)) {
                  me._map.setCenter(pos);
                }
              }
            }
            //正在移动
            me._marker.setPosition(pos);
            that.progress = me.i; // 同步显示轨迹的进度条
            // me._opts.defaultContent = timeStampTurnDate(data[me.i].inTimeStamp); // 图标上方显示当前时间
            //设置自定义overlay的位置
            // me._setInfoWin(pos);
          }
        }, timer);
      };
      this.setMapZoom(bmap, points);
    },
    setMapZoom(map, points) {
      let view = map.getViewport(points),
        mapZoom = view.zoom,
        centerPoint = view.center;
      map.centerAndZoom(centerPoint, mapZoom);
      this.mapPlay(map, points);
    },
    mapPlay(map, points) {
      //创建路书
      // let icon = "http://developer.baidu.com/map/jsdemo/img/car.png";
      //因为是单一弹窗播放，所以用var来全局控制
      this.lushu = new BMapLib.LuShu(map, points, {
        defaultContent: "", //路书展示内容
        autoView: false, //是否开启自动视野调整
        //图标设置
        icon: new BMap.Icon(this.person, new BMap.Size(35, 35), {
          anchor: new BMap.Size(17, 17),
        }),
        speed: this.speed, //速度
        enableRotation: false, //是否设置marker随着道路的走向进行旋转
        landmarkPois: [],
      });
      // this.points = points;
      this.bmapHis = map;
      // this.lushu.start();
      this.isShow = true;
      this.startOrStop(); //开始播放
    },
    // 轨迹播放完成
    finishPlay() {
      console.log("轨迹播放完成");
      this.isPlay = false;
      this.isEndPoint = true;
      this.pause();
    },
    clearTime() {
      clearInterval(this.timer);
      this.timer = null;
      console.log("====================================");
      console.log("清除定时器---百度");
      console.log("====================================");
    },
    removeAll() {
      this.isShow = false;
      this.lushu && this.lushu.stop(); //暂停播放
      // this.lushu && this.luShu.dispose(); //销毁控件
      this.lushu = null;
      this.polyLine && this.bmapHis.removeOverlay(this.polyLine); //清除轨迹线
      this.polyLine = null;
      this.bmapHis && this.bmapHis.clearOverlays();
      // this.bmapHis && this.bmapHis.destroy();
      this.bmapHis = null;
      this.maxNum = 0;
      this.progress = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.ml50 {
  margin-left: 50px;
  color: #000;
}
.bmapHis-box {
  width: 100%;
  height: 100%;
  #bmapHis {
    width: 100%;
    height: 90vh;
  }
  #progress {
    width: 100%;
    height: 30px;
    background-color: #eee;
  }

  #progress-bar {
    height: 100%;
    background-color: #00f;
  }
  .tool {
    position: absolute;
    bottom: 20px;
    left: 20px;
    .btn-box {
      width: 100%;
      height: 25px;
      display: flex;
      align-items: center;
      .tool-item {
        cursor: pointer;
        margin-right: 5px;
        img {
          width: 25px;
        }
      }
      i {
        font-size: 16px;
        line-height: 25px;
        color: black;
        padding: 0 5px;
      }
    }
    .range-box {
      width: calc(60vw);
      .range {
        width: 100%;
        margin-top: 10px;
      }
      ::v-deep input {
        -webkit-appearance: auto;
      }
    }
  }
}
// 将左下角的百度标志去掉
::v-deep .BMap_cpyCtrl {
  display: none;
}
::v-deep .anchorBL {
  display: none;
}
</style>
