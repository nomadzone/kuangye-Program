<template>
	<view class="wallet">
		 <view class="cark">
			 <button class="btn" hover-class="hover" @click="doFunds">提现</button>
			 <image class="bg" src="../../static/images/walet-bg.png" mode=""></image>
			<view>
				<view>余额</view>
				<view class="price">
					<text>¥{{balance}}</text>
				</view>
			</view>
			<!-- <view class="tip" @click="doBank" v-if="!isBank">
				<image src="../../static/images/wellat.png" mode=""></image>
				<text>未绑卡，无法提现</text>
			</view>
			<view class="tip blank" @click="doNoBank" v-if="isBank">
				<view>
					<image src="../../static/images/wellat.png" mode=""></image>
					<text>中国银行 6789***89090</text>
				</view>
				<view class="no-bind">
					<text>解绑</text>
					<image src="../../static/images/arrow-right.png" mode=""></image>
				</view>
			</view> -->
		</view>
		<view class="list">
			<view class="list-title">
				<view>收支明细</view>
				<view>
					<text>收入 ¥{{ addTotalAmount }}</text>
					<text>支出 ¥{{ jianTotalAmount }}</text>
				</view>
			</view>
			<view class="items" v-if="list.length != 0">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view>
						<view class="title">
							<text class="type">{{ item.title }}</text>
							<!-- <text class="status">未到账</text> -->
							<!-- <text class="status" :class="[item.status == 0 ? 'ok' : '']">{{ item.status == 0 ? '到账' : '未到账' }}</text> -->
						</view>
						<view class="desc">{{ item.createTime }}</view>
					</view>
					<view>
						<view class="price" :class="[item.status == 0 ? 'plus' : '']">{{ item.payType == 1 ? '+' : '-' }}¥{{ item.amout || 0 }}</view>
						<!-- <view class="desc">余额 ¥{{ item.balance || 0 }}</view> -->
					</view>
				</view>
			</view>
			<view class="items" v-if="list.length === 0">
				<Empty></Empty>
			</view>
		</view>
		<Toast
			:show='toastShow' 
			@cancel='toastShow = false' 
			@confirm='toastShow = false' 
			title='解绑银行卡？'
			desc='解绑后你将无法提现'
			confirmText='确定解绑' 
			cancelText='取消'
		/>
		<Toast
			:show='deleteShow' 
			@confirm='deleteShow = false'
			isDeleteIcon
			title='提现过程中无法解绑'
			confirmText='我知道了' 
			:isCancel='false'
		/>
	</view>
</template>

<script>
	import Toast from '@/components/Toast/Toast.vue';
	import Empty from '@/components/Empty/index.vue'
	import http from '@/utils/http.js';
	export default {
		components: {
				Toast,
				Empty
		},
		data() {
			return {
				balance: 0,
				toastShow: false,
				deleteShow: false,
				list: [],
				isBank: false,
				addTotalAmount: 0,
				jianTotalAmount: 0,
			}
		},
		onLoad() {
			this.getWalletList()
		},
		onReachBottom() {
			this.getWalletList()
		},
		methods: {
			async getWalletList() {
				let res = await http.balanceInfo({})
				uni.stopPullDownRefresh();
				if (res.code != '200') {
					unisuni.showToast({
						title: res.msg,
						duration: 2000
					});
				}
				let addTotalAmount = 0;
				let jianTotalAmount = 0;
				this.balance = res.data?.balance?.toFixed(2) * 1 || 0
				if (res.data?.userConsumptionList) {
					res.data?.userConsumptionList.map(item=> {
						if (item.payType == 1) {
							addTotalAmount += item.amout
						} else if (item.payType == 2) {
							jianTotalAmount += item.amout
						}
						item.createTime = item.createTime.split(':')[0] + ':' + item.createTime.split(':')[1]
					})
				}
				this.list = res.data?.userConsumptionList
				this.addTotalAmount = addTotalAmount.toFixed(2) * 1
				this.jianTotalAmount = jianTotalAmount.toFixed(2) * 1 
				console.log(res, 'list')
			},
			doBank() {
				uni.navigateTo({
					url: '/pagesUserCenter/pages/bindBank/index'
				})
			},
			doNoBank() {
				this.toastShow = true
				// this.deleteShow = true
			},
			doFunds() {
				uni.navigateTo({
					url: '/pagesUserCenter/pages/funds/index?amount=' + this.balance
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
	.hover {
		opacity: 0.8;
	}
	.wallet {
		padding: 32rpx;
		.cark {
			padding: 32rpx 40rpx 40rpx 40rpx;
			width: 100%;
			box-sizing: border-box;
			height: 376rpx;
			border-radius: 32rpx;
			color: #646464;
			font-size: 28rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			.bg {
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 24rpx;
				z-index: -1;
			}
			.btn {
				position: absolute;
				top: 32rpx;
				right: 40rpx;
				width: 172rpx;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				background-color: #222;
				color: #fff;
				border-radius: 32rpx;
				font-size: 24rpx;
				&:after {
					box-shadow: none;
				}
			}
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
			.tip {
				display: flex;
				align-items: center;
			}
			.blank {
				justify-content: space-between;
				align-items: center;
				color: #222;
				> view {
					display: flex;
					align-items: center;
				}
				.no-bind {
					color: #212121;
					image {
						position: relative;
						top: -2rpx;
					}
				}
			}
			.price {
				display: flex;
				image {
					height: 226rpx;
					height: 100rpx;
				}
				text {
					font-size: 72rpx;
					color: #222;
					font-weight: bold;
				}
			}
		}
		.list {
			margin-top: 64rpx;
			.list-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				font-weight: bold;
				color: #222;
				padding-bottom: 32rpx;
				> view:last-child {
					color: #a3a3a3;
					font-size: 24rpx;
					text {
						padding-left: 20rpx;
					}
				}
			}
			.items {
				.empty {
					margin: auto;
					margin-top: 150rpx;
					text-align: center;
					width: 254rpx;
					color: #A3A3A3;
					font-size: 28rpx;
					text {
						margin-top: 10rpx;
						display: inline-block;
					}
					image {
						width: 254rpx;
						height: 216rpx;
					}
				}
				.item {
					display: flex;
					justify-content: space-between;
					padding: 32rpx 0;
					border-bottom: 1px solid #eee;
					.title {
						display: flex;
						justify-content: flex-start;
						.type {
							font-size: 32rpx;
							color: #222;
							line-height: 45rpx;
							margin-right: 8rpx;
						}
						.status {
							padding: 4rpx 16rpx;
							background-color: #FFF7E2;
							border-radius: 24rpx;
							color: #FF8F50;
							font-size: 24rpx;
							font-weight: 600;
							&.ok {
								color: #0BCA94;
								background-color: #E1FFF8;
							}
						}
					}
					.price {
						font-weight: 700;
						&.plus {
							color: #0BCA94;
						}
					}
					.desc {
						color: #A3A3A3;
						font-size: 24rpx;
						padding-top: 8rpx;
					}
				}
			}
		}
	}
</style>