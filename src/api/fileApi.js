import request from "./request.js"
import util from "../util/fileUtil.js"

export default {
  //上传至Web服务器，再转发至OSS
  uploadFileToWeb(file){
    let form = new FormData()
    form.append("file", file)
    
    return request({
      url: "/files",
      method: "POST",
      data: form
    })
  },

  //文件直传，整合getUploadPolicy和uploadFileToOSS两部操作
  //成功后callback({ok, fileId, url})
  uploadFileDirectly(file, callback){
    let policy = sessionStorage.getItem("upload-policy")
    let now = Date.parse(new Date()) / 1000
    console.log("now", now)
    if(policy) policy = JSON.parse(policy)

    //缓存的policy未过期
    if(policy != null && policy.expire > now + 3){
      this.uploadFileToOSS(file, policy).then(
        response=>{
          if(callback) callback({
            ok: true,
            fileId: response.data.id,
            url: response.data.url
          })
        }
      )
    }else{
      this.getUploadPolicy().then(
        response=>{
          //从缓存中获取policy
          policy = response.data
          sessionStorage.setItem("upload-policy", JSON.stringify(policy))
          
          this.uploadFileToOSS(file, policy).then(
            response=>{
              if(callback) callback({
                ok: true,
                fileId: response.data.id,
                url: response.data.url
              })
            }
          )
        }
      )
    }
  },

  //根据policy中的配置信息，直接上传文件到AliyunOSS
  uploadFileToOSS(file, policy){
    //生成AliyunOSS要求格式的post表单
    //参考:https://help.aliyun.com/document_detail/31988.htm?spm=a2c4g.11186623.0.0.6ab6765fz5X233#section-d5z-1ww-wdb
    let form = new FormData()
    form.append("key", policy.fileKeyPrefix + util.randomString(8) + util.getSuffixName(file.name))  //生成文件名
    form.append("policy", policy.policy)
    form.append("OSSAccessKeyId", policy.accessId)
    form.append("success_action_status", '200')
    form.append("callback", policy.callback)
    form.append("signature", policy.signature)
    form.append("x-oss-meta-uploader-id", policy.uploaderId)
    form.append("x-oss-forbid-overwrite", policy.forbidOverwrite)
    form.append("x-oss-object-acl", policy.objectAcl)
    form.append("file", file) 

    return request({
      url: policy.host,
      method: "POST",
      data: form
    })
  },

  getUploadPolicy(){
    return request({
      url: "/files/upload-policy",
      method: "GET"
    })
  },

  listFiles(query){
    return request({
      url: "/admin/files",
      method: "GET",
      params: query
    })
  },

  removeFile(fileId){
    return request({
      url: "/admin/files/" + fileId,
      method: "DELETE"
    })
  }
}