<template>
	<view class="info-container">
		<view class="top-content" v-if="info.images">{{info.describe}}</view>
		<view class="partner-modal-info-box">
			<view class="info-top">
				<view class="body-content" v-if="!info.images">{{info.describe}}</view>
				<view class="address-row-light" v-if="info.images">
					<view class="address-info">
						<image class="address-icon" src="../../static/images/address.png"></image>
						<view class="distance-text">{{info?.distanceMeters}}km</view>
						<view class="split-line"></view>
						<view class="address-text">{{info.address}}</view>
					</view>
					<view class="guide-link">
						<!-- <view class="guide-text">导航</view> -->
					</view>
				</view>
				<view class="address-row-light address-row" v-else>
					<view class="address-info">
						<image class="address-icon" src="../../static/images/address.png"></image>
						<view class="distance-text">{{info?.distanceMeters}}km</view>
						<view class="split-line"></view>
						<view class="address-text">{{info.address}}</view>
					</view>
					<view class="guide-link">
						<!-- <view class="guide-text">导航</view> -->
					</view>
				</view>

				<view class="date-row-light" v-if="info.images">
					<view class="date-info">
						<image class="date-icon" src="../../static/images/dates.png"></image>
						<view class="date-text">{{info.startdate}}</view>
						<view class="split-line"></view>
						<view class="time-text">{{info.enddate}}</view>
					</view>

				</view>
				<view class="date-row-light date-row" v-else>
					<view class="date-info">
						<image class="date-icon" src="../../static/images/dates.png"></image>
						<view class="date-text">{{info.startdate}}</view>
						<view class="split-line"></view>
						<view class="time-text">{{info.enddate}}</view>
					</view>

				</view>

			</view>
			<view class="info-bottom">
				<view class="avatar-box" @click="$emit('toDetail')">
					<image class="avatar-img" :src="info.initiatorUrl"></image>
				</view>
				<view class="author-info">
					<view class="name-sex">
						<view :class="info.images ? 'name-text-light' : 'name-text-light name-text'">{{info.initiatorName}}</view>
						<view class="sex-box"></view>
					</view>
					<view class="tag-info"></view>
				</view>
			</view>
		</view>
	</view>

</template>

<script >
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods: {
			toD(info) {
				console.log(info)
				this.$emit('toDetail')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.info-container {
		position: relative;
		z-index: 1000;
		height: 686rpx;
		padding: 32rpx;
		box-sizing: border-box;
		background: linear-gradient(180deg, #A8E6FF 2%, #E3F7FF 57.5%);
		display: flex;
		flex-direction: column;
		.top-content {
			font-family: PingFang SC;
			font-size: 40rpx;
			font-weight: 600;
			line-height: 56rpx;
			margin-bottom: 32rpx;
		}

		.partner-modal-info-box {
			width: 100%;
			height: 100%;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.info-top {
				.body-content {
					font-family: PingFang SC;
					font-size: 40rpx;
					font-weight: 600;
					line-height: 56rpx;
					margin-bottom: 32rpx;
				}


				.address-row-light {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					color: #000000;
					font-size: 28rpx;
					margin-bottom: 8rpx;
					height: 40rpx;

					.address-info {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;

						.address-icon {
							width: 32rpx;
							height: 32rpx;
						}

						.distance-text {
							padding: 0px 6rpx;
						}

						.split-line {
							height: 22rpx;
							width: 2rpx;
							background-color: #000000;
						}

						.address-text {
							padding-left: 6rpx;
							width: 400rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.guide-link {
						display: flex;
						flex-direction: row;
						justify-content: flex-end;
						align-items: center;
						flex-shrink: 0;
						.guide-icon {
							width: 32rpx;
							height: 32rpx
						}
					}



				}

				.address-row {
					color: $Color-B-1;

					.split-line {
						height: 22rpx;
						width: 2rpx;
						background-color: $Color-B-1;
					}

					.guide-text {
						color: #004F99;
					}
				}


				.date-row-light {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					color: #000000;
					font-size: 28rpx;
					height: 40rpx;

					.date-info {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;

						.date-icon {
							width: 32rpx;
							height: 32rpx;
						}

						.date-text {
							padding: 0px 6rpx;
						}

						.split-line {
							height: 22rpx;
							width: 2rpx;
							background-color: #000000;
						}

						.time-text {
							padding-left: 6rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}


				.date-row {
					color: $Color-B-1;

					.split-line {
						height: 22rpx;
						width: 2rpx;
						background-color: $Color-B-1;
					}
				}
			}
			.info-bottom {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.avatar-box{
					width: 100rpx;
					height: 100rpx;
					border-radius: 24rpx;
					overflow: hidden;
					margin-right: 32rpx;
					.avatar-img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.author-info{
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					.name-sex {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						.name-text-light{
							//styleName: 正文-加粗;
							font-family: PingFang SC;
							font-size: 28rpx;
							font-weight: 600;
							text-align: left;
							color: #000000;
						}
						.name-text {
							color: $Color-B-1;
							
						}
					}
					.tag-info {
						height: 40rpx;
						min-width: 300rpx;
					}
				}
			}
		}
	}
</style>