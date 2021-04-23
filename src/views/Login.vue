<template>
<div class="login">
  <van-nav-bar
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />
  <van-form @submit="onSubmit">
    <van-field
        v-model="userInfo.name"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ validator, message: '请填写用户名' }]"
    />
    <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/, message: '密码必须包含字母和数字且长度6-10位' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">登录/注册</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import {login, getUser} from "@/network/api";
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data(){
    return {
      userInfo:{
        name: '',
        password: '',
      }
    }
  },
  methods:{
    ...mapActions(['userLogin']),
    validator(value,rule){
      if(value.trim().length===0){
        rule.message='不能为空'
        return false
      }
      if(value.trim().length<6||value.trim().length>10){
        rule.message='长度必须为6-10位'
        return false
      }
      if(value){
        rule.message='必须包含字母和数字'
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value)
      }
    },
    onSubmit(){
      this.userLogin(this.userInfo)

    }
  },
}
</script>

<style lang="less" scoped>

</style>