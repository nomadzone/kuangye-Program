"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: ""
    },
    zIndex: {
      type: String,
      default: "9"
    }
  },
  data() {
    return {
      StatusBar: 0
    };
  },
  created() {
    const sys = common_vendor.wx$1.getSystemInfoSync();
    this.StatusBar = sys.statusBarHeight;
  },
  computed: {},
  methods: {
    doBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$5,
    b: common_vendor.o((...args) => $options.doBack && $options.doBack(...args)),
    c: common_vendor.t($props.title),
    d: $data.StatusBar + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-05f6b923"]]);
wx.createComponent(Component);
