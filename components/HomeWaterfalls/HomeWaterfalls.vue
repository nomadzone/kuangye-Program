<template>
	<view class="falls">
		<view class="fall">
			<HomeActive class="active"></HomeActive>
			<view style="height: 16rpx;"></view>
			<view class="item" :class="[item.bg]" v-for="(item, index) in left" :key="index">
				<view class="image" v-if="item.image">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="item-body">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="creater">
						<image :src="item.createrAvator" mode=""></image>
						<text>{{ item.creater }}</text>
					</view>
					<view class="desc">
						<view class="gap">{{ item.gap }}</view>
						<view>{{ item.time }}</view>
					</view>
					<view class="remain">
						<view class="imgs" :style="{width: `${item.remainAvators.length*(32-10)}rpx`}" >
							<view class="img" v-for="(img, i) in item.remainAvators" :key="i">
								<image :style="{left: -(i*6) + 'px'}" :src="img" mode=""></image>
							</view>
						</view>
						<view class="num">{{ item.remain }}</view>
					</view>
					<view class="btn-group" v-if="item.price">
						<button hover-class="hover-class">
							<text>¥{{item.price}}/人</text>
							<text>报名</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="fall">
			<view class="item" :class="[item.bg]" v-for="(item, index) in right" :key="index">
				<view class="image" v-if="item.image">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="item-body">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="creater">
						<image :src="item.createrAvator" mode=""></image>
						<text>{{ item.creater }}</text>
					</view>
					<view class="desc">
						<view class="gap">{{ item.gap }}</view>
						<view>{{ item.time }}</view>
					</view>
					<view class="remain">
						<view class="imgs" :style="{width: `${item.remainAvators.length*(32-10)}rpx`}" >
							<view class="img" v-for="(img, i) in item.remainAvators" :key="i">
								<image :style="{left: -(i*6) + 'px'}" :src="img" mode=""></image>
							</view>
						</view>
						<view class="num">{{ item.remain }}</view>
					</view>
					<view class="btn-group" v-if="item.price">
						<button hover-class="hover-class">
							<text>¥{{item.price}}/人</text>
							<text>报名</text>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HomeActive from '@/components/HomeActive/HomeActive.vue'
	export default {
		components: {
			HomeActive
		},
		data() {
			return {
				list: [],
				left: [],
				right: [],
			}
		},
		created() {
			let list = []
			for (let i =0;i<20;i++) {
				list.push({
					bg: `item-bg-${this.getRandomNumber()}`,
					image: i % 3 == 1 ? 'https://q0.itc.cn/q_70/images03/20240607/189efb6201494886a7bbb27331c40722.jpeg' : '',
					active: '报名中',
					title: '大雁塔飞盘挑战赛',
					creater: '发起人昵称发起人昵称发起人昵称发起人昵称发起人昵称',
					createrAvator: 'https://img1.baidu.com/it/u=2743623408,2506891806&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					gap: '4.2KM',
					time: '周三07.03',
					remain: '剩2位',
					remainAvators: [
						'https://img2.woyaogexing.com/2021/01/12/4bc799d86d5f41dea9f5a7e6fa9d602f%21400x400.jpeg',
						'https://img1.baidu.com/it/u=2743623408,2506891806&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						'https://img0.baidu.com/it/u=2186445683,1619498475&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
						'https://pic3.zhimg.com/v2-8df8a104ee420d9a22659222197f6ee5_r.jpg?source=1940ef5c',
						'https://p4.itc.cn/q_70/images03/20210426/a8285114423945e5b380417a6fa554cb.jpeg'
					],
					price: i % 3 == 1 ? 29 : ''
				})
			}
			this.list = list
			let right = []
			let left = []
			for (let i=0;i<list.length;i++) {
				if (i%2 == 1) {
					right.push(list[i])
				} else {
					left.push(list[i])
				}
			}
			this.right = right
			this.left = left
		},
		methods: {
			getRandomNumber() {
			  const numbers = [1, 2, 3];
			  const randomIndex = Math.floor(Math.random() * numbers.length);
			  return numbers[randomIndex];
			}
		},
	}
</script>

<style scoped lang="scss">
	.falls {
		display: flex;
		justify-content: flex-start;
		gap: 16rpx;
		flex-wrap: wrap;
		>view {
			flex: 0 0 calc(50% - 8rpx);
		}
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
			background-color: #E1FFF8;
		}
		.item-bg-3 {
			background-color: #E3F7FF;
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
			.creater {
				padding: 8rpx 0;
				display: flex;
				align-items: center;
				justify-content: flex-start;
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
	}
</style>