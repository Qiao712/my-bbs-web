import request from "./request"

export default{
  getStatistic(){
    return request({
      url: "/sys/statistic",
      method: "GET"
    })
  }
}