import Vue from 'vue'
import Vuex from 'vuex'
import {login,getUser,getLocation} from "@/network/api";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
    loactioncity:'定位中...'
  },
  mutations: {
    changeUserInfo(state,userInfo){
      state.userInfo=userInfo
    },
    changeLikeList(state,data){
      if(typeof data === "object") return state.userInfo.likeList.push(data)
      state.userInfo.likeList = state.userInfo.likeList.filter(item => item.product_id != data)
    },
    changeAddrList(state,msg){
      let {data,type} = msg
      if (type === 'add') {
        state.userInfo.addressList.unshift(data)
      } else if(type === 'update') {
        let index = state.userInfo.addressList.findIndex(item => item.id==data.id)
        state.userInfo.addressList.splice(index,1,data)
      } else if(type === 'del') {
        let index = state.userInfo.addressList.findIndex(item=>item.id==data.id)
        state.userInfo.addressList.splice(index,1)
      }
    },
    changeNickName(state,nickname){
      state.userInfo.nickname = nickname
    },
    clearAll(state){
      state.userInfo={}
    },
    changeAvatar(state,avatar){
      state.userInfo.avatar = avatar
    },
    changeLocations(state,city){
      state.loactioncity = city
    }
  },
  actions: {
    async userLogin(context,userInfo){
      const {data} = await login(userInfo)
      const {token} = data
      sessionStorage.setItem('token',token)
      context.commit('changeUserInfo',data)
      router.back()
    },
    async getUserInfo(context){
      if(sessionStorage.getItem('token')){
        const {data} = await getUser()
        context.commit('changeUserInfo',data)
      }
    },
    getlocation(context){
      window.navigator.geolocation.getCurrentPosition(async postition => {
        const {latitude,longitude} = postition.coords
        const res = await getLocation(latitude,longitude)
        const {city} = res.result.addressComponent
        context.commit("changeLocations",city)
      })
    }
  },
  modules: {
  }
})
