"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentPage: "",
      visible: false
    };
  },
  methods: {
    goTo(pagePath) {
      common_vendor.index.switchTab({
        url: pagePath
      });
    },
    addAction() {
      this.visible = true;
      console.log("Add button clicked");
    },
    updateCurrentPage() {
      const pages = getCurrentPages();
      if (pages.length) {
        const currentPage = pages[pages.length - 1];
        this.currentPage = "/" + currentPage.route;
      }
    },
    handleOverlayClick() {
      this.visible = false;
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
  return common_vendor.e({
    a: $data.currentPage === "/pages/index/index" ? "/static/images/home_selected.png" : "/static/images/home.png",
    b: common_vendor.n($data.currentPage === "/pages/index/index" ? "tab-item_selected" : ""),
    c: common_vendor.o(($event) => $options.goTo("/pages/index/index")),
    d: $data.visible
  }, $data.visible ? {
    e: common_vendor.o((...args) => $options.handleOverlayClick && $options.handleOverlayClick(...args))
  } : {}, {
    f: common_assets._imports_0$1,
    g: common_assets._imports_1$1,
    h: common_assets._imports_2$1,
    i: common_vendor.o(() => {
    }),
    j: common_assets._imports_3,
    k: common_vendor.o((...args) => $options.handleOverlayClick && $options.handleOverlayClick(...args)),
    l: common_vendor.n($data.visible ? "fade-enter" : "fade-leave"),
    m: $data.visible,
    n: common_assets._imports_4,
    o: common_vendor.o((...args) => $options.addAction && $options.addAction(...args)),
    p: $data.currentPage === "/pages/explore/explore" ? "/static/images/explore_selected.png" : "/static/images/explore.png",
    q: common_vendor.n($data.currentPage === "/pages/explore/explore" ? "tab-item_selected" : ""),
    r: common_vendor.o(($event) => $options.goTo("/pages/explore/explore"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-306ca082"]]);
wx.createComponent(Component);
