<template>
  <view class="container">
    <map
      id="map"
      :show-location="true"
      :longitude="position.longitude"
      :latitude="position.latitude"
      scale="16"
      style="width: 100vw; height: 50vh"
      :markers="markers"
      enable-zoom
      enable-rotate
      @markertap="markertap"
      @callouttap="onCalloutTap"
      @regionchange="regionchange"
    >
    <cover-view slot="callout">
        <block v-for="(item, index) in markers" :key="index" >
          <cover-view  :class="item.type==1?'customCalloutItem_big':'customCalloutItem'"  :marker-id="item.id">
            <cover-view v-if="item.type == 3" class="customCalloutbox_one">
              <cover-view  class="customCallout">
              <cover-image class="headImg" :src="item.avatarUrl" mode="aspectFill" />
              <cover-view class="title"> {{ item.title }}</cover-view>
            </cover-view>
              <cover-view class="sanjiao_down"></cover-view>
              <cover-view class="sanjiao_up"></cover-view>
              <cover-image class="rightImg" src="../../static/images/eyes_icon.png" mode="aspectFill" />
            </cover-view>
            <cover-view v-if="item.type == 2" class="customCalloutbox_two">
              <cover-view  class="customCallout">
              <cover-image class="headImg" :src="item.avatarUrl" mode="aspectFill" /> 
              <cover-view class="title"> {{ item.title }}</cover-view>
            </cover-view>
              <cover-view class="sanjiao_down"></cover-view>
              <cover-view class="sanjiao_up"></cover-view>
              <cover-image class="rightImg" src="../../static/images/group_2.png" mode="aspectFill" />
            </cover-view>
            <cover-view v-if="item.type == 1" class="customCalloutbox_three">
              <cover-view  class="customCallout">
              <cover-image class="headImg" :src="item.image" mode="aspectFill" /> 
              <cover-view class="title"> {{ item.title }}</cover-view>
            </cover-view>
              <cover-view class="sanjiao_down"></cover-view>
              <cover-view class="sanjiao_up"></cover-view>
              <cover-image class="rightImg" src="../../static/images/group_1.png" mode="aspectFill" />
            </cover-view>
          </cover-view>
        </block>
      </cover-view>
    </map>

    <div class="positon" @click="resetLocationClick" v-if="isPositon">
      <image src="/static/images/location_m.png" mode=""></image>
    </div>
  </view>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, nextTick  } from "vue";
import { getUserLocation } from "@/utils/index";
import http from '@/utils/http.js'
import { onShow } from "@dcloudio/uni-app";
const { ctx } = getCurrentInstance()
const emit = defineEmits("getLocation")
console.log(getCurrentInstance())
    const props = defineProps({
      isPositon: {
        type: Boolean,
        default: true
      }
    });
    const position = ref({
      longitude: 108.952,
      latitude: 34.223,
    })
    const markers = ref([])
    const mapList = ref([])
    const address = ref('')
    onMounted(() => {
      nextTick(() => {
        // console.log('22222222222222222222222,', location)
        // resetLocation('no')
      })
    })
    onShow(() => {
      nextTick(() => {
        const token = uni.getStorageSync("token")
        if (!token) {
          resetLocation()
          return
        }
        const location = uni.getStorageSync('location')
        if(!location ) {
          resetLocation()
        } else if (location.address === '西安钟楼') {
          resetLocation()
        } else {
          const mapCtx = uni.createMapContext("map", ctx);
          position.value.latitude = location.latitude
          position.value.longitude = location.longitude
          mapCtx.moveToLocation({
          longitude: location.longitude,
          latitude: location.latitude,
        });
        if(!address.value) {
          address.value = location.address
          emit("getLocation")
        }
        if (address.value !== location.address) {
          emit("getLocation")
          address.value = location.address
        }
        getDataList()

        }
      })
    })
    function doItem(items, index) {
      if (!uni.getStorageSync("token")) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
					return
				}
        const item = JSON.parse(JSON.stringify(items))
        item.id = item.infoId
      if (item.type === 1) {
        uni.navigateTo({
          url: `/pagesToggle/pages/details/details?id=${item.infoId}`,
          success: (res) => {
            res.eventChannel.emit("getDetails", item);
          },
        });
      } else if (item.type === 2) {
        // 新鲜事
        uni.navigateTo({
          url: `/pagesFreshNews/pages/detail/index?id=${item.infoId}`,
        });
      } else if (item.type === 3) {
        emit('partnerModalShow', item)
      }
    }
    function resetLocation(type) {
      // if (!uni.getStorageSync("token")) return
      const mapCtx = uni.createMapContext("map", ctx);

      getUserLocation(true, 'gcj02').then((res) => {
        position.value.latitude = res.latitude
        position.value.longitude = res.longitude
        uni.setStorageSync('location', {
        longitude: res.longitude,
        latitude: res.latitude,
      })
      mapCtx.moveToLocation({
          longitude: position.value.longitude,
          latitude: position.value.latitude,
        });
        if (!type) {
          emit("getLocation")
        }
        getDataList()
      })
      .catch((err) => {
        console.log(err)
        getDataList()
      })
    }
    function resetLocationClick() {
      resetLocation()
        
    }
    function onCalloutTap(e) {
      goPath(e)
    }
    function markertap(e) {
      goPath(e)
    }
    function goPath(e) {
      const markerId = e.detail.markerId; // 获取点击的 markerId
      const marker = markers.value[markerId]; // 根据 markerId 找到相应的 marker 数据
      if (marker) {
        // 跳转到详情页面
        doItem(marker, markerId)
      }
    }

    async function getDataList(options) {
      console.log('222222222')
      try {
        markers.value = []
        let location = uni.getStorageSync('location')
        let res = await http.homeActivityMap({
          longitude:  options?.longitude || position.value.longitude || location.longitude,
          latitude: options?.latitude || position.value.latitude || location.longitude,
        });	
        let data = res.data
        // 
        const uniqueData = [];
        const seenCoords = new Set();

        data.forEach(item => {
          // 经纬度保留四位小数
          item.latitude = Number(item.latitude).toFixed(4);
          item.longitude = Number(item.longitude).toFixed(4);
          const coord = `${item.longitude},${item.latitude}`;
          if (!seenCoords.has(coord)) {
            seenCoords.add(coord);
            uniqueData.push(item);
          } else {
            const existingItemIndex = uniqueData.findIndex(existingItem => `${existingItem.longitude},${existingItem.latitude}` === coord);
            if (existingItemIndex!== -1 && new Date(item.createTime?.replace(/-/g, "/"))?.getTime() > new Date(uniqueData[existingItemIndex]?.createTime?.replace(/-/g, "/"))?.getTime()) {
              uniqueData[existingItemIndex] = item;
            }
          }
        });
        console.log(uniqueData,' 222222222')
        let markerData = [];
        this.mapList = res.data;
        let color = {
          0: {
            bg: '#E1FFF8',
            line: '#00C4EF'
          },
          1: {
            bg: '#E3F7FF',
            line: '#62e6c8'
          },
          2: {
            bg: '#FFF7E2',
            line: '#ecd28d'
          },
        }
        let callout = {
          content: "",
          anchorX: 0,
          anchorY: 14, //这里偏移量只能要数字
          display: "ALWAYS"//常显
          // padding: 10
        };
        for (let i = 0; i < uniqueData.length; i++) {
          let item = uniqueData[i]
          markerData.push({
            infoId: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            width: 1,
            height: 1,
            iconPath: uniqueData[i].type === 1 ? '../../static/images/smass_yell_jt.png' :uniqueData[i].type === 2 ? '../../static/images/smass_green_jt.png' : '../../static/images/smass_blue_jt.png',
            joinCluster: true,
            title: uniqueData[i].title,
            image: uniqueData[i].images?.split(",")[0] || '',
            avatarUrl: uniqueData[i].avatarUrl,
            type: uniqueData[i].type,
            customCallout: callout,
            ...uniqueData[i],
            id: i,
          });
        }
        markers.value = markerData;
      } catch (error) {
        console.log(error);
      }
    }
// 暴露变量
defineExpose({
	getDataList,
});
</script>


<style scoped lang="scss">
/* index.wxss */
@import "@/static/config.scss"; // 注意相对路径
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.positon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 116rpx;
  right: 16rpx;
  width: 80rpx;
  height: 80rpx;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  background-color: #fff;
  image {
    width: 48rpx;
    height: 48rpx;
  }
}
.customCalloutItem_big{
  width: 276rpx;
  height: 276rpx;
  .customCalloutbox_three{
    position: relative;
    width: 276rpx;
    height: 210rpx;
    padding-top: 30rpx;
    .customCallout {
      width:256rpx;
      height: 190rpx;
      border-radius: 10rpx;
      background:#fff7e2;
      border: 1px solid #f9cd85;
      padding: 16rpx 16rpx 8rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      font-weight: 600;
      .headImg{
        width: 100%;
        height: 125rpx;
        border-radius: 16rpx 16rpx 0 0;
        flex-shrink: 0;
        object-fit: cover;
      }
      .title{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 100%;
        font-size: 24rpx;
        color: #000000;
        margin-top: 8rpx;
      }
    }
    .rightImg{
    position: absolute;
    right: 10rpx;
    top: 4rpx;
    width: 52rpx;
    height: 50rpx;
  }
  .sanjiao_down{
    position: absolute;
    border-left: 12rpx solid transparent;
    border-right: 12rpx solid transparent;
    border-bottom: 19rpx solid #f9cd85;
    left: 130rpx;
    transform: translateX(-50%);
    transform: rotate(180deg);
    z-index: 2;
  }
  .sanjiao_up{
    position: absolute;
    position: absolute;
    left: 133rpx;
    bottom: -1rpx;
    width: 0;
    height: 0;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
    border-bottom: 14rpx solid #fff7e2; 
    z-index: 3;
    transform: rotate(180deg);
    }
  }

}
.customCalloutItem{
  width:340rpx;
  height: 100rpx;
  .customCalloutbox_one{
    position: relative;
    width:340rpx;
    height: 100rpx;
    padding-top: 20rpx;
    .customCallout {
      width:298rpx;
      height: 50rpx;
      background-color: #fff;
      border-radius: 10rpx;
      background:#E1FFF8;
      border: 1px solid #6FDFB0;
      padding: 0 16rpx;
      border-radius: 32rpx;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
      font-size: 24rpx;
      font-weight: 600;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;

      .headImg{
        width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        margin-right: 16rpx;
        flex-shrink: 0;
      }
    }
    .rightImg{
    position: absolute;
    right: 10rpx;
    top: -9rpx;
    width: 60rpx;
    height: 60rpx;
  }
  .sanjiao_down{
    position: absolute;
    border-left: 12rpx solid transparent;
    border-right: 12rpx solid transparent;
    border-bottom: 19rpx solid #6FDFB0;
    left: 140rpx;
    transform: translateX(-50%);
    transform: rotate(180deg);
    z-index: 2;
  }
  .sanjiao_up{
    position: absolute;
    position: absolute;
    left: 143rpx;
    bottom: 35rpx;
    width: 0;
    height: 0;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
    border-bottom: 14rpx solid #E1FFF8; /* 边框颜色 */
    z-index: 3;
    transform: rotate(180deg);
    }
  }

  .customCalloutbox_two{
    position: relative;
    width:340rpx;
    height: 100rpx;
    padding-top: 20rpx;
    .customCallout {
      width:298rpx;
      height: 50rpx;
      border-radius: 10rpx;
      background:#e3f3f7;
      border: 1px solid #00c4ef;
      padding: 0 16rpx;
      border-radius: 32rpx;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
      font-size: 24rpx;
      font-weight: 600;
      display: flex;
      align-items: center;
      // 单行溢出省略号
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      flex-shrink: 0;
      .headImg{
        width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }
    }
    .rightImg{
    position: absolute;
    right: 0rpx;
    top: -20rpx;
    width: 60rpx;
    height: 60rpx;
  }
  .sanjiao_down{
    position: absolute;
    border-left: 12rpx solid transparent;
    border-right: 12rpx solid transparent;
    border-bottom: 19rpx solid #00c4ef;
    left: 140rpx;
    transform: translateX(-50%);
    transform: rotate(180deg);
    z-index: 2;
  }
  .sanjiao_up{
    position: absolute;
    position: absolute;
    left: 143rpx;
    bottom: 35rpx;
    width: 0;
    height: 0;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
    border-bottom: 14rpx solid #e3f7ef; /* 边框颜色 */
    z-index: 3;
    transform: rotate(180deg);
  }
  }
}

</style>
