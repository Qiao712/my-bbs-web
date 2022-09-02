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

  listMyComments(params){
    return request({
      url: "/comments/my",
      method: "GET",
      params
    })
  },

  removeMyComment(commentId){
    return request({
      url: "/comments/" + commentId,
      method: "DELETE"
    })
  },

  likeComment(commentId){
    return request({
      url: "/comments/" + commentId + "/like",
      method: "GET"
    })
  },
  
  undoLikeComment(commentId){
    return request({
      url: "/comments/" + commentId + "/undo-like",
      method: "GET"
    })
  },

  //admin--------------

  listCommentDetails(params){
    return request({
      url: "/admin/comments/details",
      method: "GET",
      params
    })
  },

  removeComment(commentId){
    return request({
      url: "/admin/comments/" + commentId,
      method: "DELETE",
    })
  },
}