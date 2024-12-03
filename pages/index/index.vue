<template>
  <view class="index_box">
    <HomeNavbar
      :userInfo="userInfo"
      @selectLoaction="doAction"
      :title="schooolTitle"
    />
    <Gradual height="226rpx"></Gradual>
    <Map
      ref="map"
      class="map"
      @getLocation="getLocation"
      @partnerModalShow="handleShowPartnerModal"
    ></Map>
    <!-- :class="showPointList?'container_big':''"   -->
    <view
      class="container"
      :style="`height: ${pageheight}px; top: ${topVh}px`">
      <view class="sticky">
        <view
          class="touch_view"
          @click.stop="showPointClick()"
          @touchmove.stop="touchM"
          @touchend.stop="touchE"
        ></view>
        <view>
          <view class="line"></view>
          <HomeSort @action="doSort" :index="sortIndex"></HomeSort>
          <!-- <HomeCate></HomeCate> -->
        </view>
        <view class="water-view">
          <WaterFalls
            ref="WaterfallsRef"
            :sortIndex="sortIndex"
            @partnerModalShow="handleShowPartnerModal"
          >
          </WaterFalls>
        </view>
      </view>
    </view>
    <view style="height: 200rpx"></view>
    <!-- 页面内容 -->
    <CustomTabbar :userInfo="userInfo" />
    <PartnerModal ref="partnerModalRef" @getDetail="handleDeleteReload" />
  </view>
</template>

<script>
import CustomTabbar from "@/components/Tabbar/Tabbar.vue";
import HomeNavbar from "@/components/Navbar/HomeNavbar.vue";
import Map from "@/components/Map/Map.vue";
import HomeSort from "@/components/HomeSort/HomeSort.vue";
import HomeCate from "@/components/HomeCate/HomeCate.vue";
import HomeWaterfalls from "@/components/HomeWaterfalls/HomeWaterfalls.vue";
import WaterFalls from "@/components/HomeWaterfalls/waterfalls.vue";
import Gradual from "@/components/Navbar/Gradual.vue";
import GradualTwo from "@/components/Navbar/GradualTwo.vue";
import PartnerModal from "@/components/PartnerModal/index.vue";
import http from "@/utils/http.js";
export default {
  components: {
    CustomTabbar,
    HomeNavbar,
    HomeSort,
    HomeCate,
    HomeWaterfalls,
    Gradual,
    Map,
    PartnerModal,
    WaterFalls,
    GradualTwo
  },
  data() {
    return {
      statusBarHeight: 0,
      sortIndex: 0,
      schooolTitle: "西安交通大学博学楼1",
      touchType: false,
      pointHeight: 0,
      showPointList: false,
      timers: null,
      clientY: 0,
      showVh: "50vh",
      topVh: "",
	    halfVh: "",
      halTop: false,
      pageheight: "",
	  screenHeight: '',
      userInfo: {
        avatarUrl: "",
        address: "",
        stauts: 0,
      },
	  address: '',
      isAd: true,
      sortIndex: 0,
    };
  },
  async created() {
    this.statusBarHeight = uni.getStorageSync("statusBarHeight");
    uni.getSystemInfo({
      success: (res)=> {
        const screenWidth = res.screenWidth; // 屏幕宽度
        this.screenHeight = res.screenHeight; // 屏幕高度
		    this.halfVh = (res.screenHeight/2)
        this.pageheight = (res.screenHeight/2)
		    this.topVh = (res.screenHeight/2)
		    this.showVh = 176 / 750 * uni.getSystemInfoSync().windowWidth
      },
      fail: function (error) {
        console.log("获取系统信息失败", error);
      },
    });
    let loacation = uni.getStorageSync("location");
    if (!loacation) {
      let data = {
        longitude: 108.947089,
        latitude: 34.259365,
        address: '西安钟楼'
      };
      uni.setStorageSync("location", data);
      this.address = data.address
      this.userInfo = { ...this.userInfo, address: data.address };
      }
  },
  async onShow() {
    this.sortIndex = Number(uni.getStorageSync("sortIndex") || 0);
    let userInfo = uni.getStorageSync("userInfo");
    if (userInfo) {
      if (userInfo.address) {
      this.address = userInfo.address
    }
    this.userInfo = { ...this.userInfo, ...userInfo, address: this.address };
    await this.getUserInfo();
    // await this.getHomeList();
    } else {
      let location = uni.getStorageSync("location");
      this.userInfo = { ...this.userInfo, address: location.address };
      // await this.getHomeList();
    }
   
  },
  onUnload() {
    uni.removeStorageSync("sortIndex");
  },
  methods: {
    getUserInfo() {
      http.getUserInfo().then((res) => {
        this.userInfo = { ...this.userInfo, ...res.data,  address: this.address};
        uni.setStorageSync("userInfo", this.userInfo);
      });
    },
    showPointClick() {
      if (this.showPointList) {
        setTimeout(() => {
          this.showPointMap = !this.showPointMap;
        }, 300);
      } else {
        this.showPointMap = !this.showPointMap;
      }
      this.showPointList = !this.showPointList;
    },
    touchM(e) {
      this.touchType = true;
      this.pointHeight = e.changedTouches[0].clientY - this.clientY;
      this.pageheight =  this.screenHeight - e.changedTouches[0].clientY
      this.topVh =  e.changedTouches[0].clientY

      // this.showVh =
      // if(this.showPointList) {
      // 		this.showVh = '70vh'
      // 			this.topVh = '30vh'
      // 		} else {
      // 			this.showVh = '50vh'
      // 			this.topVh = '50vh'
      // 		}

      if (!this.clientY) {
        this.clientY = e.changedTouches[0].clientY;
      }
    },
    touchE(e) {
      this.touchType = true;
      this.clientY = 0;
      console.log(this.halTop)
      if(this.topVh < this.showVh) {
			this.topVh = this.showVh
      setTimeout(() => {
        this.halTop = true
      }, 500)
			this.pageheight = this.screenHeight - this.showVh
	  }
	  if (this.topVh >this.halfVh) {
			this.topVh = this.halfVh
      setTimeout(() => {
        this.halTop = false
      }, 500)
			this.pageheight = this.halfVh
	  }
    if(!this.halTop) {
      if(this.halfVh/5 < this.halfVh - this.topVh) {
      this.topVh = this.showVh
			this.pageheight = this.screenHeight - this.showVh
      setTimeout(() => {
        this.halTop = true
      }, 500)
    } 
    }
    if(this.halTop) {
        if(this.halfVh/5 < this.halfVh - this.topVh) {
        this.topVh = this.halfVh
        setTimeout(() => {
        this.halTop = false
      }, 500)
        this.pageheight = this.halfVh
      }
    }

    },
    async getLocation() {
      let location = uni.getStorageSync("location");
      if (!location) return;
      let res = await http.getAddress({
        longitude: location.longitude,
        latitude: location.latitude,
      });
	  this.address = res.data
    this.userInfo = { ...this.userInfo, address: res.data };
    uni.setStorageSync("userInfo", this.userInfo);

    this.getHomeList()
    },
    handleDeleteReload() {
      this.$refs.WaterfallsRef.toRold();
    },
    async doSort(type) {
      // uni.showLoading({
      // 	title: '加载中...',
      // 	mask: true
      // })
      console.log(type, 'typesssssssssssssssssssssssssssssssssss');
      this.sortIndex = type;
      this.isAd = type !== null && type === 0;
      this.$refs.WaterfallsRef.toRold();
      // try {
      // 	await this.$refs.HomeWaterfalls.getList({
      // 		type
      // 	})
      // 	uni.hideLoading()
      // } catch (err) {
      // 	uni.hideLoading()
      // }
    },
    getHomeList() {
      this.$refs.WaterfallsRef.toRold();
    },
    async doAction() {
      let selectLocation = uni.getStorageSync("location");
      console.log(selectLocation, 'selectLocation');
	    this.address = selectLocation.address
      this.userInfo = { ...this.userInfo, address: selectLocation.address };
      uni.setStorageSync("userInfo", this.userInfo);
      await this.$refs.map.getDataList({
        longitude: selectLocation.longitude,
        latitude: selectLocation.latitude,
        authType: uni.getStorageSync('token')? 0 : 1,
      });
    },
    // 找搭子弹出层
    handleShowPartnerModal(row) {
      let _this = this;
      _this.$refs.partnerModalRef.show(row);
    },
  },
};
</script>

<style lang="scss" scoped>
/* 页面样式 */
.map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50vh;
  z-index: 2;
}

.index_box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  height: 50vh;
  position: relative;
  top: 0;
  padding: 0;
  border-top-right-radius: 16rpx;
  border-top-left-radius: 16rpx;
  z-index: 4;
  // transition: all 0.3s;
}

.container_big {
  height: 70vh;
  top: 30vh;
}

.line {
  position: relative;
  margin-bottom: 16rpx;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -50rpx;
    width: 100rpx;
    height: 12rpx;
    border-radius: 8rpx;
    background: #e9e9e9;
  }
}

.water-view {
  height: 100%;
  overflow-y: auto;
  padding: 0;
  background-color: #fff;
  position: relative;
}

.sticky {
  position: sticky;
  top: 180rpx;
  z-index: 9;
  height: 100%;
  background-color: #fff;
  padding: 20rpx 0 0;

  .touch_view {
    width: 100%;
    height: 80rpx;
    background: transparent;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
