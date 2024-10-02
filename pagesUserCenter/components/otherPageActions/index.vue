<!-- 他人用户界面操作 -->
<template>
	<view class="other-user-page-actions-comp">
		<view class="action-item">联系TA</view>
		<view :class="follstatus==1 || props.followStatus == 1 ? 'action-item action-item-active': 'action-item'" @click="doFllow" >
		{{ follstatus==1 || props.followStatus == 1? '已关注' : '关注' }}
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from 'vue'
	import http from "@/utils/http.js";
	import {ref, watch} from 'vue'
	let props = defineProps({
		followStatus: {
			type: Number,
			default: false
		},
		info: {
			type: String,
			default: ''
			}
	})
	const follstatus = ref(props.followStatus)

	watch(props.followStatus, (newVal, oldVal) => {
		console.log('ww', watch)
		follstatus.value = newVal
		})

	async function doFllow() {
			if (follstatus.value.userFollowStatus == 1) {
				uni.showModal({
					title: '提示',
					content: '您已关注，确定要取关吗？',
					success: async (res) => {
						if (res.confirm) {
							let res = await http.fansUpdate({
								userId: props.info.id
							})
							if (res?.code == '200') {
								// 1关注成功2取关成功
								follstatus.value = res.data
								console.log(props.followStatus)
								uni.showToast({
									title: res?.data == 1 ? '关注成功' : '取关成功',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: res?.msg,
									icon: 'none'
								})
							}
						}
					}
				})
			} else {
				let res = await http.fansUpdate({
					userId: props.info.id
				})
				if (res?.code == '200') {
					// 1关注成功2取关成功
					follstatus.value = res.data
					uni.showToast({
						title: res?.data == 1 ? '关注成功' : '取关成功',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: res?.msg,
						icon: 'none'
					})
				}
			}

		}
</script>

<style lang="scss" scoped>
	
	@import "@/static/config.scss"; // 注意相对路径
	.other-user-page-actions-comp {
		display: flex;
		justify-content: space-between;
		.action-item {
			height: 72rpx;
			line-height: 72rpx;
			text-align: center;
			width: calc(50% - 24rpx);
			border-radius: 60rpx;
			border:2rpx solid $Color-B-1;
			color: $Color-B-1;
			font-size: 28rpx;
		}
		.action-item-active{
			border: 2rpx solid rgb(219, 219, 219);
		}
	}
</style>