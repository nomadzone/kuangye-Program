"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar/Navbar.js";
const Gradual = () => "../../components/Navbar/Gradual.js";
const Upload = () => "../../components/Upload/Upload.js";
const _sfc_main = {
  components: {
    Navbar,
    Gradual,
    Upload
  },
  data() {
    return {
      StatusBar: 0,
      navHeight: 0
    };
  },
  created() {
    this.StatusBar = common_vendor.index.getStorageSync("statusBarHeight");
    this.navHeight = common_vendor.index.getStorageSync("navBarHeight");
  }
};
if (!Array) {
  const _easycom_Navbar2 = common_vendor.resolveComponent("Navbar");
  const _component_Gradual = common_vendor.resolveComponent("Gradual");
  const _easycom_Upload2 = common_vendor.resolveComponent("Upload");
  (_easycom_Navbar2 + _component_Gradual + _easycom_Upload2)();
}
const _easycom_Navbar = () => "../../components/Navbar/Navbar.js";
const _easycom_Upload = () => "../../components/Upload/Upload.js";
if (!Math) {
  (_easycom_Navbar + _easycom_Upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "发布一起野"
    }),
    b: common_vendor.p({
      background: "linear-gradient(to bottom, #FFF7E2, #f5f5f5)",
      height: "100vh",
      zIndex: "-1"
    }),
    c: $data.StatusBar + "px",
    d: common_assets._imports_0$1,
    e: common_assets._imports_1$1,
    f: common_assets._imports_2$1,
    g: common_assets._imports_3,
    h: common_assets._imports_4,
    i: common_assets._imports_5,
    j: common_assets._imports_4,
    k: common_assets._imports_5,
    l: common_assets._imports_4,
    m: common_assets._imports_6,
    n: common_assets._imports_4,
    o: common_vendor.p({
      title: "添加联系微信二维码"
    }),
    p: common_assets._imports_7,
    q: $data.navHeight / 2 + 152 + 64 + "rpx",
    r: $data.navHeight / 2 + 152 + "rpx"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a8f3499"]]);
wx.createPage(MiniProgramPage);
