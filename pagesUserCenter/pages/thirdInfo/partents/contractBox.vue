<template>
  <view class="partner-modal-contract-box">
    <image
      src="/static/images/partner-modal-default-bk.png"
      class="default-bk-icon"
    ></image>
    <view class="avatar-box">
      <image
        class="avatar-img"
        v-if="info.avatarUrl"
        :src="info.avatarUrl"
      ></image>
      <image class="avatar-img" v-else :src="headerPhotos"></image>
    </view>
    <view class="name-sex">
      <view class="name-text">
        {{ info.nickname }}
        <image
          class="gender_avatar"
          v-if="info.gender == 0"
          src="/static/images/male.png"
        ></image>
        <image
          class="gender_avatar"
          v-if="info.gender == 1"
          src="/static/images/female.png"
          mode=""
        ></image>
      </view>
      <view class="sex-box"></view>
    </view>
    <view class="wx-info" @click="copyDetail">
      <image
        class="wx-icon"
        src="/static/images/partner-modal-wx-icon.svg"
      ></image>
      <view class="wx-name">{{ info?.phoneNumber || "-" }}</view>
      <image
        class="wx-copy"
        src="/static/images/partner-modal-wx-copy.svg"
      ></image>
    </view>
    <view class="wx-qrcode">
      <image :src="info.contactphoto" mode="initiatorUrl"></image>
    </view>
  </view>
</template>

<script>
import http from "@/utils/http.js";
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      headerPhotos: "",
    };
  },
  mounted() {
    this.getTx();
  },
  methods: {
    getTx() {
      http.noticeSelectOne().then((res) => {
        this.headerPhotos = res.data[0];
      });
    },
    copyDetail() {
      if (!this.info.number) {
        uni.showToast({
          title: "联系方式为空",
          icon: "none",
        });
        return;
      }
      uni.setClipboardData({
        data: this.info.number,
        success: function () {
          uni.showToast({
            title: "复制成功",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径
.partner-modal-contract-box {
  padding: 48rpx 0rpx 32rpx 0rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #a8e6ff 2%, #e3f7ff 57.5%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .default-bk-icon {
    position: absolute;
    right: 0rpx;
    bottom: 72rpx;
    width: 320rpx;
    height: 206rpx;
  }
  .avatar-box {
    width: 100rpx;
    height: 100rpx;
    border-radius: 24rpx;
    overflow: hidden;
    margin-bottom: 16rpx;

    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }

  .name-sex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 32rpx;

    .name-text-light {
      //styleName: 正文-加粗;
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 600;
      text-align: left;
      color: #ffffff;
    }

    .name-text {
      color: $Color-B-1;
      display: flex;
      align-items: center;
      image {
        width: 40rpx;
        height: 40rpx;
        margin-left: 5rpx;
      }
    }
  }

  .wx-info {
    background-color: #ffffff;
    border-radius: 100rpx;
    padding: 16rpx 32rpx;
    display: flex;
    align-items: center;
    z-index: 999;
    .wx-icon {
      width: 32rpx;
      height: 32rpx;
    }

    .wx-name {
      color: $Color-B-1;
      margin: 0rpx 16rpx;
    }

    .wx-copy {
      width: 56rpx;
      height: 56rpx;
    }
  }

  .wx-qrcode {
    width: 282rpx;
    height: 282rpx;
    border-radius: 8rpx;
    background-color: #ffffff;
    margin-top: 32rpx;
    z-index: 999;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>