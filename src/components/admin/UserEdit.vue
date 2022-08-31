<template>
  <div style="margin-top: 20px; width: 90%">
    <el-form label-width="120px">
      <el-form-item label="头像">
        <img v-if="user.avatarUrl" :src="user.avatarUrl" class="avatar" />
        <img v-if="!user.avatarUrl" src="../../assets/default-avatar.png" class="avatar" />

        <el-button @click="setAvatar" style="margin: 50px">修改头像</el-button>
        <input id="avatarInput" hidden type="file" @change="uploadAvatar" accept="image/*"/>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="user.username" />
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="user.gender" placeholder="选择角色">
          <el-option label="男" :value="true" />
          <el-option label="女" :value="false" />
        </el-select>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input name="email" v-model="user.email" placeholder="修改邮箱"/>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="user.password" type="password" placeholder="修改密码"/>
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="user.roleId" placeholder="选择角色">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="用户状态">
        <el-switch v-model="user.enable" aria-label="启用/禁用"/>
      </el-form-item>

      <el-form-item label="创建时间">
        {{user.createTime}}
      </el-form-item>

      <el-form-item label="最后修改时间">
        {{user.updateTime}}
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from "../../api/userApi"
import roleApi from "../../api/roleApi"
import { ElMessage } from 'element-plus'

export default {
  name: "UserEdit",
  data(){
    return {
      user:{
        id: null,
        username: "",
        roleId: null,
        enable: false,
        password: "",
        email: "",
        gender: null,
        createTime: null,
        updateTime: null,
        avatarUrl: null
      },
      roles:[]
    }
  },

  mounted(){
    this.getUser()
    this.listRoles()
  },

  methods:{
    getUser(){
      this.user.id = this.$route.params.userId
      if(this.user.id){
        userApi.getUser(this.user.id).then(
          response => {
            this.user = response.data
          }
        )
      }
    },

    listRoles(){
      roleApi.listRoles().then(
        response => {
          this.roles = response.data
        }
      )
    },

    submit(){
      let user = {
        id: this.user.id,
        roleId: this.user.roleId,
        enable: this.user.enable,
        gender: this.user.gender,
        email: this.user.email,
        password: this.user.password ? this.user.password : null
      }
      userApi.updateUser(user).then(
        ()=>{
          ElMessage({
            message: "修改成功",
            type: 'success',
            duration: 2000,
          })
        }
      )
    },

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
        userApi.setUserAvatar(this.user.id, formData).then(
          ()=>{
            this.user.avatarUrl = URL.createObjectURL(files[0])
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