"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../../components/CustomTabbar.js";
const _sfc_main = {
  components: {
    CustomTabbar
  }
};
if (!Array) {
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  _component_CustomTabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
