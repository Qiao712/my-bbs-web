<template>
  <ViewContainer>
    <div class="conversation" v-for="conversation in conversations" :key="conversation.id"  @click="chat(conversation.userId)">
      <div class="user-bar">
        <img class="avatar" v-if="conversation.avatarUrl" :src="conversation.avatarUrl"/>
        <img class="avatar" v-if="! conversation.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        <p class="mid-text">{{conversation.username}} : </p>
        <el-tag v-if="conversation.unacknowledgedCount!=0">未读: {{conversation.unacknowledgedCount}}</el-tag>
      </div>

      <div class="mid-text">{{conversation.latestMessage}}</div>

      <div class="time-text">{{conversation.createTime}}</div>
    </div>

    <el-pagination
      :current-page="params.pageNo"
      :page-size="params.pageSize"
      :total="total"
      :pager-count="8"
      @current-change="handlePageChange"
      layout="prev, pager, next"
    />
  </ViewContainer>
</template>

<script>
import messageApi from "../../api/messageApi"
import ViewContainer from "../common/ViewContainer.vue"

export default {
  name: "ConversationListView",
  
  components:{
    ViewContainer
  },

  data(){
    return {
      conversations: [],
      params:{
        pageNo: 1,
        pageSize: 10
      },

      total: 0
    }
  },

  created(){
    this.listConversations()
  },

  methods: {
    listConversations(){
      messageApi.listConversations(this.params).then(
        (response)=>{
          this.params.pageNo = response.data.current
          this.total = response.data.total
          this.conversations = response.data.records
        }
      )
    },

    chat(userId){
      this.$router.push({path: "/chat/" + userId})
    },

    handlePageChange(pageNo){
      this.params.pageNo = pageNo
      this.listConversations()
    }
  }
}
</script>

<style scoped>
.conversation{
  word-wrap:break-word;
  word-break:break-word;
  min-height: 100px;

  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  margin: 5px;
}

.user-bar{
  display:flex;
	align-items:center;
}

.mid-text{
  font-size: 18px;
  margin: 5px;
}

.time-text{
  font-size: 16px;
  margin: 2px;
  text-align: right;
}

.avatar{
  margin: 5px;
  height: 32px;
  width: 32px;
}
</style>