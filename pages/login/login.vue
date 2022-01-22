<template>
	<view style="background: #fff;width: 100%;height: 100%;">
		<view class="item1" >
			<image :src="menu.theme.logo" style="width: 100rpx;height: 100rpx;"></image>
			<text style="font-size: 34rpx;font-weight: 600;margin-top: 30rpx;">为确保正常使用请授权以下权限</text>
			<text style="font-size: 24rpx;color: #909399;margin-top: 30rpx;">将获得你的手机号</text>
		</view>
		<view class="item2">
			<u-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"><text class="cuIcon-weixin text-white padding-right"></text>一键获取手机号</u-button>
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
				modal: false,
				old_msg:[],
				data_time:''
			}
		},
		computed: {
			...mapState('login', ['userInfo'])
		},
		methods: {
			...mapActions('login', ['updateUserInfo']),

			// hide_mymodal() {
			// 	this.modal = false
			// },
			// 获取手机号
			getPhoneNumber(e) {
				let that = this;
				console.log(e)
				if (e.detail.errMsg === "getPhoneNumber:ok") {
					this.$iBox.http('getUserPhone', {
						iv: e.detail.iv,
						encrypted_data: e.detail.encryptedData
						
					})({
						method: 'post'
					}).then(res => {
						this.userInfo.phone = res.data
						this.updateUserInfo(this.userInfo)
						uni.navigateBack({
							delta:1
						})

					})
				}
			},
		},
		onLoad(option) {
			
		},
		onShow() {
		
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.item1 {
		width: 100%;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 30rpx;
		/* background: #007AFF; */
	}

	.item1 image {
		width: 500rpx;
		height: 500rpx;
		/* border-radius: 50%; */
		background: #FFFFFF;
	}

	.item2 {
		width: 80%;
		margin: 40rpx auto;
		/* margin-top: 60rpx; */
		/* background: #007AFF; */
	}

	.item2 button {
		width: 500rpx;
		border-radius: 50rpx;
	}

	/* 老客户绑定提示框 */
	.old_custom {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 600rpx;
		width: 560rpx;
		margin: auto;
		background: #FFFFFF;
		border-radius: 20rpx;
		z-index: 9999997;
	}

	.my_modal_mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999996;
		/* transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden; */
	}
</style>
