<!-- components/CustomNavBar.vue -->
<template>
  <view class="nav-bar" :style="navBarStyleObj">
    <view class="left" @click="onBack">
		<image class="back-icon"  src="@/static/images/back.png"></image>
		<view class="author-avatar">
			<image class="author-img" :src="authorInfo.avatar"></image>
		</view>
		<text class="author-name">{{authorInfo.name}}</text>
    </view>
    <view class="right">
		<view v-if="authorInfo.followStatus" class="followed">已关注</view>
		<view v-else class="unfollow">
			<image class="add-follow-icon" src="../../static/images/top-nav-follow.svg"></image>
			<text class="follow-text">关注</text>
		</view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, onMounted , ref} from 'vue';
let navBarHeight = ref(40)
let statusBarHeight = ref(40)
const props = defineProps({
  navBarStyle:{
	  type: Object,
	  default: () =>{
		  return {}
	  }
  },
  
});

const navBarStyleObj = ref({})
onMounted(() => {
	uni.getSystemInfo().then(res => {
		 navBarHeight.value = (res.statusBarHeight + 41)*2
		 statusBarHeight.value = res.statusBarHeight * 2
		 const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		 
		 console.log('menuButtonInfo====', menuButtonInfo)
			
		navBarStyleObj.value = {
			...props.navBarStyle,
			height: (res.statusBarHeight + 41)*2 + 'rpx',
			paddingTop: res.statusBarHeight * 2 + 'rpx',
			paddingRight: (menuButtonInfo.width  ) *2 + 40 + 'rpx'
		}
		 
	})
})


function onBack() {
  uni.navigateBack();
}

// 作者信息
let authorInfo = ref( {
	avatar: '../../static/images/fresh-news-default-avatar.svg',
	name: '姓名姓名姓名姓名姓名',
	followStatus: false
})

</script>

<style scoped lang="scss">
	@import "@/static/config.scss"; // 注意相对路径
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent; /* 导航栏背景色 */
  color: #fff; /* 文字颜色 */
  padding: 0 16px;
  box-sizing: border-box;
  .left {
	  display: flex;
	  flex-direction: row;
	  justify-content: flex-start;
	  align-items:flex-start;
  
	.back-icon {
		width: 40rpx;
		height: 40rpx;
	}
	.author-avatar{
		margin-left: 10rpx;
		width: 48rpx;
		height: 48rpx;
		border-radius: 100rpx;
		overflow: hidden;
		margin-right: 8rpx;
		.author-img {
			width: 100%;
			height: 100%;
			
		}
		
		
	}
	.author-name {
		width: 222rpx ;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: PingFang SC;
		font-size: 28rpx;
		font-weight: 400;
		text-align: left;
		color:$Color-B-1;

	}
  	
  }
  .right {
	  .unfollow {
		  width: 112rpx;
		  height: 50rpx;
		  border-radius: 100rpx;
		  background-color: $Color-B-1;
		  display: flex;
		  flex-direction: row;
		  justify-content: center;
		  align-items: center;
		.add-follow-icon{
			width: 28rpx;
			height: 28rpx;
			margin-right: 4rpx;
		}
		.follow-text {
			font-size: 24rpx;
			font-weight: 600;
			color: #ffffff;

		}
	  }
  }
}
</style>
