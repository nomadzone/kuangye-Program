<!-- 套餐详情明细 -->
<template>
	<view class="package-detail-list-page">
		<view class="title">套餐详情</view>
		<view class="detail-box">
			<view class="each-block" v-for="(item, index) in detailList" :key="index">
				<view class="block-title">
					<image class="dot-icon" src="../static/images/dot.svg"></image>
					<view class="title-text">{{item.title}}</view>
				</view>
				<view class="each-block-items">
					<view class="item-row" v-for="(blockItem, blockItemIndex) in item.items">
						<view class="name-text">{{blockItem.name}}</view>
						<view class="num-price">
							<view class="num-text">x {{item.num}}份</view>
							<view class="price-text">¥{{item.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';
	const props = defineProps({
		detailList: Array,
	})
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.package-detail-list-page {
		.title {
			font-family: PingFang SC;
			font-size: 32rpx;
			font-weight: 600;
			color: $Color-B-1;
			margin-bottom: 32rpx;

		}

		.each-block {
			margin-bottom: 32rpx;

			.block-title {
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				margin-bottom: 8rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				
				.dot-icon {
					width: 40rpx;
					height: 40rpx;
				}

			}

			.each-block-items {
				padding-left: 40rpx;

				.item-row {
					display: flex;
					height: 40rpx;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					&:not(:last-child) {
						margin-bottom: 8rpx;
					}

					.name-text {
						font-family: PingFang SC;
						font-size: 28rpx;
						font-weight: 400;
						color: $Color-B-1;




					}

					

					.num-price {
						display: flex;
						flex-direction: row;
						justify-content: flex-end;
						align-items: center;

						.num-text {
							font-family: PingFang SC;
							font-size: 28rpx;
							font-weight: 400;
							color: $Color-B-3;
						}

						.price-text {
							width: 134rpx;
							text-align: right;
							font-size: 28rpx;
							font-weight: 400;
							color: $Color-B-1;
						}
					}
				}
			}
		}
	}
</style>