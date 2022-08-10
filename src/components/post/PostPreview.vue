<template>
  <div v-if="post">
    <div class="user-bar">
      <img class="big-avatar" v-if="post.author.avatarUrl" :src="post.author.avatarUrl"/>
      <img class="big-avatar" v-if="! post.author.avatarUrl" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      <p class="mid-text">{{post.author.username}}</p>
      <p class="mid-text">: {{post.title}} </p>
    </div>

    <div>
      <span class="small-text">
        {{contentText}}
      </span>
    </div>

    <div class="time-text">
      👍:{{post.likeCount}} {{post.createTime}}
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  props: ["post"],

  data(){
    return {
      contextText: ""
    }
  },

  created(){
    this.$watch(
      () => this.post,
      () => this.getPostContentPreview(),
      { immediate: true }
    )
  },
  
  methods:{
    //遍历内容DOM的所有节点，记录其中文本(TEXT_NODE)
    getPostContentPreview(){
      if(! this.post) return ""
      
      let domparser = new DOMParser()
      let content = domparser.parseFromString(this.post.content, "text/html")
      let contentText = ""

      let travel = (node)=>{
        if(node.nodeType == 3){
          //若为TEXT_NODE节点
          contentText += node.nodeValue + " "
          return
        }

        node.childNodes.forEach(childNode => {
          travel(childNode)
        })
      }

      travel(content)
      this.contentText = contentText
    }
  }
}
</script>

<style scoped>
.big-avatar{
  margin: 5px;
  height: 32px;
  width: 32px;
}

.user-bar{
  display: flex;
  align-items: center;
}

.mid-text{
  font-size: 18px;
  margin: 5px;
}

.small-text{
  font-size: 18px;
  margin: 5px;
  word-wrap: break-word;
  word-break: break-word;
}

.time-text{
  font-size: 16px;
  margin: 2px;
  text-align: right;
}
</style>