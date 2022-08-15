<template>
  输入html:
  <el-input v-model="html"></el-input>

  DOM:
  <div v-html="html">
  </div>

  DOMPurify 过滤后:
  <div v-html="cleanHtml">
  </div>

  <!-- <p><s><u><em><strong>hello world</strong></em></u></s></p><p><code>hello world</code></p><p style="text-indent: 2em;">hello world</p><ul><li>hello world</li></ul><p><img src="https://pic2.zhimg.com/80/v2-6452e1411706bb8113f8d78e49f3fcd2_720w.png" alt="hello" data-href="hello" style=""/></p><p><br></p><hr/><p>😊😇</p><p> <a href="https://pic2.zhimg.com/80/v2-6452e1411706bb8113f8d78e49f3fcd2_720w.png" target="_blank">link</a> </p><pre><code class="language-cpp">code</code></pre><blockquote>quote</blockquote> -->
</template>

<script>
import htmlUtil from '../../util/htmlUtil'

export default {
  data(){
    return {
      html: "<button onclick=\"javascript:window.alert('hello')\">hello</button> 1231231234451",
      cleanHtml: "",
    }
  },

  created(){
    this.$watch(
      () => this.html,
      () => {
        this.cleanHtml = htmlUtil.purifyHtml(this.html)
      },
      { immediate: true }
    )
  }
}
</script>

<style>

</style>