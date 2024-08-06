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
    },
    doSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.sortIndex == 0 ? "active" : ""),
    b: common_vendor.o(($event) => $options.doSort(0)),
    c: `../../static/images/sort-togger${$data.sortIndex == 1 ? "-seleted" : ""}.png`,
    d: common_vendor.n($data.sortIndex == 1 ? "active" : ""),
    e: common_vendor.o(($event) => $options.doSort(1)),
    f: `../../static/images/sort-eye${$data.sortIndex == 2 ? "-seleted" : ""}.png`,
    g: common_vendor.n($data.sortIndex == 2 ? "active" : ""),
    h: common_vendor.o(($event) => $options.doSort(2)),
    i: `../../static/images/sort-go${$data.sortIndex == 3 ? "-seleted" : ""}.png`,
    j: common_vendor.n($data.sortIndex == 3 ? "active" : ""),
    k: common_vendor.o(($event) => $options.doSort(3)),
    l: common_assets._imports_0,
    m: common_vendor.o((...args) => $options.doSearch && $options.doSearch(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-65431465"]]);
wx.createComponent(Component);
