<!-- 他人用户界面操作 -->
<template>
	<view class="other-user-page-actions-comp">
		<view class="action-item">联系TA</view>
		<view :class="followStatus ? 'action-item-active': 'action-item'" >关注</view>
	</view>
</template>

<script setup>
	import {defineProps} from 'vue'
	
	let props = defineProps({
		followStatus: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped>
	
	@import "@/static/config.scss"; // 注意相对路径
	.other-user-page-actions-comp {
		display: flex;
		justify-content: space-between;
		.action-item {
			height: 72rpx;
			line-height: 72rpx;
			text-align: center;
			width: calc(50% - 24rpx);
			border-radius: 60rpx;
			border:2rpx solid $Color-B-1;
			color: $Color-B-1;
			font-size: 28rpx;
		}
	}
</style>