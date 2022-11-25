<!-- 日历 -->
<template>
  <div class="container">
    <YearCalendar
      v-model="year"
      :activeDates.sync="activeDates"
      @toggleDate="toggleDate"
      lang="tw"
      :showYearSelector="showYearSelector"
      prefixClass="your_customized_wrapper_class"
      :activeClass="activeClass"
    >
    </YearCalendar>
  </div>
</template>

<script>
// 插件地址：https://github.com/nono1526/vue-material-year-calendar
import YearCalendar from "vue-material-year-calendar";

export default {
  components: { YearCalendar },

  data() {
    return {
      year: 2022, //显示的年份
      //   activeDates: ["2022-06-08"], //选择的日期---用颜色显示
      activeDates: [
        { date: "2022-02-13" },
        { date: "2022-02-14", className: "red" },
        { date: "2022-02-15", className: "blue" },
        { date: "2022-02-16", className: "your_customized_classname" },
        { date: "2022-03-16", className: "demo", class: "red" },
        { date: "2022-03-17", className: "demo", class: "green" },
      ], //选择的日期---用颜色显示
      showYearSelector: true, //在日历顶部显示或隐藏年份选择器。
      activeClass: "", //设置点击日历显示的颜色
      // activeClass: "my_red", //设置点击日历显示的颜色
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  methods: {
    toggleDate(dateInfo) {
      console.log(dateInfo); // { date: '2010-10-23', selected: true }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 80vh;
  // background: #f6f6f3;
  overflow: hidden;
  overflow-y: auto;
}
.demo {
  background: v-bind(demo);
  // background: var(--demo);
}
</style>
<style lang="stylus">
.your_customized_wrapper_class
  background-color: #0aa
  color: black
  &.red
    background-color: #a00
    color: black
  &.blue
    background-color: #0000aa
    color: black
  &.your_customized_classname
    background-color: yellow
    color: black
  &.my_red
    background-color:#f00
    color: black
</style>
