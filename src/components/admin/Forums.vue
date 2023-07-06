<template>
  <div class="container">
    <!--选项-->
    <div class="head">
      <el-form :inline="true">
        <el-form-item label="分类名">
          <el-input v-model="queryForm.name"/>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="queryForm.category" placeholder="选择分类" clearable>
            <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryForums()">查询</el-button>
          <el-button type="primary" @click="addForumDialogVisible = true">添加分类</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!--分类列表-->
    <div class="main">
      <el-table :data="forums">
        <el-table-column prop="name" label="分类名"/>
        
        <el-table-column label="Logo">
          <template #default="scope">
            <img class="logo" v-if="forums[scope.$index].logoUrl" :src="forums[scope.$index].logoUrl" />
            <img class="logo" v-if="!forums[scope.$index].logoUrl" src="../../assets/default-forum-logo.png" />
          </template>
        </el-table-column>
        
        <el-table-column prop="category" label="分类名"/>
        <el-table-column prop="description" label="描述"/>
        <el-table-column prop="createTime" label="创建时间"/>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="removeForum(scope.$index)">删除</el-button>
            <el-button link type="primary" size="small" @click.prevent="editForum(scope.$index)">编辑</el-button>
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

  <el-dialog v-model="addForumDialogVisible" title="添加分类">
    <ForumAdd :refresh="()=>{
      addForumDialogVisible = false
      this.listForums()
    }"/>
  </el-dialog>

  <el-dialog v-model="editForumDialogVisible" title="编辑分类">
    <ForumEdit 
      :refresh="()=>{
        editForumDialogVisible = false
        this.listForums()
      }"

      :originForum="editedForum"
    />
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import forumApi from "../../api/forumApi"
import ForumAdd from "./ForumAdd"
import ForumEdit from "./ForumEdit"

export default {
  name: "Forums",

  components:{
    ForumAdd,
    ForumEdit
  },

  data(){
    return {
      forums: [],
      total: 0,
      tableHeight: 0,
      
      categories: [],

      queryForm: {
        name: "",
        category: "",
      },

      query: {
        name: "",
        category: "",
        pageNo: 1,
        pageSize: 10,
      },

      addForumDialogVisible: false,
      editForumDialogVisible: false,
      editedForum: null,  //被编辑的forum，用于传递给编辑组件
    }
  },

  created(){
    this.listForums()
    this.listCategories()
  },

  methods:{
    listForums(){
      this.query

      forumApi.listForums(this.query).then(
        (response)=>{
          this.query.pageNo = response.data.current
          this.forums = response.data.records
          this.total = response.data.total

          //时间格式化
          this.forums.forEach(forum=>{
            forum.createTime = (new Date(forum.createTime)).toDateString()
            forum.updateTime = (new Date(forum.updateTime)).toDateString()
          })
        }
      )
    },

    removeForum(index){
      forumApi.removeForum(this.forums[index].id).then(
        ()=>{
          this.listForums()
          ElMessage.success("删除成功")
        }
      )
    },

    listCategories(){
      forumApi.listCategories().then(
        (response)=>{
          this.categories = response.data
        }
      )
    },

    queryForums(){
      this.query.name = this.queryForm.name
      this.query.category = this.queryForm.category
      this.listForums()
    },

    editForum(index){
      this.editedForum = this.forums[index]
      this.editForumDialogVisible = true
    },

    handlePageChange(pageNo){
      this.query.pageNo = pageNo
      this.listForums()
    },
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

.el-table{
  width: 100%;
}

.el-form{
  margin: 10px;
}

.logo{
  width: 32px;
  height: 32px;
  border-radius: 100%;
}
</style>