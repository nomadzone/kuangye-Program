<!-- 个人资料主界面 -->
<template>
	<view class="personal-data-page">
		<view class="block-info">
			<view class="block-info-item">
				<view class="item-label">头像</view>
				<view class="item-control">
					<view class="control-text">修改</view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">昵称</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">性别</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">生日</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">简介</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">联系方式</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
		</view>

		<view class="block-info">
			<view class="block-info-item">
				<view class="item-label">推荐偏好</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
		</view>
		<view class="block-info">
			<view class="block-info-item">
				<view class="item-label">用户协议</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">隐私协议</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
		</view>
		
		<view class="page-bottom">
			<button class="change-account-btn">切换账号</button>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.personal-data-page {
		height: 100vh;
		padding: 32rpx;
		background-color: $Color-B-5;
		padding-bottom: 240rpx;

		.block-info {
			border-radius: 32rpx;
			background-color: #fff;
			padding: 0rpx 32rpx;
			box-sizing: border-box;
			&:not(:last-child) {
				margin-bottom: 16rpx;
			}

			.block-info-item {
				height: 104rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid $Color-B-5;

				&:last-child {
					border-bottom: 0rpx
				}

				.item-label {
					font-family: PingFang SC;
					font-size: 28rpx;
					font-weight: 600;
					color: $Color-B-1;

				}

				.item-control {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					align-items: center;

					.control-text {
						font-family: PingFang SC;
						font-size: 28rpx;
						font-weight: 400;
						color: #979C9E;
					}

					.more-icon {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
	
		.page-bottom {
			position: fixed;
			height: 220rpx;
			background-color: #ffffff;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 32rpx 32rpx 0rpx 32rpx;
			.change-account-btn {
				border-radius: 100rpx;
				background-color:  $Color-B-1;
				color: #ffffff;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				height: 88rpx;
				line-height: 88rpx;
			}
		}
	}
</style>