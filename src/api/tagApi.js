import request from "./request"

export default{
  listTags(params){
    return request({
      url: "/tags",
      method: "GET",
      params
    })
  },
}