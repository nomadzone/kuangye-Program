<template>
	<view class="explore-page">
		<!-- 页面内容 -->
		<home-navbar @selectLoaction='doAction' :title="navTitle" :userInfo="userInfo"  />
    <GradualTwo :height="statusBarHeight"></GradualTwo>
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
					<input class="search-input" placeholder="找找附近的好去处..." v-model="searchText" @confirm="getSearchheaderList"></input>
				</view>
				<view >
					<scroll-view scroll-x class="explore-type-row">
						<view v-for="item in typeOptions" :key="item.id"
							:class="choosenType == item.categoryName ? 'filter-item filter-item-active' : 'filter-item'" @click="seartchType(item.categoryName)">
							<view class="type-img">
								<image class="item-img" :src="item.url" mode="widthFix"></image>
							</view>
							<view class="item-name">{{ item.categoryName }}</view>
						</view>
					</scroll-view>
				</view>

				<view class="shop-group">
					<ExploreIndexShopCardGroup :list="shopList" />
					<view class="total_view" v-if="total!== 0 &&(shopList.length >= total)">
							没有更多数据~
					</view>

          <view class="total_empty" v-if=" !shopList ||shopList.length===0 ">
            <image :src="emptyImg"></image>
							附近没有店铺~
					</view>
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
import { onReachBottom } from "@dcloudio/uni-app";
import Popup from "./popup.vue";
import emptyImg from "@/static/images/empty-my.png";
import { onShow, onPageScroll } from "@dcloudio/uni-app";
import ExploreIndexShopCardGroup from "@/components/ExploreIndexShopCardGroup/index.vue";
import GradualTwo from "@/components/Navbar/GradualTwo.vue";
let navTitle = ref("西安交通大学博学楼");
let statusBarHeight = ref("80rpx");
let publicSuccessShow = ref(false);
let shopList = ref([]);
const total = ref(0);
let pageSize = ref(1);
const searchText = ref("");
const images = ref([]);
const userInfo = ref(uni.getStorageSync("userInfo"));
onMounted(() => {
  statusBarHeight.value = uni.getStorageSync("navBarHeight") * 2 + 30 + "rpx";
  http
    .homeNoticeList({
      type: 1,
    })
    .then((res) => {
      images.value = res.data || [];
    });
});

const doAction = () => {
  let selectLocation = uni.getStorageSync("location");
  userInfo.value = { ...userInfo.value, address: selectLocation.address };
  uni.setStorageSync("userInfo", userInfo.value);
  getheaderList()
};
onShow(() => {
  userInfo.value  = uni.getStorageSync("userInfo");
  console.log("没有定位信息，获取定位信息", userInfo.value);
  if (!userInfo.value.address) {
    getLocation();
  }
})
async function getLocation() {
  let location = uni.getStorageSync("location");
  if (!location) return;
  let res = await http.getAddress({
    longitude: location.longitude,
    latitude: location.latitude,
  });

  userInfo.value = { ...userInfo.value, address: res.data };
  uni.setStorageSync("userInfo", userInfo.value);
}
let choosenType = ref('');
let typeOptions = ref([]);
function getShopTypeLists() {
  http.headerFindCategoryName({ code: "shop_prodect_type" }).then((res) => {
	typeOptions.value = res.data
  choosenType.value = res.data[0].categoryName
  getheaderList();

  });
}
getShopTypeLists();

function getheaderList() {
  const location = uni.getStorageSync("location");
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  http
    .headerList({
      pageNum: pageSize.value,
      pageSize: 10,
      name: searchText.value,
      longitude: location.longitude,
      dimension: location.latitude,
      categoryName: choosenType.value,
    })
    .then((res) => {
      shopList.value = shopList.value.concat(res.data.list || []);
	  total.value = res.data.total;
    })
    .finally(() => {
      uni.hideLoading();
    });
}
function getSearchheaderList() {
  pageSize.value = 1;
  shopList.value = [];
  getheaderList();
}
function seartchType(item) {
  choosenType.value = item
  shopList.value = [];
  getheaderList();
}

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
  pageSize.value += 1;
  if (shopList.value.length >= total.value) return;
  getheaderList();
});
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
    .swiper {
      width: 100%;
      height: 100%;
      .swiper-image {
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
    padding-bottom: 300rpx;

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

      .search-input {
      }
    }

    .explore-type-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      white-space: nowrap;

      .filter-item {
        width: 136rpx;
        height: 136rpx;
        border-radius: 28rpx;
        overflow: hidden;
        padding: 4rpx;
        background-color: rgba(235, 231, 253, 1);
        margin-right: 16rpx;
        display: inline-block;

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
.total_view{
  text-align: center;
  font-size: 28rpx;
  color: #979797;
  margin-top: 32rpx;
  width: 100%;
}
.total_empty{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 28rpx;
  color: #979797;
  flex-direction: column;
  image{
    width: 256rpx;
    height: 256rpx;
    margin-bottom: 20rpx;
  }
}
</style>