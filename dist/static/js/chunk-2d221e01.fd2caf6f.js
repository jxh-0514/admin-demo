(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221e01"],{cbe1:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("el-button",{attrs:{type:"primary"},on:{click:t.on}},[t._v("导入")]),e("el-button",{attrs:{type:"primary"},on:{click:t.off}},[t._v("导出")]),e("el-dialog",{attrs:{title:t.dialogParams.title,visible:t.dialogParams.visible,"close-on-click-modal":!1,top:"5%","custom-class":"el-dialog--width960"},on:{"update:visible":function(a){return t.$set(t.dialogParams,"visible",a)}}},[e("el-form",{ref:"data01",attrs:{inline:!1,model:t.data=t.data01.Content,rules:t.rules}},[e("div",{staticClass:"boxTitle"},[e("span",{staticClass:"warninger"},[t._v("上传文件后缀必须是(xls)，且根据模板上传，否则不能上传成功")])]),e("el-form-item",{attrs:{label:"采购详情表",prop:"MDM017402","label-width":t.dialogParams.formLabelWidth}},[e("el-upload",{attrs:{action:t.uploadParams.url,data:t.uploadParams.data,"before-upload":t.beforeUpload,"on-success":t.uploadSuccess,"file-list":t.fileList,disabled:t.uploadStatus}},[e("el-button",{attrs:{size:"small",type:"success",disabled:t.uploadStatus}},[t._v("点击上传")])],1)],1),t.uploadParams.preview?e("el-form-item",{attrs:{label:"预览",prop:"MDM017402","label-width":t.dialogParams.formLabelWidth}},[e("el-table",{staticStyle:{width:"calc(100% - 15px)"},attrs:{data:t.data01.Content.MDM017402,border:"","max-height":"240"}},[e("el-table-column",{attrs:{type:"index",width:"60"}}),t._l(t.uploadParams.colModel,(function(t,a){return e("el-table-column",{key:a,attrs:{prop:t.prop,label:t.label,width:t.width}})}))],2)],1):t._e()],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary",loading:t.submitStatus},on:{click:function(a){return t.submitForm(t.data01)}}},[t._v("确定上传")])],1)],1)],1)},s=[],l={data:function(){return{data01:{Content:{CardName:"",UserName:"",CardCode:"",MDM017402:[],OMS005301List:[],BeginTime:"",CustomerCode:"",CustomerName:"",EndTime:"",ItemCode:"",ItemName:""},Method:"Q",page:1,rows:50,sidx:"DocEntry",sord:"DESC"},data02:{Content:{CardCode:"",CardName:""}},total:0,DropdownSaler:[],selectArr:[],tableData:[],fileList:[],Loading:!1,rules:{},dialogParams:{title:"上传",visible:!1,formLabelWidth:"85px"},uploadParams:{url:"https://jsonplaceholder.typicode.com/posts/",data:{Content:""},preview:!1,colModel:[{prop:"ItemCode",label:"物料代码",width:"100"},{prop:"ItemName",label:"物料名称",width:"200"},{prop:"TaoBaoLink",label:"淘宝链接",width:"200"},{prop:"CustomerCode",label:"客户代码",width:"200"},{prop:"Remarks",label:"备注",width:"200"}]},uploadStatus:!1,submitStatus:!1}},created:function(){this.MDM017402()},methods:{on:function(){this.dialogParams.visible=!0},off:function(){this.dialogParams.visible=!0},pageChange:function(t){this.data01.page=t,this.MDM017402()},sizeChange:function(t){this.data01.rows=t,this.MDM017402()},searchClick:function(){this.MDM017402()},beforeUpload:function(t){t&&(this.uploadStatus=!0)},uploadSuccess:function(t,a){console.log("上传",t),200===t.Status?(this.$notify({type:"success",titie:"上传成功",message:"上传成功"}),this.uploadParams.preview=!0,this.data01.Content.MDM017402=JSON.parse(t.Content)):this.$notify.warning({title:"解析失败",message:t.Status+"："+t.MessageString})},MDM017402:function(){var t=this;this.$axios({method:"post",url:"https://jsonplaceholder.typicode.com/posts/",data:this.data01}).then((function(a){200===a.data.Status?a.data.Content?(t.tableData=a.data.Content.rows,t.total=a.data.Content.records):(t.tableData=[],t.total=0):(t.$notify({type:"warning",title:"找不到该数据"}),t.tableData=[])}),(function(a){t.$notify({type:"warning",title:"找不到该数据",message:a})}))},submitForm:function(t){console.log("===================================="),console.log(t),console.log("====================================")}}},i=l,n=e("2877"),r=Object(n["a"])(i,o,s,!1,null,null,null);a["default"]=r.exports}}]);