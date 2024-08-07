<template>
	<view class="page">
		<Navbar :title="'发布一起野'" />
		<Gradual :background="'linear-gradient(to bottom, #FFF7E2, rgb(255 247 226 / 11%))'" :height="'600rpx'" :zIndex="'-1'"/>
		<view style="z-index: 6;margin-top: 64rpx;">
			<view :style="{ height: StatusBar + 'px' }"></view>
			<view style="height: 32rpx"></view>
			<image class="popu-icon" src="../../static/images/hand_icon.png" mode=""></image>
			<view class="module">
					ddd
			</view>
		</view>
	</view>
</template>

<script>
	import Navbar from '@/components/Navbar/Navbar.vue';
	import Gradual from '@/components/Navbar/Gradual.vue'
	export default {
		components: {
			Navbar,
			Gradual
		},
		data() {
			return {
				StatusBar: 0,
			}
		},
		  created() {
			  const sys = wx.getSystemInfoSync()
			  this.StatusBar = sys.statusBarHeight
		  },
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 32rpx;
		position: relative;
		.popu-icon {
			position: absolute;
			top: 90rpx;
			left: 80rpx;
			width: 192rpx;
			height: 192rpx;
			z-index: 5;
		}
		.module {
			position: relative;
			 background-color: #fff;
			 border-radius: 16rpx;
			 width: 100%;
			 padding: 32rpx 24rpx;
			 z-index: 6;
			 box-sizing: border-box;
		}
	}
</style>