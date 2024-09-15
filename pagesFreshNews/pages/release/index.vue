<template>
	<view class="fresh-news-release-page">
		<form @submit="handleSubmit">
			<custom-nav-bar title="发布新鲜事" :navBarStyle="navBarStyle" theme="dark"></custom-nav-bar>
			<image class="corner-img" src="../../static/images/release-corner-icon.svg"></image>
			<view class="release-form-box">
				<Upload :limit="9" @upload="doUpload"/>
				<!-- 	<view class="imgs-box">
				<view class="item img-upload-btn">
					<image class="add-img-icon" src="../../static/images/add-img-icon.svg"></image>
					<text class="add-img-text">添加图片</text>
				</view>
			</view> -->
				<input class="title-input" name="title" placeholder="标题" />
				<textarea class="content-textarea" name="describe" auto-height placeholder="介绍一下你周边好玩的事情吧" />

				<view class="location-row"  @tap="handleSelectLocation()">
					<image class="map-icon" src="../../static/images/release-location-icon.svg"></image>
					<view class="location">
						<text
							class="location-text">{{location.longitude && location.latitude ? location.address : '定位'}}</text>
						<image class="location-select-icon" src="../../static/images/release-more-icon.svg"></image>
					</view>
				</view>
			</view>

			<View class="footer-actions">
				<button class="submit-btn" form-type="submit">发布</button>

			</View>
		</form>
	</view>
</template>

<script setup>
	import CustomNavBar from '@/components/CustomNavBar/CustomNavBar.vue';
	import {
		ref
	} from 'vue'
	import FreshNewsService from '@/pagesFreshNews/service/service.js'
	import Upload from "@/components/Upload/Upload.vue";
	const navBarStyle = {
		position: 'relative',
		color: 'rgba(34, 34, 34, 1)'
	}


	let imgList = ref([]) // 图片

	let location = ref({
		longitude: null,
		latitude: null,
		address: null
	})

	const doUpload = (imgs) => {
		console.log('imgs====》》》》》', imgs)
		imgList.value = imgs
		
	}

	// 选择定位
	const handleSelectLocation = () => {
		uni.chooseLocation({
			success: function(res) {
				
				console.log('res======', res)
				location.value = {
					address: res.address + res.name,
					longitude: res.longitude,
					latitude: res.latitude
				}
			},
			fail: function(err) {
				console.log('选择位置失败：', err);
			}
		});
	}

	// 发布新鲜事
	const handleSubmit = (e) => {

		let params = {
			...e.detail.value,
			...location.value,
			type: 2,
			images: imgList.value.join(','),
		}


		console.log(params)

		FreshNewsService.add(params).then(res => {
			if(res && res.code === '200') {
				uni.showToast({
					title:'发布成功！',
					success() {
						uni.navigateBack()
					}
				})
			}
		})
	}
</script>

<style lang="scss" scoped>
	.fresh-news-release-page {
		width: 100vw;
		height: 100vh;
		background: linear-gradient(180deg, #E1FFF8 2.62%, #F6F5F5 63.23%);
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

					.add-img-icon {
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

			.title-input {
				font-family: PingFang SC;
				font-size: 32rpx;
				font-weight: 600;
				text-align: left;
				margin-bottom: 16rpx;
				margin-top: 32rpx;

			}

			.content-textarea {
				//styleName: 正文-普通;
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 400;
				text-align: left;
				min-height: 260rpx;

			}

			.location-row {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.map-icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 4rpx;


				}

				.location {
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