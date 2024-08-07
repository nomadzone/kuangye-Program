<template>
	<view class="gradual" :style="{ 'background-image': background, height: height, 'z-index': zIndex }"></view>
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
				default: 'linear-gradient(to bottom, #90f2ff, rgba(130, 240, 255, 0.11))'
			},
			height: {
				type: String,
				default: '176rpx'
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
		top: 0;
		left: 0;
		width: 100vw;
		height: 176rpx;
		background-image: linear-gradient(to bottom, #90f2ff, rgba(130, 240, 255, 0.11));
	}
</style>