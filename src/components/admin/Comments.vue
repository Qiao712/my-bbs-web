<template>
  <!--选项-->
  <div class="container">
    <div class="head">
      <el-form :inline="true">
        <el-form-item label="发布者">
          <UserSelecter :callback="(selected)=>{this.queryForm.authorId = selected ? selected.id : null}"/>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="queryComments()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!--分类列表-->
    <div class="main">
      <el-table :data="comments">
        <el-table-column prop="postTitle" label="问题"/>
        <el-table-column prop="authorUsername" label="发布者"/>
        <el-table-column prop="content" label="内容"/>
        <el-table-column prop="likeCount" label="点赞数"/>
        <el-table-column prop="createTime" label="发布时间"/>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="removeComment(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div>
      <el-pagination
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        :total="total"
        :pager-count="8"
        @current-change="handlePageChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import commentApi from "../../api/commentApi"
import htmlUtil from "../../util/htmlUtil"
import UserSelecter from "./UserSelecter.vue"

export default {
  name: "Comments",

  components: {
    UserSelecter
  },

  data(){
    return {
      forums: [],

      queryForm:{
        authorId: "",
      },

      query:{
        authorId: null,

        pageSize: 10,
        pageNo: 1
      },

      comments: [],
      total: 0
    }
  },

  created(){
    this.listComments()
  },

  methods:{
    listComments(){
      commentApi.listCommentDetails(this.query).then(
        (response) => {
          this.comments = response.data.records
          this.query.pageNo = response.data.current
          this.total = response.data.total

          this.comments.forEach(comment => {
            comment.createTime = new Date(comment.createTime).toLocaleString()

            //去除富文本html标签
            comment.content = htmlUtil.getTextFromHtml(comment.content)
            if(comment.content.length > 100){
              comment.content = comment.content.substr(0, 94) + "......"
            }
          })
        }
      )
    },

    removeComment(index){
      commentApi.deleteComment(this.comments[index].id).then(
        ()=>{
          this.listComments()
          ElMessage.success("删除成功")
        }
      )
    },

    queryComments(){
      this.query.authorId = this.queryForm.authorId
      this.listComments()
    },

    handlePageChange(pageNo){
      this.query.pageNo = pageNo
      this.listComments()
    }
  }
}
</script>

<style scoped>
.container{
  display: grid;
  height: 100%;
  grid-template-rows: 50px auto 40px;
}

.el-form{
  margin: 10px;
}

.main{
  overflow: auto;
}
</style>