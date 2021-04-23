<template>
<div class="orderinfo">
  <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  />
  <van-steps :active="orderInfo.order_status" style="margin-top: 46px;">
    <van-step>未付款</van-step>
    <van-step>已付款</van-step>
    <van-step>已发货</van-step>
    <van-step>交易完成</van-step>
  </van-steps>
  <van-cell
      :title="orderInfo.userAddress.name+'，'+orderInfo.userAddress.mobile"
      :label="`${orderInfo.userAddress.province} ${orderInfo.userAddress.city} ${orderInfo.userAddress.country} ${orderInfo.userAddress.detail}`"
  />
  <van-cell v-for="item in orderInfo.orderProducts"
            :title="item.name"
            :value="item.count+'件'"
            :label="item.price" >
    <template #icon>
      <img :src="item.cover">
    </template>
  </van-cell>
  <van-submit-bar :price="allPrice*100||0" button-text="付款" >
    <template #button>
      <van-button type="danger" v-if="orderInfo.order_status===0" @click="onSubmit">付款</van-button>
      <van-button type="danger" disabled v-else-if="orderInfo.order_status===1" style="background-color: gray;border: 0;" >等待商家发货</van-button>
    </template>
    <span>共计:{{allItem||0}}件</span>
  </van-submit-bar>
  <Keyboard ref="keyboard" :orderid="$route.query.id"></Keyboard>
</div>
</template>

<script>
import {getorderinfo} from "@/network/api";
import Keyboard from "@/components/Keyboard";

export default {
  name: "Orderinfo",
  components: {Keyboard},
  data(){
    return {
      orderInfo:{},
      id:''
    }
  },
  created() {
    this.id=this.$route.query.id
    this.getOrderInfo()
  },
  methods:{
    async getOrderInfo(){
      const {errcode,data}=await getorderinfo(this.$route.query.id)
      if(errcode!==0) return
      this.orderInfo = data
    },
    onSubmit(){
      this.$refs.keyboard.keyshow=true
    }
  },
  computed:{
    allItem(){
      return this.orderInfo.orderProducts.reduce((p,c)=>p+c.count,0)
    },
    allPrice(){
      return this.orderInfo.orderProducts.reduce((p,c)=>p+c.count*c.price,0)
    }
  },

}
</script>

<style lang="less" scoped>
.van-cell{
  img{
    width: 50px;
    height: 50px;
  }
}
</style>