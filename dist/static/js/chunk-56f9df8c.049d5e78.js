(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56f9df8c"],{"083a":function(t,i,e){"use strict";var n=e("0d51"),a=TypeError;t.exports=function(t,i){if(!delete t[i])throw a("Cannot delete property "+n(i)+" of "+n(t))}},2935:function(t,i,e){e("d81d"),e("a434"),e("fb6a"),L.interpolatePosition=function(t,i,e,n){var a=n/e;return a=a>0?a:0,a=a>1?1:a,L.latLng(t.lat+a*(i.lat-t.lat),t.lng+a*(i.lng-t.lng))},L.Marker.MovingMarker=L.Marker.extend({statics:{notStartedState:0,endedState:1,pausedState:2,runState:3},options:{autostart:!1,loop:!1},initialize:function(t,i,e){L.Marker.prototype.initialize.call(this,t[0],e),this._latlngs=t.map((function(t,i){return L.latLng(t)})),this._durations=i,this._currentDuration=0,this._currentIndex=0,this._state=L.Marker.MovingMarker.notStartedState,this._startTime=0,this._startTimeStamp=0,this._pauseStartTime=0,this._animId=0,this._animRequested=!1,this._currentLine=[]},isRunning:function(){return this._state===L.Marker.MovingMarker.runState},isEnded:function(){return this._state===L.Marker.MovingMarker.endedState},isStarted:function(){return this._state!==L.Marker.MovingMarker.notStartedState},isPaused:function(){return this._state===L.Marker.MovingMarker.pausedState},start:function(){this.isRunning()||(this.isPaused()?this.resume():(this._loadLine(0),this._startAnimation(),this.fire("start")))},resume:function(){this.isPaused()&&(this._currentLine[0]=this.getLatLng(),this._currentDuration-=this._pauseStartTime-this._startTime,this._startAnimation())},addLatLng:function(t,i){this._latlngs.push(L.latLng(t)),this._durations.push(i)},moveTo:function(t,i){this._stopAnimation(),this._latlngs=[this.getLatLng(),L.latLng(t)],this._durations=[i],this._state=L.Marker.MovingMarker.notStartedState,this.start(),this.options.loop=!1},addStation:function(t,i){if(!(t>this._latlngs.length-2||t<1)){var e=this._latlngs[t];this._latlngs.splice(t+1,0,e),this._durations.splice(t,0,i)}},_startAnimation:function(){this._startTime=Date.now(),this._state=L.Marker.MovingMarker.runState,this._animId=L.Util.requestAnimFrame((function(t){this._startTimeStamp=t,this._animate(t)}),this,!0),this._animRequested=!0},_resumeAnimation:function(){this._animRequested||(this._animId=L.Util.requestAnimFrame((function(t){this._animate(t)}),this,!0))},_stopAnimation:function(){this._animRequested&&(L.Util.cancelAnimFrame(this._animId),this._animRequested=!1)},_loadLine:function(t){this._currentIndex=t,this._currentDuration=this._durations[t],this._currentLine=this._latlngs.slice(t,t+2)},_updateLine:function(t){var i=t-this._startTimeStamp;if(i<=this._currentDuration)return i;var e=this._currentIndex,n=this._currentDuration;while(i>n){if(i-=n,e++,e>=this._latlngs.length-1){if(!this.options.loop)return this.setLatLng(this._latlngs[this._latlngs.length-1]),this.stop(i),null;e=0,this.fire("loop",{elapsedTime:i})}n=this._durations[e]}return this._loadLine(e),this._startTimeStamp=t-i,this._startTime=Date.now()-i,i},_animate:function(t,i){var e;if(this._animRequested=!1,e=this._updateLine(t),null!==e){var n=L.interpolatePosition(this._currentLine[0],this._currentLine[1],this._currentDuration,e);this.setLatLng(n),i||(this._animId=L.Util.requestAnimFrame(this._animate,this,!1),this._animRequested=!0)}},onAdd:function(t){L.Marker.prototype.onAdd.call(this,t),!this.options.autostart||this.isStarted()?this.isRunning()&&this._resumeAnimation():this.start()},onRemove:function(t){L.Marker.prototype.onRemove.call(this,t),this._stopAnimation()},pause:function(){this.isRunning()&&(this._pauseStartTime=Date.now(),this._state=L.Marker.MovingMarker.pausedState,this._stopAnimation(),this._animate(this._startTimeStamp+(this._pauseStartTime-this._startTime),!0))},stop:function(t){this.isEnded()||(this._stopAnimation(),"undefined"===typeof t&&(t=0,this._animate(this._startTimeStamp+(Date.now()-this._startTime),!0)),this._state=L.Marker.MovingMarker.endedState,this.fire("end",{elapsedTime:t}))}}),L.Marker.movingMarker=function(t,i,e){return new L.Marker.MovingMarker(t,i,e)}},"3a34":function(t,i,e){"use strict";var n=e("83ab"),a=e("e8b5"),s=TypeError,r=Object.getOwnPropertyDescriptor,o=n&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(t){return t instanceof TypeError}}();t.exports=o?function(t,i){if(a(t)&&!r(t,"length").writable)throw s("Cannot set read only .length");return t.length=i}:function(t,i){return t.length=i}},"537f":function(t,i,e){"use strict";e("f59e")},"584d":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcY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"},"5c03":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{id:"map"}})},a=[],s=(e("d81d"),e("e11e")),r=e.n(s),o=e("584d"),u=e.n(o),c=(e("2935"),{components:{},data:function(){return{loading:!0,map:null,imageOverLay:null,parisKievLL:[[48.8567,2.3508],[50.45,30.523333]],londonParisRomeBerlinBucarest:[[51.507222,-.1275],[48.8567,2.3508],[41.9,12.5],[52.516667,13.383333],[44.4166,26.1]],londonBrusselFrankfurtAmsterdamLondon:[[51.507222,-.1275],[50.85,4.35],[50.116667,8.683333],[52.366667,4.9],[51.507222,-.1275]],barcelonePerpignanPauBordeauxMarseilleMonaco:[[41.385064,2.173403],[42.698611,2.895556],[43.3017,-.3686],[44.837912,-.579541],[43.296346,5.369889],[43.738418,7.424616]],iconUrl:r.a.icon({iconUrl:u.a,iconSize:[26,42],iconAnchor:[13,42],shadowSize:[41,41],shadowAnchor:[13,41]})}},computed:{},watch:{},destroyed:function(){},created:function(){},mounted:function(){this.loading=!1,this.initLeaflet()},methods:{initLeaflet:function(){this.map=r.a.map("map",{center:[36.09,120.35],zoom:13,preferCanvas:!0}),this.tiles=r.a.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map),this.map.fitBounds(this.londonParisRomeBerlinBucarest),this.state(),this.mov4()},state:function(){var t=r.a.Marker.movingMarker(this.parisKievLL,[2e4]).addTo(this.map);t.setIcon(this.iconUrl).addTo(this.map),r.a.polyline(this.parisKievLL).addTo(this.map),t.once("click",(function(){t.start(),t.closePopup(),t.unbindPopup(),t.on("click",(function(){t.isRunning()?t.pause():t.start()})),setTimeout((function(){t.bindPopup("<b>点我暂停 !</b>").openPopup()}),2e3)})),t.bindPopup("<b>点我开始</b> !</b>",{closeOnClick:!1}),t.openPopup()},mov3:function(){var t=r.a.Marker.movingMarker(this.londonBrusselFrankfurtAmsterdamLondon,[2e3,2e3,2e3,2e3],{autostart:!0,loop:!0}).addTo(this.map);t.loops=0,t.bindPopup("",{closeOnClick:!1}),t.on("loop",(function(i){t.loops++,i.elapsedTime<50&&(t.getPopup().setContent("<b>Loop: "+t.loops+"</b>"),t.openPopup(),setTimeout((function(){t.closePopup(),marker1.isEnded()?marker4.getLatLng().equals([45.816667,15.983333])&&(marker4.bindPopup("点击地图使我移动 !"),marker4.openPopup()):marker1.openPopup()}),2e3))}))},mov4:function(){var t=r.a.Marker.movingMarker([[45.816667,15.983333]],[]).addTo(this.map);t.setIcon(this.iconUrl).addTo(this.map),this.map.on("click",(function(i){t.moveTo(i.latlng,2e3)}))},mov5:function(){var t=r.a.Marker.movingMarker(this.barcelonePerpignanPauBordeauxMarseilleMonaco,1e4,{autostart:!0}).addTo(this.map);t.addStation(1,2e3),t.addStation(2,2e3),t.addStation(3,2e3),t.addStation(4,2e3),r.a.polyline(this.barcelonePerpignanPauBordeauxMarseilleMonaco,{color:"green"}).addTo(this.map)}}}),h=c,d=(e("537f"),e("2877")),l=Object(d["a"])(h,n,a,!1,null,"64b20604",null);i["default"]=l.exports},a434:function(t,i,e){"use strict";var n=e("23e7"),a=e("7b0b"),s=e("23cb"),r=e("5926"),o=e("07fa"),u=e("3a34"),c=e("3511"),h=e("65f0"),d=e("8418"),l=e("083a"),p=e("1dde"),g=p("splice"),m=Math.max,f=Math.min;n({target:"Array",proto:!0,forced:!g},{splice:function(t,i){var e,n,p,g,k,M,L=a(this),b=o(L),A=s(t,b),v=arguments.length;for(0===v?e=n=0:1===v?(e=0,n=b-A):(e=v-2,n=f(m(r(i),0),b-A)),c(b+e-n),p=h(L,n),g=0;g<n;g++)k=A+g,k in L&&d(p,g,L[k]);if(p.length=n,e<n){for(g=A;g<b-n;g++)k=g+n,M=g+e,k in L?L[M]=L[k]:l(L,M);for(g=b;g>b-n+e;g--)l(L,g-1)}else if(e>n)for(g=b-n;g>A;g--)k=g+n-1,M=g+e-1,k in L?L[M]=L[k]:l(L,M);for(g=0;g<e;g++)L[g+A]=arguments[g+2];return u(L,b-n+e),p}})},f59e:function(t,i,e){}}]);