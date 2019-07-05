<template>
    <div>
      <!-- <span>{{whitchActive}}</span> -->
        <div style="marginBottom:10px">
          <el-button @click.native="detial" :disabled="btnstatus.detial" type="danger"  size="mini"  >{{comBtn[1].name}}</el-button>
          <el-button @click.native="del" :disabled="btnstatus.del" type="danger"  size="mini"  >{{comBtn[2].name}}</el-button>
          <el-button @click.native="modify" :disabled="btnstatus.modify" type="danger"  size="mini"  >{{comBtn[3].name}}</el-button>
          <el-button @click.native="suspended" :disabled="btnstatus.suspended" type="danger"  size="mini"  >{{comBtn[4].name}}</el-button>
          <el-button @click.native="restore" :disabled="btnstatus.restore" type="danger"  size="mini"  >{{comBtn[5].name}}</el-button>
          <el-button @click.native="setTop" :disabled="btnstatus.setTop" type="danger"  size="mini"  >{{comBtn[6].name}}</el-button>
        </div>
        <el-table 
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
          <el-dialog title="已发布券源供给信息" :visible.sync="dialogFormVisible">
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
      <modify ref = 'modify'></modify>
    </div>
</template>


<script>

import {mapGetters} from 'vuex'
import modify from './modify'

export default {
  mounted () {
      this.setNewArr()
      this.$emit('btnArr',this.comBtn)
  },
  components:{
    modify
  },
  computed:{
       ...mapGetters([
            'buttons'
        ]),
    },
    props:{
      conditionOfTransmission:{
        type:Object,
        require:true
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
        comBtn:[],
        btnstatus:{
          fabuSupply:true,
          detial:true,
          del:true,
          modify:true,
          suspended:true,
          restore:true,
          setTop:true
        },
        pagination:{
          currPage:1,
          totalPage:0,
        },
        formLabelWidth:'120px',
        dialogFormVisible:false,
        tableData:{},
        demandTableData:{},
        seletedItem:[],
        detailsData:{}      
      }
    },
    methods:{
      refresh(){
        this.conditionOfTransmission.keyWord = ''
        this.conditionOfTransmission.publishTimeBegin = ''
        this.conditionOfTransmission.publishTimeEnd = ''
        this.conditionOfTransmission.approveStatus = ''
        this.conditionOfTransmission.matchStatus = ''
        this.conditionOfTransmission.pageSize = 5
        this.conditionOfTransmission.currPage = 1
        this.getStockSupplyList()
      },
      getStockSupplyList(){
          this.$store.dispatch('quanyuangonjiManger/getStockSupplyList',this.conditionOfTransmission).then(res => { 
              if(res.status == '0'){
                 this.tableData = res
                 this.pagination.currPage = res.currPage
                 this.pagination.totalPage = res.totalCount
              }  
              else{
               this.$message({showClose: true,message: res.msg,type: 'error'});
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
           this.conditionOfTransmission.pageSize = value
           this.getStockSupplyList()
      },
      handleCurrentChange(value){
           this.conditionOfTransmission.currPage = value
           this.getStockSupplyList()
      },
      demandHandleCurrentChange(){},
      isDisableBtn(selected){
          if(selected.length == 1){
             for(var variable  in this.btnstatus){
                this.btnstatus[variable] = false
             }
              return
          }else {
             for(var variable  in this.btnstatus){
                this.btnstatus[variable] = true
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
      setNewArr(){
        this.buttons.forEach(element => {
            this.comBtn.push(element)
        });
      
      
      },
      detial(){},
      del(){},
      modify(){
        this.$refs.modify.showDialog(this.seletedItem)
      },
      suspended(){},
      restore(){},
      setTop(){},      
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

