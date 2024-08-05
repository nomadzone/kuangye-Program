

<template>
  <view class="active">
	  <text class="tags">平台活动</text>
	  <swiper
	    class="swiper"
	    :autoplay="autoplay"
	    :interval="interval"
	    :duration="duration"
	    indicator-dots
	    :circular="true"
	    :indicator-active-color="indicatorActiveColor"
	  >
	    <swiper-item v-for="(image, index) in images" :key="index">
	      <image :src="image" class="swiper-image"></image>
	    </swiper-item>
	  </swiper>
  </view>
</template>

<script>
export default {
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 500
    },
    indicatorActiveColor: {
      type: String,
      default: '#007aff'
    }
  },
  data() {
	  return {
		  images: [
			  'https://img2.baidu.com/it/u=184291116,1680755030&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=620',
			  'https://img.zcool.cn/community/01ec0d5c094270a801209252977f83.jpg@3000w_1l_0o_100sh.jpg',
			  'https://img0.baidu.com/it/u=1317875771,334317502&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500'
		  ]
	  }
  }
}
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: 526rpx;
  border-radius: 24rpx;
  overflow: hidden;
}

.swiper-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24rpx;
}
.active {
	position: relative;
}
.tags {
	position: absolute;
	top: 16rpx;
	left: 16rpx;
	padding: 4rpx 12rpx;
	border-radius: 24rpx;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 2;
	font-size: 24rpx;
	color: #fff;
}
</style>
