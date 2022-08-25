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
  },

  listCommentDetails(params){
    return request({
      url: "/comments/details",
      method: "GET",
      params
    })
  },

  deleteComment(commentId){
    return request({
      url: "/comments/" + commentId,
      method: "DELETE",
    })
  }
}