<template>
    <div>
        <div style="marginBottom:10px">
          <el-button type="danger" plain size="mini" :disabled = 'btnstatus[index]'  @click="optionFn(item)" v-for="(item,index) in btnOption" :key='index'>{{item|showBtnText}}</el-button>
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
             prop="supplyId"
             label="券源供给编号"
             width="100">
           </el-table-column>
            
           <el-table-column
             prop="userId"
             label="用户编号"
             width="150">
           </el-table-column>

            <el-table-column
             prop="enteName"
             label="真实姓名/企业名称"
             width="100">
           </el-table-column>
            <el-table-column
             prop="customerManagerName"
             label="客户经理"
             width="100">
           </el-table-column>
           <el-table-column
             prop=""
             label="用户类型/待确认"
             width="100">
           </el-table-column>
            <el-table-column
             prop="stockCode"
             label="证券代码"
             width="100">
           </el-table-column>

           <el-table-column
             prop="stockName"
             label="证券名称"
             width="100">
           </el-table-column>

            <el-table-column
             prop="borrowDays"
             label="借入天数"
             width="100">
           </el-table-column>

           <el-table-column
             prop="borrowableQuantity"
             label="借入数量"
             width="100">
           </el-table-column>

            <el-table-column
             prop="borrowRate"
             label="借入利率"
             width="100">
           </el-table-column>

             <el-table-column
             prop="matchStatusName"
             label="撮合状态"
             width="100">
           </el-table-column>

           <el-table-column
             prop="approveStatusName"
             label="审核状态"
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
     <review-diolog ref = 'reviewDialog' :seletedItem = 'seletedItem' @refresh = 'refresh' :isAdminOrManger='roles[0]'></review-diolog>
     <detail-dialog ref = 'detailDialog' :seletedItem = 'seletedItem'></detail-dialog>
    </div>
</template>


<script>
import reviewDiolog from './reviewDialog'
import detailDialog from './detailDialog'
import { constants } from 'crypto';


export default {
    components:{
      reviewDiolog,
      detailDialog
    },
    props:{
      queryParams:{
        type:Object,
        required:true,
        default:{},
      },
      roles:{
        type:Array,
        required:true,
      }
    },
    watch: {
       seletedItem:{
           handler: function (val, oldVal) {
             this.isDisableBtn(val)
           },
         deep: true
       },
    },
    computed:{
      btnOption(item){
        if(this.roles[0] == 'admin'){
          return ['review','cuiban','detail']
        }else if(this.roles[0] == 'manger'){
          return ['approval']
        }
      }
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
        if(this.roles[0] == 'admin'){
           this.queryParams.pageSize =  5
           this.queryParams.currPage = 1
           this.queryParams.keyWord = ''
           this.queryParams.createDtBegin = ''
           this.queryParams.createDtEnd = ''
           this.queryParams.approveStatus = ''
           this.queryParams.approveTimeBegin = ''
           this.queryParams.approveTimeEnd = ''
           this.getTableList()
        }else if(this.roles[0] == 'manger'){
           this.queryParams.pageSize =  5
           this.queryParams.currPage = 1
           this.queryParams.keyWord = ''
           this.queryParams.createDtBegin = ''
           this.queryParams.createDtEnd = ''
           this.queryParams.approveStatus = ''
           this.getTableList() 
        }
        

      },
      getTableList(){
             this.$store.dispatch(this.roles[0] == 'admin'?'quanyuanAuditManger/stockSupplyToReviewList':'quanyuanAuditManger/stockSupplyToApproveList',this.queryParams).then(res => { 
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
         if(value == 'approval'){
           this.$refs.reviewDialog.isShowDialog()
         }
         if(value == 'review'){
           this.$refs.reviewDialog.isShowDialog()
           return
         }
          if(value == 'cuiban'){
             let data = [] 
            this.seletedItem.forEach(item => {
              let obj = {}
              obj.customerManager = item.customerManager
              obj.id =  item.supplyId
              data.push(obj)
            })
            this.$store.dispatch('quanyuanAuditManger/stockSupplyRemindApprove',data).then(res => {
                if(res.status == '0'){
                     this.$message({
                        message: '提醒'+res.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '提醒'+res.msg,
                        type: 'error'
                    });
                }
            })
           return
         }
          if(value == 'detail'){
            this.$refs.detailDialog.isShowDialog() 
           return
         }
        
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
            this.$set(this.btnstatus,0,true)
            return
          }
          if(selected.length == 0){
              for(let i = 0;i < this.btnstatus.length;++i){
                this.$set(this.btnstatus,i,true)
              }
          }
      }, 
      deleteFn(){},
      cancelFn(){},
      setTopFn(){},        
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

