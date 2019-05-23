<template>
  <div class="header-contanier">
    <div class="img-left">
      <nav-bar />
      <span class="header-title">项目管理</span>
    </div>
    <div class="user-right">
      <img src="@/assets/layout/user-logo.png" alt="" class="user-logo">
      <span class="user-name">{{$store.state.user.name}}</span>
    </div>
  </div>
</template>

<script>
import navBar from '../navBar/index'
export default {
  components: {
    navBar
  }
}
</script>

<style lang="scss" scoped>
.header-contanier{
  width: 100%;
  height: 58px;
  // line-height: 58px;
  background-color: #b40005;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  .img-left,.user-right{
    display: flex;
    align-items: center;
  }
  .header-title{
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    // margin-left: 45px;
  }
  .user-name{
    font-size: 14px;
    color: #fff;
    padding-left: 6px;
  }
}
</style>
