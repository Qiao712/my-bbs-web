<template>
  <ViewContainer>
    <!--论坛标题-->
    <div class="forum-bar" v-if="forum">
      <el-avatar :size="80" style="margin: 10px" :src="forum.logoUrl" />
      <div class="title-font">{{forum.name}}</div>
    </div>
    
    <!--论坛描述-->
    <div class="font-size: 16px" v-if="forum">
      {{forum.description}}
    </div>

    <!--选择排序方式-->
    <el-radio-group v-model="orderBy" @change="listPosts">
      <el-radio label="score" size="large">最热</el-radio>
      <el-radio label="create_time" size="large">最新</el-radio>
    </el-radio-group>

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

    <PostEdit :forumId="forumId"/>
  </ViewContainer>
</template>

<script>
import PostList from "../post/PostList"
import PostEdit from "../post/PostEdit"
import postApi from "../../api/postApi"
import forumApi from "../../api/forumApi"
import ViewContainer from "../common/ViewContainer.vue"

export default {
  name: "ForumView",
  
  components:{
    PostList,
    PostEdit,
    ViewContainer
  },

   data(){
    return {
      forumId: null,

      forum: null,
      posts: [],

      pageSize: 10,
      pageNo: 1,
      total: 0,
      orderBy: "score",
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
      console.log(this.orderBy)

      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        forumId: this.forumId,
        orderBy: this.orderBy
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
    },
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