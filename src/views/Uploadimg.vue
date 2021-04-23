<template>
<div class="uploadimg">
  <van-nav-bar
      title="修改昵称"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />
  <van-uploader :after-read="afterRead" />
</div>
</template>

<script>
export default {
  name: "Uploadimg",
  methods:{
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  }
}
</script>

<style scoped>

</style>