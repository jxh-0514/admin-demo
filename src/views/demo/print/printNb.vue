<!-- vue-print-nb -->
<template>
  <div>
    <el-button type="primary" v-print="'#printDiv'">打印</el-button>
    <div id="printDiv">
      <p v-for="(item, index) in 100" :key="index">{{ index }}打印---print</p>
    </div>
  </div>
</template>

<script>
import print from "vue-print-nb";
export default {
  directives: { print },
  components: {},

  data() {
    return {};
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
<style lang="scss" scoped></style>
