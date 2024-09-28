<template>
	<view class="item" :class="[`item-bg-${item.type}`]" v-for="(item, index) in list" :key="index" @click="doItem(item, index)">
		<view class="image" v-if="item.type != 3">
			<image :src="item.image" mode=""></image>
		</view>
		<view class="status-tag" v-if="item.type == 1">
			<text>{{yiqiyuan[item.status]}}</text>
		</view>
		<view class="item-body">
			<view class="title" :class="[item.type == 3 ? 'title-da' : '']">
				<text class="da-tag" v-if="item.type == 3">找搭子</text>
				<text :class="item.type == 3 ? 'ellipsis-2' : 'ellipsis'">{{ item.type == 3 ? item.describe : item.title }}</text>
			</view>
			<view class="creater">
				<view v-if="item.type != 3">
					<image :src="item.initiatorUrl" mode=""></image>
					<text>{{ item.initiatorName }}</text>
				</view>
				<view class="like" v-if='item.type == 2' @click.stop="doLike(item, index)">
					<image src="../../static/images/like.png" v-if="item.upUserStatus == 0" mode=""></image>
					<image src="../../static/images/like-s.png" v-if="item.upUserStatus == 1" mode=""></image>
					<text>{{item.like}}</text>
				</view>
			</view>
			<view class="desc" v-if="item.type != 2">
				<view class="gap no-wrap" v-if="item.distanceMeters || item.distanceMeters === 0">{{ item.distanceMeters }}km</view>
				<view  class="no-wrap">{{ item.startdate }}</view>
			</view>
			<view class="remain" v-if="item.type == 1 && item?.userActivityVo?.allImages?.length > 0">
				<view class="imgs" :style="{width: `${item.userActivityVo?.allImages.length*(32-10)}rpx`}" >
					<view class="img" v-for="(img, i) in item.userActivityVo?.allImages" :key="i">
						<image :style="{left: -(i*6) + 'px'}" :src="img" mode=""></image>
					</view>
				</view>
				<view class="num">{{ item.userActivityVo?.surplus }}</view>
			</view>
			<view class="btn-group" v-if="item.type == 1">
				<!-- @click.stop="doButton(item, index)" -->
				<button hover-class="hover-class">
					<text>¥{{item.price}}/人</text>
					<text>报名</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import constant from '@/utils/constant'

export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			yiqiyuan: constant.yiqiyuan,
		}
	},
	watch: {
		list(val1, val2) {
			console.log(val1, 'val1')
			console.log(val2, 'val2')
		}
	},
	methods: {
		doButton(item, index) {
			this.$emit('doButton', item, index)
		},
		doItem(item, index) {
			this.$emit('doItem', item, index)
		},
		doLike(item, index) {
			this.$emit('doLike', item, index)
		}
	}
}
</script>

<style lang="scss" scoped>
	.active {
		flex: 0 0 calc(50% - 10rpx);
	}
	.hover-class {
		opacity: .8;
	}
	.item-bg-1 {
		background-color: #FFF7E2;
	}
	.item-bg-2 {
		background-color: #E1FFF8;
	}
	.item-bg-3 {
		background-color: #E3F7FF;
	}
	.no-wrap {
		white-space: nowrap;
	}
	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
	.ellipsis-2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		display: block;
	}
	.item {
		border-radius: 24rpx;
		margin-bottom: 16rpx;
		overflow: hidden;
		position: relative;
		.status-tag {
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
		.image {
			height: 224rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.item-body {
			padding: 8rpx 16rpx;
			position: relative;
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
		.title-da {
			display: flex;
			flex-wrap: wrap;

		} 
		.da-tag {
			margin-right: 4rpx;
			padding: 0rpx 12rpx;
			border-radius: 24rpx;
			display: inline-block;
			line-height: 20px;
			height: 40rpx;
			background-color: #00C4EF;
			z-index: 2;
			font-size: 24rpx;
			color: #fff;
		}
		.creater {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			> view {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 8rpx 0;
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
			  font-size: 24rpx;
			}
		}
		.desc {
			font-size: 24rpx;
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