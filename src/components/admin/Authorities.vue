<template>
  <el-table :data="authorities">
    <el-table-column prop="authority" label="权限"/>
    <el-table-column prop="category" label="分类"/>
    <el-table-column prop="name" label="名称"/>
    <el-table-column prop="valid" label="有效性"/>
    <el-table-column prop="description" label="描述"/>
    <el-table-column prop="createTime" label="创建时间"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="updateAuthority(scope.$index)">编辑</el-button>
        <el-button link type="primary" size="small" @click.prevent="removeAuthority(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--权限编辑-->
  <el-dialog v-model="visible" v-if="authorityUpdated" :title="'编辑' + authorityUpdated._authority">
    <el-form label-width="120px">
      <el-form-item label="权限">
        {{authorityUpdated._authority}}
      </el-form-item>

      <el-form-item label="分类">
        <el-select v-model="authorityUpdated.category" placeholder="选择或输入分类" allow-create clearable filterable>
          <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="authorityUpdated.name" />
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="authorityUpdated.description" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus/lib/components'
import roleApi from "../../api/roleApi"

export default {
  name: "Authorities",
  
  data(){
    return {
      authorities: [],
      categories: [],   //权限分类

      visible: false,
      authorityUpdated: null,
    }
  },

  created(){
    this.listAuthorities()
  },

  methods:{
    listAuthorities(){
      roleApi.listAuthorities().then(
        response => {
          this.authorities = response.data

          this.authorities.sort((a,b)=>{
            return a.category < b.category
          })

          //提取所有分类名称
          let s = new Set()
          this.authorities.forEach(authority => {
            s.add(authority.category)
          });
          s.delete(null)
          this.categories = []
          s.forEach(key=>this.categories.push(key))
        }
      )
    },

    updateAuthority(index){
      this.authorityUpdated = {
        id: this.authorities[index].id,
        _authority: this.authorities[index].authority,  //只用于显示
        category: this.authorities[index].category,
        name: this.authorities[index].name,
        description: this.authorities[index].description,
      }

      this.visible = true
    },

    submit(){
      roleApi.updateAuthority(this.authorityUpdated).then(
        ()=>{
          this.listAuthorities()
          this.visible = false
          ElMessage.success("更新成功")
        }
      )
    },

    removeAuthority(index){
      roleApi.removeAuthority(this.authorities[index].id).then(
        ()=>{
          this.listAuthorities()
          ElMessage.success("删除成功")
        }
      )
    }
  }
}
</script>

<style scoped>
</style>