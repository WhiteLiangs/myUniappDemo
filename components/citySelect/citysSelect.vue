<template>
	<u-popup :show="value" mode="bottom" :safe-area-inset-bottom="true" :zIndex="uZIndex" @close="close">
		<view class="headBox" style="">
			<view class="" style="padding-right: 10rpx;display: flex;align-items: center;flex-wrap: wrap;">
				<text>已选择：</text>
				<view v-for="(item,index) in cityList" style="padding-right: 10rpx;display: flex;align-items: center;">
					<text v-if="index!=0">/</text>
					<text style="padding-left: 6rpx;">{{item}}</text>
				</view>
			</view>
			<view class="" style="padding: 0 10rpx;">
				<u-button type="primary" text="确定" size="mini" @click="sure" :disabled="!isChooseP"></u-button>
			</view>
		</view>
		</u-tabs>
		<view class="area-box">

			<scroll-view scroll-x="true" style="width:100%;display: flex;">
				<view class="box_inner" :class="{ 'change':isChange }">
					<view class="area-item">
						<view class="u-padding-10 u-bg-gray" style="height: 100%;">
							<scroll-view :scroll-y="true" style="height: 100%">
								<view :class="isChooseP&&province==index?'cellStyle':'uncellStyle'" style=""
									v-for="(item,index) in provinces" @click="provinceChange(index)">
									<text>{{item.name}}</text>
									<u-icon v-if="item.has_child" name="arrow-right"
										:color="isChooseP&&province==index?'#2b85e4':'#909399'"></u-icon>
								</view>
							</scroll-view>
						</view>
					</view>
					<view class="area-item">
						<view class="u-padding-10 u-bg-gray" style="height: 100%;">
							<scroll-view :scroll-y="true" style="height: 100%">
								<view :class="isChooseC&&city==index?'cellStyle':'uncellStyle'" style=""
									v-for="(item,index) in citys" @click="cityChange(index)" v-if="isChooseP">
									<text>{{item.name}}</text>
									<u-icon v-if="item.has_child" name="arrow-right"
										:color="isChooseC&&city==index?'#2b85e4':'#909399'"></u-icon>
								</view>
							</scroll-view>
						</view>
					</view>

					<view class="area-item">
						<view class="u-padding-10 u-bg-gray" style="height: 100%;">
							<scroll-view :scroll-y="true" style="height: 100%">
								<view :class="isChooseA&&area==index?'cellStyle':'uncellStyle'" style=""
									v-for="(item,index) in areas" @click="areaChange(index)" v-if="isChooseC">
									<text>{{item.name}}</text>
									<u-icon v-if="item.has_child" name="arrow-right"
										:color="isChooseA&&area==index?'#2b85e4':'#909399'"></u-icon>
								</view>
							</scroll-view>
						</view>
					</view>

					<view class="area-item" v-if="nextareas.length>0">
						<view class="u-padding-10 u-bg-gray" style="height: 100%;">
							<scroll-view :scroll-y="true" style="height: 100%">
								<view :class="isChooseN&&nextarea==index?'cellStyle':'uncellStyle'" style=""
									v-for="(item,index) in nextareas" @click="nextAreaChange(index)" v-if="isChooseA">
									<text>{{item.name}}</text>
									<u-icon v-if="item.has_child" name="arrow-right"
										:color="isChooseN&&nextarea==index?'#2b85e4':'#909399'"></u-icon>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</scroll-view>



		</view>
	</u-popup>
</template>

<script>
	/**
	 * city-select 省市区级联选择器
	 * @property {String Number} z-index 弹出时的z-index值（默认1075）
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
	 * @property {String} default-region 默认选中的地区，中文形式
	 * @property {String} default-code 默认选中的地区，编号形式
	 */
	export default {
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			// 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
			defaultRegion: {
				type: Array,
				default () {
					return [];
				}
			},
			// 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
			areaCode: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				cityValue: "",
				isChooseP: false, //是否已经选择了省
				province: 0, //省级下标
				provinces: [],
				isChooseC: false, //是否已经选择了市
				city: 0, //市级下标
				citys: [],
				isChooseA: false, //是否已经选择了区
				area: 0, //区级下标
				areas: [],
				isChooseN: false, //是否已经选择了区
				nextarea: 0,
				nextareas: [],
				cityList: ['请选择'],
				province_code: []
			}
		},
		mounted() {
			this.init();
			this.$iBox.http('getCity', {
				pid: 0
			})({
				method: 'post'
			}).then(res => {
				this.provinces = res.data

			}).catch(function(error) {
				console.log('网络错误', error)
			})

		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [];
				let codeList = [];
				if (this.isChooseP) {
					tabsList.push(this.provinces[this.province].name)
					codeList.push(this.provinces[this.province].id)
				}

				if (this.isChooseC) {
					tabsList.push(this.citys[this.city].name)
					codeList.push(this.citys[this.city].id)
				}

				if (this.isChooseA) {
					
					tabsList.push(this.areas[this.area].name)
					codeList.push(this.areas[this.area].id)
				}

				if (this.isChooseN) {
					console.log(this.nextareas[this.nextarea],this.nextareas);
					tabsList.push(this.nextareas[this.nextarea].name)
					codeList.push(this.nextareas[this.nextarea].id)
				}
				this.cityList = tabsList
				this.province_code = codeList
				console.log('cg',this.isChooseA,this.cityList);
			},
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		watch: {

		},
		methods: {
			init() {
				if (this.areaCode.length == 3) {
					this.setProvince("", this.areaCode[0]);
					this.setCity("", this.areaCode[1]);
					this.setArea("", this.areaCode[2]);
				} else if (this.defaultRegion.length == 3) {
					this.setProvince(this.defaultRegion[0], "");
					this.setCity(this.defaultRegion[1], "");
					this.setArea(this.defaultRegion[2], "");
				};
			},
			setProvince(label = "", value = "") {
				console.log(label, value, 'label');
				this.provinces.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.provinceChange(k);
					}
				})
			},
			setCity(label = "", value = "") {
				this.citys.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.cityChange(k);
					}
				})
			},
			setArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.isChooseA = true;
						this.area = k;
					}
				})
			},
			setNextArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.isChooseN = true;
						this.area = k;
					}
				})
			},
			close() {
				this.$emit('input', false);
				this.cityList = []
				this.province_code = []
				this.isChooseP = false;
				this.isChooseC = false;
				this.isChooseA = false;
				this.isChooseN = false;
			},

			provinceChange(index) {

				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.isChooseN = false;
				this.province = index;
				uni.showModal({
					title: '提示',
					content: `您已选择${this.provinces[index].name},可以选几个省，也可以精确到市-县`,
					cancelText: '确定',
					confirmText: '继续',
					success: (res) => {
						if (res.confirm) {

						} else if (res.cancel) {
							this.sure()
						}
					}

				})
				console.log(this.provinces[index], 'change');
				this.$iBox.http('getCity', {
					pid: this.provinces[index].id
				})({
					method: 'post'
				}).then(res => {
					this.citys = res.data

				}).catch(function(error) {
					console.log('网络错误', error)
				})
			},
			cityChange(index) {

				this.isChooseC = true;
				this.isChooseA = false;
				this.isChooseN = false;
				this.city = index;
				this.$iBox.http('getCity', {
					pid: this.citys[index].id
				})({
					method: 'post'
				}).then(res => {
					this.areas = res.data
				}).catch(function(error) {
					console.log('网络错误', error)
				})
			},
			areaChange(name) {
				let index = name
				this.isChooseA = true;
				this.isChooseN = false;
				this.area = index
				console.log(this.isChooseA);
				if (this.areas[index].has_child) {
					this.$iBox.http('getCity', {
						pid: this.areas[index].id
					})({
						method: 'post'
					}).then(res => {
						this.nextareas = res.data
						console.log(this.nextareas, 'cha');
					}).catch(function(error) {
						console.log('网络错误', error)
					})
				}else{
					this.nextareas = []
				}
			},
			nextAreaChange(name) {
				let index = name
				this.isChooseN = true;
				this.neatarea = index;
			},
			sure() {
				// this.value = false
				let arrs = {
					citys: this.cityList,
					codes: this.province_code
				}
				console.log(arrs,'sure');
				this.$emit('sureList', arrs)
				this.cityList = []
				this.province_code = []
				this.isChooseP = false;
				this.isChooseC = false;
				this.isChooseA = false;
				this.isChooseN = false;
			}
		}

	}
</script>
<style lang="scss" scoped>
	.headBox {
		display: flex;
		align-items: center;
		min-height: 80rpx;
		// width: 100%;
		padding: 6rpx 20rpx;
		border-bottom: 1px solid #e4e7ed;
		justify-content: space-between;
		color: #303133;
		font-size: 28rpx;
	}

	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;

		>view {
			width: 100%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.box_inner {
			display: flex;

			.area-item {
				width: 33.3333333%;
				height: 800rpx;
				border-right: 1px solid #e4e7ed;

				.uncellStyle {
					display: flex;
					align-items: center;
					justify-content: space-around;
					height: 70rpx;
					padding: 0 6rpx;
					color: #303133;
					font-size: 28rpx;
				}

				.cellStyle {
					display: flex;
					align-items: center;
					justify-content: space-around;
					height: 70rpx;
					padding: 0 6rpx;
					color: #2b85e4;
					font-size: 28rpx;
					background-color: #F3F4F6;
				}
			}
		}


	}
</style>
