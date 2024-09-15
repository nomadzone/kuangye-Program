<template>
	<view class="falls">
		<view class="fall">
			<HomeActive class="active" v-if="isAd"></HomeActive>
			<view style="height: 16rpx;" v-if="isAd"></view>
			<FallItem :list="right" @doButton='doButton' @doItem='doItem'></FallItem>
		</view>
		<view class="fall">
			<FallItem :list="right"></FallItem>
		</view>
	</view>
</template> 

<script>
	import HomeActive from '@/components/HomeActive/HomeActive.vue'
	import FallItem from './Fall-item.vue'
	import http from '@/utils/http.js'
	export default {
		components: {
			HomeActive,
			FallItem
		},
		props: {
			isAd: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				list: [],
				left: [],
				right: [],
			}
		},
		onShow() {
			this.getList()
		},
		created() {
			let list = []
			for (let i =0;i<20;i++) {
				list.push({
					type: this.getRandomNumber() + '', // 1 一起野 2新鲜事 3找搭子
					image: 'https://q0.itc.cn/q_70/images03/20240607/189efb6201494886a7bbb27331c40722.jpeg',
					active: '报名中',
					like: 239,
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
			async getList() {
				let res = await http.homeActivity({
					longitude: '77' || this.longitude,
					latitude: '38.8833' || this.latitude,
					"type": 1,
					"limi": 1,
					"page": 1
				});	
				console.log(res)
			},
			getRandomNumber() {
			  const numbers = [1, 2, 3];
			  const randomIndex = Math.floor(Math.random() * numbers.length);
			  return numbers[randomIndex];
			},
			doButton(item, index) {
				console.log(item, index)
			},
			doItem(item, index) {
				console.log(item, index)
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
			flex: 0 0 calc(50% - 10rpx);
		}
	}
</style>