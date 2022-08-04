<template>
  <!-- 顶部导航栏 -->
  <Nav class="nav"></Nav>

  <div class="admin-view">
    <!-- 菜单栏 -->
    <div>
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
          
          <el-menu-item index="1-1">概况</el-menu-item>
        </el-sub-menu>


        <!-- 用户管理菜单 -->
        <el-sub-menu index="1">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>用户管理</span>
          </template>

          <el-menu-item index="/admin/users">用户列表</el-menu-item>
          <el-menu-item index="/admin/roles">角色列表</el-menu-item>
        </el-sub-menu>

        <!-- 贴子管理 -->
        <el-sub-menu index="2">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>贴子管理</span>
          </template>

          <el-menu-item index="3-1">贴子列表</el-menu-item>
          <el-menu-item index="3-2">标签列表</el-menu-item>
          <el-menu-item index="3-3">贴子审核</el-menu-item>
          <el-menu-item index="3-4">评论审核</el-menu-item>
          <el-menu-item index="3-5">板块管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <!-- 具体的功能页面 -->
    <div class="sub-admin-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "../Nav.vue"

export default {
  name: "AdminView",
  components: {
    Nav
  },

  methods:{
    handleSelect(key){
      this.$router.push(key)
    }
  }
}
</script>

<style scoped>
.admin-view{
  display: grid;
  grid-template-columns: 15% 85%;
  height: 90vh;
}

.menu{
  padding: 1.2rem 0;
  height: 100%;
}

.nav{
  height: 5vh;
}

.sub-admin-view{
  background-color: beige;
  height: 100%;
  overflow: auto;
}
</style>