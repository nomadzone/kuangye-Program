<!-- 他人用户界面操作 -->
<template>
	<view class="other-user-page-actions-comp">
		<view class="action-item">联系TA</view>
		<view :class="followStatus ? 'action-item': 'action-item-active'">关注</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径
	.other-user-page-actions-comp {
		display: flex;
		justify-content: space-between;
		.action-item {
			height: 72rpx;
			width: calc(50% - 12rpx);
			border-radius: 50rpx
			border-radius: 100%;
			border:2rpx solid $Color-B-1;
		}
	}
</style>