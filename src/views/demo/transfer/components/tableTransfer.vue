<template>
  <el-row :gutter="20">
    <el-col :span="11">
      <el-input
        class="input"
        v-if="showSearch"
        v-model="searchLeft"
        placeholder="请输入搜索内容"
      ></el-input>
      <el-table :data="leftData" @selection-change="handleLeftSelectionChange">
        <el-table-column
          type="selection"
          width="50"
          align="center"
          fixed="left"
        />

        <div v-for="(item, index) in columns" :key="index">
          <el-table-column
            v-if="item.visible"
            :label="item.label"
            align="center"
            :prop="item.key"
          />
        </div>
      </el-table>
    </el-col>
    <el-col :span="2" class="btns">
      <el-button
        class="btn"
        :disabled="leftMultiple"
        type="primary"
        icon="el-icon-right"
        @click="moveToRight"
        circle
      ></el-button>
      <el-button
        class="btn"
        :disabled="rightMultiple"
        type="primary"
        @click="moveToLeft"
        icon="el-icon-back"
        circle
      ></el-button>
    </el-col>
    <el-col :span="11">
      <el-input
        class="input"
        v-if="showSearch"
        v-model="searchRight"
        placeholder="请输入搜索内容"
      ></el-input>
      <el-table
        :data="rightData"
        @selection-change="handleRightSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          fixed="left"
        />
        <div v-for="(item, index) in columns" :key="index">
          <el-table-column
            v-if="item.visible"
            :label="item.label"
            align="center"
            :prop="item.key"
          />
        </div>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },

  watch: {
    searchLeft: {
      handler: function () {
        this.handleQueryLeft();
      },
      deep: true,
    },
    searchRight: {
      handler: function () {
        this.handleQueryRight();
      },
      deep: true,
    },
  },

  props: {
    //绑定数据
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //主键key值
    keyName: {
      type: String,
      default: "id",
    },
    //表格数据，例如
    /**
     * columns: [
        {
          key: "id",
          label: "id",
          visible: false,
        },
        {
          key: "name",
          label: "姓名",
          visible: true,
        },
        {
          key: "age",
          label: "年龄",
          visible: true,
        },
        {
          key: "sex",
          label: "性别",
          visible: true,
        },
      ],
     */
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 是否显示搜索框
     */
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      searchLeft: "",
      leftIds: [],
      leftMultiple: true,
      leftDataList: [],
      leftData: [],

      searchRight: "",
      rightIds: [],
      rightMultiple: true,
      rightDataList: [],
      rightData: [],
    };
  },
  methods: {
    init() {
      this.rightIds = this.value;
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.value.some((item) => item == this.dataList[i][this.keyName])) {
          this.rightDataList.push(this.dataList[i]);
        } else {
          this.leftDataList.push(this.dataList[i]);
        }
      }
      this.leftData = [...this.leftDataList];
      this.rightData = [...this.rightDataList];
    },
    // left多选框选中数据
    handleLeftSelectionChange(selection) {
      this.leftIds = selection.map((item) => item[this.keyName]);
      this.leftMultiple = !selection.length;
    },
    // right多选框选中数据
    handleRightSelectionChange(selection) {
      this.rightIds = selection.map((item) => item[this.keyName]);
      this.rightMultiple = !selection.length;
    },

    moveToRight() {
      for (let i = 0; i < this.leftDataList.length; i++) {
        let a = this.leftIds.findIndex(
          (item) => item == this.leftDataList[i][this.keyName]
        );
        if (a !== -1) {
          this.rightDataList.push(this.leftDataList[i]);
          this.$delete(this.leftDataList, i);
          i--;
        }
      }
      this.leftData = this.setData(this.leftDataList, this.searchLeft);
      this.rightData = this.setData(this.rightDataList, this.searchRight);
      this.$emit(
        "change",
        this.rightDataList.map((item) => item[this.keyName])
      );
    },

    moveToLeft() {
      for (let i = 0; i < this.rightDataList.length; i++) {
        let a = this.rightIds.findIndex(
          (item) => item == this.rightDataList[i][this.keyName]
        );
        if (a !== -1) {
          this.leftDataList.push(this.rightDataList[i]);
          this.$delete(this.rightDataList, i);
          i--;
        }
      }
      this.leftData = this.setData(this.leftDataList, this.searchLeft);
      this.rightData = this.setData(this.rightDataList, this.searchRight);
      this.$emit(
        "change",
        this.rightDataList.map((item) => item[this.keyName])
      );
    },

    handleQueryLeft() {
      this.leftData = this.setData(this.leftDataList, this.searchLeft);
    },
    handleQueryRight() {
      this.rightData = this.setData(this.rightDataList, this.searchRight);
    },

    setData(dataList, search) {
      if (search != null || search != "") {
        let list = [];

        for (let i = 0; i < dataList.length; i++) {
          if (
            this.columns.some((item) =>
              dataList[i][item.key].toLowerCase().includes(search.toLowerCase())
            )
          ) {
            list.push(dataList[i]);
          }
        }
        return list;
      } else {
        return dataList;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  padding: 20px 5px;
  max-width: 400px;
}
.btns {
  display: flex;
  align-items: center;

  flex-direction: column;
  .btn {
    margin: 20px 0;
  }
}
</style>
