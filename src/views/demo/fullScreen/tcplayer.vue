<!-- 腾讯web播放器 -->
<template>
  <div>
    <div id="tcplayer"></div>
    <!-- <div id="tcpplay" v-show="!flag"></div> -->
    <el-button @click="liveBtn">直播</el-button>
    <el-button @click="demandBtn">点播</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},

  data() {
    return {
      flag: true,
      player: null,
      anchor: {
        pullUrl:
          "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv",
      },
      currentItem: {
        url: "http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003/1663577761-1663578001.flv",
        // url: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
      },
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 直播
    // this.liveBtn();
    // 点播
    // this.demandBtn();
  },

  methods: {
    liveBtn() {
      if (this.player) {
        this.player.destroy();
        this.flag = true;
      }
      this.player = new TcPlayer("tcplayer", {
        m3u8: this.anchor.pullUrl,
        autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        //"poster": this.anchor.cover,
        width: "1110", //480视频的显示宽度，请尽量使用视频分辨率宽度
        height: "800", //320视频的显示高度，请尽量使用视频分辨率高度
        wording: {
          2: "未直播",
          2032: "未直播", //"请求视频失败，请检查网络",
          2048: "未直播", // "请求m3u8文件失败，可能是网络错误或者跨域问题"
        },
      });
    },
    demandBtn() {
      console.log("player22", this.player);
      if (this.player) {
        this.player.destroy();
        this.flag = false;
      }
      // 先调用
      axios({
        url: "http://192.168.1.71:8080/gb28181/api/invite?id=34020000001110000002&channel=34020000001310000003&startTime=1663577761&endTime=1663578001",
        // url: "http://192.168.1.61:6798/gb28181/api/invite?id=" + id + "&channel=" + channel + "&startTime=" + startTime + "&endTime=" + endTime,
      }).then((res) => {
        console.log("axios", res);
        //再调用
        //   let that = this,
        var breakTime = 60 * 10;
        this.player = new TcPlayer("tcplayer", {
          m3u8: this.currentItem.url,
          flv: this.currentItem.url, //增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
          autoplay: false, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          //"poster" : "http:          //www.test.com/myimage.jpg",
          width: "100%", //480视频的显示宽度，请尽量使用视频分辨率宽度
          height: "560", //320视频的显示高度，请尽量使用视频分辨率高度
          //"controls":"none",         //禁用拖拽
          wording: {
            2: "",
            2032: "未直播", //"请求视频失败，请检查网络",
            2048: "未直播", //"请求m3u8文件失败，可能是网络错误或者跨域问题"
          },
          listener(msg) {
            if (this.player.currentTime() > breakTime) {
              //播放，且超过10分钟，暂停且提示！
              player.pause();
              // that.tipVisible = true;
              console.log("播放超过10分钟");
            }
          },
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
