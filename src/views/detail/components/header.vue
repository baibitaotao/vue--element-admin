<template>
  <div class="header-main">
    <div class="header-left">
      <div class="top">
        <img src="@/assets/layout/card-img.png" alt="">
        <span class="name">金融有限公司</span>
        <span class="title">在业</span>
        <span class="title">52698745632102</span>
        <span class="title">58美元</span>
      </div>
      <p>所属平台：元和直投 <i class="el-icon-d-arrow-right" />   金融有限公司</p>
    </div>
    <div class="header-right">
      <img src="@/assets/layout/code.png" alt="">
      <p>A01015</p>
    </div>
  </div>
</template>

<style lang="scss">
.header-main{
  display: flex;
  justify-content: space-between;
  padding: 0px 21px 0 21px;
  height: 93px;
  background-color: #fff;
  margin-bottom: 15px;
  align-items: center;
  .header-left{
    .top{
      display: flex;
      align-items: center;
      padding-bottom: 17px;
      .name{
        font-size: 24px;
        color: #b40005;
        padding:0 12px 0 9px;
      }
      .title{
        text-align: center;
        padding: 5px 9px;
        color: #666;
        font-size: 14px;
        border: 1px solid #666;
        border-radius: 4px;
        &+.title{
          margin-left:11px;
        }
      }
    }
    .p{
      color: #666;
      font-size: 14px;
    }
  }
  .header-right{
    text-align: center;
    padding-right: 24px;
    p{
      font-size: 14px;
      color: #666;
      padding-top: 5px;
    }
  }
}
</style>

