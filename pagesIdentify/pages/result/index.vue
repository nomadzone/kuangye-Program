<!-- 认证结果页面 -->
<template>
	<view class="idcard-identify-result-page">
		<view class="page-info">
			<view class="header-info">
				<view class="result-icon">
					<image class="icon-item" src="../../static/identifying.svg" v-if="identifyResult == 1"></image>
					<image class="icon-item" src="../../static/identify-fail.svg" v-else-if="identifyResult == 0"></image>
				</view>
				<view :class="identifyResult === 1 ? 'result-text ing-text':'result-text fail-text'">{{identifyResult === 1 ?'认证审核中':'认证未通过'}}</view>
				<view class="result-tips">{{identifyResult === 1 ? '我们会在 1-2 个工作日给予审核结果，请耐心等待' : '身份认证未通过，请重新上传有效证件'}}</view>
			</view>
			<view class="identify-info-box">
				<view class="title">认证信息</view>
				<view class="info-item">
					<view class="item-label">真实姓名</view>
					<view class="item-value"></view>
				</view>
				<view class="info-item">
					<view class="item-label">证件号码</view>
					<view class="item-value"></view>
				</view>
				<view class="idcard-imgs">
					<view class="img-item"></view>
					<view class="img-item"></view>
				</view>
			</view>
		</view>
		<view class="page-footer">
			<button class="submit-btn">{{identifyResult === 1 ? '回到首页' : '重新提交'}}</button>
		</view>
	</view>
</template>

<script setup type="ts">
	import {ref} from 'vue'
	
	
	let identifyResult = ref(0) // 1-认证中，0-认证失败
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径
	.idcard-identify-result-page {
		height:100vh;
		background-color: #fff;
		.page-info {
			.header-info {
				margin-top: 64rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				.result-icon {
					width: 96rpx;
					height: 96rpx;
					margin-bottom: 20rpx;
					.icon-item {
						width: 100%;
						height: 100%;
					}
				}
				.result-text {
					font-size: 32rpx;
					font-weight: 600;
					text-align: center;
					margin-bottom: 20rpx;
				}
				.ing-text {
					color: $Color-B-1
				}
				.fail-text {
					color: $Color-R-1;
				}
				.result-tips {
					font-size: 24rpx;
					font-weight: 400;
					text-align: center;
					width: 300rpx;
					white-space: pre-wrap;
					text-align: center;
					margin-bottom: 32rpx;
					color: $Color-B-2;

				}
			}
				
			.identify-info-box {
				width: 580rpx;
				border-radius: 32rpx;
				padding: 24rpx 32rpx;
				margin: 0 auto;
				box-sizing: border-box;
				background-color: $Color-B-5;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				.title {
					font-size: 32rpx;
					font-weight: 600;
					text-align: center;
					margin-bottom: 20rpx;
				}
				.info-item {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: 56rpx;
					font-size: 28rpx;
					font-weight: 400;
					margin-bottom: 20rpx;
					width: 100%;
					.item-label {
						text-align: left;
						color:$Color-B-3;
					}
					.item-value {
						text-align: right;
						color:$Color-B-1;
					}
				}
				.idcard-imgs {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					.img-item {
						width: 250rpx;
						height: 158rpx;
						border-radius: 8rpx;
						background-color: #ffffff;
						
					}
				}
			}
		}
		.page-footer {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 220rpx;
			background-color: #fff;
		
			.submit-btn {
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 100rpx;
				box-sizing: border-box;
				margin: 32rpx;
				background-color: $Color-B-1;
				font-size: 28rpx;
				color: #ffffff;
				border: none;
		
				&::after {
					border: none;
				}
		
				&[disabled] {
					background-color: $Color-B-5;
					color: #A8A8A8;
					border: none;
				}
			}
		}
	}
</style>