<template>
    <div id="cesiumDiv">
        <div id="tools">
            <el-button id="pointBtn">画点</el-button>
            <el-button id="lineBtn">画线</el-button>
            <el-button id="polyBtn">画面</el-button>
            <el-button id="rectBtn">画矩形</el-button>
          <el-button id="circleBtn">画圆</el-button>
            <el-button id="clearBtn">清除</el-button>
        </div>
    </div>
</template>

<script>    

export default {
  name: 'CesiumViewer',    
  data () {
    return {
        removeImageryLayers:[],
        viewer: ''
    }
  },
    mounted:function(){
         
      var _this = this;
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZlM2I0MS0wMGI0LTQ0NjUtOTZjNy01NWZlYjhmMzU4ODciLCJpZCI6ODkyMjcsImlhdCI6MTY0OTY2ODA2MX0.Y5Bz32xq7WtR_CNH6sdrfbEhEzlsSktGhSRtbR9MLjc';
      _this.viewer = new Cesium.Viewer('cesiumDiv', {
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
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=ebf64362215c081f8317203220f133eb',
            layer: 'img',
            style: 'default',
            tileMatrixSetID: 'w',
            format: 'tiles',
            maximumLevel: 18
        })
      })
      $("#pointBtn").bind('click',function(){
        _this.drawPoint(function(positions){
            var wgs84_positions = [];
            for(var i=0; i<positions.length; i++){
                var wgs84_point = _this.Cartesian3_to_WGS84({
                    x: positions[i].x,
                    y: positions[i].y,
                    z: positions[i].z
                });
                wgs84_positions.push(wgs84_point);
            }
            console.log(wgs84_positions);
        });
      });

        $("#lineBtn").bind('click',function(){
            _this.drawLineString(function(positions){
                var wgs84_positions = [];
                for(var i=0; i<positions.length; i++){
                    var wgs84_point = _this.Cartesian3_to_WGS84({
                        x: positions[i].x,
                        y: positions[i].y,
                        z: positions[i].z
                    });
                    wgs84_positions.push(wgs84_point);
                }
                console.log(wgs84_positions);
            });
        });

        $("#polyBtn").bind('click',function(){
            _this.drawPolygon(function(positions){
                var wgs84_positions = [];
                for(var i=0; i<positions.length; i++){
                    var wgs84_point = _this.Cartesian3_to_WGS84({
                        x: positions[i].x,
                        y: positions[i].y,
                        z: positions[i].z
                    });
                    wgs84_positions.push(wgs84_point);
                }
                console.log(wgs84_positions);
            });
        });

        $("#rectBtn").bind('click',function(){
            _this.drawRect(function(positions){
                var wgs84_positions = [];
                for(var i=0; i<positions.length; i++){
                    var wgs84_point = _this.Cartesian3_to_WGS84({
                        x: positions[i].x,
                        y: positions[i].y,
                        z: positions[i].z
                    });
                    wgs84_positions.push(wgs84_point);
                }
                console.log(wgs84_positions);
            });
        });

        $("#circleBtn").bind('click',function(){
            _this.circleDraw(function(positions){
                var wgs84_positions = [];
                for(var i=0; i<positions.length; i++){
                    var wgs84_point = _this.Cartesian3_to_WGS84({
                        x: positions[i].x,
                        y: positions[i].y,
                        z: positions[i].z
                    });
                    wgs84_positions.push(wgs84_point);
                }
                console.log(wgs84_positions);
            });
        });

        $("#clearBtn").bind('click',function(){
            _this.clearHandle();
        });

        //加载3D模型
         var longitude = 114.10494261;

        var latitude = 22.80063329;

        var height = 0;

        var rotation = 0; //rotation degrees

        // var url = `${process.env.BASE_URL}Scene2/Scene/tileset.json`;
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
        //  maximumScreenSpaceError: 2,//默认16,最大屏幕空间错误
            // maximumNumberOfLoadedTiles: 1000,
            // maximumMemoryUsage:100000//默认512,内存MB的最大数量

        });

        // 异步加载模型

        tileset.readyPromise.then(function(tileset){
            _this.viewer.scene.primitives.add(tileset);
            //飞入模型位置
            _this.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));

        }).otherwise(function(error){
            console.log('错误',error);
        });

        //点击加载弹窗
        function leftDownAction() {                    
            var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function(movement) {
                var picked = viewer.scene.pick(movement.position)
                if (Cesium.defined(picked) && picked.id.id) {
                    Popupposition(picked)
                    let id = picked.id.id
                    let name = picked.id._name
                    document.getElementById('title').innerHTML = name
                    let monitoItems = picked.id.monitoItems
                    document.getElementById('state').innerHTML = monitoItems.data.state
                    document.getElementById('type').innerHTML = monitoItems.data.type

                    console.log('====================================');
                    console.log('点击',picked);
                    console.log('====================================');
                } else {
                    return
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
        leftDownAction()

    },
    methods:{
        //画点
        drawPoint:function(callback){
            var _this = this;
            //坐标存储
            var positions = [];

            var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);

            //单击鼠标左键画点
            handler.setInputAction(function (movement) {
                var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid);
                positions.push(cartesian);
                _this.viewer.entities.add({
                    position: cartesian,
                    point: {
                        color: Cesium.Color.RED,
                        pixelSize: 5,
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
        //画线
        drawLineString:function(callback){
            var _this = this;
            var PolyLinePrimitive = (function () {
                function _(positions) {
                    this.options = {
                        polyline: {
                            show: true,
                            positions: [],
                            material: Cesium.Color.RED,
                            width:3
                        }
                    };
                    this.positions = positions;
                    this._init();
                }

                _.prototype._init = function () {
                    var _self = this;
                    var _update = function () {
                        return _self.positions;
                    };
                    //实时更新polyline.positions
                    this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
                    _this.viewer.entities.add(this.options);
                };
                return _;
            })();

            var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            var positions = [];
            var poly = undefined;
            //鼠标左键单击画点
            handler.setInputAction(function (movement) {
                var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid);
                if (positions.length == 0) {
                    positions.push(cartesian.clone());
                }
                positions.push(cartesian);
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            handler.setInputAction(function (movement) {
                var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.endPosition, _this.viewer.scene.globe.ellipsoid);
                if (positions.length >= 2) {
                    if (!Cesium.defined(poly)) {
                        poly = new PolyLinePrimitive(positions);
                    } else {
                            if(cartesian != undefined){
                                      positions.pop();
                                      cartesian.y += (1 + Math.random());
                                      positions.push(cartesian);
                            }
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            //单击鼠标右键结束画线
            handler.setInputAction(function (movement) {
                handler.destroy();
                callback(positions);
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        },
        //画面
        drawPolygon:function(callback){
            var _this = this;
            var PolygonPrimitive = (function () {
                function _(positions) {
                    this.options = {
                        name: '多边形',
                        polygon: {
                            hierarchy: [],
                            perPositionHeight: true,
                            material: Cesium.Color.RED.withAlpha(0.4)
                        }
                    };
                    // this.hierarchy = positions;
                    this.hierarchy = new Cesium.PolygonHierarchy(positions);
                    this._init();
                }

                _.prototype._init = function () {
                    var _self = this;
                    var _update = function () {
                        return _self.hierarchy;
                    };
                    //实时更新polygon.hierarchy
                    this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false);
                    _this.viewer.entities.add(this.options);
                };
                return _;
            })();

            var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            var positions = [];
            var poly = undefined;

            //鼠标单击画点
            handler.setInputAction(function (movement) {
                var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid);
                if (positions.length == 0) {
                    positions.push(cartesian.clone());
                }
                positions.push(cartesian);
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            handler.setInputAction(function (movement) {
                var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.endPosition, _this.viewer.scene.globe.ellipsoid);
                if (positions.length >= 2) {
                    if (!Cesium.defined(poly)) {
                        poly = new PolygonPrimitive(positions);
                    } else {
                              if(cartesian != undefined){
                                    positions.pop();
                                    cartesian.y += (1 + Math.random());
                                    positions.push(cartesian);
                              }
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            //鼠标右键单击结束绘制
            handler.setInputAction(function (movement) {
                handler.destroy();
                callback(positions);
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        },
          //画圆
          circleDraw(_callBack){
            let _self = this;
            _self.viewer.scene.globe.depthTestAgainstTerrain = true;
            _self.circle= {
              points:[]
              ,rect:null
              ,entity:null
              ,r:1
            };
            var tempPosition;
            let cartographic1;
            let p;
            let tempLon;
            let tempLat;
            var ShapeEventHandler = new Cesium.ScreenSpaceEventHandler(_self.viewer.scene.canvas);
            // common.handlerList.push(ShapeEventHandler);
            ShapeEventHandler.setInputAction(function(click){
              tempPosition = _self.getPointFromWindowPoint(click.position);
              //选择的点在球面上
              if(tempPosition){
                function callBackPos() {
                  const minlon = Cesium.Math.toDegrees(_self.circle.points[0].longitude);
                  const minlat = Cesium.Math.toDegrees(_self.circle.points[0].latitude);
                  const maxlon = Cesium.Math.toDegrees(_self.circle.points[1].longitude);
                   const maxlat = Cesium.Math.toDegrees(_self.circle.points[1].latitude);
                  const r = _self.getFlatternDistance(minlat, minlon, maxlat, maxlon);
                  if(r){
                    return r;
                  }
                  return 1;
                };
                if(_self.circle.points.length==0) {
                  p = click.position;
                  cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(tempPosition);
                  _self.circle.points.push(_self.viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
                  _self.circle.points.push(_self.viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
                  tempLon = Cesium.Math.toDegrees(cartographic1.longitude);
                  tempLat = Cesium.Math.toDegrees(cartographic1.latitude);
                  _self.circle.entity = _self.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(tempLon,tempLat),
                    ellipse : {
                      semiMinorAxis : new Cesium.CallbackProperty(callBackPos, false),
                      semiMajorAxis : new Cesium.CallbackProperty(callBackPos, false),
                      //条形材质
                      material :  Cesium.Color.RED.withAlpha(0.3)
                    }
                  });
                }else{
                  ShapeEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                  ShapeEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                  var tempCircle = new Cesium.CircleOutlineGeometry({
                    center : Cesium.Cartesian3.fromDegrees(tempLon,tempLat),
                    radius : callBackPos(),
                    granularity : Math.PI / 2
                  });
                  var geometry = Cesium.CircleOutlineGeometry.createGeometry(tempCircle);
                  var float64ArrayPositionsIn = geometry.attributes.position.values;
                  var positionsIn = [].slice.call(float64ArrayPositionsIn);
                  _callBack(positionsIn);
                }
              }
            },Cesium.ScreenSpaceEventType.LEFT_CLICK);
            ShapeEventHandler.setInputAction(function(movement){
              if(_self.circle.points.length==0){
                return;
              }
              var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
              //选择的点在球面上
              if(moveEndPosition){
                _self.circle.points.pop();
                _self.circle.points.push(_self.viewer.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition));
              }
            },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          },
        //画矩形
        drawRect:function(callback){
            let _self = this;
            let pointsArr = [];
            _self.shape= {
                points:[],
                rect:null,
                entity:null
            };
            var tempPosition;
            var handle = new Cesium.ScreenSpaceEventHandler(_self.viewer.scene.canvas);
            //鼠标左键单击画点
            handle.setInputAction(function(click){
                tempPosition = _self.getPointFromWindowPoint(click.position);
                //选择的点在球面上
                if(tempPosition){
                    if(_self.shape.points.length==0) {
                        pointsArr.push(tempPosition);
                        _self.shape.points.push(_self.viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
                        _self.shape.rect=Cesium.Rectangle.fromCartographicArray(_self.shape.points);
                        _self.shape.rect.east+=0.000001;
                        _self.shape.rect.north+=0.000001;
                        _self.shape.entity= _self.viewer.entities.add({
                            rectangle : {
                                coordinates :_self.shape.rect,
                                material : Cesium.Color.BLACK.withAlpha(0.4),
                                outline : true,
                                outlineWidth: 2,
                                outlineColor : Cesium.Color.RED,
                                height:0
                            }
                        });
                        _self.bufferEntity = _self.shape.entity;
                    }
                    else{
                        handle.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                        handle.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                        callback(pointsArr);
                    }
                }
            },Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            handle.setInputAction(function(movement){
                if(_self.shape.points.length==0){
                    return;
                }
                var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
                //选择的点在球面上
                if(moveEndPosition){
                    pointsArr[1] = moveEndPosition;
                    _self.shape.points[1]=_self.viewer.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition);
                    _self.shape.rect= Cesium.Rectangle.fromCartographicArray(_self.shape.points);
                    if(_self.shape.rect.west==_self.shape.rect.east)
                        _self.shape.rect.east+=0.000001;
                    if(_self.shape.rect.south==_self.shape.rect.north)
                        _self.shape.rect.north+=0.000001;
                    _self.shape.entity.rectangle.coordinates = _self.shape.rect;
                }
            },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        },
        //清除所有Entity和ImageryLayers
        clearHandle: function () {
            //移除所有实体Entity
            this.viewer.entities.removeAll();
            //移除cesium加载的ImageryLayer
            for(var i=0; i<this.removeImageryLayers.length; i++){
                this.viewer.imageryLayers.remove(this.removeImageryLayers[i]);
            }
        },
        getPointFromWindowPoint(point){
            if(this.viewer.scene.terrainProvider.constructor.name=="EllipsoidTerrainProvider") {
                return this.viewer.camera.pickEllipsoid(point,this.viewer.scene.globe.ellipsoid);
            } else {
                var ray=this.viewer.scene.camera.getPickRay(point);
                return this.viewer.scene.globe.pick(ray,this.viewer.scene);
            }
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

        //计算两点间距离
        getFlatternDistance(lat1, lng1, lat2, lng2) {
                var EARTH_RADIUS = 6378137.0;    //单位M
                var PI = Math.PI;

                function getRad(d) {
                    return d * PI / 180.0;
                }
                var f = getRad((lat1 + lat2) / 2);
                var g = getRad((lat1 - lat2) / 2);
                var l = getRad((lng1 - lng2) / 2);

                var sg = Math.sin(g);
                var sl = Math.sin(l);
                var sf = Math.sin(f);

                var s, c, w, r, d, h1, h2;
                var a = EARTH_RADIUS;
                var fl = 1 / 298.257;

                sg = sg * sg;
                sl = sl * sl;
                sf = sf * sf;

                s = sg * (1 - sl) + (1 - sf) * sl;
                c = (1 - sg) * (1 - sl) + sf * sl;

                w = Math.atan(Math.sqrt(s / c));
                r = Math.sqrt(s * c) / w;
                d = 2 * w * a;
                h1 = (3 * r - 1) / 2 / c;
                h2 = (3 * r + 1) / 2 / s;

                return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
        },
    }
}
</script>


<style scoped>
    #cesiumDiv{
        margin:0;
        padding:0;
    }
</style>