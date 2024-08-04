"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      active: 0,
      cates: ["综合", "美食", " 7日近况", " 校友圈", "一日游", "二日游"]
    };
  },
  methods: {
    selectCategory(index) {
      this.active = index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.cates, (category, index, i0) => {
      return {
        a: common_vendor.t(category),
        b: index,
        c: "category-" + index,
        d: $data.active == index ? 1 : "",
        e: common_vendor.o(($event) => $options.selectCategory(index), index)
      };
    }),
    b: $data.active
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b42a060"]]);
wx.createComponent(Component);
