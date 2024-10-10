<template>
  <view class="index_box">
	<HomeNavbar :userInfo="userInfo" @selectLoaction='doAction' :title="schooolTitle"/>
	<Gradual></Gradual>
	<Map ref="map" class="map" @getLocation='getLocation' @partnerModalShow='handleShowPartnerModal'></Map>
	<view class="container" :class="showPointList?'container_big':''"   :style="touchType?`height:calc(${showVh} - ${pointHeight}rpx); top: calc( ${topVh} + ${pointHeight}rpx);`: ''">
		<view class="sticky">
			<view class="touch_view" @click.stop="showPointClick()" @touchmove.stop="touchM" @touchend.stop="touchE"></view>
			<view>
				<view class="line"></view>
				<HomeSort @action='doSort' :index="sortIndex"></HomeSort>
				<!-- <HomeCate></HomeCate> -->
			</view>
			<view  class="water-view">
				 <WaterFalls ref="WaterfallsRef" :sortIndex="sortIndex" @partnerModalShow="handleShowPartnerModal"></WaterFalls>
			</view>
		</view>
		
	</view>
	<view style="height: 200rpx;"></view>
    <!-- 页面内容 -->
    <CustomTabbar :userInfo='userInfo'/>
	<PartnerModal ref="partnerModalRef"/>
  </view>
</template>

<script>
import CustomTabbar from '@/components/Tabbar/Tabbar.vue';
import HomeNavbar from '@/components/Navbar/HomeNavbar.vue';
import Map from '@/components/Map/Map.vue';
import HomeSort from '@/components/HomeSort/HomeSort.vue';
import HomeCate from '@/components/HomeCate/HomeCate.vue';
import HomeWaterfalls from '@/components/HomeWaterfalls/HomeWaterfalls.vue'
import WaterFalls from '@/components/HomeWaterfalls/waterfalls.vue'
import Gradual from '@/components/Navbar/Gradual.vue'
import PartnerModal from '@/components/PartnerModal/index.vue'
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
	WaterFalls
  },
  data() {
	  return {
		  statusBarHeight: 0,
		  sortIndex: 0,
		  schooolTitle: '西安交通大学博学楼1',
		  touchType: false,
		  pointHeight: 0,
		  showPointList: false,
		  timers: null,
		  clientY: 0,
		  showVh: '50vh',
		  topVh: '50vh',
		  userInfo: {
			avatarUrl: '',
			address: '',
			stauts: 0
		  },
		  isAd: true,
		  sortIndex: 0,
	  }
  },
  async created() {
	  this.statusBarHeight = uni.getStorageSync('statusBarHeight')
  },
  async onShow() {
	console.log('onShow')
	this.sortIndex = Number(uni.getStorageSync('sortIndex') || 0)
	let userInfo = uni.getStorageSync('userInfo')
	this.userInfo = { ...this.userInfo, ...userInfo }
	console.log(this.userInfo)
	await this.getUserInfo()
	await this.getHomeList()
  },
  onUnload() {
	uni.removeStorageSync('sortIndex')
  },
  methods: {
	getUserInfo() {
		http.getUserInfo().then(res => {
			this.userInfo = { ...this.userInfo, ...res.data }
			uni.setStorageSync('userInfo', this.userInfo)
		})
	},
	showPointClick() {
            if (this.showPointList) {
                setTimeout(() => {
                    this.showPointMap = !this.showPointMap
                }, 300)
            } else {
                this.showPointMap = !this.showPointMap
            }
            this.showPointList=!this.showPointList

        },
	touchM(e) {
            this.touchType = true
            this.pointHeight = (e.changedTouches[0].clientY-this.clientY)
			if(this.showPointList) {
					this.showVh = '70vh'
						this.topVh = '30vh'
					} else {
						this.showVh = '50vh'
						this.topVh = '50vh'
					}
           
            if (!this.clientY) {
                this.clientY = e.changedTouches[0].clientY
            }
        },
        touchE(e) {
            this.touchType = false
            this.clientY = 0
			// 负数转整数
			if(Math.abs(this.pointHeight)>30) {
                this.showPointList = !this.showPointList
            }
        },
	async getLocation () {
		let location = uni.getStorageSync('location')
		if (!location) return
		let res = await http.getAddress({
			longitude: location.longitude,
			latitude: location.latitude,
		})
		this.userInfo = { ...this.userInfo, address: res.data }
	},

		async doSort(type) {
			// uni.showLoading({
			// 	title: '加载中...',
			// 	mask: true
			// })
			this.sortIndex = type;
			this.isAd = type !== null && type === 0
			console.log(this.$refs.WaterfallsRef)
			this.$refs.WaterfallsRef.toRold()
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
			const _this = this;
			return new Promise(async(resolve, reject) => {
				try {
					await _this.$refs?.HomeWaterfalls?.getList({
						type: this.sortIndex
					})
					let userInfo = uni.getStorageSync('userInfo')
					this.userInfo = { ...this.userInfo, ...userInfo }
					console.log(this.userInfo)
					resolve()
				} catch (err) {
					reject(err)
				}
			})
		},
		async doAction() {
			// let selectLocation = uni.getStorageSync('selectLocation')
			let selectLocation = uni.getStorageSync('location')
			this.userInfo = { ...this.userInfo, address: selectLocation.address }
			await this.$refs.map.getDataList({
				longitude: selectLocation.longitude,
				latitude: selectLocation.latitude,
			})
	  },
	  // 找搭子弹出层
	  handleShowPartnerModal(row) {
		  let _this = this
		  _this.$refs.partnerModalRef.show(row)
	  },
  }
}
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
.index_box{
	width: 100%;
	height: 100vh;
	overflow: hidden;
}
.container {
	height:  50vh;
	position: relative;
	top:  50vh;
	padding: 0;
	border-top-right-radius: 16rpx;
	border-top-left-radius: 16rpx;
	z-index: 2;
	// transition: all 0.3s;
}
.container_big{
	height: 70vh;
	top: 30vh;
}
.line {
	position: relative;
	margin-bottom: 16rpx;
	&::before {
		content: '';
		display: inline-block;
		position: absolute;
		left: 50%;
		margin-left: -50rpx;
		width: 100rpx;
		height: 12rpx;
		border-radius: 8rpx;
		background: #E9E9E9;
	}
}
.water-view {
		height: 100%;
	    overflow-y: auto;
	    padding: 0 16rpx 0 16rpx;
	    background-color: #fff;
	    position: relative;
}
.sticky {
	position:sticky;
	top: 180rpx;
	z-index: 9;
	height: 100%;
	background-color: #fff;
	padding: 40rpx 16rpx 0 16rpx;
	.touch_view{
		width: 100%;
		height: 80rpx;
		background: transparent;
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>
