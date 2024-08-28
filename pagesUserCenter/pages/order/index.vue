<template>
	<view class="order">
		<view v-for="(order, index) in list" :key="index" class="order-item">
			<view class="items">
				<view class="order-title">
					<view class="order-title_right">
						<text>{{ order.title }}</text>
						<image src="/static/images/arrow-right.png" mode=""></image>
					</view>
					<text class="order-title_left">{{ statusText[order.status] }}</text>
				</view>
				<view class="items-line">
					<image class="order-image" :src="order.image"></image>
					<view class="order-info">
						<view class="order-amount">
							{{ order.number }} 个
							<text>|</text>
							{{ order.amount }}
						</view>
						<view class="order-time">{{ order.time }}</view>
					</view>
				</view>
				<view class="button" v-if="order.status == 1">
					<view class="button-line">
						<button @click="doSubmit(item, 'cancel')" hover-class='hover'>取消支付</button>
						<button @click="doSubmit(item, 'confirm')" class="fill" hover-class='hover'>立即支付</button>
					</view>
				</view>
				<view class="button" v-if="order.status == 2">
					<button @click="doSubmit(item, null)">申请退款</button>
				</view>
				<view class="button" v-if="order.status == 4">
					<button @click="doSubmit(item, null)">售后详情</button>
				</view>
				<view class="button" v-if="order.status == 5">
					<button @click="doSubmit(item, null)">撤销申请</button>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0 && !isInit">
			<Empty></Empty>
		</view>

		<view style="padding-bottom: 64rpx;" v-if="loading">
			<ListLoading></ListLoading>
		</view>
	</view>
</template>

<script>
	import ListLoading from '@/components/Loading/ListLoading.vue'
	import Empty from '@/components/Empty/index.vue'
	export default {
		components: {
			Empty,
			ListLoading
		},
		data() {
			return {
				statusText: {
					1: '待支付',
					2: '可使用',
					3: '交易成功',
					4: '已取消',
					5: '退款中',
				},
				list: [],
				page: 1,
				isInit: true,
				loading: false,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.loadData(); // 重新加载数据
		},
		onPullDownRefresh() {
			// 模拟下拉刷新数据
			this.page = 1;
			this.loading = false;
			this.isInit = true
			this.list = []; // 清空列表数据
			this.loadData(); // 重新加载数据
		},
		onReachBottom() {
			this.loading = true
			// 模拟上拉加载更多数据
			this.page = this.page + 1;
			this.loadData();
		},
		methods: {
			doSubmit(item, type) {
				if (type === 'cancel') {
					//  取消支付
					return
				} 
				if (type === 'cancel') {
					//   支付
					return
				}
				// item。status
				if ( true || item?.status === 2) {
					uni.navigateTo({
						url:'/pagesUserCenter/pages/orderRefund/index'
					})
					return;
				}
			},
			loadData() {
				// 模拟请求数据
				setTimeout(() => {
					const newData = [
							{
								id: 1,
								status: '1', // 1 待支付  2 可使用 3 交易成功  4 已取消  5 退款中
								number: 1,
								title: '风味至尊「双人套餐」风味至尊「双人套餐」风味至尊「双人套餐」',
								amount: '¥158.0',
								time: '2024-07-27 20:07',
								image: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
							},
							{
								id: 2,
								status: '2', // 1 待支付  2 可使用 3 交易成功  4 已取消  5 退款中
								number: 3,
								title: '风味至尊「双人套餐」风味至尊「双人套餐」风味至尊「双人套餐」',
								amount: '¥158.0',
								time: '2024-07-27 20:07',
								image: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
							},
							{
								id: 3,
								status: '3', // 1 待支付  2 可使用 3 交易成功  4 已取消  5 退款中
								number: 3,
								title: '风味至尊「双人套餐」风味至尊「双人套餐」风味至尊「双人套餐」',
								amount: '¥158.0',
								time: '2024-07-27 20:07',
								image: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
							},
							{
								id: 4,
								status: '4', // 1 待支付  2 可使用 3 交易成功  4 已取消  5 退款中
								number: 4,
								title: '风味至尊「双人套餐」风味至尊「双人套餐」风味至尊「双人套餐」',
								amount: '¥158.0',
								time: '2024-07-27 20:07',
								image: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
							},
							{
								id: 5,
								status: '5', // 1 待支付  2 可使用 3 交易成功  4 已取消  5 退款中
								number: 5,
								title: '风味至尊「双人套餐」风味至尊」',
								amount: '¥158.0',
								time: '2024-07-27 20:07',
								image: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
							},
					];
					this.list = this.list.concat(newData);
					uni.stopPullDownRefresh(); // 停止下拉刷新动画
					this.isInit = false
				}, 500);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 32rpx;

		.items {
			width: 100%;
		}

		.order-item {
			display: flex;
			flex-direction: row;
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 24rpx 32rpx;
			margin-bottom: 16rpx;
		}

		.order-image {
			width: 120rpx;
			height: 120rpx;
			flex: 0 0 128rpx;
			width: 128rpx;
			border-radius: 12rpx;
		}

		.order-info {
			flex: 1;
			padding-left: 16rpx;
		}
		
		.items-line {
			display: flex;
			padding-bottom: 32rpx;
		}

		.order-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&_right {
				display: flex;
				align-items: center;
				flex: 1;

				text {
					width: 480rpx;
					white-space: nowrap;
					/* 强制文本在一行显示 */
					overflow: hidden;
					/* 隐藏超出容器的内容 */
					text-overflow: ellipsis;
					/* 使用省略号表示溢出的内容 */
				}

				image {
					width: 32rpx;
					height: 32rpx;
					padding-left: 8rpx;
					flex: 0 0 40rpx;
					width: 40rpx;
				}
			}

			&_left {
				width: 120rpx;
				font-size: 24rpx;
				color: #7354FF;
				text-align: right;
			}
		}

		.order-amount {
			font-size: 36rpx;
			color: #222;
			margin-bottom: 10rpx;
			text {
				color: #eee;
				padding: 0 2rpx;
			}
		}

		.order-time {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 10rpx;
		}
		.button {
			padding: 24rpx 0;
			padding-bottom: 0;
			border-top: 1px solid #eee;
			display: flex;
			flex-direction: row-reverse;
			button {
				display: inline-block;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				padding: 0 24rpx;
				border-radius: 48rpx;
				background-color: transparent;
				box-shadow: 0 0 0 1px #222;
				margin: inherit;
				color: #222;
				&:after {
					box-shadow: none;
				}
			}
			.button-line {
				.fill {
					margin-left: 16rpx;
					background-color: #222;
					color: #fff;
				}
			}
		}
		.hover {
			opacity: 0.8;
		}
	}
</style>