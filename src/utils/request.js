import Axios from 'axios'

const baseURL = '/api/'
const axios = Axios.create({
  baseURL,
  timeout: 10000
})

axios.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('token=')[1]
    console.log(token)
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.error(error)
)
export default axios
