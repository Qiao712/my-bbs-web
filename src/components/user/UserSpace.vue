<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="12">
      <div class="info">
        <!--用户信息-->
        <div class="user-info" v-if="currentUser">
          <el-avatar class="big-avatar" v-if="currentUser.avatarUrl" shape="square" :size="80" :src="currentUser.avatarUrl"/>
          <el-avatar class="big-avatar" v-if="!currentUser.avatarUrl" shape="square" :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
          
          <div>
            <div class="username-text">
              {{currentUser.username}}
            </div>

            <!--角色信息-->
            <div class="username-text">
              <span v-if="currentUser.role == 'ROLE_ADMIN'">管理员</span>
              <span v-if="currentUser.role == 'ROLE_NORMAL'">普通用户</span>
            </div>
          </div>
        </div>


        <!--统计信息-->
        <div class="usage-info">
          <div>
            发帖数: 
          </div>
          
          <div>
            获赞: 
          </div>
        </div>
      </div>

      <div>
        <!--功能选择菜单-->
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="posts">我发的贴</el-menu-item>
          <el-menu-item index="comments">我的评论</el-menu-item>
          <el-menu-item index="favorites">收藏</el-menu-item>
          <el-menu-item index="following">关注</el-menu-item>
        </el-menu>
      </div>

      <!--用户空间内的功能-->
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
import userApi from "../../api/userApi"

export default {
  name: 'UserSpace',
  data(){
    return{
      currentUser: {}
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
