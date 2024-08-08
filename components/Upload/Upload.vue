<template>
	<view class="upload" @click="doUpload">
		<view>
			<image src="../../static/images/upload-add.png" mode=""></image>
			<text>{{ title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '添加图片'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			doUpload() {
				const _this = this;
				wx.chooseImage({
				  count: 1, // 默认9
				  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				  success: function(res) {
					var tempFilePaths = res.tempFilePaths;
					console.log(tempFilePaths);
					_this.uploadFile(tempFilePaths)
					// 上传图片到服务器的代码将在这里
				  },
				  fail: function(err) {
					console.error('选择图片失败', err);
				  }
				});
			},
			uploadFile(e) {
				// 假设tempFilePaths[0]是我们要上传的图片路径
				wx.uploadFile({
				  url: 'https://your-server.com/upload', // 你的服务器地址
				  filePath: e[0],
				  name: 'file',
				  formData: {
				    'user': 'test'
				  },
				  success: function(res) {
				    var data = res.data;
				    console.log(data);
				    // 服务器返回的数据，可以是JSON字符串或二进制数据
				    // 这里应该解析data并获取图片的URL，然后进行下一步操作
				  },
				  fail: function(err) {
				    console.error('上传图片失败', err);
				  }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload {
		background-color: #F5F5F5;
		border-radius: 12rpx;
		height: 200rpx;
		width: 200rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		> view {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		image {
			width: 40rpx;
			height: 40rpx;
		}
		text {
			padding-top: 12rpx;
			font-family: PingFang SC;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 28rpx;
			text-align: center;
			color: #A3A3A3;
			width: 120rpx;
		}
	}
</style>