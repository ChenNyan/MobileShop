<template>
<div class="home" @scroll="getMore">
  <ul>
    <li v-for="item in data" :key="item.time">
      <div>
        <img v-bind:src="item.cover">
        <h3>{{item.name}}</h3>
        <span>￥{{item.price}}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import {getData} from "@/network/api";

export default {
  name: "Home",
  data(){
    return {
      data:[],
      page:1,
      flag:false,
      totalPages:''
    }
  },
  methods:{
    getMore(e){
      if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-100){
        if (this.flag||this.page===this.totalPages){
          return
        }
        this.flag=true
        this.page++
        getData(this.page).then((data)=>{
          this.$Toast.loading({
            duration: 500,
            message: '加载中...',
            forbidClick: true,
          });
          this.data=this.data.concat(data.data.data)
          this.flag=false
        })
      }
    },
  },
  created() {
    getData(1).then((data)=>{
      console.log(data.data.data)
      this.data=data.data.data
      this.totalPages=data.data.totalPages
    })
  },
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  height: calc(100vh - 100px);
  margin-top: 50px;
  overflow-y: scroll;
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li{
      width: 46%;
      border: 1px solid black;
      margin-top: 2.66666vw;
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
}
</style>