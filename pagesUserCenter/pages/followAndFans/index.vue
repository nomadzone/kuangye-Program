<template>
  <z-paging
    ref="paging"
    v-model="list"
    use-virtual-list
    @query="queryList"
    :min-delay="500"
    show-refresher-when-reload
    auto-show-back-to-top
    :empty-view-img="emptyImg"
    :empty-view-fixed="true"
    :empty-view-text="actIndex==0?'暂无关注':'暂无粉丝'"
    :empty-view-style="{ top: '-100rpx' }"
    :empty-view-img-style="{ width: '276rpx', height: '190rpx' }"
    :empty-view-title-style="{ fontSize: '36rpx', textAlign: 'center' }"
  >
    <template #top>
      <FollowFansTab @changeTab="changeTab" :active="type"></FollowFansTab>
    </template>
    <template v-slot:cell="{ item }">
      <view class="fans-item-row" @click.stop="toDetai(item)">
        <view class="left">
          <image
            class="fans-avatar"
            v-if="item.avatarUrl"
            :src="item.avatarUrl"
          ></image>
          <image
            class="fans-avatar"
            v-else
            src="../../static/images/user-center-default-avatar.svg"
          ></image>
          <text class="fans-name">{{ item.nickname }}</text>
        </view>
        <view class="right" @click.stop="gzClick(item)">
          <button :class="item.status==1 ? 'active' : 'normal'">
            {{ item.status==1 ? "已关注" : "关注" }}
          </button>
        </view>
      </view>
      </template>
  </z-paging>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FollowFansTab from "@/pagesUserCenter/components/followFansTab/index.vue";
import http from "@/utils/http";
import { onLoad } from "@dcloudio/uni-app";
import emptyImg from '../../static/images/empty_fs.png'
const pageStyle = ref({});
const userId = ref(null);
const actIndex = ref(0);
onMounted(() => {
  uni.getSystemInfo().then((res) => {
    let topValue = (res.statusBarHeight + 41) * 2 + "rpx";
    pageStyle.value = {
      paddingTop: (res.statusBarHeight + 41) * 2 + "rpx",
      height: "calc(100% - " + topValue + ")",
    };
  });
});
const list = ref([]);
const paging = ref(null);
const type = ref(null);

function changeTab(index) {
  actIndex.value = index;
  paging.value.reload()
}
function toDetai(item) {
  uni.navigateTo({
					url: '/pagesUserCenter/pages/thirdInfo/index?userId=' + item.id
				})
}

onLoad((options) => {
  type.value = options.type || 0;
  actIndex.value = options.type || 0;
  if (options.id) {
    userId.value = options.id;
  } else {
    userId.value = uni.getStorageSync("userInfo")?.id;
  }
});

function queryList(pageNo, pageSize) {
  const data = {
    pageNum: pageNo,
    pageSize: pageSize,
    userId: userId.value,
  };
  const api = actIndex.value == 1 ? http.fansFans : http.fansFollow;
  api( data ).then((res) => {
    res.data = null
    paging.value.complete(res.data?.list || []);
  });
}
function gzClick(item) {
  http.fansUpdate({
    userId: item.userId,
  }).then((res) => {
	uni.showToast({
		title: '操作成功',
		icon: 'success',
		duration: 1000
	});
	paging.value.refresh();
  })
}
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径
.follow-fans-page {
  padding: 0rpx 32rpx;
}

.fans-item-row {
 display: flex;
 flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 114rpx;
  padding: 0 32rpx;
  box-sizing: border-box;
  &:not(:last-child) {
    border-bottom: 2rpx solid $Color-B-5;
  }
  .left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .fans-avatar {
      width: 48rpx;
      height: 48rpx;
      margin-right: 16rpx;
      border-radius: 100rpx;
    }
    .fans-name {
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
      text-align: left;
      color: $Color-B-1;
    }
  }
  .right {
    .active {
      padding: 0rpx;
      height: 50rpx;
      line-height: 50rpx;
      width: 120rpx;
      text-align: center;
      border: 2rpx solid $Color-B-4;
      font-family: PingFang SC;
      font-size: 24rpx;
      font-weight: 600;
      text-align: center;
      color: $Color-B-2;
      border-radius: 100rpx;
      background: #ffffff;
      &::after {
        border: 0;
      } 
    }
    .normal {
      padding: 0rpx;
      height: 50rpx;
      line-height: 50rpx;
      width: 120rpx;
      text-align: center;
      font-family: PingFang SC;
      font-size: 24rpx;
      font-weight: 600;
      text-align: center;
      background-color: $Color-B-1;
      border-radius: 100rpx;
      border: 0rpx;
      color: #fff;
      &::after {
        border: 0;
      } 
    }
  }
}
</style>