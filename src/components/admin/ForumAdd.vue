<template>
  <el-form label-width="100px">
    <el-form-item label="板块名">
      <el-input v-model="forum.name"/>
    </el-form-item>

    <el-form-item label="分类">
      <el-select v-model="forum.category" placeholder="选择分类" :allow-create="true" :filterable="true">
        <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
      </el-select>
    </el-form-item>

    <el-form-item label="描述">
      <el-input v-model="forum.description"/>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="addForum">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import forumApi from "../../api/forumApi"
export default {
  name: "ForumAdd",

  props:[
    "refresh",
  ],

  data(){
    return {
      forum: {
        name: "",
        category: "",
        description: ""
      },

      categories: []
    }
  },

  created(){
    this.listCategories()
  },

  methods:{
    addForum(){
      forumApi.addForum(this.forum).then(
        ()=>{
          ElMessage.success("添加成功")
          if(this.refresh) this.refresh()
        }
      )
    },

    listCategories(){
      forumApi.listCategories().then(
        (response)=>{
          this.categories = response.data
        }
      )
    }
  }
}
</script>

<style>

</style>