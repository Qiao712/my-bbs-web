<template>
  <div>
    <img class="avatar" v-if="user.avatarUrl" :src="user.avatarUrl"/>
    <img class="avatar" v-if="! user.avatarUrl" src="../../assets/default-avatar.png"/>

    <p class="small-text" v-if="user.username">{{user.username}}</p>

    <div v-if="currentUserId != user.id"> <!--非当前用户时显示-->
      <el-button link type="primary" @click="sendPrivateMessage">私信</el-button>
      <el-button link type="primary">关注</el-button>
    </div>
  </div>
</template>

<script>
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
          console.log(store.state.currentUser.id)
          this.currentUserId = store.state.currentUser.id
      },
      { immediate: true }
    )
  },

  methods:{
    sendPrivateMessage(){
      this.$router.push({path: "/chat/" + this.user.id})
    }
  }
}
</script>

<style scoped>
.avatar{
  height: 100%;
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
}

.small-text{
  font-size: 16px;
  margin: 5px;
}
</style>