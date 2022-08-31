<template>
  <PostList :posts="posts"/>

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
import PostList from "../post/PostList"
import postApi from "../../api/postApi"

export default {
  name: "PostsOfUser",
  props: ["username"],
  components:{
    PostList
  },

  data(){
    return {
      posts: [],
      pageSize: 10,
      pageNo: 1,
      total: 0
    }
  },

  created(){
    this.getPosts()
  },

  methods:{
    getPosts(){
      if(!this.username) return
      
      let params = {
        pageSize: this.pageSize,
        pageNo: this.postNo,
        authorUsername: this.username,
        orderBy: "create_time",
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
      this.getPosts()
    }
  }
}
</script>