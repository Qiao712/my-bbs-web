<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="12">
      <div class="info">
        <!--用户信息-->
        <div class="user-info" v-if="currentUser">
          <el-avatar class="big-avatar" v-if="currentUser.avatarUrl" shape="square" :size="80" :src="currentUser.avatarUrl"/>
          <el-avatar class="big-avatar" v-if="!currentUser.avatarUrl" shape="square" :size="80" src="../assets/default-avatar.png"/>
          
          <div>
            <div class="username-text">
              {{currentUser.username}}
            </div>
          </div>
        </div>
      </div>

      <!--功能选择菜单-->
      <el-tabs v-model="activeName" v-if="currentUser.id">
        <el-tab-pane label="我的贴子" name="1"><PostsOfUser :username="currentUser.username"/></el-tab-pane>
        <el-tab-pane label="我的评论" name="2"><CommentsOfUser :username="currentUser.username"/></el-tab-pane>
        <el-tab-pane label="收藏" name="3"><FavoriteList :userId="currentUser.id"/></el-tab-pane>
        <el-tab-pane label="关注" name="4"><FollowingList :userId="currentUser.id"/></el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import userApi from "../../api/userApi"
import PostsOfUser from "./PostsOfUser.vue"
import FavoriteList from "./FavoriteList.vue"
import CommentsOfUser from "./CommentsOfUser.vue"
import FollowingList from "./FollowingList.vue"

export default {
  name: 'UserSpace',

  components:{
    PostsOfUser,
    FavoriteList,
    CommentsOfUser,
    FollowingList
  },

  data(){
    return{
      currentUser: {},
      
      activeName: "1"
    }
  },

  created(){
    this.getCurrentUser()
  },

  methods:{
    getCurrentUser(){
      userApi.getCurrentUser().then(
        (response)=>{
          this.currentUser = response.data
        }
      )
    },

    handleSelect(index){
      this.$router.push({path: '/user/' + this.currentUser.id + '/' + index})
    }
  }
}
</script>

<style scoped>
.info{
  display: grid;
  grid-template-columns: 50% 50%;

  margin: 20px;
}

.user-info{
	display: flex;
	align-items: center;
}

.usage-info{
  display: flex;
	align-items: center;
}

.el-avatar{
	margin: 10px;
}

.username-text{
	font-size: 18px;
  margin: 5px;
}
</style>
