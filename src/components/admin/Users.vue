<template>
  <div class="container">
    <!-- 搜索选项 -->
    <div class="head">
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
    <div class="main">
      <el-table :data="users">
        <el-table-column prop="username" label="用户名"/>
        
        <el-table-column label="头像">
          <template #default="scope">
            <el-avatar :size="32" :src="getAvatarUrl(scope.$index)" />
          </template>
        </el-table-column>

        <el-table-column prop="role" label="角色"/>
        
        <el-table-column prop="enable" label="是否启用"/>

        <el-table-column prop="createTime" label="创建时间"/>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="removeUser(scope.$index)">删除</el-button>
            <el-button link type="primary" size="small" @click.prevent="editUser(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="foot">
      <el-pagination
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        :total="total"
        :pager-count="8"
        @current-change="handlePageChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
  
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
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
      tableHeight: 0,

      roles:[],
    }
  },

  created(){
    this.listUsers()
    this.getRoles()
  },

  mounted(){
    window.onresize = () => {
      let headHeight = this.$refs.table.$el.offsetTop
      let footHeight = this.$refs.foot.clientHeight
      this.tableHeight = window.innerHeight - headHeight - footHeight
    }
  },

  methods:{
    listUsers(){
      userApi.listUsers(this.query).then(
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
      this.listUsers()
    },

    removeUser(index){
      userApi.removeUser(this.users[index].id).then(
        () => {
          this.listUsers()
          ElMessage.success("删除成功")
        }
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
      this.listUsers()
    }
  }
}
</script>

<style scoped>
.container{
  display: grid;
  height: 100%;
  grid-template-rows: 50px auto 40px;
}

.el-form{
  margin: 10px;
}

.main{
  overflow: auto;
}
</style>