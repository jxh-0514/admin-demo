(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8ea68be0"],{"10d9":function(t,e,n){},"191b":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"chart",staticClass:"chart"})},a=[],r=n("313e"),o=n.n(r),s=n("20ca"),c={name:"LineChart",props:{},data:function(){return{chartInstance:null,resizeHandler:null}},mounted:function(){var t=this;this.initChart(),this.resizeHandler=this.resizeChart,window.addEventListener("resize",(function(){t.resizeChart()}))},beforeDestroy:function(){window.removeEventListener("resize",this.resizeHandler),this.chartInstance&&this.chartInstance.dispose()},methods:{initChart:function(){var t=this;this.chartInstance=o.a.init(this.$refs.chart),console.log("初始化",this.chartInstance),this.chartInstance.showLoading({text:"Loading...",color:"#c23531",textColor:"#fff",maskColor:"rgba(0, 0, 0, 0.5)",zlevel:0}),setTimeout((function(){t.updateChart(),t.chartInstance.hideLoading()}),2e3)},updateChart:function(){var t={title:{text:"大屏数据展示 - 折线图",left:"center",textStyle:{color:"#fff",fontSize:24}},tooltip:{trigger:"axis"},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLine:{lineStyle:{color:"#fff"}}},yAxis:{type:"value",axisLine:{lineStyle:{color:"#fff"}},splitLine:{lineStyle:{color:"#555"}}},series:[{name:"Sales",type:"line",data:[120,200,150,80,70,110,130],itemStyle:{color:"#3398DB"}}],backgroundColor:"#2c343c"};this.chartInstance.setOption(t)},resizeChart:Object(s["a"])((function(){this.chartInstance&&(console.log("resize",this.chartInstance.id),this.chartInstance.resize())}),500)}},l=c,u=(n("a64f"),n("2877")),h=Object(u["a"])(l,i,a,!1,null,"28b331b6",null);e["a"]=h.exports},"20ca":function(t,e,n){"use strict";function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=null;return function(){var i=this,a=arguments;n&&clearTimeout(n),n=setTimeout((function(){t.apply(i,a)}),e)}}n.d(e,"a",(function(){return i}))},"4ae6":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("GridLayout",{ref:"gridlayout",attrs:{layout:t.layout,"col-num":12,"row-height":30,"is-draggable":t.draggable,"is-resizable":t.resizable,responsive:t.responsive,"vertical-compact":!0,"use-css-transforms":!0},on:{"layout-ready":t.layoutReadyEvent,"update:layout":function(e){t.layout=e}}},t._l(t.layout,(function(e){return n("GridItem",{key:e.id,attrs:{static:e.static,x:e.x,y:e.y,w:e.w,h:e.h,i:e.i},on:{moved:t.movedEvent}},[n(e.i,{ref:"componentRef_"+e.i,refInFor:!0,tag:"component",attrs:{item:e}})],1)})),1)],1)},a=[],r=(n("d3b7"),n("159b"),n("7be8")),o=n("ecf5"),s=n("191b"),c={name:"index",components:{GridLayout:r["GridLayout"],GridItem:r["GridItem"],BarChart:o["a"],LineChart:s["a"]},props:{},data:function(){return{layout:[],draggable:!1,resizable:!1,responsive:!1,maintenanceVisible:!1,maintenanceItem:{},updateVisible:!1,updateItem:{}}},computed:{},watch:{},beforeDestroy:function(){},created:function(){var t=this.$store.getters.layout;t&&(this.layout=t)},mounted:function(){},methods:{layoutReadyEvent:function(t){var e=this;setTimeout((function(){e.layout.length>0&&e.layout.forEach((function(t){var n="componentRef_"+t.i;console.log("ref---",n,e.$refs[n][0]),e.$refs[n][0].resizeChart()})),console.log("当完成mount中所有操作时生成的事件",t)}),1e3)},movedEvent:function(t){console.log("移动时的事件",t)}}},l=c,u=(n("56cc"),n("2877")),h=Object(u["a"])(l,i,a,!1,null,"1acc2b58",null);e["default"]=h.exports},"56cc":function(t,e,n){"use strict";n("10d9")},"605d6":function(t,e,n){"use strict";n("e953")},9204:function(t,e,n){},a64f:function(t,e,n){"use strict";n("9204")},e953:function(t,e,n){},ecf5:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"chart",staticClass:"chart"})},a=[],r=n("313e"),o=n.n(r),s=n("20ca"),c={name:"BarChart",props:{},data:function(){return{chartInstance:null,resizeHandler:null}},mounted:function(){var t=this;this.initChart(),this.resizeHandler=this.resizeChart,window.addEventListener("resize",(function(){t.resizeChart()}))},beforeDestroy:function(){window.removeEventListener("resize",this.resizeHandler),this.chartInstance&&this.chartInstance.dispose()},methods:{initChart:function(){var t=this;this.chartInstance=o.a.init(this.$refs.chart),console.log("初始化",this.chartInstance),this.chartInstance.showLoading({text:"Loading...",color:"#c23531",textColor:"#fff",maskColor:"rgba(0, 0, 0, 0.5)",zlevel:0}),setTimeout((function(){t.updateChart(),t.chartInstance.hideLoading()}),2e3)},updateChart:function(){var t={title:{text:"大屏数据展示 - 柱状图",left:"center",textStyle:{color:"#fff",fontSize:24}},tooltip:{trigger:"axis"},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLine:{lineStyle:{color:"#fff"}}},yAxis:{type:"value",axisLine:{lineStyle:{color:"#fff"}},splitLine:{lineStyle:{color:"#555"}}},series:[{name:"Sales",type:"bar",data:[120,200,150,80,70,110,130],itemStyle:{color:"#3398DB"}}],backgroundColor:"#2c343c"};this.chartInstance.setOption(t)},resizeChart:Object(s["a"])((function(){this.chartInstance&&(console.log("resize",this.chartInstance.id),this.chartInstance.resize())}),500)}},l=c,u=(n("605d6"),n("2877")),h=Object(u["a"])(l,i,a,!1,null,"3aa2cb2c",null);e["a"]=h.exports}}]);