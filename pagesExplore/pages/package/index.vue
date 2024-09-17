<template>
	<scroll-view scorll-y class="explore-package-page">
		<view class="package-title">风味至夏「双人套餐」</view>
		<view class="package-images-box"></view>
		<view class="package-price-sales">
			<view class="price-info">
				<view class="current-price">¥588</view>
				<view class="old-price">¥799</view>
			</view>
			<view class="sales-info">已售 10万+份</view>
		</view>
		<view class="top-other-info-box">
			<view class="info-item">
				<view class="item-label">须知</view>
				<view class="item-value">周一至周日可用</view>
			</view>
			<view class="info-item">
				<view class="item-label">门店</view>
				<view class="item-value">长安荟·原味陕菜</view>
			</view>
		</view>
		<view class="detail-info">
			<PackageDetailListVue :detailList="details"/>
		</view>
		<View class="footer-actions">
			<button class="submit-btn">立即购买</button>
		</View>
	</scroll-view>
</template>

<script setup>
	import {ref} from 'vue'
	import PackageDetailListVue from '../../components/packageDetailList.vue';
	
	const details = [{
		title: '前菜',
		items:[
			{name: '凉拌木耳', num:1, price: 10},
			{name: '韩城红袍酥排', num:1, price: 10},
			{name: '韩城红袍酥排', num:1, price: 10},
		]
	},{
		title: '汤品',
		items:[
			{name: '凉拌木耳', num:1, price: 10},
			{name: '韩城红袍酥排', num:1, price: 10},
			{name: '韩城红袍酥排', num:1, price: 10},
		]
	}]
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.explore-package-page {
		padding-bottom: 230rpx;
		.package-title {
			font-family: PingFang SC;
			font-size: 40rpx;
			font-weight: 600;
			color: $Color-B-1;
			margin: 32rpx;

		}

		.package-images-box {
			margin: 32rpx;
			width: 686rpx;
			height: 460rpx;
			border-radius: 32rpx;
			background-color: #ccc;

		}

		.package-price-sales {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 0rpx 32rpx;

			.price-info {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.current-price {
					font-size: 40rpx;
					font-weight: 600;
					margin-right: 8rpx;
					line-height: 56rpx;
					color: rgba(115, 84, 255, 1);
				}

				.old-price {
					font-size: 20rpx;
					font-weight: 400;
					text-decoration: line-through;
					color: $Color-B-3;
					line-height: 28rpx;
				}
			}

			.sales-info {
				//styleName: 正文-普通;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				color: $Color-B-3;
			}
		}
		.top-other-info-box {
			margin: 0rpx 32rpx;
			padding-bottom: 32rpx;
			margin-top: 18rpx;
			border-bottom: 1rpx solid $Color-B-4;
			.info-item {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.item-label {
					font-family: PingFang SC;
					font-size: 28rpx;
					font-weight: 400;
					margin-right: 32rpx;
					color: $Color-B-3;
				}
				.item-value {
					font-family: PingFang SC;
					font-size: 28rpx;
					font-weight: 400;
					color: $Color-B-1;
				}
			}
		}
		.detail-info {
			margin: 32rpx;
			border-bottom: 1rpx solid $Color-B-4;
		}
		.footer-actions {
			position: fixed;
			bottom: 0rpx;
			right: 0rpx;
			left: 0rpx;
			height: 220rpx;
			background-color: #ffffff;
			padding: 32rpx;
			box-sizing: border-box;
			.submit-btn {
				background-color: rgba(34, 34, 34, 1);
				color: #ffffff;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				text-align: center;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 100rpx;
		
			}
			
		}
	}
</style>