<!--封装的table组件 / 循环表头（带图片与按钮） -->
<template>
  <div class="table_box">
    <el-table
        :data="tableData"
        :border="border"
        :style="tstyle"
        :size="tsize"
        :header-cell-style="headerStyle">
        <el-table-column
          	v-if="check"
            type="selection"
            width="40">
        </el-table-column>
        <template v-for="(item,i) in tableLabel">   
          <!-- 例：开关按钮 -->
          <el-table-column
          v-if="item.switch"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sort" :key="i">
            <template slot-scope="scope">
            <!-- scope.row[item.prop] 其实是 scope.row['value'],为了灵活选择匹配类名 -->
              <el-switch
                v-model="scope.row[item.prop]"
                @change="switchFn">
              </el-switch>
            </template>
          </el-table-column>
          <!-- 例：图片 -->
          <el-table-column
          align="center"
          v-else-if="item.png"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="item.id">
            <template slot-scope="scope">              
              <img :src="scope.row[item.prop]" alt="">
            </template>
          </el-table-column>
          <!-- 普通数据 -->
          <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sortable="item.sort" 
          :key="i"
          >
          </el-table-column>
        </template>
		<!-- 操作按钮 -->
        <el-table-column v-if="operate" label="操作" width="200" align="center">
          <template slot-scope="scope">
              <template v-for="(item,i) in operate">
                  <el-button
                  v-if="item === 'edit'"
                  :key="i"
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                  v-if="item === 'delete'"
                  :key="i"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'table1',
  data () {
    return {

    }
  },
  props: {
    // 表格数据,类型array（数组）
    tableData: {
      type: [Array, Object],
      required: true
    },
    // 表头数据,类型array（数组）
    tableLabel: {
      type: [Array, Object],
      required: true
    },
    // 表头样式，类型: obj （对象） ,默认：{‘background-color’:’#FAFAFA’}
    headerStyle: {
      type: [Object],
      required: false,
      default: function () {
      	//var(...)：全局定义的颜色，方便修改，之前有解释的文章
        return { 'background-color': 'var(--tabtop)' }
      }
    },
    // 表格边框，类型：true/false （布尔值）,默认：true
    border: {
      type: [Boolean],
      required: false,
      default: true
    },
    // 是否带有复选框, 类型：true/false （布尔值）,默认：false
    check: {
      type: [Boolean],
      required: false,
      default: function () {
        return false
      }
    },
    // 是否带有操作按钮，类型array（数组）,默认：[‘edit’,‘delete’]
    operate: {
      type: [Boolean, Array],
      required: false,
      default: function () {
        return ['edit', 'delete']
      }
    },
    // 表格样式，类型: obj （对象） , 默认：{ width: ‘100%’ }
    tstyle: {
      type: [Array, Object, String],
      required: false,
      default: function () {
        return { width: '100%' }
      }
    },
    // 表格尺寸，类型：string（字符串），默认：‘mini’
    tsize: {
      type: [String],
      required: false,
      default: function () {
        return 'mini'
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    switchFn (e) {
      console.log(e)
    }
  }

}
</script>
