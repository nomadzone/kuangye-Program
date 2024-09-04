<!-- 发布新鲜事-评论列表组件 -->
<template>
	<view class="comment-group">
		<view class="comment-item" v-for="commentItem in commentList" :key="commentItem.id">
			<view class="left">
				<image class="avatar-img" v-if="commentItem.avatar" :src="commentItem.avatar"></image>
				<image class="avatar-img" v-else src="../../static/images/comment-default-avatar.svg"></image>
			</view>
			<view class="right">
				<view class="body">
					<view class="content">
						<view class="comment-author">
							<view class="author-name">{{commentItem.author}}</view>
							<view class="author-tag" v-if="commentItem.autherTag">作者</view>
						</view>
						<view class="content-text">{{commentItem.content}}</view>
						<view class="comment-time">
							<text class="time-text">{{commentItem.commentTime}}</text>
							<view class="relpay">回复</view>
						</view>

					</view>
					<view class="like-action">
						<image class="like-icon" v-if="commentItem.liked" src="../../static/images/comment-liked.svg">
						</image>
						<image class="like-icon" v-else src="../../static/images/comment-like.svg"></image>
						<text class="like-num">{{commentItem.likeNum}}</text>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'

	const commentList = ref([
		{ id: 0, author: 'Make zhao', avatar: null, content: '最近大好的阳光下更加出片啦…再配上新品抹茶柚子蒙布朗冰淇淋芭菲🍵', liked: true, likeNum: 28, autherTag: false, commentTime: '09:28', children: [{ author: 'Make zhao', avatar: null, content: '最近大好的阳光下更加出片啦…再配上新品抹茶柚子蒙布朗冰淇淋芭菲🍵', liked: true, likeNum: 28, autherTag: false, commentTime: '09:28' }] },
		{ id: 1, author: 'Make zhao', avatar: null, content: '最近大好的阳光下更加出片啦…再配上新品抹茶柚子蒙布朗冰淇淋芭菲🍵', liked: false, likeNum: 28, autherTag: false, commentTime: '09:28', children: [] },
		{ id: 2, author: 'Make zhao', avatar: null, content: '最近大好的阳光下更加出片啦…再配上新品抹茶柚子蒙布朗冰淇淋芭菲🍵', liked: true, likeNum: 28, autherTag: false, commentTime: '09:28', children: [] }
	])
</script>

<style lang="scss" scoped>
	@import "@/static/config.scss"; // 注意相对路径

	.comment-group {
		.comment-item {
			padding: 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;

			.left {
				width: 72rpx;
				margin-right: 24rpx;

				.avatar-img {
					width: 72rpx;
					height: 72rpx;
					border-radius: 100rpx;
				}

			}

			.right {
				width: calc(100% - 98rpx);
				border-bottom: 2rpx solid  $Color-B-4;
				padding-bottom: 24rpx;

				.body {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: flex-start;

					.content {
						width: calc(100% - 52rpx);
						.comment-author {
							display: flex;
							flex-direction: row;
							margin-bottom: 10rpx;

							.author-name {
								font-size: 28rpx;
								color: $Color-B-3;
								margin-right: 8rpx;

							}

							.author-tag {
								width: 34rpx;
								height: 36rpx;
								border-radius: 43rpx;
								opacity: 0px;
								background-color: $Color-B-5;
								line-height: 36rpx;
								font-size: 28rpx;
								text-align: center;
							}
						}

						.content-text {
							font-family: PingFang SC;
							font-size: 28rpx;
							font-weight: 400;
							line-height: 40rpx;
							text-align: left;
							color: $Color-B-1;
							margin-bottom: 8rpx;
						}

						.comment-time {
							display: flex;

							.time-text {
								color: $Color-B-3;
								font-size: 24rpx;
							}

							.relpay {
								color: $Color-B-2;
								font-size: 24rpx;
								margin-left: 16rpx;
							}
						}

					}

					.like-action {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-end;

						.like-icon {
							width: 28rpx;
							height: 28rpx;
							margin-bottom: 4rpx;
						}

						.like-num {
							font-size: 24rpx;
							color: $Color-B-3;
						}
					}
				}
			}
		}
	}
</style>