/**
 * @description 路由拦截器
 */
export function interceptRoute() {
    const needLogin = []
    const pages = import.meta.globEager('/src/**/pages.json')
    Object.keys(pages).forEach((key) => {
      const page = pages[key]
      page?.pages?.forEach((value) => {
        if (value.needLogin) {
          needLogin.push(`/${value.path}`)
        }
      })
      page?.subPackages?.forEach((value) => {
        value?.pages?.forEach((vals) => {
          if (vals.needLogin) {
            needLogin.push(`/${value.root}/${vals.path}`)
          }
        })
      })
    })
  
    const arr = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']
    arr.forEach((value) => {
      uni.addInterceptor(value, {
        invoke: (e) => {
          // 调用前拦截
          // 获取用户的token
          const token = getToken()
          // 获取当前页面路径（即url去掉"?"和"?"后的参数）
          const url = e.url.split('?')[0]
          console.log(url, token, needLogin.includes(url))
          // 判断要打开的页面是否需要验证登录
          if (needLogin.includes(url) && !token) {
            console.log('拦截成功', url)
            uni.showModal({
              title: '提示',
              content: '您还未登录，前往登录？',
              cancelText: '取消',
              confirmText: '确认',
              success: (res) => {
                if (res.confirm) {
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              }
            })
            return false
          }
          //
          return true
        },
        fail(err) {
          // 失败回调拦截
          console.log(err)
        }
      })
    })
  }