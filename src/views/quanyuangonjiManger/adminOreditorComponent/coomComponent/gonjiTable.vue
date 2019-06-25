<template>
    <div>
      <!-- <span>{{whitchActive}}</span> -->
        <div style="marginBottom:10px">
          <el-button  size="mini" :disabled = 'btnstatus[index]'  @click="optionFn(item)" v-for="(item,index) in btnOption" :key='index'>{{item|showBtnText}}</el-button>
        </div>
        <el-table 
            v-show = 'isShowSupplyOrDemand'
           :data="tableData.data"
           border
           @selection-change="handleSelectionChange"
           style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
           <el-table-column
             prop="supplyId"
             label="券源供给编号"
             width="110">
           </el-table-column>

           <el-table-column
             prop="userId"
             label="用户编号"
             width="100">
           </el-table-column>

           <el-table-column
             prop="enteName"
             label="企业名称"
             width="100">
           </el-table-column>
           
           <el-table-column
             prop="customerManagerName"
             label="所属客户经理"
             width="110">
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
             prop="lendDays"
             label="出借天数"
             width="100">
           </el-table-column>
            <el-table-column
             prop="lendQuantity"
             label="出借数量"
             width="100">
           </el-table-column>
            <el-table-column
             prop="lendRate"
             label="出借利率"
             width="100">
           </el-table-column>
            <el-table-column
             prop="reserveExpireDate"
             label="预约截止日期"
             width="110">
           </el-table-column>
            <el-table-column
             label="审核状态"
             width="100">
              <template slot-scope="scope">
                   {{scope.row.approveStatus | whichStatus}}
              </template>
           </el-table-column>
            <el-table-column
             label="撮合状态"
             width="100">
              <template slot-scope="scope">
                   {{scope.row.matchStatus | whichCuoheStatus}}
              </template>
           </el-table-column>
         </el-table>

        <el-table 
           v-show = '!isShowSupplyOrDemand'
          :data="demandTableData.data"
          border
          @selection-change="demandHandleSelectionChange"
          style="width: 100%">
           <el-table-column
             type="selection"
             width="55">
           </el-table-column>
          <el-table-column
            prop="demandId"
            label="券源需求编号"
            width="110">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="enteName"
            label="企业名称"
            width="100">
          </el-table-column>
          
          <el-table-column
            prop="customerManagerName"
            label="所属客户经理"
            width="110">
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
            prop="reserveExpireDate"
            label="预约截止日期"
            width="110">
          </el-table-column>
           <el-table-column
            label="审核状态"
            width="100">
             <template slot-scope="scope">
                  {{scope.row.approveStatus | whichStatus}}
             </template>
          </el-table-column>
           <el-table-column
            label="撮合状态"
            width="100">
             <template slot-scope="scope">
                  {{scope.row.matchStatus | whichCuoheStatus}}
             </template>
          </el-table-column>
        </el-table>  


          <div style="marginBottom:30px;marginTop:20px;">
             <el-pagination
                 style="float:right;"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="isShowSupplyOrDemand?this.conditionOfTransmission.currPage:this.demandConditionOfTransmission.currPage"
                 :page-sizes="[5, 10, 20]"
                 :page-size="5"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="isShowSupplyOrDemand?tableData.totalCount:demandTableData.totalCount">
              </el-pagination>
          </div>

        
        
        <div class="detail_dialog">
          <el-dialog :title="isShowSupplyOrDemand?'已发布券源供给信息':'已发布券源需求信息'" :visible.sync="dialogFormVisible">
            <h6 style="paddingBottom:20px;">基本信息</h6>
             <el-row>
                   <el-col :span="10" v-for="(item,key,index) in detailsData" :key="index">
                     <div class="show_ditals" >
                       <div>{{key|detailsText}}</div>
                       <div>{{item}}</div>
                      </div>
                   </el-col>
             </el-row>
             <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
             </div>
          </el-dialog>
        </div> 

    </div>
</template>


<script>
import { constants } from 'crypto';

export default {
    computed:{
      isShowSupplyOrDemand(){
        if(this.whitchActive == 'supply'){return true}
        else if(this.whitchActive == 'demand'){return false}
      },
        
    },
    props:{
      conditionOfTransmission:{
        type:Object,
        require:true
      },
      demandConditionOfTransmission:{
        type:Object,
        require:true
      },
      whitchActive:{
        type:String,
        require:true
      }
    },
    watch: {
       conditionOfTransmission:{
         handler: function (val, oldVal) {
           this.getStockSupplyList()
           },
         deep: true
       },
       demandConditionOfTransmission:{
           handler: function (val, oldVal) {
           this.getStockDemandList()
           },
         deep: true
       },
       seletedItem:{
           handler: function (val, oldVal) {
             this.isDisableBtn(val)
           },
         deep: true
       },
    },
    filters: {
      whichStatus(value){
        if(value == '01'){
            return '待提交'
        }
         if(value == '02'){
            return '待审核'
        }
         if(value == '03'){
            return '待复核'
        }
         if(value == '04'){
            return '复核通过'
        }
      },
      whichCuoheStatus(value){
         if(value == '01'){
            return '待撮合'
        }
         if(value == '02'){
            return '撮合中'
        }
         if(value == '03'){
            return '部分撮合成功'
        }
         if(value == '04'){
            return '全部撮合成功'
        }
      },
      showBtnText(value){
        if(value == 'details'){
         return '详情'
        }
         if(value == 'delete'){
         return '删除'
        }
         if(value == 'change'){
         return '修改'
        }
         if(value == 'cancel'){
         return '暂停预约'
        }
        if(value == 'setTop'){
         return '置顶'
        }
      },
      detailsText(value){
         switch (value) {
           case 'demandId':
              return '券源需求编号'
            case 'supplyId':
              return '券源供给编号'
            case 'userId':
              return '用户编号'
             case 'enteName':
                return "真实姓名/企业名称";
             case 'customerManagerName':
                return "所属客户经理";
             case 'stockCode':
                return"证券代码";
            case 'stockName':
                return "证券名称";
            case 'lendDays':
               return"出借天数";
            case 'borrowDays':
               return"借入天数";
            case 'borrowRate':
               return"借入利率";
            case 'borrowableQuantity':
               return"借入数量";         
            case 'lendQuantity':
                return "出借数量";
            case 'lendRate':
                return "出借利率";
            case 'reserveExpireDate':
                return "预约截止日期";
            case 'fenzhijigou':
                return "所属分支机构";
            case 'publishTime':
                return "发布时间";
            case 'approveStatusName':
                return "状态";
            case 'remark':
                return "备注";
        }
      }
    },
    data () {
      return {
        btnOption:['details','delete','change','cancel','setTop'],
        btnstatus:[true,true,true,true,true],
        formLabelWidth:'120px',
        dialogFormVisible:false,
        tableData:{},
        demandTableData:{},
        seletedItem:[],
        detailsData:{}      
      }
    },
    methods:{
      getStockSupplyList(){
          this.$store.dispatch('quanyuangonjiManger/getStockSupplyList',this.conditionOfTransmission).then(res => { 
              if(res.status == '0'){
                 this.tableData = res
              }  
              else{
               this.$message({showClose: true,message: res.msg,type: 'error'});
              }
         
         
         }).catch((err) => {
            console.log(err)
          })
      },
      getStockDemandList(){
            this.$store.dispatch('quanyuangonjiManger/getStockDemandList',this.demandConditionOfTransmission).then(res => { 
              if(res.status == '0'){
                 this.demandTableData = res
              } else{
               this.$message({showClose: true,message: res.msg,type: 'error'});
               return
              }
          }).catch((err) => {
            console.log(err)
          })
      },
      optionFn(value){
         if(value == 'details'){
           if(this.whitchActive == 'supply'){
              this.detailsFn(this.seletedItem[0].supplyId)
           }
           else if(this.whitchActive == 'demand'){
              this.detailsFn(this.seletedItem[0].demandId)
           }
          
           return
         }
         if(value == 'delete'){
          
          return
         }
         if(value == 'change'){
          this.changeFn(this.seletedItem[0])
           return
         }
         if(value == 'cancel'){
           
           return
         }
         if(value == 'setTop'){
           
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
          if(this.whitchActive == 'supply'){
           this.conditionOfTransmission.pageSize = value
           return
          }
          if(this.whitchActive == 'demand'){
             this.demandConditionOfTransmission.pageSize = value
             return
          }
      },
      handleCurrentChange(value){
          if(this.whitchActive == 'supply'){
             this.conditionOfTransmission.currPage = value
             this.currentPage4 = value
             return
          }
          if(this.whitchActive == 'demand'){
             this.demandConditionOfTransmission.currPage = value
             this.currentPage4 = value
             return
          }
         
      },
      demandHandleCurrentChange(){},
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
            this.$set(this.btnstatus,0,true)
            this.$set(this.btnstatus,2,true)
            return
          }
          if(selected.length == 0){
              for(let i = 0;i < this.btnstatus.length;++i){
                this.$set(this.btnstatus,i,true)
              }
          }
      }, 
      detailsFn(value){
          if(this.whitchActive == 'supply'){
               this.$store.dispatch('quanyuangonjiManger/stockSupplyInfo',value).then(res => {
               this.dialogFormVisible = true
               this.detailsData.supplyId = res.data.supplyId
               this.detailsData.userId = res.data.userId
               this.detailsData.enteName = res.data.enteName
               this.detailsData.customerManagerName = res.data.customerManagerName
               this.detailsData.stockCode = res.data.stockCode
               this.detailsData.stockName = res.data.stockName
               this.detailsData.lendDays = res.data.lendDays
               this.detailsData.lendQuantity = res.data.lendQuantity
               this.detailsData.lendRate = res.data.lendRate
               this.detailsData.reserveExpireDate = res.data.reserveExpireDate
               this.detailsData.fenzhijigou = '我是分支机构'
               this.detailsData.publishTime = res.data.publishTime
               this.detailsData.approveStatusName = res.data.approveStatusName
               this.detailsData.remark = res.data.remark
                }).catch(err => {
                console.log(err)
          })
          }
          else if(this.whitchActive == 'demand'){
               this.$store.dispatch('quanyuangonjiManger/stockDemandInfo',value).then(res => {
               this.dialogFormVisible = true
               this.detailsData.demandId = res.data.demandId
               this.detailsData.userId = res.data.userId
               this.detailsData.enteName = res.data.enteName
               this.detailsData.customerManagerName = res.data.customerManagerName
               this.detailsData.stockCode = res.data.stockCode
               this.detailsData.stockName = res.data.stockName
               this.detailsData.borrowDays = res.data.borrowDays
               this.detailsData.borrowableQuantity = res.data.borrowableQuantity
               this.detailsData.borrowRate = res.data.borrowRate
               this.detailsData.reserveExpireDate = res.data.reserveExpireDate
               this.detailsData.fenzhijigou = '我是分支机构'
               this.detailsData.publishTime = res.data.publishTime
               this.detailsData.approveStatusName = res.data.approveStatusName
               this.detailsData.remark = res.data.remark
                }).catch(err => {
                console.log(err)
          })
          }
         
      },
      deleteFn(){},
      changeFn(changeItem){
        if(this.whitchActive == 'supply'){
          this.$emit('showStockSupplyDialog',changeItem)
        }
        else if(this.whitchActive == 'demand'){
          this.$emit('showStockSupplyDialog',changeItem)
        }
           
      },
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

