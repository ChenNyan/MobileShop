<template>
<div class="orderconfirm">
  <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />
  <van-cell
      :title="hasSelAddr?selectAddr.name+'，'+selectAddr.tel:'请选择收货地址'"
      :label="hasSelAddr?selectAddr.address:''"
      size="large"
      is-link
      to="/myaddr"
      class="changeAddr" />
  <van-cell
      v-for="item in orderList"
      :title="item.name"
      center
      :value="item.count+'件'"
      :label="'￥'+item.price"
      @click="goInfo(item.product_id)"
      :key="item.product_id"
  >
    <template #icon>
      <img :src="item.cover" alt="">
    </template>
  </van-cell>
  <van-submit-bar :price="allPrice*100||0" button-text="付款" @submit="onSubmit">
    <span>共计:{{allItem||0}}件</span>
  </van-submit-bar>
  <Keyboard ref="keyboard" :orderid="order_id"></Keyboard>
</div>
</template>

<script>
import Keyboard from "@/components/Keyboard";
import {neworder} from "@/network/api";

export default {
  name: "Orderconfirm",
  components: {Keyboard},
  data(){
    return {
      orderList:[],
      selectAddr:{},
      order_id:'',
    }
  },
  created() {
    this.selectAddr=JSON.parse(sessionStorage.getItem('selectAddr')) || {}
    this.orderList=JSON.parse(sessionStorage.getItem('orderList'))
  },
  methods:{
    async onSubmit(){
      if(!this.hasSelAddr) return this.$toast("请选择收货地址")
      const {id:user_address_id} = this.selectAddr
      const {orderList:orderProductList} = this
      const {errcode,data}=await neworder(orderProductList,user_address_id)
      if(errcode!==0) return this.$toast('提交订单失败')
      this.order_id = data.id
      this.$refs.keyboard.keyshow=true
    },
  },
  computed:{
    allPrice(){
      return this.orderList.reduce((p,c)=> p+c.count*c.price,0)
    },
    allItem(){
      return this.orderList.reduce((p,c)=> p+c.count,0)
    },
    hasSelAddr() {
      return !!(this.selectAddr.id || this.selectAddr.name)
    },
  }
}
</script>

<style lang="less" scoped>
.changeAddr{
  border-top: 10px solid rgba(150,150,150,.1);
  border-bottom: 10px solid rgba(150,150,150,.1);
}
.van-cell{
  img{
    width: 50px;
    height: 50px;
  }
}
</style>