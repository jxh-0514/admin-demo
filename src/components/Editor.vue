<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2024-03-25 14:21:42
 * @LastEditors: 杭
 * @LastEditTime: 2024-06-14 16:07:10
-->
<template>
	<div class="tinymce-container">
		<!-- id="tinymce" -->
		<editor v-model="value" :init="init"></editor>
	</div>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/skins/ui/oxide/skin.min.css";
// 引入icon解决组件icon无法显示的问题
import "tinymce/icons/default/icons.min.js";
import "tinymce/plugins/image"; //引入图片插件
import "tinymce/plugins/link"; //引入超链接插件
import "tinymce/plugins/code"; // 引入代码插件
import "tinymce/plugins/table"; //引入表格插件
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/paste"; //拖拽图片进富文本
// import "tinymce/plugins/indent2em"; //首行缩进 github actions打包会报错
// import { uploadImg } from "@/api/common";
//下面的插件是自带的,不需要引入
// import "tinymce/plugins/contextmenu";
// import "tinymce/plugins/colorpicker";
// import "tinymce/plugins/textcolor";
export default {
	name: "MyTinymce",
	props: {
		tinymceHtml: "",
		tinymceHeight: {
			type: Number,
			default: 500,
		},
	},
	components: {
		Editor,
	},
	data() {
		return {
			value: this.tinymceHtml, //父组件通过ref拿到该组件的值
			init: {
				// selector: "#tinymce",
				language_url: "/tinymce/zh_CN.js",
				language: "zh_CN",
				skin_url: "/tinymce/skins/ui/oxide", //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
				height: this.tinymceHeight,
				plugins: "image link code table lists wordcount paste", //引入插件
				toolbar: "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen", //工具栏
				browser_spellcheck: true, // 拼写检查
				branding: false, // 去水印
				elementpath: false, //禁用编辑器底部的状态栏
				statusbar: false, // 隐藏编辑器底部的状态栏
				paste_data_images: true, // 允许粘贴图像
				menubar: true, // 隐藏最上方menu
				paste_data_images: true, //开启图片拖拽上传

				file_picker_types: "image",
				images_upload_credentials: true,
				fontsize_formats: "12px 14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
				font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
				/**
				 * 下面方法是为tinymce添加自定义插入图片按钮
				 * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
				 */
				// 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
				images_upload_handler: async function (blobInfo, success, failure) {
					let formdata = new FormData();
					formdata.append("file", blobInfo.blob(), blobInfo.filename());
					await uploadImg(formdata)
						.then((res) => {
							console.log(res);
							// success("https://qnsjk.huabeisky.com/" + res.data);
						})
						.catch((res) => {
							failure("error");
						});
				},
			},
		};
	},
	watch: {
		tinymceHtml(newV, oldV) {
			this.value = newV;
		},
	},
	computed: {},
	beforeDestroy() {
		// 组件销毁时，要销毁编辑器
		tinymce.remove(`${this.uniqueId}`);
	},
	created() {},
	mounted() {
		// 使用不用的id，避免与现有dom冲突。解决多个tinymce编辑器冲突问题
		this.uniqueId = `#tinymce-${Date.now()}`;
		tinymce
			.init({
				selector: this.uniqueId,
			})
			.then((res) => {
				this.$emit("on-ready");
			});
	},
	methods: {},
};
</script>
<style scoped></style>
