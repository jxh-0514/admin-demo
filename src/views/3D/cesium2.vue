<template>
    <div class="container">
        <div id="map"></div>
        <div class="point">
            <el-button @click="pointBtn">点</el-button>
        </div>
    </div>
</template>

<script>
import apng from '../../assets/404_images/404.png';
var viewer;
export default {
    data() {
        return {
            Cesium : '',
            viewer : ''
        }
    },
    mounted() {
        this.mapInit();
        
    },
    methods: {
         mapInit() {
            // const Cesium = this.cesium;
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZlM2I0MS0wMGI0LTQ0NjUtOTZjNy01NWZlYjhmMzU4ODciLCJpZCI6ODkyMjcsImlhdCI6MTY0OTY2ODA2MX0.Y5Bz32xq7WtR_CNH6sdrfbEhEzlsSktGhSRtbR9MLjc';
             viewer = new Cesium.Viewer('map')
           
           //加载3D模型
            // const numberOfBalloons = 1;
            // const lonIncrement = 0.00025;
            // const initialLon = -122.99875;
            // const lat = 44.0503706;
            // const height = 100;
            // // const url = `${process.env.BASE_URL}skull_downloadable/scene.gltf`;
            // const url = `${process.env.BASE_URL}glb/Soldier.glb`;
            // // const url = 'http://www.webgl3d.cn/threejs/examples/models/gltf/Soldier.glb';
            // for (let i = 0; i < numberOfBalloons; ++i) {
            //     let lon = initialLon + i * lonIncrement;
            //     createModel(url, lon, lat, height);
            // }
            // const target = Cesium.Cartesian3.fromDegrees(initialLon + lonIncrement, lat, height + 0.5);
            // const offset = new Cesium.Cartesian3(-37.048378684557974, -24.852967044804245, 4.352023653686047);
            // viewer.scene.camera.lookAt(target, offset);
            // function createModel(url, x, y, height) {
            //     const position = Cesium.Cartesian3.fromDegrees(x, y, height);
            //     viewer.entities.add({
            //     name : url,
            //     position : position,
            //     model : {
            //         uri : url
            //     }
            //     });
            // }

        //     function createModel(url, height) {
		// 	viewer.entities.removeAll();var position = Cesium.Cartesian3.fromDegrees(
		// 		-123.0744619,
		// 		44.0503706,
		// 		height
		// 	);
		// 	//弧度的航向分量。
		// 	var heading = Cesium.Math.toRadians(135);
		// 	//弧度的螺距分量。
		// 	var pitch = 0;
		// 	//滚动分量（以弧度为单位）
		// 	var roll = 0;
		// 	//HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
		// 	var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
		// 	var orientation = Cesium.Transforms.headingPitchRollQuaternion(
		// 		position,
		// 		hpr
		// 	);

		// 	var entity = viewer.entities.add({
		// 		name: url,
		// 		position: position,
		// 		orientation: orientation,
		// 		model: {
		// 			uri: url,
		// 			//不管缩放如何，模型的最小最小像素大小。
		// 			minimumPixelSize: 128,
		// 			//模型的最大比例尺大小。 minimumPixelSize的上限。
		// 			maximumScale: 20000,
		// 		},
		// 	});
		// 	viewer.trackedEntity = entity;
		// 	// 获取或设置相机当前正在跟踪的Entity实例。
		// }
		// createModel(`${process.env.BASE_URL}glb/yiz.glb`, 5000);

        // var tileset = viewer.scene.primitives.add(
        //     new Cesium.Cesium3DTileset({
        //         url: `${process.env.BASE_URL}Scene/Production_4.json`
        //     })
        // );        

        //设置模型位置

        var longitude = 114.10494261;

        var latitude = 22.80063329;

        var height = 0;

        var rotation = 0; //rotation degrees

        var url = `${process.env.BASE_URL}Scene/Production_4.json`;
        // var url = `${process.env.BASE_URL}hczb3dm/tileset.json`;

        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude, latitude, height));

        Cesium.Matrix4.multiplyByMatrix3(modelMatrix, Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotation)), modelMatrix);

        var tileset = new Cesium.Cesium3DTileset({
        url: url, //文件路径

        modelMatrix: modelMatrix, //模型位置以及旋转角度高度设置

        luminanceAtZenith: 0.2,//太阳光照在天顶的亮度，以每平方米千坎德拉为单位，用于该模型的过程环境图。

        lightColor: new Cesium.Cartesian3(0.3, 0.3, 0.3),//着色模型时的浅色。当undefined现场的灯光颜色来代替。

        backFaceCulling: true,//是否剔除背面几何。如果为true，则背面剔除由glTF材料的doubleSided属性决定；如果为假，则禁用背面剔除。
    //    maximumScreenSpaceError: 2,//默认16,最大屏幕空间错误
            // maximumNumberOfLoadedTiles: 1000,
            // maximumMemoryUsage:100000//默认512,内存MB的最大数量

        });

        // 异步加载模型

        tileset.readyPromise.then(function(tileset){
            viewer.scene.primitives.add(tileset);
            //飞入模型位置
            viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));

        }).otherwise(function(error){
            console.log('错误',error);
        });

            //加载图片
            // var entity = viewer.entities.add({
            // position: Cesium.Cartesian3.fromDegrees(114.77, 30.60),
            // ellipse: {
            //     semiMinorAxis: 250000.0,
            //     semiMajorAxis: 400000.0,
            //     material: apng
            // }
            // });
            // viewer.zoomTo(viewer.entities);
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
    }
}
</script>

<style>
.container{
    width: 100%;
    height: calc(100vh - 100px);
}
</style>