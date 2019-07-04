<template>
     <el-dialog
            title="详情页"
            :visible.sync="dialogVisible">
            <el-row>
                   <el-col :span="10" v-for="(item,key,index) in detailsData" :key="index" style="width:50%">
                     <div class="show_ditals" >
                       <div>{{key|detailsText}}</div>
                       <div>{{item}}</div>
                      </div>
                   </el-col>
             </el-row>  
             <el-divider>审核信息</el-divider>
             <el-row>
                   <el-table
                      :data="tableData"
                      border
                      style="width: 100%">
                      <el-table-column
                        prop="approveReason"
                        label="审核理由">
                      </el-table-column>
                      <el-table-column
                        prop="approveResultName"
                        label="审核结果">
                      </el-table-column>
                      <el-table-column
                        prop="approveTime"
                        label="审核时间">
                      </el-table-column>
                       <el-table-column
                        prop="approveUserName"
                        label="审核人">
                      </el-table-column>
                    </el-table>
             </el-row>

            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
</template>

<script>
export default {
    props:{
     seletedItem:{
        type:Array,
      }
    },
    filters: {
       detailsText(value){
         switch (value) {
           case 'account':
              return '资金账号'
           case 'isAccountName':
               return"资金账户类型的用户";   
           case 'accountFlagName':
              return '资金账号验证标记'
            case 'approveStatusName':
              return '审核状态'
            case 'userId':
              return '用户编号'
             case 'cardTypeName':
                return "证件类型";
             case 'cardCode':
                return "证件号";
             case 'customerManagerName':
                return"客户经理";
            case 'loginName':
                return "登录名";
            case 'mobilePhone':
               return"电话号";
            case 'registerTypeName':
               return"注册类型"; 
            case 'nickName':
               return"昵称";
            case 'orgName':
               return"所属分支机构名称";

            case 'roleNames':
               return"用户类型"; 

            case 'userName':
                return "姓名";
            case 'userId':
                return "用户id";
      
        }
      }  
    },
    data () {
        return {
            dialogVisible:false,
            detailsData:{},
            tableData:[]
        }
    },
    methods: {
       isShowDialog(){
          this.getDetail()
        }, 
        getDetail(){
            this.$store.dispatch('userAuditManger/userApprovalDetail',this.seletedItem[0].userId).then(res => {
                this.tableData = res.data.userApproveRecordList
                this.detailsData.account = res.data.userApproval.account
                this.detailsData.accountFlagName = res.data.userApproval.accountFlagName
                this.detailsData.approveStatusName = res.data.userApproval.approveStatusName
                this.detailsData.cardTypeName = res.data.userApproval.cardTypeName
                this.detailsData.cardCode = res.data.userApproval.cardCode
                this.detailsData.customerManagerName = res.data.userApproval.customerManagerName
                this.detailsData.isAccountName = res.data.userApproval.isAccountName
                this.detailsData.loginName = res.data.userApproval.loginName
                this.detailsData.mobilePhone = res.data.userApproval.mobilePhone
                this.detailsData.nickName = res.data.userApproval.nickName
                this.detailsData.orgName = res.data.userApproval.orgName 
                this.detailsData.registerTypeName = res.data.userApproval.registerTypeName
                this.detailsData.roleNames = res.data.userApproval.roleNames 
                this.detailsData.userName = res.data.userApproval.userName 
                this.detailsData.userId = res.data.userApproval.userId 
                this.dialogVisible =  !this.dialogVisible    
            })
        }  
    }

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
