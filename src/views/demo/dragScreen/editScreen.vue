<!-- 拖拽大屏  编辑页面 -->
<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="6" :xl="4" :lg="6">
				<div v-for="(component, index) in components" :key="index" class="component-item">
					<div @drag="onDragStart(component, $event)" @dragend="onDragEnd(component)" class="draggable-component" draggable="true">
						<img :src="component.previewImage" alt="Preview" class="preview-image" />
						<p>{{ component.name }}</p>
					</div>
				</div>
			</el-col>
			<el-col :span="18" :xl="20" :lg="18">
				<div id="content">
					<grid-layout ref="gridlayout" :layout.sync="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :vertical-compact="true" :use-css-transforms="true" @layout-ready="layoutReadyEvent">
						<grid-item :key="item.id" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @resized="resizedEvent">
							<component :ref="`componentRef_${item.i}`" :is="item.i" :item="item"></component>
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
import LineChart from "./components/lineChart.vue";

let mouseXY = { x: null, y: null };
let DragPos = { x: null, y: null, w: 4, h: 3, i: null };
export default {
	name: "editScreen",
	components: {
		GridLayout,
		GridItem,
		BarChart: TestEcharts,
		LineChart,
		// LineChart: TestEcharts,
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
			],
			// mouseXY: { x: null, y: null }, // 鼠标当前位置
			// DragPos: { x: null, y: null, w: 2, h: 2, i: null }, // 拖拽组件的位置和大小
			contentEl: null, // 用来存储 content DOM 元素的引用
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {
		// 移除事件监听器
		document.removeEventListener("dragover", this.updateMousePosition, false);
		window.removeEventListener("resize", this.updateContentElement, false);
		// 离开页面的时候保存布局到vuex中
		this.$store.dispatch("dragScreen/setLayout", this.layout);
	},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		// 读取编辑大屏中的配置
		let layout = this.$store.getters.layout;
		if (layout) {
			this.layout = layout;
		}
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.updateContentElement();
		// 监听 dragover 事件来更新鼠标位置
		document.addEventListener("dragover", this.updateMousePosition, false);
		// 监听窗口大小变化
		window.addEventListener("resize", this.updateContentElement, false);
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
			const containerRect = this.contentEl.getBoundingClientRect();
			// 移除内容区中已经存在的相同组件
			// this.layout = this.layout.filter((item) => item.i !== component.name);
			const oldIndex = this.layout.findIndex((item) => item.i === component.name);
			if (oldIndex !== -1) {
				console.log("有相同组件---", oldIndex);
				this.layout.splice(oldIndex, 1);
			}

			// 计算鼠标在展示区的相对位置
			const mouseX = event.clientX - containerRect.left;
			const mouseY = event.clientY - containerRect.top;

			// 展示区中没有相同的占位符时，才添加新的占位符
			if (this.isMouseInGrid() && !this.layout.some((item) => item.i === component.name)) {
				// 使用鼠标位置计算 x 和 y
				const newX = Math.floor((mouseX / containerRect.width) * (this.colNum || 12)); // 根据容器宽度计算 x 坐标
				const newY = Math.floor((mouseY / containerRect.height) * (this.colNum || 12)); // 根据容器高度计算 y 坐标
				this.layout.push({
					x: newX,
					y: newY,
					w: 4, // 默认宽度
					h: 3, // 默认高度
					i: component.name,
					config: component,
				});
			}

			const index = this.layout.findIndex((item) => item.i === component.name);
			if (index !== -1) {
				// 隐藏新添加的占位符组件，避免布局错乱
				try {
					this.$refs.gridlayout.$children[index].$refs.item.style.display = "none";
				} catch (err) {}

				// 使用缓存的 DOM 元素 contentEl 计算位置
				this.$refs.gridlayout.$children[index].dragging = {
					top: mouseXY.y - this.contentEl.getBoundingClientRect().top,
					left: mouseXY.x - this.contentEl.getBoundingClientRect().left,
				};

				// 计算新位置
				const new_pos = this.$refs.gridlayout.$children[index].calcXY(mouseXY.y - this.contentEl.getBoundingClientRect().top, mouseXY.x - this.contentEl.getBoundingClientRect().left);

				if (this.isMouseInGrid()) {
					// 触发拖拽开始事件
					this.$refs.gridlayout.dragEvent("dragstart", component.name, new_pos.x, new_pos.y, 2, 2);

					// 记录拖拽位置
					DragPos = {
						i: component.name,
						x: this.layout[index].x,
						y: this.layout[index].y,
						config: component,
					};
				} else {
					// 如果鼠标移出展示区，结束拖拽并移除占位符
					DragPos = { i: null, x: null, y: null, w: 2, h: 2 };
					this.$refs.gridlayout.dragEvent("dragend", component.name, new_pos.x, new_pos.y, 2, 2);
					this.layout.splice(index, 1); // 删除拖拽出的占位符
				}
			}
		},
		// 拖拽结束
		onDragEnd(component) {
			if (this.isMouseInGrid()) {
				const { x, y, w, h, i, config } = DragPos;
				// 在布局中添加实际组件
				// 确保没有重复添加相同的组件
				if (!this.layout.some((item) => item.i === i)) {
					this.layout.push({ x, y, w, h, i, config });
					// this.$refs.gridlayout.dragEvent("dragend", i, x, y, w, h);
				}
				// 显示新添加的组件
				try {
					this.$refs.gridlayout.$children[this.layout.length - 1].$refs.item.style.display = "block";
				} catch (err) {}

				// this.layout.forEach((item) => {
				// 	// this.$refs[`componentRef_${item.i}`][0].resizeChart();
				// 	this.$refs[`componentRef_${item.i}`][0].updateChart();
				// });
				this.$refs[`componentRef_${i}`][0].resizeChart();
				console.log("拖拽结束---", this.layout);
			}
		},
		// 调整大小后的事件
		resizedEvent(i) {
			console.log("调整大小---", i, this.layout);
			this.$refs[`componentRef_${i}`][0].resizeChart();
		},
		layoutReadyEvent() {
			this.$nextTick(() => {
				this.layout.length > 0 &&
					this.layout.forEach((item) => {
						this.$refs[`componentRef_${item.i}`][0].resizeChart();
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
