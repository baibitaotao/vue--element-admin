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
        <div>
            <xuqiu-table :queryParams='queryParams' ref = 'xuqiuTable'></xuqiu-table>
        </div>

    </div>
</template>

<script>
 import chujie from '../../../aacoment/chujie'
 import xuqiuTable from './table/xuqiutable'
 

export default {
    data () {
        return {
            deviationData:{
                daysValue:"",
                quantityValue:'',
                rateValue:''
            },
            input3:'',
            radio:'',
            queryParams:{
                 currPage: 1,
                 daysValue: '',
                 pageSize: 5,
                 quantityValue: '',
                 rateValue: '',
            },           
        }
    },
    components:{
      chujie,
      xuqiuTable 
    },
    methods: {
         pairing(){
                if(this.deviationData.daysValue !== '' || this.deviationData.quantityValue !== '' ||  this.deviationData.rateValue !== ''){
                    this.queryParams.daysValue = this.deviationData.daysValue
                    this.queryParams.quantityValue = this.deviationData.quantityValue
                    this.queryParams.rateValue = this.deviationData.rateValue    
                    this.$refs.xuqiuTable.getTableList()
                }else{
                     this.$message({
                         showClose: true,
                         message: '偏差值至少输入一个',
                         type: 'warning'
                        });
                }
        }

    }
}
</script>

<style lang="scss" scoped>

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
