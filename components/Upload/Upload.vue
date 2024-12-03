<template>
  <view class="upload-wrap">
    <view class="files" v-for="(item, index) in fileList" :key="index">
      <image
        class="close"
        src="../../static/images/input-close.png"
        mode=""
        @click="remove(index)"
      ></image>
      <image :src="item" mode="" @click="doUpload(index)"></image>
    </view>
    <view class="upload" @click="doUpload(-1)" v-if="fileList.length < limit">
      <view>
        <image src="../../static/images/upload-add.png" mode=""></image>
        <text>{{ title }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { prefixUrl } from "@/utils/fetch.js";
export default {
  props: {
    title: {
      type: String,
      default: "添加图片",
    },
    limit: {
      type: Number,
      default: 1,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fileList: [],
      fileIndex: 0,
      tempFilePaths: [],
    };
  },
  watch: {
    images(newVal) {
      this.fileList = newVal;
    },
  },
  methods: {
    remove(index) {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否删除该图片",
        success: function (res) {
          if (res.confirm) {
            // 用户点击确定
            _this.fileList.splice(index, 1);
            _this.$emit("upload", _this.fileList);
          } else if (res.cancel) {
            // 用户点击取消，可以选择不做任何处理
            console.log("用户取消删除");
          }
        },
      });
    },
    doUpload(index) {
      const _this = this;
      wx.chooseImage({
        count: _this.limit, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          const tempFilePaths = res.tempFilePaths; // 获取所有选择的图片路径
          // 遍历所有文件路径，并逐个上传
          // 如果是多个 就倒序
          if(tempFilePaths.length > 1) {
            tempFilePaths.reverse();
          }

          _this.fileIndex = 0;
          _this.tempFilePaths = tempFilePaths;
          // tempFilePaths.forEach((filePath) => {
          //   _this.uploadFile(filePath, index); // 调用上传方法，逐个上传
          // });
          uni.showLoading({
            title: "上传中...",
            mask: true,
          });
          _this.uploadFiles(tempFilePaths, _this.fileIndex);
        },
        fail: function (err) {
          console.error("选择图片失败", err);
        },
      });
    },
    // 递归上传
    uploadFiles(filePaths, index) {
      const _this = this;
     
      uni.uploadFile({
        url: `${prefixUrl}/oss/upload`, // 你的服务器接口
        filePath: filePaths[_this.fileIndex], // 选择的文件路径
        name: "file", // 文件对应的 key
        header: {
          "Content-Type": "multipart/form-data",
          token: uni.getStorageSync("token"),
        },
        formData: {
          // 如果有其他的表单数据，也可以在这里传递
        },
        success(uploadRes) {
          uni.hideLoading();
          let res = JSON.parse(uploadRes.data);
          if (res.code !== "200") {
            uni.showToast({
              title: res.msg,
              icon: "none",
            });
            return;
          }
          console.log("上传成功：", index);
          if (index === -1) {
            _this.$emit("upload", [..._this.fileList, res.data]);
            _this.fileList.push(res.data);
            _this.fileIndex++;
            if(_this.fileIndex < _this.tempFilePaths.length) {
              _this.uploadFiles(_this.tempFilePaths, _this.fileIndex);
            } else {
              _this.fileIndex = 0;
              _this.tempFilePaths = [];
              uni.hideLoading();
            }
          } else {
            _this.$emit("upload", _this.fileList);
            _this.fileList[_this.fileList?.length] = res.data;
            _this.fileIndex++;
            if(_this.fileIndex < _this.tempFilePaths.length) {
              _this.uploadFiles(_this.tempFilePaths, _this.fileIndex);
            } else {
              _this.fileIndex = 0;
              _this.tempFilePaths = [];
              uni.hideLoading();
            }
          }
        },
        fail(error) {
          uni.hideLoading();
          console.error("上传失败：", error);
        },
      });
    },
    uploadFile(filePath, index) {
      const _this = this;
      uni.showLoading({
        title: "上传中...",
        mask: true,
      });
      uni.uploadFile({
        url: `${prefixUrl}/oss/upload`, // 你的服务器接口
        filePath: filePath, // 选择的文件路径
        name: "file", // 文件对应的 key
        header: {
          "Content-Type": "multipart/form-data",
          token: uni.getStorageSync("token"),
        },
        formData: {
          // 如果有其他的表单数据，也可以在这里传递
        },
        success(uploadRes) {
          uni.hideLoading();
          let res = JSON.parse(uploadRes.data);
          if (res.code !== "200") {
            uni.showToast({
              title: res.msg,
              icon: "none",
            });
            return;
          }
          if (index === -1) {
            _this.$emit("upload", [..._this.fileList, res.data]);
            _this.fileList.push(res.data);
          } else {
            _this.$emit("upload", _this.fileList);
            _this.fileList[index] = res.data;
          }
        },
        fail(error) {
          uni.hideLoading();
          console.error("上传失败：", error);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-wrap {
  display: flex;
  gap: 20rpx;
  flex-direction: row;
  flex-wrap: wrap;
}
.files {
  border-radius: 12rpx;
  height: 200rpx;
  width: 200rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  position: relative;
  image {
    height: 200rpx;
    width: 200rpx;
    border-radius: 12rpx;
  }
  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #222;
    position: absolute;
    top: -10rpx;
    right: -14rpx;
    height: 40rpx;
    width: 40rpx;
  }
}
.upload {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  height: 200rpx;
  width: 200rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  > view {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  image {
    width: 40rpx;
    height: 40rpx;
  }
  text {
    padding-top: 12rpx;
    font-family: PingFang SC;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 28rpx;
    text-align: center;
    color: #a3a3a3;
    width: 120rpx;
  }
}
</style>
