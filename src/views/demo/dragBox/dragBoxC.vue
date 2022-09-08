<template>
  <div id="app" style="width: 100%; height: 100vh; border: 1px solid #ccc">
    <drag-box style="width: 100%; height: 100%">
      <drag-item class="itemA" style="width: 20%">item1</drag-item>
      <drag-item class="itemB">item2</drag-item>
      <drag-item class="itemC" style="width: 20%" :resizeShow="false"
        >item3</drag-item
      >
    </drag-box>
  </div>
</template>

<script>
import DragBox from "./components/DragBoxB.vue";
import DragItem from "./components/DragItemB.vue";

export default {
  name: "App",
  components: {
    DragBox,
    DragItem,
  },
};
</script>
<style scoped>
.itemA {
  background-color: rgb(242, 77, 77);
}
.itemB {
  background-color: rgb(242, 212, 77);
}
.itemC {
  background-color: rgb(77, 190, 242);
}
</style>
