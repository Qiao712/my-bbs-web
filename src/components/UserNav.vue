<template>
  <div v-if="visible" class="user-nav">
    <div class="logo" @click="$router.push({path: '/'})">
      没有名字的论坛
    </div> 

    <!--搜索框-->
    <el-input class="search-bar" v-model="searchText" placeholder="搜索贴子..." @keypress.enter="searchPosts()"/>

    <div class="flex-grow"/>

    
    <div>
      <div v-if="state.currentUser" class="user-info">
        <!--用户私信-->
        <el-badge :value="privateMessageCount" :hidden="privateMessageCount==0" style="margin-right: 20px">
          <Message @click="$router.push({path: '/conversations'})" style="width: 30px; height: 30px;"/>
        </el-badge>

        <!--用户信息-->
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
      <div v-if="!state.currentUser" class="user-info">
        <el-button type="info" link @click="$router.push({path: '/login'})" class="color-white">登录</el-button>
        <el-button type="info" link @click="test" class="color-white">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import messageApi from "../api/messageApi"
import store from "../store"
import {Message} from '@element-plus/icons-vue'

export default {
  name: "UserNav",

  components:{
    Message
  },

  data(){
    return{
      visible: true,
      state: store.state,
      
      searchText: "",

      privateMessageCount: 0, //未读私信数量
    }
  },

  created(){
    this.$watch(
      () => this.$route.path,
      () => {
        //切换页面时，刷新未读消息数量
        this.getPrivateMessageCount()

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

    getPrivateMessageCount(){
      messageApi.getUnacknowledgedPrivateMessageCount().then(
        response=>{
          this.privateMessageCount = response.data
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

</style>