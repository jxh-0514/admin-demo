<!-- 多屏切换 -->
<template>
  <div>
    <div id="fullBox">
      <video
        :id="'videoElement' + i"
        class="main"
        v-for="(item, i) in moniList"
        :key="item.id"
        :src="item.flv"
        autoplay
        muted
        controls
      ></video>
    </div>
    <div>
      <el-button @click="changeA(1)">二分屏</el-button>
      <el-button @click="changeA(2)">四分屏</el-button>
      <el-button @click="changeA(3)">九分屏</el-button>
      <el-button @click="changeB()">全屏</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      moniList: [
        {
          flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
          player: null,
        },
        {
          flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
          player: null,
        },
        {
          flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
          player: null,
        },
        {
          flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
          player: null,
        },
        // {
        //   flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
        //   player: null,
        // },
        // {
        //   flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
        //   player: null,
        // },
        // {
        //   flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
        //   player: null,
        // },
        // {
        //   flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
        //   player: null,
        // },
        // {
        //   flv: "https://tutorialehtml.com/assets_tutorials/media/Shaun-the-Sheep-The-Movie-Official-Trailer.mp4",
        //   player: null,
        // },
      ],
      flvPlayer: null,
      url: "", //监控视频流地址
      fullscreen: false, //是否全屏
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.changeA(this.moniList.length / 2);
    // 监听全屏
    document.addEventListener("fullscreenchange", () => {
      if (this.fullscreen) {
        this.$nextTick(() => {
          // 这里对全屏后样式进行操作
        });
      }
      this.fullscreen = !this.fullscreen;
    });
  },

  methods: {
    changeA(val) {
      this.moniList.map((item, i) => {
        let aa = document.getElementsByClassName("main")[i];
        aa.style.width = 100 / val + "%";
      });
    },
    changeB() {
      let element = document.getElementById("fullBox");
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      //   this.fullscreen = !this.fullscreen;
    },
  },
};
</script>
<style lang="scss" scoped>
#fullBox {
  width: 100%;
  height: 90vh;
  overflow: auto;
  overflow-y: scroll;
  background-color: #242424;
  .main {
    // width: 50%;
    border: 1px solid #fff;
  }
}
</style>
