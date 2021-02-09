<template>
  <div class="main">
    <div class="content-box">
      <input type="button" :value="format" @click="isShow" />
      <svg
        t="1612841862774"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3646"
        width="30"
        height="30"
      >
        <path
          d="M352.576 128v64H832a64 64 0 0 1 64 64v576a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V256a64 64 0 0 1 64-64h96.576V128h64zM832 384.704H192V832h640V384.704zM544 640v64h-64v-64h64z m192 0v64h-64v-64h64z m-384 0v64h-64v-64h64z m192-128v64h-64V512h64z m192 0v64h-64V512h64z m-384 0v64h-64V512h64zM832 256H192v64h640V256z m-95.552-128v64h-64V128h64z"
          p-id="3647"
        ></path>
      </svg>
    </div>
    <div class="select-box" v-show="show">
      <div class="header">
        <div class="left">
          <button @click="changeYear(-1)">&lt;&lt;</button>
          <button @click="changeMonth(-1)">&lt;</button>
        </div>
        <h3>
          {{ formats }}
        </h3>
        <div class="right">
          <button @click="changeYear(1)">&gt;&gt;</button>
          <button @click="changeMonth(1)">&gt;</button>
        </div>
      </div>
      <div class="body">
        <ul class="week">
          <li v-for="week in weeks" :key="week">{{ week }}</li>
        </ul>
        <ul class="list">
          <li
            v-for="(day, index) in dateList"
            :key="index"
            :class="day.style"
            @click="handleClick(day)"
          >
            {{ day.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      today: {
        year: "",
        month: "",
        day: "",
      },
      dateList: [], //记录当前展示页的列表
    };
  },
  created() {
    const { today } = this;
    const [year, month, day] = this.getYearMonthDay(new Date());
    today.year = year;
    today.month = month;
    today.day = day;
    this.addDate();
  },
  methods: {
    isShow() {
      //控制是否展示底部的选择日期栏
      const { show } = this;
      this.show = !show;
    },
    changeYear(num) {
      this.today.year += num;
      this.addDate();
    },
    changeMonth(num) {
      const { month } = this.today;
      const { today } = this;
      const [ maxMonth, minMonth ] = [12, 1];
      let newMonth = month + num;
      if(newMonth > maxMonth) {//表示到下一年了
        today.month = minMonth;
        today.year += 1;
      } else if(newMonth < minMonth) {
        today.month = maxMonth;
        today.year -= 1;
      } else {
        today.month = newMonth;
      }
      console.log(today)
      this.addDate();
    },
    getTotalDay(year, month) {
      //计算一个月有多少天
      if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
      } else if (month === 2) {
        if (this.isLeapYear(year)) return 29;
        else return 28;
      } else {
        return 31;
      }
    },
    isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
    addDate() {
      const { today, dateList, getLastLen, getTotalDay } = this;
      const { year, month } = today;

      dateList.length = 0;

      //计算当前月的第一天的星期数
      let weekNum = new Date(year, month - 1, 1).getDay();
      //表示上一个月的总天数
      let lastLen = getLastLen(year, month);
      //获取当前月份的天数
      const len = getTotalDay(year, month);
      //加上上个月份日期
      this.initDateList(weekNum, lastLen, len);
    },
    getLastLen(year, month) {
      //计算上一个月的天数
      let lastLen = null;
      if (month === 1) {
        lastLen = 31;
      } else {
        lastLen = this.getTotalDay(year, month - 1);
      }
      return lastLen;
    },
    initDateList(weekNum, lastLen, len) {
      //将要渲染的数组进行初始化
      const {
        dateList,
        today: { year, month, day },
      } = this;
      const [ nowYear, nowMonth, nowDay ] = this.getYearMonthDay(new Date());
      console.log(lastLen, weekNum, len)
      for (let p = weekNum - 1; p >= 0; p--) {
        dateList[p] = {
          value: lastLen--,
          style: "last",
        };
      }
      //加上当前月份日期
      for (let i = weekNum, j = 1; i < len + weekNum; i++) {
        //计算当前li所拥有的样式
        let style = "";
        if (year === nowYear && month === nowMonth && j === nowDay) {
          style += "today ";
        }
        if (day === j) {
          style += "active";
        }
        dateList[i] = {
          style,
          value: j++,
        };
      }
      //加上下一个月份的日期
      for (let q = len + weekNum, m = 1; q < 42; q++) {
        dateList.push({
          value: m++,
          style: "next",
        });
      }
    },
    handleClick(days) {
      //当点击的时候进行切换
      const { today, show } = this;
      const { year, month } = today;
      if (days.style === "last") {
        //表示上一个月
        if (month === 1) {
          today.month = 12;
          today.year = year - 1;
        } else {
          today.month = month - 1;
        }
      } else if (days.style === "next") {
        //表示下一个月
        if (month === 12) {
          today.month = 1;
          today.year = year + 1;
        } else {
          today.month = month + 1;
        }
      }
      today.day = days.value;

      this.addDate();
      this.show = !show;
    },
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return [ year, month, day ];
    },
  },
  computed: {
    format() {
      //将一个日期转化成yyyy-mm-dd格式
      let { day } = this.today;
      let str = this.formats;
      day = day + "";
      str += "-" + day.padStart(2, "0");
      return str;
    },
    formats() {
      //将日期转化成一个yyyy-mm
      let { year, month } = this.today;
      let str = year;
      month = month + "";
      str += "-" + month.padStart(2, "0");
      return str;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
body {
  width: 100vw;
  height: 100vh;
}
.main {
  width: 280px;
  height: 100px;
}
.content-box {
  position: relative;
}
.content-box input {
  width: 200px;
  height: 36px;
  background: #fff;
}
.content-box svg {
  position: absolute;
  left: 0;
  top: 3px;
}
.select-box {
  width: 300px;
  border: 1px solid red;
  margin-top: 6px;
  position: relative;
}
.select-box::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid red;
  border-color: transparent transparent red transparent;
  position: absolute;
  top: -13px;
  left: 7px;
}
.header {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header .left,
.header .right {
  margin: 10px;
}
.header .left button,
.header .right button {
  padding: 2px 4px;
  margin: 0 3px;
}
.header h3 {
  font-weight: 400;
}
.body {
  width: 100%;
}
.list,
.week {
  width: 280px;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
}
.week {
  margin: 0 auto;
  padding: 0 10px;
  border-bottom: 1px solid red;
  color: #f40;
}
.list li,
.week li {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.list li {
  color: #212121;
}
/* 表示被选中时的状态 */
.list li.active {
  background: #02b6fd;
  border-radius: 50%;
  color: #fff;
}
/* 表示是今天的 */
.list li.today {
  color: #f40;
}
/* 表示不是当前月份的日期 */
.list li.last,
.list li.next {
  color: #ccc;
}
</style>