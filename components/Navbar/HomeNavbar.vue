<template>
  <view class="navbar" :style="{ top: StatusBar + 'px'}">
    <view class="left" @tap="handleGoUserCenter" v-if="userInfo.avatarUrl">
      <image :src="userInfo.avatarUrl" v-if="userInfo.avatarUrl" mode="aspectFill"  class="icon-left" />
      <image v-else src="/static/images/title-logo.svg" class="icon-logo" style="height: 80rpx;width: 80rpx;" />
    </view>
	<view class='right'>
		<view class="top" @tap="handleGoUserCenter">
			<!-- <image src="/static/images/title-logo.png" class="icon-logo" /> -->
		  <text class="title" style="font-size: 28rpx;">{{ userInfo.nickname }}</text>
		</view>
		<view class="bottom" @click="handleRightAction" v-if="userInfo.address">
		  <text class="title" style="font-size: 24rpx;">{{ userInfo.address }}</text>
		  <image src="/static/images/arrow-right.png" class="icon" />
		</view>
	</view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default() {
        return {
          avatarUrl: '',
          nickname: '',
          address: '',
        }
      }
    }
  },
  data() {
	  return {
		  StatusBar: 0,
		  CustomBar: 0,
	  }
  },
  created() {
	  const sys = wx.getSystemInfoSync()
	  this.StatusBar = sys.statusBarHeight
	  this.CustomBar = sys.platform == 'android' ? sys.statusBarHeight + 50 : sys.statusBarHeight + 45
  },
  computed: {
  },
  methods: {
    handleGoUserCenter() {
      uni.navigateTo({
        url: '/pagesUserCenter/pages/index/index'
      })
    },
    handleRightAction() {
      let that = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res);
          const address = res.address
          const latitude = res.latitude
          const longitude = res.longitude
          // uni.setStorageSync('selectLocation', res)
          uni.setStorageSync('location', res)
          that.$emit('selectLoaction')
        },
        fail: function (err) {
          console.log(err, '用户未选择地址');
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  background-color: transparent;
  padding: 0 32rpx;
  height: 80rpx;
  box-sizing: border-box;
  z-index: 4;
}

.icon-left {
	width: 80rpx;
	height: 80rpx;
	border-radius: 12rpx;
	border: 6rpx solid #fff;
	box-sizing: border-box;
}

.icon-logo {
	width: 70rpx;
	height: 32rpx;
}
.bottom {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	font-weight: 400;
}

.left{
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
}
.right {
	display: flex;
	flex-direction: column;
  .title{
    font-weight: 600;
    color: #121212;
  }
}
.icon {
	width: 32rpx;
	height: 32rpx;
}
</style>
