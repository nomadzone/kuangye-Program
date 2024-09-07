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
    doPath(url) {
      if (!url)
        return;
      common_vendor.index.navigateTo({
        url
      });
    },
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
    f: common_assets._imports_0$10,
    g: common_vendor.o(($event) => $options.doPath("/pagesToggle/pages/public/public")),
    h: common_assets._imports_1$9,
    i: common_assets._imports_2$8,
    j: common_vendor.o(() => {
    }),
    k: common_assets._imports_0$11,
    l: common_vendor.o((...args) => $options.handleOverlayClick && $options.handleOverlayClick(...args)),
    m: common_vendor.n($data.visible ? "fade-enter" : "fade-leave"),
    n: $data.visible,
    o: common_assets._imports_4$3,
    p: common_vendor.o((...args) => $options.addAction && $options.addAction(...args)),
    q: $data.currentPage === "/pages/explore/explore" ? "/static/images/explore_selected.png" : "/static/images/explore.png",
    r: common_vendor.n($data.currentPage === "/pages/explore/explore" ? "tab-item_selected" : ""),
    s: common_vendor.o(($event) => $options.goTo("/pages/explore/explore"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-306ca082"]]);
wx.createComponent(Component);
