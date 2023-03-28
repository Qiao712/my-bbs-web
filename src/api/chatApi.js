import request from "./request"

export default{
    listConversations(params){
        return request({
            url: "/chat/conversations",
            method: "GET",
            params
        })
    },

    sendPrivateMessage(receiverId, content){
        return request({
            url: "/chat/messages/" + receiverId,
            method: "PUT",
            data: [content]
        })
    },

    listPrivateMessages(params){
        return request({
          url: "/chat/messages",
          method: "GET",
          params
        })
    },

    getTotalUnreadNumber(){
        return request({
          url: "/chat/messages/unread-num",
          method: "GET",
        })
    },
}