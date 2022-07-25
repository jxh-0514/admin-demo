<template>
<div id="app">
    <template>
        <el-container>
            <!-- 加载地图容器 -->
            <div id="fengMap" v-loading="loading"></div>

            <!--楼层切换组件-->
            <div id="btnsFloor" class="btnsFloor">
                <ul id="floors"></ul>
            </div>

            <!--工具控件，2D/3D切换-->
            <div id="btnsSwitch" class="btnsSwitch">
                <span @click="changeMode()" :is2dor3d="is2dor3d" :class="{'planar':is2dor3d}"></span>
            </div>

            <!--设置  是否显示搜索框-->
            <div id="queryconditions" class="queryconditions">
                <span @click="showQuery()" :isShow="isShow" :class="{'isshow':isShow}"></span>
            </div>

            <div id="tcquery" :class="{'istcquery':istcquery}">
                <div class="firdiv">
                    <!--时间-->
                    <el-date-picker
                            class="marg"
                            v-model="value2"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>

                    <!--查询姓名-->
                    <el-select
                            class="marg"
                            v-model="value"
                            filterable
                            allow-create
                            clearable
                            default-first-option
                            @focus="getallusers"
                            placeholder="请选择人员">
                        <el-option
                                v-for="item in options"
                                :key="item.USER_ID"
                                :label="item.USER_NAME"
                                :value="item.USER_ID">
                        </el-option>
                    </el-select>

                    <!--查询标签-->
                    <el-select
                            class="marg"
                            v-model="value3"
                            filterable
                            allow-create
                            clearable
                            default-first-option
                            @focus="getallLabels"
                            placeholder="请选择标签号">
                        <el-option
                                v-for="item in options2"
                                :key="item.LABEL_ID"
                                :label="item.LABEL_ID"
                                :value="item.LABEL_ID">
                        </el-option>
                    </el-select>

                    <el-button type="primary" @click="getMark">查询</el-button>

                    <el-button type="primary" @click="clearGroup">清除</el-button>

                    <el-button type="primary" style="margin-right: 12px;font-size: 18px"
                               :icon="isStart == false?'el-icon-video-pause':'el-icon-video-play'"
                               @click="stopStartUpdateLocation"></el-button>
                    <el-input-number v-model="isJiasu" :precision="2" :step="0.2" :min="0.5"
                                     :max="50"></el-input-number>
                </div>

                <div class="xias"
                     style="margin-top: 8px;display: flex;flex-direction: row;color: #fff;width: 100%;height: 40px">
                    <div class="ml">x坐标： <span>{{xx}}</span></div>
                    <div class="ml">y坐标： <span>{{yy}}</span></div>
                    <div class="ml">楼层： <span>{{gpid | gp}}</span></div>
                    <div class="ml">速度：<span>{{isJiasu}}</span></div>
                </div>
            </div>
        </el-container>
    </template>
</div>
</template>

<script>
import './js/fengmap.core.min.js'
import './js/fengmap.control.min.js'
import './js/fengmap.analyzer.min.js'
import './js/fengmap.navi.min.js'

// import './fmap2/js/fengmap.core.min.js'
// import './fmap2/js/fengmap.control.min.js'
// import './fmap2/js/fengmap.analyzer.min.js'
// import './fmap2/js/fengmap.navi.min.js'

// import '@/js/fengmap.map.min.js'
let map = ''
export default {
    nam: 'Fmap2',
    data() {
            return {
                // map: '',
                naviAnalyser: '',
                token: 'EDBEC0E8EE70E88E07EA3E68E',
                baseUrl: 'http://192.168.1.222:6678',

                floorid: [],

                is2dor3d: false,
                isShow: false,
                istcquery: false,


                markerMap: {},
                popMarkerMap: {},
                planarFlag: false,

                defaultFocusID: 1,

                loading: true,

                fmapID: '10347',

                props: {},

                // 查询
                options: [],
                value: [],

                // 标签
                options2: [],
                value3: [],

                // 时间
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value2: '',

                uuid: 1,
                im: '',

                zzbList: [],

                locationMarker: '',

                id: 0,
                mockdata: [],
                icallback: '',
                iupdate: '',
                iupdateInternal: '',
                ifreq: 1000,
                iindex: 0,

                linshi: '',

                isStart: false,

                isJiasu: 0.6,

                xx: '' || '---',
                yy: '' || '---',
                gpid: '',

                firdian: '',
                secdian: '',
                points3d: [],

                naviLines: [],
                line: '',
            }
        },
        filters: {
            gp(ev) {
                if (!ev) {
                    return '---'
                } else {
                    let g = ev - 1
                    return `F${g}`
                }

            }
        },
        mounted() {
            //获取版本号,设置title
            console.log('打印111',fengmap.VERSION);
            document.title = '测试demo楼层切换' + fengmap.VERSION
            this.openMap()
        },
        methods: {
            async getMark() {
                if (this.zzbList != null) {
                    this.zzbList.length = 0
                }

                // console.log(this.value, this.value2, this.value3)
                await axios.get(`${this.baseUrl}/Locationhis/GetPositionHisViewListByUserId?TOKEN=${this.token}
                                &USER_ID=${this.value}&STIME=${this.value2[0]}
                                &ETIME=${this.value2[1]}`)
                    .then(res => {
                        // console.log(res)
                        const {data: {code, rows}} = res
                        // console.log(rows)
                        if (code === 0) {

                            this.zzbList = rows
                            // console.log(this.zzbList)
                            //封装model对象
                            var target = {
                                mapCoord: rows[0].POSITION,
                                groupID: rows[0].MAP_ID,
                                uuid: this.uuid
                            };

                            this.isStart = false
                            map.focusGroupID = parseFloat(target.groupID)
                            //添加marker
                            this.addImageMarker(target);


                        }
                    })
            },
            // 加载所有标签卡
            async getallLabels() {
                this.options2.length = 0
                await axios.get(`${this.baseUrl}/Label/GetLabelList?TOKEN=${this.token}&page=${1}&size=${1000}`)
                    .then(res => {
                        const {data: {code, rows}} = res
                        // console.log(rows)
                        if (code === 0) {
                            this.options2 = rows
                        }
                    })
            },

            // 加载所有人
            async getallusers() {
                this.options.length = 0
                await axios.get(`${this.baseUrl}/User/GetUserList?TOKEN=${this.token}&page=${1}&size=${1000}`)
                    .then(res => {
                        const {data: {code, rows}} = res
                        if (code === 0) {
                            this.options = rows
                        }
                    })
            },

            // 渲染第一个点
            addImageMarker(target) {
                if (this.im == '') {

                    //获取当前聚焦楼层
                    var group = map.getFMGroup(this.lmap.focusGroupID);
                    let layers = group.getOrCreateLayer('imageMarker');

                    for (let i = 0, zl = this.zzbList; i < zl.length; i++) {
                        let dian = zl[i].POSITION.split(',')
                        this.mockdata.push({
                            x: parseFloat(dian[0]),
                            y: parseFloat(dian[1]),
                            groupid: parseFloat(zl[i].MAP_ID),
                            key: zl[i].ID,
                            z: 2
                        })
                    }
                    console.log(this.mockdata)

                    var lineStyle = {
                        //设置线的宽度
                        lineWidth: 6,
                        //是否开启平滑线功能
                        smooth: true,
                        //设置线的类型为导航线
                        lineType: fengmap.FMLineType.FMARROW,
                        //设置线动画,false为动画
                        noAnimate: true
                    };

                    // 点移动
                    this.updateLocation((data) => {
                        console.log(data, this.mockdata.splice(-1).key)
                        if (data === undefined) {
                            clearInterval(this.iupdate);
                            this.$notify.info({
                                title: '消息',
                                message: '轨迹回放结束',
                                type: 'success'
                            });
                            console.log('最后一个点了')
                            return false
                        }
                        if (this.firdian == '') {
                            this.firdian = data
                            this.secdian = this.firdian
                        } else {
                            if (this.firdian.key != data.key) {
                                this.secdian = this.firdian
                                this.firdian = data
                            }
                        }


                        let AL = []
                        AL.push({
                            groupId: data.groupid,
                            points: [
                                this.secdian, this.firdian,
                            ]
                        })
                        console.log(AL)
                        this.drawLines(AL, lineStyle);

                        //console.log(`当前点${JSON.stringify(this.firdian)}----上一个点${JSON.stringify(this.secdian)}`)

                        if (!this.im || this.im == '') {
                            this.im = new fengmap.FMLocationMarker({
                                x: data.x,
                                y: data.y,
                                groupID: data.groupid,
                                url: './images/ren-1.png',
                                size: 32,
                            });
                            //添加定位点marker
                            map.addLocationMarker(this.im);

                            this.xx = data.x.toFixed(1)
                            this.yy = data.y.toFixed(1)
                            this.gpid = data.groupid

                        } else {
                            console.log('2', data)

                            //移动locationMarker
                            this.im.moveTo({
                                x: data.x,
                                y: data.y,
                                time: this.isJiasu,
                            });

                            var currentGid = map.focusGroupID;
                            if (currentGid !== data.groupid) {

                                //重新设置聚焦楼层
                                this.scrollFloorControl.changeFocusGroup(data.groupid, false);

                                //设置locationMarker的位置
                                this.im.setPosition({
                                    x: data.x,
                                    y: data.y,
                                    groupID: data.groupid,
                                });


                            }

                            this.xx = data.x.toFixed(1)
                            this.yy = data.y.toFixed(1)
                            this.gpid = data.groupid

                        }


                    })
                } else{
                    this.$confirm('已经存在查询点，是否重置?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        clearInterval(this.iupdate);
                        this.clearGroup()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });

                }

            },


            drawLines(results, lineStyle) {
                this.line = new fengmap.FMLineMarker();
                //循环results中坐标点集合，通过坐标点绘制路径线
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var gid = result.groupId;
                    var points = result.points;
                    //创建FMSegment点集，一个点集代表一条折线
                    var seg = new fengmap.FMSegment();
                    seg.groupId = gid;
                    seg.points = points;
                    //将FMSegment绘制到线图层上
                    this.line.addSegment(seg);
                    //绘制线
                    map.drawLineMark(this.line, lineStyle);
                    this.naviLines.push(this.line);
                }
            },

            /**
             * 画导航线
             * https://www.fengmap.com/docs/js/v2.5.0/fengmap.FMNaviAnalyser.html
             * */
            drawNaviLine(coords, coords1) {

                //根据已加载的fengmap.FMMap导航分析，判断路径规划是否成功
                var analyzeNaviResult = this.naviAnalyser.analyzeNavi(coords1.groupid, coords1, coords.groupid, coords,
                    fengmap.FMNaviMode.MODULE_SHORTEST);
                if (fengmap.FMRouteCalcuResult.ROUTE_SUCCESS != analyzeNaviResult) {
                    return;
                }

                //获取路径分析结果对象，所有路线集合
                var results = this.naviAnalyser.getNaviResults();

                //初始化线图层
                var line = new fengmap.FMLineMarker();
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    //楼层id
                    var gid = result.groupId;
                    //路径线点集合
                    var points = result.getPointList();
                    console.log(points)
                    points.forEach(function (point) {
                        console.log(`x:${point.x}---y:${point.y}`)
                        this.points3d.push({
                            //x坐标点
                            'x': point.x,
                            //y坐标点
                            'y': point.y,
                            //线标注高度
                            'z': 0
                        });
                    });

                    /**
                     * fengmap.FMSegment点集，一个点集代表一条折线
                     * https://www.fengmap.com/docs/js/v2.5.0/fengmap.FMSegment.html
                     * */
                    var seg = new fengmap.FMSegment();
                    seg.groupId = gid;
                    seg.points = points3d;
                    line.addSegment(seg);
                }

                //配置线型、线宽、透明度等
                var lineStyle = {
                    //设置线的宽度
                    lineWidth: 6,
                    //设置线的透明度
                    alpha: 0.5,
                    //设置线的类型为导航线
                    lineType: fengmap.FMLineType.FMARROW,
                    //设置线动画,false为动画
                    noAnimate: true
                };

                //画线
                map.drawLineMark(line, lineStyle);
            },


            /**
             *  打开地图
             *  初始化参数，默认使用在线数据，从蜂鸟视图数据服务器加载模型数据
             */
            openMap() {
                let mapOptions = {
                    //必要，地图容器
                    container: document.getElementById('fengMap'),
                    //地图数据位置
                    mapServerURL: './data/' + this.fmapID,
                    //主题数据位置
                    mapThemeURL: './data/theme',
                    //设置主题
                    defaultThemeName: 'shtq',
                    modelSelectedEffect: false,
                    //是否对不可见图层启用透明设置 默认为true
                    defaultViewMode: fengmap.FMViewMode.MODE_3D,
                    focusAlphaMode: true,
                    //对不聚焦图层启用透明设置，当focusAlphaMode = true时有效
                    focusAlpha: 0.1,
                    //必要，地图应用名称，通过蜂鸟云后台创建
                    appName: '塘桥',
                    //必要，地图应用密钥，通过蜂鸟云后台获取
                    key: '290bc66a0262df68c7caad8f331b24c5',
                    // defaultMapScaleLevel: 21
                    // appName: "蜂鸟研发SDK_2_0",
                    // key: "57c7f309aca507497d028a9c00207cf8",
                    // mapID: "1321274646113083394",
                }

                //初始化地图对象                
                map = new fengmap.FMMap(mapOptions)
                console.log('初始化地图',map);

                //打开Fengmap服务器的地图数据和主题
                map.openMapById('10347', (error) => {
                    //打印错误信息
                    console.log('打印错误信息',error)
                })
                //地图加载完成事件
                console.log('地图加载时间完成');
                map.on('loadComplete', () => {
                    console.log('地图加载完成！')

                    this.naviAnalyser = new fengmap.FMNaviAnalyser(map);

                    //显示自定义控件按钮
                    document.getElementById('btnsFloor').style.display = 'block'
                    document.getElementById('btnsSwitch').style.display = 'block'
                    document.getElementById('queryconditions').style.display = 'block'

                    //加载滚动型楼层切换控件
                    this.loadScrollFloorCtrl()
                    this.loading = false
                    this.floorid = [this.defaultFocusID]
                })


                //聚焦楼层改变事件
                map.on('focusGroupIDChanged', (event) => {
                    console.log(event)
                })
                map.on('mapClickNode', (event) => {
                    //鼠标左右键点击事件
                    var buttonType = event.domEvent.button
                    if (buttonType === 0) {
                        console.log('左击')
                    } else if (buttonType === 2) {
                        console.log('右击')
                    }
                })
                //过滤是否可触发点击事件mapClickNode方法的地图元素，返回true为可触发
                map.pickFilterFunction = (event) => {
                    //如设置点击墙模型时不高亮
                    if (event.typeID === 300000) {
                        return false
                    }
                    return true
                }
            },

            /**
             * 加载滚动型楼层切换控件
             * 楼层控制控件配置参数
             */
            loadScrollFloorCtrl() {
                let scrollFloorCtlOpt = {
                    //默认在右上角
                    position: fengmap.FMControlPosition.RIGHT_TOP,
                    //初始楼层按钮显示个数配置。默认显示5层,其他的隐藏，可滚动查看
                    showBtnCount: 10,
                    //初始是否是多层显示，默认单层显示false
                    allLayer: false,
                    //是否显示多层/单层切换按钮
                    needAllLayerBtn: true,
                    //位置x,y的偏移量
                    offset: {
                        x: -10,
                        y: 60,
                    },
                }
                this.scrollFloorControl = new fengmap.FMScrollGroupsControl(
                    map,
                    scrollFloorCtlOpt
                )
                //楼层切换
                this.scrollFloorControl.onChange((groups, allLayer) => {
                    console.log(groups)
                    //groups 表示当前要切换的楼层ID数组,
                    //allLayer表示当前楼层是单层状态还是多层状态。
                    this.floorid = groups
                })
            }
            ,

            /**
             * 切换地图为三维模式
             */
            changeMode() {
                this.is2dor3d = !this.is2dor3d
                this.is2dor3d == false ?
                    (map.viewMode = fengmap.FMViewMode.MODE_3D) :
                    (map.viewMode = fengmap.FMViewMode.MODE_2D)
            }
            ,

            /**
             * 显示搜索框
             */
            showQuery() {
                this.isShow = !this.isShow
                this.istcquery = !this.istcquery
            },


            /**
             * 模拟更新位置，按照时间间隔更新位置信息。
             * @param {*} 回调函数
             */
            updateLocation(cb) {

                this.icallback = () => {
                    var idata;
                    if (this.iindex > this.mockdata.length - 1) {
                        this.iindex = 0;
                    }
                    idata = this.mockdata[this.iindex];
                    this.iindex++;
                    return cb(idata)
                };
                this.iupdate = setInterval(this.icallback, this.ifreq);
            },

            /**
             * 停止开始位置更新
             */
            stopStartUpdateLocation() {
                if (this.isStart == false) {
                    clearInterval(this.iupdate);
                    this.isStart = true
                } else {
                    this.iupdate = setInterval(this.icallback, this.ifreq);
                    this.isStart = false
                }

            },

            clearGroup() {
                clearInterval(this.iupdate);
                Object.assign(this.$data, this.$options.data())
                map.dispose();
                this.openMap();
            }

        },
}
</script>

<style>
@import 'css/trastyle.css';
.el-select__tags {
            top: 20% !important;
        }

        .el-cascader__dropdown {
            top: 45px !important;
        }

        .ml {
            width: 150px;
            height: 100%;
            line-height: 40px;
            font-size: 16px;
            font-weight: 500;
            margin-left: 12px;
        }

        .ml > span {
            font-size: 18px;
            color: #fff;
            font-weight: 600;
        }

        .fm-control-groups {
            right: 18px !important;
            top: 120px !important;
        }
</style>