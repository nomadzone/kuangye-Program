<template>
	<view class="page">
		<Navbar :title="'发布一起野'" />
		<Gradual :background="'linear-gradient(to bottom, #FFF7E2, #f5f5f5)'" :height="'100vh'" :zIndex="'-1'"/>
		<view style="z-index: 6;margin-top: 64rpx;">
			<view :style="{ height: StatusBar + 'px' }"></view>
			<view style="height: 32rpx"></view>
			<image class="popu-icon" src="/static/images/hand_icon.png" mode=""></image>
			<view class="module">
				<view>
					<Upload></Upload>
				</view>
				<view class="input-title">
					<input type="text" v-model="activity.title" placeholder="请填写清晰的活动标题"  placeholder-class="placeholder-style">
				</view>
				<view class="input-desc">
					<textarea row='3' v-model="activity.describe" placeholder="描述一下活动亮点、活动内容、推荐人群、贴心tips等，叫大家一起野吧"   placeholder-class="placeholder-style"/>
				</view>
				<view class="input-tag">
					<view class="tag-add" @click="activeOpen">
						<image src="/static/images/chat-thread-fill.png" mode=""></image>
						<text>{{ activity.label ? activity.label : '添加活动标签' }}</text>
						<image src="/static/images/arrow-right-s-line.png"></image>
					</view>
				</view>
				<view class="input-opt">
					<view class="opt" @click="openMap">
						<view>
							<image src="/static/images/map-pin-line.png" mode=""></image>
							<text> 集合地点</text>
							<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
						</view>
						<view></view>
					</view>
					<view class="opt" @click="timeStartOpen">
						<view>
							<image src="/static/images/time-line.png" mode=""></image>
							<text v-if="!activity.startdate">活动开始时间</text>
							<view class="time" v-else>活动开始: {{ activity.startdate }}</view>
							<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
						</view>
					</view>
					<view class="opt" @click="timeEndOpen">
						<view>
							<image src="/static/images/time-line.png" mode=""></image>
							<text v-if="!activity.enddate">报名截止时间</text>
							<view class="time" v-else>活动截止: {{ activity.enddate }}</view>
							<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="module" style="padding-top: 0;padding-bottom: 0;">
				<view class="line" @click="zcShow = true">
					<view>退款政策</view>
					<view>
						<text v-if='activity.refund'>{{ activity.refund }}</text>
						<text v-if='!activity.refund' style="color: #999">请选择</text>
						<!-- <image src="/static/images/arrow-right-s-line-black.png" mode=""></image> -->
						<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
					</view>
				</view>
				<view class="line" @click="openNum">
					<view>活动人数</view>
					<view>
						<text  v-if="activity.maxpeople">{{ activity.minpeople }} ~ {{ activity.maxpeople }}</text>
						<text class="line-desc" v-else>请输入参与人数范围</text>
						<image src="/static/images/arrow-right-s-line_gray.png" mode=""></image>
					</view>
				</view>
				<view class="line">
					<view>价格（每人）</view>
					<view class="line-input">
						<input type="text" placeholder="请输入价格" v-model="activity.price"  placeholder-class="placeholder-style">
					</view>
				</view>
			</view>
			<view class="module contact">
				<view class="title"> 联系方式</view>
				<view>
					<Upload :title="'添加联系微信二维码'"></Upload>
				</view>
				<view class="echat">
					<image src="/static/images/tdesign_logo-wechat-stroke.png" mode=""></image>
					 <input type="text" placeholder="输入微信号（选填）">
				</view>
			</view>
			<view :style='{height: (navHeight / 2 + 152 + 64) + "rpx"}'></view>
			<view class="submit" :style='{height: (navHeight / 2 + 152) + "rpx"}'>
				<button  hover-class="button-hover" @click="doPulish">发布</button>
				<!-- class="gray" -->
			</view>
		</view>
		
		<uv-picker title='添加活动标签' confirmText='保存' ref="pickerActive" :columns="activeList" @confirm="activeConfirm"></uv-picker>
		<uv-picker title='选择活动开始时间' confirmText='保存' ref="pickerStart" :columns="timeList" @confirm="timeStartConfirm"></uv-picker>
		<uv-picker title='选择报名截止时间' confirmText='保存' ref="pickerEnd" :columns="timeList" @confirm="timeEndConfirm"></uv-picker>
		<!-- 退改政策 -->
		<PoupWrap :show='zcShow' @close='zcShow = false' title='选择退改政策' @save='doReFund'>
			<view style="padding-bottom: 48rpx;">
				<view @click="doZcExpose(index)" v-for="(item, index) in zcList" :key="index" class="update" :class="[zcIndex == index ? 'active':'']">
					<view class="update-header">
						<view>{{ item.title }}</view>
						<view v-if="zcIndex == index">
							<image src="/static/images/checkbox-blue.png" mode=""></image>
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
					<input type="number" placeholder="最小人数" v-model="minpeople">
				</view>
				<view>
					~
				</view>
				<view>
					<input type="number" placeholder="最大人数" v-model="maxpeople">
				</view>
			</view>
		</PoupWrap>
		<!-- 取消返回 toast -->
		<Toast :show='toastShow' @cancel='toastShow = false' @confirm='toastShow = false' title='退出后内容不保存，要退出吗？'></Toast>
		<!-- 发布成功 -->
		<PublicSuccess :show='publicSuccessShow' @close='publicSuccessShow = false' @view='publicSuccessShow = false'></PublicSuccess>
	</view>
</template>

<script>
	import Navbar from '@/components/Navbar/Navbar.vue';
	import Gradual from '@/components/Navbar/Gradual.vue';
	import Upload from '@/components/Upload/Upload.vue';
	import PoupWrap from '@/components/Popup/Wrap.vue';
	import PublicSuccess from '@/components/Popup/PublicSuccess.vue';
	import Toast from '@/components/Toast/Toast.vue';
	import http from '@/utils/http.js';
	import { getDayHours, getDayMin, getDatesAndWeeks } from '@/utils/index.js'
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
				activity: {
						title: "新鲜事测试",
						describe: "", // 活动描述
						label: "个人分享",
						userId: "dd50e677-f539-4a69-9f37-57f48debbdd7",
						longitude: "111.111",
						dimension: "111.111",
						endTime: '',
						startdate: "2024-09-06 16:59:25",
						enddate: "2024-09-06 16:59:25",
						minpeople: 10,
						maxpeople: 8,
						price: 25,
						contactphoto: "0",
						wxnumber: "0",
						status: "0",
						imges: "",
						type: "2",
						refund:''
				},
				toastShow: false,
				publicSuccessShow: false,
				minpeople: '',
				maxpeople: '',
				StatusBar: 0,
				navHeight: 0,
				zcShow: false,
				numShow: false,
				zcIndex: -1,
				zcList: [
					{
						title: '活动开始前12小时全额退',
						desc: `活动开始12小时前申请，退款100%
						活动开始前12小时～开始前申请，退款50%
						活动开始后，不支持退款，特殊原因协商`
					}
				],
				activeList: [[
					'飞盘',
					'羽毛球',
					'游泳',
					'酒吧',
					'篮球',
					'高尔夫',
				]],
				getDatesAndWeeksYear: getDatesAndWeeks(true),
				timeList: [
					getDatesAndWeeks(),
					getDayHours(),
					getDayMin()
				]
			}
		},
		  created() {
			  this.StatusBar = uni.getStorageSync('statusBarHeight')
			  this.navHeight = uni.getStorageSync('navBarHeight')
		  },
		methods: {
			openMap() {
				wx.getLocation({
					 type: 'gcj02', //返回可以用于wx.openLocation的经纬度
					 success (res) {
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
				if (this.zcIndex === -1 && this.activity.refund) {
					this.activity.refund = ''
					this.zcShow = false
					return;
				} else if (this.zcIndex === -1) {
					uni.showToast({
						title: '请选择',
						icon: 'none'
					})
					return;
				}
				this.activity.refund = this.zcList[this.zcIndex].title
				this.zcShow = false
			},
			openNum() {
				this.minpeople = this.activity.minpeople
				this.maxpeople = this.activity.maxpeople
				this.numShow = true;
			},
			doNum() {
				let title = ''
				let maxpeople = this.maxpeople
				let minpeople = this.minpeople
				if (maxpeople < minpeople) {
					title = '请正确填写最小值和最大值'
				}
				if (isNaN(maxpeople) || isNaN(minpeople)) {
					title = '请输入数字'
				}
				if (!maxpeople || !minpeople) {
					title = '请输入数字'
				}
				if (title) {
					uni.showToast({
						title,
						icon: 'none'
					})
					return;
				}
				this.activity.minpeople = this.minpeople
				this.activity.maxpeople = this.maxpeople
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
				this.activity.label = e.value[0]
			},
			timeStartConfirm(e) {
				console.log(this.getDatesAndWeeksYear)
				console.log(e)
				let value = e.value
				let date = this.getDatesAndWeeksYear.filter(item=> item.indexOf(value[0]) !== -1)[0]
				let day = date.split(' ')[0]
				let week = date.split(' ')[1]
				this.activity.startTime = `${day}(${week}) ${value[1]}${value[2]}`
				this.activity.startdate = `${value[0].split(' ')[0]}(${week}) ${value[1]}${value[2]}`
			},
			timeEndConfirm(e) {
				console.log(this.getDatesAndWeeksYear)
				console.log(e)
				let value = e.value
				let date = this.getDatesAndWeeksYear.filter(item=> item.indexOf(value[0]) !== -1)[0]
				let day = date.split(' ')[0]
				let week = date.split(' ')[1]
				this.activity.endTime = `${day}(${week}) ${value[1]}${value[2]}`
				this.activity.enddate = `${value[0].split(' ')[0]}(${week}) ${value[1]}${value[2]}`
			},
			async doPulish() {
				try {
					let res = await http.activityAdd({
						title: "新鲜事测试",
						label: "个人分享",
						userId: "dd50e677-f539-4a69-9f37-57f48debbdd7",
						longitude: "111.111",
						dimension: "111.111",
						startdate: "2024-09-06 16:59:25",
						enddate: "2024-09-06 16:59:25",
						minpeople: 10,
						maxpeople: 8,
						price: 25,
						contactphoto: "0",
						wxnumber: "0",
						status: "0",
						imges: "",
						describe: "",
						type: "2"
					})
					if (res.code !== 200) {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						});
						return
					}
					this.publicSuccessShow = true
				} catch(error) {
					
				}
			}
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
		.module {
			position: relative;
			 background-color: #fff;
			 border-radius: 16rpx;
			 width: 100%;
			 padding: 32rpx 24rpx;
			 margin-bottom: 24rpx;
			 z-index: 6;
			 box-sizing: border-box;
			 .input-title {
				 padding-top: 32rpx;
				 padding-bottom: 16rpx;
				 font-family: PingFang SC;
				 font-size: 32rpx;
				 font-weight: 600;
				 line-height: 45rpx;
				 color: #222;
				 margin-bottom: 16rpx;
			 }
			 .input-desc {
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				color: #222;
				textarea {
					line-height: 1.4;
					height: 240rpx;
					margin-bottom: 16rpx;
				}
			 }
			 image {
				 width: 38rpx;
				 height: 38rpx;
			 }
			 .input-tag {
				 display: flex;
				 margin-right: 16rpx;
				 flex-wrap: wrap;
				 > view {
					 display: flex;
					 align-items: center;
					 padding: 8rpx 12rpx 8rpx 16rpx;
					 border-radius: 48rpx;
					 background-color: #E3F7FF;
					 text {
						 font-family: PingFang SC;
						 font-size: 28rpx;
						 font-weight: 400;
						 line-height: 40rpx;
						 padding: 0 8rpx;
						 color: #004F99;
					 }
				 }
			 }
			 .input-opt {
				 image {
					 width: 32rpx;
					 height: 32rpx;
				 }
				 text {
					 font-family: PingFang SC;
					 font-size: 28rpx;
					 font-weight: 400;
					 line-height: 40rpx;
					color: #a3a3a3;
				 }
				 .opt {
					 padding: 16rpx 0;
					 display: flex;
					 align-items: center;
					 justify-content: space-between;
					 font-size: 28rpx;
					 > view {
						 display: flex;
							align-items: center;
						gap: 8rpx;
					 }
					 .time {
						 color: #222222;
					 }
				 }
			 }
			.line {
				padding: 32rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #222;
				border-bottom: 1px solid #eee;
				> view {
					display: flex;
					align-items: center;
				}
				&-desc {
					color: #A3A3A3;
				}
				&-input {
					text-align: right;
					font-family: PingFang SC;
					font-size: 32rpx;
					font-weight: 400;
					line-height: 40rpx;
				}
			}
			.line:last-child {
				border-width: 0;
			}
			&.contact {
				> view {
					padding: 16rpx 0;
				}
				.echat {
					display: flex;
					gap: 8rpx;
					image {
						width: 32rpx;
						height: 32rpx;
						position: relative;
						top: 4rpx;
					}
					text {
						font-family: PingFang SC;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 40rpx;
					}
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
			button {
				border-width: 0;
				border-radius: 48rpx;
				background-color: #222;
				color: #fff; 
				&.gray {
					background-color: #F5F5F5;
					color: #A8A8A8;
				}
				&:after {
					display: none;
				}
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
				&:active, &:visited {
					border: 1px solid #222;
				}
			}
		}
	}
</style>