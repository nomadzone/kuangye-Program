<template>
  <view class="user-center-page">
    <CustomNavBar></CustomNavBar>
    <view class="top-bk-box">
      <image
        class="bk-img"
        mode="aspectFill"
        :src="userInfo?.avatarUrl || '/static/images/title-logo.svg'"
      ></image>
      <view class="top-info-box">
        <image
          class="info-bk-img"
          src="../../static/images/top-info-bk.svg"
        ></image>
        <view class="info-content">
          <view class="user-info-row">
            <view class="user-info">
              <view class="name-row">
                <view class="name-text">{{
                  userInfo?.nickname || "未登录"
                }}</view>
                <view class="gender-icon"></view>
              </view>
              <view class="introduce-text">{{
                userInfo?.introduce || "这个人很懒，什么都没留下"
              }}</view>
            </view>
            <view class="user-avatar">
              <image
                class="avatar-img"
                mode="aspectFill"
                :src="userInfo?.avatarUrl || '/static/images/title-logo.svg'"
              ></image>
            </view>
            <!-- <view
              class="user-info-edit"
              @click="navito('/pagesUserCenter/pages/personalData/index')"
              >修改</view
            > -->
          </view>
          <view class="user-data-row">
            <view class="data-item">
              <text class="item-num">{{ userInfo?.likesNumber || 0 }}</text>
              <text class="item-label">点赞</text>
            </view>
            <view class="data-item" >
              <text class="item-num">{{ userInfo?.followNumber || 0 }}</text>
              <text class="item-label">关注</text>
            </view>
            <view class="data-item">
              <text class="item-num">{{ userInfo?.fansNumber || 0 }}</text>
              <text class="item-label">粉丝</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="self-nav-container">
      <SelfNav v-if="pageViewType === 1" />
      <OtherPageActions :info="userInfo" @toConcatenates="toConcatenates" :followStatus="userInfo?.isFans" v-else />
      <UserCenterTab
        :tabs="tabs"
        :activeTab="activeTab"
        @changeTab="handleSetActiveTab"
      ></UserCenterTab>
      <view v-if="pageViewType === 1" class="self-nav-box">
        <view
          class="self-nav-box-list"
          :class="{ 'self-nav-box-listact': activeTabKey === 0 }"
          @click="chooseTabKey(0)"
          >已发起</view
        >
        <view
          class="self-nav-box-list"
          :class="{ 'self-nav-box-listact': activeTabKey === 1 }"
          @click="chooseTabKey(1)"
          >已参加</view
        >
      </view>

      <view class="activity-list-box">
        <z-paging
          :fixed="false"
          ref="paging"
          v-model="list"
          @query="queryList"
          show-refresher-when-reload
          :empty-view-img="emptyImg"
          :empty-view-img-style="{ width: '256rpx', height: '256rpx' }"
          :empty-view-error-img="emptyImg"
          safe-area-inset-bottom
          empty-view-text="暂未发起或参加活动"
        >
          <block v-if="activeTab === 0">
            <view
              v-for="(item, index) in list"
              :key="index"
              class="activity-item"
              @click="doItem(item, index)"
            >
              <view class="activity-item-content">
                <view class="content_top">
                  <view class="top_img">
                    <image
                      class="img"
                      mode="aspectFill"
                      :src="item.images?.split(',')[0]"
                    ></image>
                    <view class="top_status">{{
                      constant.yiqiyuan[item.status]
                    }}</view>
                  </view>
                </view>
                <view class="content_bottom">
                  <view class="btm_title">{{ item.title }}</view>
                  <view class="btm_createby">
                    <image :src="item?.initiatorUrl"></image>
                    <view class="name">{{ item.initiatorName }}</view>
                  </view>
                  <view class="btm_time">
                    <view class="dances">{{ item?.distanceMeters }}Km</view>
                    <view class="line"></view>
                    <view class="time">{{
                      formatDateText(item?.startdate)
                    }}</view>
                  </view>
                  <view class="all_img">
                    <view class="all_img_item">
                      <view
                        class="all_img_item_list"
                        :style="{ left: -(index * 24) + 'rpx' }"
                        v-for="(img, index) in item.allImages"
                        :key="index"
                      >
                        <image :src="img" mode="aspectFill"></image>
                      </view>
                    </view>
                    <view class="num"
                      >剩{{ item?.userActivityVo?.surplus }}位</view
                    >
                  </view>
                  <view class="btn-group">
                    <view class="hover-class">
                      <text class="price">¥{{ item?.price }}/人</text>
                      <view class="line"></view>
                      <text class="btn-label">报名</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </block>
          <block v-if="activeTab === 1">
            <view
              v-for="(item, index) in list"
              :key="index"
              class="activity_item_two"
            >
              <view class="item_two_content">
                <view class="content_top">
                  <image
                    :src="item.images?.split(',')[0]"
                    mode="aspectFill"
                  ></image>
                </view>
                <view class="content_btm">
                  <view class="content_btm_title">
                    <view class="content_btm_titles">{{ item?.title }}</view>
                    </view>
                  <view class="content_btm_desc">
                    <view class="content_btm_desc_left">
                      <view class="left_image">
                        <image
                          :src="item?.initiatorUrl"
                          mode="aspectFill"
                        ></image>
                        <view class="left_name">{{ item?.initiatorName }}</view>
                      </view>
                      <view class="right_info">
                        <image src="@/static/images/Vector.svg"></image>
                        <view class="right_num">{{ item.orderNumber }}</view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </block>
          <block v-if="activeTab === 2">
            <custom-waterfalls-flow
              ref="waterfallsFlowRef"
              :value="list"
              @imageClick="imageClick"
              @loaded="loaded"
              columnSpace="0"
              :listStyle="{ background: 'transparent', marginBottom: '0' }"
            >
              <view
                class="item"
                v-for="(item, index) in list"
                :key="index"
                slot="slot{{ index }}"
              >
                <view class="activity-item_thr">
                  <view class="thr_content">
                    <view class="content_thr_title">
                      <text>找搭子</text> {{ item?.describe }}</view
                    >
                    <view class="content_thr_desc">
                      <view class="dance">{{ item?.distanceMeters }}</view>
                      <view class="line"></view>
                      <view class="position">{{ filterAndRemoveBefore(details?.address) }}</view>
                    </view>
                    <view class="thr_header">
                      <image
                        mode="aspectFill"
                        :src="item?.initiatorUrl"
                      ></image>
                      <view class="header_title">{{
                        item?.initiatorName
                      }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </custom-waterfalls-flow>
          </block>
        </z-paging>
      </view>
    </view>



    <Partner ref="partnerModalRef"/>
  </view>
</template>
  
  <script setup>
import { ref } from "vue";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import SelfNav from "@/pagesUserCenter/components/selfNav/index.vue";
import OtherPageActions from "@/pagesUserCenter/components/otherPageActions/index.vue";
import UserCenterTab from "@/pagesUserCenter/components/tab/index.vue";
import http from "@/utils/http.js";
import useZPaging from "@/uni_modules/z-paging/components/z-paging/js/hooks/useZPaging.js";
import constant from "@/utils/constant";
import { formatDateText } from "@/utils/index.js";
import emptyImg from "@/static/images/empty-my.png";
import { onShow, onLoad } from "@dcloudio/uni-app";
import Partner from './partents/index.vue'
import {filterAndRemoveBefore} from "@/utils/index.js";


let pageViewType = ref(0); // 页面视角 1 自己 0 他人
const paging = ref(null);
const waterfallsFlowRef = ref(null);
const partnerModalRef = ref();
const userInfo = ref(uni.getStorageSync("userInfo"));
const list = ref([]);
let tabs = ref([
  {
    label: "一起野",
    key: 0,
    defaultIcon: "../../static/icons/tabs/play-together-normal.svg",
    activeIcon: "../../static/icons/tabs/play-together-active.svg",
  },
  {
    label: "新鲜事",
    key: 1,
    defaultIcon: "../../static/icons/tabs/news-normal.svg",
    activeIcon: "../../static/icons/tabs/news-active.svg",
  },
  {
    label: "找搭子",
    key: 2,
    defaultIcon: "../../static/icons/tabs/find-friends-normal.svg",
    activeIcon: "../../static/icons/tabs/find-friends-active.svg",
  },
]);
let activeTab = ref(0);
let activeTabKey = ref(0);
const userThirdId = ref(null);
onLoad((options) => {
  userThirdId.value = options.userId
})

onShow(() => {
  if (pageViewType.value === 1) {
    getUserInfo();
  } else {
    getUserThird(userThirdId.value);
  }
});
function toConcatenates() {
  const userInfo = uni.getStorageSync("userInfo");
  if (userInfo?.phoneNumber && userInfo?.contactphoto) {
    uni.showToast({
      title: "暂无信息",
      icon: "none",
    });
    return
  }
  partnerModalRef.value.show(userInfo);
}

// 跳转关注
function toGz(type) {
  uni.navigateTo({
    url: "/pagesUserCenter/pages/followAndFans/index?type=" + type,
  });
}
function getUserThird(userId) {
  http.getUserInfoOther({userId:userId}).then((res) => {
    userInfo.value = res.data;
  });
}

function getUserInfo() {
  http.getUserInfo().then((res) => {
    userInfo.value = res.data;
    uni.setStorageSync("userInfo", res.data);
  });
}
// 设置激活tab
const handleSetActiveTab = (val) => {
  activeTab.value = val;
  paging.value.reload();
};
function chooseTabKey(key) {
  activeTabKey.value = key;
  paging.value.reload();
}
function loaded(e) {
  console.log("loaded", e);
}
function navito(url) {
  uni.navigateTo({
    url: url,
  });
}
function doItem(item, index) {
  if (item.type === 1) {
    uni.navigateTo({
      url: `/pagesToggle/pages/details/details?id=${item.id}`,
      success: (res) => {
        res.eventChannel.emit("getDetails", item);
      },
    });
  } else if (item.type === 2) {
    // 新鲜事
    uni.navigateTo({
      url: `/pagesFreshNews/pages/detail/index?id=${item.id}`,
    });
  } else if (item.type === 3) {
  }
}
/**
 * @description 列表查询
 * @return {Promise<void>}
 */
async function queryList(current, size) {
  try {
    let location = uni.getStorageSync("location");
    const api =
      activeTabKey.value === 0 ? http.selectUserInfoActivity : http.useActivity;
    const res = await api({
      longitude: location.longitude,
      latitude: location.latitude,
      type: activeTab.value + 1,
      pageNum: current,
      pageSize: size,
      userId: userInfo.value?.id,
    });
    res.data.list = res.data.list.map((item) => {
      return {
        ...item,
        image: item.images?.split(",")[0],
        title: item.title,
        desc: item.initiatorName,
        initiatorUrl: item.initiatorUrl,
        status: item.status,
        hide: 1,
      };
    });
    paging.value.complete(res.data.list || []);
  } catch (e) {
    paging.value.complete([]);
  }
}
useZPaging(paging, queryList);
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
          .user-info-edit {
            width: 112rpx;
            height: 50rpx;
            display: flex;
            align-content: center;
            justify-content: center;
            border-radius: 24rpx;
            border: 1rpx solid #dddddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            color: #646464;
            position: absolute;
            font-weight: 600;
            bottom: -32rpx;
            right: 10rpx;
          }
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

  .self-nav-container {
    padding: 16rpx 32rpx;
    margin-top: 18rpx;
    .self-nav-box {
      width: 100%;
      height: 98rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .self-nav-box-list {
        width: 120rpx;
        height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30rpx;
        border: 2rpx solid #dddddd;
        font-weight: 600;
        color: #a3a3a3;
        font-size: 24rpx;
        box-sizing: border-box;
        margin-right: 24rpx;
      }
      .self-nav-box-listact {
        background-color: #222222;
        color: #ffffff;
        border-color: #222222;
      }
    }
  }
}
.activity-list-box {
  width: 100%;
  padding: 16rpx 0;
  height: calc(100vh - 780rpx);
  box-sizing: border-box;

  .activity-item {
    width: 50%;
    display: inline-flex;
    margin-bottom: 16rpx;
    .activity-item-content {
      width: calc(100% - 16rpx);
      background: #fff7e2;
      border-radius: 24rpx;
      overflow: hidden;
      .content_top {
        width: 100%;
        height: 224rpx;
        position: relative;
        .top_img {
          width: 100%;
          height: 100%;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .top_status {
          width: 84rpx;
          height: 34rpx;
          border-radius: 86rpx;
          background: rgba(0, 0, 0, 0.6);
          position: absolute;
          left: 12rpx;
          top: 12rpx;
          font-size: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
      }
      .content_bottom {
        width: 100%;
        padding: 0 16rpx;
        box-sizing: border-box;
        .btm_title {
          width: 100%;
          height: 56rpx;
          font-size: 28rpx;
          font-weight: 600;
          color: #121212;
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btm_createby {
          width: 100%;
          height: 40rpx;
          display: flex;
          align-items: center;
          image {
            width: 32rpx;
            height: 32rpx;
            border-radius: 50%;
            margin-right: 8rpx;
          }
          .name {
            color: #646464;
            font-size: 24rpx;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: calc(100% - 40rpx);
          }
        }
        .btm_time {
          width: 100%;
          min-height: 50rpx;
          padding: 8rpx 0;
          box-sizing: border-box;
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .dances {
            color: #757575;
            font-size: 24rpx;
            font-weight: 400;
            margin-right: 16rpx;
          }
          .line {
            width: 1rpx;
            height: 100%;
            background: #dddddd;
          }
          .time {
            color: #757575;
            font-size: 24rpx;
            font-weight: 400;
          }
        }
        .all_img {
          width: 100%;
          height: 40rpx;
          display: flex;
          align-items: center;
          .all_img_item {
            max-width: 140rpx;
            position: relative;
            .all_img_item_list {
              width: 32rpx;
              height: 32rpx;
              position: absolute;
              top: 0rpx;
              image {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
          .num {
            color: #9a9a9a;
            font-size: 24rpx;
            font-weight: 400;
            margin-left: 16rpx;
          }
        }
        .btn-group {
          width: 100%;
          height: 96rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .hover-class {
            width: 100%;
            height: 64rpx;
            background: #222222;
            border-radius: 48rpx;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 24rpx;
            padding: 20rpx 0;
            box-sizing: border-box;
            .price {
              margin-right: 16rpx;
            }
            .line {
              margin-right: 16rpx;
              width: 1rpx;
              height: 100%;
              background: #ffffff;
            }
          }
        }
      }
    }
  }
  // 找搭子
  .activity-item_thr {
    width: 100%;
    display: inline-flex;
    margin-bottom: 16rpx;
    .thr_content {
      width: calc(100% - 16rpx);
      background: #e1fff8;
      border-radius: 24rpx;
      overflow: hidden;
      padding: 16rpx;
      box-sizing: border-box;
      .content_thr_title {
        color: #121212;
        font-size: 28rpx;
        font-weight: 600;
        width: 100%;
        line-height: 40rpx;
        // 两行溢出省略号
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 16rpx;
        word-break: break-all;
        text {
          display: inline-block;
          width: 84rpx;
          height: 36rpx;
          background: #00c4ef;
          border-radius: 86rpx;
          text-align: center;
          line-height: 36rpx;
          color: #ffffff;
          font-size: 24rpx;
          font-weight: 500;
          margin-right: 16rpx;
        }
      }
      .content_thr_desc {
        width: 100%;
        height: 50rpx;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 20rpx;
        box-sizing: border-box;
        .dance {
          color: #757575;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 16rpx;
        }
        .line {
          width: 1rpx;
          height: 100%;
          background: #dddddd;
          margin-right: 16rpx;
        }
        .position {
          color: #757575;
          font-size: 24rpx;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .thr_header {
        width: 100%;
        height: 50rpx;
        display: flex;
        align-items: center;
        image {
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          margin-right: 8rpx;
        }
        .header_title {
          color: #646464;
          font-size: 24rpx;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: calc(100% - 40rpx);
        }
      }
    }
  }

  // 新鲜事
  .activity_item_two {
    width: 50%;
    display: inline-flex;
    margin-bottom: 16rpx;
    .item_two_content {
      width: calc(100% - 16rpx);
      background: #e1fff8;
      border-radius: 24rpx;
      overflow: hidden;
      .content_top {
        width: 100%;
        height: 348rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .content_btm {
        width: 100%;
        padding: 0 16rpx;
        box-sizing: border-box;
        .content_btm_title {
        width: 100%;
        height: 56rpx;
        font-size: 28rpx;
        color: #121212;
        font-weight: 600;
        overflow: hidden;
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        .content_btm_titles{
          overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        }
      }
        .content_btm_desc {
          width: 100%;
          height: 50rpx;
          .content_btm_desc_left {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left_image {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: flex;
              align-items: center;
              image {
                width: 32rpx;
                height: 32rpx;
                margin-right: 8rpx;
                border-radius: 50%;
              }
              .left_name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 24rpx;
                color: #646464;
                font-weight: 400;
              }
            }
            .right_info {
              display: flex;
              align-items: center;
              flex-shrink: 0;
              min-width: 50rpx;
              color: #222222;
              font-size: 24rpx;
              font-weight: 400;
              image {
                width: 28rpx;
                height: 28rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>