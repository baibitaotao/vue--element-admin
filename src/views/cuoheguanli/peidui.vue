<template>
    <div class="cuoheguanli">
          <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="券源供给配对" name="first">
                 <coom-component></coom-component>
             </el-tab-pane>
             <el-tab-pane label="券源需求配对" name="second">
                 <coom-component></coom-component>
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
            activeName:'first',
        }
    },
    methods:{
        handleClick(){}
    }

}
</script>

