<template>
  <div class="login">
    <div class="radius" style="width: 400px">
      <img class="logo" src="../assets/logo.png">

      <el-form label-width="60px">
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
    </div>

    <div/>
  </div>
</template>

<script>
import userApi from "../api/userApi"
import store from "../store"
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
      //清除原有Token
      localStorage.removeItem("Token")
      sessionStorage.removeItem("Token")

      userApi.login(this.credential).then(
        (response) => {
          //储存token
          let token = response.data
          if(this.credential.rememberMe){
            //如果选择了rememberMe则储存在本地储存中
            localStorage.setItem("Token", token)
          }else{
            //否则在会话储存中
            sessionStorage.setItem("Token", token)
          }

          //获取用户数据
          userApi.getCurrentUser().then(
            response => {
              store.setCurrentUser(response.data)
            }
          )

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
  
<style scoped>
.login{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radius {
  text-align: center;
  border: 2px solid var(--el-border-color-base);
  border-radius: 5px;
  margin-top: 10px;
  padding: 25px;
  background-color:azure;
  color:rgb(125, 125, 125);
}
</style>