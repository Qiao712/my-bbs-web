import request from "./request"

export default{
  listRoles(){
    return request({
      url: "/admin/roles",
      method: "GET"
    })
  },

  getRole(roleId){
    return request({
      url: "/admin/roles/" + roleId,
      method: "GET"
    })
  },

  updateRole(role){
    return request({
      url: "/admin/roles",
      method: "PUT",
      data: role
    })
  },

  addRole(role){
    return request({
      url: "/admin/roles",
      method: "POST",
      data: role
    })
  },

  removeRole(roleId){
    return request({
      url: "/admin/roles/" + roleId,
      method: "DELETE"
    })
  },

  listAuthorities(){
    return request({
      url: "/admin/roles/authorities",
      method: "GET"
    })
  },

  updateAuthority(authority){
    return request({
      url: "/admin/roles/authorities",
      method: "PUT",
      data: authority
    })
  },

  removeAuthority(authorityId){
    return request({
      url: "/admin/roles/authorities/" + authorityId,
      method: "DELETE"
    })
  }
}