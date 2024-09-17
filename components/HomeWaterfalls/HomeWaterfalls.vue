<template>
	<view class="falls"  v-if="list.length !== 0">
		<view class="fall">
			<HomeActive class="active" v-if="isAd"></HomeActive>
			<view style="height: 16rpx;" v-if="isAd"></view>
			<FallItem :list="left" @doLike="doLike" @doButton='doButton' @doItem='doItem'></FallItem>
		</view>
		<view class="fall">
			<FallItem :list="right" @doLike="doLike" @doButton='doButton' @doItem='doItem'></FallItem>
		</view>
	</view>
	<view class="no-data" v-if="list.length === 0 && init">
		<image src="/static/images/no-data.png" mode="widthFix"></image>
		<text>暂无数据</text>
	</view>
</template> 

<script>
	import HomeActive from '@/components/HomeActive/HomeActive.vue'
	import FallItem from './Fall-item.vue'
	import http from '@/utils/http.js'
	import { formatDateText } from '@/utils/index.js'
	export default {
		components: {
			HomeActive,
			FallItem
		},
		props: {
			isAd: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				list: [],
				left: [],
				right: [],
				init: false,
			}
		},
		onShow() {
		},
		created() {
			setTimeout(() => {
				this.init = true
			}, 1000)
		},
		methods: {
			async getList(type = null) {
				let params = {
					longitude: '77' || this.longitude,
					latitude: '38.8833' || this.latitude,
					type,
					"pageNum": 1,
					"pageSize": 10
				}
				let res = await http.homeActivity(params);
				console.log(res, 1111200)
				if (res?.code !== '200') {
					this.right = []
					this.left = []
					return
				}
				let list = res?.data?.list || []
				this.list = list;
				let right = []
				let left = []
				for (let i=0;i<list.length;i++) {
					const item = list[i]
					item.image = item?.images?.split(',')[0]
					item.startdate = ''
					if (item?.type === 1 && item?.startdate) {
						item.startdate = formatDateText(item?.startdate)
					} else if (item?.type === 3) {
						item.startdate = formatDateText(item?.expectdate)
					}
					if (list[i]?.userActivityVo) {
						if (!list[i].userActivityVo?.allImages) {
							list[i].userActivityVo.allImages = []
						} else {
							list[i].userActivityVo.allImages = list[i].userActivityVo?.allImages?.split(',')
						}
						
					}
					if (i%2 == 1) {
						right.push(list[i])
					} else {
						left.push(list[i])
					}
				}
				this.right = right
				this.left = left
				this.$forceUpdate()
				console.log(this.right, 4444)
				console.log(this.left, 444455)
			},
			getRandomNumber() {
			  const numbers = [1, 2, 3];
			  const randomIndex = Math.floor(Math.random() * numbers.length);
			  return numbers[randomIndex];
			},
			doButton(item, index) {
				console.log(item, index)
			},
			doItem(item, index) {
				console.log(item, index)
				uni.navigateTo({
					url: `/pagesToggle/pages/details/details?id=${item.id}`,
					success: res => {
						res.eventChannel.emit('getDetails', item)
					}
				})
			},
			async doLike(item, index) {
				console.log(item, index)
				let title = ''
				if (item?.userUpStatus == 0) {
					const res = await http.userUp({
						"commentId": item.id,
						"type": item.type
					})
					title = res?.code !== '200' ? res?.msg : '点赞成功'
				} else {
					const res = await http.userDown({
						"commentId": item.id,
						"type": item.type
					})
					title = res?.code !== '200' ? res?.msg : '取消成功'
				}
				uni.showToast({
					title,
					icon: 'none'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.falls {
		display: flex;
		justify-content: flex-start;
		gap: 16rpx;
		flex-wrap: wrap;
		>view {
			flex: 0 0 calc(50% - 10rpx);
			width: calc(50% - 10rpx);
		}
	}
	.no-data {
		padding-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image {
			width: 200rpx;
		}
		text {
			padding-top: 20rpx;
			font-size: 28rpx;
			color: #999;
		}
	}
</style>