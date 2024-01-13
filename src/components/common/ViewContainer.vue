<template>
  <el-row justify="center">
    <el-col :xs="30" :sm="30" :md="26" :lg="20" :xl="18">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ViewContainer"
}
</script>