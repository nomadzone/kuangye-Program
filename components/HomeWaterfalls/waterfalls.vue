<template>
  <view class="waterfalls_content">
    <z-paging
      :fixed="false"
      ref="paging"
      v-model="list"
      @query="queryList"
      show-refresher-when-reload
      :empty-view-img="emptyImg"
      :empty-view-img-style="{ width: '256rpx', height: '256rpx' }"
      :empty-view-error-img="emptyImg"
      :empty-view-text="!token?'暂无内容':'暂无内容'"
      :paging-style="{'margin-bottom':'400rpx'}"
    >
      <block v-if="props.sortIndex === 0">
        <custom-waterfalls-flow
          ref="waterfallsFlowRef"
          :value="list"
          :listStyle="{ background: 'transparent', marginBottom: '0' }"
        >
          <view
            class="item"
            v-for="(item, index) in list"
            :key="index"
            slot="slot{{ index }}"
            @click="doItem(item, index)"
          >
            <view v-if="item.type === 4 && index === 0" class="active">
              <text class="tags">平台活动</text>
              <swiper
                class="swiper"
                :autoplay="true"
                :interval="3000"
                :duration="500"
                indicator-dots
                :circular="true"
                indicator-active-color="#007aff"
              >
                <swiper-item v-for="(item, index) in images" :key="index">
                  <image
                    :src="item.images"
                    @click="doItem(item, index)"
                    class="swiper-image"
                    mode="aspectFill"
                  ></image>
                </swiper-item>
              </swiper>
            </view>
            <view v-if="item.type === 1" class="activity-item-content" style="width: 100%;">
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
                <view class="btm_title">
                  <view class="btm_titles">{{ item.title }}</view>
                </view>
                <view class="btm_createby">
                  <image :src="item?.initiatorUrl"></image>
                  <view class="name">{{ item.initiatorName }}</view>
                </view>
                <view class="btm_time">
                  <view class="dances">{{ item?.distanceMeters }}Km</view>
                  <view class="line"></view>
                  <view class="time">{{
                    formatDateTextTwo(item?.startdate)
                  }}</view>
                </view>
                <view class="all_img">
                  <view class="all_img_item" :style="{ width: ((item.allImages?.length * 20) + 32)+ + 'rpx' }" v-if="item.allImages?.length > 0">
                    <view
                      class="all_img_item_list"
        
                      v-for="(img, index) in item.allImages"
                      :key="index"
                    >
                      <image :src="img" mode="aspectFill"></image>
                    </view>
                  </view>
                  <view v-else class="all_img_item" >
                    <view
                      class="all_img_item_list">
                      <image v-if="headerPhotos?.length > 0" :src="getSjHeader()" mode="aspectFill"></image>
                    </view>
                  </view>
                  <view class="num"
                    >剩{{ item?.userActivityVo?.surplus }}位</view
                  >
                </view>
                <view class="btn-group">
                  <view class="hover-class" >
                    <text class="price">¥{{ item?.price }}/人</text>
                    <view class="line"></view>
                    <text class="btn-label">报名</text>
                  </view>
                </view>
              </view>
            </view>

            <view v-if="item.type === 2" class="activity_item_two" style="width: 100%;">
              <view class="item_two_content">
                <view class="content_top">
                  <image
                    :src="item?.images?.split(',')[0]"
                    mode="aspectFill"
                  ></image>
                </view>
                <view class="content_btm">
                  <view class="content_btm_title">{{ item?.title }}</view>
                  <view class="content_btm_desc">
                    <view class="content_btm_desc_left">
                      <view class="left_image">
                        <image
                          :src="item?.initiatorUrl"
                          mode="aspectFill"
                        ></image>
                        <view class="left_name">{{ item?.initiatorName }}</view>
                      </view>
                      <view
                        class="right_info"
                      >
                      <image
                          src="@/static/images/like-s.png"
                          v-if="item.upUserStatus == 1"
                        >
                        </image>
                        <image
                          src="@/static/images/Vector.png"
                          v-else
                        >
                        </image>
                        
                        <view class="right_num">{{ item.orderNumber }}</view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view v-if="item.type === 3" class="activity-item_thr" style="width: 100%;">
              <view class="thr_content">
                <view class="content_thr_title">
                  <text>找搭子</text> {{ item?.describe }}
                </view>
                <view class="content_thr_desc">
                  <view class="dance">{{ item?.distanceMeters }}</view>
                  <view class="line"></view>
                  <view class="position">{{ item?.address }}</view>
                </view>
                <view class="thr_header">
                  <image mode="aspectFill" :src="item?.initiatorUrl"></image>
                  <view class="header_title">{{ item?.initiatorName }}</view>
                </view>
              </view>
            </view>
          </view>
        </custom-waterfalls-flow>
      </block>

      <block v-if="props.sortIndex === 1">
        <view v-for="(item, index) in list" :key="index" class="activity-item">
          <view class="activity-item-content" @click="doItem(item, index)">
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
              <view class="btm_title"><view class="btm_titles">{{ item.title }}</view></view>
              <view class="btm_createby">
                <image :src="item?.initiatorUrl"></image>
                <view class="name">{{ item.initiatorName }}</view>
              </view>
              <view class="btm_time">
                <view class="dances">{{ item?.distanceMeters }}Km</view>
                <view class="line"></view>
                <view class="time">{{ formatDateTextTwo(item?.startdate) }}</view>
              </view>
              <view class="all_img">
                <view class="all_img_item" :style="{ width: ((item.allImages?.length * 20) + 32)+ + 'rpx' }" v-if="item.allImages?.length > 0">
                  <view
                    class="all_img_item_list"
                    v-for="(img, index) in item.allImages"
                    :key="index"
                  >
                    <image :src="img" mode="aspectFill"></image>
                  </view>
                </view>
                <view v-else class="all_img_item">
                  <view
                    class="all_img_item_list">
                    <image  v-if="headerPhotos?.length > 0" :src="getSjHeader()" mode="aspectFill"></image>
                    </view>
                  </view>
                
                <view class="num">剩{{ item?.userActivityVo?.surplus }}位</view>
              </view>
              <view class="btn-group">
                <view class="hover-class" >
                  <text class="price">¥{{ item?.price }}/人</text>
                  <view class="line"></view>
                  <text class="btn-label">报名</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
      <block v-if="props.sortIndex === 2">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="activity_item_two"
          @click="doItem(item, index)"
        >
          <view class="item_two_content">
            <view class="content_top">
              <image
                :src="item.images?.split(',')[0]"
                mode="aspectFill"
              ></image>
            </view>
            <view class="content_btm">
              <view class="content_btm_title">{{ item?.title }}</view>
              <view class="content_btm_desc">
                <view class="content_btm_desc_left">
                  <view class="left_image">
                    <image :src="item?.initiatorUrl" mode="aspectFill"></image>
                    <view class="left_name">{{ item?.initiatorName }}</view>
                  </view>
                  <view class="right_info">
                    <image
                      src="@/static/images/like-s.png"
                      v-if="item.upUserStatus == 1"
                    ></image>
                    <image v-else src="@/static/images/Vector.png"></image>
                    
                    <view class="right_num">{{ item.orderNumber }}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
      <block v-if="props.sortIndex === 3">
        <custom-waterfalls-flow
          ref="waterfallsFlowRef"
          :value="list"
          :listStyle="{ background: 'transparent', marginBottom: '0' }"
        >
          <view
            class="item"
            v-for="(item, index) in list"
            :key="index"
            slot="slot{{ index }}"
            @click="doItem(item, index)"
          >
            <view class="activity-item_thr">
              <view class="thr_content">
                <view class="content_thr_title">
                  <text>找搭子</text> {{ item?.describe }}
                </view>
                <view class="content_thr_desc">
                  <view class="dance">{{ item?.distanceMeters }}Km</view>
                  <view class="line"></view>
                  <view class="position">{{ item?.address }}</view>
                </view>
                <view class="thr_header">
                  <image mode="aspectFill" :src="item?.initiatorUrl"></image>
                  <view class="header_title">{{ item?.initiatorName }}</view>
                </view>
              </view>
            </view>
          </view>
        </custom-waterfalls-flow>
      </block>
    </z-paging>
    
  </view>
</template>
<script setup>
import http from "@/utils/http.js";
import useZPaging from "@/uni_modules/z-paging/components/z-paging/js/hooks/useZPaging.js";
import constant from "@/utils/constant";
import { formatDateTextTwo } from "@/utils/index.js";
import emptyImg from "@/static/images/empty-my.png";

import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const paging = ref(null);
const list = ref([]);
const images = ref([]);
const partnerModalRef = ref(null);
const token = uni.getStorageSync("token");

const emit = defineEmits(['partnerModalShow'])
const headerPhotos = ref(null)
const props = defineProps({
  sortIndex: {
    type: Number,
    default: 0,
  },
});

onShow(() => {
  if(paging.value) {
    list.value = [];
    paging.value.reload();
  }
})

async function queryList(current, size) {
  try {
      let location = uni.getStorageSync("location");
  let params = {
    longitude: location.longitude,
    latitude: location.latitude,
    pageNum: current,
    pageSize: size,
    type: props.sortIndex,
  };
  if (props.sortIndex == 0) {
    let resImg = await http.homeNoticeList({
      type: 1,
    });
    images.value = JSON.parse(JSON.stringify(resImg.data || []));
  }
  const res = await http.homeActivity(params);
  if (props.sortIndex == 0) {
    let unShift = {};
    unShift = {
      type: 4,
      image: images.value[0].images,
      images: images.value.map((item) => item.images).join(","),
      title: "最新活动",
    };
    // if (!list.value.find(item => item.type === 4)) {
    //     res.data.list.unshift(unShift)
    // }
    // res.data.list.unshift(unShift);
  }
  res.data.list = res.data.list.map((item) => {
    return {
      ...item,
      image: item.images?.split(",")[0],
      title: item?.title,
      desc: item?.initiatorName,
      initiatorUrl: item?.initiatorUrl,
      status: item?.status,
      hide: 1,
    };
  });
  paging.value.complete(res.data.list || []);
  paging.value?.endRefresh();
  }
  catch (err) {
    console.log(err);
    paging.value.complete([]);
  }
}
function headerPhoto() {
  http.noticeSelectOne().then(res => {
    headerPhotos.value = res.data
  })
}
headerPhoto()
function getSjHeader() {
  if(headerPhotos.value) {
    // 随机取一张
    let index = Math.floor(Math.random() * headerPhotos.value.length)
    console.log(index, '22')
    return headerPhotos.value[index]
  } else {
    return ''
  }
}
function toRold() {
  list.value = []
  setTimeout(() => {
    paging.value.reload();
  }, 100);
}
async function doLike(item, index) {
  let title = "";
  if (item?.userUpStatus == 0) {
    const res = await http.userUp({
      commentId: item.id,
      type: item.type,
    });
    title = res?.code !== "200" ? res?.msg : "点赞成功";
    paging.value.refresh();
  } else {
    const res = await http.userDown({
      commentId: item.id,
      type: item.type,
    });
    title = res?.code !== "200" ? res?.msg : "取消成功";
    paging.value.refresh();
  }
  uni.showToast({
    title,
    icon: "none",
  });
}
async function doButton(item, index) {
  // 添加票夹
  let resPiao = await http.userActivity({ activityId: item.id });
  if (resPiao.code !== "200") {
    uni.showToast({
      title: resPiao?.msg,
      icon: "none",
    });
    return;
  }
  const piaoId = resPiao?.data;
  if (!piaoId) {
    uni.showToast({
      title: "订单id生成失败",
      icon: "none",
    });
    return;
  }
  // 发起支付
  let res = await http.orderPay({
    id: piaoId,
  });
  if (res.code === "200" && res.data) {
    const payParams = res.data?.jsapi;
    const orderId = res.data?.orderId;
    uni.requestPayment({
      provider: "wxpay",
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.packageVal,
      signType: payParams.signType,
      paySign: payParams.paySign,
      success: async (res) => {
        console.log("支付成功", res);
        uni.showToast({
          title: "支付成功",
          icon: "success",
        });
      },
      fail: function (err) {
        console.log("支付失败", err);
        uni.showToast({
          title: "支付失败",
          icon: "none",
        });
        _this.cancelPay(orderId);
      },
    });
  } else {
    uni.showToast({
      title: res.msg || "支付失败",
      icon: "none",
    });
  }
}
async function orderSuccess(id) {
  let res = await http.orderSuccess({ id });
  if (res.code !== "200") {
    uni.showToast({
      title: res?.msg,
      icon: "none",
    });
    return;
  }
}
async function cancelPay(id) {
  let res = await http.orderCancellation({ id });
  if (res.code !== "200") {
    uni.showToast({
      title: res?.msg,
      icon: "none",
    });
    return;
  }
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
    emit('partnerModalShow', item)
  } else if (item.type === 4) {
    uni.navigateTo({
      url: "/pages/webview/index?url=" + item.url,
    });
  }
}

defineExpose({
  toRold,
});
</script>
<style lang="scss">
.waterfalls_content {
  width: 100%;
  height: 100%;
  padding: 8rpx;
  box-sizing: border-box;
  padding-bottom: 200rpx;
}

.activity-item {
  width: 50%;
  display: inline-flex;
  margin-bottom: 16rpx;
}

.activity-item-content {
  width: calc(100% - 8rpx);
  min-height: 526rpx;
  background: #fff7e2;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 16rpx;

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
      .btm_titles{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
    }

    .btm_createby {
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
      height: 50rpx;
      display: flex;
      align-items: center;

      .all_img_item {
        max-width: 140rpx;
        min-width: 32rpx;
        position: relative;
        height: 50rpx;
        display: flex;
        align-items: center;
        .all_img_item_list {
          width: 12rpx;
          height: 32rpx;
          position: relative;
          image {
            width: 32rpx;
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

// 找搭子
.activity-item_thr {
  width: 100%;
  display: inline-flex;
  margin-bottom: 16rpx;

  .thr_content {
    width: 100%;
    min-height: 180rpx;
    background: #00c4ef40;
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
    width: calc(100% - 8rpx);
    min-height: 470rpx;
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
        text-overflow: ellipsis;
        white-space: nowrap;
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

.item .activity_item_two {
  width: 100% !important;
}

.swiper {
  width: 100%;
  height: 526rpx;
  border-radius: 24rpx;
  overflow: hidden;
}

.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24rpx;
}

.active {
  position: relative;
  margin-bottom: 16rpx;
}

.tags {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  padding: 4rpx 12rpx;
  border-radius: 24rpx;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  font-size: 24rpx;
  color: #fff;
}

</style>
<style></style>