<template>
  <div class="conversation">
    <div class="user-bar" v-if="receiver">
      <img class="avatar" v-if="receiver.avatarUrl" :src="receiver.avatarUrl"/>
      <img class="avatar" v-if="! receiver.avatarUrl" src="../../assets/default-avatar.png"/>
      <p class="mid-text">{{receiver.username}}</p>

      <!--连接状态-->
      <div style="width: 50px"/>
      <p v-if="status == 0">连接断开, 正在尝试重连</p>

      <!--其他消息(来自其他用户的消息)-->
      <div style="width: 100px"/>
      <p class="mid-text" style="color: blue">{{scrollingMessage}}</p>
    </div>

    <!--对话消息列表-->
    <div id="message-list" v-if="receiver">
      <p style="text-align: center; color: blue" @click="listOldMessage" v-if="hasOldMessage">点击加载历史消息</p>
      <p style="text-align: center;" v-if="!hasOldMessage">已无更多消息</p>

      <div class="small-text private-message" v-for="(message, index) in messages" :key="index">
        <!-- 来自对方的消息 -->
        <p v-if="message.from == 'other'" style="color: blue">{{message.createTimeLocalString}} {{receiver.username}}:</p>
        <!-- 来自当前用户的信息 -->
        <p v-if="message.from == 'me'" style="color: pink">{{message.createTimeLocalString}} 我:</p>

        <div class="message-content">{{message.content}}</div>
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
import chatApi from "../../api/chatApi"
import store from "../../store"
import { ElMessage } from 'element-plus'

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

      webSocket: null,
      status: 0,                  //0: 连接断开, 1: 正在连接, 2: 连接正常
      interval: null,        //定时检查连接状态，并发送心跳

      scrollingMessage: "",  //用于临时显示其他用户发来的消息
      cacheUsers: {},        //缓存临时消息的用户信息
    }
  },

  mounted(){
    this.receiverId = this.$route.params.userId
    this.getUser()
    this.initWebsocket()

    this.interval = setInterval(()=>{
      if(this.status == 0){
        //重连
        this.initWebsocket()
      }else if(this.status == 2){
        //心跳
        
      }
    }, 1000)
  },

  unmounted(){
    clearInterval(this.interval)

    //关闭连接
    if(this.webSocket)
      this.webSocket.close()
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

    //初始化连接
    initWebsocket(){
      this.status = 1 //正在连接

      //获取token
      let token = sessionStorage.getItem("Token")
      token = token ? token : localStorage.getItem("Token")
      if(token == null){
        ElMessage.error("未登录")
        return
      }
      
      //获取连接
      let uri = chatApi.getChatWebSocketUri(token)
      if(window.WebSocket){
        this.webSocket = new window.WebSocket(uri)
      }else{
        console.log("Moz")
        this.webSocket = new window.MozWebSocket(uri)
      }

      if(!this.webSocket){
        alert("该浏览器不支持WebSocket")
      }else{
        //连接建立
        this.webSocket.onopen = (event)=>{
          this.status = 2
          console.info("连接建立", event)
        }

        //接受到消息
        this.webSocket.onmessage = (event)=>{
          this.receiveMessage(event.data)
        }

        //连接断开
        this.webSocket.onclose = (event)=>{
          this.status = 0
          console.log("连接关闭", event)
        }
      }
    },

    //发送消息
    sendMessage(){
      if(this.sending || this.text.length == "") return

      this.sending = true //发送状态, true: 正在发送

      let message = {
        receiverId: this.receiverId,
        content: this.text,
        type: 1,
      }
      
      let request = {
        requestType: 1,
        privateMessage: message
      }

      this.webSocket.send(JSON.stringify(request))
      
      message["from"] = "me"
      this.messages.push(message)
      this.sending = false
    },

    //接收到消息
    receiveMessage(message){
      let response = JSON.parse(message)
      if(response.status != 0){
        ElMessage.error("错误:" + response.message)
      }else{
        let message = response.data
        
        if(message.senderId == this.receiverId){
          //是对话对象发来的消息，显示在对话列表中
          message["from"] = "other"
          this.messages.push(message)
        }else{
          //来自其他用户的消息，在上方提示
          if(!this.cacheUsers[message.senderId]){
            userApi.getUser(message.senderId).then((response)=>{
              this.cacheUsers[message.senderId] = response.data
              
              let username = this.cacheUsers[message.senderId].username
              let shortContent = message.content.length > 20 ? message.content.substring(0, 20) + "..." : message.content
              this.scrollingMessage = "新消息 " + username + ":" + shortContent
            })
          }else{
            let username = this.cacheUsers[message.senderId].username
            let shortContent = message.content.length > 20 ? message.content.substring(0, 20) + "..." : message.content
            this.scrollingMessage = "新消息 " + username + ":" + shortContent
          }
        }
      }
    },

    //获取更多历史消息
    listOldMessage(){
      let before = null
      if(this.messages.length != 0)
        before = this.messages[0].createTime
      
      let params = {
        receiverId: this.receiverId,
        limit: 20,
        before
      }
      chatApi.listPrivateMessages(params).then(
        (response)=>{
          let oldMessages = response.data
          if(oldMessages.length == 0){
            this.hasOldMessage = false
            return
          }

          oldMessages = oldMessages.reverse()
          //格式化时间，并标记其来自对方/自己
          oldMessages.forEach(message=>{
            message['createTimeLocalString'] = new Date(message.createTime).toLocaleString()
            message['from'] = (message.senderId == this.receiverId) ? "other" : "me"
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