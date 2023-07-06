<template>
  <div v-if="visible" class="user-nav">
    <div @click="$router.push({path: '/'})">
      <img class="logo" src="../assets/logo.png"/>
    </div> 

    <!--搜索框-->
    <el-input class="search-bar" v-model="searchText" placeholder="搜索问题..." @keypress.enter="searchPosts()"/>

    <div class="flex-grow"/>

    <!--靠右一栏-->
    <div>
      <div v-if="state.currentUser" class="user-info">
        <!--用户私信-->
        <el-badge :value="state.privateMessageCount" :hidden="state.privateMessageCount==0" style="margin-right: 20px">
          <Message @click="$router.push({path: '/conversations'})" style="width: 30px; height: 30px;"/>
        </el-badge>
        <!--通知消息--> 
        <el-badge :value="state.systemMessageCount" :hidden="state.systemMessageCount==0" style="margin-right: 20px">
          <Bell @click="$router.push({path: '/messages'})" style="width: 30px; height: 30px;"/>
        </el-badge>

        <!--用户信息-->
        <el-popover placement="bottom" :width="200" trigger="hover">
          <template #reference>
            <!--用户头像-->    
            <div @click="$router.push({path: '/user/' + state.currentUser.id})">
              <img class="avatar" v-if="state.currentUser.avatarUrl" :src="state.currentUser.avatarUrl"/>
              <img class="avatar" v-if="!state.currentUser.avatarUrl" src="../assets/default-avatar.png"/>
            </div>
          </template>
          
          <!--弹出框中展示用户信息-->
          <div>
            欢迎 {{state.currentUser.username}} 点击进入用户空间

            <br/>

            <el-button link @click="logout">退出登录</el-button>
          </div>
        </el-popover>
      </div>

      <!--无法获取当前用户信息则，显示登录、注册-->
      <div v-if="!state.currentUser" class="user-info">
        <el-button type="info" link @click="$router.push({path: '/login'})" class="color-white">登录</el-button>
        <el-button type="info" link @click="$router.push({path: '/register'})" class="color-white">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import store from "../store"
import {Message, Bell} from '@element-plus/icons-vue'
import userApi from '../api/userApi'

export default {
  name: "UserNav",

  components:{
    Message,
    Bell
  },

  data(){
    return{
      visible: true,
      state: store.state,

      searchText: "",
    }
  },

  created(){
    this.$watch(
      () => this.$route.path,
      () => {
        //切换页面时，刷新未读消息数量
        this.getMessageCount()

        //在后台管理页面时(/admin/*)，隐藏该Nav
        let parts = this.$route.path.split('/')
        this.visible = !(parts.length >= 2 && parts[1] == "admin")
      },
      { immediate: true }
    )

  },

  methods:{
    searchPosts(){
      if(this.searchText.trim().length != 0)
        this.$router.push({path: "/post/search", query:{text: this.searchText}})
    },

    getMessageCount(){
      store.refreshMessageCount()
    },

    logout(){
      userApi.logout().then(
        ()=>{
          localStorage.removeItem("Token")
          sessionStorage.removeItem("Token")
          this.$router.push({path: "/"})
          store.setCurrentUser(null)
          ElMessage.success("登出成功")
        }
      )
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
  height: 20px;
  width: 200px;
  margin-left: 20px;
}

.user-info{
  margin-right: 20px;

  display:flex;
	align-items:center;
}

.flex-grow {
  flex-grow: 1;
}

.search-bar{
  margin: 10px;
  width: 20%;
}

.avatar{
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

</style>