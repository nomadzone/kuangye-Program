"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      longitude: 0,
      latitude: 0,
      markers: []
    };
  },
  created() {
    this.getUserLocation();
  },
  methods: {
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
          _this.longitude = res.longitude;
          _this.latitude = res.longitude;
        },
        fail: (res) => {
          console.log(res, "fail");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e298514"]]);
wx.createComponent(Component);
