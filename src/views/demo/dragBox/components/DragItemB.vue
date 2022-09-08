<template>
  <div
    ref="container"
    class="d-flex"
    style="min-width: 200px; position: relative"
  >
    <div style="width: 100%; height: 100%">
      <slot>默认信息</slot>
    </div>
    <!-- 拖拽条 -->
    <div v-if="resizeShow" class="resize" />
  </div>
</template>
<script>
export default {
  props: {
    // 控制拖拽条的是否显示，默认显示
    resizeShow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style>
.resize {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: #d6d6d6;
}
</style>
