<template>
  <div v-if="post">
    <div class="user-bar">
      <img class="big-avatar" v-if="post.author.avatarUrl" :src="post.author.avatarUrl"/>
      <img class="big-avatar" v-if="! post.author.avatarUrl" src="../../assets/default-avatar.png"/>
      <p class="mid-text">{{post.author.username}} : </p>

      <div v-if="!highlight" class="mid-text">{{post.title}} </div>
      <div v-if="highlight" class="mid-text post-preview" v-html="post.title"></div> <!--允许使用标签,以显示高亮-->
    </div>

    <div>
      <!---用于显示预览效果-->
      <span v-if="!highlight" class="small-text">
        {{post.preview}}
      </span>
      
      <!--允许使用标签,以显示高亮,用于展示搜索结果-->
      <span v-if="highlight" class="small-text post-preview" v-html="post.content">
      </span>
    </div>

    <div class="statistic-text">
      <span v-if="post.likeCount != null">赞:{{post.likeCount}}</span> 
      <span style="margin-left: 10px" v-if="post.commentCount != null">评论:{{post.commentCount}}</span>
      <span style="margin-left: 10px" v-if="post.viewCount != null">浏览量: {{post.viewCount}}</span>
      <span style="margin-left: 10px">{{post.createTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  
  props: [
    "post",
    "highlight" //是否启用高亮显示(<em>标签)，用于展示贴子搜索结果
  ],
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

.bottom-bar{
  display:flex;
  align-items:center;
}

.time-text{
  font-size: 16px;
  margin: 2px;
  text-align: left;
  color:grey;
}

.statistic-text{
  font-size: 16px;
  margin: 2px;
  text-align: right;
  color:grey;
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