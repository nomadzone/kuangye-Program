<!-- 百度身份验证外部链接 -->
<template>
	<view class="baidu-identify-webview">
		<web-view :src="identifyObj.url"></web-view>
	</view>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	let webUrl = ref('')
	
	let identifyObj = ref(null)
	
	onMounted(() => {
		uni.getStorage({
			key: 'identifyObj',
			success:(data) => {
				identifyObj.value = data.data
				console.log('identifyObj.value', identifyObj.value)
			}
		})
	})
</script>

<style>
</style>