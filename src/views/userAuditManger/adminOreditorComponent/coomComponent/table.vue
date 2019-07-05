<template>
    <div>
        <div style="marginBottom:10px">
            <el-button :disabled="btnstatus.assignedAccountManager" @click="assignedAccountManager"  type="danger" plain size="mini" v-if = 'btnShow.assignedAccountManager'>{{comBtn[0].name}}</el-button>
            <el-button :disabled="btnstatus.audit" @click="audit"  type="danger" plain size="mini" v-if = 'btnShow.audit'>{{comBtn[1].name}}</el-button>
            <el-button :disabled="btnstatus.look" @click="look"  type="danger" plain size="mini" v-if = 'btnShow.look'>{{comBtn[2].name}}</el-button>
            <el-button :disabled="btnstatus.Tip" @click="tip"  type="danger" plain size="mini" v-if = 'btnShow.Tip'>{{comBtn[3].name}}</el-button>
        </div>
        <el-table 
           :data="tableData"
           border
           @selection-change="handleSelectionChange"
           >
           
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>

             <el-table-column
             prop="userId"
             label="用户编号"
             width="100">
           </el-table-column>
            
           <el-table-column
             prop="userName"
             label="真实姓名/企业名称"
             width="150">
           </el-table-column>
            <el-table-column
             prop="registerTypeName"
             label="注册类型"
             width="100">
           </el-table-column>
           <el-table-column
             prop=""
             label="用户类型/待确认"
             width="100">
           </el-table-column>
            <el-table-column
             prop="roleNames"
             label="证件类型"
             width="100">
           </el-table-column>

           <el-table-column
             prop="cardCode"
             label="证件号"
             width="100">
           </el-table-column>

            <el-table-column
             prop="contact"
             label="企业联系人"
             width="100">
           </el-table-column>

           <el-table-column
             prop="mobilePhone"
             label="手机号"
             width="100">
           </el-table-column>

            <el-table-column
             prop="orgName"
             label="所属分支机构名称"
             width="100">
           </el-table-column>
           <el-table-column
             prop="isAccountName"
             label="是否财通用户"
             width="100">
           </el-table-column>

           <el-table-column
             prop="account"
             label="资金账号"
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
      <user-approval-diolog ref = 'dialog' :seletedItem = 'seletedItem' @refresh = 'refresh'></user-approval-diolog>
      <detail-dialog ref = 'detailDialog' :seletedItem = 'seletedItem'></detail-dialog>
      <assign-customer-manager-dialog ref = 'assignCustomerManager' :seletedItem = 'seletedItem' @refresh = 'refresh'></assign-customer-manager-dialog>
    </div>
</template>


<script>
import userApprovalDiolog from './userApprovalDialog'
import detailDialog from './detailDialog'
import assignCustomerManagerDialog from './assignCustomerManagerDialog'

import {mapGetters} from 'vuex'

export default {
  mounted () {
    this.isShowButton()
    this.setNewArr()
  },
    computed:{
       ...mapGetters([
            'buttons'
        ]),
    },
    components: {
        userApprovalDiolog,
        detailDialog,
        assignCustomerManagerDialog
    },
    props:{
      queryParams:{
        type:Object,
        required:true
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
    data () {
      return {
        btnShow:{
          assignedAccountManager:false,
          audit:false,
          look:false,
          Tip:false
        },
        btnstatus:{
          assignedAccountManager:true,
          audit:true,
          look:true,
          Tip:true
        },
        comBtn:[],
        formLabelWidth:'120px',
        dialogFormVisible:false,
        tableData:[],
        pagination:{
          currPage:1,
          totalPage:0,
        },
        seletedItem:[],
      }
    },
    methods:{
      refresh(){
      this.queryParams.accountFlag =  ''
      this.queryParams.approveStatus = ''
      this.queryParams.createDtBegin = ''
      this.queryParams.createDtEnd = ''
      this.queryParams.currPage = 1
      this.queryParams.keyWord = ''
      this.queryParams.pageSize = 5
      this.getTableList()
      },
      getTableList(){
          this.$store.dispatch('userAuditManger/userApprovalList',this.queryParams).then(res => { 
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

      isShowButton(){
          this.buttons.forEach(element => {
              if(element.code === '10003010101'){
                  this.btnShow.assignedAccountManager = true
              }
              if(element.code === '10003010102'){
                  this.btnShow.audit = true
              }
               if(element.code === '10003010103'){
                  this.btnShow.look = true
              }
               if(element.code === '10003010104'){
                  this.btnShow.Tip = true
              }

          });

      },
      assignedAccountManager(){
         this.$refs.assignCustomerManager.isShowDialog()
      },
      audit(){
          this.$refs.dialog.isShowDialog()
      },
      look(){
         this.$refs.detailDialog.isShowDialog() 
      },
      tip(){},
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
     isDisableBtn(val,oldVal){
        if(val.length == 1){
            this.btnstatus.assignedAccountManager = false
            this.btnstatus.audit = false
            this.btnstatus.look = false
            this.btnstatus.Tip = false
        }else{
            this.btnstatus.assignedAccountManager = true
            this.btnstatus.audit = true
            this.btnstatus.Tip = true
        }
     },
      setNewArr(){
        this.buttons.forEach(element => {
            this.comBtn.push(element)
        });
      },
 
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

