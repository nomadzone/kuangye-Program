<template>
	<view class="page details">
		<Navbar :title="'票夹'"></Navbar>
		<Gradual :background="'linear-gradient(to bottom, #fefbda, #f5f5f5)'" :height="'100vh'" :zIndex="'-1'" />
		<view style="z-index: 6;margin-top: 64rpx;">
			<view :style="{ height: StatusBar + 'px' }"></view>
			<view style="height: 32rpx"></view>
			<image class="popu-icon" src="/static/images/details-icon.png" mode=""></image>
			<view class="items" v-for="(item, index) in firstList" :key="index">
				<view class="items-line">
					<view class="left">
						<!-- 待活动 -->
						<image v-if="item.status == 1" class="status-image"
							src="/static/images/details-status-await-active.png" mode=""></image>
						<!-- 报名中 -->
						<image v-if="item.status == 2" class="status-image"
							src="/static/images/details-status-reply.png" mode=""></image>
						<!-- 活动中 -->
						<image v-if="item.status == 3" class="status-image"
							src="/static/images/details-status-active.png" mode=""></image>
						<view class="swiper">
							<view class="swiper-container">
								<image :src="item.images[0]" class="img"></image>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="location">
							<image src="/static/images/map-pin-line.png" mode=""></image>
							<text>
								{{ item.address }}
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
				<view v-if="item.status == 1" class="items-line submit"
					style="padding-left: 0; padding-right: 0">
					<button @click="doPay(item, 1)" class="fill" :class="[ countdowns[item.id] == countdownsDis ? 'diasbled' : '' ]" hover-class="button-hover">
						<text>{{ countdowns[item.id] }}</text>
						<text style="padding: 0 20rpx;color: #525252">|</text>
						<text>去支付</text>
					</button>
				</view>
				<!-- 待活动 -->
				<view v-if="item.status == 2" class="div-cneter items-line submit"
					style="padding-left: 0; padding-right: 0">
					<view class="cancel" @click="doCancel(item)">
						<text>取消报名</text>
						<image src="/static/images/arrow-right.png" mode=""></image>
					</view>
				</view>
				<!-- 活动中 -->
				<view v-if="item.status == 3" class="div-cneter items-line submit"
					style="padding-left: 0; padding-right: 0">
					<view class="cancel cancel-desc">
						<text>活动已开始，无法取消</text>
						<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="expired" v-if="lastList.length != 0 && firstList.length != 0 " @click="lastOpen = !lastOpen">
				<text>查看已失效活动</text>
				<image v-if="!lastOpen" src="/static/images/bottom.png" mode=""></image>
				<image v-if="lastOpen" class="top" src="/static/images/top.png" mode=""></image>
			</view>

			<view v-if="lastOpen">
				<view class="items" v-for="(item, index) in lastList" :key="index">
					<view class="items-line">
						<view class="left">
							<!-- 活动中 -->
							<image v-if="item.status == 4" class="status-image"
								src="/static/images/details-status-ending.png" mode=""></image>
							<!-- 已结束 -->
							<image v-if="item.status == 5" class="status-image"
								src="/static/images/details-status-end.png" mode=""></image>
							<view class="swiper">
								<view class="swiper-container">
									<image :src="item.images[0]" class="img"></image>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="title">
								{{ item.title }}
							</view>
							<view class="location">
								<image src="/static/images/map-pin-line.png" mode=""></image>
								<text>
									{{ item.address }}
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
					<!--  已失效 -->
					<view v-if="item.status == 4" class="lose items-line submit"
						style="padding-left: 0; padding-right: 0">
						<button @click="doResetApply(item)" class="fill" hover-class="button-hover">
							<text>重新报名</text>
						</button>
					</view>
				</view>
			</view>
			
			<view v-if="firstList.length == 0 && lastList.length == 0 && !isInit">
				<Empty></Empty>
			</view>

		</view>


		<!--  取消报名 -->
		<PoupWrap :show='applyPopup' @close='applyPopup = false' :rightText='""'
			:title='popupTypeApply == "0" ? "确认报名" : "取消报名"' @save='doApplyPopup'>
			<view class="apply-popup">
				<view class="apply-popup-content" :class="[popupTypeApply == '0' ? 'confirm' : '']">
					<view class="image">
						<image v-if="details.images" :src="details.images[0]" mode=""></image>
					</view>
					<view class="details-content">
						<view class="title">
							{{ details.title }}
						</view>
						<view class="location">
							<image src="/static/images/map-pin-line.png" mode=""></image>
							<text>
								{{ details.address }}
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
							<text>退款</text>
							<text class="big">¥{{ details.price }}</text>
						</view>
						<view class="gray">
							活动开始12小时前取消，可全额退款
						</view>
					</view>
					<view class="submit">
						<button class="outline" @click="applyPopup = false" hover-class="button-hover">
							<image src="/static/images/wechat-fill-black.png" mode=""></image>
							<text>继续撒野</text>
						</button>
						<button @click="doCancelRefund" class="fill" hover-class="button-hover">
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
						<button class="fill" hover-class="button-hover" @click="doPay(null, 3)">
							<text>¥{{ details.price }}/人</text>
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
	import Empty from '@/components/Empty/index.vue';
	import http from '@/utils/http.js';
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
			ListLoading,
			Empty
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

				firstList: [], // 用于展示的列表数据
				lastList: [],
				isInit: true,
				lastOpen: false,
				countdownsDis: '已超时',
				countdowns: {} // 用于存储每个订单的倒计时时间
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getList(); // 重新加载数据
		},
		created() {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
			this.navHeight = uni.getStorageSync('navBarHeight')
		},
		methods: {
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
			formatDateTime(dateString) {
				const date = new Date(dateString);
				// 获取月份和日期
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');

				// 获取时间
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');

				// 获取星期几
				const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
				const dayOfWeek = `周${weekDays[date.getDay()]}`;
				return {
					date: `${month}-${day}(${dayOfWeek})`,
					time: `${hours}:${minutes}`
				}
			},
			async getList() {
				// 模拟请求数据
				let res = await http.orderWallet()
				if (res.code === '200') {
					let list = [
						...res.data,
						// {
						// 	"title":"大雁塔飞盘挑战赛",
						// 	"status":1,
						// 	"address":"广东省深圳市宝安区创业一路",
						// 	"buinssType":0,
						// 	"business_id":null,
						// 	"id":"6a66e7c5-b6ba-4272-b09b-5023a3a6a57a",
						// 	"images":"http://120.26.208.147:19000/ky-images/1726836110420.png",
						// 	"startdate":"2024-09-23 00:00:00",
						// 	"payEndTime":null
						// },
						// {
						// 	"title":"大雁塔飞盘挑战赛",
						// 	"status":2,
						// 	"address":"广东省深圳市宝安区创业一路",
						// 	"buinssType":0,
						// 	"business_id":null,
						// 	"id":"6a66e7c5-b6ba-4272-b09b-5023a3a6a57a",
						// 	"images":"http://120.26.208.147:19000/ky-images/1726836110420.png",
						// 	"startdate":"2024-09-23 00:00:00",
						// 	"payEndTime":null
						// },
						// {
						// 	"title":"大雁塔飞盘挑战赛",
						// 	"status":3,
						// 	"address":"广东省深圳市宝安区创业一路",
						// 	"buinssType":0,
						// 	"business_id":null,
						// 	"id":"6a66e7c5-b6ba-4272-b09b-5023a3a6a57a",
						// 	"images":"http://120.26.208.147:19000/ky-images/1726836110420.png",
						// 	"startdate":"2024-09-23 00:00:00",
						// 	"payEndTime":null
						// },
						// {
						// 	"title":"大雁塔飞盘挑战赛",
						// 	"status":4,
						// 	"address":"广东省深圳市宝安区创业一路",
						// 	"buinssType":0,
						// 	"business_id":null,
						// 	"id":"6a66e7c5-b6ba-4272-b09b-5023a3a6a57a",
						// 	"images":"http://120.26.208.147:19000/ky-images/1726836110420.png",
						// 	"startdate":"2024-09-23 00:00:00",
						// 	"payEndTime":null
						// },
						// {
						// 	"title":"大雁塔飞盘挑战赛",
						// 	"status":5,
						// 	"address":"广东省深圳市宝安区创业一路",
						// 	"buinssType":0,
						// 	"business_id":null,
						// 	"id":"6a66e7c5-b6ba-4272-b09b-5023a3a6a57a",
						// 	"images":"http://120.26.208.147:19000/ky-images/1726836110420.png",
						// 	"startdate":"2024-09-23 00:00:00",
						// 	"payEndTime":null
						// }
					];
					let firstList = []
					let lastList = []
					list.map(item=> {
						item.status = item.wallet_status
						// 待支付
						if (item.status === 1) {
							this.initCountdown(item.id, item.payEndTime)
						}
						item.images = item.images.split(',')
						let timer = this.formatDateTime(item.startdate)
						item.date = timer.date
						item.time = timer.time
						// 1待支付，2待活动，3-活动中 4- 已失效  5，已结束
						item.statusText = {
							1: '待支付',
							2: '待活动',
							3: '活动中',
							4: '已失效',
							5: '已结束',
						}[item.status]
						if (item.status === 1 || item.status === 2 || item.status === 3) {
							firstList.push(item)
						} else {
							lastList.push(item)
						}
					})
					this.firstList = firstList
					this.lastList = lastList
					this.lastOpen = (firstList.length === 0 && lastList.length !== 0) ? true : false
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			},
			initCountdown(itemId, startdate) {
				const targetTime = new Date(startdate).getTime();
				const updateCountdown = () => {
					const currentTime = new Date().getTime();
					const timeDiff = targetTime - currentTime;
					console.log(timeDiff, 'timeDiff')
					if (timeDiff > 0) {
						const hours = Math.floor(timeDiff / (1000 * 60 * 60));
						const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
						const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

						// 更新倒计时
						this.$set(this.countdowns, itemId, `${hours}:${minutes}:${seconds}`);
					} else {
						// 倒计时结束
						this.$set(this.countdowns, itemId, this.countdownsDis);
						clearInterval(interval); // 清除定时器
					}
				};

				// 每秒更新倒计时
				const interval = setInterval(updateCountdown, 1000);
				updateCountdown(); // 立即执行一次
			},
			// 取消活动
			async doCancelRefund() {
				uni.showLoading({
					title: '加载中...', // 提示框标题
					mask: true          // 是否显示透明蒙层，防止触摸穿透
				});
				let res = await http.activityRefund({
					orderId: this.details.id
				})
				uni.hideLoading();  // 隐藏加载提示框
				this.applyPopup = false;
				uni.showToast({
					title: res.code == '200' ? '取消成功' : res.msg,
					icon: 'none'
				})
				this.getList()
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
			async doPay(item, type) {
				const _this = this;
				if (type == 3 && !this.isReady) {
					uni.showToast({
						title: '请点击同意',
						icon: 'none'
					})
					return;
				} else if (type === 1 && this.countdowns[item.id] === this.countdownsDis) {
					uni.showToast({
						title: '已超时，无法支付',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '支付中...', // 提示框标题
					mask: true          // 是否显示透明蒙层，防止触摸穿透
				});
				let res = await http.orderPay({
					id: item?.id || _this.details.id,
					type: 2
				})
				if (res.code === '200' && res.data) {
					const payParams = res.data;
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: payParams.timeStamp,
						nonceStr: payParams.nonceStr,
						package: payParams.packageVal,
						signType: payParams.signType,
						paySign: payParams.paySign,
						success: async (res)=> {
							console.log('支付成功', res);
							uni.showToast({
								title: '支付成功',
								icon: 'success'
							});
							_this.getList()
							return;
							await http.activityAdd({ activityId: item?.id || _this.details.id })
						},
						fail: function (err) {
							console.log('支付失败', err);
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							});
						}
					});
				} else {
					uni.showToast({
						title: res.msg || '支付失败',
						icon: 'none'
					});
				}
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
				box-shadow: 0;

				button {
					height: 72rpx;
					line-height: 72rpx;
				}

				.diasbled {
					background-color: #eee !important;
					color: #999 !important;
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
				width: 100%;

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

	}
	.expired {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 48rpx;
		text {
			padding-right: 4px;
		}
		image {
			position: relative;
			top: -2px;
			width: 20px;
			height: 20px;
		}
		image.top {
			top: 2px;
		}
	}
</style>