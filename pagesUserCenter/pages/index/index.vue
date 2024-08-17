<template>
	<view class="user-center-page">
		<CustomNavBar></CustomNavBar>
		<view class="top-bk-box">
			<image class="bk-img" mode="aspectFill" src="../../static/images/user-center-default-avatar.svg"></image>
			<view class="top-info-box">
				<image class="info-bk-img" src="../../static/images/top-info-bk.svg"></image>
				<view class="info-content">
					<view class="user-info-row">
						<view class="user-info">
							<view class="name-row">
								<view class="name-text">{{userInfo.name}}</view>
								<view class="gender-icon"></view>
							</view>
							<view class="introduce-text">{{userInfo.desc}}</view>
						</view>
						<view class="user-avatar">
							<image class="avatar-img" src="../../static/images/user-center-default-avatar.svg"></image>
						</view>
					</view>
					<view class="user-data-row">
						<view class="data-item">
							<text class="item-num">{{userInfo.likedNum || 0}}</text>
							<text class="item-label">点赞</text>
						</view>
						<view class="data-item">
							<text class="item-num">{{userInfo.followedNum || 0}}</text>
							<text class="item-label">关注</text>
						</view>
						<view class="data-item">
							<text class="item-num">{{userInfo.fansNum || 0}}</text>
							<text class="item-label">粉丝</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="self-nav-container">
			<SelfNav v-if="pageViewType === 1"/>
			<OtherPageActions v-else />
			<UserCenterTab :tabs="tabs" :activeTab="activeTab" @changeTab="handleSetActiveTab"></UserCenterTab>
		</view>
	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue'
	import CustomNavBar from '@/components/CustomNavBar/CustomNavBar.vue';
	import SelfNav from '@/pagesUserCenter/components/selfNav/index.vue'
	import OtherPageActions from '@/pagesUserCenter/components/otherPageActions/index.vue'
	import UserCenterTab from '@/pagesUserCenter/components/tab/index.vue'
	let pageViewType = ref(2) // 页面视角 1 自己 0 他人
	let userInfo = {
		gender: 1,
		name: '荔枝涮黑豆黑豆黑豆黑豆黑豆',
		desc: '小小少年，很多烦恼很多烦恼很多很多狠小小少年，很多烦恼很多烦恼很多很多很多',
		likedNum: 200,
		followedNum: 200,
		fansNum: 200,
		role: 'user', // user 普通用户 business 商家
	}
	
	let tabs = ref([
		{label: '一起野',key: 0, defaultIcon: '../../static/icons/tabs/play-together-normal.svg', activeIcon: '../../static/icons/tabs/play-together-active.svg'},
		{label: '新鲜事',key: 1, defaultIcon: '../../static/icons/tabs/news-normal.svg', activeIcon: '../../static/icons/tabs/news-active.svg'},
		{label: '找搭子',key: 2, defaultIcon: '../../static/icons/tabs/find-friends-normal.svg', activeIcon: '../../static/icons/tabs/find-friends-active.svg'},
	])
	let activeTab = ref(0)
	
	// 设置激活tab
	const handleSetActiveTab = (val) => {
		activeTab.value = val
	}
	
	
	
</script>

<style lang="scss" scoped>
	.user-center-page {
		height: 100vh;
		width: 100vw;

		.top-bk-box {
			position: relative;
			height: 520rpx;
			overflow: hidden;
			// padding-top: 300rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			.bk-img {
				width: 900rpx;
				height: 520rpx;
				position: absolute;
				top: 0rpx;
				filter: blur(10px);
				left: -100rpx;
				z-index: 100;
			}

			.top-info-box {
				z-index: 101;

				.info-bk-img {
					width: 100%;
					position: absolute;
				}

				.info-content {
					padding-left: 32rpx;
					padding-right: 40rpx;

					.user-info-row {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: flex-start;
						height: 100%;
						padding-top: 140rpx;
						position: relative;


						.user-info {
							margin-top: 50rpx;
							width: calc(100% - 160rpx);

							.name-row {
								display: flex;
								flex-direction: row;
								justify-content: flex-start;
								align-items: center;
								margin-bottom: 8rpx;
								height: 44rpx;
								line-height: 44rpx;

								.name-text {
									font-weight: 600;
									font-size: 32rpx;
								}
							}

							.introduce-text {
								font-weight: 400;
								font-size: 28rpx;
								color: rgba(117, 117, 117, 1);
								line-height: 40rpx;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
								text-overflow: ellipsis;

							}
						}

						.user-avatar {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;

							.avatar-img {
								width: 128rpx;
								height: 128rpx;
								border-radius: 100rpx;
								margin-bottom: 32rpx;
							}
						}
					}

					.user-data-row {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						position: relative;
						margin-top: 16rpx;
						height: 40rpx;

						.data-item {
							display: flex;
							margin-right: 32rpx;

							.item-num {
								font-weight: 600;
								font-size: 28rpx;
								margin-right: 4rpx;

							}

							.item-label {
								font-weight: 400;
								font-size: 24rpx;
								color: rgba(117, 117, 117, 1);

							}
						}
					}
				}
			}
		}
	
		.self-nav-container{
			padding: 16rpx 32rpx;
			margin-top: 18rpx;
		}
	}
</style>