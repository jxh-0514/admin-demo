<!-- 拖拽大屏 -->
<template>
	<div>
		<GridLayout @layout-ready="layoutReadyEvent" ref="gridlayout" :layout.sync="layout" :col-num="12" :row-height="30" :is-draggable="draggable" :is-resizable="resizable" :responsive="responsive" :vertical-compact="true" :use-css-transforms="true">
			<GridItem v-for="item in layout" :key="item.id" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @moved="movedEvent">
				<component :ref="`componentRef_${item.i}`" :is="item.i" :item="item"></component>
			</GridItem>
		</GridLayout>
	</div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout"; //拖拽组件
import TestEcharts from "./components/testEcharts";
import LineChart from "./components/lineChart.vue";
export default {
	name: "index",
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
			// xy为坐标 wh对应宽高 i代表组件名称 在上方import的时候
			layout: [
				// { x: 0, y: 0, w: 4, h: 2, i: "TestEcharts" }
			],
			draggable: false,
			resizable: false,
			responsive: false,
			maintenanceVisible: false, //维护弹窗是否显示
			maintenanceItem: {}, //维护弹窗数据
			updateVisible: false, //更新弹窗是否显示
			updateItem: {}, //更新弹窗数据
		};
	},

	computed: {},

	watch: {},

	beforeDestroy() {},

	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		// 读取编辑大屏中的配置
		let layout = this.$store.getters.layout;
		if (layout) {
			this.layout = layout;
		}
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},

	methods: {
		layoutReadyEvent(newLayout) {
			setTimeout(() => {
				this.layout.length > 0 &&
					this.layout.forEach((item) => {
						const refName = "componentRef_" + item.i;
						console.log("ref---", refName, this.$refs[refName][0]);

						this.$refs[refName][0].resizeChart();
					});
				console.log("当完成mount中所有操作时生成的事件", newLayout);
			}, 1000);
		},
		movedEvent(move) {
			console.log("移动时的事件", move);
		},
	},
};
</script>
<style lang="scss" scoped>
.droppable-element {
	width: 150px;
	text-align: center;
	background: #fdd;
	border: 1px solid black;
	margin: 10px 0;
	padding: 10px;
}
.ship3 {
	margin: 22px 22px 0 22px;
	width: calc(91vw + 44px);
	height: 10vh;
	border-radius: 6px;
	background-color: #fff;
	h2 {
		margin-left: 16px;
		padding-top: 10px;
		margin-bottom: 10px;
	}
	div {
		margin-left: 70px;
		a {
			background-color: #f2f7fe;
			color: #041e3e;
			padding: 4px 8px;
			border-radius: 6px;
			margin-right: 10px;
		}
	}
}
/* .vue-grid-layout {
  background: #eee;
} */

/* .vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
} */

.vue-grid-item .resizing {
	opacity: 0.9;
}

.vue-grid-item .static {
	background: #cce;
}

.vue-grid-item .text {
	font-size: 24px;
	text-align: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	height: 100%;
	width: 100%;
}

.vue-grid-item .no-drag {
	height: 100%;
	width: 100%;
}

.vue-grid-item .minMax {
	font-size: 12px;
}

.vue-grid-item .add {
	cursor: pointer;
}

.vue-draggable-handle {
	position: absolute;
	width: 20px;
	height: 20px;
	top: 0;
	left: 0;
	background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
	background-position: bottom right;
	padding: 0 8px 8px 0;
	background-repeat: no-repeat;
	background-origin: content-box;
	box-sizing: border-box;
	cursor: pointer;
}

.layoutJSON {
	background: #ddd;
	border: 1px solid black;
	margin-top: 10px;
	padding: 10px;
}

.columns {
	-moz-columns: 120px;
	-webkit-columns: 120px;
	columns: 120px;
}
.description {
	position: relative;
	top: 20%;
	span {
		font-size: 20px;
	}
	p {
		font-size: 20px;
	}
	.icon-lifangti {
		font-size: 30px;
	}
}
</style>
