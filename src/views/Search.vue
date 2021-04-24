<template>
<div class="search">
  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
      fixed
  >
    <template #title>
      <van-search v-model="searchKey" placeholder="请输入搜索关键词" @input="debounce(searchInput)" :clearable="false"/>
    </template>
  </van-nav-bar>
  <main>
    <ul>
      <li v-for="item in productlist" :key="item.time" @click="goInfo(item.id)">
        <div>
          <img :src="item.cover">
          <h3>{{item.name}}</h3>
          <span>{{item.price | forMatPrice}}</span>
        </div>
      </li>
    </ul>
  </main>
</div>
</template>

<script>
import Main from "@/views/Main";
import {searchproduct} from "@/network/api";

export default {
  name: "Search",
  components: {Main},
  data(){
    return {
      searchKey:'',
      productlist:[],
      time:'',
    }
  },
  methods:{
    async searchInput(){
      const {data} = await searchproduct(this.searchKey)
      this.productlist = data.data
    },
    debounce(call){
      clearTimeout(this.time)
      this.time = setTimeout(()=>{
        call()
      },500)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search{
  padding: 0 12px;
}
main {
  width: 100%;
  height: calc(100vh - 46px);
  margin-top: 46px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      width: 46%;
      border: 1px solid black;
      margin-top: 2.66666vw;
      border-radius: 5px;
      overflow: hidden;

      div {
        width: 100%;

        img {
          width: 100%;
        }

        h3 {
          font-size: 3.73333vw;
          white-space: nowrap;
          overflow-x: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        }

        span {
          font-size: 3.46666vw;
          color: red;
        }
      }
    }
  }
}
</style>