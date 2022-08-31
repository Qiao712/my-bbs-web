<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="12">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ViewContainer"
}
</script>