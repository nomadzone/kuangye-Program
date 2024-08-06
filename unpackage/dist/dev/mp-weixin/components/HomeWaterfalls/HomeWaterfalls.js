"use strict";
const common_vendor = require("../../common/vendor.js");
const HomeActive = () => "../HomeActive/HomeActive.js";
const FallItem = () => "./Fall-item.js";
const _sfc_main = {
  components: {
    HomeActive,
    FallItem
  },
  props: {
    isAd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      left: [],
      right: []
    };
  },
  created() {
    let list = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        type: this.getRandomNumber() + "",
        // 1 一起野 2新鲜事 3找搭子
        image: "https://q0.itc.cn/q_70/images03/20240607/189efb6201494886a7bbb27331c40722.jpeg",
        active: "报名中",
        like: 239,
        title: "大雁塔飞盘挑战赛",
        creater: "发起人昵称发起人昵称发起人昵称发起人昵称发起人昵称",
        createrAvator: "https://img1.baidu.com/it/u=2743623408,2506891806&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        gap: "4.2KM",
        time: "周三07.03",
        remain: "剩2位",
        remainAvators: [
          "https://img2.woyaogexing.com/2021/01/12/4bc799d86d5f41dea9f5a7e6fa9d602f%21400x400.jpeg",
          "https://img1.baidu.com/it/u=2743623408,2506891806&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          "https://img0.baidu.com/it/u=2186445683,1619498475&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
          "https://pic3.zhimg.com/v2-8df8a104ee420d9a22659222197f6ee5_r.jpg?source=1940ef5c",
          "https://p4.itc.cn/q_70/images03/20210426/a8285114423945e5b380417a6fa554cb.jpeg"
        ],
        price: i % 3 == 1 ? 29 : ""
      });
    }
    this.list = list;
    let right = [];
    let left = [];
    for (let i = 0; i < list.length; i++) {
      if (i % 2 == 1) {
        right.push(list[i]);
      } else {
        left.push(list[i]);
      }
    }
    this.right = right;
    this.left = left;
  },
  methods: {
    getRandomNumber() {
      const numbers = [1, 2, 3];
      const randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex];
    },
    doButton(item, index) {
      console.log(item, index);
    },
    doItem(item, index) {
      console.log(item, index);
    }
  }
};
if (!Array) {
  const _easycom_HomeActive2 = common_vendor.resolveComponent("HomeActive");
  const _component_FallItem = common_vendor.resolveComponent("FallItem");
  (_easycom_HomeActive2 + _component_FallItem)();
}
const _easycom_HomeActive = () => "../HomeActive/HomeActive.js";
if (!Math) {
  _easycom_HomeActive();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isAd
  }, $props.isAd ? {} : {}, {
    b: $props.isAd
  }, $props.isAd ? {} : {}, {
    c: common_vendor.o($options.doButton),
    d: common_vendor.o($options.doItem),
    e: common_vendor.p({
      list: $data.right
    }),
    f: common_vendor.p({
      list: $data.right
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a72748e5"]]);
wx.createComponent(Component);
