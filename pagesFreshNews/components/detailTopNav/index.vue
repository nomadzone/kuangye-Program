<!-- components/CustomNavBar.vue -->
<template>
	<view class="nav-bar" :style="navBarStyleObj">
		<view class="left">
			<image class="back-icon"  @click="onBack" src="@/static/images/back.png"></image>
			<view class="author-avatar" @click="toInfo">
				<image class="author-img" :src="info.avatarUrl"></image>
			</view>
			<text @click="toInfo" class="author-name">{{info.nickname}}</text>
		</view>
		<view class="right" @tap="handleChangeFollowStatus()">
			<view v-if="info.userStatus" class="followed">已关注</view>
			<view v-else class="unfollow">
				<image class="add-follow-icon" src="../../static/images/top-nav-follow.svg"></image>
				<text class="follow-text">关注</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		onMounted,
		ref,
		defineEmits
	} from 'vue';
	import freshNewsService from '../../service/service';
	const emitFn = defineEmits("refreshFollowStatus,inToInfo")
	let navBarHeight = ref(40)
	let statusBarHeight = ref(40)
	const props = defineProps({
		navBarStyle: {
			type: Object,
			default: () => {
				return {}
			}
		},
		info: {
			type: Object,
			default: () => {
				return {}
			}
		},


	});

	const navBarStyleObj = ref({})
	onMounted(() => {
		uni.getSystemInfo().then(res => {
			navBarHeight.value = (res.statusBarHeight + 41) * 2
			statusBarHeight.value = res.statusBarHeight * 2
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

			console.log('menuButtonInfo====', menuButtonInfo)

			navBarStyleObj.value = {
				...props.navBarStyle,
				height: (res.statusBarHeight + 41) * 2 + 'rpx',
				paddingTop: res.statusBarHeight * 2 + 'rpx',
				paddingRight: (menuButtonInfo.width) * 2 + 40 + 'rpx'
			}

		})
	})

	// 修改关注状态
	const handleChangeFollowStatus = () => {
		uni. showLoading({
			title: '加载中'
			})
		let params ={
			userId: props.info.activityUserId
		}
		freshNewsService.changeFollowStatus(params).then(res =>  {
			if(res && res.code === '200') {
				uni.showToast({
					icon: 'none',
					title: props.info.userStatus ?'已取消关注':'关注成功'
				})
				emitFn('refreshFollowStatus')
				
			}
		})
		.finally(() => {
			uni.hideLoading()
			})
	}

	function onBack() {
		uni.navigateBack();
	}
		// 跳转个人信息
		function toInfo() {
			emitFn('inToInfo')
		}
</script>

<style scoped lang="scss">
	@import "@/static/config.scss"; // 注意相对路径

	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
		/* 导航栏背景色 */
		color: #fff;
		/* 文字颜色 */
		padding: 0 16px;
		box-sizing: border-box;

		.left {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;

			.back-icon {
				width: 40rpx;
				height: 40rpx;
			}

			.author-avatar {
				margin-left: 10rpx;
				width: 48rpx;
				height: 48rpx;
				border-radius: 100rpx;
				overflow: hidden;
				margin-right: 8rpx;

				.author-img {
					width: 100%;
					height: 100%;

				}


			}

			.author-name {
				width: 222rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				text-align: left;
				color: $Color-B-1;

			}

		}

		.right {
			.unfollow {
				width: 112rpx;
				height: 50rpx;
				border-radius: 100rpx;
				background-color: $Color-B-1;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.add-follow-icon {
					width: 28rpx;
					height: 28rpx;
					margin-right: 4rpx;
				}

				.follow-text {
					font-size: 24rpx;
					font-weight: 600;
					color: #ffffff;

				}
			}

			.followed {
				width: 112rpx;
				height: 50rpx;
				border-radius: 100rpx;
				 border: 2rpx solid $Color-B-1;
				color: $Color-B-1;
				font-size: 24rpx;
				text-align: center;
				line-height: 50rpx;
			}
		}
	}
</style>