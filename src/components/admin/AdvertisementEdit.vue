<template>
  <el-form label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="advertisementEdited.title"/>
    </el-form-item>

    <el-form-item label="链接">
      <el-input v-model="advertisementEdited.url"/>
    </el-form-item>

    <el-form-item label="次序">
      <el-input v-model="advertisementEdited.sequence"/>
    </el-form-item>

    <el-form-item label="图片">
      <img style="max-width: 200px; max-height: 100px" :src="advertisementEdited.imageUrl"/>
      <el-button style="margin-left: 10px" @click="uploadImage">修改</el-button>
      <input id="imageInput" hidden type="file" @change="selectImage" accept="image/*"/>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="updateAdvertisement">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import systemApi from "../../api/systemApi"
import fileApi from "../../api/fileApi"

export default {
  name: "AdvertisementEdit",

  props: ["advertisement", "refresh"],

  data(){
    return {
      advertisementEdited: null,
      selectedImageFile: null
    }
  },

  created(){
    this.$watch(
      () => this.advertisement,
      () => {
        this.advertisementEdited = JSON.parse(JSON.stringify(this.advertisement))
      },
      { immediate: true }
    )
  },

  methods:{
    uploadImage(){
      document.getElementById("imageInput").click()
    },

    updateAdvertisement(){
      if(this.selectedImageFile != null){
        //上传图片
        fileApi.uploadAdvertisementImage(this.selectedImageFile).then(
          (response)=>{
            this.selectedImageFile = null
            let imageFileId = response.data.id
  
            //上传广告
            this.advertisementEdited.imageFileId = imageFileId
            this.advertisementEdited.createTime = null
            this.advertisementEdited.updateTime = null
            this.advertisementEdited.imageUrl = null
            systemApi.updateAdvertisement(this.advertisementEdited).then(
              ()=>{
                ElMessage.success("修改成功")
                if(this.refresh) this.refresh()
              }
            )
          }
        )
      }else{
        //未修改图片，上传广告
        this.advertisementEdited.imageFileId = null
        this.advertisementEdited.createTime = null
        this.advertisementEdited.updateTime = null
        this.advertisementEdited.imageUrl = null
        systemApi.updateAdvertisement(this.advertisementEdited).then(
          ()=>{
            ElMessage.success("修改成功")
            if(this.refresh) this.refresh()
          }
        )
      }
    },

    selectImage(event){
      //获取选择的图片文件，并生成url以显示
      let files = event.target.files
      if(files && files.length > 0){
        this.selectedImageFile = files[0]
        this.advertisementEdited.imageUrl = window.URL.createObjectURL(files[0])
      }
    }
  }
}
</script>