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
  </div>
</template>

<script>
import echarts from "echarts";
import Video from "@/components/Video";
import flvjs from "flv.js";
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
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.initEchats();
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById("videoElement");
      this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false,
        url: "http://192.168.1.100:8080/hdl/34020000001110000002/34020000001310000003.flv", // 自己的flv视频流
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
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
    play() {
      this.flvPlayer.play();
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
