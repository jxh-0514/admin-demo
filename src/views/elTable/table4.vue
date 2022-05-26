<template>
  <div>
    <div style="display:flex;justify-content: end;">      
        <el-popover
        placement="top-start"
        title="自定义表头"
        width="150"
        trigger="click"
        v-model="dialog"
        >
        <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
        >
        <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
            <el-checkbox
            v-for="item in tableHeaders"
            :label="item.prop"
            :key="item.prop"
            >{{ item.label }}</el-checkbox
            >
        </el-checkbox-group>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancle"
            >取消</el-button
            >
            <el-button type="primary" size="mini" @click="confirm"
            >确定</el-button
            >
        </div>
        <el-button slot="reference" icon="el-icon-setting">自定义</el-button>
        </el-popover>
    </div>

    <el-table
      :data="templateData"
      style="width: 100%"
      stripe
      ref="templateTable"
      @filter-change="filterTable"
      @sort-change="sortData"
      v-loading="loading"
      :cell-style="cellStyle"
    >
      <template v-for="(item, index) in tableHeaders2">        
        <el-table-column
          v-if="item.png"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="index">
            <template slot-scope="scope">
              <!-- <el-switch
                v-model="scope.row[item.prop]"
                @change="switchFn">
              </el-switch> -->
              <img style="width: 100px;height: 60px;" :src="scope.row[item.prop]" alt="">
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
          :sortable="item.sort"          
        >               
        </el-table-column>
      </template>
      <!-- 操作 -->
      <el-table-column label="操作" width="250">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>          
        </template>
      </el-table-column> 
      <!-- 过滤 -->
      <!-- <el-table-column
            width="40" 
            align="center" 
            :filters="filters" 
            filter-placement="bottom"
            column-key="filter"
            :filter-method="filterTag"
        >
            <template slot="header">               
                <i slot="reference" class="el-icon-setting" style="cursor: pointer;"></i>                
            </template>
        </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
const states = {
  0: "已提交",
  1: "审核中",
  2: "已完成",
};
export default {
  data() {
    return {
      // 表格数据
      templateData: [ ],
      // 表格遍历
      tableHeaders: [
        { label: "描述", prop: "Des", width: "auto", sort: true },
        { label: "创建时间", prop: "CreateTime", width: "auto" },
        { label: "结束时间", prop: "FinishedTime", width: "auto" },
        { label: "创造者", prop: "CreateUser", width: "auto" },
        { label: "进度", prop: "per", width: "auto" },
        { label: "状态", prop: "stateT", width: "auto" },
        { label: '行动', prop: 'Actions', width: 'auto', sort: true},
        { label: '图片', prop: 'Img', width: 'auto', png: true},
      ],
      tableHeaders2: [
        { label: "描述", prop: "Des", width: "auto", sort: true },        
        { label: "进度", prop: "per", width: "auto" },  
        { label: "状态", prop: "stateT", width: "auto" },  
        { label: '图片', prop: 'Img', width: 'auto', png: true},      
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
      checkAll: false,
      dialog: false,
      checkedList: [],     
      isIndeterminate: true,
      hiddenString: 'table',
      loading: true,
    };
  },
  created() {
    this.dataAnalysis();
    this.nowHeaderClass(); //重点
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setTimeout(() => {
        this.loading = false
        let data = [
            {
            Des: "11",
            CreateTime: "2012",
            FinishedTime: "2013",
            CreateUser: "深度",
            per: "35",
            state: 1,
            Actions: "111",
            Img: 'https://ms.bdimg.com/pacific/0/pic/-84529569_189684464.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00'
          },
          {
            Des: "22",
            CreateTime: "2012",
            FinishedTime: "2013",
            CreateUser: "深度",
            per: "35",
            state: 0,
            Actions: "222",
            Img: 'https://ms.bdimg.com/pacific/0/pic/182046053_1071460991.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00'
          },
          {
            Des: "33",
            CreateTime: "2012",
            FinishedTime: "2013",
            CreateUser: "深度",
            per: "35",
            state: 2,
            Actions: "333",
            Img: 'https://ms.bdimg.com/pacific/0/pic/-376596018_1488442200.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00'
          },
        ]
        this.templateData = this.handleAlarmList(data)
      },500)
    },
    handleEdit(e) {
      console.log("编辑", e);
    },
    handleDelete() {
      console.log("删除");
    },
    filterTable() {
      console.log("筛选变化");
    },
    sortData(column) {
      console.log("排序变化", column);

    },
    filterTag(value, row, column) {
      console.log("filterTag", value, row, column);
    },
    // 映射状态
    handleAlarmList(data) {
      data.forEach((item) => {
        item.stateT = states[item.state];  //映射赋值用新字段接收，不会改变原字段数据state
      });
      return data;
    },
    cellStyle ({row, column, rowIndex, columnIndex}) {
      if (column.property == 'stateT') {
        if (row.stateT == '已提交') {
          return 'color:rgb(105 221 233)'
        } else if (row.stateT == '审核中') {
          return 'color:#00fc08'
        } else if (row.stateT == '已完成') {
          return 'color:rgb(14 100 229)'
        } else {
          return 'color:#000'
        }
      }
      // if (columnIndex === 4) {
      //   if (column.label === '状态' && row.isOnline === '在线') {
      //     return 'color: #00FF08'
      //   } else {
      //     return 'color: #F54949'
      //   }
      // }
    },
    cancle() {
        console.log('取消');
    },
    confirm() {
        console.log('确定',this.checkedList);
        this.handleCheckedChangelist(this.checkedList)
        localStorage.setItem(this.hiddenString, JSON.stringify(this.checkedList))
        this.dialog = false
    },
    //自定义弹窗
    dataAnalysis() {
        let hiddenCheckedList = JSON.parse(localStorage.getItem(this.hiddenString));
        this.checkedList = [];        
        if (hiddenCheckedList) {
            let array = hiddenCheckedList;
            for (let i = 0; i < array.length; i++) {
                this.checkedList.push(array[i])
            }
        } else {
            let array = this.tableHeaders;
            for (let index = 0; index < array.length; index++) {                
                this.checkedList.push(array[index].prop);                
            }
        }
        //样式判断
        this.checkAll = this.checkedList.length === this.tableHeaders.length;
        this.isIndeterminate = this.checkedList.length > 0 && this.checkedList.length < this.tableHeaders.length;
    },
    //自定义表头固定代码
    nowHeaderClass() {
        let hiddenCheckedList = JSON.parse(localStorage.getItem(this.hiddenString));
        if (hiddenCheckedList) {
            this.handleCheckedChangelist(hiddenCheckedList);
        } else {
            let array = this.tableHeaders;
            let checkedList = [];
            for (let index = 0; index < array.length; index++) {
                checkedList.push(array[index].prop);            
            }
            this.handleCheckedChangelist(checkedList);
        }
    },
    handleCheckedChangelist(data) {
      this.tableHeaders2 = [];  
      data.forEach(item => {
          this.tableHeaders.forEach(e => {
              if (item == e.prop) {
                  this.tableHeaders2.push(e);
              }
          })
      })
    },
    // 全选
    handleCheckAllChange(value) {
      if (value) {
          this.checkedList = [];
          this.tableHeaders.forEach(e => {
              this.checkedList.push(e.prop);
          })
      } else {
        this.checkedList = [];
      }      
    },
    //勾选
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableHeaders.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableHeaders.length;
    //   localStorage.removeItem(this.hiddenString)
    //   localStorage.setItem(this.hiddenString, value)
    //   this.checkedList.push(value[0])
      this.checkedList = value
    },
  },
};
</script>

<style>
</style>