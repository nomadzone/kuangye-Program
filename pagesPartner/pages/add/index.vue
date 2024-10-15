<template>
  <view class="partner-add-page">
    <custom-nav-bar
      title="发布找搭子"
      :navBarStyle="navBarStyle"
      theme="dark"
    ></custom-nav-bar>
    <image class="corner-img" src="../../static/images/corner-icon.svg"></image>
    <form style="display: block; zindex: 11" @submit="handleSubmit">
      <view class="release-form-box">
        <textarea
          class="content-textarea"
          v-model="form.describe"
          name="describe"
          auto-height
          placeholder="有没有人浅咖一下？"
          :maxlength="30"
        />
        <Upload :limit="9" @upload="doUploadPartnerImg" :images="partnerImgs" />

        <view class="location-row" @tap="handleSelectLocation()">
          <image
            class="map-icon"
            src="../../static/images/partner-meet-location.svg"
          ></image>
          <view class="location">
            <text class="location-text">{{
              location.longitude && location.latitude
                ? location.address
                : "面基地点（选填）"
            }}</text>
            <image
              class="location-select-icon"
              src="../../static/images/select-more.svg"
            ></image>
          </view>
        </view>
        <view class="location-row" @tap="handleOpenMeetingTime()">
          <image class="map-icon" src="../../static/images/clock.svg"></image>

          <view class="location">
            <text class="location-text">{{
              meetingTime ? meetingTime : "面基时间（选填）"
            }}</text>
            <image
              class="location-select-icon"
              src="../../static/images/select-more.svg"
            ></image>
          </view>
        </view>
      </view>

      <view class="release-form-box">
        <view class="block-title">联系方式 </view>

        <Upload
          :limit="9"
          @upload="doUploadContractImgs"
          :images="contractImgs"
        />

        <view class="location-row">
          <image class="map-icon" src="../../static/images/phone.svg"></image>
          <view class="location">
            <input
              class="location-text"
              v-model="form.number"
              name="number"
              placeholder="输入手机号（选填）"
            />
          </view>
        </view>
      </view>
      <View class="footer-actions">
        <button class="submit-btn" form-type="submit">发布</button>
      </View>
    </form>
    <uv-picker
      title="期望时间（选填）"
      confirmText="保存"
      ref="meetingTimeRef"
      :columns="timeList"
      @confirm="handleConfirmMeetingTime"
    ></uv-picker>
  </view>
</template>

<script setup>
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import Upload from "@/components/Upload/Upload.vue";
import { onLoad } from "@dcloudio/uni-app";
import http from "@/utils/http.js";
import {
  getDayHours,
  getDayMin,
  getDatesAndWeeks,
  formatDateString,
} from "@/utils/index.js";
import { ref } from "vue";
import PartnerService from "../../service/service";
import { landline } from "@climblee/uv-ui/libs/function/test";
const navBarStyle = {
  position: "relative",
  color: "rgba(34, 34, 34, 1)",
};

let partnerImgs = ref([]);
const doUploadPartnerImg = (imgs) => {
  partnerImgs.value = imgs;
};

let contractImgs = ref([]);

const doUploadContractImgs = (imgs) => {
  contractImgs.value = imgs;
};
const form = ref({});

let location = ref({
  longitude: null,
  latitude: null,
  address: null,
});
onLoad((options) => {
  const locations = uni.getStorageSync("location");
  if (options.id) {
    PartnerService.selectStructure({
      id: options.id,
      latitude: locations.latitude,
      longitude: locations.longitude,
    }).then((res) => {
      form.value = res.data;
      partnerImgs.value = res.data.images.split(",");
      contractImgs.value = res.data.contactphoto.split(",");
      location.value = {
        address: res.data.address,
        longitude: res.data.longitude,
        latitude: res.data.latitude,
      };
      meetingTime.value = res.data.expectdate;
    });
  }
});
// 选择面基地点
const handleSelectLocation = () => {
  wx.chooseLocation({
    success: (res) => {
      if (res.address) {
        location.value = {
          address: res.address + res.name,
          longitude: res.longitude,
          latitude: res.latitude,
        };
      } else {
        http
          .getAddress({
            longitude: res.longitude,
            latitude: res.latitude,
          })
          .then((val) => {
            location.value = {
              address: res.address + res.name,
              longitude: res.longitude,
              latitude: res.latitude,
            };
          });
      }
    },
    fail: function (err) {
      console.log(err, "用户未选择地址");
    },
  });
};
let meetingTime = ref(null);
let meetingTimeRef = ref();

let timeList = ref([getDatesAndWeeks(true), getDayHours(), getDayMin()]);

// 选择面基时间
const handleOpenMeetingTime = () => {
  console.log("meetingTimeRef====", meetingTimeRef);
  meetingTimeRef.value.open();
};

// 确认选择面基时间
const handleConfirmMeetingTime = (e) => {
  console.log("e====", e);

  let dateStr = e.value[0]?.split(" ")[0];
  let hourStr = e.value[1]?.substring(0, 2);
  let minStr = e.value[2]?.substring(0, 2);
  meetingTime.value = dateStr + " " + hourStr + ":" + minStr + ":00";
};

// 表单提交
const handleSubmit = (e) => {
  if (e.detail.value.describe.trim() === "") {
    uni.showToast({
      title: "请输入内容",
      icon: "none",
    });
    return;
  }
  if (partnerImgs.value.length === 0) {
    uni.showToast({
      title: "请上传图片",
      icon: "none",
    });
    return;
  }
  if (contractImgs.value.length === 0) {
    uni.showToast({
      title: "请上传联系方式",
      icon: "none",
    });
    return;
  }
  let params = {
    ...e.detail.value,
    ...location.value,
    type: 3,
    expectdate: meetingTime.value,
    contactphoto: contractImgs.value.join(","),
    images: partnerImgs.value.join(","),
  };
  if (form.value.id) {
    params.id = form.value.id;
  }
  PartnerService.add(params).then((res) => {
    if (res && res.code === "200") {
      uni.showToast({
        title: "发布成功！",
        success() {
          uni.navigateBack();
        },
      });
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径

.partner-add-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #e3f7ff 2.62%, #f6f5f5 63.23%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  .corner-img {
    width: 208rpx;
    height: 208rpx;
    top: 82rpx;
    left: 78rpx;
    z-index: 10;
    position: absolute;
  }

  .release-form-box {
    z-index: 11;
    margin: 32rpx;
    background-color: #ffffff;
    border-radius: 24rpx;
    padding: 32rpx 24rpx;
    margin-bottom: 24rpx;

    .block-title {
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 600;
      color: $Color-B-1;
      margin-bottom: 32rpx;
    }

    .imgs-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 32rpx;

      .item {
        width: 200rpx;
        height: 200rpx;
        border-radius: 12rpx;
        opacity: 0px;
        margin-bottom: 12rpx;
        margin-right: 12rpx;
      }

      .img-upload-btn {
        background-color: rgba(245, 245, 245, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .add-img-icon {
          width: 40rpx;
          height: 40rpx;
          margin-bottom: 12rpx;
        }

        .add-img-text {
          font-family: PingFang SC;
          font-size: 24rpx;
          font-weight: 400;
          line-height: 28rpx;
          text-align: center;
          color: rgba(163, 163, 163, 1);
        }
      }
    }

    .content-textarea {
      //styleName: 正文-普通;
      font-family: PingFang SC;
      font-size: 32rpx;
      font-weight: 400;
      text-align: left;
      min-height: 260rpx;
    }

    .location-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 32rpx;
      margin-top: 32rpx;

      .map-icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 4rpx;
        flex: 0;
      }

      .location {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        color: rgba(163, 163, 163, 1);

        .location-text {
          //styleName: 正文-普通;
          font-family: PingFang SC;
          font-size: 28rpx;
          font-weight: 400;
          text-align: left;
        }

        .location-select-icon {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
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