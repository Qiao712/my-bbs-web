<template>
  <ViewContainer>
    <Carousel/>
    <ForumList/>
  </ViewContainer>
</template>

<script>
import Carousel from "./Carousel.vue"
import ForumList from "./forum/ForumList.vue"
import ViewContainer from "../components/common/ViewContainer.vue"

export default {
  name: "IndexView",
  components: {
    ForumList,
    ViewContainer,
    Carousel
  }
}
</script>

<style>

</style>