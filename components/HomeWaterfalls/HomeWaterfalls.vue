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
			},
			listData: {
				type: Array,
				default() {
					return []
				}
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
		watch: {
			listData(value) {
				this.handleData(value)
			}
		},
		methods: {
			async getList(type = null, title = '') {
				let params = {
					longitude: '77' || this.longitude,
					latitude: '38.8833' || this.latitude,
					type,
					"pageNum": 1,
					"pageSize": 10,
					title
				}
				let res = await http.homeActivity(params);
				if (res?.code !== '200') {
					this.right = []
					this.left = []
					return
				}
				let list = res?.data?.list || []
				this.handleData(list)
			},
			handleData(list) {
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
				this.right = right
				this.left = left
				this.$forceUpdate()
			},
			getRandomNumber() {
			  const numbers = [1, 2, 3];
			  const randomIndex = Math.floor(Math.random() * numbers.length);
			  return numbers[randomIndex];
			},
			async doButton(item, index) {
				console.log(item, index)
				// 发起支付
				let res = await http.orderPay({
					id: item.id
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
						success: function (res) {
							console.log('支付成功', res);
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							});
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
				if (item.type === 1) {
					uni.navigateTo({
						url: `/pagesToggle/pages/details/details?id=${item.id}`,
						success: res => {
							res.eventChannel.emit('getDetails', item)
						}
					})
				} else if (item.type === 2) {
					// 新鲜事
				} else if (item.type === 3) {
					// 找搭子
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
</style>