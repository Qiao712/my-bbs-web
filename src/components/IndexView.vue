<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="12">
      <ForumList/>
    </el-col>
  </el-row>
</template>

<script>
import ForumList from "./post/ForumList.vue"
export default {
  name: "IndexView",
  components: {
    ForumList
  }
}
</script>

<style>

</style>