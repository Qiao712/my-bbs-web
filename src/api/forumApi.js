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

  addForum(forum){
    return request({
      url: "/forums",
      method: "POST",
      data: forum
    })
  },

  removeForum(forumId){
    return request({
      url: "/forums/" + forumId,
      method: "DELETE",
    })
  },

  updateForum(forum){
    return request({
      url: "/forums",
      method: "PUT",
      data: forum
    })
  },

  listCategories(){
    return request({
      url: "/forums/categories",
      method: "GET"
    })
  }
}