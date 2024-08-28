<template>
	<view class="fresh-news-detail-page">
		<DetailTopNav></DetailTopNav>
		<view class="top-swipper-box">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" indicator-color="rgba(221, 221, 221, 1)"
				indicator-active-color="rgba(111, 223, 176, 1)">
				<swiper-item class="swiper-item-box">
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="info-box">
			<view class="title-text">{{detailInfo.title}}</view>
			<view class="content-text">{{detailInfo.content}}</view>
			<view class="time-text">{{detailInfo.createTime}}</view>
		</view>
		<view class="comment-num-row">
			评论 <text class="comment-num-text">{{detailInfo.commentNum}}</text>
		</view>
	</view>
</template>

<script setup>
	import DetailTopNav from '../../components/detailTopNav/index.vue'
	import {
		ref
	} from 'vue'

	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(3000)
	const duration = ref(1000)


	const detailInfo = ref({
		title: '距离进入宫崎骏的世界只差一杯冰淇淋芭菲🍃',
		content: '一切的惬意组合在一起大概就像是穿越进了动画中…这一切在愚园路ConnieHe就能实现…愚园路店限定樱花皮肤已上线…🌸在最近大好的阳光下更加出片啦…再配上新品“抹茶柚子蒙布朗冰淇淋芭菲”🍵微风拂面、竟有一点初夏的感觉了🌞',
		createTime: '5天前发布',
		commentNum: 100
	})
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.fresh-news-detail-page {
		width: 100vw;
		height: 100vh;
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
		.comment-num-row{
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
	}
</style>