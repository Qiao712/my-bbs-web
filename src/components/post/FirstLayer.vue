<template>
  <div class="comment" v-if="post">
    <div class="user-bar">
      <UserInfo :user="post.author"/>
    </div>

    <div class="first-layer">
      <!--贴子内容-->
      <div class="editor-content-view post-content" v-html="cleanPostContent">
      </div>

      <!--按钮条-->
      <div class="bottom-bar">
        <el-button link type="info" @click="likePost" v-if="!liked">赞👍 {{likeCount}}</el-button>
        <el-button link type="primary" @click="undoLikePost" v-if="liked">已赞👍 {{likeCount}}</el-button>

        <span class="small-text">1楼</span>
        <span class="small-text">发布时间: {{post.createTime}}</span>
        <span class="small-text">浏览量: {{post.viewCount}}</span>
        <el-button link @click="removePost">删除</el-button>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import postApi from '../../api/postApi'
import htmlUtil from '../../util/htmlUtil'
import UserInfo from './UserInfo.vue'

export default {
  name: "ReplyView",
  props: ["post"],

  components:{
    UserInfo
  },

  data(){
    return {
      likeCount: this.post.likeCount,
      liked: this.post.liked,

      //检查过滤后的HTML(防止Xss, 去除不允许的标签,属性)
      cleanPostContent: ""
    }
  },

  created(){
    this.cleanPostContent = htmlUtil.purifyHtml(this.post.content)
  },

  methods:{
    removePost(){
      postApi.removeMyPost(this.post.id).then(
        ()=>{
          ElMessage.success("删除成功")
          this.$router.push({path: "/forum/" + this.post.forumId})
        }
      )
    },

    likePost(){
      postApi.likePost(this.post.id).then(
        ()=>{
          this.liked = true
          this.likeCount++
          ElMessage.success("点赞成功")
        }
      )
    },

    undoLikePost(){
      postApi.undoLikePost(this.post.id).then(
        ()=>{
          this.liked = false
          this.likeCount--
          ElMessage.success("取消点赞成功")
        }
      )
    }
  }
}
</script>

<style scoped>
.comment{
  display: grid;
  grid-template-columns: 100px auto;
  min-height: 150px;
}

.big-avatar{
  margin-top: 5px;
  width: 90%;
}

.user-bar{
  text-align: center;
}
  
.first-layer{
  color: var(--el-text-color-regular);
  margin: 10px;
}

.post-content{
  word-break: break-all;
  white-space: pre-wrap;
  min-height: 130px;
}

.small-text{
  font-size: 16px;
  margin: 5px;
}

.bottom-bar{
  display: flex;
  justify-content: flex-end;
}
</style>