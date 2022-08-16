<template>
  <!--板块选择 标题 发布选项-->
  <div class="title">
    <div>
      <el-form-item label="标题">
        <el-input v-model="post.title" placeholder="请输入标题"/>
      </el-form-item>
    </div>

    <div></div>

    <div>
      <el-form-item>
        <el-button type="primary" @click="publishPost()">发布</el-button>
      </el-form-item>
    </div>
  </div>

  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'

import postApi from "../../api/postApi"

export default {
  name: "PostEdit",
  components: { Editor, Toolbar },
  props: [
    "forumId",
    "refresh" //发帖后，调用一下刷新页面
  ],

  setup(props) {
    // 编辑器实例，必须用shallowRef
    const editorRef = shallowRef()
    
    // 内容 HTML
    const valueHtml = ref('')
    
    //工具栏配置
    const toolbarConfig = {
      //设置显示的按钮
      toolbarKeys: ["headerSelect", "bold", "underline", "italic", "through", "code", "clearStyle", "|", 
        "indent", "delIndent", "|",
        "bulletedList", "uploadImage", "insertImage", "divider", "emotion", "insertLink", "codeBlock", "blockquote", "|",
        "undo", "redo"]
    }

    // 编辑器配置
    const editorConfig = { 
      placeholder: '请输入内容...',
      
      MENU_CONF: {
        //图片上传配置
        uploadImage: {
          // form-data fieldName
          fieldName: 'picture',
          // 单个文件的最大体积限制
          maxFileSize: 2 * 1024 * 1024, // 2M
          // 最多可上传几个文件
          maxNumberOfFiles: 10,
          // 选择文件时的类型限制，默认为 ['image/*']
          allowedFileTypes: ['image/*'],
          // 将 meta 拼接到 url 参数中
          metaWithUrl: false,
          // http header
          // headers: {
          //   Accept: 'text/x-json',
          //   otherKey: 'xxx'
          // },
          // 跨域是否传递 cookie ，默认为 false
          withCredentials: true,
          // 超时时间
          timeout: 5 * 1000, // 5 秒
          
          // 上传之前触发
          // onBeforeUpload(file){
            
          // },

          // 上传
          async customUpload(file, insertFn){
            postApi.uploadPicture(file).then(
              (response)=>{
                let url = response.data
                insertFn(url, "", "")
              }
            )
          }
        }
      }
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      // 记录 editor 实例
      editorRef.value = editor
    }

    const post = ref({
      title: "",
      forumId: props.forumId,
      content: valueHtml
    })

    //发布贴子
    const publishPost = () => {
      postApi.addPost(post.value).then(
        ()=>{
          post.value.title = ""
          post.value.content = ""
          if(props.refresh) props.refresh()
          ElMessage.success("发布成功")
        }
      )
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default',
      toolbarConfig,
      editorConfig,
      handleCreated,

      post,
      publishPost
    };
  }
}
</script>

<style scoped>
.title{
  display: grid;
  grid-template-columns: 85% 5% 10%;
}
</style>