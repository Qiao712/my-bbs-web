<template>
  <el-menu
    default-active="2"
    class="menu"
    @select="handleSelect"
  >
    <el-sub-menu index="0">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>系统监控</span>
      </template>
      
      <el-menu-item index="/admin/statistic">统计</el-menu-item>
      <el-menu-item index="/admin/advertisements">广告列表</el-menu-item>
    </el-sub-menu>


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

    <!-- 贴子管理 -->
    <el-sub-menu index="2">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>内容管理</span>
      </template>

      <el-menu-item index="/admin/posts">贴子列表</el-menu-item>
      <el-menu-item index="/admin/comments">评论列表</el-menu-item>
      <el-menu-item index="/admin/forum">板块管理</el-menu-item>
      <!-- <el-menu-item index="3-3">贴子审核</el-menu-item>
      <el-menu-item index="3-4">评论审核</el-menu-item> -->
    </el-sub-menu>

    <!--文件管理-->
    <el-sub-menu index="3">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>文件管理</span>
      </template>

      <el-menu-item index="/admin/files">文件列表</el-menu-item>
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