<template>
  <div class="user-managmement">
    <!-- 搜索选项 -->
    <div class="user-query-form">
      <el-form :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="queryForm.username"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="queryForm.role" placeholder="选择角色" clearable>
            <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.name" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryUser()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--用户列表-->
    <div>
      <el-table :data="users">
        <el-table-column fixed prop="username" label="用户名"/>
        
        <el-table-column label="头像">
          <template #default="scope">
            <el-avatar :size="32" :src="getAvatarUrl(scope.$index)" />
          </template>
        </el-table-column>

        <el-table-column prop="role" label="角色"/>
        
        <el-table-column prop="enable" label="是否启用"/>

        <el-table-column prop="createTime" label="创建时间"/>

        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="removeUser(scope.$index)">删除</el-button>
            <el-button link type="primary" size="small" @click.prevent="editUser(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div>
      <el-pagination
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        :total="total"
        :pager-count="8"
        @current-change="handlePageChange"
        layout="prev, pager, next"
        style="background-color: white;"
      />
    </div>
  </div>
  
</template>

<script>
import userApi from "../../api/userApi"
import roleApi from "../../api/roleApi"

export default {
  name: "UserManagement",

  data(){
    return {
      queryForm:{
        username: "",
        role: "",
      },

      //查询条件
      query:{
        username: "",
        role: "",
        pageNo: 1,
        pageSize: 12 
      },

      users:[],
      total: 0,

      roles:[]
    }
  },

  created(){
    this.getUsers()
    this.getRoles()
  },

  methods:{
    getUsers(){
      userApi.getUsers(this.query).then(
        response => {
          this.query.pageNo = response.data.current
          this.users = response.data.records
          this.total = response.data.total

          //时间格式化
          this.users.forEach(user=>{
            user.createTime = (new Date(user.createTime)).toDateString()
            user.updateTime = (new Date(user.updateTime)).toDateString()
          })
        }
      )
    },

    getRoles(){
      roleApi.getRoles().then(
        response => {
          this.roles = response.data
        }
      )
    },

    queryUser(){
      this.query.username = this.queryForm.username
      this.query.role = this.queryForm.role
      this.getUsers()
    },

    removeUser(index){
      userApi.removeUser(this.users[index].id).then(
        () => this.getUsers()
      )
    },

    getAvatarUrl(index){
      return this.users[index].avatarUrl ? this.users[index].avatarUrl : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    },

    editUser(index){
      this.$router.push({path: "/admin/users/" + this.users[index].id + "/edit"})
    },

    handlePageChange(pageNo){
      this.query.pageNo = pageNo
      this.getUsers()
    }
  }
}
</script>

<style scoped>
.user-query-form{
  margin-left: 10px;
  margin-top: 10px;
}
</style>