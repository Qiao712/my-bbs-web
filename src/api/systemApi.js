import request from "./request"

export default{
  getStatistic(){
    return request({
      url: "/admin/sys/statistic",
      method: "GET"
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