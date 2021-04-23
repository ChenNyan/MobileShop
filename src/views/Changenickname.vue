<template>
<div class="changenickname">
  <van-nav-bar
      title="修改昵称"
      left-text="返回"
      left-arrow
      @click-left="backClick"
      class="b_border"
        />
  <van-form @submit="onSubmit">
    <van-field
        v-model="nickName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import {changeUserNickName} from "@/network/api";
import {mapState,mapMutations} from 'vuex'
export default {
  name: "Changenickname",
  data(){
    return {
      currNickName:''
    }
  },
  methods:{
    ...mapMutations(["changeNickName"]),
    async onSubmit(){
      const {errcode} = await changeUserNickName(this.username)
      if(errcode !== 0) return this.$toast("修改失败")
      this.$router.push("/me")
    },
    backClick(){
      this.changeNickName(this.currNickName)
      this.$router.back()
    },
  },
  created(){
    this.currNickName = this.userInfo.nickname
  },
  computed:{
    ...mapState(["userInfo"]),
    nickName:{
      set(newVlaue){
        this.changeNickName(newVlaue)
      },
      get(){
        return this.userInfo.nickname
      }
    }
  }
}
</script>

<style scoped>

</style>