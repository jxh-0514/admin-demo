<!-- leaflet  使用Vue,extend构造组件 -->
<template>
  <div>
    <!--这里写需要的弹窗内容 -->
    <!-- <el-carousel width="200px" height="150px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
    <!-- <div id="staionPane">
      <div id="stationName">{{ name }}</div>
      <div>
        <span>告警数量：</span>
        <a id="alarmNum" @click="handleClick">{{ alarmNum }}</a>
      </div>
    </div> -->
    <!-- echarts实例 -->
    <!-- <div id="echarts" style="width: 300px; height: 200px"></div> -->
    <!-- 视频测试 -->
    <!-- <video
      style="width: 300px; height: 200px"
      src="https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4"
    ></video> -->
    <!-- <Video
      src="https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4"
      :videoData="true"
    ></Video> -->
    <video
      id="videoElement"
      controls
      autoplay
      muted
      width="300px"
      height="200px"
    ></video>
    <button @click="play">播放</button>
    <!--SkeyeWebPlayer播放器容器-->
    <!-- <div id="WebMediaPlayer" style="width: 300px; height: 240px"></div>
    <button @click="handlePlay">播放</button> -->
  </div>
</template>

<script>
import echarts from "echarts";
import Video from "@/components/Video";
import flvjs from "flv.js";
import mpegts from "mpegts.js";
export default {
  name: "PopupContent",
  props: {
    // 接收传来的数据
    popupData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Video,
  },

  data() {
    return {
      name: "",
      id: null,
      alarmNum: 0,
      options: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      },
      flvPlayer: null,
      palyer: null, //SkeyeWebPlayer播放器
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.initEchats();
    // flv播放器
    // this.initFlv();
    // mpegts.js播放器
    this.initMpegts();
    // SkeyeWebPlayer 播放器
    // this.$nextTick(() => {
    //   this.initPlayer();
    //   this.handlePlay();
    // });
  },

  methods: {
    handleClick() {
      alert(this.alarmNum);
    },
    initEchats() {
      var chartDom = document.getElementById("echarts");
      var myChart = echarts.init(chartDom);
      this.options && myChart.setOption(this.options);
    },
    //flv播放器
    initFlv() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url: "http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv", // 自己的flv视频流
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        // this.flvPlayer.play();
        var playPromise = this.flvPlayer.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              console.log("播放", _);
              // Automatic playback started!
              // Show playing UI.
              this.flvPlayer.play();
            })
            .catch((error) => {
              console.log("暂停", error);
              // Auto-play was prevented
              // Show paused UI.
              // this.muted = false;
              // 销毁flv
              this.flvPlayer.pause();
              this.flvPlayer.unload();
              this.flvPlayer.detachMediaElement();
              this.flvPlayer.destroy();
              this.flvPlayer = null;
              // 重新加载
              this.initFlv();
            });
        }
      }
    },
    play() {
      this.flvPlayer.play();
    },
    // mpegts播放器
    initMpegts() {
      if (mpegts.getFeatureList().mseLivePlayback) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = mpegts.createPlayer({
          type: "flv", // could also be mpegts, m2ts, flv
          isLive: true,
          url: "http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv",
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
        // var playPromise = this.flvPlayer.play();
        // if (playPromise !== undefined) {
        //   playPromise
        //     .then((_) => {
        //       console.log("播放", _);
        //       // Automatic playback started!
        //       // Show playing UI.
        //       this.flvPlayer.play();
        //     })
        //     .catch((error) => {
        //       console.log("暂停", error);
        //       // Auto-play was prevented
        //       // Show paused UI.
        //       // this.muted = false;
        //       // 销毁flv
        //       this.flvPlayer.pause();
        //       this.flvPlayer.unload();
        //       this.flvPlayer.detachMediaElement();
        //       this.flvPlayer.destroy();
        //       this.flvPlayer = null;
        //       // 重新加载
        //       this.initFlv();
        //     });
        // }
      }
    },
    //===============SkeyeWebPlayer播放器===============
    initPlayer() {
      this.player = new WebMediaPlayer(
        "",
        `WebMediaPlayer`,
        this.callbackFunc,
        {
          cbUserPtr: this,
          decodeType: "auto",
          height: true,
        }
      );
    },
    // 播放器回调方法
    callbackFunc(cbType, cbParams) {
      if (cbType === "playbackTime") {
        //console.log("当前回放时间: " + cbParams);
      } else if (cbType === "ended") {
        console.log("播放结束");
      }
      console.log("Callback " + cbType + ":  " + cbParams);
    },
    // 播放
    handlePlay() {
      let url =
        "http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv";
      if (this.player) {
        this.player.destroy();
        this.initPlayer();
        this.player.play(url, 1, 0);
      }
    },
    handleClick(type) {
      if (type === "stop") {
        this.player.stop();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#stationName {
  margin-top: 20px;
}
</style>
