<template>
	<view class="page details">
		<Navbar>
			<view class="navbar">
				<image :src="details.avator" mode=""></image>
				<text>{{ details.name }}</text>
				<view class="fllow">
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
				<image class="status-image" src="/static/images/details-status-reply.png" mode=""></image>
				<!-- <image class="status-image" src="/static/images/details-status-active.png" mode=""></image>
				<image class="status-image" src="/static/images/details-status-man.png" mode=""></image>
				<image class="status-image" src="/static/images/details-status-end.png" mode=""></image> -->
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
					<swiper-item v-for="(picUrl, picIndex) in details.swiper" :key="picIndex">
					  <image :src="picUrl" class="img"></image>
					</swiper-item>
				  </swiper>
				</view>
				<view class="details-content">
					<view class="title">
						{{ details.title }}
					</view>
					<view class="date">
						<image src="/static/images/date-time.png" mode=""></image>
						<text>{{ details.date }}</text>
					</view>
					<view class="location">
						<image src="/static/images/map-pin-line.png" mode=""></image>
						<text>
							{{ details.gap }} | {{ details.location }}
						</text>
					</view>
				</view>
				<view class="map">
					<image class="map-positon" src="/static/images/positioning.png" mode=""></image>
					<image class="map-bg" src="/static/images/map-group.png" mode=""></image>
				</view>
			</view>
			
			<view class="module apply">
				<view class="apply-title">
					<view>
						<text class="big">报名人数</text>
						<text>(18/20)</text>
					</view>
					<view class="more" :class="[details.applyStatus == '0' ? 'gray' : '']">
						仅剩2个名额 >
					</view>
				</view>
				<view class="apply-content">
					<template  v-for="(item, index) in details.apply" :key="index">
						<view v-if="index < 6 || showApply" :key="index">
							<view class="avator">
								<image :class="[item.sex == '0' ? 'man' : 'woman']" :src="item.avator" mode=""></image>
								<image class="sex" v-if="item.sex == '0'" src="/static/images/man-icon.png" mode=""></image>
								<image class="sex" v-if="item.sex == '1'" src="/static/images/woman-icon.png" mode=""></image>
								<view @click="showApply = true" class="chao" v-if="details.apply.length > 6 && index == 5 && !showApply">
									<text>...</text>
								</view>
							</view>
							<text>{{ item.name }}</text>
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
					听说你是“社恐”？来玩飞盘!
					
					对于飞盘这项运动，一千个人有一千种看法。有人觉得它是年轻男女通过社群推广形成的又一波“快时尚”浪潮，也有人觉得它为企业团建破冰提供了另类选择。
					
					然而，这些都只是飞盘运动的“冰山一角”。真实的飞盘运动包含了强竞技性的极限飞盘运动与注重趣味性的有氧飞盘运动两大类别。酷飒与休闲，都是它。
					
					“以前飞盘没那么多人，所以加别的队伍比赛很正常，当时恨不得有人在问我们干什么，我们就把他拉来玩飞盘。”
				</view>
			</view>
			
			
			<view :style='{height: (navHeight / 2 + 152 + 76) + "rpx"}'></view>
			
			
			<!-- <view class="price price-gray" :style="{bottom: (navHeight / 2 + 152) + 'rpx'}">
				<view>
					<text>累计收益</text>
					<text class="big">178元</text>
				</view>
			</view> -->
			<view class="submit" :style='{height: (navHeight / 2 + 152) + "rpx"}'>
				<button class="outline" hover-class="button-hover">
					<image src="/static/images/wechat-fill-black.png" mode=""></image>
					<text>联系发起人</text>
				</button>
				<button class="fill" hover-class="button-hover">
					<text style="margin-right: 32rpx;">¥29/人</text>
					<text>报名</text>
				</button>
				<!-- 已报名，可取消 -->
				<!-- <button @click='applyPopup = true' class="outline" hover-class="button-hover">
					<text>取消报名</text>
				</button>
				<button class="gray" hover-class="button-hover">
					<text>取消报名</text>
				</button> -->
				<!-- 自己查看详情 -->
				<!-- <button class="outline" hover-class="button-hover">
					<text>下架</text>
				</button>
				<button class="outline outline-gray" hover-class="button-hover">
					<text>下架</text>
				</button>
				<button class="fill" hover-class="button-hover">
					<text>编辑</text>
				</button> -->
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
		<Toast :show='toastShow' @cancel='toastShow = false' @confirm='toastShow = false' title='确定下架活动吗？'  confirmText='确定下架' cancelText='再等等' />
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
	import Toast from '@/components/Toast/Toast.vue'
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
				toastShow: false,
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
		},
		created() {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
			this.navHeight = uni.getStorageSync('navBarHeight')
		},
		  onPullDownRefresh() {
			// 模拟请求数据
			setTimeout(() => {
			  uni.stopPullDownRefresh(); // 停止下拉刷新
			}, 2000);
		  },
		  onReachBottom() {
			  
		  },
		methods: {
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
	.page.details {
		.navbar {
			display: flex;
			z-index: 9;
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
			z-index: 5;
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
			.location {
				margin-bottom: 0;
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
				transform: translate(23deg);
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