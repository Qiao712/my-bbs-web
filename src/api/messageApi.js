import request from "./request"

export default{
  listSystemMessage(params){
    return request({
      url: "/messages",
      method: "GET",
      params
    })
  },

  getUnacknowledgedSystemMessageCount(){
    return request({
      url: "/messages/count",
      method: "GET",
    })
  }
}