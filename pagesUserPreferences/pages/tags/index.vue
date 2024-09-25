<!-- 标签偏好选择 -->
<template>
	<view class="user-perference-tags-page">
		<custom-nav-bar title="" :navBarStyle="navBarStyle" theme="dark"></custom-nav-bar>
		<image class="top-bk-img" src="../../static/images/tags-page-bk.svg" mode="widthFix"></image>
		<view class="title-box">
			<view class="title-text">偏好设置</view>
			<view class="tips">我们将根据你的偏好为推荐个性内容</view>
		</view>
		<view class="tags-group-box">
			<view class="tags-group-item">
				<view class="title">性格偏好</view>
				<view class="tag-list">
					<view :class="choosenCharacter == item.value ? 'tag-item tag-item-active': 'tag-item'" v-for="(item, index) in characterOptions" :key="index" @tap="handleChangeChartTag(item.value)">
						<view class="tag-name">{{item.name}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="submit-actions">
			<button class="submit-btn" form-type="submit">选好了</button>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import CustomNavBar from '@/components/CustomNavBar/CustomNavBar.vue';
	const navBarStyle = {
		position: 'relative',
			color: 'rgba(34, 34, 34, 1)',
	}
	
	
	const characterOptions = ref([
		{name: '外向 e 人', value: 1},
		{name: ' 浅浅 i 人', value: 2},
	])
	const choosenCharacter = ref(null)
	
	// 选择性格偏好
	const handleChangeChartTag =(val) => {
		choosenCharacter.value= val
	}
	

</script>

<style lang="scss" scoped>
	.user-perference-tags-page {
		@import "@/static/config.scss"; // 注意相对路径
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		position: relative;
		.top-bk-img {
			position: absolute;
			left:0;
			top:0;
			width: 100vw;
			z-index: 10;
		}
		.title-box {
			margin: 48rpx;
			z-index: 999;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			position: relative;
			.title-text {
				font-family: PingFang SC;
				font-size: 40rpx;
				font-weight: 600;
				height: 56rpx;
				line-height: 56rpx;
				color: #121212;
				margin-bottom: 8rpx;
			}
			.tips{
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				height: 40rpx;
				line-height: 40rpx;
				color: $Color-B-2;
			}
		}
		.tags-group-box {
			position: relative;
			margin: 0rpx 0rpx 0rpx 48rpx;
			min-height: calc(100vh -  596rpx);
			
			z-index: 999;
			.tags-group-item {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: 24rpx;
				position: relative;
					
				.title {
					font-family: PingFang SC;
					font-size: 32rpx;
					font-weight: 600;
					text-align: left;
					height: 44rpx;
					line-height: 44rpx;
					margin-bottom: 24rpx;
					position: relative;
				}
				.tag-list {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					position: relative;
					.tag-item {
						margin-bottom: 24rpx;
						margin-right: 32rpx;
						width: 182rpx;
						height:50rpx;
						line-height: 50rpx;
						border-radius: 50rpx;
						border: 2rpx solid $Color-B-4;
						background-color: #fff;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						color: $Color-B-1;
						font-size: 24rpx;
						font-family: 'PingFang SC';
						position: relative;

					}
					.tag-item-active {
						border: 0rpx;
						background-color: #007AFF;
						color: #ffffff;
					}
					
					
				}
			}
			
			
		}
		.submit-actions {
			height: 220rpx;
			background-color: #ffffff;
			padding: 32rpx;
			box-sizing: border-box;
			.submit-btn {
				background-color: rgba(34, 34, 34, 1);
				color: #ffffff;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				text-align: center;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 100rpx;
			
			}
			
		}
	}
</style>