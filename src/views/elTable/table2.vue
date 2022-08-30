<template>
  <div>
    <el-table
      :data="templateData"
      style="width: 100%"
      stripe
      ref="templateTable"
      @filter-change="filterTable"
      @sort-change="sortData"
    >
      <template v-for="(item, index) in tableHeaders">
        <el-table-column
          v-if="item.prop == 'per'"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          sortable
        >
          <template slot-scope="scope">
            <el-progress
              class="NewCMMonitorPro"
              :text-inside="false"
              :percentage="70"
              :width="scope.row.width"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.prop == 'Actions'"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          sortable
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click.stop.prevent="handleEdit(scope.row)"
              style="color: #1e90ff; font-size: 14px"
            >
              <i
                class="el-icon-notebook-2"
                style="font-size: 15px"
                title="More"
              ></i>
              <!--More-->
            </el-button>
            <el-button
              size="mini"
              type="text"
              plain
              @click="handleDelete(scope.row)"
              style="color: #1e90ff; font-size: 14px"
            >
              <i
                class="el-icon-delete"
                style="font-size: 15px"
                title="Delete"
              ></i>
              <!--Delete-->
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :column-key="item.prop"
          :min-width="item.minWidth"
          :width="item.width"
          show-overflow-tooltip
          sortable
        >
        </el-table-column>
      </template>
      <!-- 过滤 -->
      <el-table-column
        width="40"
        align="center"
        :filters="filters"
        filter-placement="bottom"
        column-key="filter"
      >
        <template slot="header">
          <el-popover
            placement="left"
            trigger="hover"
            content="过滤器"
            :visible-arrow="false"
          >
            <i
              slot="reference"
              class="el-icon-setting"
              style="cursor: pointer"
            ></i>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      templateData: [
        {
          Des: "11",
          CreateTime: "2012",
          FinishedTime: "2013",
          CreateUser: "深度",
          per: "35",
          Actions: "11",
        },
        {
          Des: "22",
          CreateTime: "2012",
          FinishedTime: "2013",
          CreateUser: "深度",
          per: "35",
          Actions: "11",
        },
        {
          Des: "33",
          CreateTime: "2012",
          FinishedTime: "2013",
          CreateUser: "深度",
          per: "35",
          Actions: "11",
        },
      ],
      // 表格遍历
      tableHeaders: [
        { label: "描述", prop: "Des", width: "auto", minWidth: 150 },
        { label: "创建时间", prop: "CreateTime", width: "auto" },
        { label: "结束时间", prop: "FinishedTime", width: "auto" },
        { label: "创造者", prop: "CreateUser", width: "auto" },
        { label: "进度", prop: "per", width: "auto" },
        { label: "行动", prop: "Actions", width: "80" },
      ],
      // 过滤表格
      filters: [
        { text: "描述", value: "Des" },
        { text: "创建时间", value: "CreateTime" },
        { text: "结束时间", value: "FinishedTime" },
        { text: "创造者", value: "CreateUser" },
        { text: "进度", value: "per" },
        { text: "行动", value: "Actions" },
      ],
    };
  },
  mounted() {},
  methods: {
    handleEdit(row) {
      console.log("编辑", row);
    },
    handleDelete() {
      console.log("删除");
    },
    filterTable() {
      console.log("筛选变化");
    },
    sortData() {
      console.log("排序变化");
    },
  },
};
</script>

<style></style>
