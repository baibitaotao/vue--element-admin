<template>
  <div class="header-contanier">
    <div class="img-left">
      <nav-bar />
      <!-- <span class="header-title" style="fontFamily:'DFKai-SB'">券源后台管理系统</span> -->
    </div>
    <div class="user-right">
      <img src="@/assets/layout/user-logo.png" alt="" class="user-logo" style="borderRadius:50%;">
      <span class="user-name">{{$store.state.user.name}}</span>
      <a class="loginOut" @click="loginOutFn">登出</a>
    </div>
  </div>
</template>

<script>
import navBar from '../navBar/index'
import {mapState} from 'vuex'
export default {
  components: {
    navBar
  },
  methods: {
    loginOutFn(){
      this.$store.dispatch('user/logout').then(() =>{
         location.reload() 
      })  
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}



</script>

<style lang="scss" scoped>
.header-contanier{
  width: 100%;
  height: 58px;
  background-color: #b40005;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  .img-left,.user-right{
    display: flex;
    align-items: center;
    .loginOut{
      margin-left: 10px;
      color:#000;
      font-size: 14px;
     
    }
  }
  .loginOut:hover{
    color:red;
  }
  .header-title{
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    // margin-left: 45px;
  }
  .user-name{
    font-size: 14px;
    color: #000;
    padding-left: 6px;
  }
}
</style>
