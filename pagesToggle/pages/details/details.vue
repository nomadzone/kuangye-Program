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
					<template  v-for="(item, index) in details.apply">
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
			
			
			<view :style='{height: (navHeight / 2 + 152 + 64) + "rpx"}'></view>
			
			<view class="submit" :style='{height: (navHeight / 2 + 152) + "rpx"}'>
				<button class="outline" hover-class="button-hover">
					<image src="/static/images/wechat-fill-black.png" mode=""></image>
					<text>联系发起人</text>
				</button>
				<button class="fill" hover-class="button-hover">
					<text style="margin-right: 32rpx;">¥29/人</text>
					<text>报名</text>
				</button>
				<!-- <button class="outline" hover-class="button-hover">
					<text>取消报名</text>
				</button> -->
				<!-- <button class="gray" hover-class="button-hover">
					<text>取消报名</text>
				</button> -->
			</view>
		</view>
		

		<uv-picker title='添加活动标签' confirmText='保存' ref="pickerActive" :columns="activeList"
			@confirm="activeConfirm"></uv-picker>
		<uv-picker title='选择活动开始时间' confirmText='保存' ref="pickerStart" :columns="timeList"
			@confirm="timeStartConfirm"></uv-picker>
		<uv-picker title='选择报名截止时间' confirmText='保存' ref="pickerEnd" :columns="timeList"
			@confirm="timeEndConfirm"></uv-picker>
		<!-- 退改政策 -->
		<PoupWrap :show='zcShow' @close='zcShow = false' title='选择退改政策' @save='doReFund'>
			<view style="padding-bottom: 48rpx;">
				<view @click="doZcExpose(index)" v-for="(item, index) in zcList" :key="index" class="update"
					:class="[zcIndex == index ? 'active':'']">
					<view class="update-header">
						<view>{{ item.title }}</view>
						<view v-if="zcIndex == index">
							<image src="/static/images/checkbox.png" mode=""></image>
						</view>
					</view>
					<view class="update-desc">
						{{ item.desc }}
					</view>
				</view>
			</view>
		</PoupWrap>
		<!-- 活动人数范围 -->
		<PoupWrap :show='numShow' @close='numShow = false' title='填写活动人数' @save='doNum'>
			<view style="padding-bottom: 48rpx;" class="range">
				<view>
					<input type="number" placeholder="最小人数" v-model="minNum">
				</view>
				<view>
					~
				</view>
				<view>
					<input type="number" placeholder="最大人数" v-model="maxNum">
				</view>
			</view>
		</PoupWrap>
		<!-- 取消返回 toast -->
		<Toast :show='toastShow' @cancel='toastShow = false' @confirm='toastShow = false' title='退出后内容不保存，要退出吗？'>
		</Toast>
		<!-- 发布成功 -->
		<PublicSuccess :show='publicSuccessShow' @close='publicSuccessShow = false' @view='publicSuccessShow = false'>
		</PublicSuccess>
	</view>
</template>

<script>
	import Navbar from '@/components/Navbar/Navbar.vue';
	import Gradual from '@/components/Navbar/Gradual.vue';
	import Upload from '@/components/Upload/Upload.vue';
	import PoupWrap from '@/components/Popup/Wrap.vue';
	import PublicSuccess from '@/components/Popup/PublicSuccess.vue';
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
			PublicSuccess,
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
					minNum: '',
					maxNum: ''
				},
				toastShow: false,
				publicSuccessShow: false,
				minNum: '',
				maxNum: '',
				StatusBar: 0,
				navHeight: 0,
				zcShow: false,
				numShow: false,
				zcIndex: -1,
				zcList: [{
					title: '活动开始前12小时全额退',
					desc: `活动开始12小时前申请，退款100%
						活动开始前12小时～开始前申请，退款50%
						活动开始后，不支持退款，特殊原因协商`
				}],
				activeList: [
					[
						'飞盘',
						'羽毛球',
						'游泳',
						'酒吧',
						'篮球',
						'高尔夫',
					]
				],
				getDatesAndWeeksYear: getDatesAndWeeks(true),
				timeList: [
					getDatesAndWeeks(),
					getDayHours(),
					getDayMin()
				]
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		created() {
			this.StatusBar = uni.getStorageSync('statusBarHeight')
			this.navHeight = uni.getStorageSync('navBarHeight')
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
			doReFund() {
				if (this.zcIndex === -1 && this.info.refund) {
					this.info.refund = ''
					this.zcShow = false
					return;
				} else if (this.zcIndex === -1) {
					uni.showToast({
						title: '请选择',
						icon: 'none'
					})
					return;
				}
				this.info.refund = this.zcList[this.zcIndex].title
				this.zcShow = false
			},
			openNum() {
				this.minNum = this.info.minNum
				this.maxNum = this.info.maxNum
				this.numShow = true;
			},
			doNum() {
				let title = ''
				let maxNum = this.maxNum
				let minNum = this.minNum
				if (maxNum < minNum) {
					title = '请正确填写最小值和最大值'
				}
				if (isNaN(maxNum) || isNaN(minNum)) {
					title = '请输入数字'
				}
				if (!maxNum || !minNum) {
					title = '请输入数字'
				}
				if (title) {
					uni.showToast({
						title,
						icon: 'none'
					})
					return;
				}
				this.info.minNum = this.minNum
				this.info.maxNum = this.maxNum
				this.numShow = false
			},
			doZcExpose(index) {
				this.zcIndex = index === this.zcIndex ? -1 : index
			},
			activeOpen() {
				this.$refs.pickerActive.open();
			},
			timeStartOpen() {
				this.$refs.pickerStart.open();
			},
			timeEndOpen() {
				this.$refs.pickerEnd.open();
			},
			activeConfirm(e) {
				console.log(e)
				this.info.tag = e.value[0]
			},
			timeStartConfirm(e) {
				console.log(this.getDatesAndWeeksYear)
				console.log(e)
				let value = e.value
				let date = this.getDatesAndWeeksYear.filter(item => item.indexOf(value[0]) !== -1)[0]
				let day = date.split(' ')[0]
				let week = date.split(' ')[1]
				this.info.startTime = `${day}(${week}) ${value[1]}${value[2]}`
				this.info.startTimeShow = `${value[0].split(' ')[0]}(${week}) ${value[1]}${value[2]}`
			},
			timeEndConfirm(e) {
				console.log(this.getDatesAndWeeksYear)
				console.log(e)
				let value = e.value
				let date = this.getDatesAndWeeksYear.filter(item => item.indexOf(value[0]) !== -1)[0]
				let day = date.split(' ')[0]
				let week = date.split(' ')[1]
				this.info.endTime = `${day}(${week}) ${value[1]}${value[2]}`
				this.info.endTimeShow = `${value[0].split(' ')[0]}(${week}) ${value[1]}${value[2]}`
			}
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

		.module {
			position: relative;
			background-color: #fff;
			border-radius: 16rpx;
			width: 100%;
			padding: 32rpx 24rpx;
			margin-bottom: 24rpx;
			z-index: 6;
			box-sizing: border-box;
			
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
			align-items: center;
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

		.range {
			display: flex;
			align-items: center;
			justify-content: space-around;
			gap: 10rpx;
			padding: 40rpx 0;

			>view {
				flex: 1;
			}

			>view:nth-child(2) {
				flex: 0 0 60rpx;
				text-align: center;
			}

			input {
				height: 108rpx;
				border-radius: 16rpx;
				background-color: #F5F5F5;
				border: 1px solid #F5F5F5;
				padding: 36rpx 32rpx;
				box-sizing: border-box;

				&:active,
				&:visited {
					border: 1px solid #222;
				}
			}
		}
	}
</style>