<!-- leaflet  使用Vue,extend构造组件 -->
<template>
  <div>
    <!--这里写需要的弹窗内容 -->
    <!-- {{ popupData.aa }} -->
    <!-- <el-carousel width="200px" height="150px">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
    <div id="staionPane">
      <div id="stationName">{{ name }}</div>
      <div>
        <span>告警数量：</span>
        <a id="alarmNum" @click="handleClick">{{ alarmNum }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupContent",
  props: {
    // 接收传来的数据
    popupData: {
      type: Object,
      default: () => {},
    },
  },
  components: {},

  data() {
    return {
      name: "",
      id: null,
      alarmNum: 0,
    };
  },

  computed: {},

  watch: {},

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  methods: {
    handleClick() {
      alert(this.alarmNum);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#stationName {
  margin-top: 20px;
}
</style>
