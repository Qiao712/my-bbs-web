<template>
  <el-form label-width="100px">
    <el-form-item label="Logo">
      <img v-if="forum.logoUrl" :src="forum.logoUrl" class="avatar" />
      <img v-if="!forum.logoUrl" src="../../assets/default-forum-logo.png" class="avatar"/>

      <el-button @click="setLogo" style="margin: 50px">修改Logo</el-button>
      <input id="imageInput" hidden type="file" @change="uploadAvatar" accept="image/*"/>
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
import { ElMessage } from 'element-plus/lib/components'
import forumApi from "../../api/forumApi"
import fileApi from "../../api/fileApi"

export default {
  name: "ForumEdit",

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
    },

    //点击File Input
    setLogo(){
      document.getElementById("imageInput").click()
    },

    uploadAvatar(event){
      //获取选择的文件
      let files = event.target.files
      
      if(files && files.length > 0){
        fileApi.uploadForumLogo(files[0]).then(
          (response)=>{
            let fileId = response.data.id
            
            forumApi.setForumLogo(this.forum.id, fileId).then(
              ()=>{
                this.forum.logoUrl = URL.createObjectURL(files[0])
                if(this.refresh) this.refresh()
                ElMessage.success("修改成功")
              }
            )
          }
        )
      }
    },
  }
}
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;

  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

  border-color: var(--el-color-primary);
}
</style>