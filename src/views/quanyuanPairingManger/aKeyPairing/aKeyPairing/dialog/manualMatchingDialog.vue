<template>
<div class="manualMatching">
<el-dialog
            :title="activeName == 'gonji'?'需求列表':'供给列表'"
            :visible.sync="dialogVisible">
             <el-table 
           :data="tableData"
           border
           @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>

             <el-table-column
             prop="userId"
             label="用户id"
             width="100">
           </el-table-column>

             <el-table-column
             :prop="activeName == 'gonji'?'demandId':'supplyId'"
             :label="activeName == 'gonji'?'需求编号':'供给编号'"
             width="100">
           </el-table-column>
            

            <el-table-column
             :prop="activeName == 'gonji'?'stockDemandUserOrCompanyName':'stockSupplyUserOrCompanyName'"
             label="用户或企业名称"
             width="100">
           </el-table-column>

            <el-table-column
             :prop="activeName == 'gonji'?'stockDemandUserManager':'stockSupplyUserManager'"
             label="客户经理"
             width="100">
           </el-table-column>

             <el-table-column
             prop="rateValue"
             label="偏差利率值"
             width="100">
           </el-table-column>

           <el-table-column
             prop="quantityValue"
             label="偏差数量"
             width="100">
           </el-table-column>

            <el-table-column
             prop="daysValue"
             label="偏差天数"
             width="100">
           </el-table-column>

           <el-table-column
             :prop="activeName == 'gonji'?'borrowRate':'lendRate'"
             :label="activeName == 'gonji'?'借入利率':'借出利率'"
             width="100">
           </el-table-column>

            <el-table-column
             :prop="activeName == 'gonji'?'borrowDays':'lendDays'"
             :label="activeName == 'gonji'?'借入天数':'借出天数'"
             width="100">
           </el-table-column>

             <el-table-column
             :prop="activeName == 'gonji'?'borrowAbleQuantity':'lendAbleQuantity'"
             label="借入数量"
             width="100">
           </el-table-column>

         </el-table>

          <div style="marginBottom:30px;marginTop:20px;">
             <el-pagination
                 style="float:right;"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="pagination.currPage"
                 :page-sizes="[5, 10, 20]"
                 :page-size="5"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="pagination.totalPage">
              </el-pagination>
          </div>  



            <div slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取消</el-button>
               <el-button :disabled="isDisableBtn" type="primary" @click="confirmFn">确 定</el-button>
            </div>
</el-dialog>

</div>
     
</template> 

<script>


export default {
    props:{
      activeName:{
        type:String
      },
      tableSeletedItem:{
        type:Array,
      }

    },
    watch: {
       seletedItem:{
           handler: function (val, oldVal) {
             if(val.length >= 2 || val.length == 0){
               this.isDisableBtn = true
             }else{
               this.isDisableBtn = false
             }
           },
         deep: true
       }
    },
    data () {
        return {
            isDisableBtn:true,
            queryParams:{},
            dialogVisible:false,
            tableData:[],
            formLabelWidth:'120px',
            tableData:[],
            pagination:{
              currPage:1,
              totalPage:0,
            },
            seletedItem:[],
        } 
    },
    methods: {
      refresh(){
           this.queryParams.rateValue = ''
           this.queryParams.quantityValue = ''
           this.queryParams.daysValue = ''
           this.queryParams.pageSize = 5
           this.queryParams.currPage = 1
           this.getTableList()
      },
      getTableList(){
             if(this.activeName == 'gonji') {
               this.queryParams.supplyId = this.tableSeletedItem[0].supplyId
             }else{
               this.queryParams.demandId = this.tableSeletedItem[0].demandId
             }
             console.log(this.queryParams)
             this.$store.dispatch(this.activeName == 'gonji'?'quanyuanPairingManger/stockReserveListMatchStockDemandForSupply':'quanyuanPairingManger/stockReserveListMatchStockSupplyForDemand',this.queryParams).then(res => { 
              if(res.status == '0'){
                  console.log(res)
                 this.tableData = res.data
                 this.pagination.totalPage = res.totalCount
                 this.pagination.currPage = res.currPage
              }  
              else{
               this.$message({showClose: true,message: res.msg,type: 'error'});
              }
            }).catch((err) => {
            console.log(err)
          })
      },
      confirmFn(){
        let data =  {}
        data.supplyId = this.seletedItem[0].supplyId
        data.demandId = this.seletedItem[0].demandId
        data.stockType = 'StockSupply'
        this.$store.dispatch('quanyuanPairingManger/stockMatchTradeAddMatch',data).then(res => {
                  if(res.status == '0'){
                        this.getTableList()
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      this.$emit('refresh')
                  }else{
                    this.$message({
                        type: 'error',
                        message: res.msg + '错误!'
                      });
                  }
                  this.dialogVisible = false

                }) 
      },
      handleSelectionChange(value){
          this.seletedItem = value
      },
      handleSizeChange(value){
        console.log(value)
        console.log('触发')
        this.queryParams.pageSize = value
        this.getTableList()
      },
      handleCurrentChange(value){
        this.queryParams.currPage = value
        this.getTableList()
     },
       isShowDialog(){
         this.dialogVisible = true
         this.refresh()
        }, 
    }

}
</script>


<style lang="scss">

  .manualMatching{
    .el-dialog__header{
        text-align: center;
        background:rgba(180,45,40,1);
        border-radius:4px;
        >span{
          color: #fff;
        }
        >button{
          >i{
               color: #ffffff;
          }
        }
    }
    .el-dialog{
    width: 57%;
    }
  .el-row{
    border-bottom: 1px solid #ddd
    }
    
}


</style>



<style lang="scss" scoped>

.show_ditals{
  display: flex;
  border:1px solid #ccc;
  :nth-child(odd){
    padding-left: 5px;
    background-color: rgba(180,0,5,0.5);
  }
  :nth-child(even){
    padding-left: 10px;
  }
  >div{
    padding: 20px 0;

    flex:1;
  }
}

.bannerDetail{
.title{
    width:82px;
    height:21px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:53px;
    margin-bottom: 10px;
    position: relative;
    .leftRed{
        position: absolute;
        left:-10px;
        top:5px;
        width: 3px;
        height: 17px;
        background:rgba(180,45,40,1);
    }
}

}

.show_ditals{
  display: flex;
  border-top: 1px solid #DDDDDD;

  >div{
    line-height: 100%;
    padding: 17px 0;
  }

  :nth-child(odd){
  padding-right: 20px;
  background-color:rgba(248,248,249,1);
  width:100px;
  text-align: right
} 

  :nth-child(even){
  background-color:rgba(255,255,255,1);
  text-align: right;
  padding-left:10px;
} 



}








// .show_ditals{
//   display: flex;
//   border:1px solid #ccc;
//   :nth-child(odd){
//     padding-left: 5px;
//     background-color:rgba(255,255,255,1);
//   }
//   :nth-child(even){
//     padding-left: 10px;
//     transform: translateX(-1px)
//   }
//   >div{
//     padding: 20px 0;

//     flex:1;
//   }
// }
</style>
