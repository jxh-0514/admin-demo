<template>
  <div class="container">
    <div id="map"></div>
	<div class="point">
            <el-button @click="pointBtn">点</el-button>
        </div>
  </div>
</template>

<script>
import apng from "../../assets/404_images/404.png";
var viewer;
export default {
  data() {
    return {
    //   Cesium: "",
    //   viewer: "",
    };
  },
  mounted() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      viewer = new Cesium.Viewer('map', {
		//需要进行可视化的数据源的集合
		animation: false, //是否显示动画控件
		shouldAnimate: true,
		homeButton: false, //是否显示Home按钮
		fullscreenButton: false, //是否显示全屏按钮
		baseLayerPicker: false, //是否显示图层选择控件
		geocoder: false, //是否显示地名查找控件
		timeline: false, //是否显示时间线控件
		sceneModePicker: true, //是否显示投影方式控件
		navigationHelpButton: false, //是否显示帮助信息控件
		infoBox: false, //是否显示点击要素之后显示的信息
		requestRenderMode: true, //启用请求渲染模式
		scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
		sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
		fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
		//加载天地图影像地图，WebMapTileServiceImageryProvider该接口是加载WMTS服务的接口
		// imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
		// 	url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=ebf64362215c081f8317203220f133eb',
		// 	layer: 'img',
		// 	style: 'default',
		// 	tileMatrixSetID: 'w',
		// 	format: 'tiles',
		// 	maximumLevel: 18
		// })
	});
	// 如果需要叠加路网与注记矢量则添加以下代码
	// viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
	// 	url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=ebf64362215c081f8317203220f133eb',
	// 	layer: 'cia',
	// 	style: 'default',
	// 	tileMatrixSetID: 'w',
	// 	format: 'tiles',
	// 	maximumLevel: 18
	// }))
	//加载倾斜示范数据
	var palaceTileset = new Cesium.Cesium3DTileset({
		// url: `${process.env.BASE_URL}Scene/Production_4.json`,
		// url: `${process.env.BASE_URL}hczb3dm/tileset.json`,
		url: `${process.env.BASE_URL}Scene2/Scene/tileset.json`,
		//控制切片视角显示的数量，可调整性能
		maximumScreenSpaceError: 2,
    maximumNumberOfLoadedTiles: 100000,
	})
	//控制模型的位置
	palaceTileset.readyPromise.then(function (palaceTileset) {
		//添加到场景
		viewer.scene.primitives.add(palaceTileset);
		var longitude = 113.0 //模型需要改变的经度
		var latitude = 28.0 //模型需要改变的纬度
		var heightOffset = 100; //模型需要改变的高度

		//获取3Dtlies的bounds范围
		var boundingSphere = palaceTileset.boundingSphere;
		//获取3Dtlies的范围中心点的弧度
		var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
		//定义3Dtlies改变之后中心点的弧度
		var offsetvalue = Cesium.Cartographic.fromDegrees(longitude, latitude, heightOffset)
		
		//模型本身的位置
		var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
		//模型改变的位置
		var offset = Cesium.Cartesian3.fromRadians(offsetvalue.longitude, offsetvalue.latitude, heightOffset);

		//定义模型的改变状态
		var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
		//修改模型的位置
		palaceTileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
		viewer.zoomTo(palaceTileset, new Cesium.HeadingPitchRange(0, -0.5, palaceTileset.boundingSphere.radius *
			1.0));
		// viewer.zoomTo(palaceTileset, new Cesium.HeadingPitchRange(0, -0.5, 0));
	});
    },
	pointBtn(){
            this.drawPoint(function(positions){
                var wgs84_positions = [];
                for(var i=0; i<positions.length; i++){
                    var wgs84_point = this.Cartesian3_to_WGS84({
                        x: positions[i].x,
                        y: positions[i].y,
                        z: positions[i].z
                    });
                    wgs84_positions.push(wgs84_point);
					console.log('wgs',wgs84_positions);
                }
                console.log('wgs84',wgs84_positions);
            });
        },
        //画点
        drawPoint:function(callback){            
            //坐标存储
            var positions = [];

            var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

            //单击鼠标左键画点
            handler.setInputAction(function (movement) {
                var cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
                positions.push(cartesian);
                viewer.entities.add({
                    position: cartesian,
                    point: {
                        color: Cesium.Color.RED,
                        pixelSize: 10,
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                    }
                });
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            //单击鼠标右键结束画点
            handler.setInputAction(function (movement) {
                handler.destroy();
                callback(positions);
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        },
        //笛卡尔坐标系转WGS84坐标系
        Cartesian3_to_WGS84: function (point) {
          console.log('坐标转换', point);
            var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var alt = cartographic.height;
            return {lat: lat, lng: lng, alt: alt};
        },
        //WGS84坐标系转笛卡尔坐标系
        WGS84_to_Cartesian3: function (point) {
            var car33 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt);
            var x = car33.x;
            var y = car33.y;
            var z = car33.z;
            return {x: x, y: y, z: z};
        },
  },
};
</script>

<style>
.container {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
