<template>
  <div class="forum-category" :gutter="20" v-for="(forums, index) in groupedForum" :key="index">
    <div class="category-bar">
      {{forums[0].category}}
    </div>

    <el-row class="forums">
      <el-col class="forum-box" @click="goToForum(forum)" :span="6" v-for="forum in forums" :key="forum.id">
        <img class="forum-logo" v-if="forum.logoUrl" :src="forum.logoUrl" />
        <img class="forum-logo" v-if="!forum.logoUrl" src="../../assets/default-forum-logo.png" />
        <div style="font-size: 18px">{{forum.name}}</div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import forumApi from "../../api/forumApi"

export default {
  name: "ForumList",

  data() {
    return {
      forums: [],

      //按分类分组的板块列表
      groupedForum: {}
    }
  },

  created() {
    this.listForums()
    
  },

  methods:{
    listForums(){
      forumApi.listAllForums().then(
        (response)=>{
          this.forums = response.data

          //时间格式化
          this.forums.forEach(forum=>{
            forum.createTime = (new Date(forum.createTime)).toDateString()
            forum.updateTime = (new Date(forum.updateTime)).toDateString()
          })

          //按category分组
          this.forums.forEach(forum=>{
            if(this.groupedForum[forum.category]){
              this.groupedForum[forum.category].push(forum)
            }else{
              this.groupedForum[forum.category] = [forum]
            }
          })
        }
      )
    },

    goToForum(forum){
      this.$router.push({path: "/forum/" + forum.id})
    }
  }
}
</script>

<style scoped>
.forum-category{
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  margin: 6px;
}

.category-bar{
  background-color: #c2ebff;
}

.forums{
  background-color: white;
}

.forum-box{
  height: 80px;
  display:flex;
	align-items:center;
}

.forum-logo{
  margin: 5px;
  height: 64px;
  width: 64px;
  border-radius: 100%;
}
</style>