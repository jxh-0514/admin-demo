(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-894394d4"],{4721:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n("5a89");const i={type:"change"},s={type:"start"},a={type:"end"};class r extends o["l"]{constructor(e,t){super(),void 0===t&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new o["rb"],this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:o["F"].ROTATE,MIDDLE:o["F"].DOLLY,RIGHT:o["F"].PAN},this.touches={ONE:o["kb"].ROTATE,TWO:o["kb"].DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return h.phi},this.getAzimuthalAngle=function(){return h.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(e){e.addEventListener("keydown",ae),this._domElementKeyEvents=e},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),c=r.NONE},this.update=function(){const t=new o["rb"],s=(new o["ab"]).setFromUnitVectors(e.up,new o["rb"](0,1,0)),a=s.clone().invert(),b=new o["rb"],f=new o["ab"],g=2*Math.PI;return function(){const e=n.object.position;t.copy(e).sub(n.target),t.applyQuaternion(s),h.setFromVector3(t),n.autoRotate&&c===r.NONE&&T(A()),n.enableDamping?(h.theta+=u.theta*n.dampingFactor,h.phi+=u.phi*n.dampingFactor):(h.theta+=u.theta,h.phi+=u.phi);let o=n.minAzimuthAngle,y=n.maxAzimuthAngle;return isFinite(o)&&isFinite(y)&&(o<-Math.PI?o+=g:o>Math.PI&&(o-=g),y<-Math.PI?y+=g:y>Math.PI&&(y-=g),h.theta=o<=y?Math.max(o,Math.min(y,h.theta)):h.theta>(o+y)/2?Math.max(o,h.theta):Math.min(y,h.theta)),h.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,h.phi)),h.makeSafe(),h.radius*=m,h.radius=Math.max(n.minDistance,Math.min(n.maxDistance,h.radius)),!0===n.enableDamping?n.target.addScaledVector(p,n.dampingFactor):n.target.add(p),t.setFromSpherical(h),t.applyQuaternion(a),e.copy(n.target).add(t),n.object.lookAt(n.target),!0===n.enableDamping?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,p.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),p.set(0,0,0)),m=1,!!(d||b.distanceToSquared(n.object.position)>l||8*(1-f.dot(n.object.quaternion))>l)&&(n.dispatchEvent(i),b.copy(n.object.position),f.copy(n.object.quaternion),d=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",le),n.domElement.removeEventListener("pointerdown",$),n.domElement.removeEventListener("pointercancel",ne),n.domElement.removeEventListener("wheel",se),n.domElement.removeEventListener("pointermove",ee),n.domElement.removeEventListener("pointerup",te),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ae)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=r.NONE;const l=1e-6,h=new o["ib"],u=new o["ib"];let m=1;const p=new o["rb"];let d=!1;const b=new o["qb"],f=new o["qb"],g=new o["qb"],y=new o["qb"],v=new o["qb"],E=new o["qb"],w=new o["qb"],j=new o["qb"],x=new o["qb"],O=[],L={};function A(){return 2*Math.PI/60/60*n.autoRotateSpeed}function P(){return Math.pow(.95,n.zoomSpeed)}function T(e){u.theta-=e}function N(e){u.phi-=e}const k=function(){const e=new o["rb"];return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),p.add(e)}}(),I=function(){const e=new o["rb"];return function(t,o){!0===n.screenSpacePanning?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),p.add(e)}}(),M=function(){const e=new o["rb"];return function(t,o){const i=n.domElement;if(n.object.isPerspectiveCamera){const s=n.object.position;e.copy(s).sub(n.target);let a=e.length();a*=Math.tan(n.object.fov/2*Math.PI/180),k(2*t*a/i.clientHeight,n.object.matrix),I(2*o*a/i.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(k(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),I(o*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function R(e){n.object.isPerspectiveCamera?m/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),d=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function z(e){n.object.isPerspectiveCamera?m*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),d=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function C(e){b.set(e.clientX,e.clientY)}function F(e){w.set(e.clientX,e.clientY)}function Y(e){y.set(e.clientX,e.clientY)}function D(e){f.set(e.clientX,e.clientY),g.subVectors(f,b).multiplyScalar(n.rotateSpeed);const t=n.domElement;T(2*Math.PI*g.x/t.clientHeight),N(2*Math.PI*g.y/t.clientHeight),b.copy(f),n.update()}function V(e){j.set(e.clientX,e.clientY),x.subVectors(j,w),x.y>0?R(P()):x.y<0&&z(P()),w.copy(j),n.update()}function S(e){v.set(e.clientX,e.clientY),E.subVectors(v,y).multiplyScalar(n.panSpeed),M(E.x,E.y),y.copy(v),n.update()}function _(e){e.deltaY<0?z(P()):e.deltaY>0&&R(P()),n.update()}function U(e){let t=!1;switch(e.code){case n.keys.UP:M(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:M(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:M(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:M(-n.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),n.update())}function H(){if(1===O.length)b.set(O[0].pageX,O[0].pageY);else{const e=.5*(O[0].pageX+O[1].pageX),t=.5*(O[0].pageY+O[1].pageY);b.set(e,t)}}function X(){if(1===O.length)y.set(O[0].pageX,O[0].pageY);else{const e=.5*(O[0].pageX+O[1].pageX),t=.5*(O[0].pageY+O[1].pageY);y.set(e,t)}}function Z(){const e=O[0].pageX-O[1].pageX,t=O[0].pageY-O[1].pageY,n=Math.sqrt(e*e+t*t);w.set(0,n)}function q(){n.enableZoom&&Z(),n.enablePan&&X()}function G(){n.enableZoom&&Z(),n.enableRotate&&H()}function K(e){if(1==O.length)f.set(e.pageX,e.pageY);else{const t=pe(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);f.set(n,o)}g.subVectors(f,b).multiplyScalar(n.rotateSpeed);const t=n.domElement;T(2*Math.PI*g.x/t.clientHeight),N(2*Math.PI*g.y/t.clientHeight),b.copy(f)}function B(e){if(1===O.length)v.set(e.pageX,e.pageY);else{const t=pe(e),n=.5*(e.pageX+t.x),o=.5*(e.pageY+t.y);v.set(n,o)}E.subVectors(v,y).multiplyScalar(n.panSpeed),M(E.x,E.y),y.copy(v)}function W(e){const t=pe(e),o=e.pageX-t.x,i=e.pageY-t.y,s=Math.sqrt(o*o+i*i);j.set(0,s),x.set(0,Math.pow(j.y/w.y,n.zoomSpeed)),R(x.y),w.copy(j)}function J(e){n.enableZoom&&W(e),n.enablePan&&B(e)}function Q(e){n.enableZoom&&W(e),n.enableRotate&&K(e)}function $(e){!1!==n.enabled&&(0===O.length&&(n.domElement.setPointerCapture(e.pointerId),n.domElement.addEventListener("pointermove",ee),n.domElement.addEventListener("pointerup",te)),he(e),"touch"===e.pointerType?re(e):oe(e))}function ee(e){!1!==n.enabled&&("touch"===e.pointerType?ce(e):ie(e))}function te(e){ue(e),0===O.length&&(n.domElement.releasePointerCapture(e.pointerId),n.domElement.removeEventListener("pointermove",ee),n.domElement.removeEventListener("pointerup",te)),n.dispatchEvent(a),c=r.NONE}function ne(e){ue(e)}function oe(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case o["F"].DOLLY:if(!1===n.enableZoom)return;F(e),c=r.DOLLY;break;case o["F"].ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;Y(e),c=r.PAN}else{if(!1===n.enableRotate)return;C(e),c=r.ROTATE}break;case o["F"].PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;C(e),c=r.ROTATE}else{if(!1===n.enablePan)return;Y(e),c=r.PAN}break;default:c=r.NONE}c!==r.NONE&&n.dispatchEvent(s)}function ie(e){if(!1!==n.enabled)switch(c){case r.ROTATE:if(!1===n.enableRotate)return;D(e);break;case r.DOLLY:if(!1===n.enableZoom)return;V(e);break;case r.PAN:if(!1===n.enablePan)return;S(e);break}}function se(e){!1!==n.enabled&&!1!==n.enableZoom&&c===r.NONE&&(e.preventDefault(),n.dispatchEvent(s),_(e),n.dispatchEvent(a))}function ae(e){!1!==n.enabled&&!1!==n.enablePan&&U(e)}function re(e){switch(me(e),O.length){case 1:switch(n.touches.ONE){case o["kb"].ROTATE:if(!1===n.enableRotate)return;H(),c=r.TOUCH_ROTATE;break;case o["kb"].PAN:if(!1===n.enablePan)return;X(),c=r.TOUCH_PAN;break;default:c=r.NONE}break;case 2:switch(n.touches.TWO){case o["kb"].DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;q(),c=r.TOUCH_DOLLY_PAN;break;case o["kb"].DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;G(),c=r.TOUCH_DOLLY_ROTATE;break;default:c=r.NONE}break;default:c=r.NONE}c!==r.NONE&&n.dispatchEvent(s)}function ce(e){switch(me(e),c){case r.TOUCH_ROTATE:if(!1===n.enableRotate)return;K(e),n.update();break;case r.TOUCH_PAN:if(!1===n.enablePan)return;B(e),n.update();break;case r.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;J(e),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;Q(e),n.update();break;default:c=r.NONE}}function le(e){!1!==n.enabled&&e.preventDefault()}function he(e){O.push(e)}function ue(e){delete L[e.pointerId];for(let t=0;t<O.length;t++)if(O[t].pointerId==e.pointerId)return void O.splice(t,1)}function me(e){let t=L[e.pointerId];void 0===t&&(t=new o["qb"],L[e.pointerId]=t),t.set(e.pageX,e.pageY)}function pe(e){const t=e.pointerId===O[0].pointerId?O[1]:O[0];return L[t.pointerId]}n.domElement.addEventListener("contextmenu",le),n.domElement.addEventListener("pointerdown",$),n.domElement.addEventListener("pointercancel",ne),n.domElement.addEventListener("wheel",se,{passive:!1}),this.update()}}},e642:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var o=n("5a89");const i=/^[og]\s*(.+)?/,s=/^mtllib /,a=/^usemtl /,r=/^usemap /,c=new o["rb"],l=new o["rb"],h=new o["rb"],u=new o["rb"],m=new o["rb"],p=new o["i"];function d(){const e={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&!1===this.object.fromDeclaration)return this.object.name=e,void(this.object.fromDeclaration=!1!==t);const n=this.object&&"function"===typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"===typeof this.object._finalize&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:!1!==t,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(e,t){const n=this._finalize(!1);n&&(n.inherited||n.groupCount<=0)&&this.materials.splice(n.index,1);const o={index:this.materials.length,name:e||"",mtllib:Array.isArray(t)&&t.length>0?t[t.length-1]:"",smooth:void 0!==n?n.smooth:this.smooth,groupStart:void 0!==n?n.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(e){const t={index:"number"===typeof e?e:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return t.clone=this.clone.bind(t),t}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(e){const t=this.currentMaterial();if(t&&-1===t.groupEnd&&(t.groupEnd=this.geometry.vertices.length/3,t.groupCount=t.groupEnd-t.groupStart,t.inherited=!1),e&&this.materials.length>1)for(let n=this.materials.length-1;n>=0;n--)this.materials[n].groupCount<=0&&this.materials.splice(n,1);return e&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),t}},n&&n.name&&"function"===typeof n.clone){const e=n.clone(0);e.inherited=!0,this.object.materials.push(e)}this.objects.push(this.object)},finalize:function(){this.object&&"function"===typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return 3*(n>=0?n-1:n+t/3)},parseNormalIndex:function(e,t){const n=parseInt(e,10);return 3*(n>=0?n-1:n+t/3)},parseUVIndex:function(e,t){const n=parseInt(e,10);return 2*(n>=0?n-1:n+t/2)},addVertex:function(e,t,n){const o=this.vertices,i=this.object.geometry.vertices;i.push(o[e+0],o[e+1],o[e+2]),i.push(o[t+0],o[t+1],o[t+2]),i.push(o[n+0],o[n+1],o[n+2])},addVertexPoint:function(e){const t=this.vertices,n=this.object.geometry.vertices;n.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices,n=this.object.geometry.vertices;n.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const o=this.normals,i=this.object.geometry.normals;i.push(o[e+0],o[e+1],o[e+2]),i.push(o[t+0],o[t+1],o[t+2]),i.push(o[n+0],o[n+1],o[n+2])},addFaceNormal:function(e,t,n){const o=this.vertices,i=this.object.geometry.normals;c.fromArray(o,e),l.fromArray(o,t),h.fromArray(o,n),m.subVectors(h,l),u.subVectors(c,l),m.cross(u),m.normalize(),i.push(m.x,m.y,m.z),i.push(m.x,m.y,m.z),i.push(m.x,m.y,m.z)},addColor:function(e,t,n){const o=this.colors,i=this.object.geometry.colors;void 0!==o[e]&&i.push(o[e+0],o[e+1],o[e+2]),void 0!==o[t]&&i.push(o[t+0],o[t+1],o[t+2]),void 0!==o[n]&&i.push(o[n+0],o[n+1],o[n+2])},addUV:function(e,t,n){const o=this.uvs,i=this.object.geometry.uvs;i.push(o[e+0],o[e+1]),i.push(o[t+0],o[t+1]),i.push(o[n+0],o[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs,n=this.object.geometry.uvs;n.push(t[e+0],t[e+1])},addFace:function(e,t,n,o,i,s,a,r,c){const l=this.vertices.length;let h=this.parseVertexIndex(e,l),u=this.parseVertexIndex(t,l),m=this.parseVertexIndex(n,l);if(this.addVertex(h,u,m),this.addColor(h,u,m),void 0!==a&&""!==a){const e=this.normals.length;h=this.parseNormalIndex(a,e),u=this.parseNormalIndex(r,e),m=this.parseNormalIndex(c,e),this.addNormal(h,u,m)}else this.addFaceNormal(h,u,m);if(void 0!==o&&""!==o){const e=this.uvs.length;h=this.parseUVIndex(o,e),u=this.parseUVIndex(i,e),m=this.parseUVIndex(s,e),this.addUV(h,u,m),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,o=e.length;n<o;n++){const o=this.parseVertexIndex(e[n],t);this.addVertexPoint(o),this.addColor(o)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,o=this.uvs.length;for(let i=0,s=e.length;i<s;i++)this.addVertexLine(this.parseVertexIndex(e[i],n));for(let i=0,s=t.length;i<s;i++)this.addUVLine(this.parseUVIndex(t[i],o))}};return e.startObject("",!1),e}class b extends o["D"]{constructor(e){super(e),this.materials=null}load(e,t,n,i){const s=this,a=new o["m"](this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,(function(n){try{t(s.parse(n))}catch(o){i?i(o):console.error(o),s.manager.itemError(e)}}),n,i)}setMaterials(e){return this.materials=e,this}parse(e){const t=new d;-1!==e.indexOf("\r\n")&&(e=e.replace(/\r\n/g,"\n")),-1!==e.indexOf("\\\n")&&(e=e.replace(/\\\n/g,""));const n=e.split("\n");let c="",l="",h=0,u=[];const m="function"===typeof"".trimLeft;for(let o=0,d=n.length;o<d;o++)if(c=n[o],c=m?c.trimLeft():c.trim(),h=c.length,0!==h&&(l=c.charAt(0),"#"!==l))if("v"===l){const e=c.split(/\s+/);switch(e[0]){case"v":t.vertices.push(parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3])),e.length>=7?(p.setRGB(parseFloat(e[4]),parseFloat(e[5]),parseFloat(e[6])).convertSRGBToLinear(),t.colors.push(p.r,p.g,p.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3]));break;case"vt":t.uvs.push(parseFloat(e[1]),parseFloat(e[2]));break}}else if("f"===l){const e=c.slice(1).trim(),n=e.split(/\s+/),o=[];for(let t=0,s=n.length;t<s;t++){const e=n[t];if(e.length>0){const t=e.split("/");o.push(t)}}const i=o[0];for(let s=1,a=o.length-1;s<a;s++){const e=o[s],n=o[s+1];t.addFace(i[0],e[0],n[0],i[1],e[1],n[1],i[2],e[2],n[2])}}else if("l"===l){const e=c.substring(1).trim().split(" ");let n=[];const o=[];if(-1===c.indexOf("/"))n=e;else for(let t=0,i=e.length;t<i;t++){const i=e[t].split("/");""!==i[0]&&n.push(i[0]),""!==i[1]&&o.push(i[1])}t.addLineGeometry(n,o)}else if("p"===l){const e=c.slice(1).trim(),n=e.split(" ");t.addPointGeometry(n)}else if(null!==(u=i.exec(c))){const e=(" "+u[0].slice(1).trim()).slice(1);t.startObject(e)}else if(a.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(s.test(c))t.materialLibraries.push(c.substring(7).trim());else if(r.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if("s"===l){if(u=c.split(" "),u.length>1){const e=u[1].trim().toLowerCase();t.object.smooth="0"!==e&&"off"!==e}else t.object.smooth=!0;const e=t.object.currentMaterial();e&&(e.smooth=t.object.smooth)}else{if("\0"===c)continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}t.finalize();const b=new o["p"];b.materialLibraries=[].concat(t.materialLibraries);const f=!(1===t.objects.length&&0===t.objects[0].geometry.vertices.length);if(!0===f)for(let i=0,s=t.objects.length;i<s;i++){const e=t.objects[i],n=e.geometry,s=e.materials,a="Line"===n.type,r="Points"===n.type;let c=!1;if(0===n.vertices.length)continue;const l=new o["g"];l.setAttribute("position",new o["n"](n.vertices,3)),n.normals.length>0&&l.setAttribute("normal",new o["n"](n.normals,3)),n.colors.length>0&&(c=!0,l.setAttribute("color",new o["n"](n.colors,3))),!0===n.hasUVIndices&&l.setAttribute("uv",new o["n"](n.uvs,2));const h=[];for(let i=0,m=s.length;i<m;i++){const e=s[i],n=e.name+"_"+e.smooth+"_"+c;let l=t.materials[n];if(null!==this.materials)if(l=this.materials.create(e.name),!a||!l||l instanceof o["x"]){if(r&&l&&!(l instanceof o["Y"])){const e=new o["Y"]({size:10,sizeAttenuation:!1});o["G"].prototype.copy.call(e,l),e.color.copy(l.color),e.map=l.map,l=e}}else{const e=new o["x"];o["G"].prototype.copy.call(e,l),e.color.copy(l.color),l=e}void 0===l&&(l=a?new o["x"]:r?new o["Y"]({size:1,sizeAttenuation:!1}):new o["L"],l.name=e.name,l.flatShading=!e.smooth,l.vertexColors=c,t.materials[n]=l),h.push(l)}let u;if(h.length>1){for(let e=0,t=s.length;e<t;e++){const t=s[e];l.addGroup(t.groupStart,t.groupCount,e)}u=a?new o["z"](l,h):r?new o["X"](l,h):new o["J"](l,h)}else u=a?new o["z"](l,h[0]):r?new o["X"](l,h[0]):new o["J"](l,h[0]);u.name=e.name,b.add(u)}else if(t.vertices.length>0){const e=new o["Y"]({size:1,sizeAttenuation:!1}),n=new o["g"];n.setAttribute("position",new o["n"](t.vertices,3)),t.colors.length>0&&void 0!==t.colors[0]&&(n.setAttribute("color",new o["n"](t.colors,3)),e.vertexColors=!0);const i=new o["X"](n,e);b.add(i)}return b}}}}]);