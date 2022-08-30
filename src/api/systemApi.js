import request from "./request"

export default{
  getStatistic(){
    return request({
      url: "/admin/sys/statistic",
      method: "GET"
    })
  }
}