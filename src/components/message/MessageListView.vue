<template>
  <ViewContainer>
    <div class="message" v-for="message in messages" :key="message.id">
      <!--评论回复消息-->
      <div v-if="message.type.toLowerCase() == 'reply'">
        <ReplyMessage :message="message"/>
      </div>
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
import ReplyMessage from "./ReplyMessage.vue"
import store from "../../store"

export default {
	name: "MessageListView",

  components:{
    ViewContainer,
    ReplyMessage
  },

  data(){
    return {
      messages: [],

      params:{
        pageNo: 1,
        pageSize: 10
      },

      total: 0
    }
  },

  created(){
    this.listSystemMessages()
  },

  methods:{
    listSystemMessages(){
      messageApi.listSystemMessage(this.params).then(
        (response)=>{
          this.params.pageNo = response.data.current
          this.total = response.data.total
          this.messages = response.data.records

          //刷新未读消息数量, 让导航栏的红点得到改变
          store.refreshMessageCount()
        }
      )
    },

    handlePageChange(pageNo){
      this.params.pageNo = pageNo
      this.listSystemMessages()
    }
  }
}
</script>

<style scoped>
.message{
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  margin: 5px;
}
</style>