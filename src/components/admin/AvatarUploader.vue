<template>
  <!-- 优先显示新的头像 -->
  <img v-if="newAvatarUrl" :src="newAvatarUrl" class="avatar" />
  <!-- 显示原有头像 -->
  <img v-if="!newAvatarUrl && avatarUrl" :src="avatarUrl" class="avatar" />
  <!-- 显示默认头像 -->
  <img v-if="!newAvatarUrl && !avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="avatar" />

  <el-button @click="setAvatar" style="margin: 50px">修改头像</el-button>

  <input id="avatarInput" hidden type="file" @change="uploadAvatar" accept="image/*"/>
</template>

<script>
import userApi from "../../api/userApi"
import { ElMessage } from 'element-plus'

export default {
  name: "AvatarUploader",

  props: ["userId", "avatarUrl"],

  data(){
    return {
      tokenHeader: null,
      newAvatarUrl: null,
    }
  },

  methods:{
    //点击File Input
    setAvatar(){
      document.getElementById("avatarInput").click()
    },

    uploadAvatar(event){
      //获取选择的文件
      let files = event.target.files
      
      if(files && files.length > 0){
        let formData = new FormData()
        formData.append("file", files[0])
        userApi.setUserAvatar(this.userId, formData).then(
          ()=>{
            this.newAvatarUrl = URL.createObjectURL(files[0])
            ElMessage.success("头像上传成功")
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