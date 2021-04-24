<template>
<div class="selectcity">
  <van-nav-bar
      title="选择城市"
      :left-text="$store.state.loactioncity"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  />
  <main style="margin-top:47px">
    <van-index-bar sticky >
      <template v-for="(value, key) in citylist">
        <van-index-anchor
            :index="key"
            :key="key"

        />
        <van-cell :title="item.name" v-for="item in value" :key="item.id"  @click="selectCity(item.name)"/>
      </template>
    </van-index-bar>
  </main>
</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {getcitylist} from "@/network/api";

export default {
  ...mapState(['loactioncity']),
  name: "Selectcity",
  data(){
    return {
      citylist:[],
    }
  },
  methods:{
    ...mapMutations(['changeLocations']),
    async getcity(){
      const {data} = await getcitylist()
      this.citylist = data.cities
    },
    selectCity(city){
      this.changeLocations(city)
      this.$router.back()
    }
  },
  created() {
    this.getcity()
  }
}
</script>

<style scoped>
main{
  height: calc(100vh - 46px);
  overflow-y: scroll;
}
</style>