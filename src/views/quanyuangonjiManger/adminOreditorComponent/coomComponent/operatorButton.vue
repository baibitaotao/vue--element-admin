<template>
    <div>
        <a style="marginRight:5px;color:#2196F3" v-for="(item,index) in whichOption" :key="index" @click="delFn(item)">{{item}}</a>
    </div>
</template>


<script>
export default {
    computed:{
        whichOption(){
            if(this.approveStatus == '01'){
                return ['详情','删除','更改信息','取消发布','置顶']
            }
            else {
                return ['详情','删除','置顶']
            }
        }
    },
    props:{
        approveStatus:{
            type: String,
            required: true
        }
    },
    methods: {
        delFn(value){
            console.log(value)
        }
    }
}
</script>

