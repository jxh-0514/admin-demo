(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b361f5e"],{"0941":function(t,e,i){"use strict";i("c692")},1757:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("video",{attrs:{id:"videoElement",controls:"",autoplay:"",muted:"",width:"300px",height:"200px"},domProps:{muted:!0}}),i("button",{on:{click:t.play}},[t._v("加速")])])},o=[],l=i("ade3"),r=i("313e"),s=i.n(r),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"h-100",attrs:{id:"common-video"}},[a("div",{staticClass:"h-100",class:{isShow:t.control}},[a("video",{ref:"myVideo",staticClass:"video-box",attrs:{poster:t.poster,src:t.src,controls:t.controls,oncontextmenu:"return false",controlslist:"nodownload"},on:{timeupdate:t.timeupdate}}),a("img",{staticClass:"pointer operate-btn",class:{"fade-out":t.videoState},attrs:{src:i("c5d4"),alt:""},on:{click:t.operateVideo}})])])},u=[],p={name:"CommonVideo",data:function(){return{videoState:!1,studyTime:{currentTime:0,duration:0},timer:{},pauseTimer:{}}},props:{poster:{type:String,required:!1,default:""},src:{type:String,required:!0},controls:{type:Boolean,required:!1,default:!0},control:{type:Boolean,required:!1,default:!1}},mounted:function(){var t=this;this.$refs.myVideo.addEventListener("play",(function(){console.log("video is playing"),t.openTimer()})),this.$refs.myVideo.addEventListener("pause",(function(){console.log("video is stop"),t.closeTimer()}))},methods:{openTimer:function(){var t=this;this.timer=setInterval((function(){t.$emit("videoStudyTime",t.studyTime)}),5e3)},closeTimer:function(){clearInterval(this.timer),this.$emit("videoStudyTime",this.studyTime)},openPauseTimer:function(){var t=this;this.pauseTimer=setInterval((function(){t.hintOperate()}),6e5)},closePauseTimer:function(){clearInterval(this.pauseTimer)},hintOperate:function(){var t=this;this.operateVideo(),this.$alert("请点击确认继续学习","提示",{confirmButtonText:"确定",confirmButtonClass:"hint-btn",showClose:!1,callback:function(e){t.$refs.myVideo.currentTime=t.videoData.currentTime,t.operateVideo(),t.openPauseTimer()}})},timeupdate:function(t){this.studyTime.currentTime=t.target.currentTime,this.studyTime.duration=t.target.duration?t.target.duration:0},operateVideo:function(){if(!this.src)return this.$message({message:"暂无视频资源，请查看其他视频！"}),!1;this.$refs.myVideo.paused?(this.$refs.myVideo.play(),this.videoState=!0):(this.$refs.myVideo.pause(),this.videoState=!1)}},watch:{videoData:function(t,e){var i=t.currentTime,a=t.duration;i&&a&&i<a&&this.hintOperate()}}},d=p,h=(i("0941"),i("2877")),m=Object(h["a"])(d,c,u,!1,null,null,null),f=m.exports,v=i("fc78"),y=i.n(v),g=i("40b9"),P=i.n(g),E={name:"PopupContent",props:{popupData:{type:String,default:""}},components:{Video:f},data:function(){return{name:"",id:null,alarmNum:0,options:{xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[820,932,901,934,1290,1330,1320],type:"line",smooth:!0}]},flvPlayer:null,palyer:null}},computed:{},watch:{},created:function(){},mounted:function(){this.initMpegts(),console.log("接收",this.popupData)},methods:(a={handleClick:function(){alert(this.alarmNum)},initEchats:function(){var t=document.getElementById("echarts"),e=s.a.init(t);this.options&&e.setOption(this.options)},initFlv:function(){var t=this;if(y.a.isSupported()){var e=document.getElementById("videoElement");this.flvPlayer=y.a.createPlayer({type:"flv",isLive:!0,hasAudio:!1,url:"http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv"}),this.flvPlayer.attachMediaElement(e),this.flvPlayer.load();var i=this.flvPlayer.play();void 0!==i&&i.then((function(e){console.log("播放",e),t.flvPlayer.play()})).catch((function(e){console.log("暂停",e),t.flvPlayer.pause(),t.flvPlayer.unload(),t.flvPlayer.detachMediaElement(),t.flvPlayer.destroy(),t.flvPlayer=null,t.initFlv()}))}},play:function(){},initMpegts:function(){var t=this;if(P.a.getFeatureList().mseLivePlayback){var e=document.getElementById("videoElement");this.flvPlayer=P.a.createPlayer({type:"flv",isLive:!0,url:"http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv"}),this.flvPlayer.attachMediaElement(e),this.flvPlayer.load(),this.flvPlayer.play();var i=this.flvPlayer.play();void 0!==i&&i.then((function(t){console.log("播放",t)})).catch((function(e){console.log("暂停",e),t.flvPlayer.pause(),t.flvPlayer.unload(),t.flvPlayer.detachMediaElement(),t.flvPlayer.destroy(),t.flvPlayer=null,t.initFlv()}))}},initPlayer:function(){this.player=new WebMediaPlayer("","WebMediaPlayer",this.callbackFunc,{cbUserPtr:this,decodeType:"auto",height:!0})},callbackFunc:function(t,e){"playbackTime"===t||"ended"===t&&console.log("播放结束"),console.log("Callback "+t+":  "+e)},handlePlay:function(){var t="http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv";this.player&&(this.player.destroy(),this.initPlayer(),this.player.play(t,1,0))}},Object(l["a"])(a,"handleClick",(function(t){"stop"===t&&this.player.stop()})),Object(l["a"])(a,"initplayer",(function(){this.player&&(this.player.destroy(),this.player=null);this.player=new TcPlayer("tcplayer",{m3u8:this.popupData,flv:this.popupData,autoplay:!0,width:"100%",height:"180",wording:{2:"未直播",2032:"未直播",2048:"未直播"},listener:function(t){}})})),a)},A=E,T=(i("88af"),Object(h["a"])(A,n,o,!1,null,"f7df5cda",null));e["a"]=T.exports},"1a2d9":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"map"}})},n=[],o=(i("d81d"),i("e11e")),l=i.n(o),r=i("584d"),s=i.n(r),c=i("2b0e"),u=i("1757"),p={components:{popupContent:u["a"]},data:function(){return{map:null,bounds:[[0,0],[1014,556]],imageOverLay:null,curData:"",gem:[],mapUrl:l.a.icon({iconUrl:i("a36b"),iconSize:[34,34],iconAnchor:[12,25],popupAnchor:[1,-34],shadowSize:[41,41]}),mapUrlB:l.a.icon({iconUrl:s.a,iconSize:[26,42],iconAnchor:[13,42],shadowSize:[41,41],shadowAnchor:[13,41]}),iconUrl:"https://ms.bdimg.com/pacific/0/pic/-84529569_189684464.jpg?x=0&y=0&h=150&w=242&vh=150.00&vw=242.00&oh=150.00&ow=242.00",content:'<div id="mapDialog_container" ref="mapDialog_container" style="width: 300px;height:200px;"></div>',markerData:{test:"测试"}}},computed:{},watch:{},created:function(){window.aa=this.func},mounted:function(){this.initLeaflet()},methods:{initLeaflet:function(){this.map=l.a.map("map",{center:[39.905963,116.390813],zoom:15,preferCanvas:!0}),this.tiles=l.a.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map),this.markerPopup(),this.extendPopup()},extendPopup:function(){var t=this,e=[{point:[39.91553,116.391305],data:"http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv"},{point:[39.91553,116.395305],data:"http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003.m3u8"}];this.gem=[];for(var i=0;i<e.length;i++){var a=l.a.marker(e[i].point,{icon:this.mapUrlB}).addTo(this.map);a.info=e[i].data,this.gem.push(a);var n=l.a.popup().setContent(this.content);a.bindPopup(n),a.on("click",(function(e){console.log("点击marker",e),null!=t.pane&&t.pane.$destroy();var i=c["default"].extend(u["a"]);t.pane=new i({propsData:{popupData:e.target.info}}),setTimeout((function(){t.pane.$mount("#mapDialog_container")}),200)}))}},markerPopup:function(){var t=this,e=[{point:[39.90553,116.391305],data:"1111"},{point:[39.90553,116.395305],data:"2222"}];this.gem=[];for(var i=function(i){var a=l.a.marker(e[i].point,{icon:t.mapUrl}).addTo(t.map);t.gem.push(a),a.on("click",(function(){t.curData=e[i]})),a.bindPopup("<div style='width:138px;'><a id='aa' onclick='aa()' style='color:red'>收藏".concat(i,"</a></div>")),console.log("循环",i,e[i].point)},a=0;a<e.length;a++)i(a)},func:function(){console.log("123",this.curData)},showPopup:function(){var t=this;this.gem.map((function(e){e.on("click",(function(e){var i=document.getElementById("aa");console.log(i),i.onclick=function(e){console.log("===================================="),console.log("点击",t.curData.data,e),console.log("====================================")}}))}))}}},d=p,h=(i("b229"),i("2877")),m=Object(h["a"])(d,a,n,!1,null,"39fd9070",null);e["default"]=m.exports},"1e63":function(t,e,i){},"88af":function(t,e,i){"use strict";i("9960")},9960:function(t,e,i){},a36b:function(t,e,i){t.exports=i.p+"static/img/404.a57b6f31.png"},b229:function(t,e,i){"use strict";i("1e63")},c5d4:function(t,e){t.exports="data:image/png;base64,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"},c692:function(t,e,i){}}]);