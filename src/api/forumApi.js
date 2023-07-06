import request from "./request"

export default{
  getForum(forumId){
    return request({
      url: "/categories/" + forumId,
      method: "GET"
    })
  },

  listForums(query){
    return request({
      url: "/categories",
      method: "GET",
      params: query
    })
  },

  listAllForums(){
    return request({
      url: "/categories/all",
      method: "GET"
    })
  },

  //admin------------------

  addForum(forum){
    return request({
      url: "/admin/categories",
      method: "POST",
      data: forum
    })
  },

  removeForum(forumId){
    return request({
      url: "/admin/categories/" + forumId,
      method: "DELETE",
    })
  },

  updateForum(forum){
    return request({
      url: "/admin/categories",
      method: "PUT",
      data: forum
    })
  },

  listCategories(){
    return request({
      url: "/admin/categories/categories",
      method: "GET"
    })
  },

  setForumLogo(forumId, logoUrl){
    return request({
      url: "/admin/categories/" + forumId + "/logo",
      method: "PUT",
      params: {
        logoUrl
      }
    })
  }
}