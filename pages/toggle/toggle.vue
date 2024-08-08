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
					<input type="text" placeholder="请填写清晰的活动标题"  placeholder-class="placeholder-style">
				</view>
				<view class="input-desc">
					<textarea row='3'  placeholder="描述一下活动亮点、活动内容、推荐人群、贴心tips等，叫大家一起野吧"   placeholder-class="placeholder-style"/>
				</view>
				<view class="input-tag">
					<view class="tag-add">
						<image src="/static/images/chat-thread-fill.png" mode=""></image>
						<text> 添加活动标签</text>
						<image src="/static/images/arrow-right-s-line.png"></image>
					</view>
				</view>
				<view class="input-opt">
					<view class="opt">
						<view>
							<image src="/static/images/map-pin-line.png" mode=""></image>
							<text> 集合地点</text>
							<image src="../../static/images/arrow-right-s-line_gray.png" mode=""></image>
						</view>
						<view></view>
					</view>
					<view class="opt">
						<view>
							<image src="/static/images/time-line.png" mode=""></image>
							<text> 活动开始时间</text>
							<image src="../../static/images/arrow-right-s-line_gray.png" mode=""></image>
						</view>
						<view></view>
					</view>
					<view class="opt">
						<view>
							<image src="/static/images/time-line.png" mode=""></image>
							<text> 报名截止时间</text>
							<image src="../../static/images/arrow-right-s-line_gray.png" mode=""></image>
						</view>
						<view></view>
					</view>
				</view>
			</view>
			<view class="module">
				<view class="line">
					<view>退款政策</view>
					<view>
						<text>活动开始前12小时全额退</text>
						<image src="../../static/images/arrow-right-s-line-black.png" mode=""></image>
					</view>
				</view>
				<view class="line">
					<view>活动人数</view>
					<view>
						<text class="line-desc">请输入参与人数范围</text>
						<image src="../../static/images/arrow-right-s-line_gray.png" mode=""></image>
					</view>
				</view>
				<view class="line">
					<view>价格（每人）</view>
					<view class="line-input">
						<input type="text" placeholder="请输入价格"  placeholder-class="placeholder-style">
					</view>
				</view>
			</view>
			<view class="module contact">
				<view class="title"> 联系方式</view>
				<view>
					<Upload :title="'添加联系微信二维码'"></Upload>
				</view>
				<view class="echat">
					<image src="../../static/images/tdesign_logo-wechat-stroke.png" mode=""></image>
					 <input type="text" placeholder="输入微信号（选填）">
				</view>
			</view>
			<view :style='{height: (navHeight / 2 + 152 + 64) + "rpx"}'></view>
			<view class="submit" :style='{height: (navHeight / 2 + 152) + "rpx"}'>
				<button class="gray" hover-class="button-hover">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Navbar from '@/components/Navbar/Navbar.vue';
	import Gradual from '@/components/Navbar/Gradual.vue';
	import Upload from '@/components/Upload/Upload.vue';
	export default {
		components: {
			Navbar,
			Gradual,
			Upload
		},
		data() {
			return {
				StatusBar: 0,
				navHeight: 0
			}
		},
		  created() {
			  this.StatusBar = uni.getStorageSync('statusBarHeight')
			  this.navHeight = uni.getStorageSync('navBarHeight')
		  },
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
					 > view {
						 display: flex;
							align-items: center;
						gap: 8rpx;
					 }
				 }
			 }
			.line {
				padding: 16rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #222;
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
					font-size: 28rpx;
					font-weight: 400;
					line-height: 40rpx;
				}
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
	}
</style>