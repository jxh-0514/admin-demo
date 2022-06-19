<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <el-button @click="dian">传值</el-button>
    <HelloWorld />
    <!-- <Fmap2 v-show="flag == true" /> -->
    <el-button class="ml-15" type="primary" @click="onSearchChange">切换</el-button>
    <!-- 简易流程图样式 -->
    <el-card class="box-card">          
      <div class="flow-left">
          <div class="flow-title">审批流程图</div>
          <div class="flow-cen">          
            <!-- 第二版布局 -->
            <div class="flow-aa" v-for="(item, i) in abc" :key="i">
            <!-- 审批规则样式 -->
              <div class="gz-aa">
                {{i+1}}审批规则
              </div>
              <div class="gz-ab">                      
                <div class="flow-ab">
                  <div class="flow-bb" :style="{'height': (300/item.aa.length) - (2 * item.aa.length) + 'px'} " v-for="(o, a) in item.aa" :key="a">
                    <div>
                      <!-- {{ o.ab }} -->
                    </div>
                    <div>
                      {{ o.ac }}               
                    </div>
                    <div>
                      <!-- {{ o.ad }} -->
                    </div>
                  </div>
                </div>
                <!-- 箭头图片 -->
                <div style="width: 34px; height: 55px;" v-show="abc.length-1 !== i">
                  <img style="width:100%;margin-left:10px;" :src="arrowPng" alt=""/>
                </div>
              </div>

            </div>          
          </div>
        </div>
      </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import Fmap2 from '@/components/fmap2/fmap2.vue'

export default {
  name: 'Home',
  data () {
    return {
      flag: false,
      arrowPng: require("@/assets/arrow.png"),
      abc: [
        { aa: [{ ab: "1", ac: "董磊", ad: "单人审批" }] },
        {
          aa: [
            { ab: "2-1", ac: "唐刚，赵娟，王强，蔡宇迪", ad: "全部审批" },
            { ab: "2-2", ac: "吴铭", ad: "其一审批" },
            { ab: "2-3", ac: "张家栋", ad: "其一审批" },
          ],
        },
        {
          aa: [
            { ab: "3-1", ac: "李德华", ad: "其一审批" },
            { ab: "3-2", ac: "洪芳", ad: "单人审批" },
          ],
        },
        { aa: [{ ab: "4-1", ac: "李鸿", ad: "其一审批" }] },
        { aa: [{ ab: "5-1", ac: "刘永", ad: "其一审批" }] },
        { aa: [{ ab: "6-1", ac: "陈晓", ad: "其一审批" }] },
      ],
    }
    
  },  
  components: {
    HelloWorld,
    // Fmap2
  },
  methods: {
    dian(){
      this.bus.$emit('chuanchuan')
    },
    onSearchChange () {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="less" >
.home{
  margin:0;
  padding: 0;
  overflow: hidden;  
}
.flow-left {
      width: 100%;
      height: 360px;
      // background:rgb(19, 149, 242);
      margin: 20px 0;

      // padding: 20px;
      .flow-title {
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }

      .flow-cen {
        // width: 810px;
        height: 320px;
        margin: 20px 0;
        // background-color: rgb(251, 81, 81);
        display: -webkit-box;
        overflow: hidden;
        overflow-y: auto;
        overflow-x: scroll;

        .flow-aa {
          // display: flex;

          width: 140px;
          // height: 240px;
          margin: 10px;

          // background-color: #f77b7b;
          display: flex;
          flex-direction: column;
          .gz-aa{
            width:110px;
            height: 50px;
            background-color: #f77b7b;

          }
          .gz-ab{
            display: flex;
            align-items: center;
          
          .flow-ab{
            width: 110px;
            // margin-right: 10px;
          
          .flow-bb {
            width: 110px;
            height: 100px;
            margin: 10px auto;
            background-color: #4265b8;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 10px;

            div {
              &:nth-child(2) {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                div{
                    display:none;
                    background-color:#F1867C;
                    position:absolute;
                    border: 1px solid;
                    padding:4px;
                }
                &:hover div {
                    display:block;
                }
              }

              &:last-child {
                font-size: 12px;
                // color: red;
              }
            }
          }
        }
        }

        }

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          margin-top: 10px;
          // margin-right: 2px;
          margin-bottom: 10px;
          border-radius: 5px;
          background: #ccc;
        }

        // 滑块
        &::-webkit-scrollbar-thumb {
          border: 3px solid transparent;
          border-radius: 10px;
          height: 88px;
          background: #ddd;
          background-clip: content-Box;

          &:hover {
            border: 2px solid transparent;
          }
        }

        &::-webkit-scrollbar-button {
          display: none;
        }

        &::-webkit-scrollbar-corner {
          background: none;
        }
      }
    }
</style>
