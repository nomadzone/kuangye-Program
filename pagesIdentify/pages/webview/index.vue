<!-- 百度身份验证外部链接 -->
<template>
	<view class="baidu-identify-webview">
		<web-view :src="url" @load="onWebviewUrlChange"></web-view>
	</view>
</template>

<script setup>
	import { onMounted, ref, onUnmounted } from 'vue';
	import identifyService from '../../service/service';
	let webUrl = ref('')
	
	let identifyObj = ref(null)
	let url = ref('')
	
	onMounted(() => {
		uni.getStorage({
			key: 'identifyObj',
			success:(data) => {
				identifyObj.value = data.data
				url.value = data.data.url
			}
		})
	})
	
	onUnmounted(() => {
		let params = {
			verifyToken: identifyObj.value.verifyToken,
			accessToken: identifyObj.value.accessToken
		}
		identifyService.getIdentifyInfo(params).then(res => {
			console.log('res===1111', res)
		})
	})
	
		
	const onWebviewUrlChange = (event) => {
		console.log('当前URL:', event.detail);
		let params = {
			verifyToken: identifyObj.value.verifyToken,
			accessToken: identifyObj.value.accessToken
		}
		identifyService.getIdentifyInfo(params).then(res => {
			console.log('res===2222', res)
		})
	}
</script>

<style>
</style>