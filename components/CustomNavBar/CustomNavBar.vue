<!-- components/CustomNavBar.vue -->
<template>
  <view class="nav-bar">
    <view class="left" @click="onBack">
      <text class="nav-text">Back</text>
    </view>
    <view class="center">
      <text class="nav-text">{{ title }}</text>
    </view>
    <view class="right">
      <text class="nav-text">Menu</text>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});

function onBack() {
  uni.navigateBack();
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px; /* 导航栏高度 */
  background-color: #333; /* 导航栏背景色 */
  color: #fff; /* 文字颜色 */
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保导航栏在最上层 */
}
.left, .center, .right {
  display: flex;
  align-items: center;
}
.center {
  flex: 1;
  text-align: center;
}
.nav-text {
  font-size: 16px;
  color: #fff;
}
</style>
