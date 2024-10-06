<template>
	<view class="explore-page">
		<!-- 页面内容 -->
		<home-navbar @selectLoaction='doAction' :title="navTitle" :userInfo="userInfo" />
		<view class="page-body" :style="{ marginTop: statusBarHeight }">
			<view class="banner-box">
				<swiper
					class="swiper"
					:autoplay=true
					:interval="3000"
					:duration="500"
					indicator-dots
					:circular="true"
					indicator-active-color="#007aff"
				>
					<swiper-item v-for="(item, index) in images" :key="index">
						<image :src="item.images" mode="aspectFill" class="swiper-image"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- <view class="top-nav-box">
				<view class="title">探索一起野</view>
				<view class="nav-row">
					<view class="nav-item">
						<image class="nav-img" src="../.../static/images/hot-activity.svg"></image>
					</view>
					<view class="nav-item">@
						<image class="nav-img" src="../../static/images/owner-principal.svg"></image>
					</view>
				</view>
			</view> -->
			<view class="page-content">
				<view class="title-row">
					<view class="title">探索好店铺</view>
					<view class="recommend-tag" @click="showPopup">
						<image class="prev-icon" src="../../static/images/explore-prev-recommend-icon.svg"></image>
						<text>推荐优质商家赢礼包🎁</text>
					</view>
				</view>

				<view class="search-row">
					<image class="searc-icon" src="../../static/images/search.svg"></image>
					<input class="search-input" placeholder="找找附近的好去处..."></input>
				</view>
				<scroll-view scroll-x>
					<view class="explore-type-row">
						<view v-for="item in typeOptions" :key="item.id"
							:class="choosenType == item.id ? 'filter-item filter-item-active' : 'filter-item'">
							<view class="type-img">
								<image class="item-img" :src="item.img"></image>
							</view>
							<view class="item-name">{{ item.name }}</view>
						</view>
					</view>
				</scroll-view>

				<view class="shop-group">
					<ExploreIndexShopCardGroup :list="shopList" />
				</view>

			</view>
		</view>
		<CustomTabbar />

		 <!-- 发布成功 -->
		 <Popup
      :show="publicSuccessShow"
      :fabuParams="fabuParams"
      @close="publicSuccessClose"
      @view="doView"
    ></Popup>
	</view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CustomTabbar from "@/components/Tabbar/Tabbar.vue";
import http from "@/utils/http.js";
import HomeNavbar from "@/components/Navbar/HomeNavbar.vue";
import { onReachBottom } from '@dcloudio/uni-app';
import Popup from './popup.vue'

import ExploreIndexShopCardGroup from "@/components/ExploreIndexShopCardGroup/index.vue";

let navTitle = ref("西安交通大学博学楼");
let statusBarHeight = ref("80rpx");
let publicSuccessShow = ref(false);
let shopList = ref([])
let pageSize = ref(1)
const images = ref([])
onMounted(() => {
	statusBarHeight.value = uni.getStorageSync("navBarHeight") * 2 + 30 + "rpx";
	 http.homeNoticeList({
      type: 1,
    }).then(res => {
		images.value = res.data || []
	})
});
const doAction = () => {
	let selectLocation = uni.getStorageSync('location')
	userInfo.value = { ...userInfo.value, address: selectLocation.address }
};
async function getLocation () {
		let location = uni.getStorageSync('location')
		if (!location) return
		let res = await http.getAddress({
			longitude: location.longitude,
			latitude: location.latitude,
		})
		userInfo.value = { ...userInfo.value, address: res.data }
	}
	getLocation()
const userInfo = ref(uni.getStorageSync("userInfo"));
console.log(userInfo.value);
let choosenType = ref(0);
let typeOptions = ref([
	{ id: 0, name: "全部活动", img: "../../static/images/explore-all-type.svg" },
]);

function getheaderList() {
	const location = uni.getStorageSync("location");
	http.headerList({
		"pageNum": "10",
		"pageSize": pageSize.value,
		"name": "",
		longitude: location.longitude,
      	dimension: location.latitude,

	}).then(res=> {
		shopList.value = shopList.value.concat(res.data.list || [])
	})
}
getheaderList()

function showPopup() {
	publicSuccessShow.value = true;
}
function doView() {
	publicSuccessShow.value = false;
}
function publicSuccessClose() {
	publicSuccessShow.value = false;
}
 // 下拉刷新
onReachBottom(() => {
	console.log('下拉刷新')
	pageSize.value += 1
	getheaderList()
})
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径
/* 页面样式 */

.page-body {
	.banner-box {
		margin: 0rpx 36rpx 0rpx 28rpx;
		height: 252rpx;
		border-radius: 16rpx;
		background-color: $Color-B-5;
		margin-bottom: 2rpx;
		.swiper{
			width: 100%;
			height: 100%;
			.swiper-image{
				width: 100%;
				height: 100%;
				border-radius: 16rpx;
			}
		}
	}

	.top-nav-box {
		margin: 32rpx 30rpx;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			text-align: left;
			color: $Color-B-1;
			margin-bottom: 32rpx;
		}

		.nav-row {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.nav-item {
				width: 327rpx;
				height: 164rpx;
				border-radius: 24rpx;

				.nav-img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.page-content {
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		padding: 40rpx 32rpx;
		background-color: $Color-B-5;
		min-height: calc(100vh - 600rpx);

		.title-row {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 32rpx;
				font-weight: 600;
				text-align: left;
				color: $Color-B-1;
			}

			.recommend-tag {
				border-radius: 32rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border: 2rpx solid #7354ff;
				padding: 10rpx 20rpx;

				.prev-icon {
					width: 34rpx;
					height: 34rpx;
					margin-right: 8rpx;
				}
			}
		}

		.search-row {
			margin-top: 32rpx;
			margin-bottom: 32rpx;
			height: 72rpx;
			background-color: #fff;
			border: 2rpx solid rgba(151, 151, 151, 0.2);
			border-radius: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 0rpx 32rpx;

			.searc-icon {
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}

			.search-input {}
		}

		.explore-type-row {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			.filter-item {
				width: 136rpx;
				height: 136rpx;
				border-radius: 28rpx;
				overflow: hidden;
				padding: 4rpx;
				background-color: rgba(235, 231, 253, 1);
				margin-right: 16rpx;

				.type-img {
					width: 100%;
					height: 88rpx;
					border-radius: 28rpx 28rpx 0rpx 0rpx;
					overflow: hidden;

					.item-img {
						width: 100%;
						height: 100%;
					}
				}

				.item-name {
					height: 48rpx;
					font-size: 24rpx;
					font-weight: 600;
					text-align: center;
					color: $Color-B-1;
					line-height: 40rpx;
				}
			}

			.filter-item-active {
				background-color: rgba(115, 84, 255, 1);

				.item-name {
					color: #ffffff;
				}
			}
		}
	}
}
</style>