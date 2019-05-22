<template>
  <div v-if="column.length>0" class="card-box">
    <div class="box-inner">
      <h2>
        <img src="@/assets/layout/card-img.png" alt="">
        <span class="t1">{{ data[column[0].name] }}</span>
        <span class="margin-h">|</span>
        <span class="t2">{{ data[column[0].name1] }}</span>
      </h2>
      <el-row class="content">
        <el-col :span="8"><div class="grid">
          <ul v-for="(item,index) in column[1].column.column1" :key="index">
            <li>
              <span>{{ item.label }}</span>
              <span>{{ data[item.value] }}</span>
            </li>
          </ul>
        </div></el-col>
        <el-col :span="8"><div class="grid">
          <ul v-for="(item,index) in column[1].column.column2" :key="index">
            <li>
              <span>{{ item.label }}</span>
              <span>{{ data[item.value] }}</span>
            </li>
          </ul>
        </div></el-col>
        <el-col :span="8"><div class="grid">
          <ul v-for="(item,index) in column[1].column.column3" :key="index">
            <li>
              <span>{{ item.label }}</span>
              <span>{{ data[item.value] }}</span>
            </li>
          </ul>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-img">
          <img src="@/assets/layout/steps.png" alt="">
        </div></el-col>
      </el-row>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardRow',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    column: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.card-box{
  background-color: #fff;
  .box-inner{

  }
  h2{
    margin: 0;
    height: 32px;
    display: flex;
    align-items: center;
    color: #3d3d3d;
    img{
      width: 32px;
      height: 32px;
      border-radius: 4px;
      margin-right: 10px;
    }
    .margin-h{
      padding: 0 9px 5px 9px;
    }
    .t1{
      font-size: 18px;
    }
    .t2{
      font-size: 14px;
    }
  }
  .content{
    padding: 21px 0 15px 10px;
    ul{
      padding: 0;
      margin: 0;
      li{
        list-style: none;
        font-size: 14px;
        display: flex;
        &+li{
          padding-top: 7px;
        }
        span{
          &:nth-child(1){
            color: #999;
            width: 90px;
            text-align: right;
          }
          &:nth-child(2){
            color: #333;
            padding-left: 18px;
          }
        }
      }
    }
  }
}
</style>

