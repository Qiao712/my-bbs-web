<template>
  <div>
    <div @click="goToUserSpace">
      <img class="avatar" v-if="user.avatarUrl" :src="user.avatarUrl"/>
      <img class="avatar" v-if="! user.avatarUrl" src="../../assets/default-avatar.png"/>

      <p class="small-text" v-if="user.username">{{user.username}}</p>
    </div>

    <div v-if="currentUserId != user.id"> <!--非当前用户时显示-->
      <el-button link type="primary" @click="sendPrivateMessage">私信</el-button>
      <el-button link type="primary" @click="follow">关注</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import store from "../../store"

export default {
  name: "UserInfo",

  props: ["user"],

  data(){
    return {
      currentUserId: null,
    }
  },

  created(){
    this.$watch(
      () => store.state.currentUser,
      () => {
        if(store.state.currentUser)
          this.currentUserId = store.state.currentUser.id
      },
      { immediate: true }
    )
  },

  methods:{
    sendPrivateMessage(){
      this.$router.push({path: "/chat/" + this.user.id})
    },

    follow(){
      ElMessage.info("开发中...")
    },

    goToUserSpace(){
      this.$router.push({path: "/user/" + this.user.id})
    }
  }
}
</script>

<style scoped>
.avatar{
  width: 80px;
  height: 80px;
  margin: 5px;

  border: 1px solid var(--el-border-color);
  border-radius: 0;
}

.small-text{
  font-size: 16px;
  margin: 5px;
}
</style>