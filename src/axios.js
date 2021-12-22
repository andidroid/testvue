import axios from 'axios'

const axios = axios.create({
  baseURL: import.meta.env.VITE_APP_TESTWAR_URL
})

axios.defaults.headers.common['SOMETHING'] = 'something'

axios.defaults.baseURL = 'https://vue-update.firebaseio.com'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + app.config.globalProperties.$keycloak.token
// this.store.auth.token
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)



export default axios