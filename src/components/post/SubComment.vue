<template>
  <div class="sub-comment">
    <!--头像-->
    <div style="text-align: center">
      <el-image class="avatar" :fit="fill" shape="square" v-if="!comment.author.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <el-image class="avatar" :fit="fill" shape="square" v-if="comment.author.avatarUrl" src="comment.author.avatarUrl"/>
    </div>

    <!--回复-->
    <div>
      <!--回复内容-->
      <div class="sub-comment-content">
        <span class="small-text">
          {{comment.author.username}}
          <span v-if="comment.repliedId != comment.parentId">回复 <span style="color: pink">{{comment.repliedUserName}}</span></span>
          :{{comment.content}}
        </span>
      </div>

      <!--按钮条-->
      <div class="bottom-bar">
        <span class="small-text">{{comment.createTime}}</span>
        <span class="small-text" style="color: blue" @click="replyDialogVisible = true">回复</span>
      </div>

      <!--回复弹窗-->
      <el-dialog v-model="replyDialogVisible" :title="'回复' + comment.author.username">
        <el-input v-model="replyContent"></el-input>
        <el-button style="margin-top: 1rem" @click="reply">发送</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import commentApi from "../../api/commentApi"
import { ElMessage } from 'element-plus'

export default {
  name: "SubComment",
  props: [
    "comment",
    "refresh"
  ],
  data(){
    return {
      //回复
      replyDialogVisible: false,
      replyContent: "",
    }
  },

  methods:{
    //回复一个一级评论
    reply(){
      let comment = {
        postId: this.comment.postId,
        repliedId: this.comment.id,
        content: this.replyContent
      }

      commentApi.addComment(comment).then(
        ()=>{
          this.replyDialogVisible = false
          this.replyContent = ""
          if(this.refresh) this.refresh()
          ElMessage.success("回复成功")
        }
      )
    },
  }
}
</script>

<style scoped>
.sub-comment{
  display: grid;
  grid-template-columns: 5% 95%;
  grid-template-rows: 100%;
}

.small-text{
  font-size: 12px;
  margin: 5px;
}

.sub-comment-content{
  color: var(--el-text-color-regular);
  font-size: 15px;
  margin: 5px;
}

.avatar{
  margin: 2px;
}

.bottom-bar{
  display: flex;
  justify-content: flex-end;
}
</style>