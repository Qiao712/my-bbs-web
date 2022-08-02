<template>
  <p>后台管理</p>
  <div class="admin-view">
    
    <!-- 菜单栏 -->
    <div>
      <el-menu
        default-active="2"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="0">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>系统监控</span>
          </template>
          
          <el-menu-item index="0-1">概况</el-menu-item>
        </el-sub-menu>


        <!-- 用户管理菜单 -->
        <el-sub-menu index="1">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>用户管理</span>
          </template>

          <el-menu-item index="1-1">用户列表</el-menu-item>
          <el-menu-item index="1-2">角色列表</el-menu-item>
        </el-sub-menu>

        <!-- 贴子管理 -->
        <el-sub-menu index="2">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>贴子管理</span>
          </template>

          <el-menu-item index="2-1">贴子列表</el-menu-item>
          <el-menu-item index="2-2">标签列表</el-menu-item>
          <el-menu-item index="2-3">贴子审核</el-menu-item>
          <el-menu-item index="2-4">评论审核</el-menu-item>
          <el-menu-item index="2-5">板块管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <!-- 具体的功能页面 -->
    <div>
      hello
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminView"
}
</script>

<style scoped>
.admin-view{
  display: grid;
  grid-template-columns: 15% 80%;
}

.menu{
  min-height: 90vh;
  padding: 1.2rem 0;
}
</style>