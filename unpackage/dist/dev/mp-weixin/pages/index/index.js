"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../../components/CustomTabbar.js";
const HomeNavbar = () => "../../components/HomeNavbar.js";
const _sfc_main = {
  components: {
    CustomTabbar,
    HomeNavbar
  },
  data() {
    return {
      schooolTitle: "西安交通大学博学楼"
    };
  },
  methods: {
    doAction() {
    }
  }
};
if (!Array) {
  const _component_HomeNavbar = common_vendor.resolveComponent("HomeNavbar");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_component_HomeNavbar + _component_CustomTabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.doAction),
    b: common_vendor.p({
      title: $data.schooolTitle
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
