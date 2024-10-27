<template>
  <view class="navbar" :style="{ top: StatusBar + 'px'}">
    <view class="left" @tap="handleGoUserCenter" v-if="userInfo.avatarUrl">
      <image :src="userInfo.avatarUrl" v-if="userInfo.avatarUrl" mode="aspectFill"  class="icon-left" />
      <image v-else src="/static/images/title-logo.svg" class="icon-logo" style="height: 80rpx;width: 80rpx;" />
    </view>
    <view class="left" @tap="handleGoUserCenter" v-if="!userInfo.avatarUrl">
      <image src="/static/images/moren.png" class="icon-logo" style="height: 80rpx;width: 80rpx;" />
    </view>
	<view class='right'>
		<view class="top" @tap="handleGoUserCenter">
			<image src="/static/images/logo_text.svg" class="logo_text" />
		  <!-- <text class="title" style="font-size: 28rpx;">{{ userInfo.nickname || '' }}</text> -->
		</view>
		<view class="bottom" @click="handleRightAction" >
		  <text class="title" style="font-size: 24rpx;">{{filterAndRemoveBefore(userInfo.address)  || '' }}</text>
		  <image src="/static/images/arrow-right.png" v-if="userInfo.address" class="icon" />
		</view>
	</view>
  </view>
</template>

<script>
import http from '../../utils/http'
export default {
  name: 'HomeNavbar',
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
    const loaction = uni.getStorageSync('location')
    
  },
  computed: {
  },
  methods: {

   filterAndRemoveBefore(address) {
      if (!address) return ''
      let result = address;
      const patterns = ['省', '市', '县', '自治区' ];
      for (const pattern of patterns) {
        const regex = new RegExp(`.*?${pattern}`);
        const match = result.match(regex);
        if (match) {
        result = result.slice(match.index + match[0].length).trim();
        }
      }
      return result;
      },
    handleGoUserCenter() {
      uni.navigateTo({
        url: '/pagesUserCenter/pages/index/index'
      })
    },
    handleRightAction() {
      if (!uni.getStorageSync('token')) return
      let that = this
      wx.chooseLocation({
        success: function (res) {
          let location = {
                  latitude: res.latitude,
                  longitude: res.longitude
                  }
          uni.setStorageSync('location', location)
             http.getAddress({
            longitude: res.longitude,
            latitude: res.latitude,
              }).then(val => {
                let location = {
                  address: val.data,
                  latitude: res.latitude,
                  longitude: res.longitude
                  }
                  console.log(res,'res=========>')
                  uni.setStorageSync('location', location)
                  that.$emit('selectLoaction', location)
                })
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
  .logo_text{
    width: 64rpx;
    height: 32rpx;
  }
}
.icon {
	width: 32rpx;
	height: 32rpx;
}
</style>
