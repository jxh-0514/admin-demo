(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7656b183"],{2186:function(t,e,a){t.exports=a.p+"static/img/gdjx.f908671b.png"},"332c":function(t,e,a){"use strict";function i(t,e,a,i){var n=0;if(t/e>=a/i)if(t>a){var h=t/a;n=h>1.4?-Math.round(h-1):-Math.round(h),console.log("1111-----",n,h)}else{var r=a/t;n=r>1.4?-Math.round(r-1):-Math.round(r),console.log("2222-----",n,r)}else if(e>i){var s=e/i;n=-Math.round(s-1),console.log("33333-----",n,s)}else{var o=i/e;n=-Math.round(o-1),console.log("4444-----",n,o)}return n}a.d(e,"a",(function(){return i}))},"4a9b":function(t,e,a){var i=a("74e8");i("Float64",(function(t){return function(e,a,i){return t(this,e,a,i)}}))},"8a59":function(t,e,a){var i=a("74e8");i("Uint8",(function(t){return function(e,a,i){return t(this,e,a,i)}}),!0)},"94dc":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{attrs:{id:"map"}})])}],h=(a("d3b7"),a("25f0"),a("e11e")),r=a.n(h);a("6cc5"),a("332c"),a("ace4"),a("cfc3"),a("907a"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("fa9e"),a("77d9"),a("8a59"),a("4a9b"),a("ac1f"),a("466d");function s(t){if(this.canvas="string"==typeof t?document.getElementById(t):t,null==this.canvas)return null;this._createWorker(),this.width=this.canvas.width,this.height=this.canvas.height,this.onRenderingStart=null,this.onRenderingEnd=null,this.data={},this.value=null,this._valueWidth=null,this._valueHeight=null}s.prototype.resize=function(t,e){this.width=this.canvas.width=t,this.height=this.canvas.height=e,this.canvas.style.width=t+"px",this.canvas.style.height=e+"px"},s.prototype.push=function(t,e,a){if(!(t<0||t>=this.width)&&!(e<0||e>=this.height)){var i=t+e*this.width;this.data[i]?this.data[i]=this.data[i]+a:this.data[i]=a}},s.prototype.render=function(t,e,a){if(t=t||1,e=e||s.LINEAR,!(this.width<=0||this.height<=0)){this._runCounter>0&&(this.worker.terminate(),this._createWorker()),this._runCounter++;var i=this;this.worker.onmessage=function(t){i._runCounter--,i.value=t.data.value,i._valueWidth=t.data.width,i._valueHeight=t.data.height,i.data={},i._render(a),i.onRenderingEnd&&i.onRenderingEnd()};var n={data:this.data,width:this.width,height:this.height,step:t,degree:e,value:this.value};this.worker.postMessage(n),this.onRenderingStart&&this.onRenderingStart()}},s.prototype._paletteSize=512,s.prototype._defaultPalette=null,s.prototype._createWorker=function(){console.log("123123-------",s.getPath()),this.worker=new Worker(s.getPath()+"heatcanvas-worker.js"),this._runCounter=0},s.prototype._render=function(t){var e;if(t)e=function(e){return s.hsla2rgba.apply(null,t(e))};else{this._ensureDefaultPalette(),t=s.defaultValue2Color;var a=this;e=function(t){return a._defaultPalette[Math.round(t*a._paletteSize)]}}if(!(this.width<=0||this.height<=0)){var i=this.canvas.getContext("2d");i.clearRect(0,0,this.width,this.height);for(var n=this.bgcolor||[0,0,0,255],h=i.createImageData(this.width,this.height),r=0;r<h.data.length;r+=4)h.data[r]=n[0],h.data[r+1]=n[1],h.data[r+2]=n[2],h.data[r+3]=n[3];if(this.value instanceof Float32Array&&this.width==this._valueWidth&&this.height==this._valueHeight){var o=this.value.length;if(o==this._valueWidth*this._valueHeight){for(var l=0,d=0;d<o;d++)this.value[d]>l&&(l=this.value[d]);for(var u=0,c=0;u<o;u++,c+=4){var p=e(this.value[u]/l);h.data[c]=p[0],h.data[c+1]=p[1],h.data[c+2]=p[2],h.data[c+3]=p[3]}i.putImageData(h,0,0)}else console.error("HeatCanvas: inconsistent data w*h != len",this._valueWidth,this._valueHeight,"!=",o)}}},s.prototype.clear=function(){this.data={},this.value=null,this.canvas.getContext("2d").clearRect(0,0,this.width,this.height)},s.prototype.exportImage=function(){return this.canvas.toDataURL()},s.prototype._ensureDefaultPalette=function(){if(this._defaultPalette&&this._defaultPalette.length==this._paletteSize+1)return this;for(var t=[],e=0;e<=this._paletteSize;e++){var a=s.hsla2rgba.apply(null,s.defaultValue2Color(e/this._paletteSize));t[e]=new Uint8ClampedArray(4),t[e][0]=a[0],t[e][1]=a[1],t[e][2]=a[2],t[e][3]=a[3]}return this._defaultPalette=t,this};var o=new Float64Array(4);o[1]=.8,o[3]=1,s.defaultValue2Color=function(t){return o[0]=1-t,o[2]=.6*t,o};var l=new Uint8ClampedArray(4);s.hsla2rgba=function(t,e,a,i){var n,h,r;if(0==e)n=h=r=a;else{var s=function(t,e,a){return a<0&&(a+=1),a>1&&(a-=1),a<1/6?t+6*(e-t)*a:a<.5?e:a<2/3?t+(e-t)*(2/3-a)*6:t},o=a<.5?a*(1+e):a+e-a*e,d=2*a-o;n=s(d,o,t+1/3),h=s(d,o,t),r=s(d,o,t-1/3)}return l[0]=255*n,l[1]=255*h,l[2]=255*r,l[3]=255*i,l},s.LINEAR=1,s.QUAD=2,s.CUBIC=3,s.getPath=function(){for(var t=document.getElementsByTagName("script"),e=0;e<t.length;e++){var a=t[e].src,i=a.match(/heatcanvas(-[a-z0-9]{32})?\.js/),n=i?i.index:0;if(n>0)return a.substring(0,n)}return""};a("d81d");console.log("引入heatcanvas-leaflet"),L.TileLayer.HeatCanvas=L.Layer.extend({initialize:function(t,e){L.Util.setOptions(this,t),this.heatCanvasOptions=e,this.data=[],this._onRenderingStart=null,this._onRenderingEnd=null},onRenderingStart:function(t){this._onRenderingStart=t},onRenderingEnd:function(t){this._onRenderingEnd=t},onAdd:function(t){this.map=t,this._initHeatCanvas(this.map,this.heatCanvasOptions),t.on("moveend",this._redraw,this),t.on("resize",this._resize,this),this._redraw()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._div),t.off("resize",this._resize,this),t.off("moveend",this._redraw,this)},_initHeatCanvas:function(t,e){e=e||{},this._step=e.step||1,this._degree=e.degree||s.LINEAR,this._opacity=e.opacity||.6,this._zIndex=e.zIndex||null,this._colorscheme=e.colorscheme||null;var a=this.map.getSize(),i=L.DomUtil.create("div","leaflet-heatmap-container");i.style.position="absolute",i.style.width=a.x+"px",i.style.height=a.y+"px",null!=this._zIndex&&(i.style.zIndex=this._zIndex);var n=document.createElement("canvas");n.width=a.x,n.height=a.y,n.style.width=n.width+"px",n.style.height=n.height+"px",n.style.opacity=this._opacity,i.appendChild(n),this.heatmap=new s(n),this.heatmap.onRenderingStart=this._onRenderingStart,this.heatmap.onRenderingEnd=this._onRenderingEnd,this.heatmap.bgcolor=e.bgcolor||null,this._div=i,this.map.getPanes().overlayPane.appendChild(this._div)},pushData:function(t,e,a){this.data.push({lat:t,lon:e,v:a})},_resetCanvasPosition:function(){var t=this.map.getBounds(),e=this.map.latLngToLayerPoint(t.getNorthWest());L.DomUtil.setPosition(this._div,e)},_redraw:function(){this._resetCanvasPosition(),this.heatmap.clear();var t=this.map.getSize();if(this.data.length>0&&t.x>0&&t.y>0){for(var e=0,a=this.data.length;e<a;e++){var i=new L.LatLng(this.data[e].lat,this.data[e].lon),n=this.map.latLngToLayerPoint(i);n=this.map.layerPointToContainerPoint(n),this.heatmap.push(Math.floor(n.x),Math.floor(n.y),this.data[e].v)}this.heatmap.render(this._step,this._degree,this._colorscheme)}return this},_resize:function(){var t=this.map.getSize();this._div.style.width=t.x+"px",this._div.style.height=t.y+"px",this.heatmap.resize(t.x,t.y)},clear:function(){this.heatmap&&this.heatmap.clear(),this.data=[]},redraw:function(){this._redraw()}}),L.TileLayer.heatcanvas=function(t,e){return new L.TileLayer.HeatCanvas(t,e)};L.TileLayer.heatcanvas;var d={name:"",components:{},props:{},data:function(){return{map:null,bounds:[[0,0],[697,542]],center:[350,270],crs:r.a.CRS.Simple,mapUrl:a("2186"),windowWidth:"",windowHeight:"",imageOverLay:null}},computed:{},watch:{},beforeDestroy:function(){},created:function(){this.windowWidth=document.documentElement.clientWidth-240||document.body.clientWidth-240,this.windowHeight=document.documentElement.clientHeight-50||document.body.clientHeight-50},mounted:function(){this.init()},methods:{init:function(){var t=new r.a.Map("map"),e=new r.a.LayerGroup,a="http://{s}.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/997/256/{z}/{x}/{y}.png",i="Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade",n=new r.a.TileLayer(a,{maxZoom:18,attribution:i});t.addLayer(n),t.setView(new r.a.LatLng(40,-90),3),console.log("插件--------",r.a.TileLayer.HeatCanvas,"HeatCanvas------",s);for(var h=new r.a.TileLayer.HeatCanvas({},{step:.5,degree:s.LINEAR,opacity:.7}),o=[[40.71455,-74.007124,103],[37.777125,-122.419644,86],[47.60356,-122.329439,41],[51.506325,-.127144,40],[41.88415,-87.632409,40],[43.64856,-79.385324,36],[32.715695,-117.161719,29],[30.267605,-97.742984,26],[49.26044,-123.114034,25],[44.572195,-116.676054,24],[34.05349,-118.245319,22],[42.358635,-71.056699,20],[35.868436,-92.120663,19],[39.90601,116.387909,17],[45.511795,-122.675629,17],[48.85693,2.3412,16],[39.76486,-99.031824,16],[31.247709,121.472618,15],[45.512293,-73.554407,15],[52.37312,4.893195,15],[33.748315,-84.391109,15],[29.76045,-95.369784,14],[37.371612,-122.038258,14],[-33.869629,151.206955,13],[44.979035,-93.264929,12],[59.33228,18.06284,12],[40.438335,-79.997459,11],[39.95227,-75.162369,11],[48.136415,11.577531,11],[32.0485,118.778969,11],[12.97092,77.60482,10],[40.01574,-105.279239,10],[37.44466,-122.160794,10],[34.011565,-118.492289,10],[48.202548,16.368805,9],[38.725735,-9.15021,9],[51.490299,-.1193,9],[52.516074,13.376987,9],[60.17116,24.93258,9],[38.89037,-77.031959,9],[-34.608521,-58.373539,9],[30.252501,120.165024,9],[55.75695,37.614975,9],[-37.817532,144.967148,9],[37.338475,-121.885794,8],[37.869885,-122.270539,8],[41.385589,2.168745,8],[50.112065,8.683415,8],[1.29378,103.853256,8],[36.45106,-93.189394,8],[48.112955,-105.196669,7],[32.056915,-87.588184,7],[35.2225,-80.837539,7],[39.106614,-84.504552,7],[32.045101,34.769711,7],[39.96196,-83.002984,7],[41.674498,-72.94619,7],[38.959374,-77.354571,7],[13.06397,80.24311,7],[53.34807,-6.248274,7],[44.27257,-121.175874,7],[39.74001,-104.992259,7],[29.42449,-98.494624,6],[40.4203,-3.705774,6],[36.979335,-85.610864,6],[32.778155,-96.795404,6],[-23.56288,-46.654659,6],[38.62774,-90.199514,6],[37.355509,-121.954262,6],[37.31884,-122.029244,6],[45.4215,-75.691894,6],[44.572195,-116.676054,6],[22.546789,114.112556,6],[35.14968,-90.048929,6],[55.954155,-3.202774,6],[28.15235,-82.461504,6],[33.44826,-112.075774,6],[37.484175,-122.227102,5],[37.805065,-122.273024,5],[42.292435,-85.601114,5],[43.462285,-114.259909,5],[59.91228,10.74998,5],[53.553345,9.992455,5],[47.37706,8.53955,5],[64.147415,-21.933989,5],[39.76691,-86.149964,5],[55.67631,12.569355,5],[37.54703,-122.314834,5],[34.147235,-118.144264,5],[44.434295,26.102965,5],[34.705885,-86.750953,5],[43.588285,-79.643724,5],[37.97615,23.736415,5],[25.728985,-80.237419,5],[26.12367,-80.143564,5],[45.80726,15.9676,5],[49.01076,8.408695,5],[44.831202,-93.062803,5],[35.59846,-82.553144,5],[32.822254,-88.15826,5],[3.104665,101.69117,5],[51.04522,-114.063014,4],[33.520295,-86.811504,4],[42.333473,-71.120476,4],[45.468945,9.18103,4],[61.497815,23.762265,4],[-22.909049,-47.064594,4],[53.409773,-2.978481,4],[48.428315,-123.364514,4],[45.759399,4.82897,4],[34.419255,-119.698869,4],[50.637185,3.06281,4],[40.1142,-88.243499,4],[22.283319,114.158722,4],[44.76562,-93.27419,4],[-27.46888,153.022827,4],[33.603865,-86.119529,4],[38.895514,-77.225165,4],[37.90118,-122.061628,4],[42.237393,-72.72549,4],[30.67,104.071022,4],[51.10805,17.026703,4],[39.11338,-94.626824,4],[42.281875,-83.748479,4],[4.65637,-74.11779,4],[19.076191,72.875877,4],[23.107389,113.267616,4],[38.579065,-121.491014,4],[49.89944,-97.140794,4],[41.040855,28.986183,4],[32.842592,-117.272276,4],[34.142424,-87.988967,3],[43.018839,-78.886371,3],[34.42242,-98.658289,3],[37.43137,-122.168924,3],[40.210812,-8.416345,3],[32.960745,-96.732969,3],[31.3092,120.613121,3],[-33.919104,18.42197,3],[33.005609,-87.785941,3],[48.767675,9.171925,3],[42.96641,-85.671179,3],[42.697085,23.32455,3],[43.697361,-72.289879,3],[40.29805,-111.695414,3],[36.8612,-93.302046,3],[42.086981,-71.474604,3],[26.35049,-80.089004,3],[54.352771,18.650066,3],[19.4319,-99.132851,3],[42.37644,-71.235324,3],[37.36897,-82.418065,3],[34.471155,-86.799394,3],[49.26044,-123.114034,3],[-30.034259,-51.22802,3],[43.1555,-77.616033,3],[43.60698,-116.193409,3],[-6.17144,106.82782,3],[48.10752,-1.684477,3],[41.976345,-91.673759,3],[29.844566,-82.405038,3],[39.290555,-76.609604,3],[60.390705,5.33275,3],[30.572399,114.279121,3],[52.083988,4.31741,3],[36.171915,-115.139974,3],[-34.880901,-56.16544,3],[34.915191,-88.060733,3],[40.581505,-105.076264,3],[33.686887,-117.825348,3],[40.759505,-111.888229,3],[50.879385,4.70367,3],[52.23537,21.009485,3],[50.941655,6.955055,3],[39.79142,-85.611949,3],[34.02161,-118.396209,3],[35.28552,-120.662519,3],[33.870325,-117.929104,3],[40.287975,-75.449165,3],[37.8273,-88.536814,3],[-41.280515,174.767121,3],[42.204359,-88.254396,3],[40.79373,-77.860704,3],[33.953195,-84.545879,3],[-34.926102,138.599884,3],[33.53858,-112.186279,3],[45.15611,-98.323159,3],[50.06006,19.9326,3],[35.82411,-93.765664,3],[37.65589,-122.413374,3],[41.76935,-72.304459,3],[39.73201,-121.841985,3],[59.93314,30.306115,2],[51.43447,5.484105,2],[39.20486,-89.404859,2],[41.526564,-72.075709,2],[31.809675,-85.972173,2],[35.08418,-106.648639,2],[38.719969,-76.187567,2],[-33.437269,-70.650564,2],[46.31373,16.32891,2],[40.784675,-91.604279,2],[50.676125,-120.337889,2],[28.538235,-81.377389,2],[33.494,-111.920694,2],[33.824345,-118.037489,2],[32.70355,-87.595484,2],[40.16394,-105.100504,2],[33.836668,-118.341661,2],[36.149745,-95.993334,2],[55.706225,13.187605,2],[34.02166,-84.360299,2],[42.62404,-85.762404,2],[-3.718404,-38.542924,2],[47.897258,-122.29411,2],[38.83345,-104.821814,2],[36.087509,120.34272,2],[44.858665,-93.460134,2],[48.78502,2.04549,2],[36.71832,-4.420159,2],[31.181886,-82.135235,2],[55.59664,13.00156,2],[33.54247,-86.540814,2],[43.45123,-80.493049,2],[41.40214,-102.343639,2],[30.690535,-81.918484,2],[56.308569,43.91078,2],[38.355632,-92.400665,2],[41.560555,-87.503843,2],[34.068687,-117.399949,2],[30.00481,-97.686204,2],[-12.97002,-38.504559,2],[30.50904,-97.677224,2],[39.802005,-105.087829,2],[42.331685,-83.047924,2],[41.58979,-93.615659,2],[35.658859,139.70752,2],[37.170398,-3.605426,2],[40.090803,-75.384999,2],[24.7338,81.33463,2],[34.724526,-85.972693,2],[45.460789,5.990304,2],[37.454697,-122.177909,2],[45.883955,-.896874,2],[42.954415,-92.536929,2],[39.139866,-77.193829,2],[-22.976734,-43.195084,2],[42.138015,-87.995949,2],[38.546644,-121.744807,2],[50.7323,7.101695,2],[37.605669,-76.537859,2],[36.167783,-86.778365,2],[35.297125,-94.038474,2],[54.977915,-1.612369,2],[59.372312,16.516504,2],[50.079083,14.43323,2],[35.909,14.480965,2],[42.71511,-84.430264,2],[18.52671,73.8616,2],[30.443335,-91.186994,2],[33.98163,-117.373879,2],[29.95369,-90.077714,2],[52.223575,6.895374,2],[63.431005,10.39208,2],[39.15521,8.52203,2],[37.6713,-77.688604,2],[33.933015,-88.021534,2],[40.19152,-90.142224,2],[33.42551,-111.937419,2],[48.895905,2.256445,2],[38.68155,-121.163264,2],[41.90311,12.49576,2],[52.011505,4.35869,2],[41.971402,-88.020627,2],[41.336385,-91.812519,2],[34.07537,-84.294554,2],[40.110478,-88.042284,2],[39.081847,-106.382999,2],[37.6383,-120.999589,2],[42.283989,-71.346169,2],[34.677471,135.503235,2],[47.877254,11.70133,2],[39.980485,-76.733984,2],[40.233765,-111.668509,2],[60.452805,22.251551,2],[32.94488,-87.134714,2],[47.506225,19.06482,2],[32.326695,-109.486909,2],[56.946,24.114905,2],[49.98461,36.188725,2],[40.47339,-90.291574,2],[25.080441,121.564194,2],[37.51834,-122.276209,2],[33.655968,-84.448957,2],[53.0297,-2.175069,2],[39.64599,-121.800894,2],[34.01341,-86.748764,2],[51.922835,4.478455,2],[48.90286,2.30511,2],[53.38311,-1.464544,2],[14.60962,121.00589,2],[42.88544,-78.878464,2],[37.675245,-121.757829,2],[45.75343,21.223305,2],[37.83717,-122.302084,2],[41.05182,-73.542234,2],[6.23651,-75.590279,2],[42.939945,-78.687819,2],[33.766725,-118.192399,2],[-37.703133,176.144875,2],[48.835153,2.240974,2],[31.292727,-85.110484,2],[37.55091,-121.982169,2],[34.068687,-117.399949,2],[34.073485,-118.400344,2],[39.201485,-76.659994,2],[44.811877,20.464145,2],[37.934055,-121.692719,2],[41.12587,16.86665,2],[56.153005,10.204525,2],[13.69743,-89.199097,2],[30.439775,-84.280649,2],[50.256055,19.030948,2],[21.03195,105.819908,2],[48.30425,14.288155,2],[33.42952,-86.949729,2],[42.056655,-87.686589,2],[34.762501,113.653023,2],[31.878775,-85.449644,2],[46.768515,23.585135,2],[35.4259,-91.454149,2],[41.504365,-81.690459,2],[40.305131,-74.058702,2],[33.70907,-117.950664,2],[47.16116,19.50496,2],[45.62369,-94.203457,2],[13.75333,100.504822,2],[49.244535,-122.972989,2],[26.070999,119.303223,2],[39.920863,-105.070582,2],[41.564225,-87.544174,2],[38.883607,-77.439755,2],[46.208358,6.142701,2],[42.256403,-90.280623,2],[20.68759,-103.351074,2],[36.740685,-119.785734,2],[43.04181,-87.906844,2],[51.552965,-.295539,2],[41.86213,-87.839674,1],[33.61655,-117.930371,1],[38.96191,-76.862339,1],[49.872695,8.65016,1],[33.914531,-87.74002,1],[52.335045,4.98886,1],[46.051248,14.503063,1],[34.968399,-87.371172,1],[40.69648,-112.090594,1],[48.231575,-101.134114,1],[33.71775,-118.070629,1],[32.08078,-81.090719,1],[35.297125,-94.038474,1],[44.73919,-93.124294,1],[51.43142,6.76395,1],[53.335765,83.789535,1],[33.543789,-84.227709,1],[44.523905,-89.574789,1],[50.832635,4.366785,1],[35.063365,-94.249994,1],[51.502491,-.11579,1],[27.6325,113.836617,1],[51.506325,-.127144,1],[53.553345,9.992455,1],[53.065892,-2.516502,1],[37.907625,-122.548169,1],[33.88806,-78.436599,1],[48.440881,34.955607,1],[40.839941,14.251762,1],[34.780835,-91.746714,1],[47.720888,9.389336,1],[38.437731,-122.712427,1],[32.938845,-85.95295,1],[39.254525,-90.064174,1],[55.75695,37.614975,1],[57.66671,14.96963,1],[39.571465,-107.536669,1],[43.06302,-83.851714,1],[39.8007,-75.460239,1],[18.46617,-66.106654,1],[34.800465,-87.675254,1],[29.999802,-95.413567,1],[-22.220164,-49.947529,1],[40.7174,-74.043234,1],[32.637005,-90.863389,1],[47.65834,-2.759849,1],[44.92061,-89.612847,1],[41.54247,-73.208467,1],[39.004041,-95.038489,1],[33.303382,-92.956853,1],[41.392682,-73.453592,1],[48.471961,7.94481,1],[52.769732,-56.139359,1],[36.099625,-80.241094,1],[30.324165,-81.396054,1],[43.59827,-91.510132,1],[52.289139,-1.53532,1],[50.429447,30.546693,1],[37.887285,-122.298004,1],[34.744255,-120.282244,1],[38.51899,-95.958199,1],[40.42327,-104.694459,1],[41.636441,-73.208756,1],[34.27301,108.928009,1],[42.347244,-91.251992,1],[52.251034,6.159899,1],[45.679325,-111.033184,1],[40.298135,-89.484409,1],[42.326095,-71.164564,1],[41.109435,-74.069109,1],[56.282261,13.27756,1],[53.589735,-2.301054,1],[42.593309,-83.01337,1],[44.82671,-89.16806,1],[34.202175,-87.181384,1],[36.821529,34.609692,1],[34.168807,-118.610921,1],[38.99668,-77.028874,1],[39.13449,-103.470224,1],[40.6753,-73.811479,1],[38.89996,-9.03975,1],[58.503311,13.15843,1],[44.901296,-74.168784,1],[32.488366,-88.29884,1],[33.613075,-85.835699,1],[31.705605,-83.654239,1],[57.389705,21.569965,1],[39.654365,-104.993564,1],[-32.967799,-60.659239,1],[50.292,18.66719,1],[39.48275,-76.132049,1],[27.63885,-80.394224,1],[46.135197,6.132204,1],[41.316928,-73.86075,1],[40.436653,-74.20444,1],[33.84445,-118.387944,1],[52.160709,10.53441,1],[42.244938,-71.915361,1],[45.261397,-94.123754,1],[48.85693,2.3412,1],[59.05186,10.022395,1],[55.879688,12.50604,1],[37.273675,-107.879304,1],[46.933245,26.360005,1],[39.301665,-102.272004,1],[37.580157,-122.350436,1],[45.791728,24.147654,1],[41.554077,-73.046179,1],[36.336555,127.405895,1],[39.081405,-76.695054,1],[41.02525,-73.629619,1],[40.796419,-80.137205,1],[33.627647,-117.717069,1],[53.138699,8.21144,1],[51.342838,-.47542,1],[18.340509,-64.932159,1],[58.143805,7.994845,1],[34.534515,-85.901364,1],[38.343688,-122.712119,1],[-15.77846,-47.928661,1],[33.985215,-118.452109,1],[51.358799,-.69612,1],[35.604325,-91.282509,1],[33.389221,-111.814201,1],[30.08374,31.25536,1],[36.447311,115.971718,1],[33.567372,-117.727804,1],[28.66591,-81.359764,1],[38.232471,-122.644448,1],[40.68106,-122.369849,1],[51.89834,-8.472774,1],[28.013355,-82.784719,1],[40.900116,-74.511513,1],[35.488695,-120.669064,1],[54.595295,-5.934524,1],[41.839671,-72.815136,1],[37.766585,-122.244739,1],[38.86102,-86.489399,1],[42.343355,-88.038924,1],[49.256285,1.209085,1],[30.33138,-81.655799,1],[32.809635,-97.274629,1],[37.57741,-101.748814,1],[34.05483,-117.750034,1],[38.25486,-85.766404,1],[40.698922,-80.108064,1],[43.1555,-77.616033,1],[31.987936,-88.337255,1],[28.013355,-82.784719,1],[35.961545,-91.755734,1],[51.04295,5.583825,1]],l=0,d=o.length;l<d;l++)if(h.pushData(o[l][0],o[l][1],o[l][2]),o[l][2]>20){var u=new r.a.Marker(new r.a.LatLng(o[l][0],o[l][1]));u.bindPopup(o[l].toString()),e.addLayer(u)}t.addLayer(h),t.addLayer(e),r.a.control.layers({heatmap:h,markers:e}).addTo(t)}}},u=d,c=(a("c3e5"),a("2877")),p=Object(c["a"])(u,i,n,!1,null,"25ce0889",null);e["default"]=p.exports},"965a":function(t,e,a){},c3e5:function(t,e,a){"use strict";a("965a")},cfc3:function(t,e,a){var i=a("74e8");i("Float32",(function(t){return function(e,a,i){return t(this,e,a,i)}}))}}]);