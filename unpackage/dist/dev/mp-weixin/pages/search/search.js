"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const HomeWaterfalls = () => "../../components/HomeWaterfalls/HomeWaterfalls.js";
const _sfc_main = {
  components: {
    HomeWaterfalls
  },
  data() {
    return {
      value: "",
      isSearch: false,
      history: [
        "历史搜索1",
        "历史搜索1",
        "历史搜索1",
        "历史搜索1",
        "历史搜索1"
      ],
      result: []
    };
  },
  computed: {
    searchHistory() {
      if (!this.value)
        return [];
      return this.history.filter((item) => item.includes(this.value));
    }
  },
  methods: {
    doDelete(index) {
      this.history.splice(index, 1);
    },
    doClose() {
      this.value = "";
      this.result = [];
      this.isSearch = false;
    },
    doSearch() {
      this.isSearch = true;
      this.result = [1];
    }
  }
};
if (!Array) {
  const _easycom_HomeWaterfalls2 = common_vendor.resolveComponent("HomeWaterfalls");
  _easycom_HomeWaterfalls2();
}
const _easycom_HomeWaterfalls = () => "../../components/HomeWaterfalls/HomeWaterfalls.js";
if (!Math) {
  _easycom_HomeWaterfalls();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: $data.value,
    c: common_vendor.o(($event) => $data.value = $event.detail.value),
    d: common_assets._imports_1,
    e: common_vendor.o((...args) => $options.doClose && $options.doClose(...args)),
    f: $data.value,
    g: common_vendor.o((...args) => $options.doSearch && $options.doSearch(...args)),
    h: $options.searchHistory.length !== 0 && !$data.isSearch
  }, $options.searchHistory.length !== 0 && !$data.isSearch ? {
    i: common_vendor.f($options.searchHistory, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o(($event) => $options.doDelete(index), index),
        c: index
      };
    }),
    j: common_assets._imports_2
  } : {}, {
    k: $data.result.length !== 0 && $data.isSearch
  }, $data.result.length !== 0 && $data.isSearch ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
