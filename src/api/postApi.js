import request from "./request"

export default{
  addPost(post){
    return request({
      url: "/posts",
      method: "POST",
      data: post
    })
  },

  getPost(postId){
    return request({
      url: "/posts/" + postId,
      method: "GET"
    })
  },

  listPosts(params){
    return request({
      url: "/posts",
      method: "GET",
      params
    })
  },

  searchPosts(params){
    return request({
      url: "/posts/search",
      method: "GET",
      params
    })
  },

  removeMyPost(postId){
    return request({
      url: "/posts/" + postId,
      method: "DELETE"
    })
  },

  likePost(postId){
    return request({
      url: "/posts/" + postId + "/like",
      method: "GET"
    })
  },

  undoLikePost(postId){
    return request({
      url: "/posts/" + postId + "/undo-like",
      method: "GET"
    })
  },

  //admin-----------------------------

  removePost(postId){
    return request({
      url: "/admin/posts/" + postId,
      method: "DELETE"
    })
  },
}