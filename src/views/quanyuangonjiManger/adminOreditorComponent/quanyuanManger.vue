<template>
    <div class="quanyuanMangerAdmin">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="券源供给" name="first">
                 <gonji-com></gonji-com>
              </el-tab-pane>
              <el-tab-pane label="券源需求" name="second">
                  <xuqiu-com></xuqiu-com>
              </el-tab-pane>
         </el-tabs>
    </div>
</template>

<script>
 import gonjiCom from './coomComponent/gonjiCom'
 import xuqiuCom from './coomComponent/xuqiuCom'

export default {
    components:{
        gonjiCom,
        xuqiuCom
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
