<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-03-25 22:46:04
 * @LastEditors: 杭
 * @LastEditTime: 2023-04-01 13:55:25
-->
<!-- 自定义指令---下划线 -->
<template>
  <div>
    <h2 class="title">
      <span v-underline>试试鼠标移入的效果，试试鼠标移入的效果</span>
    </h2>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },
  directives: {
    // 下划线
    underline: {
      bind(el) {
        el.style.background =
          "linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom";
        el.style.backgroundSize = "0 2px";
        el.style.transition = "background-size 1300ms";
        el.addEventListener("mouseenter", function () {
          el.style.backgroundPositionX = "left";
          el.style.backgroundSize = "100% 2px";
        });
        el.addEventListener("mouseleave", function () {
          el.style.backgroundPositionX = "right";
          el.style.backgroundSize = "0 2px";
        });
      },
      unbind(el) {
        el.removeEventListener("mouseenter", el);
        el.removeEventListener("mouseleave", el);
      },
    },
  },
  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
// .title {
//   color: #333;
//   line-height: 2;
//   span {
//     background: linear-gradient(to right, #ec695c, #61c454) no-repeat right
//       bottom;
//     background-size: 0 2px;
//     transition: background-size 1300ms;
//     &:hover {
//       background-position-x: left;
//       background-size: 100% 2px;
//     }
//   }
// }
</style>
