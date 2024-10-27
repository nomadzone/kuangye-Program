<template>
  <z-paging
      ref="paging"
      v-model="list"
      @query="loadData"
      show-refresher-when-reload
      :empty-view-img="emptyImg"
      :empty-view-img-style="{ width: '256rpx', height: '256rpx' }"
      :empty-view-error-img="emptyImg"
      empty-view-text="暂无订单"
      >
      <view class="order">
        <view v-for="(order, index) in list" :key="index" class="order-item" @click.stop="toDetail(order)">
      <view class="items">
        <view class="order-title">
          <view class="order-title_right">
            <text>{{ order?.shopCombo?.comboName }}</text>
            <image src="/static/images/arrow-right.png" mode=""></image>
          </view>
          <text class="order-title_left">{{
            order.orderStatusName
          }}</text>
        </view>
        <view class="items-line">
          <image
            class="order-image"
            :src="order.comboPhotoUrl"
            mode="aspectFill"
          ></image>
          <view class="order-info">
            <view class="order-amount">
              1 个
              <text>|</text>
              实付￥{{ order.orderAmount }}
            </view>
            <view class="order-time">下单时间：{{ order.orderDate }}</view>
          </view>
        </view>
        <view class="button" v-if="order.orderStatus == 3">
          <view class="button-line">
            <button @click.stop="doCancle(order.id)" hover-class="hover">
              取消订单
            </button>
            <button
              @click.stop="doApplyPopup(order.id)"
              class="fill"
              hover-class="hover"
            >
              立即支付
            </button>
          </view>
        </view>
        <view class="button" v-if="order.orderStatus == 2">
          <button @click="doSubmit(order)">申请退款</button>
        </view>
        <view class="button" v-if="order.orderStatus == 0 || order.orderStatus == 1 || order.orderStatus == 5">
          <button @click.stop="toDetail(order)">售后详情</button>
        </view>
      </view>
    </view>
      </view>
    
  </z-paging>
</template>

<script setup>
import http from "@/utils/http";
import emptyImg from "@/static/images/empty-my.png";
import { ref } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
const list = ref([]);
const id = ref(null);

const paging = ref(null);
 onLoad ((options) => {
  id.value = options.id;
 })

 function toDetail(item) {
		uni.navigateTo({
        	url: "/pagesUserCenter/pages/order/detail?id=" + item.id,
		});
	}
  function doSubmit(item) {
		uni.navigateTo({
          url: "/pagesUserCenter/pages/orderRefund/index?id=" + item.id,
        });
    }

    function loadData(current, size) {
        let params = {
          pageNum: current,
          pageSize: size,
        };
        http.orderList(params).then((res) => {
          paging.value.complete(res.data?.list || []);
        })
        .finally(() => {
        })
    }
    // 取消
    async function doCancle(id) {
      uni.showModal({
        title: "提示",
        content: "确定取消订单吗？",
        success: async (res) => {
          if (res.confirm) {
            let res = await http.orderCancel({ id: id });
            if (res.code === "200") {
              uni.showToast({
                title: "取消成功",
                icon: "success",
              });
              paging.value.refresh();
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

    // 购买
    async function  doApplyPopup(id) {
      let res = await http.orderPaySys({
        id: id,
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
              paging.value.refresh();
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
              this.loadData();
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

<style>
  page{
    background-color: #f5f5f5;
  }
</style>
<style lang="scss" scoped>
.order {
 
  padding: 32rpx;

  .items {
    width: 100%;
  }
  }

  .order-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 24rpx 32rpx;
    margin-bottom: 16rpx;
  }

  .order-image {
    width: 120rpx;
    height: 120rpx;
    flex: 0 0 128rpx;
    width: 128rpx;
    border-radius: 12rpx;
  }

  .order-info {
    flex: 1;
    padding-left: 16rpx;
  }

  .items-line {
    display: flex;
    padding-bottom: 32rpx;
  }

  .order-title {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_right {
      display: flex;
      align-items: center;
      flex: 1;

      text {
        width: 480rpx;
        white-space: nowrap;
        /* 强制文本在一行显示 */
        overflow: hidden;
        /* 隐藏超出容器的内容 */
        text-overflow: ellipsis;
        /* 使用省略号表示溢出的内容 */
      }

      image {
        width: 32rpx;
        height: 32rpx;
        padding-left: 8rpx;
        flex: 0 0 40rpx;
        width: 40rpx;
      }
    }

    &_left {
      width: 120rpx;
      font-size: 24rpx;
      color: #7354ff;
      text-align: right;
    }
  }

  .order-amount {
    font-size: 36rpx;
    color: #222;
    margin-bottom: 10rpx;

    text {
      color: #eee;
      padding: 0 2rpx;
    }
  }

  .order-time {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 10rpx;
  }

  .button {
    padding: 24rpx 0;
    padding-bottom: 0;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: row-reverse;

    button {
      display: inline-block;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 24rpx;
      padding: 0 24rpx;
      border-radius: 48rpx;
      background-color: transparent;
      box-shadow: 0 0 0 1px #222;
      margin: inherit;
      color: #222;

      &:after {
        box-shadow: none;
      }
    }

    .button-line {
      .fill {
        margin-left: 16rpx;
        background-color: #222;
        color: #fff;
      }
    }
  }

  .hover {
    opacity: 0.8;
  }
.total_view{
  text-align: center;
  font-size: 28rpx;
  color: #979797;
  margin-top: 32rpx;
  width: 100%;
}
</style>