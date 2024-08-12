<template>
	<div class="tabbar">
		<div class="tab-item" :class="[currentPage === '/pages/index/index' ? 'tab-item_selected' : '']"
			@click="goTo('/pages/index/index')">
			<img
				:src="currentPage === '/pages/index/index' ? '/static/images/home_selected.png' : '/static/images/home.png'" />
			<span>首页</span>
		</div>

		<view class="popup-overlay" v-if="visible" @click="handleOverlayClick">
		</view>
		<view class="popup-content" :class="[visible ? 'fade-enter' : 'fade-leave']" v-show="visible">
		<view class="popup-body" @click.stop>
			<view class="popup-top" @click="doPath('/pagesToggle/pages/public/public')">
				<view class="popup-title">一起野</view>
				<view class="popup-desc">我是活动主理人，发起付费活动</view>
				<view class="popup-tag">未认证</view>
				<image src="../../static/images/popu-1.png" mode=""></image>
			</view>
			<view class="popup-bottom">
				<view>
					<view class="popup-title">找搭子</view>
					<view class="popup-desc">找搭子一起玩</view>
					<image src="../../static/images/popu-2.png" mode=""></image>
				</view>
				<view>
					<view class="popup-title">新鲜事</view>
					<view class="popup-desc">记录附近新鲜事</view>
					<image src="../../static/images/popu-3.png" mode=""></image>
				</view>
			</view>
		</view>
			<view class="popup-close">
				<view class="popup-close-icon" @click="handleOverlayClick">
					<image src="../../static/images/close.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<div class="tab-item center-item" @click="addAction">
			<div class="add-button">
				<img src="/static/images/add.png" alt="" />
			</div>
		</div>

		<div class="tab-item" :class="[currentPage === '/pages/explore/explore' ? 'tab-item_selected' : '']"
			@click="goTo('/pages/explore/explore')">
			<img
				:src="currentPage === '/pages/explore/explore' ? '/static/images/explore_selected.png' : '/static/images/explore.png'" />
			<span>探索</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: '',
				visible: false
			}
		},
		methods: {
			doPath(url) {
				if (!url) return 
				uni.navigateTo({
					url
				})
			},
			goTo(pagePath) {
				uni.switchTab({
					url: pagePath
				});
			},
			addAction() {
				this.visible = true
				// 触发点击事件
				console.log('Add button clicked');
				// 你可以在这里处理点击事件，比如弹出一个对话框
			},
			updateCurrentPage() {
				const pages = getCurrentPages();
				if (pages.length) {
					const currentPage = pages[pages.length - 1];
					this.currentPage = '/' + currentPage.route;
				}
			},
			handleOverlayClick() {
				this.visible = false
			}
		},
		mounted() {
			this.updateCurrentPage();
		},
		watch: {
			// 监听路由变化
			'$route'() {
				this.updateCurrentPage();
			},
		}
	}
</script>

<style scoped lang="scss">
	.tabbar {
		display: flex;
		flex-direction: row;
		width: calc(100vw - 80rpx);
		height: 108rpx;
		margin: 0 40rpx;
		box-sizing: border-box;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 84rpx;
		background-color: #fff;
		z-index: 9;
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
		border-radius: 40rpx;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		font-size: 10px;
		color: #a3a3a2;
	}

	.tab-item_selected {
		color: #222;
	}

	.tab-item image {
		width: 48rpx;
		height: 48rpx;
	}

	.center-item {}

	.center-item image {
		width: 64rpx;
		height: 64rpx;
	}

	.tab-item span {
		font-size: 12px;
		margin-top: 5px;
	}

	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
.fade-enter {
  animation: fadeIn .4s;
}
.fade-leave {
  animation: fadeIn .2s reverse;
}
@keyframes fadeIn {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
	.popup-content {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 32rpx;
		width: 100vw;
		background-color: #fff;
		border-top-right-radius: 16rpx;
		z-index: 10;
		box-sizing: border-box;
		padding-bottom: 80rpx;
		border-radius: 10px;
		transition: transform 0.3s;

		image {
			height: 160rpx;
			width: 160rpx;
		}

		.popup-body {
			position: relative;
		}

		.popup-tag {
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}

		.popup-title {
			font-family: PingFang SC;
			font-size: 40rpx;
			font-weight: 600;
			line-height: 36rpx;
			padding-bottom: 16rpx;
			height: 56rpx;
			line-height: 56rpx;
		}

		.popup-desc {
			font-family: PingFang SC;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
		}

		.popup-top {
			position: relative;
			background-color: #FFF7E2;
			border-radius: 16rpx;
			margin-bottom: 32rpx;
			padding: 30rpx;
			overflow: hidden;

			image {
				position: absolute;
				width: 173rpx;
				height: 130rpx;
				bottom: 8rpx;
				right: 100rpx;
				gap: 0px;

			}
		}

		.popup-bottom {
			position: relative;
			display: flex;
			gap: 32rpx;

			>view {
				position: relative;
				padding: 30rpx;
				border-radius: 16rpx;
				flex: 1;
				background-color: #E3F7FF;
				overflow: hidden;

				image {
					position: absolute;
					width: 200rpx;
					height: 130rpx;
					bottom: 0rpx;
					right: -2rpx;
					gap: 0px;
				}
			}
		}

		.popup-close {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 32rpx;
			padding-bottom: 40rpx;

			>view {
				width: 56rpx;
				height: 56rpx;
				background-color: #F3F3F3;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>