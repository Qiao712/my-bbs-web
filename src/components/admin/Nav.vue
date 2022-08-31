<template>
  <div class="nav">
    <img src="../../assets/logo.png" class="logo"/>
    <p>后台管理</p>
  </div>
</template>

<script>
export default {
  name: "Nav",
}
</script>

<style scoped>
.nav{
  display:flex;
  align-items:center;

  font-size: 20px;
}

.logo{
  height: 30px;
  margin: 10px;
  /* height: 90%; */
}
</style>