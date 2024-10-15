
<template>
    <div class="webview">
        <web-view :src="url" @message="onWebViewMessage"></web-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: ''
        }
    },
    onLoad(options) {
        this.url = options.url
    },
    methods: {
       onWebViewMessage (event) {
        console.log(event.detail.data);
       const data = event.detail.data[0];
       if (data.action === 'navigateBack') {
		http.getUserInfo().then(res => {
			uni.setStorageSync("userInfo", res.data);
			wx.navigateBack();
		})
       }
     }
    }
}
</script>
<style scoped>
.webview {
    widows: 100vw;
    height: 100vh;
}
</style>