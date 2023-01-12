<template>
  <div>
    <!-- 刻度值 -->
    <div class="value">{{ value }}</div>
    <!-- 按钮控制 -->
    <div class="button">
      <el-button
        class="mini-btn"
        type="warn"
        size="mini"
        @click="setRuler('reduce')"
      >
        -
      </el-button>
      <el-button
        class="mini-btn"
        type="warn"
        size="mini"
        @click="setRuler('plus')"
      >
        +
      </el-button>
    </div>

    <!-- 
        :min 最小值（默认0）
        :max 最大值（默认500）
        :disable 是否禁用（默认false）
        :multiple 缩放倍数（默认1）
        :point 保留小数点位数（默认0）
        :defaultValue 默认数值（默认0） 
        @change 刻度值事件监听
        -->
    <SelectRuler
      ref="ruler"
      :min="0"
      :max="240"
      :disable="false"
      :multiple="10"
      :point="1"
      :defaultValue="100"
      @change="handleChange"
    ></SelectRuler>
  </div>
</template>

<script>
import SelectRuler from "@/components/Ruler/index.vue";
export default {
  components: { SelectRuler },
  data() {
    return {
      value: 0,
    };
  },
  onLoad() {},
  methods: {
    handleChange(e) {
      this.value = e;
    },
    setRuler(type) {
      // 手动控制增加，参数为每次增加的步长。
      if (type == "plus") {
        this.$refs.ruler.plusValue(1);
      }
      // 手动控制减少，参数为每次减少的步长，2代表一次减少两个刻度。
      if (type == "reduce") {
        this.$refs.ruler.reduceValue(2);
      }
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: white;
}
.value {
  width: 100%;
  padding: 100rpx 0 20rpx 0;
  text-align: center;
  font-size: 50rpx;
}
.button {
  width: 100%;
  text-align: center;
  padding-bottom: 50rpx;

  button {
    margin: 0 10rpx;
  }
}
</style>
