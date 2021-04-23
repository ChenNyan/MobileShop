<template>
<div class="cart">
  <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  />
  <van-empty description="您的购物车为空" v-if="!cartInfo" />
  <div class="cartCard" v-else>
    <van-checkbox v-model="item.checked" v-for="item in cartInfo" @change="changeCheckBox(item)">
      <van-card
          :price="item.price"
          :title="item.name"
          :thumb="item.cover"
          :key="item.product_id"
          @click.stop
      >

        <template #num>
          <van-stepper v-model="item.count" disable-input @change="changeCount(item)" />
        </template>
        <template #footer>
          <van-button type="danger" size="small" @click="delItem(item.product_id)">删除</van-button>
        </template>
      </van-card>
    </van-checkbox>
  </div>
  <van-submit-bar :price="allPrice*100||0" button-text="提交订单" @submit="onSubmit">
    <span>共计:{{allItem||0}}件</span>
  </van-submit-bar>
</div>
</template>

<script>
import {getCart,delCartItem,updateCart} from "@/network/api";

export default {
  name: "Cart",
  data(){
    return {
      cartInfo:[],
    }
  },
  methods:{
    onSubmit(){
      let orderList=[]
      this.$router.push('/orderconfirm')
      this.cartInfo.forEach(item=>{
        if(item.checked){
          let {cover,name,price,count,product_id}=item
          orderList.push({cover,name,price,count,product_id})
        }
        sessionStorage.setItem('orderList',JSON.stringify(orderList))
      })
    },
    async getAllCart(){
      const {data} = await getCart()
      this.cartInfo = data
    },
    async delItem(product_id){
      const res = await delCartItem(product_id)
      if(res.errcode===0){
        this.cartInfo=this.cartInfo.filter(item=>item.product_id!=product_id)
        this.$toast('删除成功')
      } else {
        this.$toast('删除失败')
      }
    },
    async changeCheckBox(item){
      let {product_id,checked}=item
      checked = checked ? 1 : 0
      await updateCart({product_id:product_id,checked:checked})
    },
    async changeCount(item){
      let {product_id,count} = item
      await updateCart({product_id:product_id,count:count})
    }
  },
  created() {
    this.getAllCart()
  },
  computed:{
    allPrice(){
      if(!this.cartInfo) return 0
      return this.cartInfo.reduce((pre,item)=>{
        if (item.checked){
          return pre+item.count*item.price
        }else {
          return pre
        }
      },0)
    },
    allItem(){
      if(!this.cartInfo) return 0
      return this.cartInfo.reduce((pre,item)=>{
        if(item.checked){
          return pre+item.count
        } else {
          return pre
        }
      },0)
    }
  }
}
</script>

<style lang="less" scoped>
.changeNum{
  display: inline-block;
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  background-color: #fff;
  vertical-align: middle;
}
.van-checkbox{
  background-color: #fafafa;
  padding: 5px;
  .van-card__price{
    color: red;
  }
}
.cartCard{
  width: 100%;
  height: calc(100vh - 96px);
  overflow-y: scroll;
  margin-top: 46px;
}
</style>