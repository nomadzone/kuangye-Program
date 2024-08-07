"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    doButton(item, index) {
      this.$emit("doButton", item, index);
    },
    doItem(item, index) {
      this.$emit("doItem", item, index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.type != "3"
      }, item.type != "3" ? {
        b: item.image
      } : {}, {
        c: item.type == "3"
      }, item.type == "3" ? {} : {}, {
        d: common_vendor.t(item.title),
        e: item.createrAvator,
        f: common_vendor.t(item.creater),
        g: item.type == 2
      }, item.type == 2 ? {
        h: common_assets._imports_0$6,
        i: common_vendor.t(item.like)
      } : {}, {
        j: item.type != "2"
      }, item.type != "2" ? {
        k: common_vendor.t(item.gap),
        l: common_vendor.t(item.time)
      } : {}, {
        m: item.type == "1"
      }, item.type == "1" ? {
        n: common_vendor.f(item.remainAvators, (img, i, i1) => {
          return {
            a: -(i * 6) + "px",
            b: img,
            c: i
          };
        }),
        o: `${item.remainAvators.length * (32 - 10)}rpx`,
        p: common_vendor.t(item.remain)
      } : {}, {
        q: item.type == "1"
      }, item.type == "1" ? {
        r: common_vendor.t(item.price),
        s: common_vendor.o(($event) => $options.doButton(item, index), index)
      } : {}, {
        t: common_vendor.n(`item-bg-${item.type}`),
        v: index,
        w: common_vendor.o(($event) => $options.doItem(item, index), index)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-794884ce"]]);
wx.createComponent(Component);
