"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/explore/explore.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
    const sys = common_vendor.wx$1.getSystemInfoSync();
    common_vendor.index.setStorageSync("statusBarHeight", sys.statusBarHeight);
    common_vendor.index.setStorageSync("navBarHeight", sys.platform == "android" ? sys.statusBarHeight + 50 : sys.statusBarHeight + 45);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
