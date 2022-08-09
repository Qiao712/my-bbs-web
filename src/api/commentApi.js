import request from "./request"

export default{
  addComment(comment){
    return request({
      url: "/comments",
      method: "POST",
      data: comment
    })
  },

  listComments(params){
    return request({
      url: "/comments",
      method: "GET",
      params
    })
  }
}