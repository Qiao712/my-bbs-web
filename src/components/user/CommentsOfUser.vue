<template>
  <el-empty description="无评论" v-if="!comments || comments.length == 0"/>

  <div class="comment-preview" v-for="comment in comments" :key="comment.id">
    <div>
      在 
      <router-link :to="'/forum/'+ comment.forumId">{{comment.forum}}</router-link>
      : 
      <router-link :to="'/post/'+ comment.postId">{{comment.postTitle}}</router-link>
      中
      <span v-if="comment.repliedUserName">回复 <router-link :to="'/user'">{{comment.repliedUserName}}</router-link></span>
    </div>
    
    <div class="comment-preview-content">
      {{comment.content}}
    </div>
    
    <div class="bottom-bar">
      <!--删除按钮， 气泡确认框-->
      <el-popconfirm title="是否删除?" @confirm="deleteComment(comment.id)" confirm-button-text="确认" cancel-button-text="取消">
        <template #reference>
          <span style="color: grey">删除</span>
        </template>
      </el-popconfirm>
      
      发布于: {{comment.createTime}}
    </div>
  </div>

  <el-pagination
    :current-page="pageNo"
    :page-size="pageSize"
    :total="total"
    :pager-count="5"
    @current-change="handlePageChange"
    layout="prev, pager, next"
    style="background-color: white;"
  />
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import commentApi from "../../api/commentApi"
import htmlUtil from "../../util/htmlUtil"

export default {
  name: "CommentsOfUser",
  
  props: ["username"],
  
  data(){
    return{
      comments: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    }
  },

  created(){
    this.getCommentsByAuthor()
  },
  
  methods:{
    getCommentsByAuthor(){
      if(!this.username) return
      
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        authorUsername: this.username
      }

      commentApi.removeMyComment(params).then(
        response=>{
          this.pageNo = response.data.current
          this.comments = response.data.records
          this.total = response.data.total

          this.comments.forEach(comment=>{
            //时间格式化
            comment.createTime = (new Date(comment.createTime)).toLocaleString()
            comment.updateTime = (new Date(comment.updateTime)).toLocaleString()

            //生成预览内容
            comment.content = htmlUtil.getTextFromHtml(comment.content)
          })
        }
      )
    },

    deleteComment(commentId){
      commentApi.deleteComment(commentId).then(
        ()=>{
          this.getCommentsByAuthor()
          ElMessage.success("删除成功")
        }
      )
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.getCommentsByAuthor()
    },
  }
}
</script>

<style scoped>
.comment-preview{
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  margin-top: 5px;

  word-wrap: break-word;
  word-break: break-word;
}

.link{
  color: #33b7f9;
}

.bottom-bar{
  text-align: right;
  font-size: 14px;
}
</style>