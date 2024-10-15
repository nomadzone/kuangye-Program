<template>
  <view class="partner-modal-comp">
    <uni-popup
      ref="popup"
      type="bottom"
      border-radius="10px 10px 0 0"
      :safe-area="false"
    >
      <view class="body">
        <image
          class="close-icon"
          src="../../static/images/partnerModalCloseIcon.svg"
          @tap="handleClose"
        ></image>
        <image
          class="top-icon"
          src="../../static/images/partnerTopIcon.svg"
        ></image>

        <InfoBox
          v-if="infoType === 1"
          :info="infoData"
          @toDetail="toDetail"
        ></InfoBox>
        <ContractBox v-else :info="infoData"></ContractBox>
        <view
          class="footer-actions"
          v-if="infoData.userStatus != 1"
          @tap="handleChangeAction()"
        >
          <view class="contract-action" v-if="infoType === 1">
            <view class="contract-btn">获取联系</view>
          </view>
          <view class="info-btn" v-else-if="infoType === 2">
            <view class="detail-btn">查看详情</view>
            <view class="save-pic-btn" @click="doView">保存到相册</view>
          </view>
        </view>
        <view class="footer-actions" v-else>
          <view class="info-btn">
            <view class="detail-btn" @click="deleteOne">删除</view>
            <view class="save-pic-btn" @click="toEdit">修改</view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import InfoBox from "./infoBox.vue";
import ContractBox from "./contractBox.vue";
import freshNewsService from "../service/service";
export default {
  components: {
    InfoBox,
    ContractBox,
  },

  data() {
    return {
      infoType: 1, // 1-详情 2-联系方式
      infoData: {},
    };
  },
  methods: {
    deleteOne() {
      uni.showModal({
        title: "提示",
        content: "确定删除该条找搭子吗？",
        success: (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: "删除中...",
            });
            freshNewsService
              .deleteFreshNews({
                id: this.infoData.id,
              })
              .then((res) => {
                if (res && res.code === "200") {
                  uni.showToast({
                    title: "删除成功",
                    icon: "success",
                    duration: 2000,
                  });
                  setTimeout(() => {
                    this.$refs.popup.close();
					this.$emit("getDetail");
                  }, 1000);
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
    },
	toEdit() {
		uni.navigateTo({
			url: '/pagesPartner/pages/add/index?id=' + this.infoData.id,
		})
	},
    toDetail() {
      if (this.infoData.userLaunchStatus != 1) {
        uni.navigateTo({
          url:
            "/pagesUserCenter/pages/thirdInfo/index?userId=" + infoData.userId,
        });
      } else {
        uni.navigateTo({
          url: "/pagesUserCenter/pages/index/index",
        });
      }
    },
    show(info) {
      this.infoData = info;
      console.log(this.infoData);
      this.infoType = 1;
      this.$refs.popup.open();
    },
    //
    handleChangeAction() {
      if (this.infoType === 1) {
        this.infoType = 2;
      } else {
        this.infoType = 1;
      }
    },
    handleClose() {
      this.$refs.popup.close();
    },
    doView() {
      uni.downloadFile({
        url: this.infoData?.contactphoto,
        success: (res) => {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: (res) => {
              wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2000,
              });
            },
          });
          uni.openDocument({
            filePath: res.savedFilePath,
            success(res) {},
            fail(err) {},
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径
.partner-modal-comp {
  position: fixed;
  height: 1;
  right: 0;
  top: 100vh;
  z-index: 9999;
  left: 0;
  width: 100%;
  background-color: #ff0000;

  .body {
    padding: 24rpx 32rpx 0rpx 32rpx;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
    background-color: #ffffff;
    position: relative;
    padding-top: 152rpx;
    box-sizing: border-box;
    padding-bottom: 100rpx;
    .close-icon {
      width: 56rpx;
      height: 56rpx;
      position: absolute;
      top: 24rpx;
      left: 32rpx;
    }
    .top-icon {
      width: 280rpx;
      height: 280rpx;
      position: absolute;
      top: -106rpx;
      left: calc(50vw - 140rpx);
    }
    .footer-actions {
      margin-top: 32rpx;
      .contract-action {
        .contract-btn {
          height: 88rpx;
          line-height: 88rpx;
          border-radius: 100rpx;
          background-color: $Color-B-1;
          font-family: PingFang SC;
          font-size: 14px;
          text-align: center;
          color: #fff;
        }
      }
      .info-btn {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .detail-btn {
          width: 50%;
          height: 88rpx;
          line-height: 88rpx;
          text-align: center;
          border-radius: 100rpx;
          border: 2rpx solid $Color-B-1;
          font-size: 28rpx;
          font-weight: 600;
          text-align: center;
          margin-right: 16rpx;
        }
        .save-pic-btn {
          width: 50%;
          height: 88rpx;
          line-height: 88rpx;
          text-align: center;
          border-radius: 100rpx;
          font-size: 28rpx;
          font-weight: 600;
          text-align: center;
          background-color: $Color-B-1;
          color: #ffffff;
          margin-left: 16rpx;
        }
      }
    }
  }
}
</style>