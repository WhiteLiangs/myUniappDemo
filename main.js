import App from './App'
import moment from 'moment'
// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import IboxPlugin from '@/plugins/ibox'
// 假设您项目中已使用VueX
import store from '@/store'
Vue.prototype.$store = store
Vue.use(uView)
Vue.use(IboxPlugin)
Vue.prototype.$moment = moment;
//注册全局过滤器，使用momentjs插件
Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD') {
	return moment.unix(parseInt(dataStr)).format(pattern)
})

Vue.filter('moment1', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	return moment.unix(parseInt(dataStr)).format(pattern)
}) 
// 挂在一个全局promise在原型上
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve
})

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
// 引入请求封装，将app参数传递到配置中

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif