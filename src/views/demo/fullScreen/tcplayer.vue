<!-- 腾讯web播放器 -->
<template>
  <div>
    <div id="tcplayer"></div>
    <div class="play-url-item">
      <div class="play-url">
        <el-select
          style="width: 100%"
          v-model="video"
          placeholder="请选择"
          filterable
          allow-create
          :filter-method="filterMethod"
          default-first-option
          clearable
        >
          <el-option
            v-for="(item, i) in options"
            :key="i"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="play-btn">
        <el-button type="primary" size="medium" @click="playBtn()"
          >播放</el-button
        >
        <el-select style="width: 100px" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in optionsTime"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="beforeBtn">调用</el-button>
        <el-button @click="speedBtn">倍速</el-button>
      </div>
    </div>

    <!-- <tc-player
      ref="tcplayer"
      :playVideo="video"
      :widthHeigt="[100, 100]"
    ></tc-player> -->
    <!-- <div v-for="(item, index) in options" :key="item.id"> -->
    <!-- <tc-player-unit
      v-for="(item, index) in options"
      :key="item.id"
      :ref="'tcplayer' + index"
      :index="index"
      :playVideo="item"
      :widthHeigt="[100, 100]"
    ></tc-player-unit> -->
    <!-- </div> -->

    <!-- <progressBar @handleClickTimeLineFn="handleClickTimeLineFn"></progressBar> -->
  </div>
</template>

<script>
import axios from "axios";
import tcPlayer from "@/components/Tcplayer/indexA.vue";
import tcPlayerUnit from "@/components/Tcplayer"; //多个
import progressBar from "@/components/ProgressBar";
export default {
  components: {
    tcPlayer,
    tcPlayerUnit,
    progressBar,
  },

  data() {
    return {
      player: null,
      anchor: {
        pullUrl:
          "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
        // "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv",
        // "http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003.m3u8",
        // "rtmp://192.168.1.71:8080/34020000001110000002/34020000001310000003",
        // "rtsp://192.168.1.71:8080/34020000001110000002/34020000001310000003",
        // "http://192.168.1.71:8080/webrtc/play/34020000001110000002/34020000001310000003",
      },
      currentItem: {
        // url: "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003/1663917840-1663918200.flv",
        // url: "http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003/1663917840-1663918200.m3u8",
        // url: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
      },
      options: [
        {
          value:
            "http://192.168.1.71:8081/hdl/34020000001110000002/34020000001310000003.flv",
        },
        {
          value:
            "http://192.168.1.71:8081/hls/34020000001110000002/34020000001310000003.m3u8",
        },
        {
          value:
            "http://192.168.1.71:8081/hdl/34020000001110000002/34020000001310000003/1663126891-1663127257.flv",
        },
        {
          value:
            "http://192.168.1.71:8081/hls/34020000001110000002/34020000001310000003/1663917840-1663918200.m3u8",
        },
        {
          value: "",
        },
        // {
        //   value:
        //     "rtsp://192.168.1.71:8080/34020000001110000002/34020000001310000003",
        // },
        // {
        //   value:
        //     "rtmp://192.168.1.71:8080/34020000001110000002/34020000001310000003",
        // },
        // {
        //   value:
        //     "http://192.168.1.71:8080/webrtc/play/34020000001110000002/34020000001310000003",
        // },
      ],
      video: "",
      dateArr: [1663918200, 1663735805],
      value: "",
      optionsTime: [
        { value: 5, label: "5分钟" },
        { value: 10, label: "10分钟" },
        { value: 30, label: "30分钟" },
        { value: 60, label: "60分钟" },
        { value: 90, label: "90分钟" },
        { value: 120, label: "120分钟" },
      ],
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initplayer();
  },

  methods: {
    initplayer() {
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }
      var breakTime = 60 * 10;
      this.player = new TcPlayer("tcplayer", {
        m3u8: this.anchor.pullUrl,
        flv: this.anchor.pullUrl,
        autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        //"poster": this.anchor.cover,
        width: "100%", //480视频的显示宽度，请尽量使用视频分辨率宽度
        height: "500", //320视频的显示高度，请尽量使用视频分辨率高度
        wording: {
          2: "未直播",
          2032: "未直播", //"请求视频失败，请检查网络",
          2048: "未直播", // "请求m3u8文件失败，可能是网络错误或者跨域问题"
        },
        listener(msg) {
          // if (this.player.currentTime() > breakTime) {
          //   //播放，且超过10分钟，暂停且提示！
          //   player.pause();
          //   // that.tipVisible = true;
          //   console.log("播放超过10分钟");
          // }
        },
      });
    },
    filterMethod(val) {
      this.video = val;
    },
    playBtn() {
      // 切换地址先销毁再播放
      this.anchor.pullUrl = this.video;
      this.initplayer();
    },
    beforeBtn() {
      // 当前时间戳
      let id = "34020000001110000002";
      let channel = "34020000001310000003";
      let endTime = Date.parse(new Date()) / 1000;
      let startTime = endTime - this.value * 60;
      console.log(111, this.value, startTime, endTime);
      // 先调用
      axios({
        // url: "http://192.168.1.71:8080/api/gb28181/query/records?id=34020000001110000002&channel=34020000001310000003&startTime=2022-9-21T10:22:02&endTime=2022-9-21T10:25:02",
        // url: "http://192.168.1.71:8080/gb28181/api/invite?id=34020000001110000002&channel=34020000001310000003&startTime=1663917840&endTime=1663918200",
        // url: "http://192.168.1.71:8080/gb28181/api/invite?id=34020000001110000002&channel=34020000001310000003&startTime=1664263496&endTime=1664268896",
        // url: "http://192.168.1.71:8081/gb28181/api/invite?id=34020000001110000002&channel=34020000001310000003&startTime=1663917840&endTime=1663918200",
        url: "http://192.168.1.71:8081/gb28181/api/invite?id=34020000001110000002&channel=34020000001310000003&startTime=1663126891&endTime=1663127257",
        // url:
        //   "http://192.168.1.71:8080/gb28181/api/invite?id=" +
        //   id +
        //   "&channel=" +
        //   channel +
        //   "&startTime=" +
        //   startTime +
        //   "&endTime=" +
        //   endTime,
      }).then((res) => {
        console.log("axios", res);
        this.options[4].value =
          "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003/" +
          startTime +
          "-" +
          endTime +
          ".flv";
      });
    },
    // 自定义进度条
    handleClickTimeLineFn(fomreTime) {
      console.log("点击的时间", fomreTime);
    },
    // 倍速
    speedBtn() {
      var videoElement = document.getElementById("tcplayer");
      videoElement.playbackRate = 2;
    },
  },
};
</script>
<style lang="scss" scoped>
.play-url-item {
  margin: 30px;
  display: flex;
  align-items: center;
}

.play-url-item + .play-url-item {
  margin-top: 10px;
}

.play-url {
  width: 100%;
}

.play-btn {
  flex-shrink: 0;
  margin-left: 10px;
}
</style>
