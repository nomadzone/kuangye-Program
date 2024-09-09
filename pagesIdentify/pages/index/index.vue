<!-- 认证主界面 -->
<template>
	<view class="identify-page">
		<view class="title-box">
			<view class="title-text">请上传二代身份证正反面</view>
			<view class="sub-title-text">确保证件清晰完整</view>
		</view>
		
		<view class="idcard-img-box">
			<view class="img-container"></view>
			<view class="label-text">上传身份证头像页</view>
		</view>
		<view class="idcard-img-box">
			<view class="img-container"></view>
			<view class="label-text">上传身份证国徽页</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径
	.dentify-page {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.title-box{
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			.title-text {
				//styleName: 标题-加粗;
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 600;
				text-align: center;
				color:$Color-B-1;
				margin-bottom: 16rpx;
			}
				
			.sub-title-text {
				font-family: PingFang SC;
				font-size: 24px;
				font-weight: 400;
				line-height: 16.8px;
				text-align: center;

			}
		}
	}
</style>