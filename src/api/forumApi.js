import request from "./request"

export default{
  getForum(forumId){
    return request({
      url: "/forums/" + forumId,
      method: "GET"
    })
  }
}