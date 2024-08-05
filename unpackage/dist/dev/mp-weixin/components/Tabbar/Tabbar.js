"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentPage: ""
    };
  },
  methods: {
    goTo(pagePath) {
      common_vendor.index.switchTab({
        url: pagePath
      });
    },
    addAction() {
      console.log("Add button clicked");
    },
    updateCurrentPage() {
      const pages = getCurrentPages();
      if (pages.length) {
        const currentPage = pages[pages.length - 1];
        this.currentPage = "/" + currentPage.route;
      }
    }
  },
  mounted() {
    this.updateCurrentPage();
  },
  watch: {
    // 监听路由变化
    "$route"() {
      this.updateCurrentPage();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.currentPage === "/pages/index/index" ? "/static/images/home_selected.png" : "/static/images/home.png",
    b: common_vendor.n($data.currentPage === "/pages/index/index" ? "tab-item_selected" : ""),
    c: common_vendor.o(($event) => $options.goTo("/pages/index/index")),
    d: common_assets._imports_0,
    e: common_vendor.o((...args) => $options.addAction && $options.addAction(...args)),
    f: $data.currentPage === "/pages/explore/explore" ? "/static/images/explore_selected.png" : "/static/images/explore.png",
    g: common_vendor.n($data.currentPage === "/pages/explore/explore" ? "tab-item_selected" : ""),
    h: common_vendor.o(($event) => $options.goTo("/pages/explore/explore"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-306ca082"]]);
wx.createComponent(Component);
