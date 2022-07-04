<!-- 树型控件 + 弹出框 -->
<template>
  <div>
    <el-tree
 	:data="data"
	node-key="id"
    default-expand-all
    :default-checked-keys="[1]"
    :expand-on-click-node="false"
    ref="tree"
    @node-click="handleNodeClick"
    :highlight-current="true"
>
	<span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="tree-lable" v-if="!data.showInput">{{
            node.label
        }}</span>
        <span>
            <el-button
            type="text"
            size="mini"
                @click.prevent="visiblePopover(data.id)"
            >
            <el-popover
                placement="left"
                trigger="click"
                v-model="visibles[data.id]"
            >
            <a><li>编辑</li></a>
            <span slot="reference" >设置</span>
            </el-popover>
            </el-button>
        </span>
        </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    components: {},

    data () {
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

    computed: {},

    watch: {},

//生命周期 - 创建完成（可以访问当前this实例）
   created() {},
//生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},

    methods: {
        visiblePopover (a) {
            for (let i = 1; i < this.visibles.length; i++) {
                if (i == a) {
                this.visibles[i] = true
                } else {
                this.visibles[i] = false
                }
            }
        },
        handleNodeClick() {},
    }
  }

</script>
<style lang='scss' scoped>
</style>