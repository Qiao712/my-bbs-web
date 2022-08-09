<template>
  <div class="comment" v-if="post">
    <div class="user-bar">
      <img class="big-avatar" v-if="post.author.avatarUrl" :src="post.author.avatarUrl"/>
      <img class="big-avatar" v-if="! post.author.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <p class="small-text">{{post.author.username}}</p>
      <p class="small-text">{等级}</p>
    </div>

    <div class="post-content">
      <!--贴子内容-->
      <div class="editor-content-view" v-html="post.content">
      </div>

      <!--按钮条-->
      <div class="bottom-bar">
        <span class="small-text">1楼</span>
        <span class="small-text">{{post.createTime}}</span>
        <span class="small-text" style="color: blue">举报</span>
        <!-- <span class="small-text" style="color: blue">回复</span> -->
        <span class="small-text" style="color: blue">删除</span>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "ReplyView",
  props: ["post"],

  methods:{
    
  }
}
</script>

<style scoped>
/* 大屏 */
@media (max-device-width: 499px) {
  .comment{
    display: grid;
    grid-template-rows: 10% 90%;
  }

  .big-avatar{
    margin: 5px;
    height: 40px;
    width: 40px;
  }

  .user-bar{
    display: flex;
    align-items: center;
  }
}

/* 小屏 */
@media (min-device-width: 500px){
  .comment{
    display: grid;
    grid-template-columns: 10% 90%;
  }

  .big-avatar{
    margin-top: 5px;
    width: 90%;
  }

  .user-bar{
    text-align: center;
  }
}

.post-content{
  color: var(--el-text-color-regular);
  min-height: 150px;
  margin: 10px;
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