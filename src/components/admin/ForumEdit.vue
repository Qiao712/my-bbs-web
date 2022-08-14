<template>
  <el-form label-width="100px">
    <el-form-item label="Logo">
      <ForumLogoUploader :forumId="forum.id" :logoUrl="forum.logoUrl" :refresh="refresh"/>
    </el-form-item>

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
      <el-button type="primary" @click="updateForum">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ForumLogoUploader from './ForumLogoUploader'
import { ElMessage } from 'element-plus/lib/components'
import forumApi from "../../api/forumApi"

export default {
  name: "ForumEdit",

  components: {
    ForumLogoUploader
  },

  props:[
    "originForum",
    "refresh",
  ],

  data(){
    return {
      forum: {
        id: null,
        name: "",
        category: "",
        description: "",
        logoUrl: null,
      },

      categories: []
    }
  },

  created(){
    this.$watch(
      () => this.originForum,
      () => {
        this.forum.id = this.originForum.id
        this.forum.name = this.originForum.name
        this.forum.category = this.originForum.category
        this.forum.description = this.originForum.description
        this.forum.logoUrl = this.originForum.logoUrl
      },
      { immediate: true }
    )
    this.listCategories()
  },

  methods:{
    updateForum(){
      forumApi.updateForum(this.forum).then(
        ()=>{
          ElMessage.success("修改成功")
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