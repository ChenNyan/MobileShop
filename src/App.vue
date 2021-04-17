<template>
  <div id="app">

    <router-view/>
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

</style>
