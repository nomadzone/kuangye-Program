<!-- 用户偏好设置主界面 -->
<template>
	<view class="user-perference-page">
		<view class="top-bk-box">
			<view class="user-avatar-box">
				<image class="avatar-img" :src="userInfo.avatarUrl"></image>
			</view>
			<image class="top-bk-img" src="../../static/images/index-top-bk.svg"></image>
			<view class="top-circle-box">

			</view>

			<view class="innder-circle-container">
				<view class="inner-box">
					<view class="scan-line"></view>
					<view class="innder-first-circle">
						<view class="innder-second-circle">

						</view>

					</view>
				</view>
			</view>
		</view>

		<view class="wellcome-box">
			<view class="user-name-row">
				<view class="name-text">Hi, {{userInfo.nickname}}</view>
				<image class="name-bk" src="../../static/images/index-wellcome-name-bottom.svg"></image>
			</view>
			<view class="wellcome-content">
				<view class="text-item">
					欢迎来到旷野
					
				</view>
				<view class="text-item">
					一入旷野 皆是自由
				</view>
				<view class="text-item">
					快速回答3个问题让我们更了解你
				</view>
				<view class="text-item">
					帮你找到属于你的新生活方式
				</view>
			</view>
		</view>
		
		<button class="submit-btn" form-type="submit">Let’s go!</button>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const userInfo = ref({})

	onMounted(() => {
		uni.getStorage({
			key: 'userInfo',
			success: function(res) {
				userInfo.value = res.data
			}
		});

	})
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径
	.user-perference-page {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;

		.top-bk-box {
			position: relative;
			height: 942rpx;

			.user-avatar-box {
				width: 132rpx;
				height: 132rpx;
				position: fixed;
				overflow: hidden;
				left: calc(50vw - 66rpx);
				top: calc(50vw + 92rpx);
				background-color: #ffffff;
				border-radius: 100%;
				z-index: 20;

				.avatar-img {
					width: 130rpx;
					height: 130rpx;
				}

			}

			.top-bk-img {
				width: 130vw;
				height: 920rpx;
				transform: rotate(11.66deg);
				position: absolute;
				top: 0;
				left: -15vw;
				right: -15vw;
				z-index: 10;
			}

			.top-circle-box {
				position: fixed;
				z-index: 11;
				left: -32rpx;
				right: -32rpx;
				top: 126rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 100%;
				width: calc(100vw + 64rpx);
				height: calc(100vw + 64rpx);
				background: linear-gradient(143.68deg, rgba(115, 84, 255, 0.2) 14.3%, rgba(0, 196, 239, 0.2) 41.51%, rgba(31, 253, 145, 0.132) 77.49%);
				transform-origin: 50% 50%;
				/* 使用scale函数进行缩放，这里以1.5倍缩放 */
				animation: scale-up 3s infinite alternate linear;

			}

			.innder-circle-container {
				position: fixed;
				z-index: 11;
				left: -32rpx;
				right: -32rpx;
				top: 126rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 100%;
				width: calc(100vw + 64rpx);
				height: calc(100vw + 64rpx);

				.inner-box {
					width: 460rpx;
					height: 460rpx;
					border-radius: 100%;
					background: conic-gradient(from 143.68deg at 50% 50%, rgba(182, 255, 64, 0.66) 0deg, rgba(31, 253, 145, 0.66) 46.8deg, rgba(0, 196, 239, 0.77) 124.2deg, rgba(115, 84, 255, 0.66) 234deg, rgba(173, 155, 255, 0.55) 304.2deg, rgba(255, 255, 255, 0) 360deg),
						linear-gradient(0deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.22));
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					animation: rotate 10s linear infinite;
					transform-origin: 'center';
					position: relative;

					.scan-line {
						border-radius: 52rpx;
						height: 22rpx;
						background: linear-gradient(75.23deg, #F4F5F5 5.76%, #EDF0F0 23.39%, #F9F6F6 42.75%, #FFFFFF 59.1%, #FFFFFF 76.3%, #FBFBFB 91.78%);
						box-shadow: 0px 2px 4.4px 0px #00000026;
						z-index: 15;
						position: absolute;
						right: 0rpx;
						left: 230rpx;
						top: 230rpx;
						transform: rotate(50deg);
						transform-origin: left;


					}

					.innder-first-circle {
						width: 352rpx;
						height: 352rpx;
						border-radius: 100%;
						border: 8rpx solid rgba(255, 255, 255, 0.4);
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						.innder-second-circle {
							width: 244rpx;
							height: 244rpx;
							border-radius: 100%;
							border: 8rpx solid rgba(255, 255, 255, 0.4);
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;
							position: relative;


						}

					}
				}
			}



		}

		.wellcome-box {
			display: flex;
			margin: 0 auto;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;
			position: relative;
			top: -80rpx;
			margin-bottom: 93rpx;
			
			
			.user-name-row {
				display: flex;
				margin: 0 auto;
				flex-direction: column;
				justify-content: center;
				align-items: flex-end;
				.name-text {
					font-family: PingFang SC;
					font-size: 48rpx;
					font-weight: 600;
					color: #121212;
					z-index: 20;
				}
				
				.name-bk {
					width: 100%;
					height: 48rpx;
					position: relative;
					top: -10px;
					z-index: 13;
				}
			}
			.wellcome-content{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				margin: 0 auto;
				
					
				.text-item{
					font-family: PingFang SC;
					font-size: 24rpx;
					color: #121212;
					font-weight: 400;
					&:not(:last-child) {
						margin-bottom: 32rpx;
					}

				}
				
			}
			
			
		}

		.submit-btn {
			width: 202rpx;
			height: 88rpx;
			min-width: var(--Buttonmin-widthlarge);
			gap: 8px;
			border-radius: var(--radiuspill);
			opacity: 0px;
			font-family: PingFang SC;
			font-size: 28rpx;
			font-weight: 600;
			text-align: center;
			line-height: 88rpx;
			background-color: $Color-B-1 ;
			color: #ffffff;
			border-radius: 50rpx
		
		
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@keyframes scale-up {
		from {
			transform: scale(1);
		}

		to {
			transform: scale(0.8);
		}
	}
</style>