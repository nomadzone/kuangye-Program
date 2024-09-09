<template>
	<view class="partner-add-page" >
		<custom-nav-bar title="发布找搭子" :navBarStyle="navBarStyle" theme="dark"></custom-nav-bar>
		<image class="corner-img" src="../../static/images/corner-icon.svg"></image>
		<view class="release-form-box">
			<textarea class="content-textarea" auto-height placeholder="有没有人浅咖一下？" :maxlength="30"/>
			<view class="imgs-box">
				<view class="item img-upload-btn">
					<image class="add-img-icon" src="../../static/images/add.svg"></image>
					<text class="add-img-text">添加图片</text>
					<text class="add-img-text">(选填)</text>
				</view>
			</view>
			
			
		</view>
		<View class="footer-actions">
			<button class="submit-btn">发布</button>
		</View>
	</view>
</template>

<script setup>
	import CustomNavBar from '@/components/CustomNavBar/CustomNavBar.vue';
	import {ref} from 'vue'
	const navBarStyle = {
		position: 'relative',
		color:'rgba(34, 34, 34, 1)'
	}
	let location = ref('')
</script>

<style lang="scss" scoped>
	.partner-add-page {
		width: 100vw;
		height: 100vh;
		background: linear-gradient(180deg, #E3F7FF 2.62%, #F6F5F5 63.23%);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: relative;
		.corner-img {
			width: 208rpx;
			height: 208rpx;
			top: 82rpx;
			left: 78rpx;
			z-index: 10;
			position: absolute;
		}

		.release-form-box {
			z-index: 11;
			margin: 32rpx;
			background-color: #ffffff;
			border-radius: 24rpx;
			padding: 32rpx 24rpx;
			
			.imgs-box {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: 32rpx;
				.item {
					width: 200rpx;
					height: 200rpx;
					border-radius: 12rpx;
					opacity: 0px;
					margin-bottom: 12rpx;
					margin-right: 12rpx;
				}
				.img-upload-btn {
					background-color: rgba(245, 245, 245, 1);
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.add-img-icon{
						width: 40rpx;
						height: 40rpx;
						margin-bottom: 12rpx;
						
					}
					.add-img-text {
						font-family: PingFang SC;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 28rpx;
						text-align: center;
						color: rgba(163, 163, 163, 1);
					}
				}
			}
			
			
			.content-textarea {
				//styleName: 正文-普通;
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 400;
				text-align: left;
				min-height: 260rpx;

			}
			
			.location-row {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.map-icon{
					width: 32rpx;
					height: 32rpx;
					margin-right: 4rpx;
					
					
				}
				.location  {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					color: rgba(163, 163, 163, 1);
					.location-text {
						//styleName: 正文-普通;
						font-family: PingFang SC;
						font-size: 28rpx;
						font-weight: 400;
						text-align: left;

					}
					.location-select-icon {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
	
		.footer-actions {
			position: fixed;
			bottom: 0rpx;
			right: 0rpx;
			left: 0rpx;
			height: 220rpx;
			background-color: #ffffff;
			padding: 32rpx;
			box-sizing: border-box;
			.submit-btn {
				background-color: rgba(34, 34, 34, 1);
				color: #ffffff;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				text-align: center;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 100rpx;

			}
			
		}
	}
</style>