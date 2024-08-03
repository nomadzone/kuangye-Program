<template>
  <view>
	<HomeNavbar @action='doAction' :title="schooolTitle"/>
    <!-- 页面内容 -->
    <CustomTabbar />
  </view>
</template>

<script>
import CustomTabbar from '@/components/CustomTabbar.vue';
import HomeNavbar from '@/components/HomeNavbar.vue';

export default {
  components: {
    CustomTabbar,
	HomeNavbar
  },
  data() {
	  return {
		  schooolTitle: '西安交通大学博学楼'
	  }
  },
  methods: {
	  doAction() {
		  
	  }
  }
}
</script>

<style lang="scss" scoped>
/* 页面样式 */
</style>
