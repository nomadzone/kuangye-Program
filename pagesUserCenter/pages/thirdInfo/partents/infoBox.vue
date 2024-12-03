<template>
  <view class="info-container">
    <view class="top-content" v-if="info.images">{{ info.describe }}</view>
    <view class="partner-modal-info-box">
      <view class="info-top">
        <view class="body-content" v-if="!info.images">{{
          info.describe
        }}</view>
        <view class="address-row-light" v-if="info.images">
          <view class="address-info">
            <image
              class="address-icon"
              src="/static/images/address.png"
            ></image>
            <view class="distance-text">{{ info?.distanceMeters }}km</view>
            <view class="split-line"></view>
            <view class="address-text">{{ filterAndRemoveBefore(info?.address) }}</view>
          </view>
          <view class="guide-link">
            <!-- <view class="guide-text">导航</view> -->
          </view>
        </view>
        <view class="address-row-light address-row" v-else>
          <view class="address-info">
            <image
              class="address-icon"
              src="/static/images/address.png"
            ></image>
            <view class="distance-text">{{ info?.distanceMeters }}km</view>
            <view class="split-line"></view>
            <view class="address-text">{{ filterAndRemoveBefore(info?.address) }}</view>
          </view>
          <view class="guide-link">
            <!-- <view class="guide-text">导航</view> -->
          </view>
        </view>

        <view class="date-row-light" v-if="info.images">
          <view class="date-info">
            <image
              class="date-icon"
              src="/static/images/dates.png"
            ></image>
            <view class="date-text"
              >{{ formatDateMonthDay(info?.expectdate) }}
              {{ formatDateWeekDay(info?.expectdate) }}</view
            >
            <view class="split-line"></view>
            <view class="time-text">{{
              formatDateHour(info?.expectdate)
            }}</view>
          </view>
        </view>
        <view class="date-row-light date-row" v-else>
          <view class="date-info">
            <image
              class="date-icon"
              src="/static/images/dates.png"
            ></image>
            <view class="date-text"
              >{{ formatDateMonthDay(info?.expectdate) }}
              {{ formatDateWeekDay(info?.expectdate) }}</view
            >
            <view class="split-line"></view>
            <view class="time-text">{{
              formatDateHour(info?.expectdate)
            }}</view>
          </view>
        </view>
      </view>
      <view class="info-bottom">
        <view class="avatar-box" @click="$emit('toDetail')">
          <image
            class="avatar-img"
            v-if="info.initiatorUrl"
            :src="info.initiatorUrl"
          ></image>
          <image class="avatar-img" v-else :src="headerPhotos"></image>
        </view>
        <view class="author-info">
          <view class="name-sex">
            <view
              :class="
                info.images ? 'name-text-light' : 'name-text-light name-text'
              "
            >
              {{ info.initiatorName }}
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
          <scroll-view scroll-x class="tag-info">
            <view
              class="sex_box_list"
              v-for="(item, index) in info?.userPreferenceList"
              :key="index"
            >
              {{ item.name }}
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script >
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
    filterAndRemoveBefore(address) {
      if (!address) return "";
	let result = address;
	const patterns = ['省', '市', '县', '自治区' ];
	for (const pattern of patterns) {
	  const regex = new RegExp(`.*?${pattern}`);
	  const match = result.match(regex);
	  if (match) {
		result = result.slice(match.index + match[0].length).trim();
	  }
	}
	return result;
  },
    toD(info) {
      console.log(info);
      this.$emit("toDetail");
    },
    // 日期转 月日
    formatDateMonthDay(dates) {
      if (!dates) return "";
      const dateStr = dates.replace(/-/g, "/");
      // 创建一个新的Date对象
      const date = new Date(dateStr);

      // 获取月份、日期、小时、分钟
      const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始的，所以需要+1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // 将月份和日期格式化为两位数
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      // 拼接成最终的字符串
      return `${formattedMonth}月${formattedDay}日`;
    },
    // 获取小时
    formatDateHour(dates) {
      if (!dates) return "";
      const dateStr = dates.replace(/-/g, "/");
      // 创建一个新的Date对象
      const date = new Date(dateStr);
      // 获取月份、日期、小时、分钟
      const hours =
        date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes =
        date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      // 拼接成最终的字符串
      return `${hours}:${minutes}`;
    },
    // 转周几
    formatDateWeekDay(dates) {
      if (!dates) return "";
      const dateStr = dates.replace(/-/g, "/");
      // 创建一个新的Date对象
      const date = new Date(dateStr);

      // 获取月份、日期、小时、分钟
      const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始的，所以需要+1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // 获取星期，星期使用getDay()方法，返回的也是从0开始的，0代表周日
      const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const weekDay = days[date.getDay()];

      // 拼接成最终的字符串
      return `${weekDay}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径

.info-container {
  position: relative;
  z-index: 1000;
  height: 686rpx;
  padding: 32rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #a8e6ff 2%, #e3f7ff 57.5%);
  display: flex;
  flex-direction: column;
  .top-content {
    font-family: PingFang SC;
    font-size: 40rpx;
    font-weight: 600;
    line-height: 56rpx;
    margin-bottom: 32rpx;
  }

  .partner-modal-info-box {
    width: 100%;
    height: 100%;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info-top {
      .body-content {
        font-family: PingFang SC;
        font-size: 40rpx;
        font-weight: 600;
        line-height: 56rpx;
        margin-bottom: 32rpx;
      }

      .address-row-light {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #000000;
        font-size: 28rpx;
        margin-bottom: 8rpx;
        height: 40rpx;

        .address-info {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .address-icon {
            width: 32rpx;
            height: 32rpx;
          }

          .distance-text {
            padding: 0px 6rpx;
          }

          .split-line {
            height: 22rpx;
            width: 2rpx;
            background-color: #000000;
          }

          .address-text {
            padding-left: 12rpx;
            width: 450rpx;
          }
        }

        .guide-link {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
          .guide-icon {
            width: 32rpx;
            height: 32rpx;
          }
        }
      }

      .address-row {
        color: $Color-B-1;

        .split-line {
          height: 22rpx;
          width: 2rpx;
          background-color: $Color-B-1;
        }

        .guide-text {
          color: #004f99;
        }
      }

      .date-row-light {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        color: #000000;
        font-size: 28rpx;
        height: 40rpx;

        .date-info {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          .date-icon {
            width: 32rpx;
            height: 32rpx;
          }

          .date-text {
            padding: 0px 6rpx;
          }

          .split-line {
            height: 22rpx;
            width: 2rpx;
            background-color: #000000;
          }

          .time-text {
            padding-left: 6rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .date-row {
        color: $Color-B-1;

        .split-line {
          height: 22rpx;
          width: 2rpx;
          background-color: $Color-B-1;
        }
      }
    }
    .info-bottom {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .avatar-box {
        width: 100rpx;
        height: 100rpx;
        border-radius: 24rpx;
        overflow: hidden;
        margin-right: 32rpx;
        flex-shrink: 0;
        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 24rpx;
        }
      }
      .author-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        width: calc(100% - 130rpx);
        .name-sex {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
          .name-text-light {
            //styleName: 正文-加粗;
            font-family: PingFang SC;
            font-size: 28rpx;
            font-weight: 600;
            text-align: left;
            color: #000000;
            display: flex;
            align-items: center;
          }
          .name-text {
            color: $Color-B-1;
          }
          image{
            width: 40rpx;
            height: 40rpx;
            margin-left: 5rpx;
          }
          .sex-box {
          }
        }
        .tag-info {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          .sex_box_list {
            margin-right: 10rpx;
            font-size: 24rpx;
            color: #222222;
            background: #ffffff;
            padding: 7rpx 18rpx;
            line-height: 30rpx;
            border-radius: 30rpx;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>