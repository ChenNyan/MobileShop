<template>
<div class="uploadimg">
  <van-nav-bar
      title="修改昵称"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="b_border"
  />


  <div class="showimg">
    <img :src="$store.state.userInfo.avatar?baseImgUrl+$store.state.userInfo.avatar:require('../assets/profile.76a75b8f.png')" ref="img">
  </div>


  <div class="btn">
    <input type="file" ref="file" style="display:none" @change="fileChange"/>
    <van-button type="primary" @click="selectImg">选择图片</van-button>
    <van-button type="info" @click="upload">上传图片</van-button>
  </div>
</div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
import {baseImg,uploadavator} from "@/network/api";
export default {
  ...mapState(['userInfo']),
  name: "Uploadimg",
  data(){
    return {
      baseImgUrl:'',
    }
  },
  methods:{
    ...mapMutations(['changeAvatar']),
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    fileChange(){
      let file = this.$refs.file.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload=()=>{
        this.$refs.img.src=reader.result
      }
    },
    selectImg(){
      this.$refs.file.click()
    },
    async upload(){
      if(this.$refs.file.files.length<=0) return this.$toast('请选择图片')
      let formData = new FormData()
      formData.append("avatar",this.$refs.file.files[0])
      const {errcode,data} = await uploadavator(formData)
      if(errcode !== 0) return this.$toast("上传失败")
      this.changeAvatar(data.avatar)
      this.$router.replace("/me")
    }
  },
  created() {
    if(sessionStorage.getItem('token')){
      this.isLogin = false
      this.baseImgUrl=baseImg
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  .van-button{
    width: 100%;
  }
}
.showimg{
  width: 100%;
  height: calc(100vh - 134px);
  background-color: #f8f8f8;
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 200px;
    right: 0;
    margin: auto;
  }
}
</style>