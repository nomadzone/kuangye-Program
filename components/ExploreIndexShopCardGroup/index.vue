<!-- 探索主界面-商家卡片组件 -->
<template>
	<view class="card-group">
		<view v-for="item in list" :key="item.id" class="explore-index-shop-card-comp" @click="toDetail(item)">
			<view class="show-img-box">
			<swiper
					class="swiper"
					:duration="500"
					indicator-dots
					:circular="true"
					indicator-active-color="#007aff"
				>
					<swiper-item v-for="(list, index) in item.profilePhotoUrl?.split(',')" :key="index">
						<image :src="list.images" mode="aspectFill" class="swiper-image"></image>
					</swiper-item>
				</swiper>
			</view> 
			<view class="shop-info-box">
				<view class="desc-recommend">
					<view class="desc-info">
						<view class="desc-tag-item" v-for="(tagItem, index) in item.tags " :key="index"><text class="tag-prev">#</text>{{tagItem}}
						</view>
					</view>
					<view class="recommed-info">{{item.recommendText}}</view>
				</view>
				<view class="shop_memo">{{ category || '暂无' }}</view>
				<view class="shop-info">
					<view class="left">
						<view class="shop-star">
							<image class="xing" src="/static/images/xing.png"></image>
							<view class="star-text">
								{{item.score}}
							</view>
						</view>
						<view class="price-text">￥{{item.perCapita}}/人</view>
						<view class="shop-type">{{item.categoryName}}</view>
					</view>
					<view class="right">
						<view class="distance-text">{{item.distanceMeters}}km</view>
						<view class="location-text">{{item.address}}</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script  setup>
	import { defineProps } from 'vue'
	const props = defineProps({
		list: Array
	});
	function toDetail(item) {
		uni.navigateTo({
			url: `/pages/explore/detail?item=${JSON.stringify(item)}`
			})
	}
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.card-group {
		margin-top: 32rpx;
	}

	.explore-index-shop-card-comp {
		border-radius: 32rpx;
		overflow: hidden;
		background-color: #fff;
		padding-bottom: 18rpx;

		.show-img-box {
			height: 340rpx;
			background-color: #ccc;
			.swiper{
				width: 100%;
				height: 100%;
				.swiper-image{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			
		}

		.shop-info-box {
			margin-top: 16rpx;
			padding: 0rpx 26rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.desc-recommend {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: 24rpx;
				font-weight: 600;
				letter-spacing: 0.5px;
				text-align: left;
				color: $Color-B-1;

				.desc-info {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
						
					.desc-tag-item {
						font-size: 24rpx;
						font-weight: 600;
						text-align: left;
						margin-right: 12rpx;
						.tag-prev {
							color: rgba(115, 84, 255, 1);
						}

					}
				}

				.recommed-info {
					padding-left: 14rpx;
					border-left: 2rpx solid $Color-B-4;
				}
			}
			.shop_memo{
				color: #222222;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
				line-height: 32rpx;
				font-size: 24rpx;
			}
			.shop-info{
				margin-top: 8rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				color:$Color-B-3;
				font-size: 24rpx;
				.left {
					padding-right: 18rpx;
					display: flex;
					.shop-star {
						display: flex;
						text-align: left;
						align-items: center;
						color: rgba(255, 177, 61, 1);
						margin-right: 8rpx;
						.xing {
							width: 24rpx;
            				height: 24rpx;
							margin-right: 16rpx;
						}
					}
					.price-text {
						
					}
					.shop-type{
						flex-shrink: 0;
						word-break: break-all;
					}
				}
				.right {
					padding-left: 14rpx;
					border-left: 2rpx solid $Color-B-4;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					.location-text{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

		}
	}
</style>