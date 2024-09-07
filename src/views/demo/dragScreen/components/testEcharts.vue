<template>
	<div ref="chart" class="chart"></div>
</template>

<script>
import echarts from "echarts";
import { debounce } from "@/utils/debounce.js";

export default {
	name: "BarChart",
	props: {
		// item: {
		// 	type: Object,
		// 	default: () => {
		// 		return {
		// 			x: 0,
		// 			y: 0,
		// 			w: 2,
		// 			h: 2,
		// 			i: "BarChart",
		// 			config: {
		// 				name: "BarChart",
		// 				previewImage: "https://echarts.apache.org/examples/data/thumb/bar-simple.webp?_v_=1724900876815", // 静态预览图
		// 				component: "BarChart",
		// 				chartType: "bar",
		// 			},
		// 		};
		// 	},
		// },
	},
	data() {
		return {
			chartInstance: null, // 定义 ECharts 实例对象
			resizeHandler: null,
		};
	},
	mounted() {
		// setTimeout(() => {
		// 初始化图表
		this.initChart();
		// 创建防抖后的 resize 方法
		this.resizeHandler = this.resizeChart;
		// 监听窗口大小变化，重新渲染图表
		window.addEventListener("resize", () => {
			this.resizeChart();
		});
		// }, 1000);
	},
	beforeDestroy() {
		// 移除监听器
		window.removeEventListener("resize", this.resizeHandler);
		if (this.chartInstance) {
			this.chartInstance.dispose();
		}
	},
	methods: {
		initChart() {
			this.chartInstance = echarts.init(this.$refs.chart);
			console.log("初始化", this.chartInstance);
			// 显示加载动画
			this.chartInstance.showLoading({
				text: "Loading...", // 可选，加载时显示的文字
				color: "#c23531", // 主颜色
				textColor: "#fff", // 文字颜色
				maskColor: "rgba(0, 0, 0, 0.5)", // 背景遮罩颜色
				zlevel: 0, // z-index 层级
			});
			// this.updateChart();
			// 延时模拟数据加载完成
			setTimeout(() => {
				// 数据加载完成后更新图表
				this.updateChart();
				// 隐藏加载动画
				this.chartInstance.hideLoading();
			}, 2000); // 模拟1秒后加载完成
		},
		updateChart() {
			const option = {
				title: {
					text: "大屏数据展示 - 柱状图",
					// text: `大屏数据展示 - ${this.item.i}`,
					left: "center",
					textStyle: {
						color: "#fff",
						fontSize: 24,
					},
				},
				tooltip: {
					trigger: "axis",
				},
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisLine: {
						lineStyle: {
							color: "#fff",
						},
					},
				},
				yAxis: {
					type: "value",
					axisLine: {
						lineStyle: {
							color: "#fff",
						},
					},
					splitLine: {
						lineStyle: {
							color: "#555",
						},
					},
				},
				series: [
					{
						name: "Sales",
						// type: this.item.config.chartType || "bar",
						type: "bar",
						data: [120, 200, 150, 80, 70, 110, 130],
						itemStyle: {
							color: "#3398DB",
						},
					},
				],
				backgroundColor: "#2c343c",
			};
			this.chartInstance.setOption(option);
		},
		resizeChart: debounce(function () {
			if (this.chartInstance) {
				console.log("resize", this.chartInstance.id);
				this.chartInstance.resize();
			}
		}, 500),
	},
};
</script>

<style scoped>
.chart {
	width: 100%;
	height: 100%;
	padding: 10px;
	box-sizing: border-box;
	background-color: #2c343c;
	cursor: pointer;
}
</style>
