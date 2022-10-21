<!-- 封装表格 -->
<template>
  <div class="fz-table">
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
      :cell-style="cellStyle"
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
      <template v-for="(item, index) in propList">
        <!-- 需要特殊展示 -->
        <el-table-column
          v-if="item.columnType"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-Width="item.minWidth"
        >
          <template slot-scope="{ row }">
            <slot :name="item.soltName" :data="row"></slot>
          </template>
        </el-table-column>
        <!-- 不需要特殊展示 -->
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          :width="item.width"
          :min-Width="item.minWidth"
          :key="index"
        >
        </el-table-column>
      </template>
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
    <slot></slot>
    <slot name="title"></slot>
    <slot name="content" :a="1" :b="2"></slot>
  </div>
</template>

<script>
export default {
  name: "Table",
  components: {},
  props: {
    title: {
      type: String,
      default: "表格",
    },
    // 是否展示序号
    showIndexColumn: {
      type: Boolean,
      default: true,
    },
    // 是否展示多选
    showSelectColumn: {
      type: Boolean,
      default: true,
    },
    // 是否展示分页
    showFooter: {
      type: Boolean,
      default: true,
    },
    // 表格内容
    listData: {
      type: Array,
      default: () => [],
    },
    // 表头数据
    propList: {
      type: Array,
      default: () => [],
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    // 总数
    totalCount: {
      type: Number,
      default: 0,
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10,
      }),
    },
    // 列颜色
    cellStyle: {},
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
