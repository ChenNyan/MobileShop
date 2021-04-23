<template>
<div class="myorder">
  <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  />
  <div class="order" @scroll="getMore" ref="main">
    <van-cell-group v-for="item in orderList" :key="item.id">
      <van-cell :title="'订单ID：'+item.id" is-link @click="toOrderInfo(item.id)" />
      <van-cell v-for="citem in item.orderProducts" :key="citem.product_id"  :extra="citem.count" :value="citem.name">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="arrow" class="arrow-icon" />
        </template>
        <template #icon>
          <img :src="citem.cover" alt="">
        </template>
      </van-cell>
    </van-cell-group>
    <van-icon name="back-top"  v-show="showBackTop" @click="goTop" />
  </div>
</div>
</template>

<script>
import {getData, getorderlist} from "@/network/api";

export default {
  name: "Myorder",
  data(){
    return {
      page:1,
      orderList:[],
      flag:false,
      showBackTop:false,
    }
  },
  created() {
    this.getorder()
  },
  methods:{
    async getorder(){
      const {errcode,data}=await getorderlist(this.page)
      if (errcode!==0) return this.$toast('获取失败')
      this.orderList = data.data
    },
    getMore(){
      let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main
      this.showBackTop=scrollTop>offsetHeight/2
      if(scrollHeight - offsetHeight <= scrollTop + 2){
        if (this.flag || this.page>=this.totalPages){
          return
        }
        this.flag=true
        this.page++
        getorderlist(this.page).then((data)=>{
          this.orderList=this.data.concat(data.data)
          this.flag=false
        })
      }
    },
    goTop(){
      clearInterval(time)
      const time = setInterval(()=> {
        var now=this.$refs.main.scrollTop
        var speed=Math.floor((-now/7))
        this.$refs.main.scrollTop=now+speed
        if(this.$refs.main.scrollTop<=0){
          this.$refs.main.scrollTop=0
          clearInterval(time)
        }
      },30)
    },
    toOrderInfo(id){
      this.$router.push({
        path:'/orderinfo',
        query:{
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order{
  width: 100%;
  height: calc(100vh - 46px);
  margin-top: 46px;
  overflow-y: scroll;
  .van-cell-group{
    border-bottom: 5px solid #fafafa;
  }
  .van-icon-back-top{
    position: fixed;
    right: 40px;
    bottom: 80px;
    font-size: 40px;
  }
  .van-cell{
    img{
      width: 50px;
      height: 50px;
    }
  }
}

</style>