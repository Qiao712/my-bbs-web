import request from "./request"

export default{
  login(credential){
    return request({
      url: "/auth/login",
      method: "POST",
      data: credential,
    })
  },

  logout(){
    return request({
      url: "/auth/logout",
      method: "GET"
    })
  },

  register(user){
    return request({
      url: "/users/register",
      method: "POST",
      data: user
    })
  },

  getCurrentUser(){
    return request({
      url: "/users/self",
      method: "GET"
    })
  },

  getUser(userId){
    return request({
      url: "/users/" + userId,
      method: "GET"
    })
  },

  setUserAvatar(form){
    return request({
      url: "/users/avatar",
      method: "POST",
      data: form
    })
  },

  getUsers(query){
    return request({
      url: "/users",
      method: "GET",
      params: query
    })
  },

  setUserStatus(userId, enable){
    return request({
      url: ["/users", userId, "status", enable].join("/"),
      method: "PUT"
    })
  },

  updateUser(user){
    return request({
      url: "/users",
      method: "PUT",
      data: user
    })
  },

  removeUser(userId){
    return request({
      url: "/users/" + userId,
      method: "DELETE"
    })
  }
}