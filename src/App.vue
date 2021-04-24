<template>
  <div id="app">
    <keep-alive include="Main">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>

export default {
  name:'App',
  components: {},
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
