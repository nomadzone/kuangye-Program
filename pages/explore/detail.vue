<template>
  <view class="container">
    <Navbar type="1" :title="info?.name"></Navbar>
    <view class="show-image">
      <view class="image_container">
        <swiper
					class="swiper"
					:duration="500"
					indicator-dots
					:circular="true"
					indicator-active-color="#ffffff"
				>
					<swiper-item class="swiper_slider" v-for="(list, index) in info.profilePhotoUrl?.split(',')" :key="index">
						<image :src="list" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
      </view>
      <view class="shop-info">
        <view class="shop-info-content">
          <view class="left">
            <image src="/static/images/clock.png"></image> 营业时间:
            {{ getJsonData(info?.businessHoursStart) || "-" }}
          </view>
          <view class="right">
            <view class="right_btn">{{
              info?.shopStatus == 0 ? "营业中" : "休息中"
            }}</view>
          </view>
        </view>
        <view class="shop-info-content">
          <view class="left">
            <image src="/static/images/mon.png"></image>
            {{ info?.perCapita }}/人 {{ info?.categoryName }}
            <image src="/static/images/xing.png"></image>
            <view class="xing_text">{{ info?.score }}分</view>
          </view>
        </view>
        <view class="shop-info-content">
          <view class="left">
            <image src="/static/images/address_icon.png"></image>
            {{ info?.distanceMeters }}Km {{ info?.address }}
          </view>
          <view class="right" @click="toMap">
            <image src="/static/images/ts_icon.png"></image>
          </view>
        </view>
      </view>
    </view>

    <view class="details">
      <text class="package-title">优惠套餐</text>
      <view class="tao_item">
        <block v-for="(item, index) in info?.shopComboList || []" :key="index">
          <view class="tao_list" v-if="showTc ? true : index < 2"  @click.stop="indetail(item)">
            <view class="tao_list_left">
              <image :src="item?.comboPhotoUrl?.split(',')[0]" mode="aspectFill"></image>
              <view v-if="item?.discount" class="swiper-item-title"
                >限时{{ item?.discount }}折</view>
            </view>
            <view class="tao_list_right">
              <view class="right_title"
                >{{ item?.comboName }}</view
              >
              <view class="right_content">
                <view class="content_list">{{getMemo(item)}}</view>
              </view>
              <view class="right_price">
                <view class="price_left">
                  <text class="price_num">￥{{ item?.comboPrice }}</text>
                  <text class="price_unit">￥{{ item?.shopPrice }}</text>
                </view>
                <view class="price_right" @click.stop="showPopup(item)">抢购</view>
              </view>
            </view>
          </view>
        </block>
        <view
          class="other_tao"
          v-if="info?.shopComboList?.length > 2"
          :class="{ showTc: 'other_two_act' }"
          @click="showTc = !showTc"
          >{{
            showTc
              ? "收起"
              : "查看其他" + (info?.shopComboList?.length - 2) + "个"
          }}套餐 <image :class="showTc? 'down_iamge' : ''" src="/static/images/down.png"></image
        ></view>
      </view>

      <view class="intro">
        <view class="intro-title">店铺介绍</view>
        <view class="intro-content">
          <rich-text :nodes="info?.shopRemark"></rich-text>
        </view>
      </view>
      <view class="comments">
        <view class="comments_title"
          >评价 <image class="xing" src="/static/images/xing.png"></image>
          <view class="xing_text">{{ info?.score }}分</view></view
        >
      <PlList :commentList="info?.shopCommentList" @replyComment="replyComment"></plList>

      </view>
      
    </view>

    <view class="btm_btn">
      <view class="btm_btn_left">
        <image v-if="info?.isCollect == 1" src="/static/images/Button_dp.png"  @click="collect"></image>
        <image v-else src="/static/images/Button_dp_two.png" @click="collect"></image>
      </view>
      <view class="btm_btn_right" @click="todapplyPopupPl"> 我要评价 </view>
    </view>
    <PoupWrap
      :show="applyPopup"
      @close="applyPopup = false"
      :rightText="''"
      title="确认订单"
      @save="doApplyPopup"
    >
      <view class="popup_content">
        <view class="popup_content_item">
          <view class="item_left">
            <image
              :src="buyItem?.comboPhotoUrl?.split(',')[0] || ''"
              mode="aspectFill"
            ></image>
          </view>
          <view class="item_right">{{ buyItem?.comboName }}</view>
        </view>
        <view class="popup_number">
          <view class="number_left">购买数量</view>
          <view class="number_right">
            <view
              class="right_btn"
              @click="changeNumber(1)"
              >-</view>
            <view class="right_num">{{ buyNumber }}</view>
            <view class="right_btm" @click="changeNumber(2)">+</view>
          </view>
        </view>
        <view class="icon_text">
          <image class="icon" src="/static/images/tk1.png"></image> 可用日期
        </view>
        <view class="no_text"> {{buyItem?.validTimeStart}}-{{ buyItem?.validTimeEnd }} </view>
        <view class="icon_text">
          <image class="icon" src="/static/images/tk2.png"></image> 使用方式
        </view>
        <view class="no_text">到店消费</view>
        <view class="icon_text"
          ><image class="icon" src="/static/images/tk3.png"></image>
          退款规则</view
        >
        <view class="no_text">随时可退过期为核销自动退</view>
        <view class="buy_btn">
          <view class="buy_btn_left">
            <view class="left_text">实付</view>
            <view class="right_text"
              ><text>￥</text> {{ getMaxPrice(buyItem?.comboPrice) }}</view
            >
          </view>
          <view class="buy_btn_right" @click="doApplyPopup">购买</view>
        </view>
      </view>
    </PoupWrap>
    <PoupWrap
      :show="applyPopupPl"
      @close="applyPopupPl = false"
      :rightText="'确定'"
      title="评论"
      @save="dopjPopup"
    >
      <view class="pl_content">
        <view class="pl_title">评价一下</view>
        <view class="pl_rate">
          <uni-rate v-model="ratevalue"></uni-rate>
        </view>
        <view class="pl_title">详细说明</view>
        <view class="pl_textarea">
          <textarea
            v-model="plvalue"
            placeholder="请详细描述一下您的评价"
            maxlength="50"
          ></textarea>
          <text class="pl_num">{{ plvalue?.length }}/50</text>
        </view>
      </view>
    </PoupWrap>
  </view>
</template>
<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import { onReachBottom, onPageScroll, onLoad } from "@dcloudio/uni-app";
import PoupWrap from "@/components/Popup/Wrap.vue";
import Decimal from "decimal.js";
import http from "@/utils/http.js";
import PlList from "@/components/PlList/plList.vue";
import { ref } from "vue";
const applyPopup = ref(false);
const info = ref({});
const buyItem = ref({});
const showTc = ref(false);
const applyPopupPl = ref(false);
const ratevalue = ref(0);
const plvalue = ref("");
const buyNumber = ref(1);
const id = ref("");

const pjForm = ref({
  shopId: '',
  level: '',
  content: '',
  rate: '',
})

onLoad((options) => {
  id.value = options.id;
  getDetail();
});
function getMemo(item) {
  if(item.allDayStatus && item.legalHolidayStatus) {
    return "全部日期可用，包含法定节假日";
  } else if(item.allDayStatus && !item.legalHolidayStatus) {
    return "不包含法定节假日"
  }
  // monday  tuesday  wednesday  thursday  friday  saturday  sunday
  getAvailability(item.monday, item.tuesday, item.wednesday, item.thursday, item.friday, item.saturday, item.sunday)
}
function getAvailability(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
    // 将每一天的可用性放入一个数组中
    const days = [
        { name: '周一', available: monday },
        { name: '周二', available: tuesday },
        { name: '周三', available: wednesday },
        { name: '周四', available: thursday },
        { name: '周五', available: friday },
        { name: '周六', available: saturday },
        { name: '周日', available: sunday },
    ];

    // 筛选出可用的日子
    const availableDays = days.filter(day => day.available).map(day => day.name);

    // 返回结果
    if (availableDays.length === 7) {
        return '周一至周日';
    }
    if (availableDays.length > 0) {
        return `${availableDays.join('')}可用`; // 使用模板字符串
    }
    return '无可用时间'; // 如果没有任何可用的日子
}
function replyComment(item) {
  applyPopupPl.value = true;
  plvalue.value = "";
  let userInfo = uni.getStorageSync("userInfo");
  pjForm.value = {
    shopId: info.value.id,
    level: 2,
    content: plvalue.value,
    score: ratevalue.value,
    replyId: item.userId,
    pid: item.id,
    replyNickName: item.nickName,
    image: item.image,
    nickName: userInfo.nickName,
  }
}
function showPopup(item) {
  applyPopup.value = true;
  buyItem.value = item;
  buyNumber.value = 1;
}
function toMap() {
  uni.openLocation({
    latitude: info.value.dimension*1,
    longitude: info.value.longitude*1,
    name: info.value.name,
    address: info.value.address,
  });
}
// 选择数量
function changeNumber(type) {
  return
  if (type === 1) {
    if (buyNumber.value === 1) {
      return;
    }
    buyNumber.value = buyNumber.value - 1;
  } else {
    buyNumber.value = buyNumber.value + 1;
  }
}
// 计算价格 防止精度丢失
function getMaxPrice(price) {
  if (!price) return "";
  return new Decimal(price).mul(new Decimal(buyNumber.value));
}
// 购买
async function doApplyPopup() {
  let resPiao = await http.orderAdd({
    shopComboId: buyItem.value.id,
    number: 1,
  });
  if (resPiao.code !== "200") {
    uni.showToast({
      title: resPiao?.msg,
      icon: "none",
    });
    return;
  }
  const piaoId = resPiao?.data;
  if (!piaoId) {
    uni.showToast({
      title: "订单id生成失败",
      icon: "none",
    });
    return;
  }
  let res = await http.orderPaySys({
    id: piaoId[0],
  });
  if (res.code === "200" && res.data) {
    const payParams = res.data?.jsapi;
    const settlementId = res.data?.settlementId;
    const userConsumptionId = res.data?.userConsumptionId;
    const id = res.data.id
    uni.requestPayment({
      provider: "wxpay",
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.packageVal,
      signType: payParams.signType,
      paySign: payParams.paySign,
      success: async () => {
        uni.showToast({
          title: "支付成功",
          icon: "success",
        });
        let resSuc = await http.orderPaySuccess({ id:id });
        if (resSuc.code !== "200") {
          uni.showToast({
            title: resSuc?.msg,
            icon: "none",
          });
        } else {
          // 跳转订单详情页面 目前还没写
          applyPopup.value = false;
          // 跳转订单详情页面 目前还没写
          uni.navigateTo({
        	  url: "/pagesUserCenter/pages/order/detail?id=" + id,
		      });
        }
      },
      fail: async (err) => {
        uni.showToast({
          title: "支付失败",
          icon: "none",
        });
        let resErr = await http.orderCancellation({ settlementId: settlementId, userConsumptionId: userConsumptionId });
        if (resErr.code !== "200") {
          uni.showToast({
            title: resErr?.msg,
            icon: "none",
          });
          return;
        } else {
          // 跳转订单详情页面 目前还没写
          applyPopup.value = false;
          // 跳转订单详情页面 目前还没写
          uni.navigateTo({
        	  url: "/pagesUserCenter/pages/order/detail?id=" + id,
		      });
        }
      },
    });
  } else {
    uni.showToast({
      title: res.msg || "支付失败",
      icon: "none",
    });
  }
}
function indetail(item) {
  uni.setStorageSync("packageDetail", {...info.value, detail: item});
  uni.navigateTo({
    url: "/pages/explore/packageDetail",
    })
}
// getDetail
function getDetail() {
  const location = uni.getStorageSync("location");
  http
    .headerFindByld({
      id: id.value,
      longitude: location.longitude,
      	dimension: location.latitude,
    })
    .then((res) => {
      info.value = res.data;
    });
}
function getJsonData(datas) {
  try {
    if(!datas) return "";
    let data = JSON.parse(datas);
    return data[0].start + "-" + data[0].end;
  } catch (e) {
    console.log(e);
  }
}
// 收藏
function collect() {
  if(info.value.isCollect == 1){
    http.collectUp({shopId: info.value.id}).then((res) => {
      if (res.code === "200") {
        info.value.isCollect = 0;
        uni.showToast({
          title: "收藏成功",
          icon: "success",
        });
      } else {
        uni.showToast({
          title: res.msg,
          icon: "none",
        });
      }
    });
    }else{
    http.collectDown({shopId: info.value.id}).then((res) => {
      if (res.code === "200") {
        info.value.isCollect = 1;
        uni.showToast({
          title: "取消收藏成功",
          icon: "success",
        });
      } else {
        uni.showToast({
          title: res.msg,
          icon: "none",
        });
      }
    });
    }
}
onReachBottom(() => {
  console.log("下拉加载");
});
// 评价
function dopjPopup() {
  if (ratevalue.value === 0) {
    uni.showToast({
      title: "请选择评分",
      icon: "none",
    });
    return;
  }
  if (plvalue.value.length === 0) {
    uni.showToast({
      title: "请填写评价内容",
      icon: "none",
    });
    return;
  }
  pjForm.value.content = plvalue.value;
  pjForm.value.rate = ratevalue.value;
 http.commentAdd(pjForm.value).then((res) => {
    if (res.code === "200") {
      uni.showToast({
        title: "评价成功",
        icon: "success",
      });
      applyPopupPl.value = false;
      getDetail();
    } else {
      uni.showToast({
        title: res.msg,
        icon: "none",
      });
    }
  });
}
function todapplyPopupPl() {
  applyPopupPl.value = true;
  ratevalue.value = 0;
  plvalue.value = "";
  pjForm.value = {
    shopId: info.value.id,
    level: 1,
    content: plvalue.value,
    score: ratevalue.value,
  }
}

</script>
<style>
page {
  background: #ffffff;
}
</style>

<style lang="scss" scoped>
.container {
  padding-bottom: 240rpx;
  .show-image {
    width: 100%;
    height: 732rpx;
    background: #1b1b1b;
    .image_container {
      width: 100%;
      height: 452rpx;
      background: #000000;
      .swiper{
        width: 100%;
        height: 100%;
        .swiper_slider {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .shop-info {
      width: 686rpx;
      height: 248rpx;
      margin-top: -20rpx;
      margin: 0 auto;
      background: #0f0f0f;
      box-sizing: border-box;
      padding: 16rpx 32rpx;
    }
    .shop-info-content {
      width: 100%;
      height: 72rpx;
      box-sizing: border-box;
      border-bottom: 1rpx solid #ffffff25;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        color: #ffffff;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        width: 100%;
        image {
          width: 32rpx;
          height: 32rpx;
          margin-right: 8rpx;
          flex-shrink: 0;
        }
        .xing_text {
          color: #ffb13d;
          font-size: 24rpx;
        }
      }
      .right {
        flex-shrink: 0;
        .right_btn {
          width: 90rpx;
          height: 36rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 18rpx;
          background: #7024ff;
          color: #ffffff;
          font-size: 24rpx;
        }
        image {
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
  }
}
.shop-info {
  margin-top: 68rpx;
}
.shop-name {
  font-size: 32rpx;
  font-weight: bold;
}
.open-time {
  font-size: 26rpx;
  color: #888;
}
.details {
  width: 100%;
  background: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 32rpx;
  box-sizing: border-box;
  .package-title {
    font-size: 32rpx;
    font-weight: bold;
    line-height: 44rpx;
  }
  .tao_item {
    width: 100%;
    margin-top: 32rpx;
    .tao_list {
      background: #ebe7fd;
      width: 100%;
      height: 192rpx;
      border-radius: 16rpx;
      padding: 16rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;
      .tao_list_left {
        width: 160rpx;
        height: 160rpx;
        border-radius: 16rpx;
        margin-right: 22rpx;
        position: relative;
        image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 16rpx;
        }
        .swiper-item-title {
            font-size: 24rpx;
            color: #ffffff;
            padding: 4rpx 12rpx;
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
            top: 7rpx;
            left: 7rpx;
            border-radius: 30rpx;
          }
      }
      .tao_list_right {
        width: calc(100% - 160rpx - 22rpx);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-shrink: 0;
        .right_title {
          color: #000000;
          font-size: 28rpx;
          font-weight: bold;
        }
        .right_content {
          display: flex;
          font-size: 24rpx;
          color: #000000;
          .content_list {
            border-right: 1px solid #cfcfcf;
            padding-right: 16rpx;
            &:last-child {
              border-right: none;
            }
          }
        }
        .right_price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price_left {
            display: flex;
            align-content: center;
            .price_num {
              color: #7354ff;
              font-size: 32rpx;
              font-weight: bold;
            }
            .price_unit {
              color: #a3a3a3;
              font-size: 24rpx;
              margin-left: 8rpx;
              text-decoration: line-through; // 删除线
              display: flex;
              align-items: center;
            }
          }
          .price_right {
            width: 104rpx;
            height: 52rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30rpx;
            color: #ffffff;
            font-size: 24rpx;
            background: #7354ff;
          }
        }
      }
    }
    .other_tao {
      width: 100%;
      height: 104rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #004f99;
      font-size: 24rpx;
      image {
        width: 28rpx;
        height: 28rpx;
        margin-left: 16rpx;
      }
      .down_iamge{
        // 旋转180度
        transform: rotate(180deg);
      }
    }
    .other_two_act {
      image {
        // 旋转180度
        transform: rotate(180deg);
      }
    }
  }
  .intro {
    width: 100%;
    margin-top: 32rpx;
    .intro-title {
      font-size: 32rpx;
      font-weight: bold;
      line-height: 44rpx;
      color: #222222;
      margin-bottom: 32rpx;
      word-break: break-all;
    }
    .intro-content {
      color: #222222;
      font-size: 24rpx;
    }
  }
  .comments {
    width: 100%;
    margin-top: 64rpx;
    .comments_title {
      font-size: 32rpx;
      font-weight: bold;
      line-height: 44rpx;
      color: #222222;
      margin-bottom: 32rpx;
      word-break: break-all;
      display: flex;
      align-items: center;
      .xing {
        width: 24rpx;
        height: 24rpx;
        margin-left: 16rpx;
      }
      .xing_text {
        color: #ffb13d;
        font-size: 24rpx;
      }
    }
  }
}
.btm_btn {
  width: 100%;
  height: 180rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 32rpx;
  box-sizing: border-box;
  .btm_btn_left {
    width: 88rpx;
    height: 88rpx;
    image {
      width: 88rpx;
      height: 88rpx;
    }
  }
  .btm_btn_right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 574rpx;
    height: 88rpx;
    background: #222222;
    color: #ffffff;
    font-size: 32rpx;
    border-radius: 70rpx;
  }
}
.popup_content {
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  .popup_content_item {
    background: #ebe7fd;
    width: 100%;
    height: 192rpx;
    border-radius: 16rpx;
    padding: 16rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
    margin-top: 32rpx;
    .item_left {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx;
      margin-right: 22rpx;
      image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 16rpx;
      }
    }
    .item_right {
      width: calc(100% - 160rpx - 22rpx);
      height: 100%;
      // 三行溢出隐藏
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
      color: #000000;
      font-size: 32rpx;
      word-break: break-all;
    }
  }
  .popup_number {
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .number_left {
      font-size: 24rpx;
      color: #222222;
    }
    .number_right {
      display: flex;
      align-items: center;
      .right_btn {
        width: 72rpx;
        height: 72rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20rpx;
        background: #F5F5F5;
        color: #A3A3A3;
        font-size: 24rpx;
        margin-right: 32rpx;
      }
      .active {
        background: #a0a0a0;
      }
      .right_num {
        font-size: 24rpx;
      }
      .right_btm {
        width: 72rpx;
        height: 72rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20rpx;
        background: #F5F5F5;
        color: #A3A3A3;
        font-size: 24rpx;
        margin-left: 32rpx;
      }
    }
  }
  .icon_text {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #000000;
    height: 40rpx;
    font-weight: 600;
    .icon {
      width: 32rpx;
      height: 32rpx;
      margin-right: 16rpx;
    }
  }
  .no_text {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #000000;
    height: 40rpx;
    padding: 0 48rpx;
    box-sizing: border-box;
    margin-bottom: 32rpx;
  }
  .buy_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 152rpx;
    .buy_btn_left {
      display: flex;
      align-content: flex-end;
      .left_text {
        font-size: 24rpx;
        color: #646464;
        display: flex;
        align-items: flex-end;
      }
      .right_text {
        font-size: 32rpx;
        color: #222222;
        font-weight: bold;
        display: flex;
        align-content: flex-end;
        text {
          font-size: 24rpx;
          display: flex;
          align-items: flex-end;
        }
      }
    }
    .buy_btn_right {
      width: 444rpx;
      height: 88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 70rpx;
      background: #7354ff;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
.pl_content {
  width: 100%;
  padding: 32rpx 0;
  .pl_title {
    color: #222222;
    font-size: 24rpx;
    font-weight: bold;
    margin-bottom: 24rpx;
  }
  .pl_rate {
    margin-bottom: 32rpx;
  }
  .pl_textarea {
    width: 100%;
    height: 240rpx;
    border-radius: 10rpx;
    border: 1rpx solid #cfcfcf;
    padding: 16rpx;
    box-sizing: border-box;
    position: relative;
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 24rpx;
      color: #222222;
      resize: none;
    }
    .pl_num {
      position: absolute;
      bottom: 16rpx;
      right: 16rpx;
      font-size: 24rpx;
      color: #868686;
    }
  }
}
</style>