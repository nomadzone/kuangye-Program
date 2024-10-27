<template>
	<view class="gradual" :style="{ 'background-image': background, height: height, 'z-index': zIndex, ...styles }"></view>
</template>

<script>
	export default {
		props: {
			zIndex: {
				type: String,
				default: '3'
			},
			background: {
				type: String,
				default: 'linear-gradient(to bottom, #90f2ff, rgba(130, 240, 255, 0.31))'
			},
			height: {
				type: String,
				default: '20rpx'
			},
			styles: {
				type: Object,
				default: ()=> {
					return {}
				}
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.gradual {
		position: fixed;
		top: 0rpx;
		left: 0;
		width: 100vw;
		height: 20rpx;
		// 线性渐变
		background: rgba(255, 255, 255, 0.5) !important;
		// 模糊blur 效果
		backdrop-filter: blur(10px);
	}
</style>