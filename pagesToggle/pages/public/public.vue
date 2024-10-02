<template>
  <view class="page">
    <Navbar :title="'发布一起野'" />
    <Gradual
      :background="'linear-gradient(to bottom, #FFF7E2, #f5f5f5)'"
      :height="'100vh'"
      :zIndex="'-1'"
    />
    <view style="z-index: 6; margin-top: 64rpx">
      <view :style="{ height: StatusBar + 'px' }"></view>
      <view style="height: 32rpx"></view>
      <image
        class="popu-icon"
        src="/static/images/hand_icon.png"
        mode=""
      ></image>
      <view class="module">
        <view>
          <Upload :limit="9" @upload="doUpload" :images="activity.images || []"></Upload>
        </view>
        <view class="input-title">
          <input
            type="text"
            v-model="activity.title"
            placeholder="请填写清晰的活动标题"
            placeholder-class="placeholder-style"
          />
        </view>
        <view class="input-desc">
          <textarea
            row="3"
            v-model="activity.describe"
            placeholder="描述一下活动亮点、活动内容、推荐人群、贴心tips等，叫大家一起野吧"
            placeholder-class="placeholder-style"
          />
        </view>
        <view class="input-tag">
          <view class="tag-add" @click="activeOpen">
            <image src="/static/images/chat-thread-fill.png" mode=""></image>
            <text>{{ activity.label ? activity.label : "添加活动标签" }}</text>
            <image src="/static/images/arrow-right-s-line_gray.png"></image>
          </view>
        </view>
        <view class="input-opt">
          <view class="opt" @click="openMap">
            <view>
              <image src="/static/images/map-pin-line.png" mode=""></image>
              <text v-if="!activity.address">集合地点</text>
              <text v-else style="text-overflow: ellipsis; overflow: hidden;  color: #1b1b1b;">{{ activity.address }}</text>
              <image
                src="/static/images/arrow-right-s-line_gray.png"
                mode=""
              ></image>
            </view>
            <view></view>
          </view>

          <view class="opt" @click="timeStartOpen">
            <view>
              <image src="/static/images/time-line.png" mode=""></image>
              <text v-if="!activity.startdateShow || !activity.enddateShow">活动时间</text>
              <view class="time" v-if="activity.dateShow && activity.startdate  && activity.enddate "
                >活动时间: {{ activity.dateShow }}</view
              >
              <view class="time" v-if="!activity.dateShow && activity.startdate  && activity.enddate"
                >活动时间: {{ activity.startdateShow }} - {{ activity.enddateShow  }}</view
              >
              <image
                src="/static/images/arrow-right-s-line_gray.png"
                mode=""
              ></image>
            </view>
          </view>
          <!-- <view class="opt" @click="timeEndOpen">
            <view>
              <image src="/static/images/time-line.png" mode=""></image>
              <text v-if="!activity.enddate ">活动结束时间</text>
              <view class="time" v-else>活动结束: {{ activity.enddateShow  }}</view>
              <image
                src="/static/images/arrow-right-s-line_gray.png"
                mode=""
              ></image>
            </view>
          </view> -->

          <view class="opt" @click="timeStartSignOpen">
            <view>
              <image src="/static/images/time-line.png" mode=""></image>
              <text v-if="!activity.signUpStartDate || !activity.signUpEndDateShow">报名时间</text>
              <view class="time" v-if="activity.signDateShow && activity.signUpStartDate && activity.signUpEndDateShow"
                >报名时间: {{ activity.signDateShow  }}</view
              >
              <view class="time" v-if="!activity.signDateShow && activity.signUpStartDate && activity.signUpEndDateShow"
                >报名时间: {{ activity.signUpStartDateShow }} - {{ activity.signUpEndDateShow  }}</view
              >
              <image
                src="/static/images/arrow-right-s-line_gray.png"
                mode=""
              ></image>
            </view>
          </view>
          <!-- <view class="opt" @click="timeEndSignOpen">
            <view>
              <image src="/static/images/time-line.png" mode=""></image>
              <text v-if="!activity.signUpEndDate ">报名截止时间</text>
              <view class="time" v-else>报名截止: {{ activity.signUpEndDateShow  }}</view>
              <image
                src="/static/images/arrow-right-s-line_gray.png"
                mode=""
              ></image>
            </view>
          </view> -->
        </view>
      </view>
      <view class="module" style="padding-top: 0; padding-bottom: 0">
        <view class="line" @click="zcShow = true">
          <view>退款政策</view>
          <view>
            <text v-if="activity.refund">{{ activity.refund }}</text>
            <text v-if="!activity.refund" style="color: #999">请选择</text>
            <!-- <image src="/static/images/arrow-right-s-line-black.png" mode=""></image> -->
            <image
              src="/static/images/arrow-right-s-line_gray.png"
              mode=""
            ></image>
          </view>
        </view>
        <view class="line" @click="openNum">
          <view>活动人数</view>
          <view>
            <text v-if="activity.maxpeople"
              >{{ activity.minpeople }} ~ {{ activity.maxpeople }}</text
            >
            <text class="line-desc" v-else>请输入参与人数范围</text>
            <image
              src="/static/images/arrow-right-s-line_gray.png"
              mode=""
            ></image>
          </view>
        </view>
        <view class="line">
          <view>价格（每人）</view>
          <view class="line-input" @tap="doPrice">
            <input
              :disabled="id"
              type="text"
              placeholder="请输入价格"
              v-model="activity.price"
              placeholder-class="placeholder-style"
            />
          </view>
        </view>
      </view>
      <view class="module contact">
        <view class="title"> 联系方式</view>
        <view>
          <Upload :title="'添加联系微信二维码'"  :limit="1" @upload="doUploadContact" :images="activity.contactphoto || []"></Upload>
        </view>
        <view class="echat">
          <image
            src="/static/images/tdesign_logo-wechat-stroke.png"
            mode=""
          ></image>
          <input type="text" placeholder="输入微信号（选填）" v-model="activity.number" />
        </view>
      </view>
      <view :style="{ height: navHeight / 2 + 152 + 64 + 'rpx' }"></view>
      <view class="submit" :style="{ height: navHeight / 2 + 152 + 'rpx' }">
        <button hover-class="button-hover" @click="doPulish">{{ id ? '编辑发布' : '发布' }}</button>
        <!-- class="gray" -->
      </view>
    </view>

    <uv-picker
      title="添加活动标签"
      confirmText="保存"
      ref="pickerActive"
      :columns="activeList"
      @confirm="activeConfirm"
    ></uv-picker>
    <uv-picker
      title="选择活动开始时间"
      confirmText="保存"
      ref="pickerStart"
      :columns="timeList"
      @confirm="timeStartConfirm"
    ></uv-picker>
    <uv-picker
      title="选择活动结束时间"
      confirmText="保存"
      ref="pickerEnd"
      :columns="timeList"
      :closeOnClickConfirm="false"
      @confirm="timeEndConfirm"
    ></uv-picker>
    
    <uv-picker
      title="选择报名开始时间"
      confirmText="保存"
      ref="pickerStartSign"
      :columns="timeList"
      @confirm="timeStartSignConfirm"
    ></uv-picker>
    <uv-picker
      title="选择报名截止时间"
      confirmText="保存"
      ref="pickerEndSign"
      :columns="timeList"
      :closeOnClickConfirm="false"
      @confirm="timeEndSignConfirm"
    ></uv-picker>
    <!-- 退改政策 -->
    <PoupWrap
      :show="zcShow"
      @close="zcShow = false"
      title="选择退改政策"
      @save="doReFund"
    >
      <view style="padding-bottom: 48rpx">
        <view
          @click="doZcExpose(index)"
          v-for="(item, index) in zcList"
          :key="index"
          class="update"
          :class="[zcIndex == index ? 'active' : '']"
        >
          <view class="update-header">
            <view>{{ item.title }}</view>
            <view v-if="zcIndex == index">
              <image src="/static/images/checkbox-blue.png" mode=""></image>
            </view>
          </view>
          <view class="update-desc">
            {{ item.desc }}
          </view>
        </view>
      </view>
    </PoupWrap>
    <!-- 活动人数范围 -->
    <PoupWrap
      :show="numShow"
      @close="numShow = false"
      title="填写活动人数"
      @save="doNum"
    >
      <view style="padding-bottom: 48rpx" class="range">
        <view>
          <input type="number" placeholder="最小人数" v-model="minpeople" />
        </view>
        <view> ~ </view>
        <view>
          <input type="number" placeholder="最大人数" v-model="maxpeople" />
        </view>
      </view>
    </PoupWrap>
    <!-- 取消返回 toast -->
    <Toast
      :show="toastShow"
      @cancel="toastShow = false"
      @confirm="toastShow = false"
      title="退出后内容不保存，要退出吗？"
    ></Toast>
    <!-- 发布成功 -->
    <PublicSuccess
      :show="publicSuccessShow"
      :fabuParams="fabuParams"
      @close="publicSuccessClose"
      @view="doView"
    ></PublicSuccess>
  </view>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Gradual from "@/components/Navbar/Gradual.vue";
import Upload from "@/components/Upload/Upload.vue";
import PoupWrap from "@/components/Popup/Wrap.vue";
import PublicSuccess from "@/components/Popup/PublicSuccess.vue";
import Toast from "@/components/Toast/Toast.vue";
import http from "@/utils/http.js";
	import { formatDateText } from '@/utils/index.js'
import { getDayHours, getDayMin, getDatesAndWeeks, formatDateString, formatDateWeek } from "@/utils/index.js";

export default {
  components: {
    Navbar,
    Gradual,
    Upload,
    PoupWrap,
    Toast,
    PublicSuccess,
  },
  data() {
    return {
      activity: {
        title: "",
        describe: "", // 活动描述
        label: "",
        latitude: 22.55329,
        longitude: 113.88308,
        address: "",
        endTime: "",
        startdate:'',
        enddate:'',
        startdateShow:'',
        enddateShow:'',
        dateShow: '',
        signUpStartDate: "",
        signUpEndDate : "",
        signUpStartDateShow: "",
        signUpEndDateShow: "",
        signDateShow: '',
        minpeople: '',
        maxpeople: '',
        price: '',
        contactphoto: "",
        number: "",
        images: "",
        refund: "",
      },
      id: '',
      publicId: '', // 发布成功后的id
      toastShow: false,
      publicSuccessShow: false,
      fabuParams: {},
      minpeople: "",
      maxpeople: "",
      StatusBar: 0,
      navHeight: 0,
      zcShow: false,
      numShow: false,
      zcIndex: -1,
      zcList: [
        {
          title: "活动开始前24小时全额退",
          desc: `活动开始24小时前申请，退款100%
						活动开始前24小时～开始前申请，退款50%
						活动开始后，不支持退款，特殊原因协商`,
        },
      ],
      activeList: [["飞盘", "羽毛球", "游泳", "酒吧", "篮球", "高尔夫"]],
      getDatesAndWeeksYear: getDatesAndWeeks(true),
      timeList: [getDatesAndWeeks(false), getDayHours(), getDayMin()],
    };
  },
  onLoad(options) {
    this.id = options.id
    this.getDetails()
  },
  created() {
    this.StatusBar = uni.getStorageSync("statusBarHeight");
    this.navHeight = uni.getStorageSync("navBarHeight");
  },
  onShow() {
    if (!uni.getStorageSync("token")) {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    }
  },
  methods: {
			async getDetails() {
        if (!this.id) return;
				let location = uni.getStorageSync('location')
				let res = await http.selectWildTogether({
					id: this.id,
					longitude: location?.longitude || null,
					latitude: location?.latitude || null,
				});
				if (res?.code == '200') {
          console.log('',res.data)
					if (res?.data.activityVo?.images) {
						res.data.activityVo.images = res?.data?.activityVo?.images?.split(',')
					} else {
						res.data.activityVo.images = []
					}
          res.data.activityVo.contactphoto = [res?.data.activityVo?.contactphoto]
          res.data.activityVo.startdateShow = formatDateWeek(res.data.activityVo?.startdate)
          res.data.activityVo.enddateShow = formatDateWeek(res.data.activityVo?.enddate)
          res.data.activityVo.signUpEndDateShow = formatDateWeek(res.data.activityVo?.signUpEndDate)
          res.data.activityVo.signUpStartDateShow = formatDateWeek(res.data.activityVo?.signUpStartDate)


          if (this.activity.startdate.split(' ')[0] === this.activity.startdate.split(' ')[0]) {
            this.activity.dateShow = this.activity.startdate.split(' ')[0] + ' ' + this.activity.startdate.split(' ')[1] + '-' +this.activity.enddate.split(' ')[1]
          } else {
            this.activity.dateShow = ''
          }
          if (this.activity.signUpStartDate.split(' ')[0] === this.activity.signUpEndDate.split(' ')[0]) {
            this.activity.signDateShow = this.activity.signUpStartDate.split(' ')[0] + ' ' + this.activity.signUpStartDate.split(' ')[1] + '-' +this.activity.signUpEndDate.split(' ')[1]
          } else {
            this.activity.signDateShow = ''
          }
          // 退款政策 暂无数据
          res.data.activityVo.refund = this.zcList[0].title
          this.zcIndex = 0
          
          this.activity = res.data.activityVo
				} else {
					uni.showToast({
						title: res?.msg,
						icon: 'none'
					})
				}
			},
    doUpload(imgs) {
      this.activity.images = imgs;
    },
    doUploadContact(imgs) {
      this.activity.contactphoto = imgs;
    },
    openMap() {
      let that = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res);
          that.activity.address = res.address
          that.activity.latitude = res.latitude
          that.activity.longitude = res.longitude
        },
        fail: function (err) {
          console.log(err, '用户未选择地址');
        }
      });
    },
    doPrice() {
      if (this.id) {
        uni.showToast({
          icon: 'none',
          title: '价格不能编辑'
        })
      }
    },
    doReFund() {
      if (this.zcIndex === -1 && this.activity.refund) {
        this.activity.refund = "";
        this.zcShow = false;
        return;
      } else if (this.zcIndex === -1) {
        uni.showToast({
          title: "请选择",
          icon: "none",
        });
        return;
      }
      this.activity.refund = this.zcList[this.zcIndex].title;
      this.zcShow = false;
    },
    openNum() {
      this.minpeople = this.activity.minpeople;
      this.maxpeople = this.activity.maxpeople;
      this.numShow = true;
    },
    doNum() {
      let title = "";
      let maxpeople = this.maxpeople;
      let minpeople = this.minpeople;
      if (maxpeople < minpeople) {
        title = "请正确填写最小值和最大值";
      }
      if (isNaN(maxpeople) || isNaN(minpeople)) {
        title = "请输入数字";
      }
      if (!maxpeople || !minpeople) {
        title = "请输入数字";
      }
      if (title) {
        uni.showToast({
          title,
          icon: "none",
        });
        return;
      }
      this.activity.minpeople = this.minpeople;
      this.activity.maxpeople = this.maxpeople;
      this.numShow = false;
    },
    doZcExpose(index) {
      this.zcIndex = index === this.zcIndex ? -1 : index;
    },
    activeOpen() {
      this.$refs.pickerActive.open();
    },
    timeStartOpen() {
      this.$refs.pickerStart.open();
    },
    timeEndOpen() {
      this.$refs.pickerEnd.open();
    },
    timeStartSignOpen() {
      this.$refs.pickerStartSign.open();
    },
    timeEndSignOpen() {
      this.$refs.pickerEndSign.open();
    },
    activeConfirm(e) {
      console.log(e);
      this.activity.label = e.value[0];
    },
    timeStartConfirm(e) {
      let value = e.value;
      let date = this.getDatesAndWeeksYear.filter(
        (item) => item.indexOf(value[0]) !== -1
      )[0];
      let dateTime = date.split(" ")[0];
      let dateString = (`${dateTime} ${value[1]}${value[2]}`).replace(/时/g, ':').replace(/分/g, '') + ':59';
      this.activity.startdate = dateString
      this.activity.startdateShow = formatDateWeek(dateString)
      this.timeEndOpen()
    },
    timeEndConfirm(e) {
      let value = e.value;
      let date = this.getDatesAndWeeksYear.filter(
        (item) => item.indexOf(value[0]) !== -1
      )[0];
      let dateTime = date.split(" ")[0];
      let dateString = (`${dateTime} ${value[1]}${value[2]}`).replace(/时/g, ':').replace(/分/g, '') + ':00';
      if (new Date(this.activity.startdate).getTime() >= new Date(dateString).getTime()) {
        uni.showToast({ title: '结束时间必须大于开始时间', icon: 'none' })
        return;
      }
      this.activity.enddate = dateString
      this.activity.enddateShow = formatDateWeek(dateString)
      if (this.activity.startdateShow.split(' ')[0] === this.activity.enddateShow.split(' ')[0]) {
        this.activity.dateShow = this.activity.enddateShow.split(' ')[0] + ' ' + this.activity.startdateShow.split(' ')[1] + '-' +this.activity.enddateShow.split(' ')[1]
      } else {
        this.activity.dateShow = ''
      }
      this.$refs.pickerEnd.close();
    },
    timeStartSignConfirm(e) {
      let value = e.value;
      let date = this.getDatesAndWeeksYear.filter(
        (item) => item.indexOf(value[0]) !== -1
      )[0];
      let dateTime = date.split(" ")[0];
      let dateString = (`${dateTime} ${value[1]}${value[2]}`).replace(/时/g, ':').replace(/分/g, '') + ':59';
      this.activity.signUpStartDate = dateString
      this.activity.signUpStartDateShow = formatDateWeek(dateString)
      this.timeEndSignOpen()
    },
    publicSuccessClose() {
      this.publicSuccessShow = false
      uni.navigateBack()
    },
    timeEndSignConfirm(e) {
      let value = e.value;
      let date = this.getDatesAndWeeksYear.filter(
        (item) => item.indexOf(value[0]) !== -1
      )[0];
      let dateTime = date.split(" ")[0];
      let dateString = (`${dateTime} ${value[1]}${value[2]}`).replace(/时/g, ':').replace(/分/g, '') + ':00';
      if (new Date(this.activity.signUpStartDate).getTime() >= new Date(dateString).getTime()) {
        uni.showToast({ title: '结束时间必须大于开始时间', icon: 'none' })
        return;
      }
      this.activity.signUpEndDate = dateString
      this.activity.signUpEndDateShow = formatDateWeek(dateString)
      if (this.activity.signUpEndDateShow.split(' ')[0] === this.activity.signUpStartDateShow.split(' ')[0]) {
        this.activity.signDateShow = this.activity.signUpEndDateShow.split(' ')[0] + ' ' + this.activity.signUpStartDateShow.split(' ')[1] + '-' +this.activity.signUpEndDateShow.split(' ')[1]
      } else {
        this.activity.signDateShow = ''
      }
      this.$refs.pickerEndSign.close();
    },
    async doPulish() {
      try {
        const currentTime = new Date(); // 当前时间
        const params = {
          title: this.activity.title,
          describe: this.activity.describe,
          label: this.activity.label,
          latitude: this.activity.latitude,
          longitude: this.activity.longitude,
          address: this.activity.address,
          startdate: formatDateString(this.activity.startdate),
          enddate : formatDateString(this.activity.enddate ),
          signUpStartDate: formatDateString(this.activity.signUpStartDate),
          signUpEndDate : formatDateString(this.activity.signUpEndDate ),
          minpeople: Number(this.activity.minpeople),
          maxpeople:  Number(this.activity.maxpeople),
          price: Number(this.activity.price),
          contactphoto: this.activity.contactphoto instanceof Array ? this.activity.contactphoto.join(',') : this.activity.contactphoto,
          number: this.activity.number,
          images: this.activity.images instanceof Array ? this.activity.images.join(',') : this.activity.images,
          type: 1,
        }
        if (this.id){
          params.id = this.id
        }
        let tip = ''
        if (!params.images) {
          tip = '请上传活动图片'
        } else if (!params.title) {
          tip = '请输入活动名称'
        } else if (!params.describe) {
          tip = '请输入活动描述'
        } else if (!params.label) {
          tip = '请输入活动标签'
        } else if (!this.id && new Date(params.signUpEndDate) <= currentTime) {
          tip = '活动报名结束时间必须大于当前时间';
        } else if (new Date(params.startdate) <= currentTime) {
          tip = '活动开始时间必须大于当前时间';
        } else if (new Date(params.enddate) <= currentTime) {
          tip = '活动结束时间必须大于当前时间';
        } else if (new Date(params.signUpEndDate) >= new Date(params.startdate)) {
          tip = '活动报名结束时间必须早于活动开始时间';
        } else if (new Date(params.startdate) >= new Date(params.enddate)) {
          tip = '活动开始时间必须早于活动结束时间';
        } else if (!params.price) {
          tip = '请输入活动价格'
        } else if (!this.activity.refund) {
          tip = '请选择退款政策'
        } else if (!params.minpeople) {
          tip = '请输入最少活动人数'
        } else if (!params.maxpeople) {
          tip = '请输入最多活动人数'
        } else if (params.minpeople < 1) {
          tip = '最少人数不能小于1'
        } else if (params.maxpeople < 1) {
          tip = '最多人数不能小于1'
        }  else if (params.minpeople > params.maxpeople) {
          tip = '最少人数不能大于最多人数'
        }
        // else if (!params.number) {
        //   tip = '请输入微信号'
        // }
        if (tip) {
          uni.showToast({
            title: tip,
            icon: "none",
          });
          return;
        }
        uni.showLoading({
          title: '发布中...'
        })
        let res = await http.activityAdd(params);
        uni.hideLoading()
        if (res.code !== '200') {
          uni.showToast({
            title: res.msg,
            icon: "error",
          });
          return;
        }
        if (this.id) {
          uni.navigateBack()
          return;
        }
        this.publicSuccessShow = true;
        this.publicId = res.data
        this.fabuParams = params
      } catch (error) {}
    },
    doView() {
      uni.navigateTo({
        url: `/pagesToggle/pages/details/details?id=${this.publicId}&type=self&delta=2`
      })
      this.publicSuccessShow = false
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx;
  position: relative;
  .placeholder-style {
    color: #a3a3a3;
  }
  .popu-icon {
    position: absolute;
    top: 90rpx;
    left: 80rpx;
    width: 192rpx;
    height: 192rpx;
    z-index: 5;
  }
  .module {
    position: relative;
    background-color: #fff;
    border-radius: 16rpx;
    width: 100%;
    padding: 32rpx 24rpx;
    margin-bottom: 24rpx;
    z-index: 6;
    box-sizing: border-box;
    .input-title {
      padding-top: 32rpx;
      padding-bottom: 16rpx;
      font-family: PingFang SC;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 45rpx;
      color: #222;
      margin-bottom: 16rpx;
    }
    .input-desc {
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 400;
      color: #222;
      textarea {
        line-height: 1.4;
        height: 240rpx;
        margin-bottom: 16rpx;
      }
    }
    image {
      width: 38rpx;
      height: 38rpx;
    }
    .input-tag {
      display: flex;
      margin-right: 16rpx;
      flex-wrap: wrap;
      > view {
        display: flex;
        align-items: center;
        padding: 8rpx 12rpx 8rpx 16rpx;
        border-radius: 48rpx;
        background-color: #e3f7ff;
        text {
          font-family: PingFang SC;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          padding: 0 8rpx;
          color: #004f99;
        }
      }
    }
    .input-opt {
      image {
        width: 32rpx;
        height: 32rpx;
      }
      text {
        font-family: PingFang SC;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #a3a3a3;
      }
      .opt {
        padding: 16rpx 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        > view {
          display: flex;
          align-items: center;
          gap: 8rpx;
        }
        .time {
          color: #222222;
        }
      }
    }
    .line {
      padding: 32rpx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #222;
      border-bottom: 1px solid #eee;
      > view {
        display: flex;
        align-items: center;
      }
      &-desc {
        color: #a3a3a3;
      }
      &-input {
        text-align: right;
        font-family: PingFang SC;
        font-size: 32rpx;
        font-weight: 400;
        line-height: 40rpx;
      }
    }
    .line:last-child {
      border-width: 0;
    }
    &.contact {
      > view {
        padding: 16rpx 0;
      }
      .echat {
        display: flex;
        gap: 8rpx;
        image {
          width: 32rpx;
          height: 32rpx;
          position: relative;
          top: 4rpx;
        }
        text {
          font-family: PingFang SC;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
        }
      }
    }
  }
  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 9;
    background-color: #fff;
    padding: 32rpx;
    box-sizing: border-box;
    box-shadow: 0 0 4rpx #eee;
    button {
      border-width: 0;
      border-radius: 48rpx;
      background-color: #222;
      color: #fff;
      &.gray {
        background-color: #f5f5f5;
        color: #a8a8a8;
      }
      &:after {
        display: none;
      }
    }
    .button-hover {
      opacity: 0.8;
    }
  }
  .update {
    display: flex;
    flex-direction: column;
    margin-top: 32rpx;
    border: 1px solid #eee;
    border-radius: 16rpx;
    padding: 24rpx 32rpx;
    &.active {
      border: 1px solid #00c4ef;
      background-color: #e3f7ff;
    }
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: PingFang SC;
      font-size: 32rpx;
      font-weight: 600;
      padding-bottom: 20rpx;
      color: #222;
      image {
        width: 32rpx;
        height: 32rpx;
      }
    }
    &-desc {
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 400;
      color: #646464;
    }
  }
  .range {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10rpx;
    padding: 40rpx 0;
    > view {
      flex: 1;
    }
    > view:nth-child(2) {
      flex: 0 0 60rpx;
      text-align: center;
    }
    input {
      height: 108rpx;
      border-radius: 16rpx;
      background-color: #f5f5f5;
      border: 1px solid #f5f5f5;
      padding: 36rpx 32rpx;
      box-sizing: border-box;
      &:active,
      &:visited {
        border: 1px solid #222;
      }
    }
  }
}
</style>
