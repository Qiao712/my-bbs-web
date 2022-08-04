<template>
  <el-table :data="roles">
    <el-table-column prop="name" label="角色名"/>
    <el-table-column prop="createTime" label="创建时间"/>
  </el-table>
</template>

<script>
import roleApi from "../../api/roleApi"

export default {
  name: "Roles",

  data(){
    return {
      roles:[],
      total: 0
    }
  },

  created(){
    this.getRoles()
  },

  methods:{
    getRoles(){
      roleApi.getRoles().then(
        response => {
          this.roles = response.data
        }
      )
    }
  }
}
</script>

<style>

</style>