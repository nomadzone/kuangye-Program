"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    zIndex: {
      type: String,
      default: "3"
    },
    background: {
      type: String,
      default: "linear-gradient(to bottom, #90f2ff, rgba(130, 240, 255, 0.11))"
    },
    height: {
      type: String,
      default: "176rpx"
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.background,
    b: $props.height,
    c: $props.zIndex
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e7c202ee"]]);
wx.createComponent(Component);
