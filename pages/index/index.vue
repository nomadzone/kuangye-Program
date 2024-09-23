<template>
  <view>
	<HomeNavbar :userInfo="userInfo" @action='doAction' :title="schooolTitle"/>
	<Gradual></Gradual>
	<Map ref="map" class="map"></Map>
	<view class="container">
		<view class="sticky">
			<view class="line"></view>
			<HomeSort @action='doSort'></HomeSort>
			<!-- <HomeCate></HomeCate> -->
		</view>
		<view  class="water-view">
			<HomeWaterfalls ref="HomeWaterfalls" isAd :page="'home'" @partnerModalShow="handleShowPartnerModal"></HomeWaterfalls>
		</view>
		
	</view>
	<view style="height: 200rpx;"></view>
    <!-- 页面内容 -->
    <CustomTabbar/>
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
	PartnerModal
  },
  data() {
	  return {
		  statusBarHeight: 0,
		  sortIndex: 0,
		  schooolTitle: '西安交通大学博学楼1',
		  userInfo: {
			avatarUrl: '',
			address: '',
		  },
	  }
  },
  async created() {
	  this.statusBarHeight = uni.getStorageSync('statusBarHeight')
  },
  async onShow() {
	await this.getHomeList()
	await this.getUserLocation()
	await this.getUserInfo()
  },
  methods: {
		getUserLocation(fn) {
			return new Promise(async(resolve, reject) => {
				try {
					await this.$refs.map.getUserLocation()
					resolve()
				} catch (err) {
					reject(err)
				}
			})
		},
		async doSort(type) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			this.sortIndex = type;
			try {
				await this.$refs.HomeWaterfalls.getList({
					type
				})
				uni.hideLoading()
			} catch (err) {
				uni.hideLoading()
			}
		},
		async getUserInfo() {
			return new Promise(async(resolve, reject) => {
				let userInfo = uni.getStorageSync('userInfo')
				try {
					let location = uni.getStorageSync('location')
					if (!location) return
					let res = await http.getAddress({
						longitude: location.longitude,
						latitude: location.latitude,
					})
					this.userInfo = { ...userInfo, address: res.code != '200' ? '' : res.data }
					resolve()
				} catch(error) {
					this.userInfo = { ...userInfo, address: '' }
				}
			})
		},
		getHomeList(type) {
			const _this = this;
			return new Promise(async(resolve, reject) => {
				try {
					await _this.$refs?.HomeWaterfalls?.getList({
						type
					})
					resolve()
				} catch (err) {
					reject(err)
				}
			})
		},
	  doAction() {
		  
	  },
	  // 找搭子弹出层
	  handleShowPartnerModal(row) {
		  let _this = this
		  console.log('找搭子弹出层---', row)
		  _this.$refs.partnerModalRef.show(row)
	  }
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
.container {
	margin-top: calc(50vh - 100rpx);
	min-height: calc(50vh + 100rpx - 50rpx);
	position: relative;
	padding: 0;
	border-top-right-radius: 16rpx;
	border-top-left-radius: 16rpx;
	z-index: 4;
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
	height: calc(100vh - 400rpx);
	    overflow-y: auto;
	    padding: 0 16rpx 0 16rpx;
	    background-color: #fff;
	    position: relative;
}
.sticky {
	position:sticky;
	top: 180rpx;
	z-index: 9;
	background-color: #fff;
	padding: 40rpx 16rpx 0 16rpx;
}
</style>
