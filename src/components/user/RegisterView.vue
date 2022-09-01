<template>
  <ViewContainer>
    <h1 style="font-family: sans-serif">注册</h1>

    <el-form :model="form" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名" name="username-register"></el-input>
      </el-form-item>	
      
      <el-form-item label="密码">
        <el-input v-model="password" type="password" placeholder="请输入密码" name="password-register"></el-input>
      </el-form-item>
      
      <el-form-item label="确认密码">
        <el-input v-model="checkPassword" type="password" placeholder="请再次输入密码" name="password-register"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </ViewContainer>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import ViewContainer from "../common/ViewContainer.vue"
import userApi from "../../api/userApi"

export default {
  name: 'RegisterView',

  components:{
    ViewContainer
  },

  data(){
    return {
      username : "",
      password : "",
      checkPassword: "",
    }
  },
  methods:{
    register(){
      if(this.password != this.checkPassword){
        ElMessage.warning("两次输入的密码不一致,请重新输入!")
        return
      }

      let params = {
        username: this.username,
        password: this.password
      }

      userApi.register(params).then(
        ()=>{
          this.$router.push({path: "/login"})
        }
      )
    },
  }
}
</script>
  
<style>

</style>