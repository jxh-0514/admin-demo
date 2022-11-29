<template>
  <div id="calendar">
    <div class="choose-head">
      <div class="choose-year">{{ currentYear }} 年排班日历</div>
      <div class="choose-search">
        <el-button
          @click="handleChangePickPre(currentYear)"
          icon="el-icon-arrow-left"
        ></el-button>
        <el-input
          class="choose-input"
          v-model.trim="currentYear"
          placeholder=""
          disabled
        >
          {{ currentYear }}</el-input
        >
        <el-button
          @click="handleChangePickNext(currentYear)"
          icon="el-icon-arrow-right"
        ></el-button>
      </div>
    </div>
    <div class="box">
      <div v-for="item in calendarDataList" :key="item.id" class="calendarList">
        <div class="title-month">{{ item.month }}</div>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <li v-for="item1 in item.xq" :key="item1.id"></li>
          <li v-for="item1 in item.list" :key="item1.id">
            <div @click="handleChangeTime(item.months, item1)">
              <div>{{ item1.name }}</div>
              <div :style="{ '--aColor': item1.color }" class="activeB">
                {{ item1.type }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vacationApply",
  data() {
    return {
      currentYear: new Date().getFullYear(), //年
      typeColour: "", //
      dayChecked: "",
      calendar: [
        {
          telit: "2022-01-01",
          type: "早",
          color: "#f00",
        },
        {
          telit: "2022-01-03",
          type: "中",
          color: "#34f",
        },
        {
          telit: "2022-01-09",
          type: "早晚",
          color: "#0b0",
        },
      ],
      calendarDataList: [
        {
          month: "一月",
          months: "01",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "二月",
          months: "02",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "三月",
          months: "03",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "四月",
          months: "04",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "五月",
          months: "05",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "六月",
          months: "06",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "七月",
          months: "07",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "八月",
          months: "08",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "九月",
          months: "09",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "十月",
          months: "10",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "十一月",
          months: "11",
          day: 0,
          xq: 0,
          list: [],
        },
        {
          month: "十二月",
          months: "12",
          day: 0,
          xq: 0,
          list: [],
        },
      ],
      vacation: "",
    };
  },
  created: function () {
    this.handleChangeInitData();
  },
  methods: {
    getCurrentDayCalendar(year) {
      let that = this;
      for (let i = 0; i < that.calendarDataList.length; i++) {
        that.calendarDataList[i].list = [];
        // 获取每月天数
        let thisDate = new Date(year, that.calendarDataList[i].months, 0);
        that.calendarDataList[i].day = thisDate.getDate(); //赋值-获取天数
        for (var j = 1; j <= that.calendarDataList[i].day; j++) {
          //1.拿到了list的天数
          that.calendarDataList[i].list.push({
            name: j < 10 ? "0" + j : j,
          });
        }

        for (var h = 0; h < that.calendarDataList[i].list.length; h++) {
          // 年月日
          that.vacation =
            year +
            "-" +
            that.calendarDataList[i].months +
            "-" +
            that.calendarDataList[i].list[h].name;
          // 用12月的年月日和calendar中年月日对比
          for (let k = 0; k < that.calendar.length; k++) {
            // 如果相等结束循环
            if (this.calendar[k].telit == that.vacation) {
              that.calendarDataList[i].list[h].type = this.calendar[k].type;
              that.calendarDataList[i].list[h].color = this.calendar[k].color;
              break;
            }
          }
        }
        // 获取前月的第一天是星期几，空几格
        let date = new Date(year, this.calendarDataList[i].months - 1, 1);
        this.calendarDataList[i].xq = date.getDay();
      }
    },

    // js获取每个月有多少天
    handleChangeInitData(year) {
      if (year != undefined) {
        this.currentYear = year;
        this.getCurrentDayCalendar(year);
      } else {
        let date = new Date();
        let year = date.getFullYear();
        this.getCurrentDayCalendar(year);
      }
    },
    // 点击年
    handleChangePickPre(year) {
      year--;
      this.currentYear = year;
      this.handleChangeInitData(year);
    },
    handleChangePickNext(year) {
      year++;
      this.currentYear = year;
      this.handleChangeInitData(year);
    },
    // 点击事件
    handleChangeTime(months, row) {
      let date = this.currentYear + "-" + months + "-" + row.name;
      console.log("点击日期", row, date);
    },
  },
};
</script>
<style scoped lang="scss">
#calendar {
  font-size: 12px;
  width: 98%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px;
  .choose-head {
    width: 100%;
    padding: 0 0 20px 0;
    /* background-color: #f0f0f0; */
    .choose-year {
      text-align: center;
      font-size: 25px;
    }
    .choose-search {
      display: flex;
      flex-flow: flex-end;
      justify-content: end;
      .choose-input {
        width: 100px !important;
      }
    }
  }
  .box {
    width: 100%;
    height: calc(100vh - 180px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: scroll;
    //自定义滚动条样式
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-track {
      background-color: #999;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #002840;
      -webkit-border-radius: 2em;
      -moz-border-radius: 2em;
      border-radius: 2em;
    }
    .calendarList {
      width: 24%;
      .title-month {
        font-size: 18px;
        text-align: center;
      }
      .weekdays {
        margin: 0;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        color: #999;
        justify-content: space-around;
        li {
          display: inline-block;
          width: 13.6%;
          text-align: center;
        }
      }
      .days {
        padding: 10px;
        background: #ffffff;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        li {
          /* calendardatalist-style-type: none; */
          display: inline-block;
          width: 14.2%;
          text-align: center;
          padding-bottom: 4px;
          padding-top: 10px;
          font-size: 12px;
          color: rgb(34, 32, 32);
        }
        .activeB {
          color: var(--aColor);
          width: 30px;
          height: 20px;
          font-weight: bold;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
}
</style>
