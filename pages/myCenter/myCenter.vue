<template>
	<view>
		<view class="box">
			<view class="inner_box">
				<view class="" style="width: 100rpx;">
					<u-button type="primary" size="mini" text="完善信息" @click="msgInfo"></u-button>
				</view>
				<text style="font-size: 24rpx;padding-left: 10rpx;">:获取查看项目的权限</text>
			</view>
			<view class="inner_box1">
				<image :src="centerUser.avatar_url" v-if="centerUser.avatar_url" style="width: 120rpx;height: 120rpx;border-radius: 50%;"></image>
				<image src="../../static/images/avator.png" v-else style="width: 120rpx;height: 120rpx;border-radius: 50%;"></image>
				<view class="box1_bt">
					
					<text>昵称:{{centerUser.nick_name}}</text>
					<text>已发布项目数量：{{centerUser.project_count}}</text>
					<text>参与项目数量：{{centerUser.join_project_count}}</text>
				</view>
			</view>

		</view>
		<u-line></u-line>
		<view class="inner_box2">
			<view class="box2_hz">
				<text class="box2_tx;">已选节点</text>
				<view class="tagClass" >
					<u-tag :text="centerUser.tags[0].point_name" v-if="centerUser.tags.length > 0" type="primary" plain plainFill> </u-tag>
					<text v-else>暂无</text>
				</view>
			</view>
		</view>
		<u-line></u-line>
		<view class="inner_box3">
			<view class="">
				<text>关注地点:</text>
				
			</view>
			<view class="" style="display: flex;align-items: center;flex-wrap: wrap;">
				<view class="tagSt" v-for="(item,index) in centerUser.cities" v-if="centerUser.cities.length>0" style="padding-right: 10rpx;margin-top: 6rpx;">
					<u-tag :text="item.address" size="mini"></u-tag>
				</view>
				<text v-if="centerUser.cities.length == 0">暂无</text>
			</view>
		</view>
		<u-line></u-line>
		<view class="inner_box4">
			<text>服务商:{{centerUser.grade==0?'1':centerUser.grade}}级 </text>
			<text v-if="centerUser.grade==0||centerUser.grade==1">(暂不能浏览项目电话信息)</text>
			<text v-if="centerUser.grade==0||centerUser.grade==1">请提交项目信息,1:1获取平台信息</text>
			
			<u-button type="success" text="申请成为二级服务商"  v-if="centerUser.grade==1||centerUser.grade==0" :disabled="centerUser.grade==0" @click="levelTwo"></u-button>
			<text style="color: #DD524D;font-size: 26rpx;"  v-if="centerUser.grade==0">(请先完善信息)</text>
			<text v-if="centerUser.grade==2" style="font-size: 30rpx;">(您已纳入客满房二级服务商考察周期，请多多参与项目，提升服务能能力)</text>
		</view>
		
		<view class="" v-if="centerUser.boss" @click="manger" style="display: flex;align-items: center;padding: 20rpx;width: 500rpx;margin: 30rpx auto;height: 160rpx;background-color: #FFFFFF;border-radius: 16rpx;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; ;">
			<image src="/static/images/mnnager.png" style="height: 100rpx;width: 100rpx;" mode=""></image>
			<text style="padding-left: 30rpx;">管理员入口</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				close1: true,
				cityList:[],
				centerUser:null
			}
		},
		computed: {
			...mapState('login', ['userInfo'])
		},
		async onShow() {
			await this.$onLaunched;
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			this.$iBox.http('getUserInfo', {
				
			})({
				method: 'post'
			}).then(res => {
				this.centerUser = res.data
				this.centerUser.token = this.userInfo.token
				this.centerUser.session_key = this.userInfo.session_key
				this.updateUserInfo(this.centerUser)
				uni.hideLoading()
			}).catch(function(error) {
				console.log('网络错误', error)
			})
		},
		methods: {
			...mapActions('login', ['updateUserInfo']),
			msgInfo(){
				uni.navigateTo({
					url:'../msgInfo/msgInfo'
				})
			},
			toDetail(){
				uni.navigateTo({
					url:'../supplier/supplier'
				})
			},
			manger(){
			  uni.navigateTo({
			  	url:'../manager/index'
			  })	
			},
			levelTwo(){
				this.$iBox.http('userApply', {
					
				})({
					method: 'post'
				}).then(res => {
					uni.showModal({
						title:'申请成功',
						content:'请等待审核！',
						showCancel:false,
						success() {
							
						}
					})
				}).catch(function(error) {
					console.log('网络错误', error)
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.box{
		// width: 750rpx;
		// height: 260rpx;
		
		background: #FFFFFF;
		// box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
		// margin: 30rpx auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
		
		.inner_box{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			width: 100%;
		}
		
		.inner_box1 {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 140rpx;
			width: 100%;
			.box1_bt{
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-around;
				color: #303133;
				font-size: 26rpx;
				line-height: 40rpx;
				padding-left: 20rpx;
			}
		}

	}
	
	
	.inner_box2 {
		min-height: 120rpx;
		// width: 100%;
		padding: 20rpx;
		display: flex;
		margin-top: 30rpx;
		flex-direction: column;
		justify-content: space-between;
		.box2_hz{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 20rpx;
			color: #606266;
			// min-height: 60rpx;
			.box2_tx {
				padding-right: 22rpx;
			}
			.tagClass{
				padding-right: 16rpx;
				margin-top: 8rpx;
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
	
	.inner_box3 {
		min-height: 60rpx;
		// display: flex;
		align-items: center;
		flex-wrap: wrap;
		// width: 100%;
		padding: 20rpx;
		.tagSt{
			display: flex;
			align-items: center;
		}
	}
	
	.inner_box4{
		min-height: 260rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		align-items: center;
		justify-content: space-around;
	}
</style>
