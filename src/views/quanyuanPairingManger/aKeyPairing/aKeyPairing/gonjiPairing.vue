<template>
    <div class="xuqiuPairing">
        <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
         </el-input>
        </div>
        <div>
            <chujie @goData = 'goData'></chujie>
        </div>
       
        <div style="display:flex"> 
            <span class="type">类型</span>
            <link-tag v-model="radio" parentId='1060'></link-tag>
        </div>
        <div style="marginTop:10px"> 
            <el-button size="mini" type="danger" >查询</el-button>
        </div>
        
        <div style="marginTop:10px;">
            <gonji-table :queryParams = 'queryParams' ref = 'gonjitable'></gonji-table>
        </div>

    </div>
</template>

<script>
 import chujie from '../../../aacoment/chujie'
 import linkTag from '../../../aacoment/linkTag/src/linkTag'
 import gonjiTable from './table/gonjitable'
 

export default {
    props:{
        deviationData:{
            type:Object,
        }
    },
    watch: {
        radio(val,oldval){
            // console.log(val)
        }   
    }, 
    data () {
        return {
            input3:'',
            radio:'',
            queryParams:{
                currPage: 1,
                pageSize: 5,
                keyWord: '',
                daysValue: '',
                quantityValue: '',
                rateValue: '',
                reserveDaysBegin: '',
                reserveDaysEnd: '',
                reserveQuantityBegin: '',
                reserveQuantityEnd: '',
                reserveRateBegin: '',
                reserveRateEnd: '',
            },     
        }
    },
    methods:{
        goData(data){
            // console.log(data)
        },
        search(){
                this.queryParams.keyWord = this.input3
                this.$refs.gonjitable.getTableList()
        },
        pairing(){
                console.log(this.queryParams)
                this.queryParams.daysValue = this.deviationData.daysValue
                this.queryParams.quantityValue = this.deviationData.quantityValue
                this.queryParams.rateValue = this.deviationData.rateValue    
                this.$refs.gonjitable.getTableList()
        }
    },
    components:{
      chujie,
      gonjiTable,
      linkTag 
    }
}
</script>

<style lang="scss" scoped>

.type{
    font-size: 12px;
    margin-right: 30px;
    transform: translateY(3px)
}


</style>
