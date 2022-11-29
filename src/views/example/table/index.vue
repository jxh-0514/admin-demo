<template>
  <div class="app-container">
    <!-- <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table> -->
    <Table :listData="listData" :propList="propList" :cellStyle="cellStyle">
      <template #type="{ data }">
        <span>{{ data.type }}</span>
      </template>
      <template #options="{ data }">
        <el-button type="text" @click="btn(data, 1)">修改</el-button>
        <el-button type="text" @click="btn(data, 1)">删除</el-button>
      </template>
      <!-- 匿名插槽 -->
      <p>匿名</p>
      <!-- 具名插槽 使用# 或者 v-slot -->
      <template #title>
        <p>123123</p>
      </template>
      <!-- 作用域插槽 -->
      <template #content="scope">
        <p>{{ scope.a }}</p>
        <p>{{ scope.b }}</p>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table";
import { getList } from "@/api/table";

export default {
  components: { Table },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listData: [
        {
          id: 1,
          name: "苏州",
          address: "苏州创业园",
          time: "2022-10-20",
          type: "11",
        },
        {
          id: 2,
          name: "苏州",
          address: "苏州创业园",
          time: "2022-10-20",
          type: "22",
        },
      ],
      propList: [
        { prop: "name", label: "名称" },
        { label: "类型", columnType: true, soltName: "type" },
        { prop: "address", label: "地址" },
        { prop: "time", label: "时间" },
        {
          label: "操作",
          columnType: true,
          soltName: "options",
          width: "200",
        },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    btn(data, val) {
      console.log("按钮", data, val);
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (column.property == "type") {
        if (row.type == "11") {
          return "color:rgb(105 221 233)";
        } else {
          return "color:#000";
        }
      }
    },
  },
};
</script>
