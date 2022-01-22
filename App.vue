<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	
	export default {
		onLaunch: function() {
			// 下载网络字体全局
			// wx.loadFontFace({
			//   global:true,
			//   family: 'Ping Fang',
			//   source: 'url("http://hwx-hotel.oss-cn-beijing.aliyuncs.com/xcx_other/PingFang%20Medium.ttf")',
			//   success: console.log
			// })
			wx.login({
				success: res => {
					if (res.code) {
						console.log(res.code);
						this.$iBox.http('login', {code:res.code})({
							method: 'post'
						}).then(res => {
							this.toLogin(res.data)
							let param = {
								page: 1,
								limit: 10,
								type:1
							}
							this.$iBox.http('getProject', param)({
								method: 'post'
							}).then(res1 => {
								wx.setTabBarBadge({
								  index: 1,
								  text: `${res1.data.count}`
								})
								uni.hideLoading()
							}).catch(function(error) {
								console.log('网络错误', error)
							})
							
							this.$isResolve();
						}).catch(function(error) {
							console.log('网络错误', error)
						})
					}
				}
			})
		},
		methods:{
			...mapActions('login',['toLogin'])
		},
		onShow: function() {
			const updateManager = wx.getUpdateManager()
			
			updateManager.onUpdateReady( () => {
			  wx.showModal({
			    title: '更新提示',
			    content: '新版本已经准备好，是否重启应用？',
			    success:(res)=> {
			      if (res.confirm) {
			        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			        updateManager.applyUpdate()
			      }
			    }
			  })
			})
			
			updateManager.onUpdateFailed(function () {
			  // 新版本下载失败
			  wx.showModal({
			    title: '已经有新版本',
			    content: '新版本已经准备好，请删除当前小程序重新进入！'
			  })
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
