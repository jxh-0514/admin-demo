<template>
  <el-container>
    <div id="fengMap"></div>

    <!-- 按钮组 -->
    <div id="btnsGroup" class="btnsGroup">
      <el-button id="startBtn" class="ml-15" type="primary" @click="startNavi(this)">开始导航</el-button>
    </div>

    <!--距离终点时间、距离信息展示-->
    <div id="description" class="description"></div>
  </el-container>
</template>

<script>
import "./lib/fengmap.core.min.js";
import "./lib/fengmap.navi.min.js";
import "./lib/fengmap.control.min.js";
import "./lib/fengmap.analyzer.min.js";
import "./js/data.js";
import startPic from "@/views/demo/fmap5/images/start.png";
import endPic from "@/views/demo/fmap5/images/end.png";
import pointerPic from "@/views/demo/fmap5/images/pointer.png";
var map = null;

export default {
  data() {
    return {
      is2dor3d: false,
      navi: null,
      navigation: true, //开始导航开关
      lastGroupID: null,
      floorControl: null,
      isPause: false,
      locationMarker: null,
      naviSwitch: true, //导航开关
      naviStoped: false, //导航是否结束
      naviScaleLevel: 22, //导航过程中地图缩放比例
    //   startNaviScaleLevel, //导航前地图缩放比例
      maxEndDistance: 5, //距离终点的最大距离，结束导航 单位：米
      maxOffsetDis: 15, //路径偏移的最大距离，单位：米
      minOffsetDis: 3, //路径偏移的最小距离，在最小距离以内坐标点自动约束到路径线上
      coordsData: [], //路径线真实坐标点数据
    //   currentCoord, //当前定位点原始坐标
      naviInt: null, //导航请求定位点定时器
      coordIndex: 0,
      xinaviLines:[], //线
      linespoints: {
        //绘制线上的点集合
        groupId: 1,
        points: [],
    },
      naviRealPoints: [
        { x: 12619639.714418296, y: 2621884.0304000042, groupID: 1 },
        { x: 12619614.31151528, y: 2621846.9910006113, groupID: 4 }
        // { x: 12619609.969254281, y: 2621842.8454000056, groupID: 4 },
      ], //真实导航坐标
      navv: [
          { x: 12619639.714418296, y: 2621884.0304000042, groupID: 1 },
          {x: 12619641.802281342, y: 2621873.1030683657, groupID: 1 }
      ], // c测试
      locationCoords: {
        firstRoute: [
          { x: 12619639.714418296, y: 2621884.0304000042, groupID: 1 },
          { x: 12619638.622895338, y: 2621881.0425652154, groupID: 1 },
          { x: 12619637.008933779, y: 2621878.237976268, groupID: 1 },
          { x: 12619635.344802089, y: 2621874.6251073666, groupID: 1 },
          { x: 12619634.442470308, y: 2621872.152547434, groupID: 1 },
          { x: 12619633.441965468, y: 2621869.329241112, groupID: 1 },
          { x: 12619632.508611914, y: 2621866.731607359, groupID: 1 },
          { x: 12619631.611422986, y: 2621864.1885731667, groupID: 1 },
          { x: 12619630.727124, y: 2621862.1675, groupID: 1 },
          { x: 12619629.86207, y: 2621859.76, groupID: 1 },
        ],
        seconedRoute: [
          { x: 12619629.86207, y: 2621859.76, groupID: 1 },
          { x: 12619628.708559066, y: 2621855.6936476417, groupID: 1 },
          { x: 12619627.756057162, y: 2621853.1139549837, groupID: 1 },
          { x: 12619626.803555261, y: 2621850.335824419, groupID: 1 },
          { x: 12619625.745219812, y: 2621847.147588879, groupID: 1 },
          { x: 12619627.437006213, y: 2621846.517544262, groupID: 1 },
          { x: 12619629.500760335, y: 2621845.6179591306, groupID: 1 },
          { x: 12619631.152794551, y: 2621844.728799995, groupID: 1 },
        //   { x: 12619631.152794551, y: 2621844.728799995, groupID: 4 },
        //   { x: 12619629.447843563, y: 2621845.445979614, groupID: 4 },
        //   { x: 12619627.569298144, y: 2621846.2265020125, groupID: 4 },
        //   { x: 12619625.862732228, y: 2621846.9144200534, groupID: 4 },
        //   { x: 12619624.27122213, y: 2621847.495347202, groupID: 4 },//
        //   { x: 12619618.979363674, y: 2621850.1312736534, groupID: 4 },
        //   { x: 12619618.824464202, y: 2621851.2929948624, groupID: 4 },
        //   { x: 12619619.47167999, y: 2621852.585049686, groupID: 4 },
        //   { x: 12619620.067151746, y: 2621854.2651764485, groupID: 4 },
        //   { x: 12619619.320913317, y: 2621854.6618391755, groupID: 4 },
        //   { x: 12619618.89285393, y: 2621853.8135800413, groupID: 4 },
        //   { x: 12619618.314344615, y: 2621852.541343617, groupID: 4 },
        //   { x: 12619617.961229835, y: 2621851.1849976457, groupID: 4 },
        //   {x: 12619617.571891064, y: 2621850.266426747, groupID: 4 },
        //   { x: 12619616.945031878, y: 2621849.218840152, groupID: 4 },
        //   { x: 12619616.371230636, y: 2621847.780457007, groupID: 4 },
        //   { x: 12619615.367331168, y: 2621847.8553746487, groupID: 4 },
        //   { x: 12619613.999479536, y: 2621848.0492449887, groupID: 4 },

        //   { x: 12619620.897521995, y: 2621848.6704000086, groupID: 4 },
        //   { x: 12619618.924020432, y: 2621849.156768287, groupID: 4 },
        //   { x: 12619618.15220052, y: 2621848.015843097, groupID: 4 },
        //   { x: 12619619.798198136, y: 2621854.6922404123, groupID: 4 },
        //   { x: 12619614.31151528, y: 2621846.9910006113, groupID: 4 },
        //   { x: 12619617.733229868, y: 2621846.8338866755, groupID: 4 },
        //   { x: 12619617.459263057, y: 2621846.0610000007, groupID: 4 },
        //   { x: 12619615.991037682, y: 2621846.581440065, groupID: 4 },
        //   { x: 12619614.736980805, y: 2621846.8218157007, groupID: 4 },
        //   { x: 12619614.182161447, y: 2621845.935054563, groupID: 4 },
        //   { x: 12619613.597916376, y: 2621844.4051468484, groupID: 4 },
        //   { x: 12619612.764949083, y: 2621843.6653302237, groupID: 4 },
        //   { x: 12619611.47037175, y: 2621843.1726675034, groupID: 4 },
        //   { x: 12619609.969254281, y: 2621842.8454000056, groupID: 4 },
        ],
      },
    };
  },
  mounted() {
    if (this.naviInt) {
        clearTimeout(this.naviInt);
    }
    this.openMap()
  },
  methods: {
    openMap() {
        var fmapID = "1321274646113083394";
      var mapOptions = {
        //必要，地图容器
        container: document.getElementById("fengMap"),
        //地图数据位置
        mapServerURL: "./data3/" + fmapID,
        //主题数据位置
        mapThemeURL: "./data3/theme",
        //默认主题名称
        defaultThemeName: "3b91d03288204d02368dd4f68fc1f189",
        //是否对不聚焦图层启用透明设置 默认为true
        focusAlphaMode: true,
        //必要，地图应用名称，通过蜂鸟云后台创建
        appName: "请输入您的appName",
        //必要，地图应用密钥，通过蜂鸟云后台获取
        key: "57c7f309aca507497d028a9c00207cf8",
      };

      //初始化地图对象
      map = new fengmap.FMMap(mapOptions);

      //打开Fengmap服务器的地图数据和主题
      map.openMapById(fmapID, function (error) {
        //打印错误信息
        console.log(error);
      });

      //地图加载完成事件
      map.on("loadComplete", () => {
        console.log("地图加载完成！");        

        //添加初始定位点图标
        this.addlocationMarker(this.naviRealPoints[0]);

        document.getElementById("btnsGroup").style.display = "block";

        //3D切换
        // this.loadScrollFloorCtrl();
        //楼层切换
        this.initFloorControl();

        // 地图加载完执行画导航路径
        this.createNavi(this.naviRealPoints);
        // this.drawLines2(this.navv)

        //遍历画线
            this.locationCoords.seconedRoute.forEach((item) => {                               
                this.linespoints.points.push({x:item.x,y:item.y,z:2})
            })
            // this.drawLines2([this.linespoints])
            console.log('xx',[this.linespoints]);
      });
      map.on("mapClickNode", e => {
          var buttonType = e.domEvent.button;
          if (buttonType == 0) {
              console.log("左击", e);
          } else if (buttonType == 2) {
              console.log("右击", e);
          }
      })
    },

    /**
         * 加载楼层切换控件
         * */
    initFloorControl() {
        //楼层控制控件配置参数
        var floorCtlOpt = {
            //默认在左下角
            position: fengmap.FMControlPosition.LEFT_TOP,
            //初始楼层按钮显示个数配置。默认显示5层,其他的隐藏，可滚动查看
            showBtnCount: 6,
            //设置x,y的位置偏移量
            offset: {
                x: 20,
                y: 20
            }
        };
        //创建buttonGroupsControl
        this.floorControl = new fengmap.FMButtonGroupsControl(map, floorCtlOpt);
    },

    /**
         * 添加定位点marker
         * */
    addlocationMarker(coord) {

        this.locationMarker = new fengmap.FMLocationMarker({
            //设置图片的路径
            url: pointerPic,
            //设置图片显示尺寸
            size: 43,
            //设置图片高度
            height: 3
        });

        //添加定位点标注
        map.addLocationMarker(this.locationMarker);

        //设置定位图标位置
        this.setLocationMakerPosition(coord);
    },

    /**
     * 设置定位标注点位置信息
     * */
    setLocationMakerPosition(coord, angle) {
        //设置定位图标旋转角度
        if (angle) {
            //定位点方向始终与路径线保持平行
            this.locationMarker.rotateTo({
                to: -angle,
                duration: 0.5
            });
            //第一人称需旋转地图角度
            map.rotateTo({
                to: angle,
                time: 0.5
            });
        }

        //不同楼层
        var currentGid = map.focusGroupID;
        if (currentGid !== coord.groupID) {
            //重新设置聚焦楼层
            this.floorControl.changeFocusGroup(coord.groupID, false);

            //设置locationMarker的位置
            this.locationMarker.setPosition({
                //设置定位点的x坐标
                x: coord.x,
                //设置定位点的y坐标
                y: coord.y,
                //设置定位点所在楼层
                groupID: coord.groupID
            });
        }

        //移动locationMarker
        var data = {
            //设置定位点的x坐标
            x: coord.x,
            //设置定位点的y坐标
            y: coord.y,
            //设置定位点所在楼层
            groupID: coord.groupID,
            time: 0.5
        };

        //移动地图
        map.moveTo({
            x: coord.x,
            y: coord.y,
            groupID: coord.groupID,
            time: 1
        });
        //移动locationMarker
        this.locationMarker.moveTo(data);
    },

    /**
         * 创建导航
         * fengmap.FMNavigation 导航相关的控制类,封装了自动设置起始点标注，路径分析，模拟导航，导航动画的功能。
         * https://developer.fengmap.com/docs/js/v2.7.1/fengmap.FMNavigation.html
         * */
        createNavi(coords) {
            console.log('创建导航',coords);
            if (!this.navi) {
                console.log('创建导航222',this.navi);
                //初始化导航对象
                this.navi = new fengmap.FMNavigation({
                    //地图对象
                    map: map,
                    //导航结果文字描述内容的语言类型参数, 目前支持中英文。参考FMLanguaeType。
                    naviLanguage: fengmap.FMLanguageType.ZH,
                    //导航中路径规划模式, 支持最短路径、最优路径两种。默认为MODULE_SHORTEST, 最短路径。
                    naviMode: fengmap.FMNaviMode.MODULE_SHORTEST,
                    //导航中的路线规划梯类优先级, 默认为PRIORITY_DEFAULT, 详情参考FMNaviPriority。
                    naviPriority: fengmap.FMNaviPriority.PRIORITY_DEFAULT,
                    //调用drawNaviLine绘制导航线时, 是否清除上次调用drawNaviLine绘制的导航线, 默认为true
                    autoClearNaviLine: true,
                    //导航线与楼层之间的高度偏移设置。默认是1。
                    lineMarkerHeight: 2.5,
                    // 设置导航线的样式
                    lineStyle: {
                        // 导航线样式
                        lineType: fengmap.FMLineType.FMARROW,
                        // 设置线的宽度
                        lineWidth: 6,
                        //设置线动画,false为动画
                        noAnimate: true
                    }
                });
            }

            //添加起点
            this.navi.setStartPoint({
                x: coords[0].x,
                y: coords[0].y,
				height: 2.5,
                groupID: coords[0].groupID,
                url: startPic,
                size: 32
            });

            //添加终点
            this.navi.setEndPoint({
                x: coords[1].x,
                y: coords[1].y,
				height: 2.5,
                groupID: coords[1].groupID,
                url: endPic,
                size: 32
            });

            // 画出导航线
            // this.navi.drawNaviLine();
            // this.drawLines2(this.navv)
            //解析定位点数据
            this.analyseLocationData(0);

            //监听导航事件
            this.navi.on('walking',  (data) => {

                /**
                 * 当定位点偏离路径线大于约定的最大偏移距离时，进行路径重新规划
                 * */
                if (data.distance > this.minOffsetDis) {
                    //在最小和最大偏移距离之间，坐标点用原始定位坐标
                    data.point = this.currentCoord;
                }

                //更新导航信息
                this.setNaviDescriptions(data);

                //更新定位图标的位置及旋转角度
                this.setLocationMakerPosition(data.point, data.angle);
                if (data.distance > this.maxOffsetDis) {
                    console.log('路径偏移，重新规划路线');
                    clearTimeout(this.naviInt);
                    //重新设置起终点坐标，画路径线，重新开始导航
                    this.resetNaviRoute(data.point);
                    return;
                }

                /**
                 * 当剩余距离小于设置的距离终点的最小距离时，自动结束导航
                 * */
                if (data.remain < this.maxEndDistance || data.remain == 0) {
                    console.log('距离小于设置的距离终点的最小距离，导航自动结束');
                    //结束导航
                    document.getElementById('description').innerHTML = '导航结束!';
                    this.stopNavi();
                    document.getElementById('startBtn').classList.remove('active');
                    return;
                }
            });
        },

        /**
         * 定位点数据解析，模拟数据点
         * 真实项目中应该通过定位接口进行实时定位
         * firstRoute:路径偏移前定位点集合
         * seconedRoute:路径偏移后重新路径规划定位点集合
         * */
        analyseLocationData(type) {
            if (type === 0) {
                //第一条路径线模拟坐标点
                this.coordsData = this.locationCoords['firstRoute'];
            } else {
                //重新规划后路径线模拟坐标点
                this.coordsData = this.locationCoords['seconedRoute'];
            }
        },

        /**
         * 定位真实导航坐标
         * */
        changeCoord() {
            clearTimeout(this.naviInt);
            //定时器
            this.naviInt = setTimeout( () => {
                if (!map || !this.navi) return;

                if (this.coordIndex >= this.coordsData.length || this.naviStoped) {
                    this.stopNavi();
                    return;
                }
                this.currentCoord = this.coordsData[this.coordIndex];

                /**
                 * 1.用于真实导航，设置定位系统所返回的真实定位坐标，内部自动路径约束，同时触发walking事件
                 * 返回如下结果： {remain: 到终点的剩余距离, walk: 已经走过的距离, distanceToNext: 是下一个转角处的距离,
                 * angle: 当前路线与正北方向的角度, index: 当前路段的索引, point: 路径约束后的点, groupID, 当前的楼层id}
                 * https://developer.fengmap.com/docs/js/v2.7.1/fengmap.FMNavigation.html#locate
                 * */
                this.navi.locate(this.currentCoord);

                /**
                 * 2.用于真实导航，设置定位系统所返回的真实定位坐标，内部无路径约束，同时触发walking事件，
                 * 返回如下结果： {remain: 到终点的剩余距离, walk: 已经走过的距离, distanceToNext: 是下一个转角处的距离,
                 * angle: 当前路线与正北方向的角度, index: 当前路段的索引, point: 路径约束后的点, groupID, 当前的楼层id}
                 * 此方法与locate的区别为内部不在内部自动计算约束
                 * https://developer.fengmap.com/docs/js/v2.7.1/fengmap.FMNavigation.html#locateNoConstraint
                 * */
                /*navi.locateNoConstraint(currentCoord);*/

                this.coordIndex++;
                this.changeCoord();
            }, 500);
        },

        /**
         * 路径偏移，进行路径重新规划
         * */
        resetNaviRoute(coordItem) {

            if (!this.navi) {
                return;
            }

            //重置导航参数
            this.coordIndex = 0;

            //更新起点坐标
            this.navi.setStartPoint({
                x: coordItem.x,
                y: coordItem.y,
                groupID: coordItem.groupID,
                url: startPic,
                size: 32,
				height: 2.5
            });

            //更新终点坐标
            this.navi.setEndPoint({
                x: this.naviRealPoints[1].x,
                y: this.naviRealPoints[1].y,
                groupID: this.naviRealPoints[1].groupID,
                url: endPic,
                size: 32,
				height: 2.5
            });

            //画路径线
            // this.navi.drawNaviLine();
            console.log('画路径线', coordItem, this.locationCoords.seconedRoute);

            // //遍历画线
            // this.locationCoords.seconedRoute.forEach((item) => {
                
            //     this.linespoints.points = []
            //     // this.linespoints.groupId = map.focusGroupID
            //     this.linespoints.points.push({x:item.x,y:item.y,z:2})
            //     // console.log('xx',[this.linespoints]);
                
            
            // })
            // this.drawLines2([this.linespoints])
            // this.drawLines2(this.locationCoords.seconedRoute)

            //初始化第二段路径线的起点
            this.analyseLocationData(1);

            //导航开始
            this.changeCoord();
        },

        /**
         * 开始导航
         * */
        startNavi(obj) {

            if (!this.naviSwitch) {
                return;
            }

            //导航结束之后再次点击开始导航，需重新进行路线规划及模拟定位点
            if (this.naviStoped) {
                this.naviStoped = false;
                this.createNavi(naviRealPoints);
            }

            //导航开关为true且已经加载完locationMarker是可进行导航操作
            if (this.naviSwitch && this.locationMarker) {
                this.naviSwitch = false;
                this.coordIndex = 0;
                //切换聚焦楼层为起点开始楼层
                if (this.navi.startMarker.groupID !== map.focusGroupID) {
                    this.floorControl.changeFocusGroup(this.navi.startMarker.groupID, false);
                }
                //将定位点定位到起点楼层
                if (this.locationMarker.groupID != this.navi.startMarker.groupID) {
                    //设置locationMarker的位置
                    this.locationMarker.setPosition({
                        //设置定位点的x坐标
                        x: navi.startMarker.x,
                        //设置定位点的y坐标
                        y: navi.startMarker.y,
                        //设置定位点所在楼层
                        groupID: navi.startMarker.groupID
                    });
                }
                //获取地图开始导航前地图缩放比例
                this.startNaviScaleLevel = map.mapScaleLevel;
                //放大导航地图
                map.mapScaleLevel = {
                    level: this.naviScaleLevel,
                    duration: 0.5,
                    callback: function () {}
                };
                //禁用楼层切换控件
                this.floorControl.expand = false;
                this.floorControl.enableExpand = false;
                //将地图的倾斜角度缓动至
                map.tiltTo({
                    to: 80,
                    duration: 1
                });
                //导航开始
                this.changeCoord();

                // obj.classList.add('active');
            }
        },

        /**
         * 结束导航，重置导航开关参数
         * */
        stopNavi() {
            //修改导航状态
            this.naviSwitch = true;
            this.naviStoped = true;
            this.floorControl.enableExpand = true;
            //还原导航前地图缩放比例
            map.mapScaleLevel = {
                level: this.startNaviScaleLevel,
                duration: 0.5,
                callback: function () {}
            };
            clearTimeout(this.naviInt);
        },

        /**
         * 距离、时间信息展示
         * */
        setNaviDescriptions(data) {
            //距终点的距离
            var distance = data.remain;
            //路线提示信息
            var prompt = this.navi.naviDescriptions[data.index];
            if (distance < this.maxEndDistance) {
                var descriptionDom = document.getElementById('description');
                descriptionDom.innerHTML = '导航结束!';

                this.stopNavi();
                return;
            }
            //普通人每分钟走80米。
            var time = distance / 80;
            var m = parseInt(time);
            var s = Math.floor((time % 1) * 60);

            //距离终点距离、时间信息展示
            var descriptionDom = document.getElementById('description');
            descriptionDom.innerHTML = '<p>距终点：' + distance.toFixed(1) + ' 米</p><p>大约需要：  ' + m + '  分钟   ' + s +
                '   秒</p><p>路线提示：' + prompt + ' </p>';
            descriptionDom.style.display = 'block';
        },
        /**
     * 绘制线图层
     * fengmap.FMLineMarker为线图层，可包含很多条折线类FMSegment。
     * */
    drawLines2(results) {    
      console.log("打印rsults", results);
      //创建路径线图层
      var line = new fengmap.FMLineMarker();
      //循环results中坐标点集合，通过坐标点绘制路径线
      for (var i = 0; i < results.length; i++) {        
        var result = results[i];
        console.log(11111111111,result);
        var gid = result.groupId;
        var points = result.points        
        console.log(22222,points);
        //创建FMSegment点集，一个点集代表一条折线
        var seg = new fengmap.FMSegment();
        seg.groupId = gid;
        seg.points = points;
        //将FMSegment绘制到线图层上
        line.addSegment(seg);
        //   line.addTo(map)
        //配置第二条路径线的线型、颜色、线宽、透明度等
        var lineStyle = {
          //设置线的宽度
          lineWidth: 6,
          //设置线的类型
          lineType: fengmap.FMLineType.FMARROW,
          //设置线的颜色, 只支持修改非FMARROW线型的线的颜色
          color: "red",
        };
        //绘制线
        map.drawLineMark(line, lineStyle);
        this.xinaviLines.push(line);        
      }
    },
  }
};
</script>

<style>
@import "css/style.css";
</style>
