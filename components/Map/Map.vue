<template>
  <view class="container">
    <map
      id="map"
      :show-location="true"
      :longitude="longitude"
      :latitude="latitude"
      scale="16"
      style="width: 100vw; height: 50vh"
      :markers="markers"
      enable-zoom
      enable-rotate
      @markertap="markertap"
      @bindcallouttap="onBindcallouttap"
      @regionchange="regionchange"
    >
    </map>
    <div class="positon" @click="resetLocation" v-if="isPositon">
      <image src="/static/images/location_m.png" mode=""></image>
    </div>
  </view>
</template>

<script>
import http from "@/utils/http";
export default {
  props: {
    isPositon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      longitude: 0,
      latitude: 0,
      initialLongitude: 113.32452, // 初始经度
      initialLatitude: 23.099994, // 初始纬度
      markers: [],
    };
  },
  created() {
    // this.getUserLocation();
  },
  methods: {
    markertap(e) {
      console.log(e);
    },
    // 点击了气泡
    onBindcallouttap(e) { 
      console.log("onBindcallouttap", e);
    },
    regionchange(e) {
      console.log("regionchange", e);
    },
    resetLocation() {
      const mapCtx = uni.createMapContext("map", this);
      mapCtx.moveToLocation({
        longitude: this.initialLongitude,
        latitude: this.initialLatitude,
      });
    },
    async getDataList() {
      try {
        let res = await http.homeActivityMap({
          longitude:  77.027719,
          latitude: 38.869968,
        });	
        console.log(res)
        let markers = [];
        for (let i = 0; i < 10; i++) {
          var randomNumber1 =
            this.latitude + Math.random() * (0.02 - 0.005) + 0.005;
          var randomNumber2 =
            this.longitude + Math.random() * (0.02 - 0.005) + 0.005;
          markers.push({
            id: i,
            latitude: randomNumber1,
            longitude: randomNumber2,
            title: i,
            // 'iconPath': '../../static/image/popu-2.png',
            width: "32",
            height: "32",
            callout: {
              content: `${i}`,
              fontSize: 12,
              bgColor: "#ff9800",
              color: "#fff",
              borderWidth: 1,
              borderColor: "#ff9800",
              borderRadius: 16,
              padding: 6,
              display: "ALWAYS",
              textAlign: "center",
            },
          });
        }
        this.markers = markers;
      } catch (error) {
        console.log(error);
      }
    },
    getUserLocation() {
      const _this = this;
      uni.authorize({
        scope: "scope.userLocation",
        success: () => {
          _this.getLocation();
        },
        fail: () => {
          uni.showModal({
            title: "授权失败",
            content: "需要获取你的地理位置，请打开授权",
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (settingData) => {
                    if (settingData.authSetting["scope.userLocation"]) {
                      _this.getLocation();
                    }
                  },
                });
              }
            },
          });
        },
      });
    },
    getLocation() {
      const _this = this;
      uni.getLocation({
        type: "gcj02", // 返回可以用于 wx.openLocation 的坐标
        success: (res) => {
          console.log(res, "getLocation 定位 gcj02");
          _this.initialLongitude = res.longitude;
          _this.initialLatitude = res.latitude;
          _this.longitude = res.longitude;
          _this.latitude = res.latitude;
          _this.getDataList();
        },
        fail: (res) => {
          console.log(res, "fail");
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
/* index.wxss */
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.positon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 116rpx;
  right: 16rpx;
  width: 80rpx;
  height: 80rpx;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  background-color: #fff;

  image {
    width: 48rpx;
    height: 48rpx;
  }
}
</style>
