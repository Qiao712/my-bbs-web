<template>
  <!-- 优先显示新的logo -->
  <img v-if="newLogoUrl" :src="newLogoUrl" class="avatar" />
  <!-- 显示原有logo -->
  <img v-if="!newLogoUrl && logoUrl" :src="logoUrl" class="avatar" />
  <!-- 显示默认logo -->
  <img v-if="!newLogoUrl && !logoUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="avatar" />

  <el-button @click="setLogo" style="margin: 50px">修改Logo</el-button>

  <input id="imageInput" hidden type="file" @change="uploadAvatar" accept="image/*"/>
</template>

<script>
import forumApi from "../../api/forumApi"
import { ElMessage } from 'element-plus'

export default {
  name: "ForumLogoUploader",

  props: ["forumId", "logoUrl", "refresh"],

  data(){
    return {
      newLogoUrl: null,
    }
  },

  methods:{
    //点击File Input
    setLogo(){
      document.getElementById("imageInput").click()
    },

    uploadAvatar(event){
      //获取选择的文件
      let files = event.target.files
      
      if(files && files.length > 0){
        let formData = new FormData()
        formData.append("file", files[0])
        forumApi.setForumLogo(this.forumId, formData).then(
          ()=>{
            this.newLogoUrl = URL.createObjectURL(files[0])
            if(this.refresh) this.refresh()
            ElMessage.success("Logo设置成功")
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