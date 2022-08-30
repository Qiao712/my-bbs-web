import request from "./request"

export default{
  getForum(forumId){
    return request({
      url: "/forums/" + forumId,
      method: "GET"
    })
  },

  listForums(query){
    return request({
      url: "/forums",
      method: "GET",
      params: query
    })
  },

  listAllForums(){
    return request({
      url: "/forums/all",
      method: "GET"
    })
  },

  //admin------------------

  addForum(forum){
    return request({
      url: "/admin/forums",
      method: "POST",
      data: forum
    })
  },

  removeForum(forumId){
    return request({
      url: "/admin/forums/" + forumId,
      method: "DELETE",
    })
  },

  updateForum(forum){
    return request({
      url: "/admin/forums",
      method: "PUT",
      data: forum
    })
  },

  listCategories(){
    return request({
      url: "/admin/forums/categories",
      method: "GET"
    })
  },

  setForumLogo(forumId, formData){
    return request({
      url: "/admin/forums/" + forumId + "/logo",
      method: "PUT",
      data: formData
    })
  }
}