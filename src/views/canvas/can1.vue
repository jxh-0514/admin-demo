<template>
  <div class="signHandle">
    <canvas
      ref="signHandle"
      class="canvas"
      id="canvas"
      @touchstart="drawStart"
      @touchmove="drawing"
      @touchend="drawEnd"
    >
    </canvas>
    <div class="btn-box">
      <span class="clear-btn" @click.stop="clearSign">重置</span>
      <span class="submit-btn" @click.stop="saveSign">提交</span>
    </div>
  </div>
</template>
<script>
const { clientWidth, clientHeight } = document.documentElement;
export default {
  props: {
    //canvas 宽度
    canvasWidth: {
      type: Number,
      default: clientWidth,
    },
    //canvas 高度
    canvasHeight: {
      type: Number,
      default: clientHeight,
    },
    //canvas 背景色
    canvasBackground: {
      type: String,
      default: "#fff",
    },
    //线条颜色
    lineColor: {
      type: String,
      default: "#000",
    },
    //线条宽度
    lineWidth: {
      type: Number,
      default: 3,
    },
    //线条两端形状
    lineRound: {
      type: String,
      default: "round", //圆形
    },
  },
  data() {
    return {
      direction: false, //屏幕方向  true:横屏  false:竖屏
      el: "", //canvas dom
      ctx: "", //canvas内容
    };
  },
  created() {
    this.initPhoneDirection();
  },
  mounted() {
    this.draw();
  },
  methods: {
    /**
     * 判断当前手机为竖屏还是横屏
     */
    initPhoneDirection() {
      window.addEventListener(
        "onorientationchange" in window ? "oorientationchange" : "resize",
        () => {
          if (window.orientation === 180 || window.orientation === 0) {
            this.direction = false;
            this.draw();
          }
          if (window.orientation === 90 || window.orientation === -90) {
            this.direction = true;
            this.draw();
          }
        },
        false
      );
    },
    /**
     * 添加绘制线
     */
    draw() {
      document.addEventListener("touchmove", (e) => e.preventDefault(), {
        passive: false,
      });
      this.el = this.$refs.signHandle;
      this.initCanvas();
    },
    /**
     * 初始化canvas配置
     */
    initCanvas() {
      this.el.width = this.canvasWidth;
      this.el.height = this.canvasHeight;
      this.ctx = this.el.getContext("2d");
      this.setCanvas();
    },
    /**
     * canvas配置
     */
    setCanvas() {
      this.ctx.fillStyle = this.canvasBackground;
      //绘制矩形
      if (this.direction) {
        this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
      } else {
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      }
      //设置线条颜色
      this.ctx.strokeStyle = this.lineColor;
      //设置线条宽度
      this.ctx.lineWidth = this.lineWidth;
      //设置线条两端形状
      this.ctx.lineCap = this.lineRound;
    },
    /**
     * 开始绘制
     */
    drawStart(e) {
      this.ctx.beginPath();
      this.ctx.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    },
    /**
     * 绘制过程
     */
    drawing(e) {
      this.ctx.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
      this.ctx.stroke();
    },
    /**
     * 绘制结束
     */
    drawEnd(e) {
      this.ctx.closePath();
    },
    /**
     * 重置
     */
    clearSign() {
      this.initCanvas();
    },
    /**
     * 提交
     */
    saveSign() {
      const imagesBase64 = this.el.toDataURL();
      console.log("imagesBase64", imagesBase64);
    },
  },
};
</script>
<style lang="scss" scoped>
.signHandle {
  width: 100%;
  canvas {
    display: blick;
  }
  .btn-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 50%;
      height: 44px;
      text-align: center;
      line-height: 44px;
      color: #333;
      background: #fff;
    }
    .submit-btn {
      color: #fff;
      background: #fa5050;
    }
  }
}
</style>
