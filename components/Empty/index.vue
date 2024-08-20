<template>
	<view class="empty">
		<image src="/static/images/empty.png" mode=""></image>
		<text>{{ title }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '暂无数据'
			}
		}
	}
</script>

<style scoped lang="scss">
	.empty {
		margin: auto;
		margin-top: 150rpx;
		text-align: center;
		width: 254rpx;
		color: #646464;
		font-size: 28rpx;
		text {
			margin-top: 10rpx;
			display: inline-block;
		}
		image {
			width: 254rpx;
			height: 216rpx;
		}
	}
</style>