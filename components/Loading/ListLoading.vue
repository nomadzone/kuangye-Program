<template>
	<view class="loading">
	  <view class="spinner"></view>
	  <text>加载中...</text>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading {
	  width: 100%;
	      padding: 10px 0;
	      text-align: center;
	      display: flex;
	      flex-direction: column;
	      justify-content: center;
	      align-items: center;
	}
	
	.loading .spinner {
	  width: 30px;
	  height: 30px;
	  border: 3px solid rgba(0, 0, 0, 0.1);
	  border-top-color: #333;
	  border-radius: 50%;
	  animation: spin 1s linear infinite;
	  margin-bottom: 16rpx;
	}
	
	text {
		color: #646464;
	}
	
	@keyframes spin {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
</style>