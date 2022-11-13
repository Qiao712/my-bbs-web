<template>
  <!-- 通过用户名搜索并旋转用户的下拉框 -->
  <el-select 
    v-model="selectedUserId"
    placeholder="选择用户" 
    :remote-method="listUsers" 
    :loading="loading" 
    @change="handleChange"
    @clear="handleClear"
    clearable 
    filterable 
    remote 
    reserve-keyword>
    <el-option v-for="user in users" :key="user.id" :label="user.username" :value="user.id" />
  </el-select>
</template>

<script>
import userApi from "../../api/userApi"

export default {
  name: "UserSelecter",
  props: ["callback"],
  
  data(){
    return {
      selectedUserId: null,

      users: [],
      size: 10, //最多显示多少个

      loading: false, //正在搜索
    }
  },

  methods:{
    //通过通过用户名搜索用户
    listUsers(username){
      this.loading = true
      userApi.listUsers({username: username, pageNo: 1, pageSize: this.size}).then(
        response=>{
          this.users = response.data.records
        }
      ).finally(()=>{
        this.loading = false
      })
    },

    handleChange(selected){
      //通过回调返回用户信息
      if(this.callback instanceof Function){
        for(let i = 0; i < this.users.length; i++){
          if(this.users[i].id == selected){
            this.callback(this.users[i])
            return
          }
        }
      }
    },

    handleClear(){
      if(this.callback instanceof Function){
        this.callback(null)
      }
    }
  }
}
</script>

<style>

</style>