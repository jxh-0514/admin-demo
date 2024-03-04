<!--
 * @Descripttion: 
 * @version: 
 * @Author: 杭
 * @Date: 2023-01-30 15:12:49
 * @LastEditors: 杭
 * @LastEditTime: 2024-02-21 11:03:11
-->
<!-- 天气组件 -->
<template>
	<!-- <div class="box" @click="navigateTo">
		<div>{{ weather }}</div>
	</div> -->
	<el-popover placement="bottom" width="300" trigger="hover">
		<div class="list-box">
			<div class="list-item" v-for="(item, index) in weatherList" :key="index">
				<div>{{ substringStr(item.fxDate) }}</div>
				<i :class="'qi-' + item.iconDay"></i>
				<div class="tem">{{ item.tempMin }}~{{ item.tempMax }}℃</div>
				<div class="wea">{{ item.textDay }}</div>
			</div>
		</div>
		<div class="operation-box">
			<i class="el-icon-link" @click="navigateTo"></i>
			<i class="el-icon-refresh" @click="getAddressIp"></i>
		</div>
		<span class="box" slot="reference">{{ weather }}</span>
	</el-popover>
</template>

<script>
import { CityCode } from "@/utils/cityCode.js";
export default {
	components: {},

	data() {
		return {
			city: "",
			weatcherData: {
				wea: "",
				textDay: "",
				tempMin: "",
				tempMax: "",
			},
			hfurl: "",
			weatherList: [],
		};
	},

	computed: {
		weather() {
			return `${this.city} ${this.weatcherData.textDay}/${this.weatcherData.tempMin}~${this.weatcherData.tempMax}℃`;
		},
	},

	watch: {},

	destroyed() {},
	filters: {
		windSpeed(val) {
			if (!val) return "";
			let windSpeed = val.toString().slice(9, 11);
			return windSpeed;
		},
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.getAddressIp();
		// this.getIp();
	},

	methods: {
		getAddressIp() {
			const geolocation = new BMap.Geolocation();
			let that = this;
			geolocation.getCurrentPosition(
				function getinfo(position) {
					that.city = position.address.city; //获取城市信息
					// that.getWeather(that.city);
					that.getHFweather(that.city);
				},
				function (e) {
					console.log("定位失败");
				},
				{ provider: "baidu" }
			);
		},
		getWeather(city) {
			// 第三方天气api接口
			this.$axios
				.get("https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm", {
					params: {
						// "returnCitySN"就是在index.html引入的script中返回的当前省市位置
						// city: returnCitySN.cname.split("省")[1],
						city: city.split("市")[0],
					},
				})
				.then((res) => {
					console.log("获取天气成功", res);
					if (res.data.data) {
						this.weatcherData = res.data.data[0];
					}
				})
				.catch((err) => {
					this.weatcherData.wea = "";
					console.log("失败", err);
				});
		},

		// 和风天气 https://devapi.qweather.com/v7/weather/3d?location=101010100&key=3a063240013c4cc49b3cc6bef565a597
		getHFweather(city) {
			const arr = new Map(CityCode);
			const cityStr = city.split("市")[0];
			const code = arr.get(cityStr);
			this.$axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${code}&key=3a063240013c4cc49b3cc6bef565a597`).then((res) => {
				console.log("获取天气成功", res);
				if (res.data.code === "200") {
					this.weatcherData = res.data.daily[0];
					this.weatherList = res.data.daily;
					this.hfurl = res.data.fxLink;
				}
			});
		},
		// 跳转和风天气
		navigateTo() {
			if (!this.hfurl) return;
			window.open(this.hfurl);
		},
		// http://ip.360.cn/IPShare/info
		getIp() {
			this.$axios.get("http://ip.360.cn/IPShare/info").then((res) => {
				console.log("当前ip", res);
			});
		},
		substringStr(str) {
			if (!str) return;
			return str.substring(5, 10);
		},
	},
};
</script>
<style lang="scss" scoped>
.box {
	font-size: 12px !important;
	cursor: pointer;
}
.list-box {
	display: flex;
	.list-item {
		flex: 1;
		padding: 10px;
		border-right: 1px solid #eee;
		text-align: center;
		&:last-child {
			border-right: none;
		}
		i,
		.tem {
			margin: 5px 0;
		}
	}
}
.operation-box {
	display: flex;
	justify-content: flex-end;
	i {
		margin-left: 10px;
		cursor: pointer;
	}
	:hover {
		color: #51acff;
	}
}
</style>
