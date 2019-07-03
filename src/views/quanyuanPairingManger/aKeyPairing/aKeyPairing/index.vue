<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="券源供给配对" name="gonji">
                 <gonji-pairing ref = 'gonjiPairing' :deviationData = 'deviationData'></gonji-pairing>
             </el-tab-pane>
             <el-tab-pane label="券源需求配对" name="xuqiu">
                 <xuqiu-pairing></xuqiu-pairing>
             </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import xuqiuPairing from './xuqiuPairing'
import gonjiPairing from './gonjiPairing'

export default {
    props:{
        deviationData:{
            type:Object
        }
    },
    components:{
        xuqiuPairing,
        gonjiPairing
    },
    data () {
        return {
            activeName:'gonji'
        }
    },
    methods: {
        handleClick(){},
        pairing(){
            this.$refs.gonjiPairing.pairing()
        }
    }
}
</script>

