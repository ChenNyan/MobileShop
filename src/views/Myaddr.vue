<template>
<div class="myaddr">
  <van-nav-bar
      :title="fromMe?'我的收货地址':'请选择收货地址'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />
  <van-address-list
      v-model="addrList.id"
      :switchable="!fromMe"
      :list="addrList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
  />
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Myaddr",
  ...mapState(['userInfo']),
  data(){
    return {
      addrList:[]
    }
  },
  created() {
    this.addrList = this.$store.state.userInfo.addressList
    this.addrList.forEach(item=>{
      item.tel=item.mobile
      item.address=`${item.province} ${item.city} ${item.country} ${item.detail}`
    })
  },
  methods:{
    onAdd(){
      this.$router.push({
        path:'/newaddr',
        query:{
          id:0
        }
      })
    },
    onEdit(item){
      this.$router.push({
        path:'/newaddr',
        query:{
          id:item.id
        }
      })
    },
    onSelect(item){
      sessionStorage.setItem('selectAddr',JSON.stringify(item))
      this.$router.back()
    }
  },
  computed:{
    fromMe() {
      return this.$route.query.from === 'me'
    },
  }
}
</script>

<style scoped>

</style>