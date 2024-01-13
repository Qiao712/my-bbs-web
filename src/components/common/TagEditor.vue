<template>
  <el-tag
    v-for="tag in tags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + New Tag
  </el-button>
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: "TagEditor",

  inheritAttrs: false,

  props: ['tagUpdate'],

  data(){
    return {
      inputValue: "",
      inputVisible: false,
      tags: [],
    }
  },

  methods:{
    handleClose(tag){
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.tagUpdate(this.tags)
    },

    showInput(){
      this.inputVisible = true
      nextTick(() => {
        this.$refs.InputRef.input.focus()
      })
    },

    handleInputConfirm(){
      if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
        this.tags.push(this.inputValue)
        this.tagUpdate(this.tags)
      }
      this.inputVisible = false
      this.inputValue = ''
    }

    
  }
}
</script>

<style>
.mx-1{
  margin: 5px;
}
</style>