<template>
  <div>
    <div class="mid-text">
      <span style="color: blue">{{message.content.authorUsername}}</span>
      在 
      <router-link :to="'/post/' + message.content.questionId">{{message.content.questionTitle}}</router-link>
      中回答了你:
      <span>{{message.content.answer}}</span>
    </div>
    <div class="time-text">{{message.createTime}}</div>
  </div>
</template>

<script>
import htmlUtil from "../../util/htmlUtil"

export default {
  name: "ReplyMessage",
  props: ["message"],

  data(){
    return {
      comment: ""
    }
  },

  created(){
    if(!this.message) return
    this.comment = htmlUtil.getTextFromHtml(this.message.content.comment)
    
    //限制长度
    if(this.comment.length > 200){
      this.comment = this.comment.substring(0, 197) + "...";
    }
  }
}
</script>

<style scoped>
.user-bar{
  display:flex;
	align-items:center;
}

.mid-text{
  font-size: 18px;
  margin: 5px;
}

.time-text{
  font-size: 16px;
  margin: 2px;
  text-align: right;
}
</style>