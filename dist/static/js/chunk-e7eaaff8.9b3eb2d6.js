(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e7eaaff8"],{"8a07":function(t,i,o){"use strict";o("a491")},a491:function(t,i,o){},d11d:function(t,i,o){"use strict";o.r(i);var e=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",[o("el-button",{on:{click:function(i){t.dialogVisible=!0}}},[t._v("点击打开 Dialog")]),o("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"60%","before-close":t.handleClose},on:{"update:visible":function(i){t.dialogVisible=i}}},[o("VueEditor",{staticClass:"rich",model:{value:t.content,callback:function(i){t.content=i},expression:"content"}}),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(i){t.dialogVisible=!1}}},[t._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(i){t.dialogVisible=!1}}},[t._v("确 定")])],1)],1),o("h1",[t._v("实时预览")]),o("div",{domProps:{innerHTML:t._s(t.content)}})],1)},n=[],l=o("5873"),a={components:{VueEditor:l["a"]},data:function(){return{content:"",dialogVisible:!1}},methods:{handleClose:function(t){this.dialogVisible=!1}}},s=a,c=(o("8a07"),o("2877")),d=Object(c["a"])(s,e,n,!1,null,"6fcfe3ad",null);i["default"]=d.exports}}]);