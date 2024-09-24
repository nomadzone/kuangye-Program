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
      @callouttap="onCalloutTap"
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
      mapList: [],
    };
  },
  created() {
  },
  methods: {
    onCalloutTap(e) {
      console.log(e);
      this.goPath(e)
    },
    markertap(e) {
      console.log(e);
      this.goPath(e)
    },
    goPath(e) {
      console.log(e)
      const markerId = e.detail.markerId; // 获取点击的 markerId
      const marker = this.mapList[markerId]; // 根据 markerId 找到相应的 marker 数据
      if (marker) {
        // 跳转到详情页面
        uni.navigateTo({
          url: `/pagesToggle/pages/details/details?id=${marker.id}&latitude=${marker.latitude}&longitude=${marker.longitude}`,
        });
      }
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
      uni.setStorageSync('location', {
        longitude: this.initialLongitude,
        latitude: this.initialLatitude,
      })
      uni.removeStorageSync('selectLocation');
    },
    async getDataList(options) {
      try {
        let location = uni.getStorageSync('location')
        let res = await http.homeActivityMap({
          longitude:  options?.longitude || this.longitude || location.longitude,
          latitude: options?.latitude || this.latitude || location.longitude,
        });	
        let data = res.data
        let markers = [];
        this.mapList = res.data;
        let color = {
          0: {
            bg: '#E1FFF8',
            line: '#00C4EF'
          },
          1: {
            bg: '#E3F7FF',
            line: '#62e6c8'
          },
          2: {
            bg: '#FFF7E2',
            line: '#ecd28d'
          },
        }
        for (let i = 0; i < data.length; i++) {
          let item = data[i]
          markers.push({
            id: i,
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            // iconPath: `../../static/images/${iconPath[i]}`,
            width: 0,
            height: 0,
            callout: {
              content: item?.title?.length > 9 ? `${item.title.substring(0, 9)}...` : item.title,
              fontSize: 12,
              bgColor: color[i % 3].bg,
              color: "#000",
              borderWidth: 2,
              borderColor: color[i % 3].line,
              borderRadius: 10,
              padding: 6,
              display: "ALWAYS",
              textAlign: "center"
            },
          });
        }
        this.markers = markers;
        console.log(markers, "markers")
      } catch (error) {
        console.log(error);
      }
    },
    getUserLocation(fn) {
      const _this = this;
      uni.authorize({
        scope: "scope.userLocation",
        success: () => {
          _this.getLocation(fn);
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
                      _this.getLocation(fn);
                    }
                  },
                });
              }
            },
          });
        },
      });
    },
    getLocation(fn) {
      const _this = this;
      uni.getLocation({
        type: "gcj02", // 返回可以用于 wx.openLocation 的坐标
        success: (res) => {
          console.log(res, "getLocation 定位 gcj02");
          _this.initialLongitude = res.longitude;
          _this.initialLatitude = res.latitude;
          _this.longitude = res.longitude;
          _this.latitude = res.latitude;
          uni.setStorageSync('location', {
            longitude: res.longitude,
            latitude: res.latitude,
          })
          _this.getDataList();
          fn && fn()
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
