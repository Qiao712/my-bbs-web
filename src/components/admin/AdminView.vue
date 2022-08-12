<template>
  <div class="header">
    <Nav style="height: 100%"/>
  </div>

  <div class="main">
    <div class="sidebar">
      <Menu style="height: 100%"/>
    </div>

    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from '../Nav.vue'
import Menu from "./Menu"

export default {
  name: "AdminView",
  components: {
    Menu,
    Nav
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 54px;

  position: fixed;
}

.sidebar {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  width: 250px;

  overflow: auto;
}
.content {
  position: fixed;
  top: 54px;
  right: 0;
  bottom: 0;
  left: 251px;

  overflow: auto;
}
</style>