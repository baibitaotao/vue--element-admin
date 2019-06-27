<template>
    <div class="xuqiuPairing">
        <h6>预约撮合管理</h6>
        <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
         </el-input>
        </div>
       
        <div>
            <chujie ref='chjie'></chujie>
        </div>
          <div style="width:400px;margin:10px 0" class="userType">
             <span style="fontSize:12px;width: 100px;marginRight:29px;">券源类型</span>
             <el-radio-group v-model="radio2" size="mini">
               <el-radio-button label="全部" ></el-radio-button>
               <el-radio-button label="供给"></el-radio-button>
               <el-radio-button label="需求"></el-radio-button>
             </el-radio-group>
             <el-button type="danger" plain size="mini" style="transform:translate(10px,-3px)" @click="queryTableData">查询</el-button>
         </div>
        <div>
            <pairing-table :needdata = 'needdata' ref = 'pairingTable' :whoId='whoId'></pairing-table>
        </div>

    </div>
</template>

<script>
 import chujie from '../../../aacoment/chujie'
 import pairingTable from './table/table'
 

export default {
   mounted () {
     this.$refs.pairingTable.refresh()
    } ,
   watch: {
     radio2(val,oldVal){
         if(val == '全部'){
            return this.needdata.conditionOfTransmission.reserveTypes = '1,2'   
         }
           if(val == '供给'){
            return this.needdata.conditionOfTransmission.reserveTypes = '1'
         }
           if(val == '需求'){
            return this.needdata.conditionOfTransmission.reserveTypes = '2'
         }

     }  
   }, 
    data () {
        return {
            input3:'',
            whoId:'',
            radio2:'全部',
            needdata:{
                conditionOfTransmission:{
                    currPage: 1,
                    keyWord: "",
                    order: 1,
                    pageSize: 5,
                    reserveDaysBegin: '',
                    reserveDaysEnd: '',
                    reserveQuantityBegin: '',
                    reserveQuantityEnd: '',
                    reserveRateBegin: '',
                    reserveRateEnd: '',
                    reserveTypes: '1',
                    sort: 1
                }, 
            },
        }
    },
    components:{
      chujie,
      pairingTable,
    },
    methods: {
        showStockSupplyDialog(changeItem){
        this.whichClick.name = 'stockChange'
        this.$refs.Dialog.showDialog(changeItem)
      },
      search(){
          this.needdata.conditionOfTransmission.keyWord = this.input3
          this.$refs.pairingTable.getTableList()
      },
      queryTableData(){
          this.needdata.conditionOfTransmission.reserveDaysBegin = this.$refs.chjie.queryData.reserveDaysBegin
          this.needdata.conditionOfTransmission.reserveDaysEnd = this.$refs.chjie.queryData.reserveDaysEnd
          this.needdata.conditionOfTransmission.reserveQuantityBegin = this.$refs.chjie.queryData.reserveQuantityBegin
          this.needdata.conditionOfTransmission.reserveQuantityEnd = this.$refs.chjie.queryData.reserveQuantityEnd
          this.needdata.conditionOfTransmission.reserveRateBegin = this.$refs.chjie.queryData.reserveRateBegin
          this.needdata.conditionOfTransmission.reserveRateEnd = this.$refs.chjie.queryData.reserveRateEnd
          this.$refs.pairingTable.getTableList() 
      }
    }
}
</script>


<style lang="scss" scoped>

h6{
   padding: 10px 0;
   transform: translateY()
}


</style>

