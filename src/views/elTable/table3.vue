<!--  -->
<template>
  <div>
    <!-- <div class="search-class">
      <el-button type="primary" @click="search()" icon="el-icon-search"
        >查找</el-button
      >
    </div> -->
    <div class="main-table">
      <div class="table-header">
        <hidden-column
          :tableLabel="hiddenHeader"
          :hiddenString="hiddenString"
          @handleCheckedChangelist="handleCheckedChangelist"
        ></hidden-column>
      </div>
      <!-- <commonTable
        :loading="loading"
        :tableData="tableData"
        :tableLabel="tableLabel"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :pageSize="pagination.page_size"
        :currentPage="pagination.page"
        :total="pagination.total"
      ></commonTable> -->

      <el-table
        :data="tableData"
        max-height="400"
        style="width: 100%"
        size="mini"
      >
        <el-table-column
          v-for="(item, i) in tableLabel"
          :key="i"
          :prop="item.param"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { getEabyAccountListing } from "../../api/user";
import hiddenColumn from "./hiddenColumn.vue";
export default {
  components: {
    hiddenColumn,
  },
  data() {
    return {
      tableData: [
        {
          xId: "1",
          account_name1: "sdfsdf",
          shop_name12: "今日看点",
          short_name3: "良好",
          email4: "12",
          ebay_token5: "6",
          effect_time6: "3",
          expiration_time7: "300",
          modify_time8: "34",
        },
      ],
      loading: false,
      hiddenString: "overSizeMonery",
      hiddenHeader: [],
      tableLabel: [
        {
          label: "序号ID",
          param: "xId",
          align: "center",
          width: "60",
          show: true,
        },
        {
          label: "图片",
          param: "account_name1",
          align: "center",
          show: true,
        },
        {
          label: "云羿SKU/易佰SKU/标题",
          param: "shop_name12",
          align: "center",
          show: true,
        },
        {
          label: "产品成本/产品状态",
          param: "short_name3",
          align: "center",
          show: true,
        },
        {
          label: "可用库存",
          param: "email4",
          align: "center",
          show: true,
        },
        {
          label: "在途库存",
          param: "ebay_token5",
          align: "center",
          show: true,
        },
        {
          label: "昨日销量",
          param: "effect_time6",
          align: "center",
          show: true,
        },
        {
          label: "昨日销售额（USD）",
          param: "expiration_time7",
          align: "center",
          show: true,
        },
        {
          label: "近7天销量",
          param: "modify_time8",
          align: "center",
          show: true,
        },
        {
          label: "前8-14天销量",
          param: "modify_user9",
          align: "center",
          show: true,
        },
        {
          label: "近7天销量增幅",
          param: "account_name40",
          align: "center",
          show: true,
        },
        {
          label: "近7天销量增长率",
          param: "shop_name458",
          align: "center",
          show: true,
        },
        {
          label: "近7天销售额（USD）",
          param: "short_name78",
          align: "center",
          show: true,
        },
        {
          label: "前8-14天销售额（USD）",
          param: "email44",
          align: "center",
          show: true,
        },
        {
          label: "近7天销售额增幅",
          param: "ebay_token77",
          align: "center",
          show: true,
        },
        {
          label: "近7天销售额增长率",
          param: "effect_time88",
          align: "center",
          show: true,
        },
        {
          label: "近30天销量",
          param: "expiration_tim8e",
          align: "center",
          show: true,
        },
        {
          label: "近60天销量",
          param: "modifytime",
          align: "center",
          show: true,
        },
        {
          label: "在线数量",
          param: "modify_us7er",
          align: "center",
          show: true,
        },
        {
          label: "最早在售时间",
          param: "shop_na8me",
          align: "center",
          show: true,
        },
        {
          label: "近7天销售额（USD）",
          param: "short_na7me",
          align: "center",
          show: true,
        },
        {
          label: "浏览量",
          param: "email5",
          align: "center",
          show: true,
        },
        {
          label: "平均浏览量",
          param: "ebay_toke4n",
          align: "center",
          show: true,
        },
        {
          label: "收藏数",
          param: "effect_tim3e",
          align: "center",
          show: true,
        },
        {
          label: "平均收藏数",
          param: "expiration_ti4me",
          align: "center",
          show: true,
        },
        {
          label: "产品线",
          param: "modify_t5ime",
          align: "center",
          show: true,
        },
        {
          label: "最小分类",
          param: "modify_u4ser",
          align: "center",
          show: true,
        },
        {
          label: "库存更新时间",
          param: "modify_tim5e",
          align: "center",
          show: true,
        },
        {
          label: "销量更新时间",
          param: "modify_us4er",
          align: "center",
          show: true,
        },
      ],
      searchTxt: {
        account_name: "",
        shop_name: "",
        short_name: "",
        ebay_token: "",
        account_status: "",
      },
      pagination: {
        page: 1,
        page_size: 10,
        total: 0,
      },
    };
  },
  created() {
    // this.getList();
    this.nowHeaderClass(); //重点
  },
  methods: {
    getList() {
      getEabyAccountListing(this.pagination)
        .then((result) => {
          if (result.code == 0) {
            this.tableData = result.data;
            this.loading = false;
            this.pagination.total = result.total;
          }
        })
        .catch((err) => {});
    },
    handleSizeChange(value) {
      this.pagination.page_size = value;
      this.pagination.page = 1;
      this.getList();
    },
    handleCurrentChange(value) {
      this.pagination.page = value;
      this.getList();
    },
    search() {
      this.pagination.page = 1;
      Object.assign(this.pagination, this.searchTxt);
      // this.getList();
    },
    //自定义表头固定代码
    nowHeaderClass() {
      Object.assign(this.hiddenHeader, this.tableLabel);
      // let hiddenCheckedList = this.hiddenHeader
      let hiddenCheckedList = JSON.parse(
        localStorage.getItem(this.hiddenString)
      );

      if (hiddenCheckedList) {
        this.handleCheckedChangelist(hiddenCheckedList);
      } else {
        let array = this.hiddenHeader;
        let checkedList = [];
        for (let index = 0; index < array.length; index++) {
          if (array[index].show) {
            checkedList.push(array[index].param);
          }
        }
        this.handleCheckedChangelist(checkedList);
      }
    },
    handleCheckedChangelist(data) {
      // console.log('data',data);
      this.tableLabel = [];
      this.hiddenHeader.forEach((element) => {
        data.forEach((index) => {
          if (element.param == index) {
            this.tableLabel.push(element);
          }
        });
      });
    },
    tableOptionAuth() {
      let array = this.tableOption.options;
      let authOption = [];
      array.forEach((element) => {
        if (this.$buttonAuthority(this.allButton, element.methods)) {
          authOption.push(element);
        }
      });
      if (authOption.length > 0) {
        this.tableOption.options = authOption;
      } else {
        this.tableOption = {};
      }
    },
  },
};
</script>
