## 阿里矢量图-图标组件
> **组件名：jp-rate**

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

#### 有开发需求请联系 qq:371524845

###本组件是评分组件 rate 
####自定义图表数，颜色，大小，图标等。采用v-model双向绑定操作，用户使用更加方便

### 用法
```htm
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
</style>
```

### 参数
|属性名			|类型		|默认值		|说明											|
|:-:			|:-:		|:-:		|:-:											|
|value			|Number		|3			|星星值,支持.sync修饰符							|
|icon		|String		|'icon-shoucang2'			|星星图标，参考实例项目或用法中的：iconList		|
|max			|Number		|5			|最大星星数量									|
|disabled		|Boolean	|false		|是否禁用										|
|animation		|Boolean	|true		|开启手指滑动时星星的的动画效果					|
|defaultColor	|String		|'#ccc'		|默认星星颜色,同css的color						|
|activeColor	|String		|'#FFB700'	|滑选后星星颜色,同css的color					|
|fontSize		|String		|'inherit'	|星星大小					|
|margin			|String		|''			|星星间距, 可以是 1em, 10px等(注意,不支持upx)	|

### 事件
|属性名			|类型		|默认值		|说明											|
|:-:			|:-:		|:-:		|:-:											|
|@change		|EventHandle|			|星星值变化时回调,event=value					|