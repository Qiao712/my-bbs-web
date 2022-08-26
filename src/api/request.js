import axios from 'axios'
import { ElMessage } from 'element-plus'
// import router from '../router/index'

//axios实例
const service = axios.create({
  baseURL : "http://localhost:8081/api",
  withCredentials: true
})

//request拦截器，在HEADER中添加token
let requestIntercepter = config => {
  let token = sessionStorage.getItem("Token")
  token = token ? token : localStorage.getItem("Token")

  if(token) {
    config.headers['Token'] = token;
  }

  return config
}

let requestErrorIntercepter = error => {
  return Promise.reject(error)
}

//response拦截器
let responseIntercepter = response => {
  let status = response.data.status
  let message = response.data.message

  //默认的错误处理: 若有消息，弹出提示框
  if(status != 0 && message){
    ElMessage({
      message,
      type: 'error',
      duration: 2000,
    })
  }

  switch(status){
    //成功
    case 0: break
    
    //无权访问
    case 401: break

    //Token过期
    case 3: {
      //清除token
      sessionStorage.removeItem("Token")
      localStorage.removeItem("Token")
      break
    }
  }

  //返回同一的返回对象
  if(status == 0) return response.data
  else return Promise.reject(response.data)
}

let responseErrorIntercepter = error => {
  console.log("请求失败", error)
  return Promise.reject(error)
}

service.interceptors.response.use(responseIntercepter, responseErrorIntercepter)
service.interceptors.request.use(requestIntercepter, requestErrorIntercepter)
export default service