<!-- 百度身份验证外部链接 -->
<template>
	<view class="baidu-identify-webview">
		<web-view :src="url" @message="onWebViewMessage"></web-view>
	</view>
</template>

<script setup>
	import { onMounted, ref, onUnmounted } from 'vue';
	import http from "@/utils/http.js";
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
	
	function onWebViewMessage (event) {
       const data = event.detail.data[0];
       if (data.action === 'navigateBack') {
		http.getUserInfo().then(res => {
			uni.setStorageSync("userInfo", res.data);
			wx.navigateBack();
		})
       }
     }
		
	// const onWebviewUrlChange = (event) => {
	// 	console.log('当前URL:', event.detail);
	// 	let params = {
	// 		verifyToken: identifyObj.value.verifyToken,
	// 		accessToken: identifyObj.value.accessToken
	// 	}
	// 	identifyService.getIdentifyInfo(params).then(res => {
	// 		console.log('res===2222', res)
	// 	})
	// }
</script>

<style>
</style>