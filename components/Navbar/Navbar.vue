<template>
  <view class="navbar" :style="{ paddingTop: StatusBar + 'px', height:(StatusBar+40)+'px', background: background }">
    <view class="left" @click="doBack">
      <image :src="type==1?'/static/images/Back_two.png' : '/static/images/back.png'" mode=""></image>
    </view>
	<slot></slot>
	<view class='center' :class="type==1?'center-white':''">
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
      default: "",
    },
    zIndex: {
      type: String,
      default: "9",
    },
    delta: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      StatusBar: 0,
      scrollHeight: 0,
      scrollBg: false
    };
  },
  created() {
    const sys = wx.getSystemInfoSync();
    this.StatusBar = sys.statusBarHeight;
    // 监听页面滚动到一定高度
  },

  computed: {},
  methods: {
    doBack() {
      uni.navigateBack({
        delta: this.delta,
      });
    },
    onScroll() {
      const that = this;
      wx.onWindowScroll(function(res) {
        that.scrollHeight = res.scrollTop;
        console.log(that.scrollHeight);
        if (that.scrollHeight > 100) {
          that.scrollBg = true
        }
      });
  }
}
};
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  background-color: transparent;
  padding: 0 32rpx;
  height: 80rpx;
  box-sizing: border-box;
  z-index: 30;
  > view {
    flex: 1;
  }
  .center {
    text-align: center;
    // 溢出省略号
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .center-white{
    color: #ffffff;
  }
  .left {
    display: flex;
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
</style>
