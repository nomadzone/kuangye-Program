<template>
  <view class="container">
    <Navbar type="1"></Navbar>
    <view class="packageDetail">
      <view class="packageDetail_top">
        <view class="top_title"> {{ detail?.comboName }} </view>
        <view class="banner-box">
          <swiper
            class="swiper"
            :autoplay="true"
            :interval="3000"
            :duration="500"
            indicator-dots
            :circular="true"
            indicator-active-color="#007aff"
          >
            <swiper-item
              class="swiper-item"
              v-for="(item, index) in buyItem?.comboPhotoUrl?.split(',')"
              :key="index"
            >
              <image :src="item" mode="aspectFill"></image>
              <view class="swiper-item-title"
                >限时{{ buyItem?.discount }}折</view
              >
            </swiper-item>
          </swiper>
        </view>

        <view class="right_price">
          <view class="price_left">
            <text class="price_num">￥{{ buyItem?.comboPrice }}</text>
            <text class="price_unit">￥{{ buyItem?.shopPrice }}</text>
          </view>
          <view class="price_right">已售10W</view>
        </view>
        <view class="xz_box">
          <view class="xz_text"> 须知</view>
          <view class="xz_content">Z周一至周日</view>
        </view>
        <view class="xz_box">
          <view class="xz_text"> 门店 </view>
          <view class="xz_content">{{ info?.name }}</view>
        </view>
        <view class="line"></view>
      </view>
      <view class="packageDetail_bottom">
        <view class="bottom_title"> 套餐详情 </view>
        <view class="bottom_content">
          <view
            class="bottom_content_item"
            v-for="(item, index) in buyItem?.comboClassifyList"
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
        <view class="bottom_title" style="margin: 30rpx 0"> 购买须知 </view>
        <view class="icon_text">
          <image class="icon" src="/static/images/tk1.png"></image> 可用日期
        </view>
        <view class="no_text"> 等真实数据 </view>
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
        <view class="no_text no_padd"
          ><text>· </text> 不能在包间消费时使用</view
        >
        <view class="no_text no_padd">· 不能和其他优惠同享</view>
        <view class="no_text no_padd">· 发票问题请询问商家</view>
        <view class="no_text no_padd">· 消费高峰期到店可能需要等位</view>
        <view class="no_text no_padd"
          >· 消费高峰期到店，可能需要等位，敬请期待</view
        >
        <view class="no_text no_padd"
          >· 本单发票由商家提供，具体请咨询商家</view
        >
        <view class="icon_text">
          <image class="icon" src="/static/images/tk5.png"></image>
          适用门店
        </view>
        <view class="popup_content_item">
          <view class="item_left">
            <image
              :src="info?.profilePhotoUrl?.split('?')[0] || ''"
              mode="aspectFill"
            ></image>
          </view>
          <view class="item_right">
            <view class="right_text">{{ info?.name }}</view>
            <view class="right_address"
              >{{ info?.distanceMeters }} | {{ info?.address }}</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="btm_btn">
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
              :src="buyItem?.comboPhotoUrl?.split('?')[0] || ''"
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
              :class="{ active: buyNumber === 1 }"
              @click="changeNumber(1)"
              >-</view
            >
            <view class="right_num">{{ buyNumber }}</view>
            <view class="right_btm" @click="changeNumber(2)">+</view>
          </view>
        </view>
        <view class="icon_text">
          <image class="icon" src="/static/images/tk1.png"></image> 可用日期
        </view>
        <view class="no_text"> 等真实数据 </view>
        <view class="icon_text">
          <image class="icon" src="/static/images/tk2.png"></image> 使用方式
        </view>
        <view class="no_text">到店消费</view>
        <view class="icon_text">
          <image class="icon" src="/static/images/tk3.png"></image>
          退款规则
        </view>
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
  </view>
</template>
<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import PoupWrap from "@/components/Popup/Wrap.vue";
import http from "@/utils/http.js";
import { ref, onMounted } from "vue";
import Decimal from "decimal.js";
const images = ref([]);
const applyPopup = ref(false);
const buyItem = ref({});
const buyNumber = ref(1);
const info = ref({});
onMounted(() => {
  let infos = uni.getStorageSync("packageDetail");
  info.value = infos;
  buyItem.value = infos.detail;
  console.log(info.value);
});

// 计算价格 防止精度丢失
function getMaxPrice(price) {
  if (!price) return "";
  return new Decimal(price).mul(new Decimal(buyNumber.value));
}

async function doApplyPopup() {
  let resPiao = await http.orderAdd({
    shopComboId: buyItem.value.id,
    number: 2,
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
    const orderId = res.data?.orderId;
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
        let resSuc = await http.orderPaySuccess({ orderId });
        if (resSuc.code !== "200") {
          uni.showToast({
            title: resSuc?.msg,
            icon: "none",
          });
        } else {
          // 跳转订单详情页面 目前还没写
        }
      },
      fail: async (err) => {
        uni.showToast({
          title: "支付失败",
          icon: "none",
        });
        let resErr = await http.orderCancellation({ orderId });
        if (resErr.code !== "200") {
          uni.showToast({
            title: resErr?.msg,
            icon: "none",
          });
          return;
        } else {
          // 跳转订单详情页面 目前还没写
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
</script>


<style lang="scss" scoped>
.container {
  padding-bottom: 240rpx;

  .packageDetail {
    width: 100%;

    .packageDetail_top {
      // 从上往下渐变色
      background: linear-gradient(to bottom, #f7f5ff, #fff);
      width: 100%;
      height: 760rpx;
      padding: 0 32rpx;
      box-sizing: border-box;

      .top_title {
        font-size: 40rpx;
        color: #333;
        line-height: 70rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      .banner-box {
        width: 100%;
        height: 460rpx;
        margin-top: 20rpx;

        .swiper {
          width: 100%;
          height: 100%;

          .swiper-item {
            width: 100%;
            height: 100%;
            position: relative;

            image {
              width: 100%;
              height: 100%;
              border-radius: 24rpx;
            }

            .swiper-item-title {
              font-size: 24rpx;
              color: #ffffff;
              padding: 4rpx 12rpx;
              background: rgba(0, 0, 0, 0.5);
              position: absolute;
              top: 28rpx;
              left: 38rpx;
            }
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
            font-size: 40rpx;
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
          color: #a3a3a3;
          font-size: 24rpx;
        }
      }

      .xz_box {
        display: flex;
        margin: 18rpx 0;
        align-items: center;

        .xz_text {
          color: #a3a3a3;
          font-size: 24rpx;
          margin-right: 32rpx;
        }

        .xz_content {
          color: #222222;
          font-size: 28rpx;
        }
      }

      .line {
        height: 1rpx;
        background: #ebebeb;
        width: 100%;
        margin-top: 32rpx;
      }
    }

    .packageDetail_bottom {
      width: 100%;
      padding: 0 32rpx;
      box-sizing: border-box;

      .bottom_title {
        color: 222222;
        font-size: 32rpx;
        font-weight: bold;
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
          align-items: center;
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
          }
        }
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

  .btm_btn_right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 88rpx;
    background: #222222;
    color: #ffffff;
    font-size: 32rpx;
    border-radius: 32rpx;
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
        background: #a0a0a0;
        color: #222222;
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
        background: #f5f5f5;
        color: #a0a0a0;
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
    text {
      font-size: 28rpx;
      color: #333333;
      margin-right: 10px;
    }
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
      border-radius: 32rpx;
      background: #7354ff;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
}
</style>