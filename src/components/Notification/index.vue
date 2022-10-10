<template>
  <div>
    <!-- <el-button @click="navBtn">点击发起通知</el-button> -->
    <!-- <p id="text"></p> -->
    <i class="el-icon-bell" @click="navBtn" />
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 测试通知
    navBtn() {
      // 先检查浏览器是否支持
      if (!("Notification" in window)) {
        alert("此浏览器不支持桌面通知！");
      }
      // 检查用户是否同意接受通知
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("温馨提醒", {
          dir: "auto",
          body: "收到一条新通知",
          icon: "https://himg.bdimg.com/sys/portraitn/item/public.1.70da21be.9VS7zW-rGyVeffNOG-lhtQ",
        });
        var that = this;
        notification.onclick = function () {
          //点击当前消息提示框后，跳转到当前页面
          // window.location = "https:baidu.com";
          //   let text = document.getElementById("text");
          //   text.innerHTML =
          //     "已于" + new Date().toTimeString().split(" ")[0] + "收到通知";
          //   notification.close();
          that.$notify({
            title: "成功",
            message:
              "已于" + new Date().toTimeString().split(" ")[0] + "收到通知",
            type: "success",
          });
        };
      }
      // 否则我们需要向用户获取权限
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // 如果用户接受权限，我们就可以发起一条消息
          if (permission === "granted") {
            var notification = new Notification("Hi there!");
          }
        });
      }
      // 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
      // 出于尊重，我们不应该再打扰他们了
    },
  },
};
</script>

<style lang="less" scoped></style>
