<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="12">
      <div class="info">
        <!--用户信息-->
        <div class="user-info" v-if="user">
          <img class="big-avatar" v-if="user.avatarUrl" :src="user.avatarUrl"/>
          <img class="big-avatar" v-if="!user.avatarUrl" src="../../assets/default-avatar.png"/>
          
          <div>
            <div class="username-text">
              {{user.username}}
            </div>
          </div>

          <!--修改头像-->
          <div v-if="currentUser.id == user.id">
            <el-button @click="setAvatar" link style="margin: 50px">修改头像</el-button>
            <input id="avatarInput" hidden type="file" @change="uploadAvatar" accept="image/*"/>  
          </div>
        </div>
      </div>

      <!--功能选择菜单-->
      <el-tabs v-model="activeName" v-if="user.id">
        <el-tab-pane label="我的贴子" name="1"><PostsOfUser v-if="user.username" :username="user.username"/></el-tab-pane>

        <el-tab-pane label="我的评论" name="2" v-if="currentUser.id == user.id"><CommentsOfUser v-if="user.username" :username="user.username"/></el-tab-pane> <!--不为其他用户展示-->
        <el-tab-pane label="收藏" name="3" v-if="currentUser.id == user.id"><FavoriteList :userId="user.id"/></el-tab-pane>  <!--不为其他用户展示-->
        <el-tab-pane label="关注" name="4" v-if="currentUser.id == user.id"><FollowingList :userId="user.id"/></el-tab-pane> <!--不为其他用户展示-->
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
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
      user: {
        id: null
      },

      //当前登录的用户信息
      currentUser: {
        id: null
      },
      
      activeName: "1"
    }
  },

  created(){
    this.getUser()
    this.getCurrentUser()
  },

  methods:{
    getUser(){
      this.user.id = this.$route.params.userId
      if(! this.user.id) return

      userApi.getUser(this.user.id).then(
        (response)=>{
          this.user = response.data
        }
      )
    },

    getCurrentUser(){
      userApi.getCurrentUser().then(
        (response)=>{
          this.currentUser = response.data
        }
      )
    },

    //点击File Input
    setAvatar(){
      document.getElementById("avatarInput").click()
    },

    uploadAvatar(event){
      //获取选择的文件
      let files = event.target.files
      
      if(files && files.length > 0){
        let formData = new FormData()
        formData.append("file", files[0])
        userApi.setUserAvatar(this.user.id, formData).then(
          ()=>{
            this.user.avatarUrl = URL.createObjectURL(files[0])
            ElMessage.success("头像上传成功")
          }
        )
      }
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

.big-avatar{
	margin: 10px;
  border-radius: 5px;
  width: 80px;
  height: 80px;
}

.username-text{
	font-size: 18px;
  margin: 5px;
}
</style>
