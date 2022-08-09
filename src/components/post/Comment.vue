<template>
  <div class="comment" v-if="comment">
    <div class="user-bar">
      <img class="big-avatar" v-if="comment.author.avatarUrl" :src="comment.author.avatarUrl"/>
      <img class="big-avatar" v-if="! comment.author.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <p class="small-text">{{comment.author.username}}</p>
      <p class="small-text">{等级}</p>
    </div>

    <div class="comment-content">
      <!--回复内容-->
      <div class="editor-content-view" v-html="comment.content">
      </div>

      <!--按钮条-->
      <div class="bottom-bar">
        <span class="small-text">{{no}}楼</span>
        <span class="small-text">{{comment.createTime}}</span>
        <span class="small-text" style="color: blue">举报</span>
        <!-- <span class="small-text" style="color: blue" @click="replyDialogVisible = true">回复</span> -->
        <!-- <span class="small-text" style="color: blue" @click="deleteComment">删除</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: [
    "comment",  
    "no"        //"楼层数"
  ]
}
</script>

<style scoped>
@import "../../assets/css/edit-content.css";

@media (max-device-width: 500px) {
  .comment{
    display: grid;
    grid-template-rows: 10% 90%;
  }

  .big-avatar{
    margin: 0.5rem;
    height: 4rem;
    width: 4rem;
  }

  .user-bar{
    display: flex;
    align-items: center;
  }
}

@media (min-device-width: 500px){
  .comment{
    display: grid;
    grid-template-columns: 10% 90%;
  }

  .big-avatar{
    margin-top: 0.5rem;
    width: 90%;
  }

  .user-bar{
    text-align: center;
  }
}

.comment-content{
  color: var(--el-text-color-regular);
  min-height: 60px;
  margin: 10px;
}

.sub-reply{
  margin: 10px;
  box-shadow: var(--el-box-shadow-light)
}

.small-text{
  font-size: 16px;
  margin: 5px;
}


.bottom-bar{
  display: flex;
  justify-content: flex-end;
}
</style>