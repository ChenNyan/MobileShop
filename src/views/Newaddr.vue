<template>
<div class="newaddr">
  <van-nav-bar
      :title="fromAdd?'新增地址':'保存地址'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />
  <van-address-edit
      :area-list="areaList"
      :show-delete="!fromAdd"
      :address-info="addressInfo"
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
  />
</div>
</template>

<script>
import { areaList } from '@vant/area-data';
import {mapState,mapMutations} from 'vuex'
import {addAddr,updateAddr,deleteAddr} from "@/network/api";

export default {
  ...mapState(['userInfo']),
  name: "Newaddr",
  data(){
    return {
      areaList,
    }
  },
  methods:{
    ...mapMutations(['changeAddrList']),
    async onSave(content){
      if(this.fromAdd){
        let {name,province,city,county:country,addressDetail:detail,tel:mobile,postalCode} = content
        const newAddritem={name,province,city,country,detail,mobile,postalCode}
        const {errcode,data} = await addAddr(newAddritem)
        if(errcode!==0) return this.$toast('保存失败')
        this.changeAddrList({data,type:"add"})
        this.$router.back()
      } else {
        let {name,province,city,county:country,addressDetail:detail,tel:mobile,postalCode} = content
        const newAddritem={name,province,city,country,detail,mobile,postalCode}
        const {errcode} = await updateAddr(this.$route.query.id,newAddritem)
        if (errcode!==0) return this.$toast('修改失败')
        newAddritem.id=this.$route.query.id
        let data = newAddritem
        this.changeAddrList({data,type:"update"})
        this.$router.back()
      }
    },
    async onDelete(){
      let {errcode} = await deleteAddr(this.$route.query.id)
      if(errcode!==0) return this.$toast('删除失败')
      let data={id:this.$route.query.id}
      this.changeAddrList({data,type:"del"})
      this.$router.back()
    },
  },
  created() {
  },
  computed:{
    fromAdd(){
      return this.$route.query.id==0
    },
    addressInfo(){
      const {addressList} = this.$store.state.userInfo
      if (!addressList) return
      let addrItem = addressList.find(item => item.id==this.$route.query.id)
      if(!addrItem) return {}
      let {id, name, mobile: tel, province, city, country: county, detail: addressDetail,} = addrItem
      return {id,name,tel,province,city,county,addressDetail}
    }
  }
}
</script>

<style lang="less" scoped>

</style>