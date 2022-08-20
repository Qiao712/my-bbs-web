<template>
  <ViewContainer>
    <ForumList/>
  </ViewContainer>
</template>

<script>
import ForumList from "./post/ForumList.vue"
import ViewContainer from "../components/common/ViewContainer.vue"

export default {
  name: "IndexView",
  components: {
    ForumList,
    ViewContainer
  }
}
</script>

<style>

</style>