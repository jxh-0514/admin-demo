<template>
  <div>
    <el-button @click="open">点击</el-button>
    <el-dialog
      v-dialogDrag
      width="50%"
      :visible.sync="isShow"
      title="自定义设备类型属性"
    >
      <div class="dialogDiv">
        <el-table
          :data="
            tableData.filter(
              (data) =>
                handleAdd ||
                data.name.toLowerCase().includes(handleAdd.toLowerCase())
            )
          "
          style="width: 100%"
          border
        >
          <el-table-column prop="code" label="11"> </el-table-column>
          <el-table-column prop="maxValue" label="22"> </el-table-column>
          <el-table-column prop="minValue" label="33"> </el-table-column>
          <el-table-column prop="name" label="44"> </el-table-column>
          <el-table-column prop="valueType" label="55"> </el-table-column>
          <el-table-column prop="warning" label="66"> </el-table-column>
          <el-table-column align="center" width="160px">
            <template slot="header" slot-scope="scope">
              <el-button
                v-model="handleAdd"
                size="mini"
                type="success"
                circle
                plain
                icon="el-icon-plus"
                @click="handleAdd(scope.$index, scope.row)"
              >
              </el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                circle
                plain
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >
              </el-button>
              <el-button
                size="mini"
                type="danger"
                circle
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer">
        <el-button @click="cancel"> 取消 </el-button>
        <el-button @click="confirm" type="primary"> 确定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          code: "1",
          maxValue: "12",
          minValue: "5",
          name: "回家",
          valueType: "字符",
          warning: "ssdf",
        },
        {
          code: "2",
          maxValue: "12",
          minValue: "5",
          name: "回家",
          valueType: "字符",
          warning: "ssdf",
        },
        {
          code: "3",
          maxValue: "12",
          minValue: "5",
          name: "回家",
          valueType: "字符",
          warning: "ssdf",
        },
      ],
      isShow: false,
    };
  },
  methods: {
    // 添加
    handleAdd() {},
    // 编辑
    handleEdit(index, row) {},
    // 删除
    handleDelete(index, row) {},
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm", this.tableData);
    },
    open() {
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogDiv {
  height: 300px;
  overflow: auto;
}
</style>
