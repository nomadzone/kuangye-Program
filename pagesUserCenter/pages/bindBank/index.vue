<template>
	<view class="page">
		<view class="title">提现前请绑定银行卡</view>
		<view class="card">
			<view class="line">
				<text>持卡人姓名</text>
				<input type="text" placeholder="请输入">
			</view>
			<view class="line">
				<text>银行卡号</text>
				<input type="number" placeholder="请输入">
			</view>
			<view class="line">
				<text>开户银行</text>
				<input type="text" placeholder="请输入">
			</view>
		</view>
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
				// 	title: '绑定中'
				// })
				// uni.showToast({
				// 	title: '绑定失败，请重试',
				// 	icon: 'none'
				// })
				uni.showToast({
					title: '绑定成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 0 32rpx;
		background-color: #f5f5f5;
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
	}
	.title {
		padding: 64rpx 0;
		text-align: center;
		color: #222;
		font-size: 32rpx;
		font-weight: 600;
		box-sizing: border-box;
		width: 100%;
	}
	.card {
		background-color: #fff;
		border-radius: 24rpx;
		width: 100%;
		.line {
			height: 104rpx;
			line-height: 104rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
			border-bottom: 1px solid #eee;
			text {
				font-weight: 600;
				color: #222;
				font-size: 28rpx;
				line-height: 40rpx;
			}
			input {
				text-align: right;
			}
		}
	}
	.hover {
		opacity: 0.8;
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 32rpx;
		box-sizing: border-box;
		width: 100vw;
		background-color: #fff;
		box-shadow: 0 0 4rpx #ccc;
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