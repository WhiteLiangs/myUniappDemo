<template>
	<view>
		<view class="box">
			
			<text style="font-size: 34rpx;font-weight: 600;margin-top: 30rpx;">小程序申请获得以下权限</text>
			<text style="font-size: 22rpx;color: #909399;margin-top: 30rpx;">获得你的公开信息（昵称、头像、地区及性别）</text>
		</view>

		<view class="box" style="width: 100%;">
			<view class="" style="width: 500rpx;" >
				<u-button :ripple="true" shape="circle" type="success" @click="getInfo">微信一键授权</u-button>
			</view>
			
			<text style="font-size: 22rpx;color: #909399;margin-top: 30rpx;" @click="noInfo">暂不授权</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('login', ['userInfo'])
		},
		onLoad() {

		},
		methods: {
			...mapActions('login', ['updateUserInfo']),
			getInfo() {

				uni.setStorage({
					key: 'getInfo',
					data: 1,
				})

				let that = this
				wx.getUserProfile({
					desc: "获取你的昵称、头像、地区及性别",
					success: res => {
						console.log(res)
						
						
						let params = {
							nick_name: res.userInfo.nickName,
							avatar_url: res.userInfo.avatarUrl,
							city: res.userInfo.city,
							gender: res.userInfo.gender,
							province: res.userInfo.province,
							encryptedData:res.encryptedData,
							iv:res.iv,
							signature:res.signature
						}
						
						that.$iBox.http('updateUserInfo', params)({
							method: 'post'
						}).then(res => {
							
							wx.navigateBack({
								delta: 1
							})
						}).catch(function(error) {
							console.log('网络错误', error)
						})

					},
					fail: res => {
						//拒绝授权
						// that.showModal('您拒绝了请求');
						wx.navigateBack({
							delta: 1
						})
						that.$iBox.http('updateUserInfo', that.userInfo)({
							method: 'post'
						}).then(res => {
							
							
						}).catch(function(error) {
							console.log('网络错误', error)
						})
						
						
						return;
					}
				})

			},
			noInfo(){
				wx.navigateBack({
					delta: 1
				})
				this.$iBox.http('updateUserInfo', this.userInfo)({
					method: 'post'
				}).then(res => {
					this.updateUserInfo(res.data)
					
				}).catch(function(error) {
					console.log('网络错误', error)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
 .box{
	 width: 100vw;
	 height: 500rpx;
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 justify-content: center;
 }
</style>
