(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c538a92"],{4:function(t,n){},5:function(t,n){},6:function(t,n){},7:function(t,n){},8:function(t,n){},"82c4":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"chatroomBox"},[e("div",{staticClass:"contentBox"},t._l(t.logs,(function(n,s){return e("p",{key:s,staticClass:"messageItem"},[t._v(" "+t._s(n)+" ")])})),0),e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:12}},[e("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.message,callback:function(n){t.message=n},expression:"message"}})],1),e("el-col",{attrs:{span:12}},[e("el-button",{attrs:{type:"success",round:""},on:{click:t.mqttPublish}},[t._v("发送消息")])],1)],1)],1)},c=[],o=(e("e9c4"),e("e7fc"),{data:function(){return{client:"",message:"",logs:[]}},mounted:function(){this.initMqtt(),this.mqttReceive()},methods:{initMqtt:function(){var t=this,n="ws://broker.emqx.io:8083/mqtt",s=e("e7fc"),c={connectTimeout:4e4,clientId:"mqttx_5f0cb198",username:"",password:""};t.client=s.connect(n,c),this.client.on("connect",(function(){console.log("连接成功....")})),t.client.on("error",(function(n){console.log("err=>",n),t.client.end()}))},mqttPublish:function(){var t="test1";this.client.publish(t,JSON.stringify(this.message))},mqttReceive:function(){var t="test1",n=this;n.client.subscribe(t,(function(t){t?console.log("err",t):console.log("订阅成功!")})),n.client.on("message",(function(t,e){n.logs.push(e),console.log("接收",e)}))}},destroyed:function(){this.client.end&&this.client.end()}}),i=o,l=(e("a3e9"),e("2877")),u=Object(l["a"])(i,s,c,!1,null,"1edaac5d",null);n["default"]=u.exports},9:function(t,n){},a3e9:function(t,n,e){"use strict";e("d256b")},d256b:function(t,n,e){}}]);