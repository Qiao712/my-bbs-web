<template>
  <div class="comment" v-if="comment">
    <div class="user-bar">
      <UserInfo :user="comment.author"/>
    </div>

    <div class="comment-content">
      <!--回复内容-->
      <div class="editor-content-view" v-html="comment.content">
      </div>

      <!--子回复-->
      <div v-if="subComments.length > 0" class="sub-comment-box">
        <!--子回复1-->
        <SubComment v-for="subComment in subComments" :key="subComment.id" :comment="subComment" :refresh="listSubComments"/>
        <!--分页-->
        <el-pagination
          :current-page="pageNo"
          :page-size="pageSize"
          :total="total"
          :pager-count="5"
          @current-change="handlePageChange"
          layout="prev, pager, next"
          style="background-color: white;"
        />
      </div>

      <!--按钮条-->
      <div class="bottom-bar">
        <el-button link type="info" @click="likeComment"     plain v-if="!liked">赞 {{likeCount}}</el-button>
        <el-button link type="primary" @click="undoLikeComment" v-if="liked">已赞 {{likeCount}}</el-button>

        <span class="small-text">{{no}}楼</span>
        <span class="small-text">{{comment.createTime}}</span>
        <el-button link @click="replyDialogVisible = true">回复</el-button>
        <el-button link @click="deleteComment">删除</el-button>
      </div>
    </div>
  </div>

  <!--回复弹窗-->
  <el-dialog v-model="replyDialogVisible" :title="'回复' + comment.author.username">
    <el-input v-model="replyContent"></el-input>
    <el-button style="margin-top: 1rem" @click="reply">发送</el-button>
  </el-dialog>
</template>

<script>
import commentApi from "../../api/commentApi"
import SubComment from "./SubComment"
import UserInfo from './UserInfo.vue'
import { ElMessage } from 'element-plus'
import htmlUtil from '../../util/htmlUtil'

export default {
  name: "Comment",
  props: [
    "comment",  
    "no",        //"楼层数"
    "refresh"    //用于刷新列表的回调函数
  ],

  components:{
    SubComment,
    UserInfo
  },

  data(){
    return {
      subComments: [],
      pageSize: 5,
      pageNo: 1,
      total: 0,

      liked: this.comment.liked,          //是否已点赞
      likeCount: this.comment.likeCount,  //点赞数

      //回复弹窗
      replyDialogVisible: false,
      replyContent: "",

      //检查过滤后的HTML(防止Xss, 去除不允许的标签,属性)
      cleanCommentContent: ""
    }
  },

  created(){
    this.$watch(
      () => this.comment,
      () => {
        this.listSubComments()
        
        //过滤内容html
        this.cleanCommentContent = htmlUtil.purifyHtml(this.comment.content)
      },
      { immediate: true }
    )
  },

  methods:{
    listSubComments(){
      if(!this.comment) return

      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        postId: this.comment.postId,
        parentCommentId: this.comment.id
      }
      commentApi.listComments(params).then(
        (response)=>{
          this.pageNo = response.data.current
          this.subComments = response.data.records
          this.total = response.data.total

          //时间格式化
          this.subComments.forEach(comment=>{
            comment.createTime = (new Date(comment.createTime)).toLocaleString()
            comment.updateTime = (new Date(comment.updateTime)).toLocaleString()
          })
        }
      )
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.listSubComments()
    },

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
          ElMessage.success("发布成功")
          this.listSubComments()
        }
      )
    },

    deleteComment(){
      commentApi.removeMyComment(this.comment.id).then(
        ()=>{
          ElMessage.success("删除成功")
          if(this.refresh) this.refresh()
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
@import "../../assets/css/edit-content.css";

.comment{
  display: grid;
  grid-template-columns: 100px auto;
  min-height: 100px;
}

.big-avatar{
  margin-top: 0.5rem;
  width: 90%;
}

.user-bar{
  text-align: center;
}

.comment-content{
  color: var(--el-text-color-regular);
  margin: 10px;
}

.editor-content-view{
  min-height: 80px;
}

.sub-comment-box{
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