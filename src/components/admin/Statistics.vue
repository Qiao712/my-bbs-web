<template>
  <!--展示统计信息-->
  <el-row>
    <el-col :span="8" v-if="statistic">
      <el-card class="box-card">
        贴子总数: {{statistic.postCount}}
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        评论总数: {{statistic.commentCount}}
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        用户总数: {{statistic.userCount}}
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import systemApi from "../../api/systemApi"

export default {
  name: "Statistic",

  data(){
    return {
      //统计信息
      statistic: null,
    }
  },

  created(){
    this.getStatistics()
  },

  methods:{
    getStatistics(){
      systemApi.getStatistic().then(
        (response)=>{
          this.statistic = response.data
        }
      )
    }
  }
}
</script>

<style scoped>
.box-card{
  font-size: 20px;
  min-height: 100px;
  padding: 10px;
  display:flex;
  align-items:center;
}
</style>