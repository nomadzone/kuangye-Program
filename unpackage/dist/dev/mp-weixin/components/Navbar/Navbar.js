"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      StatusBar: 0,
      CustomBar: 0
    };
  },
  created() {
    const sys = common_vendor.wx$1.getSystemInfoSync();
    this.StatusBar = sys.statusBarHeight;
    this.CustomBar = sys.platform == "android" ? sys.statusBarHeight + 50 : sys.statusBarHeight + 45;
  },
  computed: {},
  methods: {
    handleRightAction() {
      console.log("Right button clicked");
      this.$emit("action");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.t($props.title),
    c: common_assets._imports_1,
    d: common_vendor.o((...args) => $options.handleRightAction && $options.handleRightAction(...args)),
    e: $data.StatusBar + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-05f6b923"]]);
wx.createComponent(Component);
