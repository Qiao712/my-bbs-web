<template>
  <!-- 用户端页面的导航栏 -->
  <div v-if="visible">
    <UserNav/>
  </div>

  <router-view/>
</template>

<script>
import userApi from "./api/userApi"
import store from "./store"
import UserNav from "./components/UserNav.vue"
import { ElMessage } from 'element-plus'

export default {
  name: 'App',
  components: {
    UserNav
  },

  data(){
    return {
      visible: false  //在管理员页面 和 登录页面不显示
    }
  },

  created(){
    //在后台管理页面时(/visible/*)，改变最外层的布局
    this.$watch(
      () => this.$route.path,
      () => {
        //在管理员界面隐藏
        let parts = this.$route.path.split('/')
        this.visible = !(parts.length >= 2 && parts[1] == "visible")
        
        //在登录界面隐藏
        if(this.$route.path == "/login")
          this.visible = false
      },
      { immediate: true }
    )

    //获取当前用户信息
    if(localStorage.getItem("Token") || sessionStorage.getItem("Token")){
      userApi.getCurrentUser().then(
        (response)=>{
          store.setCurrentUser(response.data)
          console.info("当前用户:", store.state.currentUser)
        }
      ).catch(
        ()=>{
          //Token无效: 清除Token
          if(sessionStorage.getItem("Token") || localStorage.getItem("Token")){
            sessionStorage.removeItem("Token")
            localStorage.removeItem("Token")
            ElMessage({
              message: "Token失效",
              type: 'error',
              duration: 2000,
            })
          }
        }
      )
    }
  }
}
</script>

<style>
/* 取消element-plus导致的边框 */
body{
  margin: 0
}

html,body,#app{
  height: 100%;
}
</style>