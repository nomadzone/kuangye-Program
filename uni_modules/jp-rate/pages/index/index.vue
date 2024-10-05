<template>
	<div class="switchx">
		<view class="pan">
			<view class="hader">基础用法</view>
			<view class="rate">
				默认 <jp-rate></jp-rate>
			</view>
			<view class="rate">
				自定义颜色 <jp-rate defaultColor="#c9e8ff" activeColor="#00aaff"></jp-rate>
			</view>
			<view class="rate">
				自定义图标 <jp-rate icon="icon-remen1"></jp-rate>
			</view>
			<view class="rate">
				改变数量 <jp-rate :max="8" icon="icon-remen1" defaultColor="#ffc7c7" activeColor="#ff0000"></jp-rate>
			</view>
			<view class="rate">
				改变大小 <jp-rate fontSize="40px" icon="icon-xiaolian"></jp-rate>
			</view>
		</view>
		<view class="pan">
			<view class="hader">可以用图标</view>
			<view class="rate">
				<jp-rate class="item" :max="1" :value="1" v-for="item in iconList" :icon="item"></jp-rate>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				iconList: ["icon-remen",
					"icon-shandian",
					"icon-shoucang2",
					"icon-remen1",
					"icon-shezhi",
					"icon-shu",
					"icon-huangguan1", "icon-shanshuo", "icon-chijing", "icon-nu",
					"icon-shengqi", "icon-bishi", "icon-shoucang",
					"icon-xiai", "icon-yuyin", "icon-erji",
					"icon-wancheng", "icon-huangguan", "icon-weiju",
					"icon-feng", "icon-lieri", "icon-dianzan-mian",
					"icon-kulian", "icon-xiaolian", "icon-ios-thumbs-down",
					"icon-sharpicons_grain", "icon-tishi", "icon-jiankang",
					"icon-yiliaobaozhang", "icon-liangdujian", "icon-liangdujia",
					"icon-shoucang1", "icon-yinliangda", "icon-dianya",
					"icon-duihao"
					"
				]
			};
		},
	};
</script>
<style scoped lang="scss">
	.switchx {
		.hader {
			line-height: 80rpx;
			font-weight: 700;
		}

		.pan {
			padding: 0 20rpx;
		}

		.rate {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			line-height: 30px;
			color: #666;
			padding: 15rpx 0;
		}

		.item {
			padding: 10rpx;
		}
	}
</style>