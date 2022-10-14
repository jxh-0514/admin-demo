<!-- 封装表格 -->
<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      @selection-change="selectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in propList">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          :key="item.prop"
        >
        </el-table-column>
      </template>
      <!-- <template v-for="item in propList">
        <el-table-column
          v-bind="item"
          align="center"
          show-overflow-tooltip
          :key="item.prop"
        >
          <template v-slot="scope">
            <slot :prop="item.prop" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template> -->
      <slot></slot>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="totalCount"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "表格数据",
    },
    showIndexColumn: {
      type: Boolean,
      default: true,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    listData: {
      type: Array,
      default: () => [],
    },
    propList: {
      type: Array,
      default: () => [],
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10,
      }),
    },
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

  methods: {
    selectionChange(val) {},
    handleSizeChange(size) {},
    handleCurrentChange(page) {},
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
