<template>
  <div id="app">
    <!-- <Live2d /> -->
    <router-view />
  </div>
</template>

<script>
import Live2d from "@/components/Live2d";
export default {
  name: "App",
  components: { Live2d },
};
</script>
<style lang="less" scoped></style>
