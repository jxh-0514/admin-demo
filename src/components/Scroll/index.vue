<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-01-12 13:36:14
 * @LastEditors: 杭
 * @LastEditTime: 2023-01-12 17:02:20
-->
<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
  <!-- DOM结构 -->
  <!-- <div class="scroll-wrapper" ref="wrapper">
    <!~~ BScroll构造函数传入的盒子元素 ~~>
    <ul class="scroll-content" ref="personTab">
      <!~~ 内层盒子元素，必须为inline-block ~~>
      <li v-for="item in freshRunList" :key="item.id">
        <!~~ 内容区 ~~>
        12312312312312312312312312312
      </li>
    </ul>
  </div> -->
</template>

<script>
// import BScroll from "better-scroll";
import BScroll from "@better-scroll/core";
export default {
  name: "ScrollView",
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1,
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: true,
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 列表的数据
     */
    data: {
      type: [Array, Number],
      default: null,
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      iscroll: null,
      observer: null,
      freshRunList: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
      ],
    };
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      console.log("初始化");
      //   this._initScroll();
      this.personScroll(); //滑动
    }, 20);
  },
  beforeDestroy() {
    this.scroll.destroy();
  },
  methods: {
    // 基础滚动功能
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
      });

      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", (pos) => {
          me.$emit("scroll", pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchEnd", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    // 滑动
    personScroll() {
      // $nextTick 是一个异步函数，为了确保 DOM 已经渲染
      //   let width = 6 * 120;
      //   this.$refs.personTab.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 初始化水平方向的位置
            scrollX: true, // 设置为 true,将启用水平滚动
            scrollY: false, // 同scrollX
            probeType: this.probeType,
            // 要覆盖本机滚动，BetterScroll 必须禁止某些默认浏览器行为，例如鼠标单击。
            // 如果您希望您的应用程序响应单击事件，则必须将此选项显式设置为true
            click: true,
            // 忽略竖直方向的滚动
            // 保留原生垂直滚动，添加水平BetterScroll，将此设置为“vertical”
            // 则 BetterScroll 区域将仅对水平滑动做出反应。垂直滑动会自然滚动整个页面
            // 同理，当您想要保持自然的水平滚动时，将其设置为 “horizontal”
            // eventPassthrough: "horizontal",
            eventPassthrough: "vertical",
          });
          this.scroll.on("scrollStart", () => {
            console.log("scrollStart-");
          });
          this.scroll.on("scroll", (e) => {
            console.log("scrolling-", e);
          });
          this.scroll.on("scrollEnd", () => {
            console.log("scrollingEnd");
          });
        } else {
          // refresh better-scroll API
          // 有个时候，滚动区域的内容并不是写死的，会发生变化，
          // 当DOM结构发生改变时应重新计算 BetterScroll 以确保滚动正常工作。
          this.scroll.refresh();
        }
      });
    },
  },
};
</script>

<style scoped>
/* 容器的宽高等于可视区域的宽高 */
.wrapper {
  width: 100%;
  height: 100%;
}
.scroll-wrapper {
  white-space: nowrap;
}
.scroll-content {
  width: 1000px;
  display: inline-block;
}
</style>
