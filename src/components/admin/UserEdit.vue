<template>
  <div style="margin-top: 20px; width: 90%">
    <el-form label-width="120px">
      <el-form-item label="头像">
        <AvatarUploader :userId="user.id" :avatarUrl="user.avatarUrl"></AvatarUploader>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="user.username" />
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
import AvatarUploader from "./AvatarUploader.vue"
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
        createTime: null,
        updateTime: null,
        avatarUrl: null
      },
      roles:[]
    }
  },

  components: {
    AvatarUploader
  },

  mounted(){
    this.getUser()
    this.getRoles()
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

    getRoles(){
      roleApi.getRoles().then(
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
  }
}
</script>

<style scoped>

</style>