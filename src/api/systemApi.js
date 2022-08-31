import request from "./request"

export default{
  getStatistic(){
    return request({
      url: "/admin/sys/statistic",
      method: "GET"
    })
  },

  uploadAdvertisementImage(imageFile){
    let form = new FormData()
    form.append("image", imageFile)
    
    return request({
      url: "/admin/sys/home-ads/images",
      method: "POST",
      data: form
    })
  },

  listAdvertisements(){
    return request({
      url: "/sys/home-ads",
      method: "GET",
    })
  },

  addAdvertisement(advertisement){
    return request({
      url: "/admin/sys/home-ads",
      method: "POST",
      data: advertisement
    })
  },

  removeAdvertisement(advertisementId){
    return request({
      url: "/admin/sys/home-ads/" + advertisementId,
      method: "DELETE",
    })
  },

  updateAdvertisement(advertisement){
    return request({
      url: "/admin/sys/home-ads",
      method: "PUT",
      data: advertisement
    })
  }
}