
// 一起野
const yiqiyuan = {
    100: "发布中",
    101: "报名中",
    102: "活动中",
    103: "已满员",
    104: "已结束",
    105: "已下架",
    106: "已删除",
    107: "未通过"
}
const yiqiyuanStatus = {
    1: "待支付",
    2: "待活动",
    3: "活动中",  // 活动中 用户不能报名
    4: "已取消",
    5: "已结束"
}

//   新鲜事
const xinshenshi = {
    200: "发布中",
    201: "已发布",
    202: "已删除",
    203: "未通过"
}

//   找搭子
const zhaotazi = {
    300: "发布中",
    301: "已发布",
    302: "已删除",
    303: "未通过"
}

// type 1 就是 一起野  2 新鲜事 3 找搭子
const type = {
    1: "一起野",
    2: "新鲜事",
    3: "找搭子"
}

//   新鲜事
export default {
    yiqiyuan,
    yiqiyuanStatus,
    xinshenshi,
    zhaotazi
}