<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="券源供给配对" name="first">
                 <gonji-pairing></gonji-pairing>
             </el-tab-pane>
             <el-tab-pane label="券源需求配对" name="second">
                 <xuqiu-pairing></xuqiu-pairing>
             </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import xuqiuPairing from './xuqiuPairing'
import gonjiPairing from './gonjiPairing'

export default {
    components:{
        xuqiuPairing,
        gonjiPairing
    },
    data () {
        return {
            activeName:'first'
        }
    },
    methods: {
        handleClick(){}
    }
}
</script>

