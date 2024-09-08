<template>
	<view class="fans-list-comp">
		<view class="fans-item-row" v-for="item in fansList" :key="item.id">
			<view class="left">
				<image class="fans-avatar" v-if="item.avatar" :src="item.avatar"></image>
				<image class="fans-avatar" v-else src="../../static/images/user-center-default-avatar.svg"></image>
				<text class="fans-name">{{item.name}}</text>
			</view>
			<view class="right">
				<button :class="item.followStatus ? 'active': 'normal'">{{item.followStatus ? '已关注': '关注'}}</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	
	const fansList = ref([
		{id: 0, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 1, avatar: null, name: 'Sampha', followStatus: 1},
		{id: 2, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 3, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 4, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 5, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 6, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 7, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 8, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 9, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 10, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 11, avatar: null, name: 'Sampha', followStatus: 0},
		{id: 12, avatar: null, name: 'Sampha', followStatus: 0},
	])
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径
	.fans-list-comp {
		.fans-item-row{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 114rpx;
			&:not(:last-child) {
				border-bottom: 2rpx solid $Color-B-5;
			}
			.left {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				
				.fans-avatar {
					width: 48rpx;
					height: 48rpx;
					margin-right: 16rpx;
					border-radius: 100rpx;
				}
				.fans-name{
					//styleName: 正文-普通;
					font-family: PingFang SC;
					font-size: 14px;
					font-weight: 400;
					line-height: 19.6px;
					text-align: left;
					color: $Color-B-1;
				}
			}
			.right{
				.active {
					padding: 0rpx;
					height: 50rpx;
					line-height: 50rpx;
					width: 120rpx;
					text-align: center;
					border: 2rpx solid  $Color-B-4;
					font-family: PingFang SC;
					font-size: 24rpx;
					font-weight: 600;
					text-align: center;
					color:$Color-B-2;
					border-radius: 100rpx;
				}
				.normal {
					padding: 0rpx;
					height: 50rpx;
					line-height: 50rpx;
					width: 120rpx;
					text-align: center;
					font-family: PingFang SC;
					font-size: 24rpx;
					font-weight: 600;
					text-align: center;
					background-color:  $Color-B-1;
					border-radius: 100rpx;
					border: 0rpx;
					color: #fff;
				
				}
			}
			
		}
	}
</style>