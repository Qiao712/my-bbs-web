<template>
  <!--论坛标题-->
  <el-row justify="center" v-if="forum">
    <el-col class="forum-bar" :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <el-avatar :size="80" style="margin: 10px" :src="forum.logoUrl" />
      <div class="title-font">{{forum.name}}</div>
    </el-col>
  </el-row>

  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <PostList :posts="posts"/>
    </el-col>
  </el-row>

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

  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="12">
      <PostEdit :forumId="forumId"/>
    </el-col>
  </el-row>
</template>

<script>
import PostList from "../post/PostList"
import PostEdit from "../post/PostEdit"
import postApi from "../../api/postApi"
import forumApi from "../../api/forumApi"

export default {
  name: "ForumView",
  
  components:{
    PostList,
    PostEdit
  },

   data(){
    return {
      forumId: null,

      forum: null,
      posts: [],

      pageSize: 10,
      pageNo: 1,
      total: 0
    }
  },

  created(){
    this.forumId = this.$route.params.forumId
    this.listPosts()
    this.getForum()
  },

  methods:{
    getForum(){
      if(!this.forumId) return

      forumApi.getForum(this.forumId).then(
        (response)=>{
          this.forum = response.data
        }
      )
    },

    listPosts(){
      if(!this.forumId) return

      let params = {
        pageSize: this.pageSize,
        pageNo: this.postNo,
        forumId: this.forumId
      }

      postApi.listPosts(params).then(
        (response) => {
          this.posts = response.data.records
          this.pageNo = response.data.current
          this.total = response.data.total

          this.posts.forEach(post => {
            post.createTime = new Date(post.createTime).toLocaleString()
          })
        }
      )
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.listPosts()
    }
  }
}
</script>

<style scoped>
.title-font{
  font-size: 20px
}

.forum-bar{
  height: 100px;
  display:flex;
	align-items:center;
}
</style>