<template>
<div class="me">
  <div class="head">
    <template v-if="isLogin">
      <img src="../assets/profile.76a75b8f.png">
      <span @click="goLogin">登录</span>
    </template>
    <template v-else>
      <img :src="$store.state.userInfo.avatar?baseImgUrl+$store.state.userInfo.avatar:require('../assets/profile.76a75b8f.png')">
      <span @click="goLogin">{{$store.state.userInfo.nickname}}</span>
    </template>
    <div class="loging">
      <img src="../assets/profile.76a75b8f.png">
      <span @click="goLogin">登录</span>
    </div>
  </div>
  <van-grid>
    <van-grid-item icon="pending-payment" text="待付款" />
    <van-grid-item icon="records" text="待发货" />
    <van-grid-item icon="tosend" text="已发货" />
    <van-grid-item icon="logistics" text="已完成" />
  </van-grid>
  <van-cell icon="records" title="我的订单" is-link to="/myorder" />
  <van-cell icon="like-o" title="我的收藏" is-link to="/mylike" />
  <van-cell icon="description" title="收货地址" is-link :to="{path:'/Myaddr',query:{from:'me'}}" />
  <van-cell icon="setting-o" title="用户设置" is-link to="/setting"/>
  <tabbar></tabbar>
</div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import {mapState} from 'vuex'
import {baseImg} from "@/network/api";

export default {
  name: "Me",
  ...mapState(['userInfo']),
  data(){
    return {
      isLogin:true,
      baseImgUrl:'',
    }
  },
  components: {Tabbar},
  methods:{
    goLogin(){
      this.$router.push('/login')
    }
  },
  created(){
    if(sessionStorage.getItem('token')){
      this.isLogin = false
      this.baseImgUrl=baseImg
    }
  }
}
</script>

<style lang="less" scoped>
.head{
  height: 25vw;
  line-height: 25vw;
  padding: 0 20px;
  background-color: #F37D0F;
  color: #fff;
  img{
    width: 17vw;
    height: 17vw;
    border-radius: 50%;
    box-shadow: 0 0 3px 3px rgba(150,150,150,.4);
  }
  span{
    margin-left: 10px;
  }
}

</style>