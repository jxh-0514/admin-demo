<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2022-11-29 13:19:31
 * @LastEditors: 杭
 * @LastEditTime: 2022-11-29 13:38:47
-->
<!-- 表格组件 -->
<template>
  <div>
    <tableData
      :config="table_config"
      :dataList="dataList"
      :loading="loading"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    />
  </div>
</template>

<script>
import TableData from "@/components/Table/index2";
export default {
  components: {
    TableData,
  },
  data() {
    return {
      // 配置项
      table_config: {
        thead: [
          {
            label: "姓名",
            prop: "name",
            minWidth: "150px",
            router: true,
            routerPath: "xxx",
          },
          {
            label: "性别",
            prop: "sex",
            minWidth: "100px",
            // filter: true,
            // callback: (rowData) => {
            //   let data = sexType[rowData.sex];
            //   if (data) {
            //     return data.label;
            //   }
            // },
          },
          { label: "头像", prop: "img", minWidth: "100px", image: true },
          { label: "电话", prop: "phone", minWidth: "150px" },
          { label: "时间", prop: "time", minWidth: "200px", sortable: true },
          {
            label: "角色",
            prop: "role",
            minWidth: "150px",
            // filter: true,
            // colorName: "",
            // callback: (rowData) => {
            //   let data = roleType[rowData.role];
            //   if (data) {
            //     return data.label;
            //   }
            // },
            // specialClass: (rowData) => {
            //   let data = roleType[rowData.role];
            //   if (data) {
            //     return data.className;
            //   }
            // },
          },
          {
            label: "状态",
            prop: "status",
            minWidth: "150px",
            switch: true,
            callback: this.changeStatus,
          },
        ],
        isCheckBox: true,
        isIndex: true,
        isOperation: true,
        // 表格操作列
        operation: {
          label: "操作",
          width: "200",
          cols: [
            {
              label: "编辑",
              type: "primary",
              handleRow: this.handleRow,
            },
            {
              label: "删除",
              type: "danger",
              handleRow: this.handleRow,
            },
          ],
        },
      },
      dataList: [],
      loading: false,
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.dataList = [
        {
          name: "张三",
          sex: "男",
          img: "",
          phone: "11234213",
          time: "2022-11-29",
          role: "管理员",
          status: "1",
        },
        {
          name: "李四",
          sex: "男",
          img: "",
          phone: "11234213",
          time: "2022-11-29",
          role: "用户",
          status: "0",
        },
      ];
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    // 操作方法
    handleRow(rowData, label) {
      console.log(rowData, label);
    },
    // 多选方法
    selectionChange(val) {
      console.log(val);
    },
    // 排序方法
    sortChange(val) {
      console.log(val);
    },
    changeStatus(val) {
      console.log(val);
    },
  },
};
</script>
