<template>
    <div class="quanyuanMangerAdmin">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="券源供给" name="supply" ref="supplyPane">
                 <supply-com :whitchActive = 'activeName' ref="supply"></supply-com>
              </el-tab-pane>
              <el-tab-pane label="券源需求" name="demand">
                  <demand-com :whitchActive = 'activeName' ref="demand"></demand-com>
              </el-tab-pane>
         </el-tabs>
    </div>
</template>

<script>
 import supplyCom from './coomComponent/gonjiCom'
 import demandCom from './coomComponent/xuqiuCom'

export default {
    components:{
        supplyCom,
        demandCom
    },
    data () {
        return {
           activeName:'supply' 
        }
    },
    methods: {
      handleClick(){
          if(this.activeName == 'supply'){
            this.$refs.supply.refresh()
          }
          else if(this.activeName == 'demand'){
            this.$refs.demand.refresh()  
          }
      }  
    }
}
</script>
