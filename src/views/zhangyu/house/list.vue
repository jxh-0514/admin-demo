<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.houseId"
        clearable
        class="filter-item"
        style="width: 160px;"
        placeholder="请输入房源ID"
      />
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 160px;"
        placeholder="请输入房源名称"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查找</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        >添加</el-button
      >
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
        >导出</el-button
      >
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
      height="calc(100vh - 240px)"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="房源名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房源ID" prop="id" />

      <el-table-column
        align="center"
        min-width="100"
        label="房源名称"
        prop="name"
      />

      <el-table-column align="center" property="thumbnail" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.thumbnail" width="40" @click="ShowpreviewPic(scope.row.thumbnail)" />
        </template>
      </el-table-column>

      <el-table-column align="center" property="iconUrl" label="分享图">
        <template slot-scope="scope">
          <img :src="scope.row.shareUrl" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" prop="detail">
        <template slot-scope="scope">
          <el-dialog :visible.sync="detailDialogVisible" title="房源详情">
            <div class="house-detail-box" v-html="houseDetail" />
          </el-dialog>
          <el-button
            type="primary"
            size="mini"
            @click="showDetail(scope.row.detail)"
            >查看</el-button
          >
        </template>
      </el-table-column>

      <el-table-column align="center" label="平均售价" prop="averagePrice" />
      <el-table-column align="center" label="最小面积" prop="minArea" />
      <el-table-column align="center" label="最大面积" prop="maxArea" />
      <el-table-column align="center" label="最小单价" prop="minPrice" />
      <el-table-column align="center" label="最大单价" prop="maxPrice" />

      <!-- <el-table-column align="center" label="当前价格" prop="retailPrice" /> -->

      <!-- <el-table-column align="center" label="是否新品" prop="isNew">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isNew ? 'success' : 'error' ">{{ scope.row.isNew ? '新品' : '非新品' }}</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="是否热品" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error'">{{
            scope.row.isHot ? "热品" : "非热品"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否推荐" prop="isRecommend">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isRecommend ? 'success' : 'error'">{{
            scope.row.isRecommend ? "推荐" : "未推荐"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否优惠" prop="isPreferential">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isPreferential ? 'success' : 'error'">{{
            scope.row.isPreferential ? "优惠" : "未优惠"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否上架" prop="isPutaway">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isPutaway ? 'success' : 'error'">{{
            scope.row.isPutaway ? "上架" : "下架"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
          <el-button type="danger" size="mini" @click="open(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 图片预览   放在表格外面，这是个弹出狂-->
    <el-dialog :visible.sync="lookdialogVisible" :modal="false" title="图片预览" width="20%">
        <img :src="previewpic" alt=""  width="100%" />
    </el-dialog>
    <!-- 图片预览 -->

    <router-view />
    
  </div>
</template>

<style>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 100px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.gallery {
  width: 80px;
  margin-right: 10px;
}
.house-detail-box img {
  width: 100%;
}
</style>

<script>
//import { listHouse, deleteHouse } from "@/api/house";
import BackToTop from "@/components/BackToTop";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
// import ExportExcel from "@/vendor/Export2Excel"; 
export default {
  name: "HouseList",
  components: { BackToTop, Pagination },
  data() {
    return {
      list: [
        { id: 1, name: '碧桂园', address: '苏州创业园', thumbnail: 'https://himg.bdimg.com/sys/portraitn/item/75b46a7868c4b0bba2daae',},
        { id: 2, name: '碧桂园', address: '苏州创业园'},
        { id: 3, name: '碧桂园', address: '苏州创业园'},
        // { id: 4, name: '碧桂园', address: '苏州创业园'},
        // { id: 5, name: '碧桂园', address: '苏州创业园'},
        // { id: 6, name: '碧桂园', address: '苏州创业园'},
        // { id: 7, name: '碧桂园', address: '苏州创业园'},
        // { id: 8, name: '碧桂园', address: '苏州创业园'},
        // { id: 9, name: '碧桂园', address: '苏州创业园'},
        // { id: 10, name: '碧桂园', address: '苏州创业园'},
        // { id: 11, name: '碧桂园', address: '苏州创业园'},
        // { id: 12, name: '碧桂园', address: '苏州创业园'},
        // { id: 13, name: '碧桂园', address: '苏州创业园'},
        // { id: 14, name: '碧桂园', address: '苏州创业园'},
        // { id: 15, name: '碧桂园', address: '苏州创业园'},
        // { id: 16, name: '碧桂园', address: '苏州创业园'},
        // { id: 17, name: '碧桂园', address: '苏州创业园'},
        // { id: 18, name: '碧桂园', address: '苏州创业园'},
        // { id: 19, name: '碧桂园', address: '苏州创业园'},
        // { id: 20, name: '碧桂园', address: '苏州创业园'},
        // { id: 21, name: '碧桂园', address: '苏州创业园'},
        // { id: 22, name: '碧桂园', address: '苏州创业园'},
        // { id: 23, name: '碧桂园', address: '苏州创业园'},
        // { id: 24, name: '碧桂园', address: '苏州创业园'},
        // { id: 25, name: '碧桂园', address: '苏州创业园'},

      ],
      total: 20,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        order: "asc"
      },
      houseDetail: "",
      detailDialogVisible: false,
      downloadLoading: false,
      lookdialogVisible: false,
      previewpic: ""
    };
  },
  created() {
    this.getList();
    console.log('房源列表');
  },
  methods: {
    getList() {
    //   this.listLoading = true;
    //   listHouse(this.listQuery)
    //     .then(response => {
    //       this.list = response.data.data.list;
    //       this.total = response.data.data.total;
    //       this.listLoading = false;
    //       console.log("111");
    //       console.log(response);
    //     })
    //     .catch(() => {
    //       this.list = [];
    //       this.total = 0;
    //       this.listLoading = false;
    //     });
    },
    handleFilter() {
    //   this.listQuery.page = 1;
    //   this.getList();
    },
    handleCreate() {
      this.$router.push({ path: "/zhangyu/house/create" });
    },
    handleUpdate(row) {
      this.$router.push({ path: "/zhangyu/house/edit", query: { id: row.id } });
    },
    showDetail(detail) {
    //   console.log("打印详情")
    //   console.log(detail)
    //   this.houseDetail = detail;
    //   this.detailDialogVisible = true;
    },    
    open(row) {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       deleteHouse(row.id)
    //         .then(response => {
    //           this.$notify.success({
    //             title: "成功",
    //             message: "删除成功"
    //           });
    //           this.getList();
    //         })
    //         .catch(response => {
    //           this.$notify.error({
    //             title: "失败",
    //             message: response.data.errmsg
    //           });
    //         });
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    },
    ShowpreviewPic(url) {
      this.previewpic = url;
      this.lookdialogVisible = true;
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        console.log('导出', excel);
        const tHeader = [
          "房源ID",
          "房源名称",
          "平均售价",
          "最小面积",
          "最大面积",
          "最小单价",
          "最大单价",
          "是否热品",
          "是否推荐",
          "是否优惠"
        ];
        const filterVal = [
          "id",
          "name",
          "averagePrice",
          "minArea",
          "maxArea",
          "minPrice",
          "maxPrice",
          "isHot",
          "isRecommend",
          "isPreferential"
        ];
        excel.export_json_to_excel2(tHeader, this.list, filterVal, "房源信息");
        this.downloadLoading = false;
      });
    }
  }
};
</script>
