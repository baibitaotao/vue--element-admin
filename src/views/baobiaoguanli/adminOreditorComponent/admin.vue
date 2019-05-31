<template>
    <div class="quanyuanMangerAdmin">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="券源成交查询统计" name="first">
                 <coom-component :whitchActive = 'activeName'></coom-component> 
              </el-tab-pane>
              <el-tab-pane label="券源供给查询统计" name="second">
                  <coom-component :whitchActive = 'activeName'></coom-component>
              </el-tab-pane>
              <el-tab-pane label="券源需求查询统计" name="three">
                  <coom-component :whitchActive = 'activeName'></coom-component>
              </el-tab-pane>
              <el-tab-pane label="融出方查询" name="four">
                  <coom-component :whitchActive = 'activeName'></coom-component>
              </el-tab-pane>
              <el-tab-pane label="融入方查询" name="five">
                  <coom-component :whitchActive = 'activeName'></coom-component>
              </el-tab-pane>
              <el-tab-pane label="券源预约查询统计" name="six">
                  <coom-component :whitchActive = 'activeName'></coom-component>
              </el-tab-pane>
              <el-tab-pane label="客户经理查询统计" name="seven">
                  <coom-component :whitchActive = 'activeName'></coom-component>
              </el-tab-pane>
         </el-tabs>
    </div>
</template>

<script>
 import coomComponent from './coomComponent/index'
export default {
    components:{
        coomComponent,
    },
    data () {
        return {
           activeName:'first' 
        }
    },
    methods: {
      handleClick(){
          
      }  
    }
}
</script>
