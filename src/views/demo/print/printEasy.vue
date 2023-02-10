<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-02-08 11:11:55
 * @LastEditors: 杭
 * @LastEditTime: 2023-02-10 15:49:37
-->
<!-- vue-easy-print -->
<template>
  <div>
    <el-button type="primary" @click="handlePrint">打印</el-button>
    <vue-easy-print ref="printRef" tableShow>
      <p v-for="(item, index) in 100" :key="index">
        {{ index }}打印---vueEasyPrint
      </p>
    </vue-easy-print>
  </div>
</template>

<script>
import vueEasyPrint from "vue-easy-print";
export default {
  components: { vueEasyPrint },

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

  methods: {
    handlePrint() {
      this.$refs.printRef.print();
    },
  },
};
</script>
<style lang="scss" scoped></style>
