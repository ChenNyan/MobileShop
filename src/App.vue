<template>
  <div id="app">
    <keep-alive include="Main">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import Topnav from "@/components/Topnav";

export default {
  name:'App',
  components: {Topnav},
  data(){
    return {}
  },
  methods: {

  },
}
</script>

<style lang="less">
.van-icon-like{
  color: red !important;
}
</style>
