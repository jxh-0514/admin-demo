(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d4ebb5c2"],{"0941":function(t,e,a){"use strict";a("c692")},1757:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("video",{attrs:{id:"videoElement",controls:"",autoplay:"",muted:"",width:"300px",height:"200px"},domProps:{muted:!0}}),a("button",{on:{click:t.play}},[t._v("加速")])])},o=[],l=a("ade3"),r=a("313e"),s=a.n(r),c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"h-100",attrs:{id:"common-video"}},[i("div",{staticClass:"h-100",class:{isShow:t.control}},[i("video",{ref:"myVideo",staticClass:"video-box",attrs:{poster:t.poster,src:t.src,controls:t.controls,oncontextmenu:"return false",controlslist:"nodownload"},on:{timeupdate:t.timeupdate}}),i("img",{staticClass:"pointer operate-btn",class:{"fade-out":t.videoState},attrs:{src:a("c5d4"),alt:""},on:{click:t.operateVideo}})])])},u=[],p={name:"CommonVideo",data:function(){return{videoState:!1,studyTime:{currentTime:0,duration:0},timer:{},pauseTimer:{}}},props:{poster:{type:String,required:!1,default:""},src:{type:String,required:!0},controls:{type:Boolean,required:!1,default:!0},control:{type:Boolean,required:!1,default:!1}},mounted:function(){var t=this;this.$refs.myVideo.addEventListener("play",(function(){console.log("video is playing"),t.openTimer()})),this.$refs.myVideo.addEventListener("pause",(function(){console.log("video is stop"),t.closeTimer()}))},methods:{openTimer:function(){var t=this;this.timer=setInterval((function(){t.$emit("videoStudyTime",t.studyTime)}),5e3)},closeTimer:function(){clearInterval(this.timer),this.$emit("videoStudyTime",this.studyTime)},openPauseTimer:function(){var t=this;this.pauseTimer=setInterval((function(){t.hintOperate()}),6e5)},closePauseTimer:function(){clearInterval(this.pauseTimer)},hintOperate:function(){var t=this;this.operateVideo(),this.$alert("请点击确认继续学习","提示",{confirmButtonText:"确定",confirmButtonClass:"hint-btn",showClose:!1,callback:function(e){t.$refs.myVideo.currentTime=t.videoData.currentTime,t.operateVideo(),t.openPauseTimer()}})},timeupdate:function(t){this.studyTime.currentTime=t.target.currentTime,this.studyTime.duration=t.target.duration?t.target.duration:0},operateVideo:function(){if(!this.src)return this.$message({message:"暂无视频资源，请查看其他视频！"}),!1;this.$refs.myVideo.paused?(this.$refs.myVideo.play(),this.videoState=!0):(this.$refs.myVideo.pause(),this.videoState=!1)}},watch:{videoData:function(t,e){var a=t.currentTime,i=t.duration;a&&i&&a<i&&this.hintOperate()}}},d=p,h=(a("0941"),a("2877")),m=Object(h["a"])(d,c,u,!1,null,null,null),f=m.exports,y=a("fc78"),v=a.n(y),g=a("40b9"),P=a.n(g),E={name:"PopupContent",props:{popupData:{type:String,default:""}},components:{Video:f},data:function(){return{name:"",id:null,alarmNum:0,options:{xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[820,932,901,934,1290,1330,1320],type:"line",smooth:!0}]},flvPlayer:null,palyer:null}},computed:{},watch:{},created:function(){},mounted:function(){this.initMpegts(),console.log("接收",this.popupData)},methods:(i={handleClick:function(){alert(this.alarmNum)},initEchats:function(){var t=document.getElementById("echarts"),e=s.a.init(t);this.options&&e.setOption(this.options)},initFlv:function(){var t=this;if(v.a.isSupported()){var e=document.getElementById("videoElement");this.flvPlayer=v.a.createPlayer({type:"flv",isLive:!0,hasAudio:!1,url:"http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv"}),this.flvPlayer.attachMediaElement(e),this.flvPlayer.load();var a=this.flvPlayer.play();void 0!==a&&a.then((function(e){console.log("播放",e),t.flvPlayer.play()})).catch((function(e){console.log("暂停",e),t.flvPlayer.pause(),t.flvPlayer.unload(),t.flvPlayer.detachMediaElement(),t.flvPlayer.destroy(),t.flvPlayer=null,t.initFlv()}))}},play:function(){},initMpegts:function(){var t=this;if(P.a.getFeatureList().mseLivePlayback){var e=document.getElementById("videoElement");this.flvPlayer=P.a.createPlayer({type:"flv",isLive:!0,url:this.popupData}),this.flvPlayer.attachMediaElement(e),this.flvPlayer.load(),this.flvPlayer.play();var a=this.flvPlayer.play();void 0!==a&&a.then((function(t){console.log("播放",t)})).catch((function(e){console.log("暂停",e),t.flvPlayer.pause(),t.flvPlayer.unload(),t.flvPlayer.detachMediaElement(),t.flvPlayer.destroy(),t.flvPlayer=null,t.initFlv()}))}},initPlayer:function(){this.player=new WebMediaPlayer("","WebMediaPlayer",this.callbackFunc,{cbUserPtr:this,decodeType:"auto",height:!0})},callbackFunc:function(t,e){"playbackTime"===t||"ended"===t&&console.log("播放结束"),console.log("Callback "+t+":  "+e)},handlePlay:function(){var t="http://192.168.1.222:8080/hdl/34020000001110000002/34020000001310000003.flv";this.player&&(this.player.destroy(),this.initPlayer(),this.player.play(t,1,0))}},Object(l["a"])(i,"handleClick",(function(t){"stop"===t&&this.player.stop()})),Object(l["a"])(i,"initplayer",(function(){this.player&&(this.player.destroy(),this.player=null);this.player=new TcPlayer("tcplayer",{m3u8:this.popupData,flv:this.popupData,autoplay:!0,width:"100%",height:"180",wording:{2:"未直播",2032:"未直播",2048:"未直播"},listener:function(t){}})})),i)},T=E,A=(a("1e5b"),Object(h["a"])(T,n,o,!1,null,"dd828c76",null));e["a"]=A.exports},"1e5b":function(t,e,a){"use strict";a("91d3")},"3e33":function(t,e,a){},"4f0d":function(t,e,a){"use strict";a("3e33")},"66c4":function(t,e,a){},"91d3":function(t,e,a){},c5d4:function(t,e){t.exports="data:image/png;base64,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"},c692:function(t,e,a){},cc7b:function(t,e,a){"use strict";a("66c4")},e41c:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vue-leaflet-container"},[a("l-map",{ref:"map",staticStyle:{width:"100%",height:"94vh"},attrs:{id:"lmap",zoom:t.zoom,center:t.center}},[a("l-tile-layer",{attrs:{url:t.url,attribution:t.attribution}}),t._l(t.markers,(function(e,i){return[a("l-marker",{key:i,attrs:{icon:t.defaultIcon,"lat-lng":[e.lat,e.lng]},on:{click:function(a){return t.handleMarkerClick(e)}}},[a("l-popup",{attrs:{content:t.cardTemplate[0]+e.id+t.cardTemplate[1],options:t.popupOptions}})],1)]}))],2)],1)},n=[],o=(a("d81d"),a("b0c0"),a("e11e")),l=a.n(o),r=a("2b0e"),s=a("2699"),c=a("a40a"),u=a("4e2b"),p=a("f60f"),d=a("ca9f"),h=a.n(d),m=a("584d"),f=a.n(m),y=a("e2b9"),v=a.n(y),g=a("1757"),P={name:"LeafletC",components:{LMap:s["a"],LTileLayer:c["a"],LMarker:u["a"],LPopup:p["a"],"v-marker-cluster":h.a,Pane:g["a"]},data:function(){return{zoom:5,center:[39.90553,116.391305],url:"https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",attribution:"&copy; <a href='http://osm.org/copyrighte'>OpenStreetMap</a> contributors",markers:[],defaultIcon:l.a.icon({iconUrl:f.a,iconSize:[26,42],iconAnchor:[13,42],shadowUrl:v.a,shadowSize:[41,41],shadowAnchor:[13,41]}),cardTemplate:['<div style="width: 300px; height: 240px;" id="pane_','" />'],popupOptions:{className:"mypopup"},pane:null,stationAlarmNum:{1:10,2:8,3:12}}},created:function(){},mounted:function(){this.setMarkers(),console.log("===================================="),console.log(123,this.$refs.map),console.log("====================================");var t=this;this.$refs.map.mapObject.on("popupopen",(function(e){console.log("监听弹窗"),setTimeout((function(){t.pane.$mount("#pane_"+t.pane.id)}),200)}))},methods:{setMarkers:function(){var t=this;this.$nextTick((function(){var e=[{id:1,name:"测试站点1",lat:39.90553,lng:116.391305,data:"http://192.168.1.71:8080/hdl/34020000001110000002/34020000001310000003.flv"},{id:2,name:"测试站点2",lat:40.90553,lng:116.393305,data:"http://192.168.1.71:8080/hls/34020000001110000002/34020000001310000003.m3u8"},{id:3,name:"测试站点3",lat:41.90553,lng:116.395305}];t.markers=e}))},handleMarkerClick:function(t){console.log("点击",t),null!=this.pane&&(console.log("销毁弹窗"),this.pane.$destroy(),this.pane=null);var e=r["default"].extend(g["a"]);this.pane=new e({propsData:{popupData:t.data}}),this.pane.alarmNum=this.stationAlarmNum[t.id],this.pane.name=t.name,this.pane.id=t.id}}},E=P,T=(a("4f0d"),a("cc7b"),a("2877")),A=Object(T["a"])(E,i,n,!1,null,"939d33ee",null);e["default"]=A.exports}}]);