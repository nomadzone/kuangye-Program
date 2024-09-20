<template>
	<view class="search">
		<view class="input">
			<view class="input-wrap">
				<image src="../../static/images/search.png" mode=""></image>
				<input type="text" placeholder="搜索活动、新鲜事及更多" v-model="value" @confirm="doSearch">
				<image class="close" src="../../static/images/input-close.png" @click="doClose" v-show="value" mode=""></image>
			</view>
			<button @click="doSearch">搜索</button>
		</view>
		<view style="height: 136rpx;"></view>
		<view class="history" v-if="history.length !== 0 && !isSearch">
			<view class="history-title">历史搜索</view>
			<view class="history-list">
				<view v-for="(item, index) in history" :key="index" @click="doHistory(item)">
					<text>{{item}}</text>
					<image @click.stop="doDelete(index)" src="../../static/images/delete.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="falls" v-show="isSearch">
			<HomeWaterfalls ref="HomeWaterfalls"></HomeWaterfalls>
		</view>
	</view>
</template>

<script>
import HomeWaterfalls from '@/components/HomeWaterfalls/HomeWaterfalls.vue'
	export default {
		components: {
			HomeWaterfalls
		},
		data() {
			return {
				value: '',
				isSearch: false,
				history: [],
				result: []
			}
		},
		onShow() {
			let searchHistory = uni.getStorageSync('searchHistory') || [];
			this.history = searchHistory
		},
		methods: {
			doDelete(index) {
				uni.showModal({
					title: '提示',
					content: '确认删除此搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.history.splice(index, 1);
							uni.setStorageSync('searchHistory', this.history);
						}
					}
				})
			},
			doClose() {
				this.value = ''
				this.result = []
				this.isSearch = false
			},
			async doHistory(text) {
				this.value = text;
				this.isSearch = true
				await this.$refs.HomeWaterfalls.getList({
					type: null,
					title: text,
					pageSize: 9999999
				})
			},
			async doSearch() {
				this.isSearch = true
				let searchHistory = uni.getStorageSync('searchHistory') || [];
				if (!searchHistory.includes(this.value)) {
					searchHistory.push(this.value);
					uni.setStorageSync('searchHistory', searchHistory);
					this.history.push(this.value)
				}
				await this.$refs.HomeWaterfalls.getList({
					type: null, 
					title: this.value,
					pageSize: 9999999
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		.input {
			position: fixed;
			top: -2rpx;
			left: 0;
			width: 100vw;
			padding: 32rpx;
			height: 136rpx;
			display: flex;
			align-items: center;
			gap: 16rpx;
			z-index: 9;
			box-sizing: border-box;
			background-color: #fff;
			.input-wrap {
				display: flex;
				align-items: center;
				background-color: #F5F5F5;
				border-radius: 48rpx;
				flex: 1;
				padding: 20rpx 24rpx;
				font-size: 24rpx;
				image {
					width: 32rpx;
					height: 32rpx;
				}
				input{
					flex: 1;
					padding-left: 16rpx;
					margin-right: 16rpx;
				}
			}
			button {
				height: 72rpx;
				width: 112rpx;
				flex: 0 0 112rpx;
				border-radius: 48rpx;
				background-color: #121212;
				color: #fff;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.close {
				width: 32rpx;
				height: 32rpx;
				z-index: 9;
			}
		}
		.history {
			padding: 0 32rpx;
			.history-title {
				height: 104rpx;
				line-height: 104rpx;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				color: #222;
				border-bottom: 1px solid #f5f5f5;
			}
			.history-list {
				>view {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #f5f5f5;
					height: 104rpx;
					line-height: 104rpx;
					font-size: 28rpx;
					font-weight: 400;
					image {
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}
		.falls {
			padding:0 32rpx 32px 32rpx;
		}
	}
</style>