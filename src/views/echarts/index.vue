<template>
  <div>

      <div class="panel panel-default" style="margin-bottom: 0;">
        <div class="panel-heading">
          <div class="fl" style="padding-top: 5px;">分析结果</div>
          <button type="submit" id="draw" class="fr btn  btn-default">开始分析</button>
          <button @click="changeClick" type="submit" class="fr btn  btn-default">切换数据</button>
        </div>
        <div class="panel-body">
          <div class="ecg-canvas main1">
            <div class="chart" id="main2" style="-webkit-tap-highlight-color: transparent; user-select: none; width: 826px; height: 750px; position: relative;" _echarts_instance_="ec_1657590807769"><div style="position: relative; overflow: hidden; width: 826px; height: 750px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
              <canvas data-zr-dom-id="zr_0" width="826" height="750" style="position: absolute; left: 0px; top: 0px; width: 826px; height: 750px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
            </div><div></div></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import echarts from "echarts";
import aaa from "./json/124.json"
export default {
    data(){
      return {
          aaa:aaa,
          bbb:aaa,
          id:"1102211704040149076642981-100",
          myChart:null,
      }
    },
    mounted(){
      this.init()
    },
    methods:{
        init(){
          // document.getElementById("main2").removeAttribute("_echarts_instance_")
          this.myChart = echarts.init(document.getElementById("main2"))
          this.changeEcg('1101211708240758488438100-100',this.myChart)
        },
        changeClick(){
          this.diags(this.bbb,this.myChart)
        },
        changeEcg(id,myChart){
        
            this.myChart.showLoading({
                text: '数据正在努力加载...',
                textStyle: { fontSize : 30 , color: '#444' },
                effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
              });

              // console.log(this.aaa,this.aaa.sampleRate);
              // setTimeout(()=>{
                // this.aaa = null
                // this.aaa = this.bbb
                 this.diags(this.aaa,this.myChart)
              // },1000)
             
        },
        diags(ecgData,myChart){
            if(ecgData.result){
              this.chart(ecgData,ecgData.result,this.myChart)
              return false
            }
        } ,


        chart(ecgData,diagsResult,myChart){
            var xData = new Array();
            var colorArr = ["#ff0000","#0000ff","#008000","#ffff00","#9e9e9e"]
            var gridSize = 3;//每小格大小
            var adcGain = parseInt(ecgData.adcGain);//增益
            var adcZero = parseInt(ecgData.adcZero);//零点电压
            var sampleRate = parseInt(ecgData.sampleRate)//采样率
            var interval = sampleRate/25//网格分割数（每秒25个网格）
            var ecgDataLength = ecgData.rawDigitalEcgSignal[0].length
            diagsResult = diagsResult||{}
            var mydate = new Date();
            var diagstime = mydate.getFullYear() + '-' + (mydate.getMonth() + 1) + '-' + mydate.getDate() + " " +mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds();

            //插入前后空数据和标尺
            for (var i = 0; i < 12; i++) {
              if(i>=ecgData.rawDigitalEcgSignal.length){
                ecgData.rawDigitalEcgSignal.push([ecgData.rawDigitalEcgSignal[0][0]-1.5*i*adcGain])
              }
              //插入后面的空格
              for (var j = sampleRate*0.4; j >= 0; j--) {
                ecgData.rawDigitalEcgSignal[i].push(null);
              };  
              //插入标尺
              for (var j = 0; j < sampleRate*0.3; j++) {
                if(j>sampleRate*0.1 && j<sampleRate*0.2){
                  //1毫伏位置
                  ecgData.rawDigitalEcgSignal[i].unshift(adcZero+1*adcGain);
                }else{
                  //零点位置
                  ecgData.rawDigitalEcgSignal[i].unshift(adcZero);
                }
              };
              //插入前面的空格
              for (var j = sampleRate*0.3; j >= 0; j--) {
                ecgData.rawDigitalEcgSignal[i].unshift(null);
              };    
            };
  
            //平移构造数据
            for (var i = 0; i < 12; i++) {
              for (var k = ecgData.rawDigitalEcgSignal[i].length - 1; k >= 0; k--) {
                if(ecgData.rawDigitalEcgSignal[i][k] === null){
                  ecgData.rawDigitalEcgSignal[i][k] = [k,null];
                }else{
                  ecgData.rawDigitalEcgSignal[i][k] = [k,ecgData.rawDigitalEcgSignal[i][k]-adcZero-1.5*i*adcGain];
                }
              };
            };
            if(ecgData.rawDigitalEcgSignal[0].length>ecgDataLength) ecgDataLength = ecgData.rawDigitalEcgSignal[0].length
      
            var xAxisLen = ecgDataLength/sampleRate;//x轴显示秒数
            //x轴数据
            // for (var i = (xAxisLen+1)*sampleRate - 1; i >= 0; i--) {
            //  xData[i] = Math.ceil(i*(1/sampleRate));
            // };
            // console.log(ecgData);
            var gridWidth = parseInt(xAxisLen*gridSize*25)//画布宽度
                $(".chart").css("width",gridWidth+"px");
                $(".chart").css("height",(gridSize*250)+"px");

            //处理标记点
            var markData1,markData2,markData3,markData4,markData5,markData6,markData7,markData8,markData9,markData10,markData11,markData12 = [];
            markData1 = [{
              name:"I",
                value:"I",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*0*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.6,//x轴  
            },
            {
              name:"title",
                value:"人工智能心电图报告单",//标注值
                yAxis: 3.1*adcGain,
                xAxis: sampleRate*5,//x轴 
                label:{
                  fontWeight:200,
                  fontSize:18
                },
            },
            {
              name:"病区",
                value:"病区：",//标注值
                yAxis: 2.6*adcGain,
                xAxis: sampleRate*0.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"床号",
                value:"床号：",//标注值
                yAxis: 2.6*adcGain,
                xAxis: sampleRate*7.5,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"检查时间",
                value:"检查时间："+diagstime,//标注值
                yAxis: 2.6*adcGain,
                xAxis: sampleRate*8.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"姓名",
                value:"姓名：",//标注值
                yAxis: 2.1*adcGain,
                xAxis: sampleRate*0.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"年龄",
                value:"年龄：",//标注值
                yAxis: 2.1*adcGain,
                xAxis: sampleRate*2.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"Qt",
                value:"Qt："+(diagsResult.avgQt?diagsResult.avgQt:"-")+"ms",//标注值
                yAxis: 2.1*adcGain,
                xAxis: sampleRate*4.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"Qtc",
                value:"Qtc："+(diagsResult.avgQtc?diagsResult.avgQtc:"-")+"ms",//标注值
                yAxis: 2.1*adcGain,
                xAxis: sampleRate*6.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"P-R",
                value:"P-R："+(diagsResult.prIntervals?diagsResult.prIntervals:"-")+"ms",//标注值
                yAxis: 1.6*adcGain,
                xAxis: sampleRate*4.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"心率",
                value:"心率："+(diagsResult.avgHr?diagsResult.avgHr:"-")+"bpm",//标注值
                yAxis: 2.1*adcGain,
                xAxis: sampleRate*8.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"性别",
                value:"性别：",//标注值
                yAxis: 1.6*adcGain,
                xAxis: sampleRate*0.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"住院号",
                value:"住院号：",//标注值
                yAxis: 1.6*adcGain,
                xAxis: sampleRate*2.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"QRS",
                value:"QRS："+(diagsResult.avgQrs?diagsResult.avgQrs:"-")+"ms",//标注值
                yAxis: 1.6*adcGain,
                xAxis: sampleRate*6.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"纸速",
                value:"纸速：25mm/s 灵敏度：10mm/mv",//标注值
                yAxis: 1.1*adcGain,
                xAxis: sampleRate*7,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"诊断结论",
                value:"诊断结论:",//标注值
                yAxis: 0-1.5*11.5*adcGain,
                xAxis: sampleRate*0.6,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            // {
            //  name:"结论",
          //      value:"1、窦性心律",//标注值
          //      yAxis: 0-1.5*11.5*adcGain-0.4*adcGain*1,
            //     xAxis: sampleRate*1,//x轴 
            //     label:{
            //      position:['0%', '50%'],
          //        fontWeight:100,
          //        fontSize:14
          //      },
            // },
            {
              name:"报告医师",
                value:"报告医师：",//标注值
                yAxis: 0-1.5*12*adcGain,
                xAxis: sampleRate*8.4,//x轴 
                label:{
                  position:['0%', '50%'],
                  fontWeight:100,
                  fontSize:14
                },
            },
            {
              name:"报告医师",
                value:"心之声",//标注值
                yAxis: 0-1.5*11.98*adcGain,
                xAxis: sampleRate*9.3,//x轴
                label:{
                  position:['0%', '50%'],
                  fontWeight:600,
                  fontFamily:"Microsoft YaHei",
                  fontStyle:"oblique",
                  fontSize:16
                },
            },
            ]
            //诊断结果
            if(diagsResult.diags){
              for (var i = diagsResult.diags.length - 1; i >= 0; i--) {
                var result = {
                  name:"结论",
                    value:(i+1)+"、"+diagsResult.diags[i],//标注值
                    yAxis: 0-1.5*11.5*adcGain-0.5*adcGain*(i+1),
                    xAxis: sampleRate*1,//x轴 
                    label:{
                      position:['0%', '50%'],
                      fontWeight:100,
                      fontSize:14
                    }
                }
                markData1.push(result);

              };
            }
        
            markData2 = [{
              name:"II",
                value:"II",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*1*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.6,//x轴  
            }]
            markData3 = [{
              name:"III",
                value:"III",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*2*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.6,//x轴  
            }]
            markData4 = [{
              name:"aVR",
                value:"aVR",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*3*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData5 = [{
              name:"aVL",
                value:"aVL",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*4*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData6 = [{
              name:"aVF",
                value:"aVF",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*5*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData7 = [{
              name:"V1",
                value:"V1",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*6*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData8 = [{
              name:"V2",
                value:"V2",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*7*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData9 = [{
              name:"V3",
                value:"V3",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*8*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData10 = [{
              name:"V4",
                value:"V4",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*9*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData11 = [{
              name:"V5",
                value:"V5",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*10*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            markData12 = [{
              name:"V6",
                value:"V6",//标注值
                label:{
                  fontWeight:100,
                  fontSize:16
                },
                yAxis: 0-1.5*11*adcGain+0.6*adcGain,
                xAxis: sampleRate*0.65,//x轴  
            }]
            var option = {
                  animationThreshold:'∞',
                  backgroundColor:"#ffffff",
                  tooltip: {
                      show:false
                  },
                  legend: {
                      show:false
                  },
                  grid:{
                      show:true,
                      x: '0%',
                      y: '0%',
                      width: '100%', height: '100%',
                      // left:"50px",
                      // right:"30",
                      // top :'40px',
                      backgroundColor: "#ffffff",
                      color: "rgba(249, 125, 153, 1)"
                  },             
                  xAxis:  {
                      type: 'value',
                      // scale :true,
                      position :'top',
                      boundaryGap: false,
                      splitLine:{
                        show:true,
                        // interval :function(index,value){
                        //  return (index+1)%interval==0 || index == 0?true:false;
                        // } ,
                        lineStyle:{
                          color: ["rgba(249, 125, 153, 1)","rgba(249, 125, 153, 0.5)","rgba(249, 125, 153, 0.5)","rgba(249, 125, 153, 0.5)","rgba(249, 125, 153, 0.5)"]
                        }
                      },
                      axisLine:{
                        onZero :false,
                        show:false,
                        lineStyle:{
                          color:"#ffffff"
                        }
                      },
                      axisTick:{
                        show:false,
                        // interval :(index, value) => ((index+1)%sampleRate==0 || index == 0?true:false),
                        interval :function(index, value){
                          return (index+1)%sampleRate==0 || index == 0?true:false;
                        },
                        // inside :true,
                        lineStyle:{
                          color:"#ffffff"
                        }

                      },
                      axisLabel:{
                        show:false,
                        // interval :(index, value) => ( (index+1)%sampleRate==0  || index == 0?true:false),
                        interval:function(index, value){
                          return (index+1)%sampleRate==0  || index == 0?true:false;
                        },
                        // inside :true,
                        textStyle:{
                          color:"#000"
                        },
                        formatter: function(index, value){
                          return index+"s"
                        }
                      },
                      min:'dataMin',
                      max:'dataMax',
                      splitNumber:xAxisLen*25,
                      // interval :interval,
                      // data: xData
                  },
                  yAxis: {
                      scale :true,
                      splitNumber:250,
                      splitLine:{
                        show:true,
                        // interval :99,
                        lineStyle:{
                          color: ["rgba(249, 125, 153, 1)","rgba(249, 125, 153, 0.5)","rgba(249, 125, 153, 0.5)","rgba(249, 125, 153, 0.5)","rgba(249, 125, 153, 0.5)"]
                        }
                      },
                      axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                      },
                    axisLabel:{
                      show:false
                    },
                    type:"value",
                    min:-20.5*adcGain,
                    max:4.5*adcGain
                    // interval: 10
                  },
                  series: [
                      {
                          type:'line',
                          clipOverflow:false,
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData1
                          },
                          data:ecgData.rawDigitalEcgSignal[0]?ecgData.rawDigitalEcgSignal[0]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData2
                          },
                          data:ecgData.rawDigitalEcgSignal[1]?ecgData.rawDigitalEcgSignal[1]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData3
                          },
                          data:ecgData.rawDigitalEcgSignal[2]?ecgData.rawDigitalEcgSignal[2]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData4
                          },
                          data:ecgData.rawDigitalEcgSignal[3]?ecgData.rawDigitalEcgSignal[3]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData5
                          },
                          data:ecgData.rawDigitalEcgSignal[4]?ecgData.rawDigitalEcgSignal[4]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData6
                          },
                          data:ecgData.rawDigitalEcgSignal[5]?ecgData.rawDigitalEcgSignal[5]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData7
                          },
                          data:ecgData.rawDigitalEcgSignal[6]?ecgData.rawDigitalEcgSignal[6]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData8
                          },
                          data:ecgData.rawDigitalEcgSignal[7]?ecgData.rawDigitalEcgSignal[7]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData9
                          },
                          data:ecgData.rawDigitalEcgSignal[8]?ecgData.rawDigitalEcgSignal[8]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData10
                          },
                          data:ecgData.rawDigitalEcgSignal[9]?ecgData.rawDigitalEcgSignal[9]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData11
                          },
                          data:ecgData.rawDigitalEcgSignal[10]?ecgData.rawDigitalEcgSignal[10]:[]
                      },
                      {
                          type:'line',
                          lineStyle:{
                            normal:{
                              color: "rgba(0, 0, 0, 0.6)"
                            }
                          },
                          showSymbol :false,
                          markPoint:{//标记点
                            symbolSize:50,
                            symbol:"rect",//标记形状
                            itemStyle:{
                              color:"rgba(128, 128, 128, 0)",
                            },
                            label :{
                              show:true,
                              color:"#000",
                              position :"inside"
                            },
                            data:markData12
                          },
                          data:ecgData.rawDigitalEcgSignal[11]?ecgData.rawDigitalEcgSignal[11]:[]
                      }
                  ]
            };
            // setTimeout(()=>{
              // debugger;
              this.myChart.setOption(option,false);
              this.myChart.resize({width:gridWidth});
              this.myChart.hideLoading();
            // },5000)
            
            // $("#loadingModal").modal('hide')

        }


   }
}
</script>

<style scoped>
body {
  font-family:"Hiragino Sans GB","华文细黑","STHeiti","微软雅黑","Microsoft YaHei",SimHei,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
  color: #9fa1a4;
  line-height: 1.5;
  overflow-x: hidden;
}
  .fl{
    float: left;
  }
  .fr{
    float:right;
  }
  .container {
    width: 1200px;
    margin: 60px auto;
  }
  .panel-body {
    padding: 20px;
  }
  .form-group{
    margin-bottom: 0;
  }
  .form-control,.input-group-addon{
    font-size: 18px;
  }
  .parameter .input-group {
    width: 200px;
  }
  .parameter .input-group-addon{
    background-color: #fff;
    border: none;
    padding-left: 5px;
    padding-right: 5px;
  }
  .panel-default>.panel-heading{
    background-color: #fff;
    line-height: 1;
    padding: 22px;
    font-size: 30px;
  }
  .parameter .form-control{
    border-radius: 4px !important;
  }
  .panel-heading{
    overflow: hidden;
  }
  .ecg-data .form-group{
    width: 385px;
  }
  .ecg-data .form-group .form-control{
    font-size: 12px;
    height: 44px;
    padding: 12px;
    color: #ee6600;
    border-radius: 0px !important;
  }
  .ecg-data .input-group-addon{
    background-color: #ee6600;
    color: #fff;
  }
  .ecg-data .input-group-addon{
    border-color: #ee6600;
  }
  .ecg-data .form-control{
    border-color: none;
  }
  .ecg-data select.form-control{
    border-color: #ee6600;
  }
  .ecg-data span{
    font-size: 12px;
    color: #ee6600;
    margin-left: 10px;
  }
  .ecg-data textarea{
    font-size: 14px;
  }
  .btn{
    font-size: 18px;
    color: #ee6600;
    border-color: #ee6600;
  }
  .btn:hover,.btn:active,.btn:focus{
    color: #fff !important;
    background-color: #ee6600 !important;
    box-shadow: none !important;
  }
  .ecg-canvas{
    width: 100%;
    height: auto;
    min-height: 750px;
    margin: 0;
    overflow-x:scroll;
	position: relative;
  }
  .ecg-canvas::-webkit-scrollbar  
{  
    width: 20px;  
    height: 6px;  
    background-color: #414141;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
.ecg-canvas::-webkit-scrollbar-track  
{  
    background-color: #b3b3b3;  
}  
  
/*定义滑块 内阴影+圆角*/  
.ecg-canvas::-webkit-scrollbar-thumb  
{  
    background-color: #414141;  
}
  .chart{
    margin: 0 auto;
  }
</style>