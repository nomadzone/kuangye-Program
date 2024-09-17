

<template>
  <view class="active" v-if="images.length > 0">
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
	    <swiper-item v-for="(item, index) in images" :key="index">
	      <image :src="item.images" @click="doItem(item, index)" class="swiper-image"></image>
	    </swiper-item>
	  </swiper>
  </view>
</template>

<script>
import http from '@/utils/http.js'
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
		  images: []
	  }
  },
  async created() {
	try {	
		let res = await http.homeNoticeList({
			type: 1
		})
		this.images = res.data || []
	} catch (error) {
		console.log(error)
	}
  },
  methods: {
	doItem(item, index) {
		uni.navigateTo({
			url: '/pages/webview/index?url=' + item.url
		})
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
