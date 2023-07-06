<template>
  <div v-if="post">
    <div class="user-bar">
      <img class="big-avatar" v-if="post.author.avatarUrl" :src="post.author.avatarUrl"/>
      <img class="big-avatar" v-if="! post.author.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <p class="mid-text">{{post.author.username}} : </p>

      <div v-if="!highlight" class="mid-text">{{post.title}} </div>
      <div v-if="highlight" class="mid-text post-preview" v-html="post.title"></div> <!--允许使用标签,以显示高亮-->
    </div>

    <div>
      <!--显示提取的Text-->
      <span v-if="!highlight" class="small-text">
        {{contentText}}
      </span>
      
      <!--允许使用标签,以显示高亮,用于展示搜索结果-->
      <span v-if="highlight" class="small-text post-preview" v-html="post.content">
      </span>
    </div>

    <div class="time-text">
      {{post.likeCount}}👍 {{post.commentCount}}条回答 {{post.createTime}}
    </div>
  </div>
</template>

<script>
import htmlUtil from "../../util/htmlUtil"

export default {
  name: "PostPreview",
  
  props: [
    "post",
    "highlight" //是否启用高亮显示(<em>标签)，用于展示问题搜索结果
  ],

  data(){
    return {
      contentText: ""
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
      //限制长度
      if(this.contentText.length > 200){
        this.contentText = this.contentText.substring(0, 194) + "......";
      }
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

<style>
/**搜索结果中关键字的高亮, 要放在不加scoped的style里，否则v-html的内容无法加上样式*/
.post-preview em{
  color: blue;
  font:bold;
  font-style: normal;
}
</style>