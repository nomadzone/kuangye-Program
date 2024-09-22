<template>
		<scroll-view
		scroll-y
		refresher-enabled="true"
		:refresher-triggered="refresherTriggered"
		@refresherrefresh="onPullDownRefresh"
		@scrolltolower="onReachBottom"
		class="scroll-container"
		:style="{height: height}"
	>
		<view class="falls" :style="{ paddingTop: isHomePadingTop ? '10rpx' : '0' }"  v-if="list.length !== 0">
			<view class="fall">
				<HomeActive class="active" v-if="isAd"></HomeActive>
				<view style="height: 16rpx;" v-if="isAd"></view>
				<FallItem :list="left" @doLike="doLike" @doButton='doButton' @doItem='doItem'></FallItem>
			</view>
			<view class="fall">
				<FallItem :list="right" @doLike="doLike" @doButton='doButton' @doItem='doItem'></FallItem>
			</view>
		</view>
		<!-- 底部加载动画 -->
		<view v-if="loading" class="loading-wrapper">
			<view class="loading"></view>
			<text class="loading-text">加载中...</text>
		</view>
		<view  class="has-more" v-if="!hasMore && list.length !== 0 && init">没有更多数据了</view>
		<view class="no-data" v-if="list.length === 0 && init">
			<image src="/static/images/no-data.png" mode="widthFix"></image>
			<text>暂无数据</text>
		</view>
	</scroll-view>
</template> 

<script>
	import HomeActive from '@/components/HomeActive/HomeActive.vue'
	import FallItem from './Fall-item.vue'
	import http from '@/utils/http.js'
	import { formatDateText } from '@/utils/index.js'
	export default {
		components: {
			HomeActive,
			FallItem,
		},
		props: {
			isAd: {
				type: Boolean,
				default: false
			},
			listData: {
				type: Array,
				default() {
					return []
				}
			},
			height: {
				type: String,
				default: 'calc(100vh - 420rpx)'
			},
			page: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				pageNum: 1,
				list: [],
				left: [],
				right: [],
				title: '',
				type: '',
				init: false,
				hasMore: true, // 是否还有更多数据
				loading: false, // 控制加载状态
				refresherTriggered: false, // 控制下拉刷新状态
				isHomePadingTop: false
			}
		},
		onShow() {
		},
		created() {
			setTimeout(() => {
				this.init = true
			}, 1000)
		},
		watch: {
			listData(value) {
				this.handleData(value)
			}
		},
		methods: {
			async onPullDownRefresh() {
				// 下拉刷新
				this.refresherTriggered = true;
				this.pageNum = 1;
				this.hasMore = true
				this.getList({
					title: this.title,
					type: this.type,
					pageNum: 1,
					pageType: 'init'
				})
				// 处理首页样式问题
				this.isHomePadingTop = this.page === 'home';
			},
			async onReachBottom() {
				// 上拉加载
				if (this.hasMore && !this.loading) {
					let pageNum = this.pageNum
					this.pageNum = pageNum + 1
					this.loading = true;
					this.getList({
						title: this.title,
						type: this.type,
						pageNum: pageNum + 1,
						pageType: 'more'
					 });
				}
			},
			async getList({
				type = null, 
				title = '',
				pageNum = 1,
				pageSize = 10,
				pageType = 'init'
			}) {
				let params = {
					longitude: '77' || this.longitude,
					latitude: '38.8833' || this.latitude,
					type,
					pageNum,
					pageSize,
					title
				}
				this.title = title;
				this.type = type;
				let res = await http.homeActivity(params);
				if (res?.code !== '200') {
					this.right = []
					this.left = []
					return
				}
				let list = res?.data?.list || []
				if (res?.data?.total <= pageNum * pageSize) {
					this.hasMore = false
				}
				this.handleData(list, pageType)
			},
			handleData(list, pageType = 'init') {
				this.list = list;
				let right = []
				let left = []
				for (let i=0;i<list.length;i++) {
					const item = list[i]
					item.image = item?.images?.split(',')[0]
					let startdate = ''
					if (item?.type === 1 && item?.startdate) {
						startdate = formatDateText(item?.startdate)
					} else if (item?.type === 3) {
						startdate = formatDateText(item?.expectdate)
					}
					if (list[i]?.userActivityVo) {
						if (!list[i].userActivityVo?.allImages) {
							list[i].userActivityVo.allImages = []
						} else {
							list[i].userActivityVo.allImages = list[i].userActivityVo?.allImages?.split(',')
						}
						
					}
					item.startdate = startdate
					if (i%2 == 1) {
						right.push(item)
					} else {
						left.push(item)
					}
				}
				if (pageType === 'init') {
					this.right = right 
					this.left = left
				} else {
					right.map(item=> {
						this.right.push(item)
					})
					left.map(item=> {
						this.left.push(item)
					})
				}
				this.loading = false;
				if (pageType === 'init') {
					setTimeout(()=> {
						this.refresherTriggered = false;
					}, 1000)
				}
				this.$forceUpdate()
			},
			getRandomNumber() {
			  const numbers = [1, 2, 3];
			  const randomIndex = Math.floor(Math.random() * numbers.length);
			  return numbers[randomIndex];
			},
			async doButton(item, index) {
				// 发起支付
				let res = await http.orderPay({
					id: item.id,
					type: 1,
				})
				if (res.code === '200' && res.data) {
					const payParams = res.data;
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: payParams.timeStamp,
						nonceStr: payParams.nonceStr,
						package: payParams.packageVal,
						signType: payParams.signType,
						paySign: payParams.paySign,
						success: async (res)=> {
							console.log('支付成功', res);
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							});
							return;
							await http.activityAdd({ activityId: item.id })
						},
						fail: function (err) {
							console.log('支付失败', err);
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							});
						}
					});
				} else {
					uni.showToast({
						title: res.msg || '支付失败',
						icon: 'none'
					});
				}
			},
			doItem(item, index) {
				let _this = this
				if (item.type === 1) {
					uni.navigateTo({
						url: `/pagesToggle/pages/details/details?id=${item.id}`,
						success: res => {
							res.eventChannel.emit('getDetails', item)
						}
					})
				} else if (item.type === 2) {
					// 新鲜事
					uni.navigateTo({
						url:`/pagesFreshNews/pages/detail/index?id=${item.id}`,
					})
				} else if (item.type === 3) {
					// this.$refs.partnerModalRef.handleShow()
						
						console.log('item---------', item)
					_this.$emit('partnerModalShow', item)
				}
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
	.has-more {
		text-align: center;
		padding-top: 40rpx;
		padding-top: 20rpx;
		font-size: 28rpx;
		color: #999;
	}
	.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
  flex-direction: column;
  text-align: center;
}

.loading {
  border: 4rpx solid rgba(0, 0, 0, 0.1);
  border-top: 4rpx solid #3498db;
  border-radius: 50%;
  width: 50rpx;
  height: 50rpx;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 10rpx;
  font-size: 28rpx;
  color: #999;
}
</style>