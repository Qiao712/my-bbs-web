<template>
  <el-carousel height="200px">
    <el-carousel-item v-for="advertisement in advertisements" :key="advertisement.id">
      <a :href="advertisement.url">
        <el-image style="width: 100%; height: 100%" :src="advertisement.imageUrl" :alt="advertisement.title" :fit="cover" />
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import systemApi from "../api/systemApi"

export default {
  name: "Carousel",
  data(){
    return {
      advertisements: []
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
    }
  }
}
</script>

<style>

</style>