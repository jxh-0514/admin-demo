(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92b78750"],{1260:function(t,e,n){},"20ca":function(t,e,n){"use strict";function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=null;return function(){var a=this,i=arguments;n&&clearTimeout(n),n=setTimeout((function(){t.apply(a,i)}),e)}}n.d(e,"a",(function(){return a}))},"26a6":function(t,e,n){"use strict";n("566a")},"4ae6":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("GridLayout",{ref:"gridlayout",attrs:{layout:t.layout,"col-num":12,"row-height":30,"is-draggable":t.draggable,"is-resizable":t.resizable,responsive:t.responsive,"vertical-compact":!0,"use-css-transforms":!0},on:{"layout-ready":t.layoutReadyEvent,"update:layout":function(e){t.layout=e}}},t._l(t.layout,(function(t){return n("GridItem",{key:t.id,attrs:{static:t.static,x:t.x,y:t.y,w:t.w,h:t.h,i:t.i}},[n(t.n,{ref:"componentRef_"+t.n+"_"+t.i,refInFor:!0,tag:"component",attrs:{item:t}})],1)})),1)],1)},i=[],r=(n("d3b7"),n("159b"),n("99af"),n("7be8")),o=n("ecf5"),s={name:"index",components:{GridLayout:r["GridLayout"],GridItem:r["GridItem"],BarChart:o["a"],LineChart:o["a"],PieChart:o["a"]},props:{},data:function(){return{layout:[],draggable:!1,resizable:!1,responsive:!1,maintenanceVisible:!1,maintenanceItem:{},updateVisible:!1,updateItem:{}}},computed:{},watch:{},beforeDestroy:function(){},created:function(){var t=this.$store.getters.layout;t&&(this.layout=t)},mounted:function(){},methods:{layoutReadyEvent:function(t){var e=this;this.layout.length>0&&this.layout.forEach((function(t){var n="componentRef_".concat(t.n,"_").concat(t.i);console.log("ref---",n,e.$refs[n][0]),e.$refs[n][0].resizeChart()})),console.log("当完成mount中所有操作时生成的事件",t)}}},c=s,u=(n("eb15"),n("2877")),l=Object(u["a"])(c,a,i,!1,null,"bade544c",null);e["default"]=l.exports},"566a":function(t,e,n){},eb15:function(t,e,n){"use strict";n("1260")},ecf5:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"chart",staticClass:"chart"})},i=[],r=n("313e"),o=n.n(r),s=n("20ca"),c={name:"BarChart",props:{item:{type:Object,default:function(){return{x:0,y:0,w:2,h:2,i:"BarChart",config:{name:"BarChart",previewImage:"https://echarts.apache.org/examples/data/thumb/bar-simple.webp?_v_=1724900876815",component:"BarChart",chartType:"bar"}}}}},data:function(){return{chartInstance:null,resizeHandler:null}},mounted:function(){var t=this;setTimeout((function(){t.initChart(),t.resizeHandler=t.resizeChart,window.addEventListener("resize",(function(){t.resizeChart()}))}),0)},beforeDestroy:function(){window.removeEventListener("resize",this.resizeHandler),this.chartInstance&&this.chartInstance.dispose()},methods:{initChart:function(){var t=this;this.chartInstance=o.a.init(this.$refs.chart),console.log("初始化",this.chartInstance),this.chartInstance.showLoading({text:"Loading...",color:"#c23531",textColor:"#fff",maskColor:"rgba(0, 0, 0, 0.5)",zlevel:0}),setTimeout((function(){t.updateChart(),t.chartInstance.hideLoading()}),2e3)},updateChart:function(){var t={title:{text:"大屏数据展示 - ".concat(this.item.n),left:"center",textStyle:{color:"#fff",fontSize:24}},tooltip:{trigger:"axis"},xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisLine:{lineStyle:{color:"#fff"}}},yAxis:{type:"value",axisLine:{lineStyle:{color:"#fff"}},splitLine:{lineStyle:{color:"#555"}}},series:[{name:"Sales",type:this.item.config.chartType||"bar",data:[120,200,150,80,70,110,130]}],backgroundColor:"#2c343c"};this.chartInstance.setOption(t)},resizeChart:Object(s["a"])((function(){this.chartInstance&&(console.log("resize",this.chartInstance.id),this.chartInstance.resize())}),500)}},u=c,l=(n("26a6"),n("2877")),h=Object(l["a"])(u,a,i,!1,null,"07a95b30",null);e["a"]=h.exports}}]);