<!-- 排版设置 -->
<template>
  <div>
    <div class="box">
      <div>
        <el-select v-model="value" @change="(value) => changeSel(value)">
          <el-option
            v-for="item in list"
            :key="item.id"
            :value="item.patrolGroupID"
            :label="item.patrolGroupName"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-button>上一月</el-button>
        <el-button>本月</el-button>
        <el-button>下一月</el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      :cell-class-name="tableCellClassName"
      @cell-click="cellClick"
    >
      <el-table-column
        prop="name"
        label="人员"
        width="150"
        align="center"
        fixed
      >
      </el-table-column>
      <el-table-column prop="date" label="十一月2022" width="100">
        <el-table-column
          v-for="item in tableHeader"
          :key="item.id"
          :label="item.label"
          :prop="item.prop"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="scope.row[item.prop] | colLists">{{
              scope.row[item.prop]
            }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 添加，弹窗 -->
    <el-dialog :visible.sync="addDialog" width="400px">
      <el-form
        ref="formA"
        :model="formA"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="选择班次">
          <el-select class="el-sel" v-model="formA.class">
            <el-option
              v-for="item in wcList"
              :key="item.id"
              :label="item.workClassName"
              :value="item.workClassID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择日期" v-show="!flag">
          <el-date-picker
            class="el-sel"
            v-model="formA.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="flag" type="primary" @click="deleteA"
          >删 除</el-button
        >
        <el-button type="primary" @click="confirmA">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      value: "",
      list: [],
      tableHeader: [],
      tableData: [
        {
          name: "李国华",
          date: "十月2000",
          1: "早班",
          2: "",
          3: "早班",
          4: "",
          5: "早班",
          6: "早班",
          7: "早班",
          8: "早班",
          9: "早班",
        },
        {
          name: "冯天佑",
          date: "十月2000",
          1: "",
          2: "中班",
          3: "早班",
          4: "早班",
          5: "早班",
          6: "晚班",
          7: "晚班",
          8: "晚班",
        },
        {
          name: "王志刚",
          date: "十月2000",
          1: "晚班",
          2: "晚班",
          3: "",
          4: "晚班",
          5: "早班",
        },
      ],
      wcList: [], //所有班别
      formA: {
        class: "",
        times: "",
      },
      addDialog: false, //添加弹窗
      flag: false,
    };
  },
  filters: {
    colLists(val) {
      const colMap = {
        早班: "col-m",
        中班: "col-n",
        晚班: "col-e",
      };
      return colMap[val];
    },
  },
  computed: {},

  watch: {},

  destroyed() {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("排班设置");
    this.getHeader();
  },

  methods: {
    getHeader() {
      for (let i = 0; i < 31; i++) {
        // console.log("111", (i + 1).toString());
        this.tableHeader.push({
          prop: (i + 1).toString(),
          label: (i + 1).toString(),
        });
      }
    },
    // 下拉框改变
    changeSel(val) {
      console.log("下拉框改变", val);
      this.getRosteringListPageByFuzzy(val);
    },
    // =====================添加========================
    // 保存
    confirmA() {
      console.log("点击保存", this.formA);
    },
    deleteA() {},
    cellClick(row, column, cell, event) {
      console.log(
        "当前点击格子",
        event.target.innerText,
        row,
        column,
        cell,
        event
      );
      this.flag = event.target.innerText;
      this.addDialog = true;
    },
    // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
// /deep/ .el-table thead.is-group th {
//   background-color: #000b15;
//   // background-color: transparent;
// }
// /deep/ .el-table tr,
// .el-table th {
//   background-color: #000b15;
// }
.col-m,
.col-n,
.col-e {
  color: #fff;
  padding: 10px 15px;
}
.col-m {
  background-color: #52a7f6;
}
.col-n {
  background-color: rgb(251, 188, 78);
}
.col-e {
  background-color: #631212;
}
.box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.el-sel {
  width: 100%;
}
</style>
