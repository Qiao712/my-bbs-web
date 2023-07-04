import request from "./request.js"

export default {
  uploadImage(file){
    let form = new FormData()
    form.append("file", file)
    
    return request({
      url: "/files/",
      method: "POST",
      data: form
    })
  }
}