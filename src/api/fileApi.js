import request from "./request.js"

export default {
  uploadPostImage(file){
    let form = new FormData()
    form.append("file", file)
    
    return request({
      url: "/files/post-images",
      method: "POST",
      data: form
    })
  },

  uploadUserAvatar(file){
    let form = new FormData()
    form.append("file", file)
    
    return request({
      url: "/files/user-avatars",
      method: "POST",
      data: form
    })
  },

  uploadForumLogo(file){
    let form = new FormData()
    form.append("file", file)
    
    return request({
      url: "/files/forum-logos",
      method: "POST",
      data: form
    })
  },

  uploadAdvertisementImage(file){
    let form = new FormData()
    form.append("file", file)
    
    return request({
      url: "/files/advertisement-images",
      method: "POST",
      data: form
    })
  },
}