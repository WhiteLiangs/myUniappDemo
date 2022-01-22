export default {
  // 关于接口loading的配置
  // let baseURL = 'https://www.yunqihotel.cn/sys/v2.5.20/data/public/index.php/app' // 云溪下环境 wxf53aa422a3c72c5b
  // let baseURL = 'https://hotel.yungoutec.com/sys/version2_0/data/public/index.php/app' // wxd317bc8030fb2227
  // let baseURL = 'https://pms.ifofu.com/sys/version2_0/data/public/index.php/app' //甲子源码 wx36a83a0f483bfc29
  // let baseURL = 'https://pms.jinglueyun.com/sys/v2.4.07/data/public/index.php/app' //  wx10183fe6bbacb6fc
  // let baseURL = 'https://qltest.joyfullife.cn/sys/version2_0/data/public/index.php/app' //杜  wxc06a523b03dd5a57
  // let baseURL = 'https://www.yhcgdn.com/sys/v2.6.8/data/public/index.php/app' //海洋
  loading: {
    limitTime: 30000, // 接口请求在xxxms内完成则不展示loading
    loadingShow: () => {
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
    },
    loadingHide: () => {
      uni.hideLoading()
    }
  },
  // 接口请求的默认配置
  reqConfig: {
    isLoading: true, // 是否展示loading，默认为true
    isErrorDefaultTip: true, // 是否展示默认错误提示，默认为true
    errorAction: false // 是否使用自定义的错误处理方法，默认为false，如设置true则需在views层catch错误
  },
  // fly的默认配置
  flyConfig: {
    method: 'post',
	baseURL: '',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    parseJson: true
  },
  // 运行成功的判别标识  例如res.returnCode === '0'即成功
  resSuccess: {
    key: 'code', // 与后台规定的表示响应成功的变量
    value: 0 // 与后台规定的表示响应成功code
  },
  // 异常情况
  resError: {
    // 异常默认提示的方法
    tipShow: (err) => {
	
		wx.showToast({
		  title: err,
		  icon: 'none',
		  mask: true
		})

    }
  }
}
