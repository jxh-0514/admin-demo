<template>
  <el-container>
    <div id="fengMap"></div>

    <!--工具控件，2D/3D切换-->
    <!-- <div id="btnsSwitch" class="btnsSwitch">
      <span
        @click="changeMode()"
        :is2dor3d="is2dor3d"
        
      ></span>
    </div> -->

    <!-- 按钮组 -->
    <div id="btnsGroup" class="btnsGroup">
      <el-button class="ml-15" type="primary" @click="startNavi(this)"
        >开始导航</el-button
      >
      <el-button class="ml-15" type="primary" @click="pauseNavi(this)"
        >暂停/继续导航</el-button
      >
      <el-button class="ml-15" type="primary" @click="stopNavi(this)"
        >结束导航</el-button
      >
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
// import "./js/data.js";
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
      naviSimuPoints: [
        [
          { x: 12619599.4879, y: 2621862.5465, groupID: 1 },
          {x: 12619627.875452286, y: 2621835.8442346724, groupID: 1 },
          // { x: 12619629.8035, y: 2621861.1648, groupID: 4 }
        ],
        [
          {x: 12619627.875452286, y: 2621835.8442346724, groupID: 1},
          {x: 12619623.664385866, y: 2621890.395324006, groupID: 1}
        ]
        
      ],
    };
  },
  mounted() {
    console.log("fmap555");
    this.openMap();
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

        //加载楼层切换控件
        // initFloorControl();

        // // 地图加载完执行画导航路径
        // createNavi(naviSimuPoints);

        // document.getElementById("btnsSwitch").style.display = "block";
        this.loadScrollFloorCtrl();
        this.initFloorControl();

        // 地图加载完执行画导航路径
        // this.naviSimuPoints.forEach((item ,i) => {
        //   console.log('路线' + i,item);
        //   this.createNavi(item);
        // })

        this.createNavi(this.naviSimuPoints);
        

        map.on("mapClickNode", e => {
          var buttonType = e.domEvent.button;
          if (buttonType == 0) {
              console.log("左击", e);
          } else if (buttonType == 2) {
              console.log("右击", e);
          }
      })
      });
    },
    /**
     * 切换地图为三维模式
     */
    changeMode() {
      this.is2dor3d = !this.is2dor3d;
      this.is2dor3d == false
        ? (map.viewMode = fengmap.FMViewMode.MODE_3D)
        : (map.viewMode = fengmap.FMViewMode.MODE_2D);
    },
    // 加载滚动型楼层切换控件
    loadScrollFloorCtrl() {
      let toolCtlOpt = {
        position: fengmap.FMControlPosition.RIGHT_TOP,
        init2D: true,
        groupsButtonNeeded: false,
        viewModeButtonNeeded: true,
        offset: {
          x: -20,
          y: 20,
        },
        // 配置图片资源的路径地址
        imgURL: "../../static/images/",
      };
      let scrollFloorControl = new fengmap.FMToolControl(map, toolCtlOpt);
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
        //初始是否是多层显示，默认单层显示
        allLayer: false,
        //设置x,y的位置偏移量
        offset: {
          x: 20,
          y: 20,
        },
      };
      this.floorControl = new fengmap.FMButtonGroupsControl(map, floorCtlOpt);
    },
    //创建导航
    createNavi(coords) {
      if (!this.navi) {
        //初始化导航对象
        this.navi = new fengmap.FMNavigation({
          //地图对象
          map: map,
          //模拟导航定位图标行进的速度，单位m/s。默认5m/s。
          speed: 5,
          //导航结果文字描述内容的语言类型参数, 目前支持中英文。参考FMLanguaeType。
          naviLanguage: fengmap.FMLanguageType.ZH,
          //导航中路径规划模式, 支持最短路径、最优路径两种。默认为MODULE_SHORTEST, 最短路径。
          naviMode: fengmap.FMNaviMode.MODULE_SHORTEST,
          //导航中的路线规划梯类优先级, 默认为PRIORITY_DEFAULT, 详情参考FMNaviPriority。
          naviPriority: fengmap.FMNaviPriority.PRIORITY_DEFAULT,
          //设置起点或终点, 是否自动进行路径规划计算。默认为true
          //autoRoute: false,
          //起终点图片标注的与楼层之间的高度偏移设置。默认是6。
          imageMarkerHeight: 6,
          //导航图标
          locationMarkerUrl: pointerPic,
          // locationMarkerUrl: './images/pointer.png',
          //设置Marker尺寸
          locationMarkerSize: 43,
          //模拟导航时是否地图跟随,默认true
          followPosition: true,
          //模拟导航时是否改变地图角度，默认false
          followAngle: true,
          //是否在导航开始时改变地图的倾斜角度,默认为true
          changeTiltAngle: true,
          //导航跟随倾斜角度
          tiltAngle: 80,
          //模拟导航开始时地图的显示比例尺, 默认值为282,表示1:282的地图比例尺。对应比例尺级别21。
          scale: 282,
          //导航线与楼层之间的高度偏移设置。默认是1。
          lineMarkerHeight: 1,
          // 设置导航线的样式
          lineStyle: {
            // 导航线样式
            lineType: fengmap.FMLineType.FMARROW,
            // 设置线的宽度
            lineWidth: 6,
          },
        });
      }

      //添加起点
      coords.forEach( item => {
        this.navi.setStartPoint({
          x: item[0].x,
          y: item[0].y,
          groupID: item[0].groupID,
          url: startPic,
          // url: 'images/start.png',
          height: 2,
          size: 32,
        });

        //添加终点
        this.navi.setEndPoint({
          x: item[1].x,
          y: item[1].y,
          groupID: item[1].groupID,
          url: endPic,
          // url: './images/end.png',
          height: 2,
          size: 32,
        });
      })
      // this.navi.setStartPoint({
      //   x: coords[0].x,
      //   y: coords[0].y,
      //   groupID: coords[0].groupID,
      //   url: startPic,
      //   // url: 'images/start.png',
      //   height: 2,
      //   size: 32,
      // });

      // //添加终点
      // this.navi.setEndPoint({
      //   x: coords[1].x,
      //   y: coords[1].y,
      //   groupID: coords[1].groupID,
      //   url: endPic,
      //   // url: './images/end.png',
      //   height: 2,
      //   size: 32,
      // });

      //autoRoute为false时，设置完起点和终点后，需调用该方法进行路径规划计算
      //navi.route(fengmap.FMNaviMode.MODULE_BEST, fengmap.FMNaviPriority.PRIORITY_DEFAULT);

      // 画出导航线
      // this.navi.drawNaviLine();

      //变更前楼层id
      this.lastGroupID = map.focusGroupID;
      // 设置导航事件
      this.navi.on("walking", (data) => {
        this.setNaviDescriptions(data);
        if (this.lastGroupID !== data.groupID) {
          this.lastGroupID = data.groupID;
          //修改组建聚焦楼层
          this.floorControl.changeFocusGroup(data.groupID, false);
        }
      });

      //导航路径结束事件
      this.navi.on("complete", () => {
        this.navigation = true;
        //楼层控件可点击
        this.floorControl.enableExpand = true;
        this.resetBtnStatus();
        console.log("导航结束！");
      });

      //路径跨楼层事件
      this.navi.on("crossGroup", function (group) {
        console.log("跨楼层事件", group.groupId);
      });

      //显示导航按钮
      document.getElementById("btnsGroup").style.display = "block";
    },
    /**
     * 开始导航
     * */
    startNavi(obj) {
      console.log("1111111", obj);
      if (this.navigation && this.navi) {
        this.navigation = false;

        //导航开始
        this.navi.simulate();
        //楼层控件不可点击
        // this.floorControl.enableExpand = false;

        //设置按钮选中状态
        // this.resetBtnStatus();
        // obj.classList.add('active');
      }
    },
    /**
     * 暂停导航
     * */
    pauseNavi(obj) {
      if (this.navi == null || this.navigation) {
        return;
      }
      if (!this.isPause) {
        //暂停导航
        this.navi.pause();
        this.isPause = true;
      } else {
        //继续导航
        this.navi.resume();
        this.isPause = false;
      }

      //设置按钮选中状态
      // this.resetBtnStatus();
      // obj.classList.add('active');
    },
    /**
     * 结束导航
     * */
    stopNavi(obj) {
      if (this.navigation) {
        return;
      }
      if (this.navi) {
        this.navi.stop();
        this.navi.clearLocationMarker();
      }

      //设置按钮选中状态
      // this.resetBtnStatus();
      // obj.classList.add('active');

      //清空导航描述信息
      var descriptionDom = document.getElementById("description");
      descriptionDom.innerHTML = "";
      descriptionDom.style.display = "none";

      this.navigation = true;
      //楼层控件可点击
      this.floorControl.enableExpand = true;

      //重置地图的旋转角度和缩放级别
      map.rotateAngle = 0;
      map.mapScaleLevel = 20;
      map.tiltAngle = 30;
      map.moveToCenter();
      this.floorControl.changeFocusGroup(this.naviSimuPoints[0].groupID);
    },
    /**
     * 距离、时间信息展示
     * */
    setNaviDescriptions(data) {
      //距终点的距离
      var distance = data.remain;
      //路线提示信息
      var prompt = this.navi.naviDescriptions[data.index];

      if (distance < 1) {
        distance = 0;
        prompt = "到达终点";
      }

      //普通人每分钟走80米。
      var time = distance / 80;

      var m = parseInt(time);

      var s = Math.floor((time % 1) * 60);
      //距离终点距离、时间信息展示
      var descriptionDom = document.getElementById("description");
      descriptionDom.innerHTML =
        "<p>距终点：" +
        distance.toFixed(1) +
        " 米</p><p>大约需要：  " +
        m +
        "  分钟   " +
        s +
        "   秒</p><p>路线提示：" +
        prompt +
        " </p>";
      descriptionDom.style.display = "block";
    },
    /**
     * 移除其他按钮选中状态
     */
    resetBtnStatus() {
      var btnsDom = document.getElementById("btnsGroup").children;
      for (var i = 0; i < btnsDom.length; i++) {
        var btnDom = btnsDom[i];
        if (btnDom.classList.contains("active")) {
          btnDom.classList.remove("active");
        }
      }
    },
  },
};
</script>

<style>
@import "css/style.css";
</style>