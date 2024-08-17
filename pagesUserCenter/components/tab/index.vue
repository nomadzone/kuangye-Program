<!-- 个人中心tab容器组件 -->
<template>
	<view class="user-center-tab-comp">
		<view class="tab-header">
			<view 
				v-for="item in tabs" 
				:key="item.key" 
				:class="activeTab  === item.key ? 'tab-item tab-item-active': 'tab-item'"
				@tap="handeChangeActiveTab(item.key)"
			>
				<image mode="widthFix" class="item-icon" :src="item.activeIcon" v-if="activeTab === item.key"></image>
				<image mode="widthFix" class="item-icon" :src="item.defaultIcon" v-else></image>
				<text :class="activeTab === item.key ? 'active-text': 'default-text'" >{{item.label}}</text>
			</view>
		</view>
		
		<view class="tab-content"></view>
	</view>
</template>
<script setup>
	import {defineProps, ref, defineEmits} from 'vue'
	let props = defineProps({
		tabs: {
			type: Array,
			default:[]
		},
		activeTab:{
			type: Number,
			default: 0
		}
	})
	const emit =  defineEmits(['changeTab'])
	
		
	// 切换tab
	const handeChangeActiveTab = (val) => {
		emit('changeTab', val)
	}

</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径
	.user-center-tab-comp{
		.tab-header{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 108rpx;
			.tab-item {
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.item-icon{
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
					
				}
				.active-text {
					color: $Color-B-1;
					font-size: 32rpx;
					font-weight: 600;
				}
				.default-text {
					color: $Color-B-3;
					font-size: 32rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>