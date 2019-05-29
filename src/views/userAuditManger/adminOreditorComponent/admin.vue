<template>
    <div class="quanyuanMangerAdmin">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="待审核" name="first">
                 <coom-component :whitchActive = 'activeName'></coom-component> 
              </el-tab-pane>
              <el-tab-pane label="已审核" name="second">
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
