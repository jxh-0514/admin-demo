<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-07-05 21:29:07
 * @LastEditors: 杭
 * @LastEditTime: 2023-07-07 08:37:33
-->
<!-- vlc插件模式播放rtsp监控流 -->
<template>
  <div>
    <!-- <object
      type="application/x-vlc-plugin"
      id="vlc"
      events="True"
      classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
      codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab"
      width="768"
      height="432"
    >
      <param name="mrl" v-bind:value="this.rtsp_url" />
      <param name="volume" value="50" />
      <param name="autoplay" value="true" />
      <param name="loop" value="false" />
      <param name="fullscreen" value="false" />
    </object> -->
    <!-- <object
      id="vlc"
      events="false"
      windowless="true"
      type="application/x-vlc-plugin;"
      pluginspage="http://www.videolan.org/"
      width="500"
      height="300"
    /> -->
    <iframe src="/vlc.html" frameborder="0" width="800" height="500"></iframe>
    vlc
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      rtsp_url: "rtmp://ns8.indexforce.com/home/mystream",
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var vlc = document.getElementById("vlc");
    // vlc.playlist.stop();
    // vlc.playlist.clear();
    // vlc.playlist.add(this.rtsp_url);
    // vlc.playlist.play();
    console.log("vlc---", vlc);
  },

  methods: {},
};
</script>
<style lang="scss" scoped></style>
