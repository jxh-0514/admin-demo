(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-369034bd"],{4828:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"100%",height:"100vh",border:"1px solid #ccc"},attrs:{id:"app"}},[i("drag-box",{staticStyle:{width:"100%",height:"100%"}},[i("drag-item",{staticClass:"itemA",staticStyle:{width:"20%"}},[t._v("item1")]),i("drag-item",{staticClass:"itemB"},[t._v("item2")]),i("drag-item",{staticClass:"itemC",staticStyle:{width:"20%"},attrs:{resizeShow:!1}},[t._v("item3")])],1)],1)},s=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"dragBox",staticStyle:{display:"flex",width:"100%",height:"100%"}},[t._t("default")],2)},r=[],l={data:function(){return{}},mounted:function(){this.setDragItemFlex(),this.dragControllerDiv()},methods:{setDragItemFlex:function(){for(var t=this.$refs.dragBox,e=t.children.length,i=0;i<e;i++){var n=t.children[i];n.style.width||(n.style.flex=1)}},dragControllerDiv:function(){for(var t=document.getElementsByClassName("resize"),e=0;e<t.length;e++)t[e].addEventListener("mousedown",this.onMouseDown)},onMouseDown:function(t){this.resizeBox=t.target,this.currentBox=this.resizeBox.parentNode,this.rightBox=this.getNextElement(this.currentBox),this.rightBox&&(this.curLen=this.currentBox.clientWidth,this.otherBoxWidth=this.$refs.dragBox.clientWidth-this.currentBox.clientWidth-this.rightBox.clientWidth,this.resizeBox.style.background="#818181",this.startX=t.clientX,document.addEventListener("mousemove",this.onMousemove),document.addEventListener("mouseup",this.onMouseup))},getNextElement:function(t){if(t.nextElementSibling)return t.nextElementSibling;var e=t.nextSibling;while(e&&1!==e.nodeType)e=e.nextSibling;return e},onMousemove:function(t){var e=t.clientX,i=e-this.startX,n=this.curLen+i,s=this.$refs.dragBox.clientWidth-n-this.otherBoxWidth;n<=200||s<=200||(this.currentBox.style.width=n+"px",this.resizeBox.style.left=n,this.rightBox.style.width=s+"px")},onMouseup:function(){this.resizeBox.style.background="#d6d6d6",document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mousemove",this.onMousemove)}}},a=l,h=i("2877"),c=Object(h["a"])(a,o,r,!1,null,null,null),d=c.exports,u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"container",staticClass:"d-flex",staticStyle:{"min-width":"200px",position:"relative"}},[i("div",{staticStyle:{width:"100%",height:"100%"}},[t._t("default",[t._v("默认信息")])],2),t.resizeShow?i("div",{staticClass:"resize"}):t._e()])},m=[],x={props:{resizeShow:{type:Boolean,default:!0}}},f=x,g=(i("c086"),Object(h["a"])(f,u,m,!1,null,null,null)),v=g.exports,p={name:"App",components:{DragBox:d,DragItem:v}},w=p,B=(i("6ca5"),Object(h["a"])(w,n,s,!1,null,"6a36ed88",null));e["default"]=B.exports},"6ca5":function(t,e,i){"use strict";i("a846")},"6e03":function(t,e,i){},a846:function(t,e,i){},c086:function(t,e,i){"use strict";i("6e03")}}]);