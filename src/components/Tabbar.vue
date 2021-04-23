<template>
<div class="tabbar ">
  <van-tabbar v-model="active" route class="t_border">
    <van-tabbar-item icon="star-o" to="/home">精选</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: "Tabbar",
  data(){
    return {
      active:0
    }
  },
}
</script>

<style scoped>

</style>