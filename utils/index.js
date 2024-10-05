import http from './http'


export const getDayHours = (start = 0, end = 23)=> {
	let hours = []
	for (let i=start;i<(end+1);i++) {
		hours.push((i <= 9 ? `0${i}` : i) + '时')
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
  return `${ isYear ? year + '-' : ''}${month}-${day}`;
}

// Helper function to get the day of the week in Chinese
export const getWeekday = (date)=> {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[date.getDay()];
}

export const formatDateString = (dateString) => {
	// 处理包含中文日期和时间的格式
	if (dateString.includes('年') || dateString.includes('周')) {
	  // 去掉 "年", "月", "日", "周X" 等字符
	  dateString = dateString.replace(/年|月/g, '-').replace(/日/g, '').replace(/(周[一二三四五六日])/g, '').trim();
	}
	if (dateString.includes('时') || dateString.includes('分') || dateString.includes('秒')) {
		// 去掉 "年", "月", "日", "周X" 等字符
		dateString = dateString.replace(/时|分/g, ':').replace(/秒/g, '').trim();
	  }
  
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

export const formatDateText = (dateString) => {
	if (!dateString) return ''
	dateString = dateString.replace(/-/g, '/');

	const date = new Date(dateString);
  
	// 获取月份和日期
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
  
	// 获取星期几
	const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	const dayOfWeek = daysOfWeek[date.getDay()];
  
	// 获取小时和分钟
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
  
	// 返回格式化后的字符串
	return `${month}-${day}(${dayOfWeek}) ${hours}:${minutes}`;
  }
  export const formatDateTextTwo = (dateString) => {
	if (!dateString) return ''
	dateString = dateString.replace(/-/g, '/');

	const date = new Date(dateString);
  
	// 获取月份和日期
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
  
	// 获取星期几
	const daysOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	const dayOfWeek = daysOfWeek[date.getDay()];
  
	// 获取小时和分钟
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
  
	// 返回格式化后的字符串
	return `${month}-${day}(${dayOfWeek})`;
  }
  
	  
  export const debounce = (fn, delay) => {
	  let timer;
	  return function() {
		  if(timer) {
			  clearTimeout(timer)
		  }
		  
		  timer= setTimeout(() => {
			  fn()
		  }, delay)
	  }
  }

  export const formatDateWeek = (dateStr)=> {
	// 创建一个新的Date对象
	const date = new Date(dateStr);
  
	// 获取月份、日期、小时、分钟
	const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始的，所以需要+1
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
  
	// 获取星期，星期使用getDay()方法，返回的也是从0开始的，0代表周日
	const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	const weekDay = days[date.getDay()];
  
	// 将月份和日期格式化为两位数
	const formattedMonth = month < 10 ? `0${month}` : month;
	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
	// 拼接成最终的字符串
	return `${formattedMonth}-${formattedDay}(${weekDay}) ${formattedHours}:${formattedMinutes}`;
  }
  
  /**
   * @description: 判断用户是否开启定位权限
   * @param isGoSetting
   */
  export function isLocationAuth(isGoSetting = false) {
    return new Promise((resolve) => {
      uni.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            resolve(true)
          } else if (isGoSetting) {
            uni.showModal({
              title: '提示',
              content: '请先开启定位权限',
              success: (red) => {
                if (red.confirm) {
                  uni.openSetting({
                    success: (reds) => {
                      if (reds.authSetting['scope.userLocation']) {
                        resolve(true)
                      } else {
                        resolve(false)
                      }
                    }
                  })
                } else if (red.cancel) {
                  resolve(false)
                }
              }
            })
          }
        }
      })
    })
  }
  /**
   * @description: 获取用户当前位置
   * @param isGoSetting
   * @param type
   */
  export function getUserLocation(isGoSetting = true, type = 'gcj02') {
    return new Promise((resolve) => {
      uni.getLocation({
        type,
        success: (res) => {
          resolve({
            latitude: res.latitude,
            longitude: res.longitude
          })
        },
        fail: (err) => {
          if (!isGoSetting) return
          // 判断是否开启定位权限
          isLocationAuth(true).then((red) => {
            if (!red) {
              getUserLocation(false).then((reds) => {
                resolve(reds)
              })
            }
          })
        }
      })
    })
  }
