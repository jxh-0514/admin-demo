<!-- 树型控件 + 弹出框 -->
<template>
  <div>
    <el-tree :data="data" node-key="id" default-expand-all :default-checked-keys="[1]" :expand-on-click-node="false" ref="tree" @node-click="handleNodeClick" :highlight-current="true">
      <span class="custom-tree-node" slot-scope="{node, data}">
        <span class="tree-lable">{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click.prevent="visiblePopover(data.$treeNodeId)">
            <el-popover placement="left" trigger="click" v-model="visibles[data.$treeNodeId]" @hide="hidePopover(data.$treeNodeId)">
              <a>
                <li>编辑231231231231231231 {{node.label}}</li>
              </a>
              <span slot="reference">设置</span>
            </el-popover>
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let treeId = 0;
export default {
  components: {},

  data() {
    return {
      visibles: [],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
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
    };
  },

  computed: {
    
  },

  watch: {
    
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },

  methods: {
    visiblePopover(a) {
      console.log('====================================');
      console.log(a, this.visibles);
      console.log('====================================');
      // 方法一
      // for (let i = 1; i < this.visibles.length; i++) {
      //   //有延迟
      //   if (i == a) {
      //     this.visibles[i] = false          
      //   } else {
      //     this.visibles[i] = false
      //   }               
      // }
      // 方法二
      // if (treeId == a) {
      //     this.visibles[a] = false 
      // } else {
      //   this.visibles[a] = false                          
      //   treeId = a
      // }
      this.visibles[a] = false 
    },
    // 隐藏时触发
    hidePopover(i) {
      console.log('隐藏', i);
      // this.visibles[i] = false
    },
    handleNodeClick() { },
  }
}

</script>
<style lang='scss' scoped>
</style>