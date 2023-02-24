import axios from 'axios'
import { ElMessage } from 'element-plus'

//axios实例
const service = axios.create({
  baseURL : "http://localhost:8081/api",
  withCredentials: false
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

//成功Response拦截器
let responseIntercepter = response => {
  let code = response.data.code
  let message = response.data.message

  if(code == 0){
    //成功: 返回响应对象{code: xxx, message: xxx, data: xxx}
    return response.data
  }else{
    //失败
    //若有消息，弹出提示框
    if(message){
      ElMessage({
        message,
        type: 'error',
        duration: 2000,
      })
    }

    return Promise.reject(response.data)
  }
}

//失败Response拦截器
let responseErrorIntercepter = error => {
  console.log("请求失败", error)
  return Promise.reject(error)
}

service.interceptors.response.use(responseIntercepter, responseErrorIntercepter)
service.interceptors.request.use(requestIntercepter, requestErrorIntercepter)
export default service