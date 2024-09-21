<!-- 拖拽大屏  编辑页面 -->
<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="6" :xl="4" :lg="6">
				<div v-for="(component, index) in components" :key="index" class="component-item">
					<div @dragstart="onDragStart(component, $event)" @dragend="onDragEnd(component, $event)" class="draggable-component" draggable="true">
						<img :src="component.previewImage" alt="Preview" class="preview-image" />
						<p>{{ component.name }}</p>
					</div>
				</div>
			</el-col>
			<el-col :span="18" :xl="20" :lg="18">
				<div id="content">
					<grid-layout ref="gridlayout" :layout.sync="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :vertical-compact="true" :use-css-transforms="true" @layout-ready="layoutReadyEvent">
						<grid-item :key="item.id" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @resized="resizedEvent(item)">
							<component :ref="`componentRef_${item.n}_${item.i}`" :is="item.n" :item="item"></component>
						</grid-item>
					</grid-layout>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
import TestEcharts from "./components/testEcharts";
// import LineChart from "./components/lineChart.vue";

let mouseXY = { x: null, y: null };
let DragPos = { x: null, y: null, w: 4, h: 3, i: null, n: null };
export default {
	name: "editScreen",
	components: {
		GridLayout,
		GridItem,
		BarChart: TestEcharts,
		LineChart: TestEcharts,
		PieChart: TestEcharts,
		// LineChart,
	},
	props: {},
	data() {
		return {
			layout: [],
			// 左侧可供拖拽的组件列表
			components: [
				{
					name: "BarChart",
					previewImage: "https://echarts.apache.org/examples/data/thumb/bar-simple.webp?_v_=1724900876815", // 静态预览图
					component: "BarChart",
					chartType: "bar",
				},
				{
					name: "LineChart",
					previewImage: "https://echarts.apache.org/examples/data/thumb/line-simple.webp?_v_=1724900876815",
					component: "LineChart",
					chartType: "line",
				},
				{
					name: "PieChart",
					previewImage: "https://echarts.apache.org/examples/data/thumb/pie-simple.webp?_v_=1726707777817",
					component: "PieChart",
					chartType: "pie",
				},
			],
			contentEl: null, // 用来存储 content DOM 元素的引用
			draggedComponent: null, // 当前拖拽的组件信息
		};
	},

	computed: {
		colNum() {
			return 12; // 可以根据需要动态计算
		},
	},

	watch: {},

	beforeDestroy() {
		document.removeEventListener("dragover", this.updateMousePosition, false); // 移除事件监听器
		window.removeEventListener("resize", this.updateContentElement, false);
		this.$store.dispatch("dragScreen/setLayout", this.layout); // 离开页面的时候保存布局到vuex中
	},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		let layout = this.$store.getters.layout; // 读取编辑大屏中的配置
		if (layout) {
			this.layout = layout;
		}
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.updateContentElement();
		document.addEventListener("dragover", this.updateMousePosition, false); // 监听 dragover 事件来更新鼠标位置
		window.addEventListener("resize", this.updateContentElement, false); // 监听窗口大小变化
	},

	methods: {
		// 获取并缓存 content 元素
		updateContentElement() {
			this.contentEl = document.getElementById("content");
		},
		// 更新鼠标位置
		updateMousePosition(e) {
			mouseXY.x = e.clientX;
			mouseXY.y = e.clientY;
		},
		// 判断鼠标是否在展示区内
		isMouseInGrid() {
			const parentRect = this.contentEl.getBoundingClientRect();
			return mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom;
		},
		onDragStart(component, event) {
			this.draggedComponent = component; // 记录当前拖拽的组件
		},
		// 拖拽结束
		onDragEnd(component, event) {
			if (this.isMouseInGrid()) {
				const { x, y } = this.calculatePosition(event);
				console.log("拖拽结束---", component, event, x, y);
				const uniqueId = Date.now().toString();

				// 将新组件添加到布局中
				this.layout.push({
					x,
					y,
					w: 4, // 默认宽度
					h: 3, // 默认高度
					i: uniqueId, // 元素唯一id
					n: component.name,
					config: component,
				});
			}

			this.draggedComponent = null; // 清除拖拽的组件
		},
		// 计算组件在网格中的位置
		calculatePosition(event) {
			// 获取容器的位置信息
			const containerRect = this.contentEl.getBoundingClientRect();
			// 计算鼠标在展示区的相对位置
			const mouseX = event.clientX - containerRect.left;
			const mouseY = event.clientY - containerRect.top;

			// 根据容器的宽高比，计算拖拽时的位置
			const newX = Math.floor((mouseX / containerRect.width) * (this.colNum || 12)); // 根据容器宽度计算 x 坐标
			const newY = Math.floor((mouseY / containerRect.height) * (this.colNum || 12)); // 根据容器高度计算 y 坐标
			return { x: newX, y: newY }; // 返回计算的坐标
		},
		// 调整大小后的事件
		resizedEvent(item) {
			console.log("调整大小---", item.n, this.layout);
			this.$refs[`componentRef_${item.n}_${item.i}`][0].resizeChart();
		},
		layoutReadyEvent() {
			this.$nextTick(() => {
				this.layout.length > 0 &&
					this.layout.forEach((item) => {
						this.$refs[`componentRef_${item.n}_${item.i}`][0].resizeChart();
					});
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.component-item {
	margin-bottom: 15px;
}

.draggable-component {
	cursor: grab;
	text-align: center;
	padding: 10px;
	background-color: #f5f5f5;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.preview-image {
	// width: 100px;
	height: 100px;
	object-fit: cover;
}

.vue-grid-layout {
	background: #eee;
	width: 99%;
	height: 90vh !important;
}

.vue-grid-item {
	touch-action: none !important;
}
</style>
