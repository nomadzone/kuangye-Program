<!-- 发布新鲜事-评论列表组件 -->
<template>
    <view class="comment-group">
      <view
        class="comment-item"
        v-for="(commentItem, index) in commentList"
        :key="commentItem.id"
      >
        <view class="left">
          <image
            class="avatar-img"
            v-if="commentItem.image"
            :src="commentItem.image"
          ></image>
          <image
            class="avatar-img"
            v-else
            src="@/static/images/comment-default-avatar.svg"
          ></image>
        </view>
        <view class="right">
          <view class="body">
            <view class="content">
              <view class="comment-author">
                <view class="author-name">{{ commentItem.nickname }}</view>
                <view class="author-tag" v-if="commentItem.autherTag">作者</view>
              </view>
              <view class="content-text">{{ commentItem.content }}</view>
              <view class="comment-time">
                <text class="time-text">{{ commentItem.createTime }}</text>
                <view class="relpay" @click="handleReplyComment(commentItem)"
                  >回复</view
                >
              </view>
            </view>
            <view class="like-action">
              <image
                @tap="handleChangeCommentLikeStatus(commentItem, index)"
                class="like-icon"
                v-if="commentItem.isUp == 0"
                src="@/static/icons/comment-likeds.svg"
              >
              </image>
              <image
                @tap="handleChangeCommentLikeStatus(commentItem, index)"
                class="like-icon"
                v-else
                src="@/static/icons/comment-likes.svg"
              ></image>
              <text class="like-num">{{ commentItem.upCount }}</text>
            </view>
          </view>
  
          <view class="back_list" v-for="(list, indexs) in commentItem?.shopCommentList || []" :key="indexs">
            <view class="left">
              <image
                class="avatar-img"
                v-if="list.image"
                :src="list.image"
              ></image>
              <image
                class="avatar-img"
                v-else
                src="@/static/images/comment-default-avatar.svg"
              ></image>
            </view>
            <view class="right">
              <view class="body">
                <view class="content">
                  <view class="comment-author">
                    <view class="author-name">{{ list.nickname }}</view>
                    <view class="author-tag" v-if="list.autherTag"
                      >作者</view
                    >
                  </view>
                  <view class="content-text">{{ list.content }}</view>
                  <view class="comment-time">
                    <text class="time-text">{{ list.createTime }}</text>
                    <view class="relpay" @click="handleReplyComment(list)"
                      >回复</view
                    >
                  </view>
                </view>
                <view class="like-action">
                  <image
                    @tap="handleChangeCommentLikeStatus(list, index, indexs)"
                    class="like-icon"
                    v-if="list.isUp == 0"
                   src="@/static/icons/comment-likeds.svg"
                  >
                  </image>
                  <image
                    @tap="handleChangeCommentLikeStatus(list, index, indexs)"
                    class="like-icon"
                    v-else
                    src="@/static/icons/comment-likeds.svg"
                  ></image>
                  <text class="like-num">{{ list.upCount }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="empty-view" v-if="commentList && commentList.length === 0">
      <image class="empty-img" src="@/static/images/empty_pl.png"></image>
      <text>还没人评论, 快来评论吧~</text>
    </view>
    </view>
  </template>
  
  <script setup >
  import { ref, defineProps, watchEffect } from "vue";
  const emit = defineEmits(["replyComment"]);
  import http from "@/utils/http";
  const props = defineProps({
    dataId: {
      type: String,
      default: "",
    },
    commentList: {
        type: Array,
        default: () => [],
    }
  });
  
  // 回复评论
  function handleReplyComment(row) {
    emit("replyComment", row);
  }
  
  // 修改评论点赞状态
  const handleChangeCommentLikeStatus = (row, index, indexs) => {
    let params = {
      commentId: row.id,
    };
  
    if (row.isUp == 0) {
      http.upDown(params).then((res) => {
        if (res && res.code === "200") {
          if(indexs || indexs === 0){
            let newItem = {
              ...row,
              isUp: 1,
              upCount: row.upCount - 1,
           }
           props.commentList[index].shopCommentList.splice(indexs, 1, newItem);
          } else {
            let newItem = {
              ...row,
              isUp: 1,
              upCount: row.upCount - 1,
            };
            props.commentList.splice(index, 1, newItem);
          }
        }
      });
    } else {
      http.upUp(params).then((res) => {
        if (res && res.code === "200") {
          if(indexs || indexs === 0){
            let newItem = {
              ...row,
              isUp: 0,
              upCount: row.upCount + 1,
            }
            props.commentList[index].shopCommentList.splice(indexs, 1, newItem);
          } else {
            let newItem = {
              ...row,
              isUp: 0,
              upCount: row.upCount + 1,
            };
            props.commentList.splice(index, 1, newItem);
          }
        }
      });
    }
  };
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
        border-bottom: 2rpx solid $Color-B-4;
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
            align-items: center;
  
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
  .back_list{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 24rpx;
      .left{
          width: 48rpx !important;
          margin-right: 16rpx;
          .avatar-img{
              width: 48rpx !important;
              height: 48rpx !important;
              border-radius: 50% !important;
          }
      }
      &:last-child{
          .right{
              border-bottom: none !important;
          }
      }
  }
  .empty-view{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: #b8b8b8;
  font-size: 28rpx;
  margin-top: 24rpx;

  .empty-img{
    width: 110rpx;
    height: 80rpx;
    margin-bottom: 24rpx;
  }
}
  </style>