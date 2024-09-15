<!-- 探索主界面-商家卡片组件 -->
<template>
	<view class="card-group">
		<view v-for="item in list" :key="item.id" class="explore-index-shop-card-comp">
			<view class="show-img-box"></view>
			<view class="shop-info-box">
				<view class="desc-recommend">
					<view class="desc-info">
						<view class="desc-tag-item" v-for="(tagItem, index) in item.tags " :key="index"><text class="tag-prev">#</text>{{tagItem}}
						</view>
					</view>
					<view class="recommed-info">{{item.recommendText}}</view>
				</view>
				<view class="shop-info">
					<view class="left">
						<view class="shop-star">
							<view class="star-icon"></view>
							<view class="star-text">{{item.star}}</view>
						</view>
						<view class="price-text">{{item.price}}</view>
						<view class="shop-type">{{item.type}}</view>
					</view>
					<view class="right">
						<view class="distance-text">{{item.distance}}</view>
						<view class="location-text">{{item.location}}</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script lang="ts" setup>
	import { defineProps } from 'vue'
	const props = defineProps({
		list: Array
	});
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
		}

		.shop-info-box {
			margin-top: 16rpx;
			padding: 0rpx 26rpx;
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
						font-weight: 600;
						text-align: left;
						color: rgba(255, 177, 61, 1);
						margin-right: 8rpx;

					}
					.price-text {
						
					}
				}
				.right {
					padding-left: 14rpx;
					border-left: 2rpx solid $Color-B-4;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
				}
			}

		}
	}
</style>