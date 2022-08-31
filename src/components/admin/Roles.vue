<template>
  <el-button style="margin: 10px" @click="roleAdding = true">添加角色</el-button>

  <el-table :data="roles">
    <el-table-column prop="name" label="角色名"/>
    <el-table-column prop="createTime" label="创建时间"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="setAuthorities(scope.$index)">权限设置</el-button>
        <el-button link type="primary" size="small" @click.prevent="removeRole(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--权限设置-->
  <el-dialog v-model="authoritySetting">
    <el-button type="primary" @click="updateRole">保存</el-button>
    
    <el-checkbox-group v-model="selectedAuthorities"> <!--多选组-->
      <!--一个分类一个table-->
      <el-table v-for="(authorities, index) in groupedAuthorities" :key="index" :data="authorities">
        <el-table-column :label="authorities[0].category">
          <template #default="scope">
            <el-checkbox :label="authorities[scope.$index].authority"/>
          </template>
        </el-table-column>

        <el-table-column prop="name"/>
      </el-table>
    </el-checkbox-group>
  </el-dialog>

  <!--添加角色-->
  <el-dialog v-model="roleAdding">
    <el-form label-width="120px">
      <el-form-item label="角色名">
        ROLE_ <el-input v-model="newRoleName"/>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="addRole">创建</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import roleApi from "../../api/roleApi"

export default {
  name: "Roles",

  data(){
    return {
      roles:[],

      //权限列表
      authorities: [],
      groupedAuthorities: {},

      //选择角色进行修改(授权)
      authoritySetting: false,
      role: null,
      selectedAuthorities: [],

      //添加角色
      roleAdding: false,
      newRoleName: "",
    }
  },

  created(){
    this.listRoles()
    this.listAuthorities()
  },

  methods:{
    listRoles(){
      roleApi.listRoles().then(
        response => {
          this.roles = response.data
        }
      )
    },

    //获取所有权利列表
    listAuthorities(){
      roleApi.listAuthorities().then(
        response => {
          this.authorities = response.data

          //分类
          this.authorities.forEach(authority=>{
            if(! this.groupedAuthorities[authority.category])
              this.groupedAuthorities[authority.category] = [authority]
            else 
              this.groupedAuthorities[authority.category].push(authority)
          })
        }
      )
    },

    setAuthorities(index){
      this.authoritySetting = true
      this.role = this.roles[index]

      //获取详细的角色信息(包含权限)
      roleApi.getRole(this.role.id).then(
        (response)=>{
          this.role = response.data

          //设置选中
          this.selectedAuthorities = this.role.authorities
        }
      )
    },

    updateRole(){
      let role = {
        id: this.role.id,
        authorities: this.selectedAuthorities
      }

      roleApi.updateRole(role).then(
        ()=>{
          ElMessage.success("更新成功")
        }
      )
    },

    addRole(){
      if(this.newRoleName.trim() == "") return
      let newRole = {
        name: "ROLE_" + this.newRoleName
      }

      roleApi.addRole(newRole).then(
        ()=>{
          this.listRoles()
          this.roleAdding = false
          ElMessage.success("添加成功")
        }
      )
    },

    removeRole(index){
      roleApi.removeRole(this.roles[index].id).then(
        ()=>{
          this.listRoles()
          ElMessage.success("删除成功")
        }
      )
    }
  }
}
</script>