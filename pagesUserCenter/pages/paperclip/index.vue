<template>
	<view class="page details">
		<Navbar :title="'票夹'"></Navbar>
		<Gradual :background="'linear-gradient(to bottom, #fefbda, #f5f5f5)'" :height="'100vh'" :zIndex="'-1'" />
		<view style="z-index: 6;margin-top: 64rpx;">
			<view :style="{ height: StatusBar + 'px' }"></view>
			<view style="height: 32rpx"></view>
			<image class="popu-icon" src="/static/images/details-icon.png" mode=""></image>
			<view class="items" v-for="(item, index) in list" :key="index">
				<view class="items-line">
					
					<view class="left">
						<!-- 待活动 -->
						<image v-if="item.applyStatus == 1" class="status-image"
							src="/static/images/details-status-await-active.png" mode=""></image>
						<!-- 报名中 -->
						<image v-if="item.applyStatus == 2" class="status-image"
							src="/static/images/details-status-reply.png" mode=""></image>
						<!-- 活动中 -->
						<image v-if="item.applyStatus == 3" class="status-image"
							src="/static/images/details-status-active.png" mode=""></image>
						<!-- 活动中 -->
						<image v-if="item.applyStatus == 4" class="status-image"
							src="/static/images/details-status-ending.png" mode=""></image>
						<!-- 已结束 -->
						<image v-if="item.applyStatus == 5" class="status-image"
							src="/static/images/details-status-end.png" mode=""></image>
						<view class="swiper">
							<swiper class="swiper-container" circular autoplay indicator-dots
								indicator-color="rgb(255 255 255 / 40%)" indicator-active-color="#fff" interval="5000"
								duration="500">
								<swiper-item v-for="(picUrl, picIndex) in item.swiper" :key="picIndex">
									<image :src="picUrl" class="img"></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<view class="right">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="location">
							<image src="/static/images/map-pin-line.png" mode=""></image>
							<text>
								{{ item.gap }} | {{ item.location }}
							</text>
						</view>
						<view class="date">
							<image src="/static/images/date-time.png" mode=""></image>
							<text>
								{{ item.date }} | {{ item.time }}
							</text>
						</view>
					</view>
				</view>
				<!-- 待支付 -->
				<view v-if="item.applyStatus == '1'" class="items-line submit"
					style="padding-left: 0; padding-right: 0">
					<button @click="doPay" class="fill" hover-class="button-hover">
						<text>29:30</text>
						<text style="padding: 0 20rpx;color: #525252">|</text>
						<text>去支付</text>
					</button>
				</view>
				<!-- 待活动 -->
				<view v-if="item.applyStatus == '2'" class="div-cneter items-line submit"
					style="padding-left: 0; padding-right: 0">
					<view class="cancel" @click="doCancel(item)">
						<text>取消报名</text>
						<image src="/static/images/arrow-right.png" mode=""></image>
					</view>
				</view>
				<!-- 活动中 -->
				<view v-if="item.applyStatus == '3'" class="div-cneter items-line submit"
					style="padding-left: 0; padding-right: 0">
					<view class="cancel cancel-desc">
						<text>活动已开始，无法取消</text>
						<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
					</view>
				</view>
				<!--  已失效 -->
				<view v-if="item.applyStatus == '5'" class="lose items-line submit"
					style="padding-left: 0; padding-right: 0">
					<button @click="doResetApply(item)" class="fill" hover-class="button-hover">
						<text>重新报名</text>
					</button>
				</view>
			</view>
			
			<view class="empty" v-if="list.length == 0 && !isInit">
				<image src="../../static/images/empty.png" mode=""></image>
				<text>暂无数据</text>
			</view>

			<view  style="padding-bottom: 64rpx;" v-if="loading">
				<ListLoading ></ListLoading>
			</view>
		</view>


		<!--  取消报名 -->
		<PoupWrap :show='applyPopup' @close='applyPopup = false' :rightText='""'
			:title='popupTypeApply == "0" ? "确认报名" : "取消报名"' @save='doApplyPopup'>
			<view class="apply-popup">
				<view class="apply-popup-content" :class="[popupTypeApply == '0' ? 'confirm' : '']">
					<view class="image">
						<image v-if="details.swiper" :src="details.swiper[0]" mode=""></image>
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
						<view class="title">
							🔐 退改须知
						</view>
						<view class="desc">
							活动开始12小时前申请，退款100%
							活动开始前12小时～开始前申请，退款50%
							活动开始后，不支持退款，特殊原因协商
						</view>
					</view>
					<view class="protocols" v-if="popupTypeApply == '0'">
						<image @click="isReady = !isReady"
							:src="`/static/images/checkbox${isReady ? '-active' : ''}.png`" mode=""></image>
						<view>
							我已知晓并同意 <text class="blue">《活动安全声明同意书》</text>
						</view>
					</view>
					<view class="submit" style="padding-left: 0; padding-right: 0">
						<button class="fill" hover-class="button-hover">
							<text>¥29/人</text>
							<text style="padding: 0 20rpx;color: #525252">|</text>
							<text>报名</text>
						</button>
					</view>
				</template>
			</view>
		</PoupWrap>
		<!-- 取消返回 toast -->
		<Toast :show='toastShow' @cancel='toastShow = false' @confirm='toastShow = false' title='确定下架活动吗？'
			confirmText='确定下架' cancelText='再等等' />
		<!-- 报名成功 -->
		<ApplySuccess :show='publicSuccessShow' @close='publicSuccessShow = false' @view='publicSuccessShow = false' />

	</view>
</template>

<script>
	import Navbar from '@/components/Navbar/Navbar.vue';
	import Gradual from '@/components/Navbar/Gradual.vue';
	import Upload from '@/components/Upload/Upload.vue';
	import PoupWrap from '@/components/Popup/Wrap.vue';
	import ApplySuccess from '@/components/Popup/ApplySuccess.vue';
	import Toast from '@/components/Toast/Toast.vue'
	import ListLoading from '@/components/Loading/ListLoading.vue'
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
			ListLoading
		},
		data() {
			return {
				id: '',
				showApply: false,
				details: {},
				toastShow: false,
				publicSuccessShow: false,
				StatusBar: 0,
				navHeight: 0,
				isReady: false,
				popupTypeApply: '0', // 0是报名  1是取消
				viewPopup: false,
				applyPopup: false,

				list: [], // 用于展示的列表数据
				page: 1, // 当前页数
				loading: false,
				isInit: true,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.loadData(); // 重新加载数据
			// this.isInit = false
		},
		created() {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
			this.navHeight = uni.getStorageSync('navBarHeight')
		},
		onPullDownRefresh() {
			// 模拟下拉刷新数据
			this.page = 1;
			this.list = []; // 清空列表数据
			this.loadData(); // 重新加载数据
		},
		onReachBottom() {
			this.loading = true
			// 模拟上拉加载更多数据
			this.page = this.page + 1;
			this.loadData();
		},
		methods: {
			doPay() {
				uni.showToast({
					title: '去支付',
					icon: 'none'
				})
			},
			doCancel(item) {
				this.popupTypeApply = '1'
				this.applyPopup = true;
				this.details =item
			},
			doResetApply(item) {
				this.popupTypeApply = '0'
				this.applyPopup = true;
				this.details =item
			},
			loadData() {
				// 模拟请求数据
				setTimeout(() => {
					const newData = [{
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
							applyStatus: '1', // 1 待支付 2待活动 3活动中
						},
						{
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
							applyStatus: '2', // 1 待支付 2待活动 3活动中
						},
						{
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
							applyStatus: '3', // 1 待支付 2待活动 3活动中
						},
						{
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
							applyStatus: '4', // 1 待支付 2待活动 3活动中 4已失效
						},
						{
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
							applyStatus: '5', // 1 待支付 2待活动 3活动中 4已失效 已结束
						},
					];
					this.list = this.list.concat(newData);
					uni.stopPullDownRefresh(); // 停止下拉刷新动画
					this.isInit = this.list !== 0 
				}, 500);
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
		}
	}
</script>

<style lang="scss" scoped>
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
			z-index: 5;
		}


		.details-content {
			padding: 20rpx 0 0 0;
			font-family: PingFang SC;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 40rpx;
			color: #646464;

			>view {
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
			}
		}

		.items {
			margin-bottom: 48rpx;
			padding: 32rpx;
			background-color: #fff;
			border-radius: 16rpx;
			box-shadow: 0px 1px 4px 0px #0000000D;

			.items-line {
				display: flex;
				align-items: flex-start;

				.left {
					position: relative;
					width: 144rpx;
					box-sizing: border-box;
					background-color: #fff;
					border-radius: 16rpx;
					z-index: 6;
					box-sizing: border-box;

					.status-image {
						position: absolute;
						top: -66rpx;
						left: -40rpx;
						width: 160rpx;
						height: 104rpx;
						transform: rotate(4deg);
						z-index: 9;
					}

					.swiper-container {
						border-radius: 16rpx;
						overflow: hidden;
						height: 144rpx;

						image {
							width: 100%;
							height: 144rpx;
							border-radius: 16rpx;
						}
					}

				}

				.right {
					font-family: PingFang SC;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 40rpx;
					padding-left: 32rpx;
					color: #646464;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					>view {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						margin-bottom: 6rpx;
					}

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 6rpx;
					}

					.title {
						font-family: PingFang SC;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 45rpx;
						color: #222;
						margin-bottom: 16rpx;
					}

					.date {
						margin-bottom: 0;
					}
				}
			}

			.submit {
				position: relative;
				padding: 0;
				margin: 0;
				margin-top: 32rpx;
				width: 100%;

				button {
					height: 72rpx;
					line-height: 72rpx;
				}

				&.lose {
					button {
						background-color: #fff !important;
						color: #222 !important;
						box-shadow: 0px 0px 0px 1px #222;
					}
				}

				.cancel {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #212121;
					box-shadow: 0 0 0 0 #fff;

					image {
						width: 32rpx;
						height: 32rpx;
						position: relative;
						top: 2rpx;
					}
				}

				.cancel-desc {
					color: #A3A3A3;
				}

				&.div-cneter {
					display: flex;
					align-items: center;
					justify-content: center;
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

			button.gray {
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
		.empty {
			margin: auto;
			margin-top: 150rpx;
			text-align: center;
			width: 254rpx;
			color: #646464;
			font-size: 28rpx;
			text {
				margin-top: 10rpx;
				display: inline-block;
			}
			image {
				width: 254rpx;
				height: 216rpx;
			}
		}

	}
</style>