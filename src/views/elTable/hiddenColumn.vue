<template>
  <div>
    <el-popover placement="top-start" title="自定义表头" width="200" trigger="click">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
        <el-checkbox v-for="item in tableLabel" :label="item.param" :key="item.param">{{item.label}}</el-checkbox>
      </el-checkbox-group>
      <el-button slot="reference" icon="el-icon-setting">自定义</el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    tableLabel: {
      type: Array,
      default: () => {
        return [];
      }
    },
    hiddenString: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkAll: false,
      checkedList: [],
      isIndeterminate: true,
      list:[
          {
          label: "序号ID",
          param: "xId",
          align: "center",
          width: "60",
          show: true
        },
        {
          label: "图片",
          param: "account_name1",
          align: "center",
          show: true
        },
        {
          label: "云羿SKU/易佰SKU/标题",
          param: "shop_name12",
          align: "center",
          show: true
        },
      ]
    };
  },
  created() {
    this.dataAnalysis();
  },
  methods: {
    dataAnalysis() {
      //选中数据
    //   let hiddenCheckedList = this.$getStorage(this.hiddenString);
      let hiddenCheckedList = this.list;
      this.checkedList = [];
      if (hiddenCheckedList) {
        let array = hiddenCheckedList;
        for (let index = 0; index < array.length; index++) {
          this.checkedList.push(array[index]);
        }
      } else {
        let array = this.tableLabel;
        for (let index = 0; index < array.length; index++) {
          if (array[index].show) {
            this.checkedList.push(array[index].param);
          }
        }
      }
      //样式判断
      this.checkAll = this.checkedList.length === this.tableLabel.length;
      this.isIndeterminate =
        this.checkedList.length > 0 &&
        this.checkedList.length < this.tableLabel.length;
    },
    handleCheckAllChange(value) {
      if (value) {
        this.checkedList = [];
        this.tableLabel.forEach(element => {
          this.checkedList.push(element.param);
        });
      } else {
        this.checkedList = [];
      }
      this.isIndeterminate = false;
    //   this.$setStorage(this.hiddenString, this.checkedList);
    window.localStorage.setItem(this.hiddenString, JSON.stringify(this.checkedList))
      this.$emit("handleCheckedChangelist", this.checkedList);
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableLabel.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableLabel.length;
    //   this.$removeStorage(this.hiddenString);
    //   this.$setStorage(this.hiddenString, value);
      this.$emit("handleCheckedChangelist", value);

      window.localStorage.removeItem(this.hiddenString)
      window.localStorage.setItem(this.hiddenString, JSON.stringify(value))
    }
  }
};
</script>