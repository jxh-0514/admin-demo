<template>
  <div class="dashboard-container">
    <div class="container">
      <div><img :src="a" alt="" /></div>
      <div><img :src="b" alt="" /></div>
      <div><img :src="c" alt="" /></div>
      <div><img :src="d" alt="" /></div>
      <div><img :src="e" alt="" /></div>
      <div><img :src="f" alt="" /></div>
    </div>
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <div><img :src="require('@/assets/pic/1.png')" alt="" /></div> -->
    <!-- css脉动星球效果 -->
    <div class="start"></div>
    <!-- 泡泡效果 -->
    <div class="pao"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import a from "@/assets/pic/1.png";
import b from "@/assets/pic/2.png";
import c from "@/assets/pic/3.png";
import d from "@/assets/pic/4.png";
import e from "@/assets/pic/5.png";
import f from "@/assets/pic/6.png";
import { changeIcon } from "@/utils/index.js";
export default {
  name: "Dashboard",
  data() {
    return {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
      f: f,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    // 要操作的元素
    const container = document.querySelector(".container");
    const imgs = document.querySelectorAll(".container img");

    // 为容器绑定鼠标移动事件
    container.addEventListener("mousemove", function (e) {
      // e.clientX 鼠标指针相对于窗口的水平坐标
      // window.outerWidth 窗口的外部宽度
      let percent = e.clientX / window.outerWidth;
      // 计算水平偏移量
      let offset = 10 * percent;
      let blur = 20;

      // 遍历图片
      imgs.forEach((img, index) => {
        offset *= 1.3;
        // 计算模糊度
        let blurValue = Math.pow(index / imgs.length - percent, 2) * blur;
        // 将计算好的值赋给CSS的自定义属性
        img.style.setProperty("--offset", offset + "px");
        img.style.setProperty("--blur", blurValue + "px");
      });
    });
    // 改变网站图标
    changeIcon();
  },
  methods: {},
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  /* 100%窗口宽高 */
  height: 100vh;
  /* 弹性布局 水平+垂直居中 垂直排列 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container {
  width: 100%;
  height: 160px;
  /* 相对定位 */
  position: relative;
  /* 溢出隐藏 */
  overflow: hidden;
}
.container div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 绝对定位 */
  position: absolute;
  left: 0;
  top: 0;
}
.container div img {
  width: 110%;
  height: 100%;
  /* 对图片进行剪切，保留原始比例 */
  object-fit: cover;
  /* --offset（水平偏移量）、--blur（模糊度 数值越大越模糊）是CSS的自定义属性，可通过var函数进行调用 */
  --offset: 0px;
  --blur: 2px;
  /* 设置水平偏移量 */
  transform: translateX(var(--offset));
  /* 设置模糊度 */
  filter: blur(var(--blur));
}
h3 {
  margin-top: 25px;
}
/* // 脉动星球 */
.start {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 20px #fff, -20px 0 80px #fff, 20px 0 80px #0ff,
    inset 0 0 50px #fff, inset 50px 0 80px #f0f, inset -50px 0 80px #0ff,
    inset 50px 0 200px #f0f, inset -50px 0 200px #0ff;
  animation: pulsate 6s linear infinite;
}
@keyframes pulsate {
  50% {
    box-shadow: 0 0 20px #fff, 20px 0 80px #f0f, -20px 0 80px #0ff,
      inset 0 0 50px #fff, inset 50px 0 80px #f0f, inset 50px 0 80px #0ff,
      inset -50px 0 200px #f0f, inset 50px 0 200px #0ff;
  }
}
</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

// 泡泡效果
.pao {
  border-radius: 50%;
  // box-shadow: 0 20px 30px rgb(58 81 112 / 10%),
  //   inset 0px 10px 30px 5px rgb(255 255 255 / 70%);
  box-shadow: 0 0 20px #fff, 20px 0 80px #f0f, -20px 0 80px #0ff,
    inset 0 0 50px #fff, inset 50px 0 80px #f0f, inset 50px 0 80px #0ff,
    inset -50px 0 200px #f0f, inset 50px 0 200px #0ff;
  position: absolute;
  width: 100px;
  height: 100px;
  animation: animateBubble 21s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  &::after {
    background: radial-gradient(
      ellipse at center,
      rgb(203 238 255 / 30%) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
    box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
    content: "";
    position: absolute;
    left: 5px;
    width: 90px;
    height: 90px;
  }
}
@keyframes animateBubble {
  0% {
    margin-top: 100vh;
  }
  100% {
    margin-top: -100%;
  }
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

@keyframes sideWays {
  0% {
    margin-left: 0px;
  }

  100% {
    margin-left: 50px;
  }
}
</style>
