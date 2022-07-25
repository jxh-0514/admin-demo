<template>
  <div>
        <input type="text" v-model='data'>
        <button style="" @click='setTime'>开始</button>
        <div class="cardBox">
            <div style="margin:5px 0 5px 0">
                {{hour + "时" + minute + "分"+second+"秒"}}
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:'',
      minute:'0',
      hour:'0',
      second: '0',   
    }
  },
  methods:{
        setTime(){   // 点击开始触发，计算对应的秒数、分钟数、小时数，并开始倒计时
            if(this.data > 0){
                this.hour = Math.floor((this.data / 3600) % 24)
                this.minute = Math.floor((this.data / 60) % 60)
                this.second = Math.floor(this.data % 60)
                this.getTime();
            }
        },
        getTime() {
            var self = this
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                if (self.hour === 0) {
                    if (self.minute !== 0 && self.second === 0) {
	                    self.second = 59
	                    self.minute -= 1
                    } else if (self.minute === 0 && self.second === 0) {
	                    self.second = 0
	                    clearInterval(self.timer)
                    } else {
	                    self.second -= 1
                    }
                } else {
                    if (self.minute !== 0 && self.second === 0) {
                        self.second = 59
                        self.minute -= 1
                    } else if (self.minute === 0 && self.second === 0) {
                        self.hour -= 1
                        self.minute = 59
                        self.second = 59
                    } else {
                        self.second -= 1
                    }
                }
            }, 1000)
        }
    }
}
</script>

<style scoped>
.cardBox {
  margin:100px 0;
  background-color:rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 25%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  padding: 15px;
  padding-top: 15px;
  border-radius: 10px;
  color:cornsilk
}
</style>
