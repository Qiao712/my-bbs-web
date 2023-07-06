import request from "./request"

export default{
  addPost(post){
    return request({
      url: "/questions",
      method: "POST",
      data: post
    })
  },

  getPost(postId){
    return request({
      url: "/questions/" + postId,
      method: "GET"
    })
  },

  listPosts(params){
    return request({
      url: "/questions",
      method: "GET",
      params
    })
  },

  searchPosts(params){
    return request({
      url: "/questions/search",
      method: "GET",
      params
    })
  },

  removeMyPost(postId){
    return request({
      url: "/questions/" + postId,
      method: "DELETE"
    })
  },

  likePost(postId){
    return request({
      url: "/questions/" + postId + "/like",
      method: "GET"
    })
  },

  undoLikePost(postId){
    return request({
      url: "/questions/" + postId + "/undo-like",
      method: "GET"
    })
  },

  //admin-----------------------------

  removePost(postId){
    return request({
      url: "/admin/questions/" + postId,
      method: "DELETE"
    })
  },
}