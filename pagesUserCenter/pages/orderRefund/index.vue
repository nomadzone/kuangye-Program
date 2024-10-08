<template>
  <view class="page">
    <view class="card">
      <view class="title">
        <image
          :src="buyItem?.shopCombo?.comboPhotoUrl?.split(',')[0]"
          mode="aspectFill"
        ></image>
        <view>{{ buyItem?.shopComboName }}</view>
      </view>
      <view class="number">
        <view>退款数量</view>
        <view class="number-opt">
          <view @click="doMinus" class="gray">-</view>
          <text>{{ total }}</text>
          <view class="gray" @click="doAdd">+</view>
        </view>
      </view>
      <view class="price">
        <view>
          <text>退款金额</text>
          <text>¥{{ buyItem?.orderAmount }}</text>
        </view>
        <view class="price-tip"
          >1-3个工作日退款至原支付方，以实际退款金额为准</view
        >
      </view>
      <view class="reason" @click="show = true">
        <text>退款原因</text>
        <view>
          <text class="gray" v-if="!selectReason">请选择</text>
          <text v-if="selectReason">{{ selectReason.label }}</text>
          <image
            src="../../../static/images/arrow-right-s-line_gray.png"
            mode=""
          ></image>
        </view>
      </view>
      <view class="info">
        <view>退款说明</view>
        <view class="textarea">
          <textarea
            maxlength="50"
            v-model="reason"
            cols="30"
            rows="10"
          ></textarea>
          <text class="show">{{ reason.length }}/{{ max }}</text>
        </view>
      </view>
    </view>
    <PoupWrap
      :show="show"
      @close="show = false"
      title="选择退款理由"
      :rightText="''"
    >
      <Reason
        :list="reasonList"
        :index="selectIndex"
        @checked="doReason"
      ></Reason>
    </PoupWrap>
    <view class="footer" :style="{ paddingBottom: StatusBar + 32 + 'rpx' }">
      <button hover-class="hover" @click="doSumbit">申请提交</button>
    </view>
  </view>
</template>

<script>
	import PoupWrap from '@/components/Popup/Wrap.vue';
	import Reason from '@/components/Popup/Reason.vue';
	import http from "@/utils/http";
	export default {
		components: {
			PoupWrap,
			Reason
		},
		data() {
			return {
				StatusBar: 0,
				reason: '',
				max: 50,
				show: false,
				selectReason: null,
				selectIndex: 0,
				buyItem: {},
				total: 1,
				order: {
					id: 1,
					status: '1', // 1 待支付  2 可使用 3 交易成功  4 已取消  5 退款中
					number: 1,
					title: '风味至尊「双人套餐」风味至尊「双人套餐」风味至尊「双人套餐」',
					amount: '158.0',
					time: '2024-07-27 20:07',
					image: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
				},
				reasonList: [
					{ label: '理由1', value: '1' },
					{ label: '理由2', value: '2' },
					{ label: '理由3', value: '3' },
					{ label: '理由4', value: '4' },
					{ label: '理由5', value: '5' },
					{ label: '理由6', value: '6' },
					{ label: '理由7', value: '7' },
					{ label: '理由8', value: '8' },
					{ label: '理由9', value: '9' },
					{ label: '理由10', value: '10' },
					{ label: '理由11', value: '11' },
				]
			}
		},
		onLoad(options) {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
			this.getDetail(options.id)
			this.getDict()
		},
		methods: {
			getDetail(id) {
				const location = uni.getStorageSync("location");
				http.orderFindById({
					id: id,
					longitude: location.longitude,
					dimension: location.latitude,
					})
					.then((res) => {
					this.buyItem = res.data;
					});
				},
				// 获取字典数据
				getDict() {
					http.headerFindDictListByCode({code: 'refund_reason'}).then(res => {
						this.reasonList = res.data.map(item => {
							return {label: item, value: item}
						})
					})
				},
			doSumbit() {
				if (this.selectReason == null) {
					uni.showToast({
						title: '请选择退款原因',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (this.reason.length == 0) {
					uni.showToast({
						title: '请填写退款原因',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				http.orderRefund({id: this.buyItem.id, extends2: this.selectReason, extends3: this.reason }).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '申请退款成功',
							icon: 'success',
							duration: 2000
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					} else {
						uni.showToast({
							title: '申请退款失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			doReason(item, i) {
				this.selectReason = item 
				this.selectIndex = i
				this.show = false;
			},
			doMinus() {
				// this.total = this.total === 1 ? 1 : (this.total - 1)
			},
			doAdd() {
				// this.total = this.total + 1
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 32rpx;

  .gray {
    color: #a3a3a3 !important;
  }

  .card {
    padding: 32rpx;
    background-color: #fff;
    border-radius: 24rpx;
    color: #222;
    font-weight: 600;
    font-size: 28rpx;

    > view {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16rpx 0;
      min-height: 104rpx;
      box-sizing: border-box;
    }
  }

  .title {
    justify-content: flex-start;
    font-weight: 600;

    image {
      width: 96rpx;
      height: 96rpx;
      flex: 0 0 96rpx;
      border-radius: 24rpx;
      margin-right: 16rpx;
    }
  }

  .number {
    .number-opt {
      display: flex;
      gap: 20rpx;
      align-items: center;

      > view {
        display: block;
        width: 72rpx;
        height: 72rpx;
        border-radius: 12rpx;
        display: flex;
        justify-content: center;
        background-color: #f5f5f5;
        font-size: 48rpx;
      }

      > text {
        display: block;
        width: 48rpx;
        text-align: center;
      }
    }
  }

  .price {
    flex-direction: column;
    align-items: inherit;

    > view {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .price-tip {
      padding-top: 12rpx;
      font-size: 24rpx;
      color: #a3a3a3;
    }
  }

  .reason {
    image {
      width: 48rpx;
      height: 48rpx;
    }

    > view {
      display: flex;
      align-items: center;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: inherit !important;

    .textarea {
      margin-top: 16rpx;
      border-radius: 12rpx;
      border: 1px solid #ddd;
      padding: 16rpx;
      position: relative;

      textarea {
        width: 100%;
        height: 100%;
        color: #222;
        height: 140rpx;
        font-weight: 400;
      }
      &:focus-within {
        border: 1px solid #222;
      }
      .show {
        position: absolute;
        bottom: 16rpx;
        right: 16rpx;
        color: #a3a3a3;
        font-weight: 400;
        font-size: 24rpx;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 32rpx;
    box-sizing: border-box;
    width: 100vw;
    background-color: #fff;
    box-shadow: 0 0 4rpx #ccc;

    button {
      height: 88rpx;
      line-height: 88rpx;
      background-color: #222;
      color: #fff;
      border-radius: 48rpx;
      font-size: 28rpx;
      width: 100%;

      &::after {
        box-shadow: none;
      }
    }
  }
}
</style>