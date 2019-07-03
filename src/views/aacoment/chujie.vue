<template>
     <div style="display:flex;" class="chujie">

          <div style="display:flex;marginRight:20px">
            <span style="marginLeft:0">出借天数范围</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.DaysBegin"></textarea>
            <span>-</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.DaysEnd"></textarea>
          </div>

          <div style="display:flex;marginRight:10px">
            <span>出借数量范围</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.QuantityBegin"></textarea>
            <span>-</span> 
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.QuantityEnd"></textarea>
          </div>

          <div style="display:flex;marginRight:10px">
            <span>出借利率范围</span>
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.RateBegin"></textarea>
            <span>-</span> 
            <textarea name="" id="" cols="8" rows="1" v-model="queryData.RateEnd"></textarea>
          </div>

       </div>
</template>


<script>
export default {
  watch: {
    queryData:{
      handler(val,oldval){
        this.$emit('goData',val)
      },
      deep:true
    }
  },
  data () {
    return {
      queryData:{
          DaysBegin:'',
          DaysEnd:'',
          QuantityBegin:'',
          QuantityEnd:'',
          RateBegin:'',
          RateEnd:''
      }, 
    }
  },
}
</script>
