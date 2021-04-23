<template>
<div class="main">
  <topnav></topnav>
  <div class="home" @scroll="getMore"  ref="main">
    <ul>
      <li v-for="item in data" :key="item.time" @click="goInfo(item.id)">
        <div>
          <img :src="item.cover">
          <h3>{{item.name}}</h3>
          <span>{{item.price | forMatPrice}}</span>
        </div>
      </li>
    </ul>
    <van-icon name="back-top"  v-show="showBackTop" @click="goTop" />
  </div>
  <tabbar></tabbar>
</div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Topnav from "@/components/Topnav";
import {getData} from "@/network/api";
export default {
  name: "Main",
  components: {Topnav, Tabbar},
  data(){
    return{
      data:[],
      page:1,
      flag:false,
      totalPages:'',
      showBackTop:false,
      nowScrollTop:0,
    }
  },
  beforeRouteLeave(to,from,next){
    this.nowScrollTop=this.$refs.main.scrollTop
    next()
  },
  activated() {
    this.$refs.main.scrollTop = this.nowScrollTop
  },
  methods:{
    getMore(){
      let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main
      this.showBackTop=scrollTop>offsetHeight/2
      if(scrollHeight - offsetHeight <= scrollTop + 2){
        if (this.flag || this.page>=this.totalPages){
          return
        }
        this.flag=true
        this.page++
        getData(this.page).then((data)=>{
          this.data=this.data.concat(data.data.data)
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
    goInfo(id){
      this.$router.push({
        path:'/info',
        query:{id}
      })
    }
  },
  created() {
    getData(1).then((data)=>{
      this.data=data.data.data
      this.totalPages=data.data.totalPages
    })
  },
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  height: calc(100vh - 96px);
  margin-top: 46px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li{
      width: 46%;
      border: 1px solid black;
      margin-top: 2.66666vw;
      border-radius: 5px;
      overflow: hidden;
      div{
        width: 100%;
        img{
          width: 100%;
        }
        h3{
          font-size: 3.73333vw;
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        }
        span{
          font-size: 3.46666vw;
          color: red;
        }
      }
    }
  }
  .van-icon-back-top{
    position: fixed;
    right: 40px;
    bottom: 80px;
    font-size: 40px;
  }
}
</style>