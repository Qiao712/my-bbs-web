<template>
  <UserNav/>
  <router-view></router-view>
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

  created(){
    userApi.getCurrentUser().then(
      (response)=>{
        store.setCurrentUser(response.data)
        console.info("当前用户:", store.state.currentUser)
      }
    )
  }
}
</script>

<style>
/* 取消element-plus导致的边框 */
body{
  margin: 0
}
</style>