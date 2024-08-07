<template>
  <view class="navbar" :style="{ top: StatusBar + 'px'}">
    <view class="left" @click="doBack">
      <image src="/static/images/back.png" mode=""></image>
    </view>
	<view class='center'>
		{{ title }}
	</view>
	<view class='right'>
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
	zIndex: {
		type: String,
		default: '9'
	},
  },
  data() {
	  return {
		  StatusBar: 0,
	  }
  },
  created() {
	  const sys = wx.getSystemInfoSync()
	  this.StatusBar = sys.statusBarHeight
  },
  computed: {
  },
  methods: {
    doBack() {
		uni.navigateBack()
    }
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
  justify-content: space-around;
  width: 100vw;
  background-color: transparent;
  padding: 0 32rpx;
  height: 80rpx;
  box-sizing: border-box;
  > view {
	  flex: 1;
  }
  z-index: 4;
  .left {
	  display: flex;
	image {
		width: 40rpx;
		height: 40rpx;
	}
  }
}
</style>
