(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a8214590"],{"5f8d":function(e,t,n){},c863:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("共享屏幕，stream流，录屏")]),n("video",{attrs:{id:"myVideo",autoplay:"",playsinline:"",muted:""},domProps:{muted:!0}}),n("el-button",{attrs:{type:"primary"},on:{click:e.shareScreen}},[e._v("共享桌面")]),n("el-button",{attrs:{type:"primary"},on:{click:e.startRecording}},[e._v("开始录屏")]),n("el-button",{attrs:{type:"primary"},on:{click:e.stopRecording}},[e._v("停止录屏")])],1)},o=[],r=n("c7eb"),i=n("1da1"),c=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),{components:{},data:function(){return{mediaRecorder:null}},computed:{},watch:{},destroyed:function(){},created:function(){},mounted:function(){},methods:{shareScreen:function(){var e=this;return Object(i["a"])(Object(r["a"])().mark((function t(){var n;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.isShare()){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,navigator.mediaDevices.getDisplayMedia({audio:!0,video:!0});case 4:n=t.sent,e.playStream(n),e.getMediaStream(n);case 7:case"end":return t.stop()}}),t)})))()},playStream:function(e){var t=document.getElementById("myVideo");t.srcObject=e},getMediaStream:function(e){console.log("mediaStream",e);var t={audioBitsPerSecond:128e3,videoBitsPerSecond:25e5,mimeType:"video/webm"};this.mediaRecorder=new MediaRecorder(e,t)},startRecording:function(){var e=this;this.mediaRecorder.start(),this.mediaRecorder.onstart=function(){console.log("录屏---开始")},this.mediaRecorder.ondataavailabel=function(t){console.log("当有可用数据",t);var n=new Blob([t.data],{type:"video/mp4"});e.downBlob(n)}},stopRecording:function(){console.log("录屏---停止"),this.mediaRecorder.stop()},downBlob:function(e){var t=URL.createObjectURL(e),n=document.createElement("a");document.body.appendChild(n),n.href=t,n.download="myVideo.mp4",n.click(),URl.revokeObjectURL(t)},isShare:function(){return!(!navigator.mediaDevices||!("getDisplayMedia"in navigator.mediaDevices))||(this.$message.warning("不支持getDisplayMedia"),!1)}}}),d=c,s=(n("e58d"),n("2877")),u=Object(s["a"])(d,a,o,!1,null,"5f53bf04",null);t["default"]=u.exports},e58d:function(e,t,n){"use strict";n("5f8d")}}]);