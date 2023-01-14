<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-01-12 11:45:11
 * @LastEditors: 杭
 * @LastEditTime: 2023-01-14 16:14:32
-->
<!-- 滑动刻度尺组件 -->
<template>
  <div>
    <div class="select-ruler">
      <!-- 遮罩层 -->
      <div class="tap-mask" v-if="disable"></div>
      <!-- 线 -->
      <div class="line"></div>
      <div class="row-line"></div>
      <!-- 左右渐变遮罩 -->
      <div class="mask mask-left"></div>
      <div class="mask mask-right"></div>
      <!-- 刻度尺 -->
      <!-- <scroll-view
        :scroll-x="true"
        @scroll="handleScroll"
        :scroll-left="scroll_left"
      >
        <span
          class="ruler-item span-item"
          v-for="(item, index) in max - min + 1"
          :key="index"
        >
          <span>{{ ((index + min) / multiple).toFixed(point) }}</span>
        </span>
      </scroll-view> -->

      <!-- <ScrollView class="scrollView">
        <div v-for="item in 10" :key="item.id">1112131212</div>
      </ScrollView>-->

      <!-- <ScrollView
        class="wrapper"
        :data="data"
        :pulldown="false"
        :scrollX="true"
        :listenScroll="true"
        @pulldown="loadData"
        @scroll="handleScroll"
      >
        <ul class="content">
          <li v-for="(item, index) in data" :key="index">123123123</li>
        </ul>
        <div class="loading-wrapper"></div>
      </ScrollView> -->

      <ScrollView
        :data="max - min + 1"
        :pulldown="false"
        :listenScroll="true"
        @scroll="handleScrollB"
      >
        <div class="box">
          <span
            class="ruler-item span-item"
            v-for="(item, index) in max - min + 1"
            :key="index"
            @click="clickItem(item)"
          >
            <span>{{ ((index + min) / multiple).toFixed(point) }}</span>
          </span>
        </div>
      </ScrollView>

      <!-- <ScrollView></ScrollView> -->
    </div>
  </div>
</template>

<script>
import ScrollView from "@/components/Scroll/index.vue";
export default {
  name: "select-ruler",
  components: {
    ScrollView,
  },
  data() {
    return {
      number: 0,
      scroll_left: 1,
      scroll: {
        detail: {},
      },

      data: [
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
      pulldown: true,
    };
  },
  props: {
    // 最小值
    min: {
      type: Number,
      default: 0,
    },
    // 最大值
    max: {
      type: Number,
      default: 500,
    },
    // 缩放比例
    multiple: {
      type: Number,
      default: 1,
    },
    // 默认值
    defaultValue: {
      type: Number,
      default: 0,
    },
    // 是否禁用
    disable: {
      type: Boolean,
      default: false,
    },
    // 小数点后保留位数
    point: {
      type: Number,
      default: 0,
    },
  },
  created() {
    // this.loadData();
    // 等待滚动条初始化完成
    setTimeout(() => {
      this.setDefault(this.defaultValue);
    }, 500);
  },
  mounted() {
    window.addEventListener("resize", this.resizeCharts);
  },
  methods: {
    // 刻度尺滚动监听
    handleScroll(e) {
      this.scroll = e;
      this.number = Math.round(
        e.detail.scrollLeft /
          Math.round((e.detail.scrollWidth - 375) / this.max)
      );
      this.$emit(
        "change",
        ((this.number + this.min) / this.multiple).toFixed(this.point)
      );
    },
    // 初始化刻度尺
    initScroll() {
      this.scroll_left =
        this.number *
        Math.round((this.scroll.detail.scrollWidth - 375) / this.max);
    },
    // 设置默认值
    setDefault(number) {
      if (number < this.min || number > this.max) {
        uni.showToast({
          title: `数值超出范围(${this.min / this.multiple}-${
            this.max / this.multiple
          })`,
          icon: "none",
        });
      }
      if (number < this.min) number = this.min;
      if (number > this.max) number = this.max;
      this.number = number - this.min;
      this.initScroll();
    },
    // 增加
    plusValue(step) {
      this.setDefault(this.number + this.min + Math.floor(step));
    },
    // 减少
    reduceValue(step) {
      this.setDefault(this.number + this.min - Math.floor(step));
    },

    loadData() {
      this.data = this.data.concat(this.data);
    },
    handleScrollB(val) {
      console.log("滚动", val);
    },
    // 点击事件
    clickItem(item) {
      console.log("点击", item);
    },
  },
};
</script>

<style scoped lang="scss">
.select-ruler {
  width: 100%;
  height: 150px;
  margin-top: 20px;
  position: relative;

  .tap-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .line {
    width: 10px;
    position: absolute;
    top: 40px;
    // left: 366px;
    left: 50%;
    text-align: center;

    &:before {
      content: "";
      width: 6px;
      height: 80px;
      background: #00bc00;
      display: inline-block;
      vertical-align: text-top;
    }
  }
  .row-line {
    width: 100%;
    height: 1px;
    background: rgba(#3a414b, 0.07);
    top: 40px;
    left: 0;
    position: absolute;
  }
  .mask {
    width: 150px;
    height: 120px;
    position: absolute;
    top: 0;
    z-index: 2;
    pointer-events: none;

    &.mask-left {
      left: 0;
      background-image: linear-gradient(to right, #fff, rgba(#fff, 0));
    }
    &.mask-right {
      right: 0;
      background-image: linear-gradient(to right, rgba(#fff, 0), #fff);
    }
  }
  .scroll-view {
    width: 100%;
    height: 100%;
    white-space: nowrap;

    .ruler-item {
      width: 10px;
      text-align: center;
      display: inline-block;
      position: relative;
      padding-top: 40px;

      &:first-child {
        margin-left: 366px;
      }
      &:last-child {
        margin-right: 376px;
      }
      &:before {
        content: "";
        width: 1px;
        height: 30px;
        background: rgba(#3a414b, 0.07);
        display: inline-block;
        vertical-align: text-top;
      }
      span {
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        color: #3d3d3d;
        font-size: 24px;
        display: none;
      }
      &:nth-child(10n + 1) {
        &::before {
          width: 1px;
          height: 60px;
        }
        span {
          display: block;
        }
      }
    }
  }
  .wrapper {
    white-space: nowrap;
    .box {
      display: inline-block;
      .ruler-item {
        width: 10px;
        text-align: center;
        display: inline-block;
        position: relative;
        padding-top: 40px;

        &:first-child {
          margin-left: 366px;
        }
        &:last-child {
          margin-right: 376px;
        }
        &:before {
          content: "";
          width: 1px;
          height: 30px;
          background: rgba(#3a414b, 0.07);
          display: inline-block;
          vertical-align: text-top;
        }
        span {
          position: absolute;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
          color: #3d3d3d;
          font-size: 24px;
          display: none;
        }
        &:nth-child(10n + 1) {
          &::before {
            width: 1px;
            height: 60px;
          }
          span {
            display: block;
          }
        }
      }
    }
  }
}
</style>
