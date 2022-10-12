<template>
  <div>
    <VueEditor class="rich" v-model="content"></VueEditor>
    <h1>实时预览</h1>
    <div v-html="content"></div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.rich {
  width: 100%;
  height: 500px;
  margin: 0 auto 50px;
}
</style>
