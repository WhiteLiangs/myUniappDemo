<template>
	<view class="content">
		<view class="listBox" v-for="item in list" @click="toDetail(item)">
			<image :src="item.pics[0]" v-if="item.pics.length>0&&item.pics[0]!=''&&item.pics[0]!=null" mode="aspectFill" class="listImg"></image>
			<view class="listImg" style="display: flex;align-items: center;justify-content: center;font-size: 28rpx;color: #555555;background: rgba(0,0,0,0.2);" v-else>
				<u-icon name="photo-fill" color="#555555"></u-icon>
				<text>图片采集中</text>
			</view>
			<view class="rightBox">
				<view style="color: #303133;word-break:break-all;font-size: 26rpx;">
					【
					<text v-for="item1 in item.city.cities">{{item1}}</text>
					<text>{{item.area?'+'+item.area+'㎡':''}}+{{item.point_type_name}}</text>
					】
				</view>
				<text style="color: #606266;word-break:break-all;font-size: 28rpx;">当前节点：{{item.point_name?item.point_name:'暂无'}}</text>
				<view class="rbInner">
					<text v-if="item.progress.update_time">{{item.progress.update_time |moment}}</text>
					<text v-else>暂无</text>
					<text>(推进项目)</text>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {

			}
		},
		async mounted() {
			await  this.$onLaunched;
			
		},
		computed:{
		  
		},
		watch:{
			list(){
				console.log(this.list,'组件');
			}
			 // list:{
			 //      handler(newValue,oldValue){
				// 	  console.log(newValue,oldValue,'dv');
			 //        return newValue
			 //      },
			 //      immediate:true
			 //  }
		},
		methods: {
			toDetail(e) {
				console.log(e,'dd');
				this.$emit("detailMsg", e)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 20rpx;

		.listBox {
			display: flex;
			margin-bottom: 34rpx;

			.listImg {
				height: 160rpx;
				width: 240rpx;
				border-radius: 6rpx;
			}

			.rightBox {
				padding: 0 16rpx;
				width: 450rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.rbInner {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #909399;
					word-break: break-all;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
