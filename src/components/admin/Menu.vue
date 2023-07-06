<template>
  <el-menu
    default-active="2"
    class="menu"
    @select="handleSelect"
  >

    <!-- 用户管理菜单 -->
    <el-sub-menu index="1">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>用户管理</span>
      </template>

      <el-menu-item index="/admin/users">用户列表</el-menu-item>
      <el-menu-item index="/admin/roles">角色列表</el-menu-item>
      <el-menu-item index="/admin/authorities">权限列表</el-menu-item>
    </el-sub-menu>

    <!-- 问题管理 -->
    <el-sub-menu index="2">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>内容管理</span>
      </template>

      <el-menu-item index="/admin/posts">问题列表</el-menu-item>
      <el-menu-item index="/admin/comments">回答列表</el-menu-item>
      <el-menu-item index="/admin/forum">分类管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  methods:{
    handleSelect(key){
      this.$router.push(key)
    }
  }
} 
</script>

<style>

</style>