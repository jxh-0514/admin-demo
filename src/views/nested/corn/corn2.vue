<template>
  <div id="app">
    cron表达式：<input v-model="cronVal"/>
    <CzrVueCron :cron.sync="cronVal" :recent="[5, 5]"/>
  </div>
</template>
<script>
import CzrVueCron from 'czr-vue-cron'
export default {
  components: {
    CzrVueCron
  },
  data() {
    return {
      cronVal: ''
    }
  }
}
</script>