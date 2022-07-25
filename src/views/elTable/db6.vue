<template>
    <div class="container">
        <el-table 
        :data="tableData" 
        border 
        @row-dblclick="dbclick" 
        :row-style="{height:'45px'}"
        :cell-class-name="tableCellClassName">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="scope">
                    <!--v-if去判断双击的是不是当前单元格-->
                    <el-input 
                        @blur="hideInput" 
                        size="mini" 
                        :ref="scope.row.index + ',' + scope.column.index" 
                        v-model="scope.row.name" 
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center">
                <template slot-scope="scope">
                    <el-input 
                        @blur="hideInput" 
                        size="mini" 
                        :ref="scope.row.index + ',' + scope.column.index" 
                        v-model="scope.row.address" 
                        v-if="scope.row.index + ',' + scope.column.index == currentCell">
                    </el-input>
                    <span v-else>{{scope.row.address}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            // 用一个字符串来保存当前双击的是哪一个单元格
            currentCell: null,
            tableData: [
                {
                    date: "2016-05-02",
                    name: "张三",
                    address: "上海市普陀区金沙江路 1518 弄",
                    id: 1
                },
                {
                    date: "2016-05-02",
                    name: "李四",
                    address: "上海市普陀区金沙江路 1518 弄",
                    id: 2
                },
            ],
        }
    },
    methods: {
        // 给单元格绑定横向和竖向的index，这样就能确定是哪一个单元格
        tableCellClassName({row, column, rowIndex, columnIndex}){
            row.index=rowIndex;
            column.index=columnIndex;
        },
        // 获得当前双击的单元格的横竖index，然后拼接成一个唯一字符串用于判断，并赋给currentCell
        // 拼接后类似这样："1,0","1,1",
        dbclick(row,column) {
            this.currentCell = row.index + ',' + column.index;
            // 这里必须要setTimeout，因为在点击的时候，input才刚被v-if显示出来，不然拿不到dom
            setTimeout(() => {
                // 双击后自动获得焦点
                this.$refs[row.index + ',' + column.index].focus();
            })
        },
        // 当input失去焦点的时候，隐藏input
        hideInput(){
            this.currentCell = null;
        }
    },
}
</script>