<!-- 标签偏好选择 -->
<template>
  <view class="user-perference-tags-page">
    <custom-nav-bar
      title=""
      :navBarStyle="navBarStyle"
      theme="dark"
    ></custom-nav-bar>
    <image
      class="top-bk-img"
      src="../../static/images/tags-page-bk.svg"
      mode="widthFix"
    ></image>

    <view class="nav_box_loading" v-if="showloading">
      <view class="nav_box_loading_inner">
        <image src="@/static/images/kuangye.png"></image>
        <view class="nav_box_loading_text"> 正在探索适合你的生活 </view>
        <view class="nav_box_loading_text">稍等哦</view>
        <view class="loadings"></view>
      </view>
    </view>
    <view class="title-box" v-if="!showloading">
      <view class="title-text">偏好设置</view>
      <view class="tips">我们将根据你的偏好为推荐个性内容</view>
    </view>
    <view class="tag-group-item" v-if="!showloading">
      <view
        class="tags-group-box"
        v-for="(item, index) in characterOptions"
        :key="index"
      >
        <view class="tags-group-item">
          <view class="title"
            >{{ item.dictName }}{{ index > 1 ? "(可多选)" : "" }}</view
          >
          <view class="tag-list">
            <view
              :class="
                choosenCharacter?.find((res) => res?.code === list?.dictCode)
                  ? 'tag-item tag-item-active'
                  : 'tag-item'
              "
              v-for="(list, indexs) in item.sysDictDataList"
              :key="indexs + '20'"
              @tap="handleChangeChartTag(list, index)"
            >
              <view class="tag-name">{{ list?.dictLabel }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-actions" v-if="!showloading">
      <button class="submit-btn" form-type="submit" @click="handleSubmit">
        选好了
      </button>
    </view>
  </view>
</template>

<script setup>
import http from "@/utils/http.js";
import { ref } from "vue";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar.vue";
import {
		onLoad
	} from '@dcloudio/uni-app'
const navBarStyle = {
  position: "relative",
  color: "rgba(34, 34, 34, 1)",
};
const toBack = ref(false)
const showloading = ref(false);
const characterOptions = ref([]);
const choosenCharacter = ref([]);
function getuserHomeLabel() {
  http.userHomeLabel({ dictType: "sys_user_home_" }).then((res) => {
    characterOptions.value = res.data;
  });
}
getuserHomeLabel();
onLoad((options) => {
	if(options.data) {
		toBack.value = true
	}
})
// 选择性格偏好
const handleChangeChartTag = (val, index) => {
  // 如果有的话就清除掉
  if (choosenCharacter.value?.find((res) => res?.code === val.dictCode)) {
    choosenCharacter.value = choosenCharacter.value.filter(
      (res) => res?.code !== val?.dictCode
    );
    return;
  }

  if (index === 0 || index === 1) {
    let data = {
      type: index + 1,
      code: val.dictCode,
      name: val.dictLabel,
    };
    choosenCharacter.value[index] = data;
  } else {
    let data = {
      type: index + 1,
      code: val.dictCode,
      name: val.dictLabel,
    };
    choosenCharacter.value.push(data);
  }
};
function handleSubmit() {
  let data = {
    userId: uni.getStorageSync("userInfo")?.id,
    userPreferences: choosenCharacter.value,
  };
  http.preferenceAdd(data).then((res) => {
    if (res.code === "200") {
      uni.showToast({
        title: "保存成功",
        icon: "none",
        duration: 1000,
      });
	  setTimeout(() => {
		showloading.value = true;
		setInterval(() => {
			showloading.value = false;
			if (toBack.value) {
				uni.navigateBack({ delta: 1 });
			} else {
				uni.switchTab({ url: "/pages/index/index" });
			}
		}, 3000)
	  }, 1000)
    }
  });
}
</script>

<style lang="scss" scoped>
.user-perference-tags-page {
  @import "@/static/config.scss"; // 注意相对路径
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  .top-bk-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
  }
  .title-box {
    margin: 48rpx;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    .title-text {
      font-family: PingFang SC;
      font-size: 40rpx;
      font-weight: 600;
      height: 56rpx;
      line-height: 56rpx;
      color: #121212;
      margin-bottom: 8rpx;
    }
    .tips {
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 400;
      height: 40rpx;
      line-height: 40rpx;
      color: $Color-B-2;
    }
  }
  .tag-group-item {
    width: 100%;
    padding: 0 48rpx 300rpx;
    box-sizing: border-box;
    z-index: 2;
  }
  .tags-group-box {
    position: relative;

    z-index: 999;
    .tags-group-item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 24rpx;
      position: relative;

      .title {
        font-family: PingFang SC;
        font-size: 32rpx;
        font-weight: 600;
        text-align: left;
        height: 44rpx;
        line-height: 44rpx;
        margin-bottom: 24rpx;
        position: relative;
      }
      .tag-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        position: relative;
        .tag-item {
          margin-bottom: 24rpx;
          width: 182rpx;
          height: 50rpx;
          line-height: 50rpx;
          border-radius: 50rpx;
          border: 2rpx solid $Color-B-4;
          background-color: #fff;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          color: $Color-B-1;
          font-size: 24rpx;
          font-family: "PingFang SC";
          position: relative;
        }
        .tag-item-active {
          border: 0rpx;
          background-color: #007aff;
          color: #ffffff;
          border: 2rpx solid #007aff;
        }
      }
    }
  }
  .submit-actions {
    height: 220rpx;
    background-color: #ffffff;
    padding: 32rpx;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    .submit-btn {
      background-color: rgba(34, 34, 34, 1);
      color: #ffffff;
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 600;
      text-align: center;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 100rpx;
    }
  }
}
.nav_box_loading {
  width: 100%;
  padding: 0 140rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 999;
  .nav_box_loading_inner {
    margin-top: 166rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      width: 184rpx;
      height: 92rpx;
      margin-bottom: 152rpx;
    }
    .nav_box_loading_text {
      color: #121212;
      font-size: 40rpx;
      font-weight: 600;
      line-height: 56rpx;
    }
    .loadings {
      width: 110rpx;
      height: 110rpx;
      background: #5BB0FF;
      -webkit-mask: radial-gradient(
            closest-side circle,
            royalblue 99%,
            transparent 100%
          )
          center top/13% 13% no-repeat,
        radial-gradient(
          closest-side circle,
          transparent 69%,
          #5BB0FF 50% 99%,
          transparent 100%
        ),
        conic-gradient(transparent 10%, royalblue 90%);
      -webkit-mask-composite: source-over, source-in;
      animation: rotate 1s linear infinite;
    }
    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>