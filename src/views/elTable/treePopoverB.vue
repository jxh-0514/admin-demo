<!-- vue中给element树结构的节点添加单击事件，控制弹框的开启和关闭 -->
<template>
  <div>
    <el-tree class="filter-tree" 
        :data="treeList" 
        :props="defaultProps" 
        default-expand-all 
        highlight-current
        :filter-node-method="filterNode"
        ref="tree" 
        @node-click="handleNodeClick">
    </el-tree>
    <el-popover placement="bottom"  trigger="manual" v-model="visible" popper-class="tree_2"> 
        <div class="basisInfo_">设备编码:{{staticParameterList.anticode}}</div>
    </el-popover>
  </div>
</template>

<script>
let treeId;
  export default {
    components: {},

    data () {
      return {
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeList: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',            
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        staticParameterList: {
          anticode: ''
        }
      };
    },

    computed: {},

    watch: {},

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},

    methods: {
        handleNodeClick(data,node,obj){
            //如果是叶子节点
            if(node.isLeaf){
                //如果点击叶子节点的id和上一次id是同一个,则通过弹框值visible取反来开启关闭弹框
                //这里要注意：开始第一次点击的时候，treeId没有值，则直接进入else里面的逻辑
                console.log('====================================');
                    console.log(treeId, data, node);
                    console.log('====================================');
                if(treeId==node.id){
                    this.visible=!this.visible
                }else{
                //否则，显示当前弹框内容
                    this.visible=true;
                    treeId=node.id                    
                    this.staticParameterList.anticode = node.id
                }
            }
        },
        filterNode() {

        }
    }
  }

</script>
<style lang='scss' scoped>
</style>