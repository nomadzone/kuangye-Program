<!-- 关注。粉丝顶部导航 -->
<template>
  <view class="navbar" :style="navBarStyleObj">
    <view class="left" @click="doBack">
      <image src="/static/images/back.png" mode=""></image>
    </view>
    <view class="center">
      <view
        @tap="handleChangeTab(0)"
        :class="
          activeTab == 0 ? 'center-item center-item-active' : 'center-item'
        "
        >关注</view
      >
      <view
        @tap="handleChangeTab(1)"
        :class="
          activeTab == 1 ? 'center-item center-item-active' : 'center-item'
        "
        >粉丝</view
      >
    </view>
    <view class="right"> </view>
  </view>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
let navBarHeight = ref(40);
let statusBarHeight = ref(40);
const navBarStyleObj = ref({});
const activeTab = ref(0);
const emit = defineEmits(["changeTab"]);
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
});
onMounted(() => {
  activeTab.value = props.active;
  uni.getSystemInfo().then((res) => {
    navBarHeight.value = (res.statusBarHeight + 41) * 2;
    statusBarHeight.value = res.statusBarHeight * 2;
    navBarStyleObj.value = {
      height: (res.statusBarHeight + 41) * 2 + "rpx",
      paddingTop: res.statusBarHeight * 2 + "rpx",
    };
  });
});

const doBack = () => {
  uni.navigateBack();
};

// 切换tab
const handleChangeTab = (key) => {
  activeTab.value = key;
  emit("changeTab", key);
};
</script>

<style scoped lang="scss">
@import "@/static/config.scss"; // 注意相对路径

.navbar {
 
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

  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .center-item {
      font-family: PingFang SC;
      font-size: 32rpx;
      font-weight: 600;
      text-align: left;
      color: $Color-B-3;
      margin: 0rpx 16rpx;
    }

    .center-item-active {
      font-family: PingFang SC;
      font-size: 32rpx;
      font-weight: 600;
      text-align: left;
      color: $Color-B-1;
      margin: 0rpx 16rpx;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 12rpx;
        bottom: -16rpx;
        width: 40rpx;
        height: 100%;
        border-bottom: 2px solid $Color-B-1;
      }
    }
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