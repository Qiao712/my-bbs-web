<template>
  <view-container>
    <div class="main-view">  
        <!--左侧标签选择-->
        <div class="left-div">
          <el-menu
            default-active="0"
            @select="handleTagSelect"
          >
            <el-menu-item index="0">
              <template #title>
                <el-icon><location /></el-icon>
                <span>全部</span>
              </template>
            </el-menu-item>

            <el-menu-item v-for="tag in tags" :key="tag.id" :index="tag.id">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{tag.name}}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </div>

        <!--问题列表-->
        <div class="right-div">
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
        </div>  
    </div>
  </view-container>
</template>

<script>
import tagApi from "../api/tagApi"
import postApi from "../api/postApi"
import ViewContainer from "../components/common/ViewContainer.vue"
import PostList from './post/PostList.vue'

export default {
  name: "IndexView", 

  components: {
    PostList,
    ViewContainer,
  },

  data(){
    return {
      //标签选择
      tags: [],
      selectedTagId: 0, //0表示全部

      // 问题列表
      posts: [],
      pageSize: 10,
      pageNo: 1,
      total: 0,
      orderBy: "score",
    }
  },

  created(){
    this.getTags()
    this.listPosts()
  },

  methods: {
    getTags(){
      let params = {
        pageNo: 1,
        pageSize: 30,
        category: "推荐标签"
      }

      tagApi.listTags(params).then(
        (response)=>{
          this.tags = response.data.records
        }
      )
    },

    listPosts(){
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        tagId: this.selectedTagId,
        orderBy: this.orderBy
      }

      if(params.tagId == 0){
        params.tagId = null
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

    handleTagSelect(key){
      this.selectedTagId = key
      this.listPosts()
    },

    handlePageChange(pageNo){
      this.pageNo = pageNo
      this.listPosts()
    },
  }
}
</script>

<style>
.main-view {  
  display: flex;  
  width: 100%;
  height: 100%;
}  

.left-div {  
  flex: 0 0 20%;  
  max-width: 200px;   
}  

.right-div {  
  flex: 1;
  margin-inline: 5px;
}  
</style>