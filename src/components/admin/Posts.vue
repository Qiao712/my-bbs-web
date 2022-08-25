<template>
  <!--选项-->
  <div class="container">
    <div class="head">
      <el-form :inline="true">
        <!-- <el-form-item label="贴子标题">
          <el-input v-model="queryForm.title"/>
        </el-form-item> -->
        <el-form-item label="板块">
          <el-select v-model="queryForm.forumId" placeholder="选择板块" clearable>
            <el-option v-for="forum in forums" :key="forum.id" :label="forum.name" :value="forum.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="queryForm.authorUsername" placeholder="请输入作者用户名"/>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="queryPosts()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!--板块列表-->
    <div class="main">
      <el-table :data="posts">
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="author.username" label="发布者"/>
        <el-table-column prop="forumName" label="板块"/>
        <el-table-column prop="content" label="内容"/>
        <el-table-column prop="commentCount" label="评论数"/>
        <el-table-column prop="likeCount" label="点赞数"/>
        <el-table-column prop="createTime" label="发布时间"/>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="goToPost(scope.$index)">查看</el-button>
            <el-button link type="primary" size="small" @click.prevent="removePost(scope.$index)">删除</el-button>
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
import postApi from "../../api/postApi"
import forumApi from "../../api/forumApi"
import htmlUtil from "../../util/htmlUtil"

export default {
  name: "Posts",

  data(){
    return {
      forums: [],

      queryForm:{
        forumId: null,
        authorUsername: "",
      },

      query:{
        forumId: null,
        authorUsername: null,

        pageSize: 10,
        pageNo: 1
      },

      posts: [],
      total: 0
    }
  },

  created(){
    this.listForums(),
    this.listPosts()
  },

  methods:{
    listForums(){
      forumApi.listAllForums().then(
        (response)=>{
          this.forums = response.data
        }
      )
    },

    listPosts(){
      postApi.listPosts(this.query).then(
        (response) => {
          this.posts = response.data.records
          this.query.pageNo = response.data.current
          this.total = response.data.total

          this.posts.forEach(post => {
            post.createTime = new Date(post.createTime).toLocaleString()

            //去除富文本html标签
            post.content = htmlUtil.getTextFromHtml(post.content)
            if(post.content.length > 100){
              post.content = post.content.substr(0, 94) + "......"
            }
          })
        }
      )
    },

    removePost(index){
      postApi.removePost(this.posts[index].id).then(
        ()=>{
          ElMessage.success("删除成功")
          this.listPosts()
        }
      )
    },

    goToPost(index){
      this.$router.push({path: "/post/" + this.posts[index].id})
    },

    queryPosts(){
      this.query.forumId = this.queryForm.forumId
      if(this.queryForm.authorUsername != "")
        this.query.authorUsername = this.queryForm.authorUsername
      else
        this.query.authorUsername = null

      this.listPosts()
    },

    handlePageChange(pageNo){
      this.query.pageNo = pageNo
      this.listPosts()
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