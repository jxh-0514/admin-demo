(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f310322"],{"1da4":function(a,e,t){},"29d9":function(a,e,t){"use strict";t.r(e);var i=function(){var a=this,e=a.$createElement;a._self._c;return a._m(0)},s=[function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("div",{attrs:{id:"map-switch"}},[a._v("切换")]),t("div",{attrs:{id:"map"}})])}],o=(t("d81d"),t("e11e")),c=t.n(o),n=(t("48c2"),t("584d")),m=t.n(n),d={data:function(){return{mapMode:"baidu",map:null,tileLayer:null,bounds:[[0,0],[3750,5e3]],mapUrl:t("fe08"),marker:null,icon:c.a.icon({iconUrl:m.a,iconSize:[26,42],iconAnchor:[13,42],shadowSize:[41,41],shadowAnchor:[13,41]})}},mounted:function(){this.initMap()},methods:{initMap:function(){var a=this;this.map=c.a.map("map",{center:[39.904211,116.407395],zoom:12,crs:c.a.CRS.Baidu,zoomSnap:.1}),this.map.on("click",(function(a){console.log("点击",a.latlng)})),"baidu"===this.mapMode?this.tileLayer=c.a.tileLayer.baidu({layer:"vec"}).addTo(this.map):(this.map.options.crs=c.a.CRS.Simple,this.map.setView([this.bounds[1][0]/2,this.bounds[1][1]/2],-3),this.tileLayer=c.a.imageOverlay(this.mapUrl,this.bounds,{interactive:!0}).addTo(this.map)),c.a.DomEvent.disableClickPropagation(document.getElementById("map-switch")),c.a.DomEvent.on(document.getElementById("map-switch"),"click",this.onSwitchMapMode.bind(this)),this.map.on("zoomend",(function(){var e=a.map.getZoom();console.log("当前缩放级别:",e)}))},onSwitchMapMode:function(){var a=this;if(this.marker&&this.map.eachLayer((function(){a.map.removeLayer(a.marker)})),"baidu"===this.mapMode){this.mapMode="simple",this.tileLayer.remove(),this.map.options.crs=c.a.CRS.Simple,this.map.setMinZoom(-3),this.map.setMaxZoom(5),this.map.setView([this.bounds[1][0]/2,this.bounds[1][1]/2],-3),this.tileLayer=c.a.imageOverlay(this.mapUrl,this.bounds,{interactive:!0}).addTo(this.map);var e=[1200,2500];this.marker=c.a.marker(e,{icon:this.icon}).addTo(this.map)}else{this.mapMode="baidu",this.tileLayer.remove(),this.tileLayer=null,this.map.options.crs=c.a.CRS.Baidu,this.map.setMinZoom(1),this.map.setMaxZoom(12),this.map.setView([39.904211,116.407395],5),this.tileLayer=c.a.tileLayer.baidu({layer:"vec"}).addTo(this.map);var t=[39.904211,116.407395];this.marker=c.a.marker(t,{icon:this.icon}).addTo(this.map)}}}},r=d,l=(t("c1ea"),t("2877")),u=Object(l["a"])(r,i,s,!1,null,null,null);e["default"]=u.exports},"48c2":function(a,e,t){t("b0c0"),t("a79f"),t("9b40");var i="https://maponline0.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt=20230105&from=jsapi2_0",s=i;L.CRS.Baidu=new L.Proj.CRS("EPSG:900913","+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",{resolutions:function(){var a=19,e=[];e[0]=Math.pow(2,18);for(var t=1;t<a;t++)e[t]=Math.pow(2,18-t);return e}(),origin:[0,0],bounds:L.bounds([20037508.342789244,0],[0,20037508.342789244])}),L.tileLayer.baidu=function(a){var e;a=a||{};var t="0123456789";switch(a.layer){case"vec":default:e=L.tileLayer(s,{name:a.name,subdomains:t,tms:!0});break;case"img_d":e=L.tileLayer("http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",{name:a.name,subdomains:t,tms:!0});break;case"img_z":e=L.tileLayer("http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles="+(a.bigfont?"sh":"sl")+"&v=020",{name:a.name,subdomains:t,tms:!0});break;case"custom":a.customid=a.customid||"midnight",e=L.tileLayer(s,{name:a.name,subdomains:t,tms:!0});break;case"time":var i=(new Date).getTime();e=L.tileLayer("http://its.map.baidu.com:8002/traffic/TrafficTileService?x={x}&y={y}&level={z}&time="+i+"&label=web2D&v=017",{name:a.name,subdomains:t,tms:!0});break;case"img":e=L.layerGroup([L.tileLayer.baidu({name:"底图",layer:"img_d",bigfont:a.bigfont}),L.tileLayer.baidu({name:"注记",layer:"img_z",bigfont:a.bigfont})]);break}return e}},"584d":function(a,e){a.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcY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"},c1ea:function(a,e,t){"use strict";t("1da4")},fe08:function(a,e,t){a.exports=t.p+"static/img/aa.7635a6ff.jpg"}}]);