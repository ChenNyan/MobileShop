<template>
<div class="mylike">
  <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  />
  <div class="center">
    <van-cell
        v-for="item in likeList"
        :title="item.name"
        is-link
        center
        :label="'￥'+item.price"
        @click="goInfo(item.product_id)"
        :key="item.product_id"
    >
      <template #icon>
        <img :src="item.cover" alt="">
      </template>
    </van-cell>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  ...mapState(['userInfo']),
  name: "Mylike",
  data(){
    return {
      likeList:[]
    }
  },
  created() {
    this.likeList=this.$store.state.userInfo.likeList
  },
  methods:{
    goInfo(id){
      this.$router.push({
        path:'/info',
        query:{
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.center{
  width: 100%;
  height: calc(100vh - 46px);
  margin-top: 46px;
  overflow-y: scroll;
  .van-cell{
    img{
      width: 50px;
      height: 50px;
    }
  }
}

</style>