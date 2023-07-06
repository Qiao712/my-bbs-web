import request from "./request"

export default{
    addAnswer(answer){
        return request({
          url: "/answers",
          method: "POST",
          data: answer
        })
      },
    
      listAnswers(params){
        return request({
          url: "/answers",
          method: "GET",
          params
        })
      },
    
    //   listMyAnswers(params){
    //     return request({
    //       url: "/answers/my",
    //       method: "GET",
    //       params
    //     })
    //   },
    
      removeMyAnswer(answerId){
        return request({
          url: "/answers/" + answerId,
          method: "DELETE"
        })
      },
    
      likeAnswer(answerId){
        return request({
          url: "/answers/" + answerId + "/like",
          method: "GET"
        })
      },
      
      undoLikeAnswer(answerId){
        return request({
          url: "/answers/" + answerId + "/undo-like",
          method: "GET"
        })
      },
    
      //admin--------------
    
    //   listAnswerDetails(params){
    //     return request({
    //       url: "/admin/answers/details",
    //       method: "GET",
    //       params
    //     })
    //   },
    
    //   removeAnswer(answerId){
    //     return request({
    //       url: "/admin/answers/" + answerId,
    //       method: "DELETE",
    //     })
    //   },
}