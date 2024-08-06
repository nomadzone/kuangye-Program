"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomTabbar = () => "../../components/Tabbar/Tabbar.js";
const HomeNavbar = () => "../../components/Navbar/Navbar.js";
const HomeSort = () => "../../components/HomeSort/HomeSort.js";
const HomeCate = () => "../../components/HomeCate/HomeCate.js";
const HomeWaterfalls = () => "../../components/HomeWaterfalls/HomeWaterfalls.js";
const _sfc_main = {
  components: {
    CustomTabbar,
    HomeNavbar,
    HomeSort,
    HomeCate,
    HomeWaterfalls
  },
  data() {
    return {
      statusBarHeight: 0,
      sortIndex: 0,
      schooolTitle: "西安交通大学博学楼"
    };
  },
  created() {
    this.statusBarHeight = common_vendor.index.getStorageSync("statusBarHeight");
  },
  methods: {
    doAction() {
    },
    doSort(index) {
      this.sortIndex = index;
    }
  }
};
if (!Array) {
  const _component_HomeNavbar = common_vendor.resolveComponent("HomeNavbar");
  const _easycom_Map2 = common_vendor.resolveComponent("Map");
  const _easycom_HomeSort2 = common_vendor.resolveComponent("HomeSort");
  const _easycom_HomeCate2 = common_vendor.resolveComponent("HomeCate");
  const _easycom_HomeWaterfalls2 = common_vendor.resolveComponent("HomeWaterfalls");
  const _component_CustomTabbar = common_vendor.resolveComponent("CustomTabbar");
  (_component_HomeNavbar + _easycom_Map2 + _easycom_HomeSort2 + _easycom_HomeCate2 + _easycom_HomeWaterfalls2 + _component_CustomTabbar)();
}
const _easycom_Map = () => "../../components/Map/Map.js";
const _easycom_HomeSort = () => "../../components/HomeSort/HomeSort.js";
const _easycom_HomeCate = () => "../../components/HomeCate/HomeCate.js";
const _easycom_HomeWaterfalls = () => "../../components/HomeWaterfalls/HomeWaterfalls.js";
if (!Math) {
  (_easycom_Map + _easycom_HomeSort + _easycom_HomeCate + _easycom_HomeWaterfalls)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.doAction),
    b: common_vendor.p({
      title: $data.schooolTitle
    }),
    c: common_vendor.p({
      isAd: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
