<template>
  <el-button style="margin: 10px" @click="addVisible = true">添加广告</el-button>

  <el-table :data="advertisements">
    <el-table-column prop="sequence" label="次序"/>
    <el-table-column prop="title" label="标题"/>
    <el-table-column label="图片">
      <template #default="scope">
        <img style="max-width: 200px; max-height: 100px" :src="advertisements[scope.$index].imageUrl"/>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="链接"/>
    <el-table-column prop="createTime" label="创建时间"/>
    <el-table-column prop="updateTime" label="更新时间"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="editAdvertisement(scope.$index)">编辑</el-button>
        <el-button link type="primary" size="small" @click.prevent="deleteAdvertisement(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--编辑广告-->
  <el-dialog v-model="editVisible" v-if="advertisementEdited">
    <AdvertisementEdit 
      :advertisement="advertisementEdited"
      :refresh="()=>{
        editVisible = false
        this.listAdvertisements()
      }"
    />
  </el-dialog>

  <!--添加广告-->
  <el-dialog v-model="addVisible">
    <AdvertisementAdd 
      :refresh="()=>{
        addVisible = false
        this.listAdvertisements()
      }"
    />
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import systemApi from "../../api/systemApi"
import AdvertisementEdit from "./AdvertisementEdit.vue"
import AdvertisementAdd from "./AdvertisementAdd.vue"

export default {
  name: "Advertisements",

  components:{
    AdvertisementEdit,
    AdvertisementAdd
  },

  data(){
    return {
      advertisements: [],

      //修改窗口
      editVisible: false,
      advertisementEdited: null,

      //添加窗口
      addVisible: false,
    }
  },

  created(){
    this.listAdvertisements()
  },

  methods:{
    listAdvertisements(){
      systemApi.listAdvertisements().then(
        (response)=>{
          this.advertisements = response.data
        }
      )
    },

    editAdvertisement(index){
      this.advertisementEdited = this.advertisements[index]
      this.editVisible = true
    },

    deleteAdvertisement(index){
      systemApi.removeAdvertisement(this.advertisements[index].id).then(
        ()=>{
          ElMessage.success("删除成功")
          this.listAdvertisements()
        }
      )
    }
  }
}
</script>