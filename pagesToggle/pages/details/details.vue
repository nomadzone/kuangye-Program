<template>
	<view class="page details">
		<Navbar>
			<view class="navbar">
				<image v-if="activityVo.initiatorUrl" :src="activityVo.initiatorUrl" mode=""></image>
				<text  v-if="activityVo.initiatorName">{{ activityVo.initiatorName }}</text>
				<view class="fllow" v-if="info.userLaunchStatus == 1">
					<text>+ 关注</text>
				</view>
			</view>
		</Navbar>
		<Gradual :background="'linear-gradient(to bottom, #fefbda, #f5f5f5)'" :height="'100vh'" :zIndex="'-1'" />
		<view style="z-index: 6;margin-top: 64rpx;">
			<view :style="{ height: StatusBar + 'px' }"></view>
			<view style="height: 32rpx"></view>
			<image class="popu-icon" src="/static/images/details-icon.png" mode=""></image>
			<view class="module">
				<!-- 报名中 -->
				<image class="status-image" v-if="activityVo.status == 101" src="/static/images/details-status-reply.png" mode=""></image>
				<!-- 活动中 -->
				<image class="status-image" v-if="activityVo.status == 102" src="/static/images/details-status-active.png" mode=""></image>
				<!-- 已满员 -->
				<image class="status-image" v-if="activityVo.status == 103" src="/static/images/details-status-man.png" mode=""></image>
				<!-- 已结束 -->
				<image class="status-image" v-if="activityVo.status == 104" src="/static/images/details-status-end.png" mode=""></image>
				<view class="swiper">
				  <swiper 
					class="swiper-container" 
					circular 
					autoplay 
					 indicator-dots
					 indicator-color="rgb(255 255 255 / 40%)"
					indicator-active-color="#fff"
					interval="5000" 
					duration="500">
					<swiper-item v-for="(picUrl, picIndex) in activityVo.images" :key="picIndex">
					  <image :src="picUrl" class="img"></image>
					</swiper-item>
				  </swiper>
				</view>
				<view class="details-content">
					<view class="title">
						{{ activityVo.title }}
					</view>
					<view class="date">
						<image src="/static/images/date-time.png" mode=""></image>
						<text>{{ activityVo.startdate }}</text>
					</view>
					<view class="location">
						<image src="/static/images/map-pin-line.png" mode=""></image>
						<text>
							{{ activityVo.distanceMeters / 1000 }} | {{ activityVo.address }}
						</text>
					</view>
				</view>
				<view class="map" @click="goMap" v-if="activityVo.longitude && activityVo.latitude">
					<image class="map-positon" src="/static/images/positioning.png" mode=""></image>
					<image class="map-bg" src="/static/images/map-group.png" mode=""></image>
				</view>
			</view>
			
			<view class="module apply">
				<view class="apply-title">
					<view>
						<text class="big">报名人数</text>
						<text>({{info.alreadyNumber}}/{{info.total}})</text>
					</view>
					<view class="more" :class="[details.applyStatus == '0' ? 'gray' : '']">
						仅剩{{info.surplusNumber}}个名额 >
					</view>
				</view>
				<view class="apply-content" v-if="userActivityUpVo.length > 0">
					<template  v-for="(item, index) in userActivityUpVo" :key="index">
						<view v-if="index < 6 || showApply" :key="index">
							<view class="avator">
								<image :class="[item.sex == '0' ? 'man' : 'woman']" :src="item.images" mode=""></image>
								<image class="sex" v-if="item.gender == 0" src="/static/images/man-icon.png" mode=""></image>
								<image class="sex" v-if="item.gender == 1" src="/static/images/woman-icon.png" mode=""></image>
								<view @click="showApply = true" class="chao" v-if="userActivityUpVo.length > 6 && index == 5 && !showApply">
									<text>...</text>
								</view>
							</view>
							<text>{{ item.nickname }}</text>
						</view>
					</template>
					<view class="shouqi" v-if="showApply"  @click="showApply = false">
						<text>收起</text>
					</view>
				</view>
			</view>
			
			<view class="module descption">
				<view class="title">活动描述</view>
				<view>
					{{ activityVo.describe }}
				</view>
			</view>
			
			
			<view :style='{height: (navHeight / 2 + 152 / 2 + 76) + "rpx"}'></view>
			
			
			<view class="price price-gray" v-if="info.userLaunchStatus == 1" :style="{bottom: (navHeight / 2 + 152) + 'rpx'}">
				<view>
					<text>累计收益</text>
					<text class="big">178元</text>
				</view>
			</view>
			<view class="submit" :style='{height: (navHeight / 2 + 152) + "rpx"}'>
				<button class="outline" hover-class="button-hover"  v-if="info.userLaunchStatus != 1">
					<image src="/static/images/wechat-fill-black.png" mode=""></image>
					<text>联系发起人</text>
				</button>
				<button class="fill" hover-class="button-hover" v-if="info.userLaunchStatus != 1">
					<text style="margin-right: 32rpx;">¥29/人</text>
					<text>报名</text>
				</button>
				<!-- 已报名，可取消 -->
				<button @click='applyPopup = true' class="outline" hover-class="button-hover" v-if="info.userLaunchStatus != 1 && info.userStatus == 1 && (
					activityVo.status == 100 ||
					activityVo.status == 101
				)">
					<text>取消报名</text>
				</button>
				<button class="gray" hover-class="button-hover" v-if="info.userLaunchStatus != 1 && info.userStatus == 1 && (
					activityVo.status == 102 ||
					activityVo.status == 103 ||
					activityVo.status == 104 ||
					activityVo.status == 105 ||
					activityVo.status == 106 ||
					activityVo.status == 107
				)">
					<text>取消报名</text>
				</button>
				<!-- 自己查看详情 -->
				<button @click='toastShowDown = true' class="outline" hover-class="button-hover" v-if="info.userLaunchStatus == 1 && (
					activityVo.status == 100 ||
					activityVo.status == 101
				)">
					<text>下架</text>
				</button>
				<button class="outline outline-gray" hover-class="button-hover" v-if="info.userLaunchStatus == 1 && (
					activityVo.status == 102 ||
					activityVo.status == 103 ||
					activityVo.status == 104
				)">
					<text>下架</text>
				</button>
				<button class="outline outline-gray" hover-class="button-hover" v-if="info.userLaunchStatus == 1 && (
					activityVo.status == 106
				)">
					<text>已删除</text>
				</button>
				<button @click='toastShowDel = true' style="color: #1b1b1b;" class="outline outline-gray" hover-class="button-hover" v-if="info.userLaunchStatus == 1 && (
					activityVo.status == 105 ||
					activityVo.status == 107
				)">
					<text>删除</text>
				</button>
				<button class="fill" @click='edit' hover-class="button-hover" v-if="info.userLaunchStatus == 1">
					<text>编辑</text>
				</button>
			</view>
		</view>
		
		<!-- 查看报名人数 -->
		<PoupWrap :show='viewPopup' @close='viewPopup = false' :title='`仅剩${details.maxApplay - details.apply.length}个名额`' rightText='' @save='doApplyPopup'>
			<view class="view-apply-people">
				<view v-for="(item, index) in details.apply" :key="index">
					<image class="avator" :src="item.avator" mode=""></image>
					<text>{{ item.name }}</text>
					<image class="sex" v-if='item.sex == 0' src="/static/images/male.png"></image>
					<image class="sex" v-if='item.sex == 1' src="/static/images/female.png" mode=""></image>
				</view>
			</view>
		</PoupWrap>
		
		<!--  取消报名 -->
		<PoupWrap :show='applyPopup' @close='applyPopup = false' :rightText='""' :title=' popupTypeApply ? "确认报名" : "取消报名"' @save='doApplyPopup'>
			<view  class="apply-popup">
				<view class="apply-popup-content" :class="[popupTypeApply == '0' ? 'confirm' : '']">
					<view class="image">
						<image :src="details.swiper[0]" mode=""></image>
					</view>
					<view class="details-content">
						<view class="title">
							{{ details.title }}
						</view>
						<view class="location">
							<image src="/static/images/map-pin-line.png" mode=""></image>
							<text>
								{{ details.gap }} | {{ details.location }}
							</text>
						</view>
						<view class="date">
							<image src="/static/images/date-time.png" mode=""></image>
							<text>{{ details.date }} | {{ details.time }}</text>
						</view>
					</view>
				</view>
				<!-- 取消报名 -->
				<template v-if="popupTypeApply == '1'">
					<view class="apply-popup-line">
						<view>
							<text> 退款</text>
							<text class="big">¥158.0</text>
						</view>
						<view class="gray">
							活动开始12小时前取消，可全额退款
						</view>
					</view>
					<view class="submit">
						<button class="outline" hover-class="button-hover">
							<image src="/static/images/wechat-fill-black.png" mode=""></image>
							<text>继续撒野</text>
						</button>
						<button class="fill" hover-class="button-hover">
							<text>确定取消</text>
						</button>
					</view>
				</template>
				<!-- 报名确认 -->
				<template v-if="popupTypeApply == '0'">
					<view class="apply-popup-line confirm"> 
						<view  class="title">
							🔐 退改须知
						</view>
						<view class="desc">
							活动开始12小时前申请，退款100%
							活动开始前12小时～开始前申请，退款50%
							活动开始后，不支持退款，特殊原因协商
						</view>
					</view>
					<view class="protocols" v-if="popupTypeApply == '0'">
						<image @click="isReady = !isReady" :src="`/static/images/checkbox${isReady ? '-active' : ''}.png`" mode=""></image>
						<view>
							我已知晓并同意 <text class="blue">《活动安全声明同意书》</text>
						</view>
					</view>
					<view class="submit" style="padding-left: 0; padding-right: 0">
						<button class="fill" :class="[activityVo.status !== 101 ? 'disabled' : '']" hover-class="button-hover" @click="doApply">
							<text>¥29/人</text>
							<text style="padding: 0 20rpx;color: #525252">|</text>
							<text>报名</text>
						</button>
					</view>
				</template>
			</view>
		</PoupWrap>
		<!-- 确定下架 toast -->
		<Toast :show='toastShowDown' @cancel='toastShowDown = false' @confirm='doDown' title='确定下架活动吗？'  confirmText='确定下架' cancelText='再等等' />
		<!-- 确定删除 toast -->
		<Toast :show='toastShowDel' @cancel='toastShowDel = false' @confirm='doDelete' title='确定删除活动吗？'  confirmText='确定删除' cancelText='再等等' />
		<!-- 报名成功 -->
		<ApplySuccess :show='publicSuccessShow' @close='publicSuccessShow = false' @view='publicSuccessShow = false'/>
	
	</view>
</template>

<script>
	import Navbar from '@/components/Navbar/Navbar.vue';
	import Gradual from '@/components/Navbar/Gradual.vue';
	import Upload from '@/components/Upload/Upload.vue';
	import PoupWrap from '@/components/Popup/Wrap.vue';
	import ApplySuccess from '@/components/Popup/ApplySuccess.vue';
	import Toast from '@/components/Toast/Toast.vue';
	import http from '@/utils/http.js';
	import { formatDateText } from '@/utils/index.js'
	import {
		getDayHours,
		getDayMin,
		getDatesAndWeeks
	} from '@/utils/index.js'
	export default {
		components: {
			Navbar,
			Gradual,
			Upload,
			PoupWrap,
			Toast,
			ApplySuccess,
		},
		data() {
			return {
				id: '',
				showApply: false,
				activityVo: {
					"id": "9bb03c14-6172-4c4e-a76c-9361eb55eb2f",
					"title": "五个专场活动将在第十四届北京科学嘉年华闪亮登场",
					"label": "飞盘",
					"longitude": "113.88308",
					"address": "",
					"latitude": "22.55329",
					"startdate": "2024-09-16 00:00:00",
					"enddate": "2024-09-20 00:00:00",
					"signUpStartDate": "2024-09-13 00:00:00",
					"signUpEndDate": "2024-09-15 00:00:00",
					"expectdate": null,
					"minpeople": 1,
					"maxpeople": 11,
					"price": 99,
					"contactphoto": "http://120.26.208.147:19000/ky-images/1726156006778.png",
					"number": null,
					"status": 100,
					"images": "http://120.26.208.147:19000/ky-images/1726155974103.png",
					"describe": "记者从北京科协举办的新闻发布会上获悉，9月15日至25日，2024年全国科普日活动暨第十四届北京科学嘉年华在北京科学中心举办主场活动，同时联动国家自然博物馆、中国铁道博物馆正阳门展馆、天坛公园、钟鼓楼文化广场、石景山首钢园同步开展科普主题专场活动，动员全社会各方力量积极参与开展首",
					"initiatorUrl": null,
					"initiatorName": null,
					"orderNumber": 0,
					"participateStatus": 0,
					"type": 1,
					"distanceMeters": 185.81,
					"userActivityVo": null,
					"userStatus": 0,
					"userPreferenceList": null
				},
				userActivityUpVo: [],
				info: {
					"userLaunchStatus": 1,
					"userActivityUpVo": [
					],
					"total": 11,
					"alreadyNumber": 0,
					"surplusNumber": 11,
					"userStatus": 0
				},
				details: {
					avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
					name: '行吗姓名姓名',
					swiper: [
						'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320',
						'https://preview.qiantucdn.com/agency/dp/dp_thumbs/4177001/93648168/staff_1024.jpg%21kuan320'
					],
					title: '大雁塔飞盘挑战赛',
					date: '周三07.03',
					time: '21:00 - 23:00',
					location: '雁塔区辉腾体育室外场',
					gap: '4.8km',
					longitude: 11,
					latitude: 22,
					maxApplay: 20,
					applyStatus: '1',
					apply: [
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '0',
						},
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '0',
						},
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '1',
						},
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '1',
						},
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '1',
						},
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '1',
						},
						{
							avator: 'https://ww1.sinaimg.cn/mw690/6910b6f2gy1hrkg6qz6ejj20n00n0ac9.jpg',
							name: '行吗姓名姓名',
							sex: '1',
						}
					]
				},
				info: {
					tag: '',
					startTime: '',
					endTime: '',
					startTimeShow: '',
					endTimeShow: '',
					refund: '',
				},
				toastShowDel: false,
				toastShowDown: false,
				publicSuccessShow: false,
				StatusBar: 0,
				navHeight: 0,
				isReady: false,
				popupTypeApply: '0', // 0是报名  1是取消
				viewPopup: false,
				applyPopup: false,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetails()
		},
		created() {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
			this.navHeight = uni.getStorageSync('navBarHeight')
		},
		methods: {
			goMap() {
				const {longitude, latitude} = this.activityVo
				wx.getLocation({
				type: 'gcj02', //返回可以用于wx.openLocation的经纬度
				success (res) {
						wx.openLocation({
							latitude: Number(latitude),
							longitude: Number(longitude),
							scale: 18
						})
					}
				})
			},
			doApply() {
				if (this.activityVo.status !== 101) {
					uni.showToast({
						title: '活动已过，无法报名',
						icon: 'none'
					})
					return
				}
			},
			async getDetails() {
				let location = uni.getStorageSync('location')
				let res = await http.selectWildTogether({
					id: this.id,
					longitude: location?.longitude || null,
					latitude: location?.latitude || null,
				});
				if (res?.code == '200') {
					if (res?.data.activityVo?.images) {
						res.data.activityVo.images = res?.data?.activityVo?.images?.split(',')
					} else {
						res.data.activityVo.images = []
					}
					if (res?.data?.activityVo?.startdate) {
						res.data.activityVo.startdate = formatDateText(res?.data?.activityVo?.startdate)
					}
					this.activityVo = res?.data.activityVo
					this.userActivityUpVo = res?.data.userActivityUpVo
					this.info = res.data
				} else {
					uni.showToast({
						title: res?.msg,
						icon: 'none'
					})
				}
			},
			openMap() {
				wx.getLocation({
					type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					success(res) {
						const latitude = res.latitude
						const longitude = res.longitude
						wx.openLocation({
							latitude,
							longitude,
							scale: 18
						})
					}
				})
			},
			doApplyPopup() {
				this.applyPopup = false
			},
			async doDown() {
				uni.showLoading({
					title: '下架中...'
				})
				let res = await http.activityDown({
					id: this.id
				})
				this.toastShowDown = false
				uni.hideLoading()
				if (res?.code == '200') {
					uni.showToast({
						title: '下架成功',
						icon: 'none'
					})
					setTimeout(() => {
						this.getDetails()
					}, 1500)
				} else {
					uni.showToast({
						title: res?.msg,
						icon: 'none'
					})
				}
			},
			async doDelete() {
				uni.showLoading({
					title: '删除中...'
				})
				let res = await http.activityDel({
					id: this.id
				})
				uni.hideLoading()
				this.toastShowDel = false
				if (res?.code == '200') {
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} else {
					uni.showToast({
						title: res?.msg,
						icon: 'none'
					})
				}
			},
			edit() {
				uni.navigateTo({
					url: '/pagesToggle/pages/public/public?id=' + this.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page.details {
		.navbar {
			display: flex;
			z-index: 99;
			position: relative;
			left: -50rpx;
			top: 2px;
			image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.fllow {
				margin-left: 30rpx;
				position: relative;
				top: -4rpx;
				text {
					background-color: #222;
					color: #fff;
					box-sizing: border-box;
					height: 50rpx;
					padding: 0 20rpx;
					border-radius: 48rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
				}
			}
		}
	}
	.page {
		padding: 32rpx;
		position: relative;

		.placeholder-style {
			color: #A3A3A3;
		}

		.popu-icon {
			position: absolute;
			top: 90rpx;
			left: 80rpx;
			width: 192rpx;
			height: 192rpx;
			z-index: 0;
		}
		
		
		.details-content {
			padding: 20rpx 0 0 0;
			font-family: PingFang SC;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
			color: #646464;
			> view {
				display: flex;
				align-items: flex-start;
				justify-content: flex-start;
				margin-bottom: 6rpx;
			}
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 6rpx;
				position: relative;
				top: 2rpx;
			}
			.title {
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 600;
				line-height: 45rpx;
				color: #222;
				margin-bottom: 16rpx;
			}
			.location {
				margin-bottom: 0;
				width: 80%;
				image {
					width: 36rpx;
					height: 32rpx;
				}
			}
		}

		.module {
			position: relative;
			background-color: #fff;
			border-radius: 16rpx;
			width: 100%;
			padding: 32rpx 24rpx;
			margin-bottom: 24rpx;
			z-index: 6;
			box-sizing: border-box;
			
			.map {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 200rpx;
				height: 200rpx;
				.map-bg {
					width:200rpx;
					height: 140rpx;
					position: absolute;
					bottom: 0;
					right: 0;
				}
				.map-positon {
					z-index: 4;
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}
			
			.status-image {
				position: absolute;
				top: -10rpx;
				left: -10rpx;
				width: 190rpx;
				height: 130rpx;
					transform: rotate(8deg);
				z-index: 9;
			}
			
			.swiper-container {
				border-radius: 16rpx;
				overflow: hidden;
				height: 440rpx;
				image {
					width: 100%;
					height: 440rpx;
					border-radius: 16rpx;
				}
			}
			
			&.apply {
				.apply-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 34rpx;
					color: #646464;
					.big {
						font-family: PingFang SC;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 45rpx;
						color: #222;
					}
					.more {
						font-size: 28rpx;
						font-weight: 400;
						line-height: 40rpx;
						color: #FF8F50;
						&.gray {
							color: #646464;
						}
					}
				}
				.apply-content {
					margin-top: 40rpx;
					display: flex;
					flex-direction: row;
					gap: 40rpx;
					flex-wrap: wrap;
					> view {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-family: PingFang SC;
						font-size: 20rpx;
						font-weight: 400;
						line-height: 28rpx;
						color: #979797;
						.avator {
							width: 72rpx;
							height: 72rpx;
							position: relative;
							.chao {
								position: absolute;
								top: 0;
								left: 0;
								width: 72rpx;
								height: 72rpx;
								border-radius: 50%;
								background-color: rgb(0 0 0 / 50%);
								border: 1px solid rgb(0 0 0 / 50%);
								color: #fff;
								display: flex;
								text-align: center;
								align-items: center;
								justify-content: center;
								font-size: 48rpx;
								text {
									position: relative;
									top: -10rpx;
								}
							}
						}
						image {
							width: 72rpx;
							height: 72rpx;
							border-radius: 50%;
							&.man {
								border: 1px solid #5BB0FF;
							}
							&.woman {
								border: 1px solid #F87FA3;
							}
						}
						image.sex {
							width: 24rpx;
							height: 24rpx;
							position: absolute;
							bottom: 0;
							right: 0;
						}
						text {
							width: 72rpx;
							overflow: hidden;
							padding-top: 6rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
				.shouqi {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					background-color: rgb(0 0 0 / 50%);
					color: #fff!important;
					display: flex;
					text-align: center;
					align-items: center;
					justify-content: center;
					font-size: 24rpx!important;
				}
			}
				
			&.descption {
				font-size: 28rpx;
				font-weight: 400;
				line-height: 40rpx;
				color: #222222;
				.title {
					font-size: 32rpx;
					font-weight: 600;
					line-height: 45rpx;
					color: #222222;
					padding-bottom: 32rpx;
				}
			}
		}

		.submit {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			z-index: 9;
			background-color: #fff;
			padding: 32rpx;
			box-sizing: border-box;
			box-shadow: 0 0 4rpx #eee;
			display: flex;
			flex-direction: row;
			gap: 24rpx;
			justify-content: space-between;

			button {
				border-width: 0;
				border-radius: 48rpx;
				background-color: #222;
				color: #fff;
				font-size: 28rpx;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 88rpx;
				&:after {
					display: none;
				}
			}
			
			button.outline {
				background-color: transparent;
				border: 1px solid #4A4A4A;
				color: #222222;
				image {
					margin-right: 16rpx;
				}
			}
			
			button.outline-gray {
				border: 1px solid #A3A3A3;
				color: #A3A3A3;
			}
			button.disabled, button.gray {
				background-color: #F5F5F5;
				color: #A8A8A8;
			}
			
			image {
				width: 40rpx;
				height: 40rpx;
			}

			.button-hover {
				opacity: .8;
			}
		}

		.update {
			display: flex;
			flex-direction: column;
			margin-top: 32rpx;
			border: 1px solid #eee;
			border-radius: 16rpx;
			padding: 24rpx 32rpx;

			&.active {
				border: 1px solid #00C4EF;
				background-color: #E3F7FF;
			}

			&-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 600;
				padding-bottom: 20rpx;
				color: #222;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}

			&-desc {
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				color: #646464;
			}
		}
		
		.view-apply-people {
			padding: 32rpx 0;
			> view {
				display: flex;
				align-items: center;
				color: #222;
				font-size: 28rpx;
				padding: 32rpx 0;
				border-bottom: 1px solid #eee;
				&.last-child {
					border-bottom: 0;
				}
				.avator {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
				}
				text {
					padding: 0 16rpx;
				}
				.sex {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}

		.apply-popup {
			display: flex;
			align-items: center;
			flex-direction: column;
			max-height: 70vh;
			overflow-y: auto;
			padding: 0 32rpx;
			.apply-popup-content {
				margin: 32rpx 0;
				display: flex;
				background-color: #F5F5F5;
				padding: 24rpx;
				border-radius: 12px;
				.details-content {
					padding-top: 0;
				}
				.image {
					width: 144rpx;
					height: 144rpx;
					margin-right: 34rpx;
					image {
						border-radius: 12px;
						width: 144rpx;
						height: 144rpx;
					}
				}
				.date {
					padding-bottom: 0;
				}
				.location {
					padding-bottom: 6rpx;
				}
				&.confirm {
					background-color: #FFF7E2;
					text {
						color: #222;
					}
				}
			}
			.apply-popup-line {
				color: #222;
				width: 100%;
				font-size: 24rpx;
				>view {
					padding-bottom: 8rpx;
				}
				.big {
					padding-left: 8rpx;
					font-size: 40rpx;
					line-height: 56rpx;
					font-weight: 600;
				}
				.gray {
					color: #A3A3A3;
				}
				&.confirm {
					.title {
						font-size: 28rpx;
						color: #222;
						font-weight: 600;
						padding-bottom: 8rpx;
					}
					.desc {
						line-height: 40rpx;
						color: #646464;
						font-size: 28rpx;
					}
				}
			}
			.protocols {
				padding-top: 48rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				font-size: 28rpx;
				width: 100%;
				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
				.blue {
					color: #004F99;
				}
			}
			.submit {
				padding-bottom: 0;
				position: relative;
				width: 100%;
				box-sizing: border-box;
				padding-left: 0;
				padding-right: 0;
			}
		}
		.price {
			position: fixed;
			left: 0;
			height: 76rpx;
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFF7E2;
			color: #646464;
			z-index: 9;
			.big {
				color: #FF8F50;
				font-size: 32rpx;
				line-height: 44rpx;
				font-weight: 600;
				padding-left: 6rpx;
			}
			&.price-gray {
				.big {
					color: #A3A3A3;
				}
			}
		}
	}
</style>