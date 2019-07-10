<template>
    <div class="xuqiuPairing">
       <div class="piancha" style="display:flex;position:relative" >
           <div class="deviationRate">
           <div>
               <span>交易天数偏差率(%)</span>
               <el-input
                   size="mini"
                   style="width:auto;"
                   placeholder="请输入交易天数偏差率"
                   v-model="deviationData.daysValue">
               </el-input>
           </div>
           <div>
               <span>交易数量偏差率(%)</span>
               <el-input
                   style="width:auto;"
                   size="mini"
                   placeholder="请输入交易数量偏差率"
                   v-model="deviationData.quantityValue">
               </el-input></div>
           <div>
               <span>交易利率偏差率(%)</span>
               <el-input
                   size="mini"
                   style="width:auto;"
                   placeholder="请输入交易利率偏差率"
                   v-model="deviationData.rateValue">
               </el-input>
            </div>
            </div>
            <el-button style="position:absolute;top:10px;right:80px" type="danger" size="mini" @click="pairing">一键配对</el-button>
        </div>
    
        <!-- <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
         </el-input>
        </div> -->
        
        <!-- <div>
            <chujie @goData = 'goData'></chujie>
        </div>

        <div style="display:flex"> 
            <span class="type">类型</span>
            <link-tag v-model="radio" parentId='1060'></link-tag>
        </div>
        <div style="marginTop:10px"> 
            <el-button size="mini" type="danger" >查询</el-button>
        </div> -->
    
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
  
    // watch: {
    //     radio(val,oldval){
    //         // console.log(val)
    //     }   
    // }, 
    data () {
        return {
            deviationData:{
                daysValue:'',
                quantityValue:'',
                rateValue:''
            },
            // radio:'',
            queryParams:{
                currPage: 1,
                daysValue: '',
                // demandId: 6,
                // keyWord: "方正国际",
                // order: 1,
                pageSize: 5,
                quantityValue: '',
                rateValue: '',
                // reserveDaysBegin: 10,
                // reserveDaysEnd: 100,
                // reserveQuantityBegin: 10,
                // reserveQuantityEnd: 100,
                // reserveRateBegin: 10,
                // reserveRateEnd: 100,
                // sort: 1,
                // status: "",
                // statusList: [
                //   "string"
                // ],
                // supplyId: 3
                }   
        }
    },
    methods:{
        goData(data){
            
        },
        // search(){
        //         this.queryParams.keyWord = this.input3
        //         this.$refs.gonjitable.getTableList()
        // },
        pairing(){
                if(this.deviationData.daysValue !== '' || this.deviationData.quantityValue !== '' ||  this.deviationData.rateValue !== ''){
                    this.queryParams.daysValue = this.deviationData.daysValue
                    this.queryParams.quantityValue = this.deviationData.quantityValue
                    this.queryParams.rateValue = this.deviationData.rateValue    
                    this.$refs.gonjitable.getTableList()
                }else{
                     this.$message({
                         showClose: true,
                         message: '偏差值至少输入一个',
                         type: 'warning'
                        });
                }
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
.deviationRate{
    display: flex;
    margin-right: 10px;
    font-size: 14px;
    padding: 10px 0;
    >div{
        margin-right: 15px;
    }
}


</style>
