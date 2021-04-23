<template>
<div class="detailinfo">
  <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  />
  <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#1989fa">
    <van-swipe-item v-for="item in detailInfo.imgList"><img :src="item.path" :key="item.id"></van-swipe-item>
  </van-swipe>
  <van-cell-group>
    <van-cell :title="detailInfo.name" :label="detailInfo.price | forMatPrice" />
  </van-cell-group>
  <van-cell-group class="num">
    <van-row>
      <van-col span="12">免运费</van-col>
      <van-col span="12">剩余：{{ detailInfo.stock || 0 }}</van-col>
    </van-row>
  </van-cell-group>
  <van-cell-group class="num">
    <van-row>
      <van-col span="12">销量：{{detailInfo.sales}}</van-col>
      <van-col span="12">收藏：{{ detailInfo.likes}}</van-col>
    </van-row>
  </van-cell-group>
  <van-tabs v-model="active" sticky offset-top="46px" >
    <van-tab title="图片">
      <img v-for="item in detailInfo.detailImgList" :src="item.path" :key="item.id">
    </van-tab>
    <van-tab title="参数">
      <van-cell-group class="num">
        <van-row v-for="item in detailInfo.properties" :key="item.id">
          <van-col span="12">{{item.name}}</van-col>
          <van-col span="12">{{item.detail}}</van-col>
        </van-row>
      </van-cell-group>
    </van-tab>
  </van-tabs>
  <van-goods-action>
    <van-goods-action-icon :icon="isLike ? 'like' : 'like-o'" text="收藏" @click="likeClick"/>
    <van-goods-action-icon icon="cart-o" text="购物车" to="/cart"/>
    <van-goods-action-button type="warning" text="加入购物车" @click="addCartClick" />
    <van-goods-action-button type="danger" text="立即购买" @click="goConfirm"/>
  </van-goods-action>
</div>
</template>

<script>
import {getDetail,addLike,delLike,updateCart} from "@/network/api";
import {mapState,mapMutations} from "vuex"
export default {
  name: "Detailinfo",
  data(){
    return {
      detailInfo:{},
      active:0,
    }
  },
  methods:{
    ...mapMutations(["changeLikeList"]),
    async getInfo(){
      const {data} = await getDetail(this.$route.query.id)
      this.detailInfo=data
    },
    async likeClick(){
      const {id}=this.$route.query
      if(this.isLike){
        const {errcode} = await delLike(id)
        if(errcode!==0) return
        this.changeLikeList(id)
      } else {
        const {errcode} = await addLike(id)
        if(errcode!==0) return
        const {id:product_id,cover,name,price}=this.detailInfo
        this.changeLikeList({product_id,cover,name,price})
      }
    },
    async addCartClick(){
      await updateCart({product_id:this.$route.query.id})
      this.$toast('添加成功')
    },
    goConfirm(){
      this.$router.push('/orderconfirm')
      if(!sessionStorage.getItem('token')) return
      let {cover,id:product_id,name,price} = this.detailInfo
      sessionStorage.setItem('orderList',JSON.stringify([{cover,product_id,name,price,count:1}]))
    }
  },
  computed:{
    ...mapState(['userInfo']),
    isLike(){
      if(!this.userInfo.likeList) return;
      return this.userInfo.likeList.some(item => item.product_id == this.$route.query.id)
    }
  },
  created() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  text-align: center;
  height: 300px;
  margin-top: 46px;
  img{
    width: 100%;
    height: 100%;
  }
}
.van-cell__label{
  color: red;
}
.num{
  padding: 10px 16px;
  font-size: 12px;
}
.van-tabs__content {
  width: 100%;
  img {
    width: 100%;
  }
}
.van-tabs{
  padding-bottom: 50px;
}
</style>