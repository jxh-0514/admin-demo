(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f0cc50b6"],{"74be":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{attrs:{id:"mse"}}),i("div",{staticClass:"play-url-item"},[i("div",{staticClass:"play-url"},[i("el-input",{attrs:{size:"medium",placeholder:"请输入播放地址",clearable:""},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}})],1),i("div",{staticClass:"play-btn"},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.playBtn()}}},[t._v("播放")])],1)])])},n=[],l=(i("cead"),i("b276"),i("9925"),i("8f4a"),i("bb5a"),i("8519"),i("a321"),{components:{},data:function(){return{player:null,inputValue:"",videoUrl:"//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8"}},computed:{},watch:{},destroyed:function(){this.player&&this.player.destroy()},created:function(){},mounted:function(){this.initPlayer()},methods:{initPlayer:function(){this.player=new HlsPlayer({id:"mse",isLive:!0,url:this.videoUrl,autoplay:!0,playsinline:!0,height:"500",width:"100%"})},playBtn:function(){this.player.pause(),this.videoUrl=this.inputValue,this.initPlayer()}}}),s=l,u=(i("7c53"),i("2877")),c=Object(u["a"])(s,a,n,!1,null,"610c2523",null);e["default"]=c.exports},"7c53":function(t,e,i){"use strict";i("a5c5")},a5c5:function(t,e,i){}}]);