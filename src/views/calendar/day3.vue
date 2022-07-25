<template>
  <div>
    <el-card>
      <!-- 操作栏 -->
      <el-row type="flex" justify="space-around">
        <el-col :span="12">
          <!-- 月份选择器 -->
          <monthpicker @changeMonth="changeMonth"></monthpicker>
        </el-col>
        <el-col :span="12">
            <el-button>编辑值班信息</el-button>
        </el-col>
      </el-row>
      <!-- 日历栏 -->
      <el-row class="calendar-con">
        <calendar :time="time"></calendar>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 月份选择器
import Monthpicker from './month.vue'
// 日历组件
import Calendar from './calendar.vue'
export default {
  components: {
    monthpicker: Monthpicker,
    calendar: Calendar
  },
  data() {
    return {
      time: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      }
    }
  },
  created() {},
  methods: {
    // 修改月份
    changeMonth(time) {
      console.log('time', time)
      this.time = time
    }
  }
}
</script>
<style lang="less" scoped>
.month-con {
  font-weight: 700;
  font-size: 18px;
  .month {
    margin: 0 10px;
  }
}
.calendar-con {
  margin-top: 20px;
}
</style>