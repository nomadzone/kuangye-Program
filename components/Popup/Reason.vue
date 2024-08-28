<template>
	<view class="list">
		<view v-for="(item, index) in list" :key="index" @click="doCheck(item, index)">
			<text>{{ item.label }}</text>
			<image v-if="checkedIndex !== index" src="../../static/images/checkbox.png" mode=""></image>
			<image v-if="checkedIndex === index" src="../../static/images/checkbox-blue.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				checkedIndex: 0
			}
		},
		created() {
			this.checkedIndex = this.index
		},
		methods: {
			doCheck(item, i) {
				this.checkedIndex = i
				this.$emit('checked', item, i)
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		max-height: 700rpx;
		overflow-y: auto;
		padding: 32rpx 16rpx 32rpx 0rpx;
		> view {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 104rpx;
			border-bottom: #eee;
			&:last-child {
				border-bottom: 0;
			}
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
</style>