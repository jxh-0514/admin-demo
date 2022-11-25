<template>
  <div>
    <div class="box" v-move="coordinates"></div>
  </div>
</template>

<script>
export default {
  name: "Move",
  data() {
    return {
      coordinates: { x: 200, y: 100, zIndex: 1000 },
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
</style>
