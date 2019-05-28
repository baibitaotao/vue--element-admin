<template>
    <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="券源供给" name="first">

              </el-tab-pane>
              <el-tab-pane label="券源需求" name="second">

              </el-tab-pane>
         </el-tabs>
    </div>
</template>

<script>
export default {
    data () {
        return {
           activeName:'券源供给' 
        }
    },
    methods: {
      handleClick(){
          
      }  
    }
}
</script>
