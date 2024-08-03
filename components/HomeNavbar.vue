<template>
  <view class="navbar" :style="{ top: StatusBar + 'px'}">
    <view class="left">
      <image src="https://img0.baidu.com/it/u=2594346301,3432725937&fm=253&fmt=auto&app=120&f=JPEG?w=507&h=500"  class="icon-left" />
    </view>
	<view class='right'>
		<view class="top">
			<image src="/static/images/title-logo.png" class="icon-logo" />
		</view>
		<view class="bottom" @click="handleRightAction">
		  <text class="title">{{ title }}</text>
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
    handleRightAction() {
      // 处理右侧按钮点击事件
      console.log('Right button clicked');
	  this.$emit('action')
      // 你可以在这里执行其他操作
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
  width: 100vw;
  background-color: transparent;
  padding: 0 32rpx;
  height: 80rpx;
  box-sizing: border-box;
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
}
.icon {
	width: 32rpx;
	height: 32rpx;
}
</style>
