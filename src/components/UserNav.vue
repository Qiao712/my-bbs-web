<template>
  <div class="user-nav">
    <div class="logo" @click="$router.push({path: '/'})">
      没有名字的论坛
    </div> 

    <!--搜索框-->
    <el-input class="search-bar" v-model="searchText" placeholder="搜索贴子..." @keypress.enter="searchPosts()"/>

    <div class="flex-grow"/>

    <div class="user-info">
      <!--用户-->
      <div v-if="state.currentUser">
        <el-popover placement="bottom" :width="200" trigger="hover">
          <template #reference>
            <!--用户头像-->    
            <div @click="$router.push({path: '/user'})">
              <el-avatar v-if="state.currentUser.avatarUrl" :size="40" :src="state.currentUser.avatarUrl"/>
              <el-avatar v-if="!state.currentUser.avatarUrl" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
            </div>
          </template>
          
          <!--弹出框中展示用户信息-->
          <div>
            {{state.currentUser.username}}
          </div>
        </el-popover>
      </div>

      <!--无法获取当前用户信息则，显示登录、注册-->
      <div v-if="!state.currentUser">
        <el-button type="info" link @click="$router.push({path: '/login'})" class="color-white">登录</el-button>
        <el-button type="info" link @click="test" class="color-white">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store"

export default {
  name: "UserNav",

  data(){
    return{
      state: store.state,
      searchText: ""
    }
  },

  methods:{
    searchPosts(){
      this.$router.push({path: "/post/search", query:{text: this.searchText}})
    }
  }
}
</script>

<style scoped>
.user-nav{
  display:flex;
  align-items:center;
  height: 60px;
  background-color: #66ccff;
}

.logo{
  margin-left: 20px;
}

.user-info{
  margin-right: 20px;
}

.flex-grow {
  flex-grow: 1;
}

.search-bar{
  margin: 10px;
  width: 20%;
}

</style>