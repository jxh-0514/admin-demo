<!--  -->
<template>
  <div>
    <el-card>
      <div class="search">
        <el-button type="info" @click="lastweek">上一月</el-button>
        <el-button type="primary" @click="dialogVisible = true" class="addbtn"
          >新增排班</el-button
        >
        <el-button type="info" @click="nextweek">下一月</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        border
        @selection-change="handleCurrentChange"
      >
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          width="120"
          fixed
        ></el-table-column>
        <el-table-column
          v-for="item in tableHeader"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          align="center"
        ></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tableHeader: [],
      tableData: [],
    };
  },

  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getHeader();
  },

  methods: {
    getHeader() {
      for (let i = 0; i < 31; i++) {
        this.tableHeader.push({ prop: i + "1", label: i + 1 + "号" });
      }
    },
    lastweek() {},
    nextweek() {},
    handleCurrentChange(val) {
      console.log("选择", val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
