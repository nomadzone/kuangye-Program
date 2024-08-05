<template>
	<div class="tabbar">
		<div class="tab-item" :class="[currentPage === '/pages/index/index' ? 'tab-item_selected' : '']"
			@click="goTo('/pages/index/index')">
			<img
				:src="currentPage === '/pages/index/index' ? '/static/images/home_selected.png' : '/static/images/home.png'" />
			<span>首页</span>
		</div>

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
				currentPage: ''
			}
		},
		methods: {
			goTo(pagePath) {
				uni.switchTab({
					url: pagePath
				});
			},
			addAction() {
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
			}
		},
		mounted() {
			this.updateCurrentPage();
		},
		watch: {
			// 监听路由变化
			'$route'() {
				this.updateCurrentPage();
			}
		}
	}
</script>

<style scoped>
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
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
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
</style>