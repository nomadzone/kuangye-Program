<!-- 身份证识别信息确认 -->
<template>
	<view class="idcard-info-check-page">
		<view class="main-info">
			<view class="header-info">
				<view class="info-title">请核对姓名与证件号码</view>
				<view class="info-tips">请仔细核对，否则可能审核失败</view>
			</view>
			<view class="info-content">
				<view class="info-item">
					<view class="item-label">姓名</view>
					<view class="item-value"></view>
				</view>
				<view class="info-item">
					<view class="item-label">证件号码</view>
					<view class="item-value"></view>
				</view>
			</view>
		</view>


		<view class="page-tips">
			<view>温馨提示:</view>
			<text>本页面所有信息收集，仅用作当前用户身份信息修改验证，如需修改个人保单相关信息，请前往“我的保单”进行修改团体保单客户请联系企业相关负责人进行修改。</text>
		</view>
		<view class="page-footer">
			<button class="submit-btn">提交审核</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.idcard-info-check-page {
		height: 100vh;
		background-color: $Color-B-5;
		padding-bottom: 220rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.main-info {
			.header-info {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				padding: 40rpx 0rpx;

				.info-title {
					font-family: PingFang SC;
					font-size: 32rpx;
					font-weight: 600;
					color: $Color-B-1;
					margin-bottom: 16rpx;

				}

				.info-tips {
					font-size: 24rpx;
					font-weight: 400;
					text-align: left;
					color: $Color-B-2;
				}
			}

			.info-content {
				margin: 0rpx 32rpx;
				border-radius: 32rpx;
				background-color: #ffffff;
				padding: 0rpx 32rpx;

				.info-item {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: 104rpx;
					font-size: 28rpx;
					font-weight: 400;
					text-align: center;
					color: $Color-B-1;

					&:not(:last-child) {
						border-bottom: 2rpx solid $Color-B-5;
					}

					.item-label {
						text-align: left;
					}


				}


				.item-value {
					text-align: right;
				}
			}

		}

		.page-tips {
			padding: 48rpx 32rpx;
			font-size: 24rpx;
			font-weight: 400;
			text-align: left;
			color: $Color-B-3;

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