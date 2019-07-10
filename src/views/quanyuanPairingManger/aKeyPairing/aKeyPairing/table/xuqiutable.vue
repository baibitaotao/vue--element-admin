<template>
    <div>
        <div style="marginBottom:10px">
          <el-button type="danger" plain size="mini" :disabled = 'btnstatus[index]'  @click="optionFn(item)" v-for="(item,index) in comBtn" :key='index'>{{item.name}}</el-button>
        </div>
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
             prop="demandId"
             label="需求Id"
             width="100">
           </el-table-column>
            
           <el-table-column
             prop="supplyId"
             label="供给ID"
             width="150">
           </el-table-column>

            <el-table-column
             prop="stockSupplyUserOrCompanyName"
             label="用户或企业名称"
             width="100">
           </el-table-column>
            <el-table-column
             prop="stockSupplyUserManager"
             label="客户经理"
             width="100">
           </el-table-column>
           <el-table-column
             prop="stockName"
             label="券源名"
             width="100">
           </el-table-column>
            <el-table-column
             prop="stockCode"
             label="证券代码"
             width="100">
           </el-table-column>

           <el-table-column
             prop="rateValue"
             label="偏差利率值"
             width="100">
           </el-table-column>

            <el-table-column
             prop="quantityValue"
             label="偏差数量值"
             width="100">
           </el-table-column>

           <el-table-column
             prop="lendRate"
             label="借出利率"
             width="100">
           </el-table-column>

            <el-table-column
             prop="lendDays"
             label="借出天数"
             width="100">
           </el-table-column>

             <el-table-column
             prop="lendAbleQuantity"
             label="借出数量"
             width="100">
           </el-table-column>

           <el-table-column
             prop="daysValue"
             label="偏差天数值"
             width="100">
           </el-table-column>

           <el-table-column
             prop="statusName"
             label="券源状态"
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
          <manual-matching-dialog ref = 'manualMatchingDialog' :tableSeletedItem = 'seletedItem' @refresh = 'refresh' activeName = 'xuqiu'></manual-matching-dialog>
    </div>
</template>


<script>
// import reviewDiolog from './reviewDialog'
// import detailDialog from './detailDialog'

import {mapGetters} from 'vuex'
import manualMatchingDialog from '../dialog/manualMatchingDialog'

export default {
    mounted () {
      this.setNewArr()
    },

    components:{
      // reviewDiolog,
      manualMatchingDialog
    },
    props:{
      queryParams:{
        type:Object,
        required:true,
        default:{},
      },
    },
    watch: {
       seletedItem:{
           handler: function (val, oldVal) {
             this.isDisableBtn(val)
           },
         deep: true
       }
    },
    computed:{
      btnOption(item){
        // if(this.roles[0] == 'admin'){
        //   return ['review','cuiban','detail']
        // }else if(this.roles[0] == 'manger'){
        //   return ['approval']
        // }
      },
       ...mapGetters([
            'buttons'
        ]),
    },
    filters: {
      showBtnText(value){
        if(value == 'approval'){return '审核'}
        if(value == 'review'){return '复核'}
        if(value == 'detail'){return '详情'}
        if(value == 'cuiban'){return '催办'}
      },
  
    },
    data () {
      return {
        comBtn:[],
        btnstatus:[true,true,true,true,true],
        formLabelWidth:'120px',
        dialogFormVisible:false,
        tableData:[],
        pagination:{
          currPage:1,
          totalPage:0,
        },
        totalCount:0,
        seletedItem:[],
       
      }
    },
    methods:{
      refresh(){

          this.getTableList()
      },
      getTableList(){
             this.$store.dispatch('quanyuanPairingManger/stockReserveListMatchStockDemand',this.queryParams).then(res => { 
              if(res.status == '0'){
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
    
      optionFn(value){
          if(value.code == '10003040201'){
            this.surematch()
            return
         }
           if(value.code == "10003040202"){
           this.$refs.manualMatchingDialog.isShowDialog()
           return
         }
        
      },
      surematch(){
        if(this.seletedItem[0].statusName !== '已配对'){
                   this.$message({
                   message: '状态为已分配 不能进行操作',
                   type: 'warning'
                    });
               return
            }

           this.$confirm('确定进行分配操作?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
                }).then(() => {
                 let data =  {}
                 data.supplyId = this.seletedItem[0].supplyId
                 data.demandId = this.seletedItem[0].demandId
                 data.stockType = 'StockDemand'

                this.$store.dispatch('quanyuanPairingManger/stockMatchTradeAddMatch',data).then(res => {
                  if(res.status == '0'){
                        this.getTableList()
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                  }else{
                    this.$message({
                        type: 'success',
                        message: res.msg + '错误!'
                      });
                  }
                })    
                
              }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
           });
      },
      handleSelectionChange(value){
          this.seletedItem = value
      },
      demandHandleSelectionChange(value){
            this.seletedItem = value
      },
      handleSizeChange(value){
        this.queryParams.pageSize = value
        this.getTableList()
      },
      handleCurrentChange(value){
        this.queryParams.currPage = value
        this.getTableList()
     },
      isDisableBtn(selected){
          if(selected.length == 1){
              for(let i = 0;i < this.btnstatus.length;++i){
                this.$set(this.btnstatus,i,false)
              }
              return
          }
          if(selected.length > 1){
            for(let i = 0;i < this.btnstatus.length;++i){
                this.$set(this.btnstatus,i,false)
              }
            this.$set(this.btnstatus,3,true)
            this.$set(this.btnstatus,2,true)
            this.$set(this.btnstatus,1,true)
            this.$set(this.btnstatus,0,true)
            return
          }
          if(selected.length == 0){
              for(let i = 0;i < this.btnstatus.length;++i){
                this.$set(this.btnstatus,i,true)
              }
          }
      }, 
      setNewArr(){
        this.buttons.forEach(element => {
            this.comBtn.push(element)
        });
      }        
      },
}
</script>



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



</style>

