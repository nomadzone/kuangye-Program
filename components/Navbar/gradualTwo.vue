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
		top: 176rpx;
		left: 0;
		width: 100vw;
		height: 20rpx;
		background-image: linear-gradient(to bottom, #90f2ff10, rgba(130, 240, 255, 0.01));
	}
</style>