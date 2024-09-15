<!-- 认证主界面 -->
<template>
	<view class="identify-page">
		<view class="title-box">
			<view class="title-text">请上传二代身份证正反面</view>
			<view class="sub-title-text">确保证件清晰完整</view>
		</view>

		<view class="idcard-img-box">
			<view class="img-container">
				<image class="id-card-img" mode="widthFix" v-if="forntIdCard" :src="forntIdCard"></image>
				<image class="id-card-img" mode="widthFix" v-else src="../../static/default-front-idCard.svg"></image>
			</view>
			<view class="label-text">上传身份证头像页</view>
		</view>
		<view class="idcard-img-box">
			<view class="img-container">
				<image class="id-card-img" mode="widthFix" v-if="backIdCard" :src="backIdCard"></image>
				<image class="id-card-img" mode="widthFix" v-else src="../../static/default-back-idCard.svg"></image>
			</view>
			<view class="label-text">上传身份证国徽页</view>
		</view>

		<view class="footer-action">
			<button class="next-step-btn" :disabled="disabledStatus">下一步</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'

	let forntIdCard = ref(null)
	let backIdCard = ref(null)
	
	let disabledStatus = ref(true)
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.identify-page {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		.title-box {
			margin-top: 40rpx;
			margin-bottom: 40rpx;

			.title-text {
				//styleName: 标题-加粗;
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 600;
				text-align: center;
				color: $Color-B-1;
				margin-bottom: 16rpx;
			}

			.sub-title-text {
				font-family: PingFang SC;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 16.8px;
				text-align: center;

			}
		}

		.idcard-img-box {
			width: 548rpx;
			height: 419rpx;
			padding: 24rpx;
			gap: 10px;
			border-radius: 16rpx;
			opacity: 0px;
			background-color: $Color-B-5;
			margin-bottom: 32rpx;

			.img-container {
				gap: 0px;
				border-radius: 16rpx;
				opacity: 0px;

				.id-card-img {
					width: 100%;
					height: 314rpx;
				}
			}

			.label-text {
				//styleName: 小字-加粗;
				font-family: PingFang SC;
				font-size: 24rpx;
				font-weight: 600;
				text-align: center;
				color: $Color-B-2;
				margin-top: 20rpx;
			}

		}

		.footer-action {
			width: 100%;
			box-sizing: border-box;
			position: fixed;
			height: 220rpx;
			left: 0;
			bottom: 0;
			right: 0;

			.next-step-btn {
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 100rpx;
				box-sizing: border-box;
				margin: 32rpx;
				background-color: $Color-B-1;
				font-size: 28rpx;
				color: #ffffff;
				border: none;
				&::after{
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