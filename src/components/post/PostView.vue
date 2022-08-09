<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="12">
      <p v-if="post" id="post-title">{{post.title}}</p>
    </el-col>
  </el-row>

  <!--一楼(贴子内容)-->
  <!-- <el-row justify="center" v-if="pageNo == 1"> -->
  <el-row justify="center">
    <el-col class="reply-col" :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <FirstLayer v-if="post" :post="post"></FirstLayer>
    </el-col>
  </el-row>

  <!--其他楼层-->
  <el-row justify="center"  v-for="(comment, index) in comments" :key="comment.id">
    <el-col class="reply-col" :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <Comment 
        :comment="comment"
        :no="2 + index + (pageNo - 1) * pageSize"
      />
    </el-col>
  </el-row>

  <!--分页-->
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <el-pagination
          :current-page="pageNo"
          :page-size="pageSize"
          :total="total"
          :pager-count="5"
          @current-change="handlePageChange"
          layout="prev, pager, next"
          style="background-color: white;"
        />
    </el-col>
  </el-row>

  <!-- 回复编辑器 -->
  <el-row justify="center">
    <el-col class="reply-col" :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <CommentEdit :post="post" :listComments="listComments"></CommentEdit>
    </el-col>
  </el-row>
</template>

<script>
import FirstLayer from "./FirstLayer"
import CommentEdit from "./CommentEdit"
import Comment from "./Comment"
import postApi from "../../api/postApi"
import commentApi from "../../api/commentApi"

export default {
  name: "PostView",
  components:{
    FirstLayer,
    CommentEdit,
    Comment
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

    listComments(){
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        postId: this.postId
      }

      commentApi.listComments(params).then(
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
  margin-top: 0.5rem;
}

.reply-col{
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 0.5rem;
  min-height: 10vh;
}

</style>