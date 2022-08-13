import request from "./request"

export default{
  uploadPicture(file){
    let form = new FormData()
    form.append("picture", file)
    
    return request({
      url: "/posts/pictures",
      method: "POST",
      data: form
    })
  },

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

  removePost(postId){
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
  }
}