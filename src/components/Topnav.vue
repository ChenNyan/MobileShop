<template>
<div class="topnav">
  <ul>
    <li>
      <van-icon name="location-o" />
      <span>{{getLocation}}{{city}}</span>
    </li>
    <li>
      <span>精选</span>
    </li>
    <li>
      <van-icon name="search" />
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "Topnav",
  data(){
    return {
      city:'',
    }
  },
  methods:{

  },
  computed:{
    getLocation(){
      navigator.geolocation.getCurrentPosition(
          //locationSuccess 获取成功的话
          (position) => {
            this.getLongitude = position.coords.longitude;
            this.getLatitude = position.coords.latitude;
            let x = this.getLongitude
            let y = this.getLatitude
            this.$jsonp('http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location='+y+','+x+'&output=json&pois=0').then((json)=>{
              this.city =  json.result.addressComponent.city
            })
          }
          )
    },
  }
}
</script>

<style lang="less" scoped>
.topnav{
  width: 100vw;
  height: 50px;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  ul{
    display: flex;
    text-align: center;
    line-height: 50px;
    li{
      flex: 1;
    }
  }
  span{
    font-size: 4.53333vw;
  }
  i{
    font-size: 4.53333vw;
    vertical-align: middle;
    color: blue;
  }
}
</style>