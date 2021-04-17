<template>
<div class="main">
  <topnav></topnav>
  <home></home>
  <tabbar></tabbar>
</div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Topnav from "@/components/Topnav";
import Home from "@/components/Home";
export default {
  name: "Main",
  components: {Home, Topnav, Tabbar}
}
</script>

<style scoped>

</style>