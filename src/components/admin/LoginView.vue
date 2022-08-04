<template>
  <div id="login-frame">
    <el-row justify="center" >
      <el-col :sm="24" :md="8" class="radius">
        <h1 style="font-family: sans-serif">论坛系统后台管理</h1>

        <el-form :model="form" label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="credential.username" placeholder="请输入用户名" name="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="credential.password" type="password" placeholder="请输入密码" name="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="credential.rememberMe" name="remember-me">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="$router.push('/register')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userApi from "../../api/userApi"
import { ElMessage } from 'element-plus'

export default {
  name: 'LoginView',
  data(){
    return {
      msg : "",
      credential: {
        username : "",
        password : "",
        rememberMe : false
      }
    }
  },
  methods:{
    login(){
      userApi.login(this.credential).then(
        (response) => {
          //储存token
          let token = response.data

          //清除原有Token
          localStorage.removeItem("Token")
          sessionStorage.removeItem("Token")
          
          if(this.credential.rememberMe){
            //如果选择了rememberMe则储存在本地储存中
            localStorage.setItem("Token", token)
          }else{
            //否则在会话储存中
            sessionStorage.setItem("Token", token)
          }
          

          ElMessage({
            message: "登录成功",
            type: 'success',
            duration: 2000,
          })

          this.$router.push({path: "/admin"})
        }
      )
    }
  }
}
</script>
  
<style>
.radius {
  text-align: center;
  border: 2px solid var(--el-border-color-base);
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  background-color:rgba(189, 219, 245, 0.921);
  color:rgb(125, 125, 125);
}
</style>