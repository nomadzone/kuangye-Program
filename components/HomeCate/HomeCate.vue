<template>
	<view class="cate">
		<scroll-view 
				class="category-scroll"
				scroll-x
				:scroll-into-view="active"
			  >
				<view 
				  v-for="(category, index) in  cates" 
				  :key="index" 
				  :id="'category-' + index"
				  class="category-item" 
				  :class="{ active: active == index }"
				  @click="selectCategory(index)"
				>
				  {{ category }}
				</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				cates: ['综合','美食',' 7日近况',' 校友圈','一日游','二日游',]
			}
		},
		methods: {
			selectCategory(index) {
				this.active = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.category-scroll {
	  display: flex;
	  width: 100%;
	  white-space: nowrap;
		height: 112rpx;
		padding: 16rpx 0;
		font-family: PingFang SC;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 45rpx;
		color: #A3A3A3;
		gap: 16rpx;
	}
	
	.category-item {
	    display: inline-block;
		padding: 4rpx 24rpx;
		border-radius: 32rpx;
	    border-radius: 16px;
	    cursor: pointer;
	}
	
	.category-item.active {
		background-color: #E9E9E9;
		color: #222222;
		font-weight: 600;
	}
</style>