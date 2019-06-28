<template>
    <div>
        <div style="marginBottom:10px">
          <el-button  type="danger" plain size="mini" :disabled = 'btnstatus[index]'  @click="optionFn(item)" v-for="(item,index) in btnOption" :key='index'>{{item|showBtnText}}</el-button>
        </div>
        <el-table 
           :data="tableData"
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
             prop="demandId"
             label="券源供给编号"
             width="110">
           </el-table-column>

           <el-table-column
             prop="userId"
             label="用户编号"
             width="100">
           </el-table-column>

           <el-table-column
             prop="userOrCompanyName"
             label="真实姓名/企业名称"
             width="150">
           </el-table-column>
           
           <el-table-column
             prop="userManager"
             label="所属客户经理"
             width="110">
           </el-table-column>

            <el-table-column
             prop="stockCode"
             label="证券代码"
             width="100">
           </el-table-column>
            <el-table-column
             prop="stockCodeName"
             label="证券名称"
             width="100">
           </el-table-column>
            <el-table-column
             prop="reserveDays"
             label="出借天数"
             width="100">
           </el-table-column>
            <el-table-column
             prop="reserveQuantity"
             label="出借数量"
             width="100">
           </el-table-column>
            <el-table-column
             prop="reserveRate"
             label="出借利率"
             width="100">
           </el-table-column>

            <el-table-column
             prop="stockDemandUserId"
             label="需求对象编号"
             width="110">
           </el-table-column>

            <el-table-column
             prop="stockDemandUserOrCompanyName"
             label="需求对象/公司名称"
             width="100">
           </el-table-column>

            <el-table-column
             prop="stockDemandUserManager"
             label="需求对象客户经理"
             width="100">
           </el-table-column>

           <el-table-column
             prop="stockSupplyUserId"
             label="供给对象编号"
             width="110">
           </el-table-column>

            <el-table-column
             prop="stockSupplyUserOrCompanyName"
             label="供给对象/公司名称"
             width="100">
           </el-table-column>

            <el-table-column
             prop="stockSupplyUserManager"
             label="供给对象客户经理"
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



export default {
    computed:{
      isShowSupplyOrDemand(){
        if(this.whoId == 'supply'){return true}
        else if(this.whoId == 'demand'){return false}
        },
    },
    props:{
      needdata:{
        type:Object,
        require:true
      },
      whoId:{
        type:String,
      },
    },
    watch: {
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
        if(value == 'determineMatch'){
         return '确定分配'
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
        btnOption:['determineMatch'],
        btnstatus:[true,true,true,true,true],
        formLabelWidth:'120px',
        dialogFormVisible:false,
        tableData:[],
        pagination:{
          currPage:1,
          totalPage:0,
        },
        seletedItem:[],
        detailsData:{}      
      }
    },
    methods:{
      refresh(){
        this.needdata.conditionOfTransmission = {
          currPage: 1,
          keyWord: "",
          order: 1,
          pageSize: 5,
          reserveDaysBegin:"1" ,
          reserveDaysEnd: "111111111",
          reserveQuantityBegin: "1",
          reserveQuantityEnd:"111111111111" ,
          reserveRateBegin: "1",
          reserveRateEnd:"1111111111111111" ,
          reserveTypes: "1,2",
          sort: 1
        }
        this.getTableList()
      },
      getTableList(){
          this.$store.dispatch('quanyuanPairingManger/stockReserveListStockReserve',this.needdata.conditionOfTransmission).then(res => { 
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
         if(value == 'determineMatch'){
           this.$store.dispatch('quanyuanPairingManger/stockMatchTradeAdd',{reserveId:this.seletedItem[0].reserveId}).then(res => {
                this.$message({message: '确定分配成功',type: 'success',duration: 3 * 1000})
                this.refresh()
           })
         }
        
      },
      handleSelectionChange(value){
          this.seletedItem = value
      },
      demandHandleSelectionChange(value){
            this.seletedItem = value
      },
      handleSizeChange(value){
        this.needdata.conditionOfTransmission.pageSize = value
        this.getTableList()
      },
      handleCurrentChange(value){
      this.needdata.conditionOfTransmission.currPage = value
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

