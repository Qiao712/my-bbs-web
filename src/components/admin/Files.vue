<template>
  <div class="container">
    <!-- 搜索选项 -->
    <div class="head">
      <el-form :inline="true">
        <el-form-item label="上传用户">
          <UserSelecter :callback="(selected)=>{this.queryForm.uploaderId = selected ? selected.id : null}"/>
        </el-form-item>
        <el-form-item label="上传接口">
          <el-select v-model="queryForm.source" placeholder="选择上传接口" clearable>
            <el-option label="用户头像" value="user-avatar" />
            <el-option label="内容中插图" value="post-image" />
            <el-option label="论坛Logo" value="forum-logo" />
            <el-option label="广告图片" value="ad-image" />
          </el-select>
        </el-form-item>

        <el-form-item label="文件类型">
          <el-input v-model="queryForm.fileType"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryFiles()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--用户列表-->
    <div class="main">
      <el-table :data="files">
        <el-table-column prop="uploaderUsername" label="上传者"/>

        <el-table-column prop="source" label="文件上传接口"/>

        <el-table-column prop="type" label="文件类型"/>

        <el-table-column prop="filepath" label="路径"/>
        
        <el-table-column prop="refCount" label="引用计数"/>

        <el-table-column prop="createTime" label="创建时间"/>

        <el-table-column prop="updateTime" label="更新时间"/>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="removeFile(scope.$index)">删除</el-button>
            <el-button link type="primary" size="small" @click.prevent="download(scope.$index)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="foot">
      <el-pagination
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        :total="total"
        :pager-count="8"
        @current-change="handlePageChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
  
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import UserSelecter from "./UserSelecter.vue"
import fileApi from "../../api/fileApi"

export default {
  name: "FileManagement",
  
  components: {
    UserSelecter
  },

  data(){
    return {
      queryForm:{
        fileType: "",
        uploaderId: null,
        source: "",   //文件上传来源/用途
      },

      //查询条件
      query:{
        type: null,
        uploaderId: null,
        source: null,   //文件上传来源/用途
        pageNo: 1,
        pageSize: 12 
      },

      files: [],
      total: 0,
      tableHeight: 0,

      roles:[],
    }
  },

  created(){
    this.listFiles()
  },

  mounted(){
    window.onresize = () => {
      let headHeight = this.$refs.table.$el.offsetTop
      let footHeight = this.$refs.foot.clientHeight
      this.tableHeight = window.innerHeight - headHeight - footHeight
    }
  },

  methods:{
    listFiles(){
      fileApi.listFiles(this.query).then(
        response => {
          this.query.pageNo = response.data.current
          this.files = response.data.records
          this.total = response.data.total

          //时间格式化
          this.files.forEach(file=>{
            file.createTime = (new Date(file.createTime)).toDateString()
            file.updateTime = (new Date(file.updateTime)).toDateString()
          })
        }
      )
    },

    queryFiles(){
      //复制查询参数
      this.query.type = this.queryForm.fileType.trim().length != 0 ? this.queryForm.fileType.trim() : null
      this.query.source = this.queryForm.source.trim().length != 0 ? this.queryForm.source.trim() : null
      this.query.uploaderId = this.queryForm.uploaderId

      this.listFiles()
    },

    removeFile(index){
      fileApi.removeFile(this.files[index].id).then(
        () => {
          this.listFiles()
          ElMessage.success("删除成功")
        }
      )
    },

    download(index){
      window.open(this.files[index].url,"_blank");
    },

    handlePageChange(pageNo){
      this.query.pageNo = pageNo
      this.listFiles()
    },
  }
}
</script>

<style scoped>
.container{
  display: grid;
  height: 100%;
  grid-template-rows: 50px auto 40px;
}

.el-form{
  margin: 10px;
}

.main{
  overflow: auto;
}

.avatar{
  height: 32px;
  width: 32px;
  border-radius: 100%;
}
</style>