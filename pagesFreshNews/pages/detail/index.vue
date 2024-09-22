<template>
	<view class="fresh-news-detail-page">
		<DetailTopNav :info="detailInfo" @refreshFollowStatus="handleRefreshFollowStatus"></DetailTopNav>
		<view class="top-swipper-box">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" indicator-color="rgba(221, 221, 221, 1)"
				indicator-active-color="rgba(111, 223, 176, 1)">
				<swiper-item class="swiper-item-box" v-for="(item, index) in swiperImgs" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="widthFix" class="swiper-item-img"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<view class="info-box">
			<view class="title-text">{{detailInfo.title}}</view>
			<view class="content-text">{{detailInfo.describe}}</view>
			<view class="time-text">{{detailInfo.createTime}}</view>
		</view>
		<view class="comment-num-row">
			评论 <text class="comment-num-text">{{detailInfo.commentNum}}</text>
		</view>
		<Comments :dataId="initId" />
		<view class="bottom-comment-box">
			<view class="input-box">
				<image src="../../static/images/comment-prev-icon.svg" class="prev-icon"></image>
				<input class="uni-input" @input="commentInput" v-model="commentInputValue" @confirm="submitComment()"
					placeholder="说点什么" />
			</view>
			<view class="actions">
				<view class="action-item">
					<image v-if="detailInfo.upUserStatus === 0" class="item-icon" src="../../static/images/like-icon.svg" @tap="handleChangeLike()"></image>
					<image v-else class="item-icon" src="../../static/images/liked.svg" @tap="handleChangeLike()"></image>
					<text class="item-num">{{detailInfo.upnumber || 0}}</text>
				</view>
				<view class="action-item">
					<image class="item-icon" src="../../static/images/comment-icon.svg"></image>
					<text class="item-num">{{detailInfo.commentNumber}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import DetailTopNav from '../../components/detailTopNav/index.vue'
	import Comments from '../../components/comments/index.vue'
	import freshNewsService from '../../service/service';
	import {
		debounce
	} from '../../../utils';
	onMounted(() => {})

	const initId = ref('')
	onLoad((options) => {

		initId.value = options.id
		getDetailInfo()
	})
	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(3000)
	const duration = ref(1000)


	let rebackId = ref(null) // 评论回复id


	const detailInfo = ref({

	})

	// 查询新鲜事详情
	const swiperImgs = ref([])
	const getDetailInfo = () => {
		let params = {
			id: initId.value
		}
		freshNewsService.detailInfo(params).then(res => {
			console.log('res====', res)
			if (res && res.code === '200') {
				detailInfo.value = res.data
				swiperImgs.value = res.data.images.split(',') || []
			}
		})
	}

	// 输入评论
	let commentInputValue = ref('')
	const commentInput = (e) => {
		commentInputValue.value = e.target.value
	}

	// 提交评论
	const submitComment = debounce(() => {
		let params = {
			activityId: initId.value,
			content: commentInputValue.value,
			topId: rebackId.value
		}

		console.log('params=====', params)

		freshNewsService.commentAdd(params).then(res => {
			if (res && res.code === '200') {
				console.log(res)
			}
		})

	}, 1500)
	
	// 更新关注状态
	const handleRefreshFollowStatus = () => {
		detailInfo.value = {
			...detailInfo.value,
			userStatus: !detailInfo.value.userStatus
		}
	}
	
	//  修改点赞状态
	const handleChangeLike  = () => {
		let params = {
			type: 1,
			commentId: initId.value
		}
		
		if(detailInfo.value.upUserStatus === 0) {
			freshNewsService.addLike(params).then(res => {
				if(res && res.code === '200') {
					detailInfo.value = {
						...detailInfo.value,
						upUserStatus: detailInfo.value.upUserStatus === 0 ? 1: 0,
						upnumber: detailInfo.value.upnumber + 1
					}
					
					console.log('detailInfo.value====', detailInfo.value)
				}
			})
		} else {
			freshNewsService.cancelLike(params).then(res => {
				if(res && res.code === '200') {
					detailInfo.value = {
						...detailInfo.value,
						upUserStatus: detailInfo.value.upUserStatus === 0 ? 1: 0,
						upnumber: detailInfo.value.upnumber - 1
					}
					
					console.log('detailInfo.value====', detailInfo.value)
				}
			})
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.fresh-news-detail-page {
		width: 100vw;
		min-height: 100vh;
		padding-bottom: 200rpx;
		background: linear-gradient(180deg, #E1FFF8 0%, #E1FFF8 17%, #FFFFFF 33%);

		.top-swipper-box {
			height: 774rpx;
			background-color: #ffffff;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			margin-top: 16rpx;
			overflow: hidden;

			.swiper {
				height: 100%;

				.swiper-item-box {
					height: 100%;

					.swiper-item {
						width: 100%;
						height: 100%;

						.swiper-item-img {
							width: 100%;
						}
					}

				}
			}
		}

		.info-box {
			margin: 24rpx;
			border-bottom: 2rpx solid $Color-B-5;

			.title-text {
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 600;
				text-align: left;
				margin-bottom: 16rpx;


			}

			.content-text {
				//styleName: 正文-普通;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				text-align: left;
				margin-bottom: 32rpx;

			}

			.time-text {
				//styleName: 小字-普通;
				font-family: PingFang SC;
				font-size: 24rpx;
				font-weight: 400;
				text-align: left;
				color: $Color-B-3;
				margin-bottom: 18rpx;

			}
		}

		.comment-num-row {
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 16rpx 32rpx 32rpx;
			color: $Color-B-1;
			font-family: PingFang SC;
			font-size: 24rpx;
			font-weight: 400;
			text-align: left;

			.comment-num-text {
				padding-left: 6rpx;
			}
		}

		.bottom-comment-box {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ffffff;
			height: 188rpx;
			padding: 0rpx 32rpx;
			padding-top: 24rpx;
			border-top: 1rpx solid $Color-B-5;
			box-sizing: border-box;

			.actions {
				width: 240rpx;
				display: flex;
				padding-left: 24rpx;
				justify-content: space-between;
				align-items: center;
				height: 72rpx;
				padding: 0rpx 32rpx;

				.action-item {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;

					.item-icon {
						width: 48rpx;
						height: 48rpx;
						margin-right: 3rpx;
					}

					.item-num {
						font-size: 30rpx;
						color: $Color-B-1
					}
				}
			}

			.input-box {
				width: calc(100% - 240rpx);
				display: flex;
				flex-direction: row;
				background-color: $Color-B-5;
				border-radius: 122rpx;
				height: 72rpx;
				padding: 0rpx 32rpx;
				align-items: center;

				.prev-icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 16rpx;
				}
			}
		}
	}
</style>