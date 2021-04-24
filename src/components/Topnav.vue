<template>
<div class="topnav">
  <van-nav-bar title="精选" fixed class="b_border">
    <template #left>
      <van-icon name="location-o" size="18" @click="$router.push('/selectcity')"/>
      <span>{{$store.state.loactioncity}}</span>
    </template>
    <template #right>
      <van-icon name="search" size="18" @click="$router.push('/search')" />
    </template>
  </van-nav-bar>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  ...mapState(['loactioncity']),
  name: "Topnav",
  data(){
    return {

    }
  },
}
</script>

<style lang="less" scoped>

</style>