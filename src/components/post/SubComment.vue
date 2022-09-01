<template>
  <div class="sub-comment">
    <!--头像, 鼠标悬浮时，弹出大头像和按钮-->
    <el-popover
      style="text-align: center"
      placement="top-start"
      :width="100"
      trigger="hover"
    >
      <template #reference>
        <img class="avatar" v-if="!comment.author.avatarUrl" src="../../assets/default-avatar.png"/>
        <img class="avatar" v-if="comment.author.avatarUrl" :src="comment.author.avatarUrl"/>
      </template>

      <UserInfo :user="comment.author"/>
    </el-popover>

    <!--回复-->
    <div>
      <!--回复内容-->
      <div class="sub-comment-content">
        <span class="small-text">
          {{comment.author.username}}
          <span v-if="comment.repliedId != comment.parentId">回复 <span style="color: pink">{{comment.repliedUserName}}</span></span>:
          {{comment.content}}
        </span>
      </div>

      <!--按钮条-->
      <div class="bottom-bar">
        <el-button link @click="likeComment" v-if="!liked">点赞 {{likeCount}}</el-button>
        <el-button link type="primary" @click="undoLikeComment" v-if="liked">已赞 {{likeCount}}</el-button>
        <el-button link>{{comment.createTime}}</el-button>
        <el-button link @click="replyDialogVisible = true">回复</el-button>
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
import UserInfo from './UserInfo.vue'

export default {
  name: "SubComment",

  props: [
    "comment",
    "refresh"
  ],

  components:{
    UserInfo
  },

  data(){
    return {
      //回复
      replyDialogVisible: false,
      replyContent: "",

      liked: this.comment.liked,          //是否已点赞
      likeCount: this.comment.likeCount,  //点赞数
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

    likeComment(){
      commentApi.likeComment(this.comment.id).then(
        ()=>{
          this.liked = true
          this.likeCount++
          ElMessage.success("点赞成功")
        }
      )
    },

    undoLikeComment(){
      commentApi.undoLikeComment(this.comment.id).then(
        ()=>{
          this.liked = false
          this.likeCount--
          ElMessage.success("取消点赞成功")
        }
      )
    }
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
  word-wrap:break-word;
  word-break:break-word;
}

.avatar{
  margin: 2px;
  width: 32px;
  height: 32px;
}

.bottom-bar{
  display: flex;
  justify-content: flex-end;
}
</style>