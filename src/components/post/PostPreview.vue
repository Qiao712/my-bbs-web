<template>
  <div v-if="post">
    <div class="user-bar">
      <img class="big-avatar" v-if="post.author.avatarUrl" :src="post.author.avatarUrl"/>
      <img class="big-avatar" v-if="! post.author.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <p class="mid-text">{{post.author.username}}</p>
      <p class="mid-text">: {{post.title}} </p>
    </div>

    <div>
      <span class="small-text">
        {{contentText}}
      </span>
    </div>

    <div class="time-text">
      👍:{{post.likeCount}} {{post.createTime}}
    </div>
  </div>
</template>

<script>
import htmlUtil from "../../util/htmlUtil"

export default {
  name: "PostPreview",
  props: ["post"],

  data(){
    return {
      contextText: ""
    }
  },

  created(){
    this.$watch(
      () => this.post,
      () => this.getPostContentPreview(),
      { immediate: true }
    )
  },
  
  methods:{
    getPostContentPreview(){
      if(! this.post) return
      this.contentText = htmlUtil.getTextFromHtml(this.post.content)
    },
  }
}
</script>

<style scoped>
.big-avatar{
  margin: 5px;
  height: 32px;
  width: 32px;
}

.user-bar{
  display: flex;
  align-items: center;
}

.mid-text{
  font-size: 18px;
  margin: 5px;
}

.small-text{
  font-size: 18px;
  margin: 5px;
  word-wrap: break-word;
  word-break: break-word;
}

.time-text{
  font-size: 16px;
  margin: 2px;
  text-align: right;
}
</style>