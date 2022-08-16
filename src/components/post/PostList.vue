<template>
  <div class="post-preview" v-for="post in posts" :key="post.id" @click="viewPost(post.id)">
    <PostPreview :post="post" :highlight="highlight"></PostPreview>
  </div>

  <el-empty description="无贴子" v-if="!posts || posts.length == 0"/>
</template>

<script>
import PostPreview from "./PostPreview.vue"

export default {
  name: "PostList",
  props: [
    "posts",
    "highlight" //是否启用高亮显示(<em>标签)，用于展示贴子搜索结果
  ],

  components: {
    PostPreview
  },

  methods:{
    viewPost(postId){
      this.$router.push({path: "/post/" + postId})
    }
  }
}
</script>

<style scoped>
.post-preview{
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  margin-top: 5px;
  min-height: 10vh;
}
</style>