<!-- 个人资料主界面 -->
<template>
	<view class="personal-data-page">
		<view class="block-info">
			<view class="block-info-item" @click="showPopupHeader(0, '修改头像')">
				<view class="item-label">头像</view>
				<view class="item-control">
					<view class="control-text">修改</view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item" @click="showPopup(1, '修改昵称')">
				<view class="item-label">昵称</view>
				<view class="item-control">
					<view class="control-text">{{ userInfo?.nickname }}</view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item" @click="showXb">
				<view class="item-label">性别</view>
				<view class="item-control">
					<view class="control-text">{{
						userInfo?.gender == 0 ? "男" : userInfo?.gender == 1 ? "女" : "未知"
					}}</view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<picker mode="date" @change="onTimeChange" :value="userInfo?.birthdayTime">
				<view class="date-picker">
					<view class="block-info-item">
						<view class="item-label">生日</view>
						<view class="item-control">
							<view class="control-text">{{
								userInfo?.birthdayTime || "未填写"
							}}</view>
							<image class="more-icon" src="../../static/icons/more.svg"></image>
						</view>
					</view>
				</view>
			</picker>

			<view class="block-info-item" @click="showPopup(2, '修改简介')">
				<view class="item-label">简介</view>
				<view class="item-control">
					<view class="control-text">{{
						userInfo?.introduce || "暂无简介"
					}}</view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item" @click="showPopup(3, '修改联系方式')">
				<view class="item-label">联系方式</view>
				<view class="item-control">
					<view class="control-text">{{
						userInfo?.phoneNumber || "未填写"
					}}</view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
		</view>

		<view class="block-info" @click="toSettingTag">
			<view class="block-info-item">
				<view class="item-label">推荐偏好</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
		</view>
		<view class="block-info">
			<view class="block-info-item">
				<view class="item-label">用户协议</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
			<view class="block-info-item">
				<view class="item-label">隐私协议</view>
				<view class="item-control">
					<view class="control-text"></view>
					<image class="more-icon" src="../../static/icons/more.svg"></image>
				</view>
			</view>
		</view>

		<view class="page-bottom" @click="loginOut">
			<button class="change-account-btn">切换账号</button>
		</view>
		<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0" :safe-area="false">
			<view class="body">
				<image class="close-icon" src="@/static/images/partnerModalCloseIcon.svg" @click="handleClose"></image>
				<view class="title">{{ editText }}</view>
				<view class="sure-btn" @click="handleSure">确定</view>
				<view class="body-content" v-if="formAct === 1">
					<view class="input">
						<input type="text" placeholder="请输入昵称" v-model="form.nickname" />
					</view>
				</view>
				<view class="body-content" v-if="formAct === 2">
					<view class="input">
						<input type="text" placeholder="请输入简介" v-model="form.introduce" />
					</view>
				</view>
				<view class="body-content body_content_three" v-if="formAct === 3">
					<Upload :limit="1" @upload="doUploadContractImgs" />
					<view class="input" style="margin-top: 32rpx;">
						<input type="number" placeholder="请输入手机号" v-model="form.phoneNumber" />
					</view>
				</view>
			</view>
		</uni-popup>


		<uni-popup ref="popupheader" type="bottom" border-radius="10px 10px 0 0" :safe-area="false">
			<view class="body">
				<image class="close-icon" src="@/static/images/partnerModalCloseIcon.svg" @click="handleClose"></image>


				<view class="body-header">
					<button class="login-input-icon" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="img" mode="aspectFill"
							:src="result || '@/static/images/user-center-default-avatar.svg'"></image>
					</button>
				</view>
				<view class="body_btn" @click="sureHeader">确定</view>
			</view>
		</uni-popup>


		<uv-picker title="修改性别" confirmText="保存" ref="pickerActive" :columns="activeList"
			@confirm="activeConfirm"></uv-picker>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import http from "@/utils/http.js";
import { prefixUrl } from "@/utils/fetch.js";
import Upload from "@/components/Upload/Upload.vue";

const popup = ref(null);
const pickerActive = ref(null);
const pickerStart = ref(null);
const popupheader = ref(null);
const activeList = [["男", "女"]];

const userInfo = ref({});
const form = ref({});
const formAct = ref(null);
const editText = ref("");
const result = ref('');
onShow(() => {
	getUserInfo();
});
function getUserInfo() {
	http.getUserInfo().then((res) => {
		userInfo.value = res.data;
	});
}
function showBirDay() {
	pickerStart.value.open();
}
const doUploadContractImgs = (imgs) => {
	form.value.contactphoto = imgs[0]
}
function activeConfirm(e) {
	console.log(e.indexs[0]);
	http.updateUserInfo({ gender: e.indexs[0] }).then((res) => {
		if (res.code === "200") {
			uni.showToast({
				title: "修改成功",
				icon: "success",
				duration: 2000,
			});
			pickerActive.value.close();
			getUserInfo();
		}
	});
}
function showPopupHeader(e) {
	result.value = userInfo.value.avatarUrl
	popupheader.value.open();
}
function onTimeChange(e) {
	http.updateUserInfo({ birthdayTime: e.detail.value }).then((res) => {
		if (res.code === "200") {
			uni.showToast({
				title: "修改成功",
				icon: "success",
				duration: 2000,
			});
			pickerActive.value.close();
			getUserInfo();
		}
	});
}
function showXb() {
	pickerActive.value.open();
}

function showPopup(type, text) {
	formAct.value = type;
	editText.value = text;
	form.value = {};
	popup.value.open();
}
function handleClose() {
	popup.value?.close();
	popupheader.value?.close();
}

async function onChooseAvatar(e) {
	try {
		uni.showLoading({
			title: '上传中...'
		})
		const res = await uni.uploadFile({
			filePath: e?.detail?.avatarUrl || '',
			name: 'file',
			url: `${prefixUrl}/oss/upload`,
			header: {
				"Content-Type": "multipart/form-data",
				token: uni.getStorageSync("token"),
			}
		})
		const results = JSON.parse(res.data)
		result.value = results.data
	} catch (err) {
		uni.showToast({ title: '上传失败', icon: 'none' })
	} finally {
		uni.hideLoading()
	}
}
function sureHeader() {
	http.updateUserInfo({ avatarUrl: result.value }).then((res) => {
		if (res.code === "200") {
			uni.showToast({
				title: "修改成功",
				icon: "success",
				duration: 2000,
			});
			popupheader.value.close();
			getUserInfo();
		}
	});
}
function loginOut() {
	uni.showModal({
		title: "提示",
		content: "确定切换账号吗？",
		success: (res) => {
			if (res.confirm) {
				uni.clearStorage();
				uni.reLaunch({
					url: "/pages/login/index"
					});
			}
		}
	});

}
function handleSure() {
	if (formAct.value === 1) {
		if (form.value.nickname === "") {
			uni.showToast({
				title: "昵称不能为空",
				icon: "none",
			});
			return;
		}
	}
	if (formAct.value === 2) {
		if (form.value.introduce === "") {
			uni.showToast({
				title: "简介不能为空",
				icon: "none",
			});
			return;
		}
	}
	if (formAct.value === 3) {
		if (form.value.phoneNumber === "") {
			uni.showToast({
				title: "联系方式不能为空",
				icon: "none",
			});
			return;
		}
		// 正则
		if (!/^1[1-9]\d{9}$/.test(form.value.phoneNumber)) {
			uni.showToast({
				title: "请输入正确的手机号",
				icon: "none",
			});
			return;
		}
	}
	http.updateUserInfo(form.value).then((res) => {
		if (res.code === "200") {
			uni.showToast({
				title: "修改成功",
				icon: "success",
				duration: 2000,
			});
			popup.value.close();
			getUserInfo();
		}
	});
}
// 设置偏好
function toSettingTag() {
	uni.navigateTo({
		url: "/pagesUserPreferences/pages/tags/index?data=" + 'true'
	});
}
</script>

<style lang="scss" scoped>
@import "@/static/config.scss"; // 注意相对路径

.personal-data-page {
	height: 100vh;
	padding: 32rpx;
	background-color: $Color-B-5;
	padding-bottom: 240rpx;

	.block-info {
		border-radius: 32rpx;
		background-color: #fff;
		padding: 0rpx 32rpx;
		box-sizing: border-box;

		&:not(:last-child) {
			margin-bottom: 16rpx;
		}

		.block-info-item {
			height: 104rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid $Color-B-5;

			&:last-child {
				border-bottom: 0rpx;
			}

			.item-label {
				font-family: PingFang SC;
				font-size: 28rpx;
				font-weight: 600;
				color: $Color-B-1;
			}

			.item-control {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;

				.control-text {
					font-family: PingFang SC;
					font-size: 28rpx;
					font-weight: 400;
					color: #979c9e;
				}

				.more-icon {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}

	.page-bottom {
		position: fixed;
		height: 220rpx;
		background-color: #ffffff;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 32rpx 32rpx 0rpx 32rpx;

		.change-account-btn {
			border-radius: 100rpx;
			background-color: $Color-B-1;
			color: #ffffff;
			font-family: PingFang SC;
			font-size: 28rpx;
			font-weight: 600;
			height: 88rpx;
			line-height: 88rpx;
		}
	}
}

.body {
	padding: 24rpx 32rpx 0rpx 32rpx;
	border-radius: 32rpx 32rpx 0rpx 0rpx;
	background-color: #ffffff;
	position: relative;
	padding-top: 80rpx;
	box-sizing: border-box;
	padding-bottom: 40rpx;

	.close-icon {
		width: 56rpx;
		height: 56rpx;
		position: absolute;
		top: 24rpx;
		left: 32rpx;
		z-index: 3;
	}

	.sure-btn {
		position: absolute;
		width: 80rpx;
		height: 50rpx;
		top: 24rpx;
		right: 32rpx;
		background: #000000;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100rpx;
		color: #ffffff;
		font-size: 24rpx;
		font-weight: 600;
		z-index: 3;
	}

	.title {
		color: #212121;
		font-size: 32rpx;
		font-weight: 600;
		margin-bottom: 24rpx;
		position: absolute;
		top: 24rpx;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
	}

	.body_content_three {
		height: 400rpx !important;
	}

	.body-content {
		width: 100%;
		height: 200rpx;
		padding: 32rpx;
		box-sizing: border-box;

		.input {
			width: 100%;
			height: 108rpx;
			border: 2rpx solid #222222;
			border-radius: 16rpx;
			display: flex;
			align-items: center;

			input {
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				font-weight: 400;
				color: #222222;
				padding: 32rpx;
				box-sizing: border-box;
			}
		}
	}

	.body-header {
		width: 240rpx;
		height: 240rpx;
		border-radius: 50%;
		background-color: #ffffff;
		margin: 0 auto;

		.login-input-icon {
			width: 100%;
			height: 100%;
			padding: 0;
			background: transparent;
			border: none;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}

	.body_btn {
		width: 100%;
		height: 88rpx;
		background-color: #000000;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100rpx;
		color: #ffffff;
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 24rpx;
	}
}
</style>