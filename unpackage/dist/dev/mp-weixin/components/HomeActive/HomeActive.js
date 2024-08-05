"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3e3
    },
    duration: {
      type: Number,
      default: 500
    },
    indicatorActiveColor: {
      type: String,
      default: "#007aff"
    }
  },
  data() {
    return {
      images: [
        "https://img2.baidu.com/it/u=184291116,1680755030&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=620",
        "https://img.zcool.cn/community/01ec0d5c094270a801209252977f83.jpg@3000w_1l_0o_100sh.jpg",
        "https://img0.baidu.com/it/u=1317875771,334317502&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500"
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.images, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    }),
    b: $props.autoplay,
    c: $props.interval,
    d: $props.duration,
    e: $props.indicatorActiveColor
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8ab36061"]]);
wx.createComponent(Component);
