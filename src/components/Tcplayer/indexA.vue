<template>
  <div
    class="player"
    :style="'width:' + widthHeigt[0] + '%' + 'height:' + widthHeigt[1] + '%'"
  >
    <div class="video" id="tcplayer" ref="tcplayer"></div>
  </div>
</template>

<script>
// import { TcPlayer } from '../common/TcPlayer-module-2.3.3'
export default {
  name: "TcPlayer",
  components: {},
  props: {
    widthHeigt: {
      type: Array,
      default: () => {
        return [300, 100];
      },
    },
    playVideo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      player: "",
    };
  },
  created() {},
  watch: {
    playVideo: function (newVal) {
      this.play();
    },
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      let dom = document.getElementById("tcplayer");
      // let dom = this.$refs.tcplayer;
      // console.log(dom);
      while (dom.hasChildNodes()) {
        //当div下还存在子节点时 循环继续
        dom.removeChild(dom.firstChild);
        // this.player.destroy();
      }
      // console.log(JSON.stringify(this.playVideo));
      let objectString = JSON.stringify(this.playVideo);
      if (objectString != "{}") {
        this.player = new TcPlayer("tcplayer", {
          m3u8_sd: this.playVideo.m3u8_sd, //请替换成实际可用的播放地址
          m3u8_hd: this.playVideo.m3u8_hd,
          // flv_sd: this.playVideo.flv_sd, //请替换成实际可用的播放地址
          // flv_hd: this.playVideo.flv_hd, //请替换成实际可用的播放地址
          autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
          // poster: "http://www.test.com/myimage.jpg",
          flash: false,
          h5_flv: true,
          width: this.widthHeigt[0] + "%", //视频的显示宽度，请尽量使用视频分辨率宽度
          height: this.widthHeigt[1] + "%", //视频的显示高度，请尽量使用视频分辨率高度
          live: true,
          volume: 0,
          clarity: "sd",
          wording: {
            2: "摄像头连接网络不稳定",
            1002: "摄像头连接网络不稳定，请切换清晰度",
          },
        });
      }
    },
  },
  destroyed() {
    // 页面销毁，同时也销毁 TcPlayer
    this.player.destroy();
  },
};
</script>
<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
  ::v-deep .video {
    width: 100%;
    height: 100%;
    .vcp-player {
      width: 100%;
      height: 100%;
      video {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }
}
</style>
