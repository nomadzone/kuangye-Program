<template>
	<view class="info-container">
		<view class="top-content" v-if="info.images">{{info.describe}}</view>
		<view class="partner-modal-info-box">
			<view class="body-content" v-if="!info.images">{{info.describe}}</view>
			<view :class="item.images ? 'address-row address-row-light': 'address-row' "></view>
			<view :class="item.images ? 'date-row date-row-light' : 'date-row'"></view>
			
		</view>
	</view>

</template>

<script>
	
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-container {
		.top-content {
			font-family: PingFang SC;
			font-size: 40rpx;
			font-weight: 600;
			line-height: 56rpx;
			margin-bottom: 32rpx;
		}
		.partner-modal-info-box {
			height:686rpx;
			padding: 32rpx;
			border-radius:24rpx;
			background: linear-gradient(180deg, #A8E6FF 2%, #E3F7FF 57.5%);
			.body-content {
				font-family: PingFang SC;
				font-size: 40rpx;
				font-weight: 600;
				line-height: 56rpx;
				margin-bottom: 32rpx;
			}
		
		}
	}
	
</style>