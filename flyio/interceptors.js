let Fly = require("flyio/dist/npm/wx")
import store from '@/store'
const fly = new Fly()
const request1 = new Fly() //创建一个新的实例，在拦截器中进行异步操作
import Vue from 'vue'

// #ifdef MP-WEIXIN
const accountInfo = wx.getAccountInfoSync();
const appId = accountInfo.miniProgram.appId
// #endif

//寒武系测试域名
let baseURL = 'https://www.kemanfang.net/data/public/index.php'

fly.interceptors.request.use(function(request) {
	
	if (store.state.login.userInfo.token) {
		request.headers["authorization"] = store.state.login.userInfo.token
	} else {
		request.headers["authorization"] = " ";
	}
	// =====================================================源码用户使用======================
	request.baseURL= baseURL

	uni.setStorage({
		key: 'baseUrl',
		data: request.baseURL,
	});
})

fly.interceptors.response.use(
	(response, promise) => {
		if (response.data.code == 886) {
			// const appId = accountInfo.miniProgram.appId;
			// wx.login({
			// 	success: res => {
			// 		if (res.code) {
			// 			request1.get(baseURL + '/User/login', {
			// 				code: res.code,
			// 				xcx_appid: appId,
			// 				shop_id:''
			// 			}).then((d) => {
			// 				console.log(d);
			// 				uni.reLaunch({
			// 					url:'/pages/index/index'
			// 				})
			// 			}).finally(() => {
							
			// 			})
			// 		}
			// 	}
			// })
			//如果请求过期则更换token，重新请求一遍登录
			uni.showModal({
				title: '提示',
				content: '登录过期！请点击右上角选择重新进入小程序！',
				confirmText: "确定", // 确认按钮文字  
				showCancel: false, // 是否显示取消按钮，默认为 true
				confirmColor: '#f55850',
				cancelColor: '#39B54A',
				success: (res) => {

				}
			})

		}

		return promise.resolve(response.data)
	},
	(err, promise) => {
		return promise.reject(err)
	}
)
export default fly
