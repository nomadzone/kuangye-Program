<template>
  <view class="order_detail">
    <view
      class="order_detail_header"
      :class="buyItem?.orderStatus == 2? 'order_header_cs' :buyItem?.orderStatus == 3? 'order_header_zs':''"
    >
      <view class="order_header_content">
        <view class="order_header_title">
          {{ buyItem?.orderStatusName }} <text v-if="buyItem?.orderStatus == 3">{{ timeValue }}</text>
          </view>
        <view class="tao_item">
          <view class="tao_list">
            <view class="tao_list_left">
              <image
                :src="buyItem?.shopCombo?.comboPhotoUrl?.split(',')[0]"
                mode="aspectFill"
              ></image>
            </view>
            <view class="tao_list_right">
              <view class="right_title">{{ buyItem?.shopComboName }}</view>
              <view class="right_content">
                <view class="content_list">{{ buyItem?.orderRemark }}</view>
              </view>
              <view class="right_price">
                <view class="price_left">
                  <text class="price_num">￥{{ buyItem?.orderAmount }}</text>
                  <text class="price_unit"
                    >￥{{ buyItem?.shopCombo?.shopPrice }}</text
                  >
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="order_ercode">
          <image
            class="bg_iamge"
            src="../../static/images/detail_bg.png"
            mode="aspectFill"
          ></image>
          <view class="ercodee_detail">
            <view class="detail_code">
              {{ buyItem?.ticketCode }}
            </view>
            <view class="detail_ercode">
              <image :src="buyItem?.extends1"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="order_detail_bottom">
      <view class="bottom_title"> 套餐详情 </view>
      <view class="bottom_content">
        <view
          class="bottom_content_item"
          v-for="(item, index) in buyItem?.shopCombo?.comboClassifyList"
          :key="index"
        >
          <view class="bottom_content_item_title">
            <view class="dian">·</view> {{ item.name }}
          </view>
          <view
            class="bottom_content_item_content"
            v-for="(item2, index2) in item?.shopComboClassifyList"
            :key="index2"
          >
            <view class="list_left"> {{ item2.name }} </view>
            <view class="list_right">
              <view class="right_num">x 1份</view>
              <view class="right_price">￥{{ item2?.price }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom_title" style="margin: 30rpx 0"> 图片详情 </view>
      <block  v-for="(item, index) in buyItem?.shopCombo?.comboPhotoUrl.split(',')"
      :key="index">
        <view
        class="image_detail"
       
        v-if="showTc ? true : index < 2"
      >
        <image mode="aspectFill" :src="item"></image>
      </view>
      </block>
      
      <view
          class="other_tao"
          v-if=" buyItem?.shopCombo?.comboPhotoUrl.split(',')?.length > 2"
          :class="{ showTc: 'other_two_act' }"
          @click="showTc = !showTc"
          >{{
            showTc
              ? "收起"
              : "查看其他" + (buyItem?.shopCombo?.comboPhotoUrl.split(',')?.length - 2) + "个"
          }} <image :class="showTc? 'down_iamge' : ''" src="/static/images/down.png"></image
        ></view>
      <view class="bottom_title" style="margin: 30rpx 0"> 购买须知 </view>
      <view class="icon_text">
        <image class="icon" src="/static/images/tk1.png"></image> 可用日期
      </view>
      <view class="no_text"> {{buyItem?.shopCombo?.validTimeStart?.split(' ')[0]}}-{{ buyItem?.shopCombo?.validTimeEnd?.split(' ')[0] }} </view>
      <view class="icon_text">
        <image class="icon" src="/static/images/tk2.png"></image> 使用方式
      </view>
      <view class="no_text">到店消费</view>
      <view class="icon_text">
        <image class="icon" src="/static/images/tk3.png"></image>
        退款规则
      </view>
      <view class="no_text">随时可退过期为核销自动退</view>
      <view class="icon_text">
        <image class="icon" src="/static/images/tk4.png"></image>
        其他规则
      </view>
      <view class="no_text no_padd">· 不能在包间消费时使用</view>
      <view class="no_text no_padd">· 不能和其他优惠同享</view>
      <view class="no_text no_padd">· 发票问题请询问商家</view>
      <view class="no_text no_padd">· 消费高峰期到店可能需要等位</view>
      <view class="no_text no_padd"
        >· 消费高峰期到店，可能需要等位，敬请期待</view
      >
      <view class="no_text">· 本单发票由商家提供，具体请咨询商家</view>
      <view class="icon_text">
        <image class="icon" src="/static/images/tk5.png"></image>
        适用门店
      </view>
      <view class="popup_content_item" @click="tomendianDetail(buyItem?.shopHeader?.id)">
        <view class="item_left">
          <image
            :src="buyItem?.shopHeader?.profilePhotoUrl?.split(',')[0] || ''"
            mode="aspectFill"
          ></image>
        </view>
        <view class="item_right">
          <view class="right_text">{{ buyItem?.shopHeader?.name }}</view>
          <view class="right_address">
            <image src="../../static/images/address_black.png"></image>
            {{ buyItem?.shopHeader?.distanceMeters }}km |
            {{ filterAndRemoveBefore(buyItem?.shopHeader?.address) }}</view
          >
        </view>
      </view>
    </view>

    <view
      class="btm_btn"
      v-if="buyItem?.orderStatus == 1 || buyItem?.orderStatus == 5"
    >
      <view class="btm_btn_left" @click="toOrderDetail"> 再来一单 </view>
      <view class="btm_btn_right" @click="toTellphone"> 联系商家 </view>
    </view>
    <view class="btm_btn" v-if="buyItem?.orderStatus == 0">
      <view class="btm_btn_left" @click="toOrderDetail"> 再来一单 </view>
      <view class="btm_btn_right" @click="toTellphone"> 联系商家 </view>
    </view>
    <view class="btm_btn" v-if="buyItem?.orderStatus == 2">
      <view class="btm_btn_left" @click="cancelOrderTk"> 退款 </view>
      <view class="btm_btn_right" @click="toTellphone"> 联系商家 </view>
    </view>
    <view class="btm_btn" v-if="buyItem?.orderStatus == 4">
      <view class="btm_btn_left" @click="todapplyPopupPl"> 取消退款 </view>
      <view class="btm_btn_right" @click="toTellphone"> 联系商家 </view>
    </view>
    <view class="btm_btn" v-if="buyItem?.orderStatus == 3">
      <view class="btm_btn_left" @click="cancelOrder"> 取消订单 </view>
      <view class="btm_btn_right" @click="toTellphone"> 联系商家 </view>
    </view>
  </view>
</template>
<script setup>
import { ref } from "vue";
import http from "@/utils/http";
import { onLoad, onHide } from "@dcloudio/uni-app";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import {filterAndRemoveBefore} from "@/utils/index.js";


const buyItem = ref({});
const id = ref("");
const timeValue = ref("");
const showTc = ref(false);
onLoad((options) => {
  id.value = options.id;
  getDetail();
});
onHide(() => {
  if(timer.value){
    clearInterval(timer.value)
  }
})

// 刷新
onPullDownRefresh(() => {
  getDetail();
  uni.stopPullDownRefresh();
})
function toTellphone() {
  uni.makePhoneCall({
    phoneNumber: buyItem.value.shopHeader.phone,
  });
}
let timer= ref(null)
function showOrderTime(time) {
  // 30分钟 距离 time 差了多少秒

  if(timer.value.indexOf("00:00")>-1){
    if(timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
    timeValue.value = "已过期"
    getDetail()
    return
  }
  if (time) {
  timer.value = setInterval(() => {
    const now = new Date(time.replace(/-/g, "/")).getTime();
    console.log(now)
  // 拿到30分钟后的时间
  const diff = 30 * 60 * 1000;
  const future = now + diff;
  // 计算差了多少分钟
  const diff2 = (future - new Date().getTime()) / 1000 / 60;

  const minute = Math.floor(diff2) >= 10? Math.floor(diff2) : "0" + Math.floor(diff2);
  const second = Math.floor((diff2 - minute) * 60) >= 10? Math.floor((diff2 - minute) * 60) : "0" + Math.floor((diff2 - minute) * 60);
  const str = `${minute}:${second}`;
  if(str.indexOf("00:00")>-1){
    clearInterval(timer.value)
    timeValue.value = "已过期"
    getDetail()
    return
  }
  timeValue.value = str;
  }, 1000)
}
}
function tomendianDetail(id) {
  uni.navigateTo({ 
			url: `/pages/explore/detail?id=${id}`
			})
}

function getDetail() {
  const location = uni.getStorageSync("location");
  http
    .orderFindById({
      id: id.value,
      longitude: location.longitude,
      dimension: location.latitude,
    })
    .then((res) => {
      buyItem.value = res.data;
      if (res.data.orderStatus == 3) {
        showOrderTime(res.data.createTime);
      }
      // 修改 navBar 颜色
      if (res.data.orderStatus == 2) {
        uni.setNavigationBarColor({
          backgroundColor: "#f7f5ff",
          frontColor: "#000000",
        });
      } else if (res.data.orderStatus == 3) {
        uni.setNavigationBarColor({
          backgroundColor: "#F9CD85",
          frontColor: "#000000",
        });
      } else {
        uni.setNavigationBarColor({
          backgroundColor: "#DDDDDD",
          frontColor: "#000000",
        });
      }
    });
}
// 跳转套餐详情
function toOrderDetail() {
  uni.navigateTo({
    url: `/pages/explore/packageDetail?id=${buyItem.value.shopCombo.id}`,
  });
}
// 弹窗申请退款
function cancelOrder() {
  uni.showModal({
    title: "提示",
    content: "确定取消订单吗？",
    success: async (res) => {
      if (res.confirm) {
        let res = await http.orderCancel({ id: id.value });
        if (res.code === "200") {
          uni.showToast({
            title: "取消成功",
            icon: "success",
          });
          this.loadData();
        } else {
          uni.showToast({
            title: res.msg || "取消失败",
            icon: "none",
          });
        }
      } else if (res.cancel) {
        return;
      }
    },
  });
}
function cancelOrderTk() {
  uni.navigateTo({
          url: "/pagesUserCenter/pages/orderRefund/index?id=" + id.value,
        });
}
</script>
<style lang="scss" scoped>
.order_detail {
  width: 100%;
  padding-bottom: 240rpx;
  .order_detail_header {
    width: 100%;
    height: 808rpx;
    background: #dddddd;
    padding: 0 32rpx;
    box-sizing: border-box;
    .order_header_content {
      width: 100%;
      .order_header_title {
        width: 100%;
        height: 56rpx;
        font-size: 40rpx;
        font-weight: bold;
      }
      .tao_item {
        width: 100%;
        margin-top: 32rpx;

        .tao_list {
          background: #ffffff;
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

            image {
              width: 160rpx;
              height: 160rpx;
              border-radius: 16rpx;
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
      }
      .order_ercode {
        width: 100%;
        height: 446rpx;
        position: relative;
        .bg_iamge {
          width: 100%;
          height: 100%;
        }
        .ercodee_detail {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          .detail_code {
            width: 100%;
            height: 94rpx;
            display: flex;
            align-items: center;
            padding: 0 40rpx;
            box-sizing: border-box;
            color: #7354ff;
            font-size: 32rpx;
            font-weight: bold;
          }
          .detail_ercode {
            width: 100%;
            height: 348rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            image {
              height: 316rpx;
              width: 316rpx;
            }
          }
        }
      }
    }
  }
  .order_header_cs {
    background: #f7f5ff;
  }
  .order_header_zs {
    background: #f9cd85;
  }
  .order_detail_bottom {
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    background: #ffffff;
    .bottom_title {
      color: 222222;
      font-size: 32rpx;
      font-weight: bold;
    }
    .image_detail {
      width: 100%;
      height: 460rpx;
      margin-top: 32rpx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
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
    .bottom_content {
      width: 100%;

      .bottom_content_item {
        width: 100%;
        margin-top: 32rpx;

        .bottom_content_item_title {
          display: flex;
          align-items: center;
          color: #222222;
          font-size: 28rpx;
          font-weight: 600;

          .dian {
            width: 40rpx;
            height: 40rpx;
            color: #222222;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .bottom_content_item_content {
          padding-left: 40rpx;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          height: 40rpx;
          align-items: center;

          .list_left {
            font-size: 28rpx;
            color: #222222;
          }

          .list_right {
            width: 150rpx;
            max-width: 200rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .right_num {
              color: #a3a3a3;
              font-size: 28rpx;
            }

            .right_price {
              color: #222222;
              font-size: 28rpx;
            }
          }
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
      text {
        font-size: 28rpx;
        color: #333333;
        margin-right: 10px;
      }
    }
    .no_padd {
      margin-bottom: 5rpx;
    }
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
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        color: #646464;
        font-size: 28rpx;
        .right_text {
          display: flex;
          align-items: center;
          image {
            width: 32rpx;
            height: 32rpx;
          }
        }
        .right_address {
          display: flex;
          align-items: center;
          color: #646464;
          font-size: 18rpx;
          image {
            width: 32rpx;
            height: 32rpx;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .btm_btn {
    width: 100%;
    height: 180rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 32rpx;
    box-sizing: border-box;
    .btm_btn_left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 330rpx;
      height: 88rpx;
      background: #ffffff;
      border: 2rpx solid #222222;
      color: #222222;
      box-sizing: border-box;
      font-size: 32rpx;
      border-radius: 70rpx;
    }
    .btm_btn_right {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 330rpx;
      height: 88rpx;
      background: #222222;
      color: #ffffff;
      font-size: 32rpx;
      border-radius: 70rpx;
    }
  }
}
</style>