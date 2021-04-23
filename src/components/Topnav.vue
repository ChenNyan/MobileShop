<template>
<div class="topnav">
  <van-nav-bar title="精选" fixed class="b_border">
    <template #left>
      <van-icon name="location-o" size="18" />
      <span>深圳市</span>
    </template>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
</div>
</template>

<script>
export default {
  name: "Topnav",
  data(){
    return {

    }
  },
}
</script>

<style lang="less" scoped>

</style>