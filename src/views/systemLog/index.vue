<template>
    <div class="systemLog">
         <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="登录日志" name="first">
               <login-log></login-log>
           </el-tab-pane>
           <el-tab-pane label="操作日志" name="second">
               <operator-log></operator-log>
           </el-tab-pane>
         </el-tabs>
    </div>
</template>


<script>

import loginLog from './loginLog'
import operatorLog from './operatorLog'

export default {
    components:{
        loginLog,
        operatorLog
    },
    data () {
        return {
            activeName:'first'
        }
    },
    methods:{
        handleClick(){
            
        }
    }
}
</script>

