"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: {
    isPositon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      longitude: 0,
      latitude: 0,
      initialLongitude: 113.32452,
      // 初始经度
      initialLatitude: 23.099994,
      // 初始纬度
      markers: []
    };
  },
  created() {
    this.getUserLocation();
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
      const mapCtx = common_vendor.index.createMapContext("map", this);
      mapCtx.moveToLocation({
        longitude: this.initialLongitude,
        latitude: this.initialLatitude
      });
    },
    getDataList() {
      let markers = [];
      for (let i = 0; i < 10; i++) {
        var randomNumber1 = this.latitude + Math.random() * (0.02 - 5e-3) + 5e-3;
        var randomNumber2 = this.longitude + Math.random() * (0.02 - 5e-3) + 5e-3;
        markers.push({
          id: i,
          "latitude": randomNumber1,
          "longitude": randomNumber2,
          "title": i,
          // 'iconPath': '../../static/image/popu-2.png',
          "width": "32",
          "height": "32",
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
            textAlign: "center"
          }
        });
      }
      this.markers = markers;
    },
    getUserLocation() {
      const _this = this;
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        success: () => {
          _this.getLocation();
        },
        fail: () => {
          common_vendor.index.showModal({
            title: "授权失败",
            content: "需要获取你的地理位置，请打开授权",
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                common_vendor.wx$1.openSetting({
                  success: (settingData) => {
                    if (settingData.authSetting["scope.userLocation"]) {
                      _this.getLocation();
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    getLocation() {
      const _this = this;
      common_vendor.index.getLocation({
        type: "gcj02",
        // 返回可以用于 wx.openLocation 的坐标
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
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.longitude,
    b: $data.latitude,
    c: $data.markers,
    d: common_vendor.o((...args) => $options.markertap && $options.markertap(...args)),
    e: common_vendor.o((...args) => $options.onBindcallouttap && $options.onBindcallouttap(...args)),
    f: common_vendor.o((...args) => $options.regionchange && $options.regionchange(...args)),
    g: $props.isPositon
  }, $props.isPositon ? {
    h: common_assets._imports_0$4,
    i: common_vendor.o((...args) => $options.resetLocation && $options.resetLocation(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e298514"]]);
wx.createComponent(Component);
