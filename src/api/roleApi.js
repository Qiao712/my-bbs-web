import request from "./request"

export default{
  getRoles(){
    return request({
      url: "/roles",
      method: "GET"
    })
  }
}