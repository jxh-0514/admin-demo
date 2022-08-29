<!-- mqtt测试 -->
<template>
  <div class="chatroomBox">
    <!-- <ul class="contentBox">
      <li class="messageItem" v-for="(log, index) in logs" :key="index">
        <p>{{ log }}</p>
      </li>
    </ul> -->
    <div class="contentBox">
      <p class="messageItem" v-for="(log, index) in logs" :key="index">
        {{ log }}
      </p>
    </div>
    <el-row :gutter="20">
      <el-col :span="12"
        ><el-input v-model="message" placeholder="请输入内容"></el-input
      ></el-col>
      <el-col :span="12">
        <el-button @click="mqttPublish" type="success" round
          >发送消息</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>
<script>
import mqtt from "mqtt";
export default {
  data() {
    return {
      client: "",
      message: "",
      logs: [],
    };
  },
  mounted() {
    this.initMqtt();
    this.mqttReceive();
  },
  methods: {
    /**
     * @name:初始化mqtt
     * @msg:
     * @param {*}
     * @return {*}
     */
    initMqtt() {
      let vm = this;
      let commonApi = "ws://192.168.1.222:8883/mqtt";
      var mqtt = require("mqtt");
      var options = {
        //mqtt客户端的id
        // clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        clientId: "mqttx_5f0cb198",
        username: "admin",
        password: "123456",
      };
      vm.client = mqtt.connect(commonApi, options);
      this.client.on("connect", function () {
        console.log("连接成功....");
      });
      //如果连接错误，打印错误
      vm.client.on("error", function (err) {
        console.log("err=>", err);
        vm.client.end();
      });
    },
    /**
     * @name:发布mqtt消息
     * @msg:
     * @param {*}
     * @return {*}
     */
    mqttPublish() {
      let topic = "/Epat/StationServer/4G000005"; //和后台约定好的主题
      this.client.publish(topic, JSON.stringify(this.message));
    },
    /**
     * @name:接收mqtt消息
     * @msg:
     * @param {*}
     * @return {*}
     */
    mqttReceive() {
      let topic = "/Epat/StationServer/4G000005"; //要接收的主题
      const vm = this;
      vm.client.subscribe(topic, function (err) {
        if (!err) {
          console.log("订阅成功!");
        } else {
          //打印错误
          console.log("err", err);
        }
      });
      vm.client.on("message", function (topic, message) {
        vm.logs.push(message);
      });
    },
  },
  destroyed() {
    if (this.client.end) this.client.end();
  },
};
</script>

<style scoped lang="less">
.chatroomBox {
  width: 800px;
  height: 500px;
  margin: auto;
  .contentBox {
    width: 100%;
    height: 350px;
    padding: 10px 30px;
    border: 1px solid red;
    margin-bottom: 50px;
    font-size: 20px;
    // 自定义滚动条样式
    overflow-y: scroll;
    overflow-x: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      margin-top: 10px;
      // margin-right: 2px;
      margin-bottom: 10px;
      border-radius: 5px;
      //   background: #242424;
    }
    // 滑块
    &::-webkit-scrollbar-thumb {
      border: 3px solid transparent;
      border-radius: 10px;
      height: 88px;
      background: #cbb6b6;
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
    .messageItem {
      margin: 10px 0px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
