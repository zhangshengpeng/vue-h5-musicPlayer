import Axios from 'axios'
import { Notify } from 'vant'
import router from '../router'

const upload = Axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? '/api/'
    : 'https://www.zsp.cool/',
  timeout: 10 * 60 * 1000
})

upload.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('token=')[1]
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    console.log(error)
    return Promise.error(error)
  }
)
upload.interceptors.response.use(
  config => {
    return config
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          // router.replace({
          //   path: '/login'
          // })
          Notify({ type: 'warning', message: `status:${error.response.status};${error.response.data}` })
          break

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Notify({ type: 'warning', message: `status:${error.response.status};登录失效` })
          // 清除token
          // LocalStorage('remove', 'token');
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login'
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          Notify({ type: 'warning', message: `status:${error.response.status};资源不存在` })
          break
        case 504:
          Notify({ type: 'warning', message: `status:${error.response.status};网关超时` })
          break
          // 其他错误，直接抛出错误提示
        default:
          Notify({ type: 'warning', message: `status:${error.response.status};${error.response.data}` })
      }
    }
  }
)
export default upload
