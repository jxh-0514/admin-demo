<template>
  <div>
      <Table :tableData="tableData" :tableLabel="tableLabel" :headerStyle="{'background-color':'var(--tabtop)'}"  :check="true"></Table>
  </div>
</template>

<script>
//导入组件
import Table from './tableT.vue'
// import hiddenColumn from './hiddenColumn.vue'
export default {
  components:{
	Table,
    // hiddenColumn
  },
  data () {
    return {
      tableData: [{
        id: 1,
        name: '魔力',
        ks_id: 11,
        operation: true,
        developer: '浏览',
        project: '后台',
        product: '电脑',
        img: 'https://himg.bdimg.com/sys/portraitn/item/75b46a7868c4b0bba2daae',
        cooperation: true,
        personnel: '技术',
        remark: '一级标签'
      }, {
        id: 2,
        name: '哈哈',
        ks_id: 12,
        operation: false,
        developer: '浏览',
        project: '函数',
        product: '手机',
        img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        cooperation: true,
        personnel: '技术',
        remark: '二级标签'
      }],
      tableLabel: [
        { label: '合作商ID', width: '', prop: 'id' },
        { label: '合作商名称', width: '', prop: 'name' },
        { label: '合作商公司', width: '', prop: 'ks_id' },
        // switch:true 是否带有开关,sort:true 排序,如果还想加别的按钮等等，就这样的写法
        { label: '合作商状态', width: '', prop: 'operation', switch: true , sort:true},
        { label: '媒体类型', width: '', prop: 'developer' },
        { label: '图片', width: '', prop: 'img', png: true },
        { label: '返点百分比', width: '', prop: 'project' },
        { label: '备注', width: '', prop: 'product' },
        { label: '创建时间', width: '', prop: 'cooperation', switch: true },
        { label: '操作', width: '', prop: 'personnel' }
      ],
    }
  }
  
}
</script>


<style>

</style>