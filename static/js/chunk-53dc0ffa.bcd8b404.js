(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53dc0ffa"],{"3cf0":function(t,e,n){},"8bf4":function(t,e,n){"use strict";n("3cf0")},d225:function(t,e,n){"use strict";n.r(e);var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("video",{staticStyle:{width:"100%"},attrs:{id:"video",controls:"",autoplay:""}}),n("div",{staticClass:"play-url-item"},[n("div",{staticClass:"play-url"},[n("el-input",{attrs:{size:"medium",placeholder:"请输入播放地址",clearable:""},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}})],1),n("div",{staticClass:"play-btn"},[n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.playBtn()}}},[t._v("播放")])],1)])])},i=[],a=n("952a"),o=n.n(a),s={components:{},data:function(){return{flv:null,player:null,videoUrl:"https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",inputValue:""}},computed:{},watch:{},destroyed:function(){this.destroy()},created:function(){},mounted:function(){this.init()},methods:{init:function(){var t=document.getElementById("video");this.flv=new o.a({element:t,frameTracking:!1,updateOnStart:!1,updateOnFocus:!1,reconnect:!0,reconnectInterval:3e3}),this.play()},play:function(){this.player=this.flv.init({type:"flv",url:this.videoUrl,isLive:!0},{enableStashBuffer:!1,autoCleanupSourceBuffer:!0,stashInitialSize:128}),this.player.play()},destroy:function(){this.player&&(this.player.pause(),this.player.unload(),this.player.detachMediaElement(),this.player.destroy(),this.player=null,console.log("===================================="),console.log("页面销毁"),console.log("===================================="))},playBtn:function(){console.log("播放"),this.videoUrl=this.inputValue,this.play()}}},u=s,c=(n("8bf4"),n("2877")),r=Object(c["a"])(u,l,i,!1,null,"74ae0e70",null);e["default"]=r.exports}}]);