import request from "./request"

export default{
  sendPrivateMessage(data){
    return request({
      url: "/messages/private",
      method: "POST",
      data
    })
  },

  listConversations(params){
    return request({
      url: "/messages/conversations",
      method: "GET",
      params
    })
  },

  listPrivateMessages(params){
    return request({
      url: "/messages/private",
      method: "GET",
      params
    })
  },

  getUnacknowledgedPrivateMessageCount(){
    return request({
      url: "/messages/private/count",
      method: "GET",
    })
  },

  getUnacknowledgedMessageCount(){
    return request({
      url: "/messages/count",
      method: "GET",
    })
  }
}