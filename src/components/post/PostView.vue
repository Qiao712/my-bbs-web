<template>
  <ViewContainer>
    <p v-if="post" id="post-title">{{post.title}}</p>
    
    <!--一楼(贴子内容)-->
    <div class="reply-col" v-if="pageNo == 1">
      <FirstLayer v-if="post" :post="post"></FirstLayer>
    </div>

    <!--其他楼层-->
    <div class="reply-col" v-for="(comment, index) in comments" :key="comment.id">
      <Comment 
        :comment="comment"
        :no="2 + index + (pageNo - 1) * pageSize"
        :refresh="listComments"
      />
    </div>

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

    <!-- 回复编辑器 -->
    <CommentEdit :post="post" :listComments="listComments"></CommentEdit>
  </ViewContainer>
</template>

<script>
import FirstLayer from "./FirstLayer"
import CommentEdit from "./CommentEdit"
import Comment from "./Comment"
import postApi from "../../api/postApi"
import answerApi from "../../api/answerApi"
import ViewContainer from "../common/ViewContainer.vue"

export default {
  name: "PostView",
  components:{
    FirstLayer,
    CommentEdit,
    Comment,
    ViewContainer
  },
  data(){
    return {
      postId: null,
      post: null,
      comments: [],

      pageNo: 1,
      pageSize: 10,
      total: 0,
    }
  },

  mounted(){
    this.getPost()
    this.listComments()
  },

  methods:{
    getPost(){
      this.postId = this.$route.params.postId
      if(this.postId){
        postApi.getPost(this.postId).then(
          (response) => {
            this.post = response.data
            this.post.createTime = new Date(this.post.createTime).toLocaleString()
          }
        )
      }
    },

    //一级评论即答案
    listComments(){
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        questionId: this.postId
      }

      answerApi.listAnswers(params).then(
        (response)=>{
          this.pageNo = response.data.current
          this.comments = response.data.records
          this.total = response.data.total

          //时间格式化
          this.comments.forEach(comment=>{
            comment.createTime = (new Date(comment.createTime)).toLocaleString()
            comment.updateTime = (new Date(comment.updateTime)).toLocaleString()
          })
        }
      )
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.listComments()
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/edit-content.css";
#post-title {
  color: var(--el-text-color-regular);
  font-size: 20px;
  margin: 10px 0;
  justify-content: flex-start;
}

#post-content{
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  margin-top: 5px;
}

.reply-col{
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 5px;
  min-height: 10vh;
}

</style>