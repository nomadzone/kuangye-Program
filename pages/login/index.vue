<template>
	<view class="login-page">
		<view class="login-bk-container">
			<image class="login-bk" src="../../static/images/login-bk.svg"  mode="widthFix"></image>
			<view class="login-box">
					
					<image class="logo-img" src="../../static/images/login-logo.png"></image>
				<view class="slogan-text">探索未知，一起撒野</view>
			</view>
			
		</view>
		<view class="login-actions">
			<button class="login-btn"  :open-type="accessStatus ? 'getPhoneNumber' : null" @getphonenumber="handleWxLogin()" @tap="handleClickLogin()">
				<image class="wechat-icon" src="../../static/images/login-wechat.svg"></image>
				<text>微信一键登录</text>
			</button>
			<view class="login-access">
				<view class="agree-checkbox-box"  @tap="handleChangeAgreeStatus()">
					<image class="agree-img" v-if="accessStatus" src="../../static/images/login-agree.svg"></image>
					<view class="disagree" v-else></view>
				</view>
				<view class="access-text">我已阅读并同意<text class="link-text">《用户协议》</text>和<text class="link-text">《隐私政策》</text></view>
			</view>
		</view>
	</view>
</template>

<script setup type="ts">
	import {ref} from 'vue';
	
	let accessStatus = ref(false)
	
	const handleChangeAgreeStatus = () => {
		accessStatus.value = !accessStatus.value
	}
	
	const handleWxLogin = async  (e) => {
		console.log(e)
	}
	
	const handleClickLogin = () => {
		if(!accessStatus.value) {
			uni.showToast({
				title: '请先勾选下方协议',
				icon: 'none',
				duration: 2000
			})
		}
		
	}

	
</script>

<style lang="scss" scoped>
	.login-page {
		width: 100vw;
		height: 100vh;
		.login-bk-container {
			width: 100%;
			position: relative;
			.login-bk {
				width: 100%;
				z-index: 10;
			}
			.login-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items:center;
				top: 420rpx;
				position: absolute;
				right: 0px;
				left: 0rpx;
				z-index: 20;
				.logo-img {
					width: 108px;
					height: 108px;
					border-radius: 25.53px 0px 0px 0px;
					margin-bottom: 50rpx;
				z-index: 20;
				}
				.slogan-text {
					font-family: PingFang SC;
					font-size: 16px;
					font-weight: 600;
					line-height: 22.4px;
					text-align: center;
					color: rgba(34, 34, 34, 1);
					z-index: 20;
				}
			}
		}
		.login-actions {
			.login-btn {
				margin: 0px 76rpx;
				background: rgba(34, 34, 34, 1);
				border-radius: 100rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 28rpx;
				color: #ffffff;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.wechat-icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 8rpx;
					
				}
			}
			.login-access {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				margin: 30rpx 0rpx 0rpx 76rpx;
				.agree-checkbox-box {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
					.disagree {
						width: 30rpx;
						height: 30rpx;
						border-radius: 100rpx;
						border: 2rpx solid rgba(34, 34, 34, 1);
						
					}
					.agree-img {
						width: 32rpx;
						height: 32rpx;
					}
					
				}
				.access-text {
					font-family: PingFang SC;
					font-size: 14px;
					font-weight: 400;
					line-height: 19.6px;
					text-align: left;
					color:rgba(34, 34, 34, 1);
					.link-text {
						color: rgba(0,79,153, 1)
					}

				}
				
			}
		}
	}
</style>