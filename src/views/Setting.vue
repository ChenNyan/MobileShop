<template>
<div class="setting">
  <van-nav-bar
      title="用户设置"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />
  <van-cell value="基本信息" />
  <van-cell title="修改昵称" icon="setting-o" is-link to="/changenickname"/>
  <van-cell title="修改头像" icon="setting-o" is-link to="/uploadimg"/>
  <van-cell value="安全" />
  <van-cell title="修改登录密码" icon="setting-o" is-link to="/changeloginpassword"/>
  <van-cell title="修改支付密码" icon="setting-o" is-link to="/changepaypassword"/>
</div>
</template>

<script>
export default {
  name: "Setting"
}
</script>

<style scoped>

</style>