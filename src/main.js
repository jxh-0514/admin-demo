import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import 'leaflet/dist/leaflet.css';
import '@/styles/index.scss' // global css
import './utils/dialog' // 引入拖拽

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import i18n from 'i18n'
import VueI18n from 'vue-i18n' // 引入国际化的包
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
Vue.use(SuperFlow) 
//全局引入
// import VueCron from 'vue-cron'
// Vue.use(VueCron);


import '@/icons' // icon
import '@/permission' // permission control
// import VueCesium from 'vue-cesium'
// import cesiumDrawViewer from 'cesium-draw'
// import * as Cesium from "cesium/Build/Cesium/Cesium";
// import widget from "cesium/Build/Cesium/Widgets/widgets.css";
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
 Vue.prototype.bus = new Vue()
//  Vue.prototype.cesium = Cesium;
//  Vue.prototype.widgets = widget;
// Vue.use(cesiumDrawViewer)
// Vue.use(VueCesium, { 
//   cesiumPath: 'https://cdn.jsdelivr.net/npm/cesium@latest/Build/Cesium/Cesium.js',
//   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZlM2I0MS0wMGI0LTQ0NjUtOTZjNy01NWZlYjhmMzU4ODciLCJpZCI6ODkyMjcsImlhdCI6MTY0OTY2ODA2MX0.Y5Bz32xq7WtR_CNH6sdrfbEhEzlsSktGhSRtbR9MLjc'
// })
Vue.prototype.$axios = axios
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
