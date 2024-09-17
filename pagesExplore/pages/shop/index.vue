<!-- 店铺主界面 -->
<template>
	<view class="shop-detail-page">
		<view class="top-bk">
			<cover-view class="cover-info">
				<cover-view class="info-item between">
					<cover-view class="label-info">
						<cover-image class="label-img" src="../../static/images/clock.svg"></cover-image>
						<cover-view class="label-text">营业时间：</cover-view>
						<cover-view class="label-value"></cover-view>
					</cover-view>
					<cover-view class="value-info">
						<cover-view class="shop-status">营业中</cover-view>
					</cover-view>
				</cover-view>
				<cover-view class="info-item ">
					<cover-view class="label-info">
						<cover-image class="label-img" src="../../static/images/tag.svg"></cover-image>
						<cover-view class="label-value">¥380/人 创意菜</cover-view>
					</cover-view>
					<cover-view class="value-info">
					</cover-view>
				</cover-view>
				<cover-view class="info-item between">
					<cover-view class="label-info">
						<cover-image class="label-img" src="../../static/images/location.svg"></cover-image>
						<cover-view class="label-text">4.8km</cover-view>
						<cover-view class="label-value">雁塔区西影路西影制片厂内</cover-view>
					</cover-view>
					<cover-view class="value-info">
						<cover-image class="guide-icon" src="../../static/images/guide.svg"></cover-image>
					</cover-view>
				</cover-view>
			</cover-view>
		</view>
	
		<view class="main-info">
			<view class="package-box">
				<view class="title">优惠套餐</view>
				<view class="package-group"></view>
			</view>
			
			<view class="shop-desc">
				<view class="title">店铺介绍</view>
				<view class="desc-content"></view>
			</view>
		</view>
	</view>
</template>
<script>
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.shop-detail-page {
		background-color: $Color-B-1;

		.top-bk {
			height: 736rpx;
			background-color: #ccc;
			position: relative;

			.cover-info {
				position: absolute;
				right: 32rpx;
				left: 32rpx;
				bottom: 32rpx;
				height: 248rpx;
				padding: 8px 16px 8px 16px;
				border-radius: 32rpx;
				background-color: rgba(0, 0, 0, 0.45);

				.info-item {
					font-family: PingFang SC;
					font-size: 24rpx;
					font-weight: 400;
					color: $Color-B-4;
					height: 72rpx;
					align-items: center;
					display: flex;

					&:not(:last-child) {
						border-bottom: 1rpx solid rgba(255, 255, 255, 0.25);
					}


					.label-info {
						display: flex;
						flex-direction: row;

						.label-img {
							width: 32rpx;
							height: 32rpx;
							margin-right: 8rpx;
						}
					}

					.value-info {
						.shop-status {
							width: 100rpx;
							height: 36rpx;
							line-height: 36rpx;
							padding: 4rpx 0px 0px 0px;
							border-radius: 86rpx;
							text-align: center;
							font-size: 20rpx;
							font-weight: 500;
							box-sizing: border-box;
							background-color: rgba(115, 84, 255, 1);
						}

						.guide-icon {
							width: 48rpx;
							height: 48rpx;
						}
					}
				}

				.between {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

				}
			}
		}
		
		.main-info {
			background-color: #ffffff;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			padding: 32rpx;
			.package-box {
				border-bottom: 1rpx solid $Color-B-4;
				padding-bottom: 32rpx;
				margin-bottom: 32rpx;
				.title{
					font-family: PingFang SC;
					font-size: 32rpx;
					font-weight: 600;
					margin-bottom:32rpx;
				}
			}
				
			.shop-desc {
				border-bottom: 1rpx solid $Color-B-4;
				padding-bottom: 32rpx;
				.title{
					font-family: PingFang SC;
					font-size: 32rpx;
					font-weight: 600;
					margin-bottom:32rpx;
				}
				.desc-content {
					min-height: 200rpx;
				}
			}
		}
	}
</style>