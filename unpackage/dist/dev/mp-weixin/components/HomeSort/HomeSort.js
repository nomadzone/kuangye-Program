"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      sortIndex: 0
    };
  },
  methods: {
    doSort(index) {
      this.sortIndex = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.sortIndex == 0 ? "active" : ""),
    b: common_vendor.o(($event) => $options.doSort(0)),
    c: common_assets._imports_0$3,
    d: common_vendor.n($data.sortIndex == 1 ? "active" : ""),
    e: common_vendor.o(($event) => $options.doSort(1)),
    f: common_assets._imports_1$1,
    g: common_vendor.n($data.sortIndex == 2 ? "active" : ""),
    h: common_vendor.o(($event) => $options.doSort(2)),
    i: common_assets._imports_2,
    j: common_vendor.n($data.sortIndex == 3 ? "active" : ""),
    k: common_vendor.o(($event) => $options.doSort(3)),
    l: common_assets._imports_3
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-65431465"]]);
wx.createComponent(Component);
