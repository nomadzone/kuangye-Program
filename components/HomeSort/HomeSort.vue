<template>
	<view class="sort flex items-center">
		<view class="sort-item">
			<view :class="[sortIndex==0?'active':'']" @click="doSort(0)">全部</view>
			<view class="flex" :class="[sortIndex==1?'active':'']" @click="doSort(1)">
				<image :src="`../../static/images/sort-togger${sortIndex==1?'-seleted':''}.png`" mode=""></image>
				<text>一起野</text>
			</view>
			<view class="flex" :class="[sortIndex==2?'active':'']" @click="doSort(2)">
				<image :src="`../../static/images/sort-eye${sortIndex==2?'-seleted':''}.png`" mode=""></image>
				<text>新鲜事</text>
			</view>
			<view class="flex" :class="[sortIndex==3?'active':'']" @click="doSort(3)">
				<image :src="`../../static/images/sort-go${sortIndex==3?'-seleted':''}.png`" mode=""></image>
				<text>找搭子</text>
			</view>
		</view>
		<view class="sort-search" @click="doSearch">
			<image src="../../static/images/search.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				type:Number,
				default: 0
			}
		},
		data() {
			return {
				sortIndex: 0
			}
		},
		watch: {
			index(val) {
				this.sortIndex = val
			}
		},
		methods: {
			doSort(index) {
				this.sortIndex = 0;
				uni.setStorageSync('sortIndex', index === null ? 0 : index)
				this.$emit('action', index)
			},
			doSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.sort {
	height: 100rpx;
	color: #A3A3A3;
	font-family: PingFang SC;
	font-size: 32rpx;
	font-weight: 400;
	line-height: 45rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.sort-search {
		width: 72rpx;
		display: flex;
		align-items: center;
	}
	.active {
		color: #222222;
		font-weight: 600;
	}
	image {
		width: 48rpx;
		height: 48rpx;
		margin-right: 2rpx;
	}
	.sort-item {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: calc(100% - 72rpx);
		overflow-x: auto;
		padding-left: 10rpx;
		> view {
			margin-right: 32rpx;
			display: flex;
			align-items: center;
		}
	}
}
</style>