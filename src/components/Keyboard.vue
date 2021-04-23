<template>
<div class="keyboard">
  <van-popup v-model="keyshow" position="bottom" :style="{ height: '70%' }">
    <van-nav-bar
        title="付款"
        @click-left="clear"
        class="b_border"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <van-password-input
        :value="pay_password"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
        v-model="pay_password"
        :show="true"
        @blur="showKeyboard = false"
        @input="oninput"
    />
  </van-popup>

</div>
</template>

<script>
import {payorder} from "@/network/api";

export default {
  name: "Keyboard",
  props:["orderid"],
  data(){
    return {
      pay_password:'',
      keyshow:false,
    }
  },
  methods:{
    clear() {
      this.$router.push({
        path:'/orderinfo',
        query:{id:this.orderid}
      })
      this.keyshow = false
    },
    oninput(){
      const  order_id  = this.orderid
      this.$nextTick(async ()=>{
        if(this.pay_password.length>=6){
          const {errcode,errmsg}=await payorder(order_id,this.pay_password)
          if(errcode!==0) return this.$toast(errmsg)
          this.$toast("支付成功")
          this.pay_password = ''
          this.$router.push("/paysuccess")
          sessionStorage.removeItem('orderList')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>