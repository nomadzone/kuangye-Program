<template>
	<view class="partner-modal-contract-box">
		
		
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
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

<style lang="scss" scoped>
	.partner-modal-contract-box {
		height:686rpx;
		padding: 32rpx;
		border-radius:24rpx;
		background: linear-gradient(180deg, #A8E6FF 2%, #E3F7FF 57.5%);

	}
</style>