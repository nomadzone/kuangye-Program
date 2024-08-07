"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Navbar = () => "../../components/Navbar/Navbar.js";
const Gradual = () => "../../components/Navbar/Gradual.js";
const _sfc_main = {
  components: {
    Navbar,
    Gradual
  },
  data() {
    return {
      StatusBar: 0
    };
  },
  created() {
    const sys = common_vendor.wx$1.getSystemInfoSync();
    this.StatusBar = sys.statusBarHeight;
  }
};
if (!Array) {
  const _easycom_Navbar2 = common_vendor.resolveComponent("Navbar");
  const _component_Gradual = common_vendor.resolveComponent("Gradual");
  (_easycom_Navbar2 + _component_Gradual)();
}
const _easycom_Navbar = () => "../../components/Navbar/Navbar.js";
if (!Math) {
  _easycom_Navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "发布一起野"
    }),
    b: common_vendor.p({
      background: "linear-gradient(to bottom, #FFF7E2, rgb(255 247 226 / 11%))",
      height: "600rpx",
      zIndex: "-1"
    }),
    c: $data.StatusBar + "px",
    d: common_assets._imports_0$1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a8f3499"]]);
wx.createPage(MiniProgramPage);
