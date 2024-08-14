<!-- 自己视角导航栏 -->
<template>
	<view class="nav-box">
		<view class="nav-item">
			<image class="nav-icon" src="../../static/icons/selfNav/order-nav-icon.svg"></image>
			<text class="nav-text">订单</text>
		</view>
		<view class="nav-item">
			<image class="nav-icon" src="../../static/icons/selfNav/ticket-nav-icon.svg"></image>
			<text class="nav-text">票夹</text>
		</view>
		<view class="nav-item">
			<image class="nav-icon" src="../../static/icons/selfNav/wallet-nav-icon.svg"></image>
			<text class="nav-text">钱包</text>
		</view>
		<view class="nav-item" v-if="userRole === 'business'">
			<image class="nav-icon" src="../../static/icons/selfNav/scan-nav-icon.svg"></image>
			<text class="nav-text">核销</text>
		</view>
	</view>
	
</template>

<script setup>
	import {defineProps} from 'vue'
	let props = defineProps({
		userRole: {
			type: String,
			default: 'user'
		}
	})
</script>

<style lang="scss" scoped>
	.nav-box {
		height: 130rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(245, 245, 245, 1);
		border-radius: 32rpx;
;
		.nav-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.nav-icon {
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 8rpx;
			}
			.nav-text{
				font-size: 24rpx;
				line-height: 33rpx;
				font-weight: 600;
				color:rgba(18,18,18,1);
				
			}
		}
		
	}
</style>