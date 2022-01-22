<template>
	<view class="">
		<u-sticky>
			<view class="search_box">
				<u-search placeholder="搜索项目信息" v-model="keyword" shape="square" actionText="搜索" :show-action="true"
					:animation="true" @custom="search" @search="search"></u-search>
				<view class="tips_box">
					<u-icon name="volume-fill"></u-icon>
					<text>新增项目:{{new_count}}个</text>
					<text>执行项:{{starting}}个</text>
					<text>总项目:{{total_count}}个</text>
				</view>
			</view>
		</u-sticky>
		<view class="sub_box">
			<u-subsection :list="pjList" activeColor="#3D68FF" inactiveColor="#3D68FF" mode="subsection"
				:current="current1" @change="change1">
			</u-subsection>
			<view class="solt_box">
				<view class="solt_inner" v-for="item in list1" @click="sxProject(item)"
					:class="item.id == pid?'sureLi':''">{{item.name}}</view>
			</view>
		</view>
		<view class="address_box">
			<text>关注区域:</text>
			<text style="padding:0 10rpx;" @click="chooseCity('all')" :class="'all' == address?'address':''">全部</text>
			<view v-for="(item, index) in centerUserInfo.cities" :class="item.address == address?'address':''"
				style="padding-right: 19rpx;" v-if="centerUserInfo.cities.length > 0" @click="chooseCity(item)">
				<text>{{item.address}}</text>
			</view>
			<text v-if="centerUserInfo.cities.length == 0" style="color: #909399;padding-left: 6rpx;">暂未选择区域</text>
		</view>
		<view class="swiper_box">
			<u-swiper :list="list2" keyName="image" showTitle :autoplay="false" circular indicatorMode="line">
			</u-swiper>
		</view>
		<ItemList :list="list3" @detailMsg="toDetail"></ItemList>
		<u-loadmore :status="status" :line="true" />

	</view>
</template>

<script>
	import ItemList from '@/components/ItemList/ItemList.vue'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				list: [],
				pjList: [],
				pid: '',
				current1: 0,
				address: '',
				list1: [],
				list2: [],
				list3: [],
				codeList: [],
				params: {
					page: 1,
					limit: 10,
					point_type_id: '',
					point_id: ''
				},
				new_count: 0,
				starting: 0,
				total_count: 0,
				status: 'nomore',
				keyword: '',
				centerUserInfo: null,
				overLogin: true,
				bool: true,
				value6: 0,
				badge:0
			}
		},
		components: {
			ItemList
		},
		computed: {
			...mapState('login', ['userInfo'])
		},
		
		async onLoad() {
			
			await this.$onLaunched;
			if (!this.userInfo.avatar_url) {
				uni.navigateTo({
					url: '../register/register'
				})
			}
		},
		async onShow() {
			await this.$onLaunched;

			this.params.page = 1
			this.bool = true
			this.$iBox.http('getUserInfo', {

			})({
				method: 'post'
			}).then(res => {
				this.centerUserInfo = res.data
				this.centerUserInfo.token = this.userInfo.token
				this.centerUserInfo.session_key = this.userInfo.session_key
				this.updateUserInfo(this.centerUserInfo)
				this.$iBox.http('getProjectPoint', {})({
					method: 'post'
				}).then(res => {
					this.list = res.data
					this.overLogin = false
					let pjList = ['全部']
					res.data.forEach(item => {
						pjList.push(item.name)
					})
					this.pjList = pjList
					if (this.centerUserInfo.cities.length > 0) {
						let codeId = []
						let codeList = []
						this.centerUserInfo.cities.forEach(item => {
							codeId.push(item.city_codes.toString())
							codeList.push(item.cities.toString())
							console.log(codeList, 'code');
						})
						this.address = 'all'
						this.params.city_codes = codeId
					}
					this.getProjectList(this.params)

				}).catch(function(error) {
					console.log('网络错误', error)
				})
			}).catch(function(error) {
				console.log('网络错误', error)
			})




			this.$iBox.http('getSlideshowList', {})({
				method: 'post'
			}).then(res => {
				let list = []

				res.data.forEach(item => {
					let a = {
						image: '',
						title: ''
					}
					a.image = item.image_url
					a.title = item.content
					list.push(a)
				})

				this.list2 = list

			}).catch(function(error) {
				console.log('网络错误', error)
			})
		},
		methods: {
			...mapActions('login', ['updateUserInfo']),
			change1(index) {
				this.current1 = index
				this.params.page = 1
				this.bool = true
				if (index == 0) {
					this.list1 = []
					this.params.point_id = ''
					this.params.point_type_id = ''
					this.pid = ''
				} else {
					if (this.list[index - 1].points.length > 0) {
						this.list1 = this.list[index - 1].points
						this.params.point_type_id = this.list1[0].point_type
						this.pid = ''
						this.params.point_id = ''
					} else {
						this.list1 = []
					}
				}


				this.getProjectList(this.params)
			},
			search(e) {
				console.log(e);
				this.params.search_word = e
				this.params.page = 1
				this.bool = true
				this.getProjectList(this.params)
			},
			chooseCity(e) {
				this.params.page = 1
				this.bool = true
				if (e == 'all') {
					if (this.centerUserInfo.cities.length > 0) {
						let codeId = []
						let codeList = []
						this.centerUserInfo.cities.forEach(item => {
							codeId.push(...item.city_codes)
							codeList.push(...item.cities)
							console.log(codeList, 'code');
						})
						this.address = e
						this.params.city_codes = codeId
					}
				} else {
					this.address = e.address
					this.params.city_codes = e.city_codes
				}

				this.getProjectList(this.params)
			},
			toDetail(e) {
				console.log(e, 'dd');
				if (e.permission) {
					uni.navigateTo({
						url: '../itemDetail/itemDetail?project_id=' + e.id
					})
				} else {
					uni.navigateTo({
						url: '../askItem/askItem?list=' + JSON.stringify(e)
					})
				}

			},
			getProjectList(e) {
				uni.showLoading({
					title: '加载中...'
				})
				this.$iBox.http('getProjectList', e)({
					method: 'post'
				}).then(res => {
					this.list3 = res.data.list
					this.new_count = res.data.new_count
					this.starting = res.data.starting
					this.total_count = res.data.all_count
					uni.hideLoading()
				}).catch(function(error) {
					console.log('网络错误', error)
				})
			},
			sxProject(e) {
				console.log(e);
				this.pid = e.id
				this.params.page = 1
				this.bool = true
				this.params.point_type_id = e.point_type
				this.params.point_id = e.id
				this.getProjectList(this.params)
			}
		},
		onShareAppMessage: function(res) {},
		onPullDownRefresh() {
			this.getProjectList(this.params)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// // 上拉加载
		onReachBottom() {

			if (this.bool) {
				++this.params.page
				this.status = 'loadmore'

				uni.showLoading({
					title: '加载中...'
				})
				this.$iBox.http('getProjectList', this.params)({
					method: 'post'
				}).then(res => {
					this.new_count = res.data.new_count
					this.starting = res.data.starting
					this.total_count = res.data.all_count
					let new_list = this.list3.concat(res.data.list)
					this.list3 = new_list
					console.log(this.list3.length, res.data.count);
					if (this.list3.length == res.data.count) {
						this.bool = false
						this.status = 'nomore'
					}
					uni.hideLoading()
				}).catch(function(error) {
					console.log('网络错误', error)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.tabbr_icon{
		width: 42rpx;
		height: 42rpx;
	}
	
	.search_box {
		padding: 20rpx;
		background-color: #FFFFFF;
		margin: 0 auto;
	}

	.tips_box {

		padding: 16rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.sub_box {
		padding: 0 20rpx;

		.solt_box {
			display: flex;
			flex-wrap: wrap;

			.solt_inner {
				margin-top: 20rpx;
				padding-right: 18rpx;
				font-size: 26rpx;
				color: #606266;
			}

			.sureLi {
				color: #007AFF;
			}
		}
	}

	.address_box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 20rpx;
		font-size: 26rpx;
	}

	.address {
		color: #007AFF;
	}

	.swiper_box {
		padding: 0 20rpx;
	}
</style>
