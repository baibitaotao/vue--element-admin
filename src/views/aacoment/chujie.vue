<template>
     <div style="display:flex;" class="chujie">

          <div style="display:flex;marginRight:20px">
            <span style="marginLeft:0">出借天数范围</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.reserveDaysBegin"></textarea>
            <span>-</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.reserveDaysEnd"></textarea>
          </div>

          <div style="display:flex;marginRight:10px">
            <span>出借数量范围</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.reserveQuantityBegin"></textarea>
            <span>-</span> 
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.reserveQuantityEnd"></textarea>
          </div>

          <div style="display:flex;marginRight:10px">
            <span>出借利率范围</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.reserveRateBegin"></textarea>
            <span>-</span> 
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.reserveRateEnd"></textarea>
          </div>

       </div>
</template>


<script>
export default {
  data () {
    return {
      queryData:{
          reserveDaysBegin:'',
          reserveDaysEnd:'',
          reserveQuantityBegin:'',
          reserveQuantityEnd:'',
          reserveRateBegin:'',
          reserveRateEnd:''
      }, 
    }
  },
}
</script>
