<template>
	<view class="item" :class="[`item-bg-${item.type}`]" v-for="(item, index) in list" :key="index" @click="doItem(item, index)">
		<view class="image" v-if="item.type != '3'">
			<image :src="item.image" mode=""></image>
		</view>
		<view class="item-body">
			<view class="title">
				<text class="da-tag" v-if="item.type == '3'">找搭子</text>
				<text>{{ item.title }}</text>
			</view>
			<view class="creater">
				<view>
					<image :src="item.createrAvator" mode=""></image>
					<text>{{ item.creater }}</text>
				</view>
				<view class="like" v-if='item.type == 2'>
					<image src="../../static/images/like.png" mode=""></image>
					<text>{{item.like}}</text>
				</view>
			</view>
			<view class="desc" v-if="item.type != '2'">
				<view class="gap">{{ item.gap }}</view>
				<view>{{ item.time }}</view>
			</view>
			<view class="remain" v-if="item.type == '1'">
				<view class="imgs" :style="{width: `${item.remainAvators.length*(32-10)}rpx`}" >
					<view class="img" v-for="(img, i) in item.remainAvators" :key="i">
						<image :style="{left: -(i*6) + 'px'}" :src="img" mode=""></image>
					</view>
				</view>
				<view class="num">{{ item.remain }}</view>
			</view>
			<view class="btn-group" v-if="item.type == '1'">
				<button hover-class="hover-class" @click.stop="doButton(item, index)">
					<text>¥{{item.price}}/人</text>
					<text>报名</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	methods: {
		doButton(item, index) {
			this.$emit('doButton', item, index)
		},
		doItem(item, index) {
			this.$emit('doItem', item, index)
		}
	}
}
</script>

<style lang="scss" scoped>
	.active {
		flex: 0 0 calc(50% - 8rpx);
	}
	.hover-class {
		opacity: .8;
	}
	.item-bg-1 {
		background-color: #FFF7E2;
	}
	.item-bg-2 {
		background-color: #E3F7FF;
	}
	.item-bg-3 {
		background-color: #E1FFF8;
	}
	.item {
		border-radius: 24rpx;
		margin-bottom: 16rpx;
		overflow: hidden;
		.image {
			height: 224rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.item-body {
			padding: 8rpx 16rpx;
		}
		.title {
			display: flex;
			align-items: center;
			line-height: 56rpx;
			color: #121212;
			font-size: 32rpx;
			font-weight: 600;
			  display: -webkit-box;
			  -webkit-box-orient: vertical;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  -webkit-line-clamp: 2;
			  line-clamp: 2;
		}
		.da-tag {
			position: relative;
			top: -4rpx;
			margin-right: 4rpx;
			padding: 4rpx 12rpx;
			border-radius: 24rpx;
			background-color: #00C4EF;
			z-index: 2;
			font-size: 24rpx;
			color: #fff;
		}
		.creater {
			padding: 8rpx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			> view {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.like {
				display: flex;
				flex-direction: row;
				align-items: center;
				image {
					width: 28rpx;
					height: 28rpx;
				}
				text {
					padding-left: 0;
					overflow: inherit;
				}
			}
			image {
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				flex: 0 0 32rpx;
			}
			text {
			  display: -webkit-box;
			  -webkit-box-orient: vertical;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  -webkit-line-clamp: 1;
			  line-clamp: 1;
			  color: #646464;
			  padding-left: 8rpx;
			  font-size: 28rpx;
			}
		}
		.desc {
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		    color: #646464;
			.gap {
				padding-right: 16rpx;
				border-right: 1px solid #ccc;
				margin-right: 16rpx;
			}
		}
		.remain {
			padding: 8rpx 0;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		    color: #646464;
			.imgs {
				position: relative;
				top: 4rpx;
				display: flex;
				image {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					position: relative;
				}
			}
			.num {
				padding-left: 16rpx;
			}
		}
	}
	.btn-group {
		padding: 8rpx 0;
		button {
			height: 64rpx;
			border-radius: 48rpx;
			background-color: #121212;
			color: #fff;
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text:first-child {
				position: relative;
				padding-right: 32rpx;
				&::before {
					content: '';
					position: absolute;
					top: 20rpx;
					right: 16rpx;
					height: 32rpx;
					width: 2rpx;
					background-color: rgba(255, 255, 255, 0.5);
				}
			}
		}
	}
	.status {
		position: absolute;
		top: 16rpx;
		left: 16rpx;
		padding: 4rpx 12rpx;
		border-radius: 24rpx;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 2;
		font-size: 24rpx;
		color: #fff;
	}
</style>