<template>
  <div class="changepaypassword">
    <van-nav-bar
        title="修改支付密码"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        class="b_border"
    />
    <van-form @submit="onSubmit">
      <van-field
          v-model="oldpassword"
          type="password"
          name="旧密码"
          label="旧密码"
          placeholder="请输入旧密码"
          :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
          v-model="newpassword"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {changepaypassword} from "@/network/api";
import {mapState,mapMutations} from "vuex"
export default {
  ...mapState(['userInfo']),
  name: "Changepaypassword",
  data(){
    return {
      oldpassword:'',
      newpassword:''
    }
  },
  methods:{
    ...mapMutations(['clearAll']),
    async onSubmit(){
      const {errcode} = await changepaypassword(this.oldpassword,this.newpassword)
      if (errcode!==0) return this.$toast('修改失败')
      this.$toast('修改成功，请重新登录')
      sessionStorage.clear()
      this.clearAll()
      this.$router.replace('/me')
    }
  }
}
</script>

<style scoped>

</style>