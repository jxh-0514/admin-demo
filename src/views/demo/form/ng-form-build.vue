<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2024-04-08 09:13:27
 * @LastEditors: 杭
 * @LastEditTime: 2024-04-08 09:20:38
-->
<!-- ng-form-element 表单查看/填报组件 -->
<template>
	<div>
		<ng-form-build :formTemplate="formTemplate" :models="models" />
	</div>
</template>

<script>
export default {
	name: "",
	components: {},
	props: {},
	data() {
		return {
			models: {},
			formTemplate: {},
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.formTemplate = require("./test1.json");
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},

	methods: {},
};
</script>
<style lang="scss" scoped></style>
