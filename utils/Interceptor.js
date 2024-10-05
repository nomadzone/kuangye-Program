import { pages, subPackages, tabBar } from '@/pages.json'
export const getLastPage = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  // const lastPage = getCurrentPages().at(-1)
  // 上面那个在低版本安卓中打包回报错，所以改用下面这个【虽然我加了src/interceptions/prototype.ts，但依然报错】
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}
 
/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有tabBar的话，list不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  const lastPage = getLastPage()
  const currPath = lastPage.route
  return !!tabBar.list.find((e) => e.pagePath === currPath)
}
 
/**
 * 获取当前页面路由的 path 路径 和 redirectPath 路径
 * path 如 ‘/pages/login/index’
 * redirectPath 如 ‘/pages/demo/base/route-interceptor’
 */
export const currRoute = () => {
  const lastPage = getLastPage()
  const currRoute = lastPage.$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute
  // console.log(fullPath)
  // eg: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/index?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return getUrlObj(fullPath)
}
 
const ensureDecodeURIComponent = (url) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url) => {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)
 
  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => !key || page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj
 
    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  // console.log(`getAllPages by ${key} result: `, result)
  return result
}
 
/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = ()=> getAllPages('needLogin').map((page) => page.path)


/**
 * @description 路由拦截器
 */
export function interceptRoute() {

  
  const needLogin = getAllPages('needLogin').map((page) => page.path)
    const arr = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']
    arr.forEach((value) => {
      uni.addInterceptor(value, {
        invoke: (e) => {
          // 调用前拦截
          // 获取用户的token
          const token = uni.getStorageSync('token')
          // 获取当前页面路径（即url去掉"?"和"?"后的参数）
          const url = e.url.split('?')[0]
          // 判断要打开的页面是否需要验证登录
          if (needLogin.includes(url) && !token) {
            console.log('拦截成功', url)
            uni.reLaunch({
              url: '/pages/login/index'
            })
            // uni.showModal({
            //   title: '提示',
            //   content: '您还未登录，前往登录？',
            //   cancelText: '取消',
            //   confirmText: '确认',
            //   success: (res) => {
            //     if (res.confirm) {
            //       uni.reLaunch({
            //         url: '/pages/login/index'
            //       })
            //     }
            //   }
            // })
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