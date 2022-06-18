<!--  -->
<template>
  <!-- 树形结构区域 -->
        <div class="treeList">
          <el-tree
            class="tree-container"
            :data="data"
            :props="defaultProps"
            default-expand-all
            @node-click="handleNodeClick"
            node-key="id"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <i :class="data.icon" style="color: #3d87a1; display: inline-block; margin-right: 5px"></i>
              <span style="margin-right: 5px">{{ node.label }}</span>
              <i v-if="data.children == null" class="el-icon-film" style="color: #3d87a1"></i>
            </span>
          </el-tree>
        </div>
</template>

<script>
  export default {
    data () {
      return {
          data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 4,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 32,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ],

      };
    },

    components: {},

    computed: {},

    watch: {},

//生命周期 - 创建完成（可以访问当前this实例）
   created() {},
//生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},

    methods: {}
  }

</script>
<style lang='less' scoped>
 .treeList {
        width: 240px;
        overflow: auto;
        background: #374956;
        // padding: 5px;
      }
      // 树形样式
/deep/.el-tree {
  position: relative;
  // height: 100%;
  cursor: default;
  background: #374956;
  color: #fff;
  font-size: 12px;
}
// 树形
.el-tree {
  color: #c2e5ec;
  background: #2c3d4b;
}
/deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #696969;
}
// 划过颜色
/deep/.el-tree-node__content:hover {
  background-color: #778899;
}
// 点击颜色
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: #778899 !important;
}
// 树状图整体向左平移 设置高度
/deep/ .el-tree-node__content {
  padding-left: 10px !important;
  height: 46px;
}
// 
/deep/ .el-tree-node__children {
  /deep/ .el-tree-node__content {
    padding-left: 25px !important;
  }
}
// 
.tree-container /deep/ .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
// 设置箭头的大小
.tree-container /deep/ .el-icon-caret-right:before {
  content: '\e791';
  font-size: 18px;
}
// 设置最外围图标整体靠左
.tree-container /deep/ .el-tree-node__expand-icon {
  // margin-left: 15px;
  padding: 0px;
}
// 
.tree-container /deep/ .el-tree-node__expand-icon.is-leaf {
  margin-left: 0px;
}
// 设置整体图表向右平移
.tree-container /deep/ .el-tree-node {
  position: relative;
  padding-left: 10px;
}
// 设置大图标下的子图标向有移动
.tree-container /deep/ .el-tree-node__children {
  padding-left: 10px;
}
// 
.tree-container /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}
.tree-container /deep/ .el-tree > .el-tree-node:before {
  border-left: none;
}

.tree-container /deep/ .el-tree > .el-tree-node:after {
  border-top: none;
}

.tree-container /deep/ .el-tree-node:before {
  content: '';
  left: 10px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree-container /deep/ .el-tree-node:after {
  content: '';
  left: 10px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
// 设置线条纵向长度的位移距离
.tree-container /deep/ .el-tree-node:before {
  border-left: 1px solid #e6e6e6;
  bottom: 0px;
  height: 100%;
  top: -12px;
  width: 1px;
}
// 设置横向线条的长度位移
.tree-container /deep/ .el-tree-node:after {
  border-top: 1px solid #e6e6e6;
  height: 55px;
  top: 13px;
  width: 12px;
}
// 
.el-tree-node :last-child:before {
  height: 25px;
}
// 添加树状图的编剧
.tree-container {
  margin: 10px;
}
.tree-container /deep/ .el-tree .el-tree-node {
  position: relative;
}
// 再次设置每个元素的高度
.tree-container /deep/ .el-tree-node .el-tree-node__content {
  height: 25px;
  // padding-left: 18px;
}
.tree-container /deep/ .el-tree-node .el-tree-node__content::before {
  border-left: 1px solid #e6e6e6;
  height: 100%;
  top: 0;
  width: 1px;
  margin-left: 1px;
  margin-top: 0px;
  z-index: 8;
}
.tree-container /deep/ .el-tree-node .el-tree-node__children .el-tree-node__content::before {
  border-left: 0px solid #e6e6e6;
  height: 100%;
  top: 0;
  width: 1px;
  margin-left: 1px;
  margin-top: 0px;
  z-index: 8;
}

.tree-container /deep/ .el-tree-node .el-tree-node__content::after {
  border-top: 1px solid #e6e6e6;
  height: 1px;
  top: 0px;
  width: 10px;
  margin-left: 1px;
  z-index: 8;
}

.tree-container /deep/ .el-tree-node .el-tree-node__children .el-tree-node__content::after {
  border-top: 0px solid #e6e6e6;
}

.tree-container .el-tree-node .el-tree-node__content::before,
.tree-container .el-tree-node .el-tree-node__content::after {
  content: '';
  position: absolute;
  right: auto;
}

</style>