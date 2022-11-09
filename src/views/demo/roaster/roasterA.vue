<template>
  <div class>
    <el-breadcrumb>
      <el-breadcrumb-item>人事管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员排班</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 列表 -->
    <el-card class="box-card">
      <div class="search">
        <el-button type="info" @click="lastweek">上一周</el-button>
        <el-button type="primary" @click="dialogVisible = true" class="addbtn"
          >新增排班</el-button
        >
        <el-button type="info" @click="nextweek">下一周</el-button>

        <div>
          <span>{{ nextMonday }}</span>
          <span>星期一</span>
          <span>~</span>
          <span>{{ lastsunday }}</span>
          <span>星期天</span>
        </div>
      </div>
      <!-- 信息 -->
      <el-table
        :data="tableData"
        stripe
        border
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column show-overflow-tooltip label="员工" prop="nurseName" align="center">
          <template slot-scope="scope">{{scope.row.nurse.nurseName}}</template>
        </el-table-column>-->

        <el-table-column
          show-overflow-tooltip
          :label="monday1"
          prop="mondayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="thursday1"
          prop="thursdayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="wednesday1"
          prop="wednesdayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="thuesday1"
          prop="thuesdayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="friday1"
          prop="fridayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="saturday1"
          prop="saturdayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          :label="sunday1"
          prop="sundayStatus"
          align="center"
          width="175"
        ></el-table-column>
        <el-table-column show-overflow-tooltip label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showEditDialog(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        background
        layout="total, prev, pager, next,jumper"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加信息 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="55%"
      @close="dialogClosed"
    >
      <el-form
        label-width="120px"
        :model="form"
        :rules="formRules"
        ref="formRef"
      >
        <el-form-item label="排班起始日期" prop="schedulingDay">
          <el-date-picker
            v-model="this.dateFormat2"
            value-format="yyyy-MM-dd 00:00:00"
            type="date"
            editable
            disabled
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="排班结束日期">
          <el-date-picker
            v-model="this.dateFormat8"
            value-format="yyyy-MM-dd 00:00:00"
            type="date"
            editable
            disabled
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="员工" prop="staffId">
          <el-select v-model="form.staffId" placeholder="员工">
            <el-option
              v-for="item in workers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="星期一" prop="mondayStatus">
          <el-input
            v-model="form.mondayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="星期二" prop="thursdayStatus">
          <el-input
            v-model="form.thursdayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="星期三" prop="wednesdayStatus">
          <el-input
            v-model="form.wednesdayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="星期四" prop="thuesdayStatus">
          <el-input
            v-model="form.thuesdayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="星期五" prop="fridayStatus">
          <el-input
            v-model="form.fridayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="星期六" prop="saturdayStatus">
          <el-input
            v-model="form.saturdayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="星期日" prop="sundayStatus">
          <el-input
            v-model="form.sundayStatus"
            size="medium"
            placeholder="排班状态"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script>
// import rules from "@/defined/rules";
// import request from "@/public/http";
export default {
  data() {
    return {
      base: "",
      monday: "",
      today: "",
      dateFormat2: "",
      dateFormat8: "",
      nextMonday: "",
      lastsunday: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      role: false,
      homes: [],
      workers: [],
      total: 0,
      tableData: [],
      title: "新增",
      dialogVisible: false,
      form: {},
      formRules: {},
      //   新增
      monday1: "",
      thursday1: "",
      wednesday1: "",
      thuesday1: "",
      friday1: "",
      saturday1: "",
      sunday1: "",
    };
  },
  components: {},
  created() {},
  watch: {},
  mounted() {
    // this.getTableList();
    // this.getAddInfo();
    // this.getworkers();
    this.getTime();
  },
  methods: {
    lastweek() {
      this.getBeforNday(this.base, 7);
      console.log(this.dateFormat2);
      this.getTableList();
    },
    nextweek() {
      this.getBeforNday(this.base, -7);
      console.log(this.dateFormat2);
      this.getTableList();
    },
    getTime() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var date = myDate.getDate();
      var str = myDate.getDay();
      console.log(str, 888);
      if (str == 1) {
        this.getBeforNday(myDate, 1);
      }
      if (str == 2) {
        this.getBeforNday(myDate, 2);
      }
      if (str == 3) {
        this.getBeforNday(myDate, 3);
      }
      if (str == 4) {
        this.getBeforNday(myDate, 4);
      }
      if (str == 5) {
        this.getBeforNday(myDate, 5);
      }
      if (str == 6) {
        this.getBeforNday(myDate, 6);
      }
      if (str == 0) {
        this.getBeforNday(myDate, 0);
      }
    },
    getBeforNday(date, n) {
      var todays = date.getTime();
      var today = new Date();
      this.today = today.setTime(todays);

      var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24;
      var yesterday = new Date();

      yesterday.setTime(yesterday_milliseconds);

      var strYear = yesterday.getFullYear();
      var strDay = yesterday.getDate();
      var strMonth = yesterday.getMonth() + 1;
      var strdate = yesterday.getDay();

      if (strdate == 0) {
      }
      if (strMonth < 10) {
        strMonth = "0" + strMonth;
      }
      let datastr = strYear + "年" + strMonth + "月" + strDay + "日";
      let md = strMonth + "-" + strDay;
      this.sunday = md;
      this.lastsunday = datastr;
      this.dateFormat1 = strYear + "-" + strMonth + "-" + strDay;
      this.base = yesterday;
      this.getotherday(yesterday, -1);
      this.getotherday(yesterday, -2);
      this.getotherday(yesterday, -3);
      this.getotherday(yesterday, -4);
      this.getotherday(yesterday, -5);
      this.getotherday(yesterday, -6);
      this.getotherday(yesterday, -7);
    },
    getotherday(date, n) {
      var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24;
      var yesterday = new Date();
      yesterday.setTime(yesterday_milliseconds);

      var strYear = yesterday.getFullYear();
      var strDay = yesterday.getDate();
      var strMonth = yesterday.getMonth() + 1;
      var strdate = yesterday.getDay();
      if (strMonth < 10) {
        strMonth = "0" + strMonth;
      }
      if (strDay < 10) {
        strDay = "0" + strDay;
      }
      if (n == -1) {
        this.monday = strMonth + "." + strDay;
        this.monday1 =
          "星期一" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.nextMonday = strYear + "年" + strMonth + "月" + strDay + "日";
        this.dateFormat2 =
          strYear + "-" + strMonth + "-" + strDay + " " + "00:00:00";
      }
      if (n == -2) {
        this.thursday = strMonth + "." + strDay;
        this.thursday1 =
          "星期二" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.dateFormat3 = strYear + "-" + strMonth + "-" + strDay;
      }
      if (n == -3) {
        this.wednesday = strMonth + "." + strDay;
        this.wednesday1 =
          "星期三" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.dateFormat4 = strYear + "-" + strMonth + "-" + strDay;
      }
      if (n == -4) {
        this.thuesday = strMonth + "." + strDay;
        this.thuesday1 =
          "星期四" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.dateFormat5 = strYear + "-" + strMonth + "-" + strDay;
      }
      if (n == -5) {
        this.friday = strMonth + "." + strDay;
        this.friday1 =
          "星期五" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.dateFormat6 = strYear + "-" + strMonth + "-" + strDay;
      }
      if (n == -6) {
        this.saturday = strMonth + "." + strDay;
        this.saturday1 =
          "星期六" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.dateFormat7 = strYear + "-" + strMonth + "-" + strDay;
      }
      if (n == -7) {
        this.sunday = strMonth + "." + strDay;
        this.sunday1 =
          "星期天" + "(" + strYear + " / " + strMonth + " / " + strDay + ")";
        this.lastsunday = strYear + "年" + strMonth + "月" + strDay + "日";
        this.dateFormat8 =
          strYear + "-" + strMonth + "-" + strDay + " " + "00:00:00";
      }
    },

    handleChange_1(data) {
      console.log(data);
    },
    handleChange_2(data) {
      console.log(data, 123);
    },
    dialogClosed() {
      this.form = {};
      this.title = "新增";
    },
    //获取workers
    async getworkers() {
      const { data: res } = await this.$http.post("", {
        page: { pagesize: 10000, start: 0 },
      });

      this.workers = res.data;
    },
    async getTableList() {
      var a = sessionStorage.getItem("elderlyHomeId");
      if (a == 0) {
        const { data: res } = await this.$http.post("", {
          schedulingDay: this.dateFormat2,
          page: {
            pagesize: 1000,
            start: 0,
          },
        });

        if (res.msg !== "success") {
          return this.$message.error("接口出错！");
        }
        this.tableData = res.data;
        this.total = res.data.length;
      } else {
        const { data: res } = await this.$http.post("", {
          elderlyHomeId: a,
          schedulingDay: this.dateFormat2,
          page: {
            pagesize: 1000,
            start: 0,
          },
        });

        if (res.msg !== "success") {
          return this.$message.error("接口出错！");
        }
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.$http.post(
        "5003/nurseHome/nurseSubstitute/del?id=" + id
      );

      if (res.msg !== "success") {
        return this.$message.error("删除数据失败");
      }
      this.getTableList();
      this.$message.success("删除数据成功！");
    },
    //添加or修改
    showEditDialog(row) {
      this.form = row;
      this.title = "修改排班";
      this.dialogVisible = true;
    },
    async handleSubmit() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return;
        if (this.title === "修改排班") {
          request({
            url: "",
            data: this.form,
          }).then((res) => {
            this.getTableList();
            this.$message.success("修改数据成功！");
          });
          this.dialogVisible = false;
        } else {
          var a = sessionStorage.getItem("elderlyHomeId");
          this.form.elderlyHomeId = a;
          this.form.schedulingDay = this.dateFormat2;
          request({
            url: "",
            data: this.form,
          }).then((res) => {
            this.getTableList();
            this.$message.success("添加数据成功！");
          });
          this.dialogVisible = false;
        }
      });
    },
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getTableList();
    },
  },
};
</script>
<style lang="scss" scoped></style>
