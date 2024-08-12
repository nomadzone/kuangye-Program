<template>
	<view class="user-center-page">
		<CustomNavBar></CustomNavBar>
		<view class="top-bk-box">
			<image class="bk-img" src="../../static/images/user-center-default-avatar.svg"></image>
			<view class="top-info-box">
				
				
			</view>
		</view>
	</view>

</template>

<script setup>
	import CustomNavBar from '@/components/CustomNavBar/CustomNavBar.vue';
	
</script>

<style lang="scss" scoped>
	.user-center-page {
		height: 100vh;
		width: 100vw;
		.top-bk-box {
			position: relative;
			height: 400rpx;
			overflow: hidden;
			padding-top: 300rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			
			.bk-img {
				width: 900rpx;
				height: 900rpx;
				position: absolute;
				top: -100rpx;
				filter: blur(10px);
				left: -100rpx;
				z-index: 100;
			}
			.top-info-box {
				height: 300rpx;
				background-color: #fff;
				z-index: 101;
				position: relative;
			}
		}
	}
</style>