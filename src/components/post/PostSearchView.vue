<template>
  <div class="search-bar">
    <el-input v-model="searchParam.text"/>
    <el-button style="margin-left: 10px" type="primary" @click="searchPosts()">搜索</el-button>
  </div>
  
  <PostList :posts="posts" :highlight="true"/>
  
  <el-pagination
    :current-page="searchParam.pageNo"
    :page-size="searchParam.pageSize"
    :total="total"
    :pager-count="5"
    @current-change="handlePageChange"
    layout="prev, pager, next"
    style="background-color: white;"
  />
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import postApi from "../../api/postApi"
import PostList from "./PostList"

export default {
  name: "PostSearchView",

  components:{
    PostList
  },

  data(){
    return {
      xxx: "",
      searchParam: {
        text: "",
        authorId: null,
        forumId: null,
        pageNo: 1,
        pageSize: 10
      },

      posts: [],
      total: 0,
    }
  },

  created(){
    //从地址中传入搜索字段，用于Nav中的搜索框携带信息跳转至该页面
    this.$watch(
      () => this.searchParam.text = this.$route.query["text"],
      () => {
        if(this.searchParam.text){
          this.searchPosts()
        }   
      },
      { immediate: true } //立即搜索
    )
  },

  methods:{
    searchPosts(){
      if(this.searchParam.text.trim().length == 0){
        ElMessage.warning("请输入搜索内容")
        return
      }

      postApi.searchPosts(this.searchParam).then(
        (response)=>{
          this.searchParam.pageNo = response.data.current
          this.total = response.data.total
          this.posts = response.data.records
        }
      )
    },

    handlePageChange(pageNo){
      this.searchParam.pageNo = pageNo
      this.searchPosts()
    }
  },
}
</script>

<style scoped>
.search-bar{
  display: grid;
  grid-template-columns: auto 100px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>