import http from './http'


export const getDayHours = (start = 0, end = 23)=> {
	let hours = []
	for (let i=start;i<(end+1);i++) {
		hours.push((i < 9 ? `0${i}` : i) + '时')
	}
	return  hours
}

export const getDayMin = (start = 0, end = 59)=> {
	let hours = []
	for (let i=start;i<(end+1);i++) {
		hours.push((i < 9 ? `0${i}` : i) + '分')
	}
	return  hours
}


export const getDatesAndWeeks = (isYear = false)=> {
  const results = [];
  const today = new Date();

  for (let i = 0; i <= 30; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const dateStr = formatDate(isYear, currentDate); // Format: YYYY年MM月DD日
    const weekStr = getWeekday(currentDate);

    results.push(`${dateStr} ${weekStr}`);
  }

  return results;
}

// Helper function to format the date as YYYY-MM-DD
export const formatDate = (isYear = false, date)=> {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${ isYear ? year + '年' : ''}${month}月${day}日`;
}

// Helper function to get the day of the week in Chinese
export const getWeekday = (date)=> {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[date.getDay()];
}

export const getCode = ()=> {
	return new Promise((resolve, inject)=> {
			wx.login({
			  success: (res) => {
			    if (res.code) {
			      // 成功获取 code
			      console.log('Login code:', res.code);
				  resolve(res.code)
			    } else {
			      console.error('登录失败！' + res.errMsg);
				  inject(res.errMsg)
			    }
			  },
			  fail: (err) => {
			    console.error('wx.login API 调用失败', err);
				  inject(err)
			  }
			});
	})
}

export const getWxUserInfo = async() => {
	uni.getUserInfo({
		success:async (target) => {
			const code = await getCode()
			const params = {
				encryptedData: target.encryptedData,
				code,
				iv: target.iv,
			}
			let res = await http.userLogin(params)
			if (res.code === '200') {
				uni.setStorageSync('token', res.data)
			}
		}
	})
}

export const getUserProfile = async() => {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '用于完善用户资料',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}