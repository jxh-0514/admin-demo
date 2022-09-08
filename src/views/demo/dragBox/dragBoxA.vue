<!-- 拖拽盒子 -->
<template>
  <div class="box" ref="box">
    <div class="left">
      <!--左侧div内容-->
      <h1>到了时间你就一定要上场</h1>
      <h1>当意识到达，那就必须上岸</h1>
    </div>
    <div class="resize" title="收缩侧边栏"></div>
    <div class="mid">
      <!--右侧div内容-->
      <h1>我希望我希望的有希望</h1>
      <h1>想着光向着光</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.dragControllerDiv();
  },
  methods: {
    dragControllerDiv() {
      var resize = document.getElementsByClassName("resize")[0];
      var left = document.getElementsByClassName("left");
      var mid = document.getElementsByClassName("mid");
      var box = document.getElementsByClassName("box")[0];

      // 鼠标按下事件
      resize.onmousedown = function (e) {
        //颜色改变提醒
        resize.style.background = "#818181";
        var startX = e.clientX;
        resize.left = resize.offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function (e) {
          var endX = e.clientX;
          var moveLen = resize.left + (endX - startX); // （endx-startx）=移动的距离。resize.left+移动的距离=左边区域最后的宽度
          var maxT = box.clientWidth - resize.offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

          if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
          if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

          resize.style.left = moveLen; // 设置左侧区域的宽度

          for (let j = 0; j < left.length; j++) {
            left[j].style.width = moveLen + "px";
            mid[j].style.width = box.clientWidth - moveLen - 10 + "px";
          }
        };
        // 鼠标松开事件
        document.onmouseup = function () {
          //颜色恢复
          resize.style.background = "#d6d6d6";
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        };
        resize.setCapture && resize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false;
      };
    },
  },
};
</script>

<style scoped>
/* 拖拽相关样式 */
/*包围div样式*/
.box {
  width: 100%;
  height: 50vh;
  margin: 5vh 0px;
  overflow: hidden;
  box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
}
/*左侧div样式*/
.left {
  width: calc(32% - 10px); /*左侧初始化宽度*/
  height: 100%;
  background: #ffffff;
  float: left;
}
/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-top: -10px;
  width: 10px;
  height: 50px;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  font-size: 32px;
  color: white;
}
/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}
/*右侧div'样式*/
.mid {
  float: left;
  width: 68%; /*右侧初始化宽度*/
  height: 100%;
  background: #fff;
  box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
}
</style>
