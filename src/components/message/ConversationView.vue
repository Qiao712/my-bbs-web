<template>
  <div class="conversation">
    <div class="user-bar" v-if="receiver">
      <img class="avatar" v-if="receiver.avatarUrl" :src="receiver.avatarUrl"/>
      <img class="avatar" v-if="! receiver.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <p class="mid-text">{{receiver.username}}</p>
    </div>

    <!--对话消息列表-->
    <div id="message-list" v-if="receiver">
      <p style="text-align: center; color: blue" @click="listOldMessage" v-if="hasOldMessage">点击加载历史消息</p>
      <p style="text-align: center;" v-if="!hasOldMessage">已无更多消息</p>

      <div class="small-text private-message" v-for="(message, index) in messages" :key="index">
        <!-- 来自对方的消息 -->
        <p v-if="message.senderId==receiver.id" style="color: blue">{{message.createTimeLocalString}} {{receiver.username}}:</p>
        <!-- 来自当前用户的信息 -->
        <p v-if="message.senderId!=receiver.id" style="color: pink">{{message.createTimeLocalString}} 我:</p>
        <div class="message-content">{{message.content.text}}</div>
      </div>

      <!--临时显示发出的消息-->
      <div class="small-text private-message" v-for="(message, index) in newMessages" :key="index">
        <p style="color: pink">{{message.createTimeLocalString}} 我:</p>
        <div class="message-content">{{message.content.text}}</div>
      </div>

      <!--空一段距离-->
      <div style="height: 5rem"></div>
    </div>

    <!--发送框-->
    <div class="edit">
      <el-input @keydown.enter.ctrl="sendMessage" v-model="text" placeholder="按下Ctrl + Entry以发送"></el-input>
      <div style="display: flex;">
        <el-button class="reply-button" @click="sendMessage" :disabled="sending">
          <span v-if="!sending">发送</span>
          <span v-if="sending">正在发送...</span>
        </el-button>
        <el-button class="reply-button" @click="scrollToBottom">滚动到底部</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "../../api/userApi"
import messageApi from "../../api/messageApi"
import store from "../../store"

export default {
  name: "ConversationView",

  data(){
    return {
      receiverId: null,
      receiver: null,

      text: "",
      sending: false,
      hasOldMessage: true,   //是否还有未加载的历史消息

      messages: [],
      newMessages: [],     //临时储存发出的消息
      interval: null,      //用于定时获取信息的计时器
    }
  },

  mounted(){
    this.receiverId = this.$route.params.userId
    this.getUser()
    this.periodicallyGetLatestMessages()
  },

  unmounted(){
    clearInterval(this.interval)
  },

  methods: {
    getUser(){
      if(!this.receiverId) return 

      userApi.getUser(this.receiverId).then(
        (response)=>{
          this.receiver = response.data
        }
      )
    },

    //发送消息
    sendMessage(){
      if(this.sending || this.text.length == "") return

      this.sending = true //发送状态
      let data = {
        receiverId: this.receiverId,
        text: this.text
      }
      messageApi.sendPrivateMessage(data).then(
        ()=>{
          //临时显示"我"刚发出的消息
          this.newMessages.push(
            { 
              content: {text: this.text}, 
              createTimeLocalString: new Date().toLocaleString() 
            }
          )
          this.text = ""
        }
      ).finally(
        ()=>{
          this.sending = false
        }
      )
    },

    //定时拉取新消息
    periodicallyGetLatestMessages(){
      let requesting = false      //是否正在请求(上个请求未完成)
      let lastMessageTime = null  //最后一条消息的时间
      let intervalTime = 2000     //间隔时间

      let getMessages = ()=>{
        if(requesting || !this.receiverId) return

        //请求新的消息
        requesting = true
        let params = {
          receiverId: this.receiverId,
          limit: 10,
          after: lastMessageTime
        }
        messageApi.listPrivateMessages(params).then(
          (response)=>{
            let latestMessages = response.data
            if(latestMessages.length == 0){
              requesting = false
              return
            }

            //最新消息的发送时间
            lastMessageTime = latestMessages[0].createTime
            latestMessages = latestMessages.reverse()

            //格式化时间
            latestMessages.forEach(message=>{
              message['createTimeLocalString'] = new Date(message.createTime).toLocaleString()
            })
            this.messages = this.messages.concat(latestMessages)
            this.newMessages = []

            this.scrollToBottom()
            requesting = false
          }
        )
      }
      
      //启动定时器
      getMessages()
      clearInterval(this.interval)
      this.interval = setInterval(getMessages, intervalTime)
    },

    //获取更多历史消息
    listOldMessage(){
      let before = null
      if(this.messages.length != 0)
        before = this.messages[0].createTime
      
      let params = {
        receiverId: this.receiverId,
        limit: 10,
        before
      }
      messageApi.listPrivateMessages(params).then(
        (response)=>{
          let oldMessages = response.data
          if(oldMessages.length == 0){
            this.hasOldMessage = false
            return
          }

          oldMessages = oldMessages.reverse()
          //格式化时间
          oldMessages.forEach(message=>{
            message['createTimeLocalString'] = new Date(message.createTime).toLocaleString()
          })
          this.messages = oldMessages.concat(this.messages)

          //刷新未读消息数量, 让导航栏的红点得到改变
          store.refreshMessageCount()
        }
      )
    },

    scrollToBottom(){
      let messageListDiv = document.getElementById("message-list")
      messageListDiv.scrollTop = messageListDiv.scrollHeight
    }
  }
}
</script>

<style scoped>
.conversation{
  height: 90%;
  display: grid;
  grid-template-rows: 40px auto 100px;
}

#message-list{
  overflow: auto;
}

.small-text{
  font-size: 18px;
  margin: 5px;
}

.private-message{
  margin: 5px;
}

.reply-button{
  margin: 5px;
  display: flex;
  justify-content: flex-end;
}

.message-content{
  word-wrap:break-word;
  word-break:break-word;
}

.user-bar{
  display:flex;
	align-items:center;
}

.avatar{
  margin: 5px;
  height: 32px;
  width: 32px;
}
</style>