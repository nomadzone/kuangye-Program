
<template>
    <div class="webview">
        <web-view :src="url"></web-view>
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
    }
}
</script>
<style scoped>
.webview {
    widows: 100vw;
    height: 100vh;
}
</style>