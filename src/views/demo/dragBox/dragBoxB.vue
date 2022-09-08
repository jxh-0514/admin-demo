<!-- 拖拽盒子组件 -->
<template>
  <div>
    <DragBox>
      <template v-slot:left-content>
        <!-- 左侧盒子区域 -->
        <h1>到了时间你就一定要上场</h1>
        <h1>当意识到达，那就必须上岸</h1>
      </template>
      <template v-slot:right-content>
        <!-- 你的右侧盒子盛放区域 -->
        <h1>到了时间你就一定要上场</h1>
        <h1>当意识到达，那就必须上岸</h1>
      </template>
    </DragBox>
  </div>
</template>

<script>
import DragBox from "./components/DragBox.vue";
export default {
  components: {
    DragBox,
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped></style>
