<template>
  <view class="fresh-news-detail-page">
    <DetailTopNav
      :info="detailInfo"
      @inToInfo="handleInToInfo"
      @refreshFollowStatus="handleRefreshFollowStatus"
      :scrollType="scrollTypes"
    ></DetailTopNav>
    <view class="top-swipper-box" :style="{ marginTop: height }">
      <swiper
        class="swiper"
        circular
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        indicator-color="rgba(221, 221, 221, 1)"
        indicator-active-color="rgba(111, 223, 176, 1)"
      >
        <swiper-item
          class="swiper-item-box"
          v-for="(item, index) in swiperImgs"
          :key="index"
        >
          <view class="swiper-item">
            <image :src="item" mode="widthFix" class="swiper-item-img"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="info-box">
      <view class="title-text">{{ detailInfo.title }}</view>
      <view class="content-text">{{ detailInfo.describe }}</view>
      <view class="time-text">{{ detailInfo.createTime }}</view>
    </view>
    <view class="bj_del" v-if="detailInfo.userStatus === 1">
      <view class="bj_img" @click="toDetail()"
        ><image src="../../static/images/bianji.svg"></image>编辑</view
      >
      <view class="bj_img" @click="handleDelete()"
        ><image src="../../static/images/shanchu.svg"></image>删除</view
      >
    </view>
    <!-- <view class="ca_day">
			<view class="ca_day_text">前发布</view>
		</view> -->
    <view class="comment-num-row">
      评论
      <text class="comment-num-text">{{ detailInfo.commentNumber || 0 }}</text>
    </view>
    <Comments ref="commentsRef" :dataId="initId" @replyComment="replyComment" />
    <view class="bottom-comment-box">
      <view class="input-box">
        <image
          src="../../static/images/comment-prev-icon.svg"
          class="prev-icon"
        ></image>
        <input
          class="uni-input"
          @input="commentInput"
          v-model="commentInputValue"
          @confirm="submitComment()"
          :placeholder="
            rebackDetail ? '回复' + rebackDetail.nickname + ':' : '说点什么'
          "
        />
      </view>
      <view class="actions">
        <view class="action-item">
          <image
            v-if="detailInfo.upUserStatus === 0"
            class="item-icon"
            src="../../static/images/like-icon.svg"
            @tap="handleChangeLike()"
          ></image>
          <image
            v-else
            class="item-icon"
            src="../../static/images/liked.svg"
            @tap="handleChangeLike()"
          ></image>
          <text class="item-num">{{ detailInfo.upnumber || 0 }}</text>
        </view>
        <view class="action-item">
          <image
            class="item-icon"
            src="../../static/images/comment-icon.svg"
          ></image>
          <text class="item-num">{{ detailInfo.commentNumber }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLoad, onShow, onPageScroll } from "@dcloudio/uni-app";
import DetailTopNav from "../../components/detailTopNav/index.vue";
import Comments from "../../components/comments/index.vue";
import freshNewsService from "../../service/service";
import { debounce } from "../../../utils";
onMounted(() => {});

const initId = ref("");
const rebackDetail = ref(null); // 评论回复id
const height = ref("0");
const scrollTypes = ref(false)
onLoad((options) => {
  initId.value = options.id;
  getDetailInfo();
  uni.getSystemInfo().then((res) => {
    height.value = (res.statusBarHeight + 61) * 2 + "rpx";
  });
});
onShow(() => {
  if (initId.value) {
    getDetailInfo();
  }
});
onPageScroll((res) => {
  if (res.scrollTop > 1) {
    // 显示顶部导航栏
    scrollTypes.value = true
  } else {
    scrollTypes.value = false
  }
});


const indicatorDots = ref(true);
const autoplay = ref(true);
const interval = ref(3000);
const duration = ref(1000);
const commentsRef = ref();

let rebackId = ref(null); // 评论回复id

const detailInfo = ref({});

// 查询新鲜事详情
const swiperImgs = ref([]);
const getDetailInfo = () => {
  let params = {
    id: initId.value,
  };
  freshNewsService.detailInfo(params).then((res) => {
    console.log("res====", res);
    if (res && res.code === "200") {
      detailInfo.value = res.data;
      swiperImgs.value = res.data.images.split(",") || [];
    }
  });
};

// 输入评论
let commentInputValue = ref("");
const commentInput = (e) => {
  commentInputValue.value = e.target.value;
};
function replyComment(item) {
  rebackDetail.value = item;
}
// 提交评论
const submitComment = debounce(() => {
  uni.showLoading({
    title: "评论中...",
  });
  let params = {
    activityId: initId.value,
    content: commentInputValue.value,
    topId: rebackDetail.value?.id,
  };

  freshNewsService
    .commentAdd(params)
    .then((res) => {
      if (res && res.code === "200") {
        uni.showToast({
          title: "评论成功",
          icon: "success",
          duration: 2000,
        });
        commentInputValue.value = "";
        commentsRef.value.fetchCommentList(initId.value, 1);
        rebackId.value = null;
        getDetailInfo();
      }
    })
    .catch((err) => {})
    .finally(() => {
      uni.hideLoading();
    });
}, 1500);

// 更新关注状态
const handleRefreshFollowStatus = () => {
  detailInfo.value = {
    ...detailInfo.value,
    userFollowStatus: !detailInfo.value.userFollowStatus,
  };
};
function handleInToInfo() {
  if (detailInfo.value.userLaunchStatus != 1) {
    uni.navigateTo({
      url:
        "/pagesUserCenter/pages/index/index?userId=" + detailInfo.value.userId,
    });
  } else {
    uni.navigateTo({
      url: "/pagesUserCenter/pages/index/index",
    });
  }
}
function toDetail() {
  uni.navigateTo({
    url: "/pagesFreshNews/pages/release/index?id=" + initId.value,
  });
}
function handleDelete() {
  uni.showModal({
    title: "提示",
    content: "确定删除该条新鲜事吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: "删除中...",
        });
        freshNewsService
          .deleteFreshNews({
            id: initId.value,
          })
          .then((res) => {
            if (res && res.code === "200") {
              uni.showToast({
                title: "删除成功",
                icon: "success",
                duration: 2000,
              });
              setTimeout(() => {
                uni.navigateBack();
              }, 2000);
            } else {
              uni.showToast({
                title: res.msg || "删除失败",
                icon: "none",
                duration: 2000,
              });
            }
          })
          .catch((err) => {
            uni.showToast({
              title: "删除失败",
              icon: "none",
              duration: 2000,
            });
          })
          .finally(() => {
            uni.hideLoading();
          });
      }
    },
  });
}
//  修改点赞状态
const handleChangeLike = () => {
  let params = {
    type: 1,
    commentId: initId.value,
  };

  if (detailInfo.value.upUserStatus === 0) {
    freshNewsService.addLike(params).then((res) => {
      if (res && res.code === "200") {
        detailInfo.value = {
          ...detailInfo.value,
          upUserStatus: detailInfo.value.upUserStatus === 0 ? 1 : 0,
          upnumber: detailInfo.value.upnumber + 1,
        };

        console.log("detailInfo.value====", detailInfo.value);
      }
    });
  } else {
    freshNewsService.cancelLike(params).then((res) => {
      if (res && res.code === "200") {
        detailInfo.value = {
          ...detailInfo.value,
          upUserStatus: detailInfo.value.upUserStatus === 0 ? 1 : 0,
          upnumber: detailInfo.value.upnumber - 1,
        };

        console.log("detailInfo.value====", detailInfo.value);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径

.fresh-news-detail-page {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 200rpx;
  background: linear-gradient(180deg, #e1fff8 0%, #e1fff8 17%, #ffffff 33%);
  overflow: hidden;

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

        .swiper-item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          .swiper-item-img {
            width: 100%;
          }
        }
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
  .bj_del {
    width: 100%;
    display: flex;
    margin-top: 32rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #004f99;
    margin-bottom: 12rpx;
    .bj_img {
      margin-right: 32rpx;
      display: flex;
      align-items: center;
      image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 12rpx;
      }
    }
  }
  .ca_day {
    color: #a3a3a3;
    font-size: 24rpx;
    font-weight: 400;
    margin-top: 32rpx;
    margin-bottom: 16rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
  }

  .comment-num-row {
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

  .bottom-comment-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    height: 188rpx;
    padding: 0rpx 32rpx;
    padding-top: 24rpx;
    border-top: 1rpx solid $Color-B-5;
    box-sizing: border-box;

    .actions {
      width: 240rpx;
      display: flex;
      padding-left: 24rpx;
      justify-content: space-between;
      align-items: center;
      height: 72rpx;
      padding: 0rpx 32rpx;

      .action-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .item-icon {
          width: 48rpx;
          height: 48rpx;
          margin-right: 3rpx;
        }

        .item-num {
          font-size: 30rpx;
          color: $Color-B-1;
        }
      }
    }

    .input-box {
      width: calc(100% - 240rpx);
      display: flex;
      flex-direction: row;
      background-color: $Color-B-5;
      border-radius: 122rpx;
      height: 72rpx;
      padding: 0rpx 32rpx;
      align-items: center;

      .prev-icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 16rpx;
      }
    }
  }
}
</style>