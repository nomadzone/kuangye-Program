<template>
	<view class="follow-fans-page">
		<FollowFansTab></FollowFansTab>
		<scroll-view  :style="pageStyle">
			<FansList />
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import FollowFansTab from '@/pagesUserCenter/components/followFansTab/index.vue'
	import FansList from '@/pagesUserCenter/pages/followAndFans/fansList.vue'
	const pageStyle = ref({})
	onMounted(() => {
		
		console.log('000000000')
		uni.getSystemInfo().then(res => {
			let topValue =  (res.statusBarHeight + 41) * 2 + 'rpx'
			pageStyle.value = {
				paddingTop: (res.statusBarHeight + 41) * 2 + 'rpx',
				height: 'calc(100% - ' + topValue + ')'
			}
			console.log('pageStyle====',pageStyle.value)
		})
	})
	
</script>

<style lang="scss" scoped>
	.follow-fans-page {
		padding: 0rpx 32rpx;
	}
</style>