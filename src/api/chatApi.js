import request from "./request"

export default{
    listConversations(params){
        return request({
            url: "/chat/conversations",
            method: "GET",
            params
        })
    },

    getUnacknowledgedPrivateMessageCount(){
        return request({
          url: "/chat/messages/count",
          method: "GET",
        })
    },

    listPrivateMessages(params){
        return request({
          url: "/chat/messages",
          method: "GET",
          params
        })
    },

    //获取用于握手升级的Uri
    getChatWebSocketUri(token){
        return "ws://localhost:8081/api" + "/chat/" + token
    }
}