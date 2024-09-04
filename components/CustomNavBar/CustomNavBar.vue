<!-- components/CustomNavBar.vue -->
<template>
  <view class="nav-bar" :style="navBarStyleObj">
    <view class="left" @click="onBack">
		<image v-if="theme === 'light'" class="back-icon" src="../../static/images/nav_back_light.svg"></image>
		<image v-else class="back-icon" src="../../static/images/back.png"></image>
    </view>
    <view class="center">
      <text class="nav-text">{{ title }}</text>
    </view>
    <view class="right">
      <text class="nav-text"></text>
    </view>
  </view>
</template>

<script setup>
import { defineProps, onMounted , ref} from 'vue';
let navBarHeight = ref(40)
let statusBarHeight = ref(40)
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  navBarStyle:{
	  type: Object,
	  default: () =>{
		  return {}
	  }
  },
  theme:{
	  type:String,
	  default: 'light'
  }
});

const navBarStyleObj = ref({})
onMounted(() => {
	uni.getSystemInfo().then(res => {
		 navBarHeight.value = (res.statusBarHeight + 41)*2
		 statusBarHeight.value = res.statusBarHeight * 2
		 
			
		navBarStyleObj.value = {
			...props.navBarStyle,
			height: (res.statusBarHeight + 41)*2 + 'rpx',
			paddingTop: res.statusBarHeight * 2 + 'rpx'
		}
		 
	})
})

function onBack() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent; /* 导航栏背景色 */
  color: #fff; /* 文字颜色 */
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保导航栏在最上层 */
  box-sizing: border-box;
  .left {
  	width: 40rpx;
  	height: 40rpx;
	.back-icon {
		width: 100%;
		height: 100%;
	}
  	
  }
}
</style>
