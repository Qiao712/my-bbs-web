<template>
  <!-- 用户端页面的导航栏 -->
  <div v-if="!admin">
    <UserNav/>
  </div>

  <router-view/>
</template>

<script>
import userApi from "./api/userApi"
import store from "./store"
import UserNav from "./components/UserNav.vue"

export default {
  name: 'App',
  components: {
    UserNav
  },

  data(){
    return {
      admin: false  //是否在管理员页面
    }
  },

  created(){
    //在后台管理页面时(/admin/*)，改变最外层的布局
    this.$watch(
      () => this.$route.path,
      () => {
        let parts = this.$route.path.split('/')
        this.admin = (parts.length >= 2 && parts[1] == "admin")
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