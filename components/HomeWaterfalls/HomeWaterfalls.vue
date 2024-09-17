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
	import { formatDateText } from '@/utils/index.js'
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
		},
		created() {
		},
		methods: {
			async getList() {
				let res = await http.homeActivity({
					longitude: '77' || this.longitude,
					latitude: '38.8833' || this.latitude,
					"type": 1,
					"pageNum": 1,
					"pageSize": 10
				});	
				let list = res.data.list
				let right = []
				let left = []
				for (let i=0;i<list.length;i++) {
					list[i].image = list[i]?.images?.split(',')[0]
					list[i].startdate = formatDateText(list[i]?.startdate)
					if (list[i]?.userActivityVo) {
						if (!list[i].userActivityVo?.allImages) {
							list[i].userActivityVo.allImages = []
						} else {
							list[i].userActivityVo.allImages = list[i].userActivityVo?.allImages?.split(',')
						}
						
					}
					if (i%2 == 1) {
						right.push(list[i])
					} else {
						left.push(list[i])
					}
				}
				this.right = right
				this.left = left
				console.log(this.right, 4444)
				console.log(this.left, 444455)
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
			width: calc(50% - 10rpx);
		}
	}
</style>