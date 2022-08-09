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
    }
  }