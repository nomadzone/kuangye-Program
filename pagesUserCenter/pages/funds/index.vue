<template>
	<view class="page">
		<view class="title">
			<view class="desc">到账银行卡</view>
			<view>
				<view>中国银行（63333）</view>
				<view style="padding-top: 16rpx;" class="desc">到账银行卡</view>
			</view>
		</view>
		<view class="card">
			<view class="card-title"> 提现金额</view>
			<view class="price">
				<text>¥</text>
				<input type="number">
			</view>
			<view class="card-tip">
				<text>当前余额 124.4元，</text>
				<text class="blue">全部提醒</text>
			</view>
		</view>
		<view style="height: calc(100vh - 224rpx - 350rpx);background-color: #fff;"></view>
		<view class="footer" :style="{ paddingBottom: StatusBar + 32 + 'rpx' }">
			<button hover-class="hover" @click="doSumbit">绑定银行卡</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: 0
			}
		},
		onLoad() {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
		},
		methods: {
			doSumbit() {
				// uni.showLoading({
				// 	title: '提现中'
				// })
				// uni.showToast({
				// 	title: '绑定失败，请重试',
				// 	icon: 'none'
				// })
				uni.showToast({
					title: '提现成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f5f5f5;
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
	}
	.title {
		width: 100%;
		padding: 64rpx 32rpx;
		display: flex;
		flex-direction: row;
		font-size: 28rpx;
		color: #222;
		font-weight: 600;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.desc {
		font-weight: 400;
		font-size: 28rpx;
		color: #646464;
	}
	.hover {
		opacity: 0.8;
	}
	.card {
		border-top-right-radius: 24rpx;
		border-top-left-radius: 24rpx;
		background-color: #fff;
		padding: 32rpx;
		.card-title {
			padding-bottom: 32rpx;
			color: #222;
		}
		.price {
			display: flex;
			flex-direction: row;
			font-size: 72rpx;
			font-weight: 700;
			padding-bottom: 32rpx;
			border-bottom: 1px solid #eee;
			input {
				font-size: 72rpx;
				height: 100rpx;
				padding-left: 16rpx;
			}
		}
		.card-tip {
			padding-top: 32rpx;
			color: #646464;
			.blue {
				color: #004F99;
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 32rpx;
		box-sizing: border-box;
		width: 100vw;
		background-color: #fff;
		button {
			height: 88rpx;
			line-height: 88rpx;
			background-color: #222;
			color: #fff;
			border-radius: 48rpx;
			font-size: 28rpx;
			width: 100%;
			&::after {
				box-shadow: none;
			}
		}
	}
</style>