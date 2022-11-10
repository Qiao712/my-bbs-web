<template>
  <el-form label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="advertisement.title"/>
    </el-form-item>

    <el-form-item label="链接">
      <el-input v-model="advertisement.url"/>
    </el-form-item>

    <el-form-item label="次序">
      <el-input v-model="advertisement.sequence"/>
    </el-form-item>

    <el-form-item label="图片">
      <img style="max-width: 200px; max-height: 100px" :src="imageUrl"/>
      <el-button style="margin-left: 10px" @click="uploadImage">选择图片</el-button>
      <input id="imageInput" hidden type="file" @change="selectImage" accept="image/*"/>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="addAdvertisement">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import systemApi from "../../api/systemApi"
import fileApi from "../../api/fileApi"

export default {
  name: "AdvertisementAdd",

  props: ["refresh"],

  data(){
    return {
      advertisement: {
        title: "",
        imageFileId: null,
        url: "",
        sequence: "",
      },

      selectedImageFile: null,
			imageUrl: null,
    }
  },

  methods:{
    uploadImage(){
      document.getElementById("imageInput").click()
    },

    addAdvertisement(){
      if(this.selectedImageFile == null){
				ElMessage.warning("未指定图片")
				return
			}

			//上传图片后上传广告
      fileApi.uploadAdvertisementImage(this.selectedImageFile).then(
				(response)=>{
					this.advertisement.imageFileId = response.data.id
					this.selectedImageFile = null

					//上传广告
					systemApi.addAdvertisement(this.advertisement).then(
						()=>{
							ElMessage.success("添加成功")
							if(this.refresh) this.refresh()

							//清空
							this.advertisement = {
								title: "",
								imageFileId: null,
								url: "",
								sequence: "",
							}
						}
					)
				}
			)
    },

    selectImage(event){
      //获取选择的图片文件，并生成url以显示
      let files = event.target.files
      if(files && files.length > 0){
        this.selectedImageFile = files[0]
        this.imageUrl = window.URL.createObjectURL(files[0])
      }
    }
  }
}
</script>