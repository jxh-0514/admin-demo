(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ffa27cd2"],{"0146":function(e,t,i){},"29f4":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"edit_container"},[i("tinymce-editor",{ref:"myTinymce",attrs:{tinymceHtml:e.content}})],1)},a=[],l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tinymce-container"},[i("editor",{attrs:{id:"tinymce",init:e.init},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)},o=[],s=(i("a9e3"),i("e562")),c=i.n(s),r=i("ca72"),u=(i("030f"),i("46c3"),i("4ea8"),i("4237"),i("64d8"),i("07d1"),i("84ec8"),i("9434"),{name:"MyTinymce",props:{tinymceHtml:"",tinymceHeight:{type:Number,default:500}},components:{Editor:r["a"]},data:function(){return{value:this.tinymceHtml,init:{selector:"#tinymce",language_url:"/tinymce/zh_CN.js",language:"zh_CN",skin_url:"/tinymce/skins/ui/oxide",height:this.tinymceHeight,plugins:"image link code table lists wordcount",toolbar:"fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen",browser_spellcheck:!0,branding:!1,elementpath:!1,statusbar:!1,paste_data_images:!0,menubar:!1,file_picker_types:"image",images_upload_credentials:!0,fontsize_formats:"14px 16px 18px 20px 24px 26px 28px 30px 32px 36px",font_formats:"微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times",images_upload_handler:function(e,t,i){var n=new FormData;n.append("image",e.blob()),uploadImg(n).then((function(e){console.log(e),t("https://qnsjk.huabeisky.com/"+e.data)})).catch((function(e){i("error")}))}}}},watch:{tinymceHtml:function(e,t){this.value=e}},computed:{},created:function(){},mounted:function(){c.a.init({})},methods:{}}),m=u,f=i("2877"),d=Object(f["a"])(m,l,o,!1,null,"1f241a04",null),p=d.exports,g={components:{TinymceEditor:p},data:function(){return{content:"",dialogTitle:"富文本",dialogVisible:!1}},methods:{handleClose:function(e){this.dialogVisible=!1},saveArticle:function(){},editorDialogClose:function(){this.dialogVisible=!1}}},h=g,b=(i("8e3f"),Object(f["a"])(h,n,a,!1,null,null,null));t["default"]=b.exports},"8e3f":function(e,t,i){"use strict";i("0146")}}]);