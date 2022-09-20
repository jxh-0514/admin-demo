<!-- 西瓜播放器 -->
<template>
  <div>
    <!-- <div id="mse"></div>
    <el-button @click="liveBtn">直播</el-button>
    <el-button @click="demandBtn">点播</el-button> -->
    <LivePlayer
      :videoUrl="videoUrl"
      fluent
      autoplay
      :loading="true"
    ></LivePlayer>

    <!-- <el-input v-model="video"></el-input> -->
    <!-- <el-button @click="playBtn">播放</el-button> -->
    <div class="play-url-item">
      <div class="play-url">
        <el-input
          v-model="video"
          size="medium"
          placeholder="请输入播放地址"
          clearable
        ></el-input>
      </div>
      <div class="play-btn">
        <el-button type="primary" size="medium" @click="playBtn()"
          >播放</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import LivePlayer from "@liveqing/liveplayer";
export default {
  components: {
    LivePlayer,
  },

  data() {
    return {
      videoUrl: "",
      video: "",
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  methods: {
    liveBtn() {},
    demandBtn() {},
    playBtn() {
      this.videoUrl = this.video;
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
