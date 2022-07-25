<template>
    <div>
        <div style="position: fixed;top: 0;right: 0;height: 100vh;background: rgba(0,0,0,0);width: 125px;z-index: 9999999;display: flex;justify-content: center;align-items: center;">
		<div class="tools" style="width: 100%;height: 100%">
			<div class="btn-contrail" style="height: 100%;background: rgba(0,0,0,.5);width: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<button type="button" class="layui-btn btn-click" data-model="0">查看点</button>
				<button type="button" class="layui-btn" data-model="1">标新点</button>
				<button type="button" class="layui-btn" data-model="2">删除点</button>
			</div>
		</div>
	</div>
	<!-- 地图容器 -->
	<div id="container" style="height: 100vh;width: 100%"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted () {
        // 工具栏模式：0-查看点1-标新点2-删除点
		var model = 0;

		// 地图上所有的点
		var points = [];

		// 切换模式
		$('body').on('click', '.layui-btn', function() {
			// 样式改变
			$('.btn-contrail').find('.layui-btn').removeClass('btn-click');
			$(this).addClass('btn-click');
			// 事件监听
			model = $(this).data('model');
			if(3 == model) {
				$('.BMapLib_Drawing').show();
			} else {
				$('.BMapLib_Drawing').hide();
			}
			// 清除域
			if(4 == model) {
				clearAll();
			}
			// 计算点
			if(5 == model) {
				alert('所选区域点数：' + areaPoint.length);
			}
		});

		// 定义地图
		var mp = new BMap.Map("container");
		// 鼠标滚动缩放
	    mp.enableScrollWheelZoom(true);
	    // 地图中心点，并设置级别
	    mp.centerAndZoom(new BMap.Point(106.908, 28.1744), 10);
	    // 地图类型，卫星地图
	    // mp.setMapType(BMAP_HYBRID_MAP);
	    // 地图缩放级别
	    mp.setZoom(10)
	    
		// 请求数据，并渲染地图
		init();
		function init() {
			// 获取数据
			// $.get("json/data.json", function(res) {
			// 	points = res.data;
			// 	renderMap();
			// });
            
            for (var i=0;i<500;i++) {                                   
                points.push(new BMap.Point(116.404+(Math.random()-0.3), 39.925+(Math.random()-0.3)));                
            } 
            console.log(points);
            renderMap();

			// function xun() {
            //     mp.clearOverlays()
            //     points = []                               
                
            //     // this.markerClusterer = new BMapLib.MarkerClusterer(this.map, { markers: null });
            //     for (var i=0;i<100;i++) {                                   
			// 		points.push(new BMap.Point(116.404+(Math.random()-0.3), 39.925+(Math.random()-0.3)));                
			// 	} 
			
			// 	renderMap();
            // }
            // setInterval(xun, 3000);
		}

		// 渲染地图坐标点
		function renderMap() {
			var markers = [];
			points.forEach(v => {
				// 创建新的坐标点
				const marker = new BMap.Marker(new BMap.Point(v['lng'], v['lat']), {
					icon: ''
				})
				// 为每一个点添加点击事件
				marker.addEventListener('click', function() {
					showPoint(v, marker);
				});
				markers.push(marker)
			})
			// 添加点聚合
			new BMapLib.MarkerClusterer(mp, {
				markers: markers
			});
		}

		// 监听地图点击事件
		mp.addEventListener("click", function(e) {
			var point = e.point;
			// 标新点
			if(1 == model) {
				// 创建新的坐标点
				const marker = new BMap.Marker(new BMap.Point(point.lng, point.lat));
				// 添加点击事件
				marker.addEventListener('click', function() {
					showPoint(point, marker);
				});
				// 添加坐标点到地图中
				mp.addOverlay(marker);
				// 将坐标点添加到我们的坐标带你集合中
				points.push(point);
			}
		});

		// 坐标点的点击事件监听
		function showPoint(point, marker) {
			// 查看点
			if(0 == model) {
				var lng = parseFloat(point.lng).toFixed(5);
				var lat = parseFloat(point.lat).toFixed(5);
				alert('经度：' + lng + '，纬度：' + lat);
			}
			// 删除点
			if(2 == model) {
				mp.removeOverlay(marker);
			}
		}
    },
    methods: {

    }
}
</script>

<style>
    html,
    body {
        width: 100%;
        height: 100vh;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
    /* 隐藏百度地图logo */
    .anchorBL {
        display: none;
    }
    
    .btn-contrail button {
        margin-bottom: 30px;
        margin-left: 0px!important;
        background-color: #FFFFFF;
        color: rgba(0, 0, 0, .5);
        padding: 10px;
    }
    
    .layui-btn:hover {
        background-color: #1890ff!important;
        color: #FFFFFF!important;
    }
    
    .btn-click {
        background-color: #1890ff!important;
        color: #FFFFFF!important;
    }
</style>