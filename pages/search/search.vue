<template>
  <z-paging
    ref="paging"
    v-model="list"
    @query="queryList"
    show-refresher-when-reload
    :empty-view-img="emptyImg"
    auto-show-back-to-top
    :loading-more-enabled="false"
    :empty-view-img-style="{ width: '256rpx', height: '256rpx' }"
    :empty-view-error-img="emptyImg"
    empty-view-text="暂无活动"
  >
    <template #top>
      <view class="input">
        <view class="input-wrap">
          <image src="../../static/images/search.png" mode=""></image>
          <input
            type="text"
            placeholder="搜索活动、新鲜事及更多"
            @input="doInput"
            v-model="value"
            @confirm="doSearch"
          />
          <image
            class="close"
            src="../../static/images/input-close.png"
            @click="doClose"
            v-show="value"
            mode=""
          ></image>
        </view>
        <button @tap="doSearch">搜索</button>
      </view>
      <view style="height: 136rpx"></view>
      <view class="history" v-if="history?.length !== 0 && !isSearch">
        <view class="history-title">历史搜索</view>
        <view class="history-list">
          <view
            v-for="(item, index) in history"
            :key="index"
            @click="doHistory(item)"
          >
            <text>{{ item }}</text>
            <image
              @click.stop="doDelete(index)"
              src="../../static/images/delete.png"
              mode=""
            ></image>
          </view>
        </view>
      </view>
    </template>
    <div class="waterfalls_content" >
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
          <view v-if="item.type === 1" class="activity-item-content">
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
                <view class="time">{{ formatDateTextTwo(item?.startdate) }}</view>
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
                <view class="num">剩{{ item?.userActivityVo?.surplus }}位</view>
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

          <view v-if="item.type === 2" class="activity_item_two">
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
                    <view class="right_info">
                      <image
                        src="@/static/images/Vector.png"
                        v-if="item.upUserStatus == 0"
                      >
                      </image>
                      <image
                        src="@/static/images/like-s.png"
                        v-if="item.upUserStatus == 1"
                      >
                      </image>
                      <view class="right_num">{{ item.orderNumber }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view v-if="item.type === 3" class="activity-item_thr">
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
    </div>
	<PartnerModal ref="partnerModalRef"/>
  </z-paging>
  
</template>

<script setup>
import http from "@/utils/http.js";
import { onShow } from "@dcloudio/uni-app";
import { formatDateTextTwo } from "@/utils/index.js";
import constant from "@/utils/constant";
import emptyImg from "@/static/images/empty-my.png";
import PartnerModal from '@/components/PartnerModal/index.vue'
import { ref } from "vue";
const value = ref("");
const result = ref([]);
const isSearch = ref(false);
const history = ref([]);
const list = ref([]);
const partnerModalRef = ref(null)
const paging = ref(null);
onShow(() => {
  let searchHistory = uni.getStorageSync("searchHistory") || [];
  history.value = searchHistory;
});
function doInput(e) {
  value.value = e.detail.value;
  isSearch.value = false;
}
function doDelete(index) {
  uni.showModal({
    title: "提示",
    content: "确认删除此搜索记录？",
    success: (res) => {
      if (res.confirm) {
        history.value.splice(index, 1);
        uni.setStorageSync("searchHistory", history.value);
      }
    },
  });
}
function doClose() {
  value.value = "";
  result.value = [];
  isSearch.value = false;
}
async function doHistory(text) {
  value.value = text;
  isSearch.value = true;
  paging.value.reload();
}
async function doSearch() {
  isSearch.value = true;
  let searchHistory = uni.getStorageSync("searchHistory") || [];
  if (!searchHistory.includes(value.value)) {
    if (value.value?.length > 0) {
      searchHistory.push(value.value);
      uni.setStorageSync("searchHistory", searchHistory);
      history.value.push(value.value);
    }
  }
  try {
	list.value = []
    paging.value.reload();
    uni.hideLoading();
  } catch (err) {
    uni.hideLoading();
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
	partnerModalRef.value.show(item)
  } else if (item.type === 4) {
    uni.navigateTo({
      url: "/pages/webview/index?url=" + item.url,
    });
  }
}
function queryList() {
	list.value = []
  http
    .homeActivitySelect({
      type: null,
      title: value.value,
      pageSize: 9999999,
      pageType: "init",
    })
    .then((res) => {
		
      res.data.list = res.data.list.map((item) => {
        return {
          ...item,
          image: item.images?.split(",")[0],
          title: item?.title,
          desc: item?.initiatorName,
          initiatorUrl: item?.initiatorUrl,
          status: item?.status,
          hide: true,
        };
      });
      paging.value.complete(res.data.list || []);
      list.value = res.data.list || [];
    })
    .catch((err) => {
      paging.value.complete([]);
    });
}
</script>

<style lang="scss" scoped>
.input {
  position: fixed;
  top: -2rpx;
  left: 0;
  width: 100vw;
  padding: 32rpx;
  height: 136rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  z-index: 9;
  box-sizing: border-box;
  background-color: #fff;
  .input-wrap {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 48rpx;
    flex: 1;
    padding: 20rpx 24rpx;
    font-size: 24rpx;
    image {
      width: 32rpx;
      height: 32rpx;
    }
    input {
      flex: 1;
      padding-left: 16rpx;
      margin-right: 16rpx;
    }
  }
  button {
    height: 72rpx;
    width: 112rpx;
    flex: 0 0 112rpx;
    border-radius: 48rpx;
    background-color: #121212;
    color: #fff;
    font-size: 28rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close {
    width: 32rpx;
    height: 32rpx;
    z-index: 9;
  }
}
.history {
  position: fixed;
  padding: 0 32rpx;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 1000;
  background: #ffffff;
  .history-title {
    height: 104rpx;
    line-height: 104rpx;
    font-family: PingFang SC;
    font-size: 28rpx;
    font-weight: 600;
    color: #222;
    border-bottom: 1px solid #f5f5f5;
  }
  .history-list {
    > view {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      height: 104rpx;
      line-height: 104rpx;
      font-size: 28rpx;
      font-weight: 400;
      image {
        width: 28rpx;
        height: 28rpx;
      }
    }
  }
}
.falls {
  padding: 0 32rpx 32px 32rpx;
}

.activity-item-content {
  width: 100%;
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

// 找搭子
.activity-item_thr {
  width: calc(100% - 8rpx);
  display: inline-flex;
  margin-bottom: 16rpx;

  .thr_content {
    width: 100%;
    min-height: 180rpx;
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
  width: calc(100% - 8rpx);
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
.waterfalls_content {
  padding: 16rpx;
  box-sizing: border-box;
}
</style>