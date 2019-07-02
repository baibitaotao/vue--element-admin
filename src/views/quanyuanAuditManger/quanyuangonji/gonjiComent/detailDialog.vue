<template>
     <el-dialog
            title="详情页"
            :visible.sync="dialogVisible">
            <el-row>
                   <el-col :span="10" v-for="(item,key,index) in detailsData" :key="index">
                     <div class="show_ditals" >
                       <div>{{key|detailsText}}</div>
                       <div>{{item}}</div>
                      </div>
                   </el-col>
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
           case 'userName':
              return '用户名'
            case 'approveStatusName':
              return '审核状态'
            case 'userId':
              return '用户编号'
             case 'lendDays':
                return "借出天数";
             case 'lendRate':
                return "借出利率";
             case 'lendQuantity':
                return"借出数量";
            case 'customerManagerName':
                return "客户经理名";
            case 'enteName':
               return"企业名称";

            case 'matchStatusName':
               return"撮合状态";
            case 'orgName':
               return"所属分支机构名称";

            case 'remark':
               return"备注"; 

            case 'stockName':
                return "券源名称";
            case 'stockCode':
                return "券源代码";
      
        }
      }  
    },
    data () {
        return {
            dialogVisible:false,
            detailsData:{},
        }
    },
    methods: {
       isShowDialog(){
          this.getDetail()
        }, 
        getDetail(){
            this.$store.dispatch('quanyuangonjiManger/stockSupplyInfo',this.seletedItem[0].supplyId).then(res => {
                this.detailsData.userName = res.data.userName
                this.detailsData.approveStatusName = res.data.approveStatusName
                this.detailsData.userId = res.data.userId
                this.detailsData.lendDays = res.data.lendDays
                this.detailsData.lendRate = res.data.lendRate
                this.detailsData.lendQuantity = res.data.lendQuantity
                this.detailsData.customerManagerName = res.data.customerManagerName
                this.detailsData.enteName = res.data.enteName
                this.detailsData.matchStatusName = res.data.matchStatusName 
                this.detailsData.orgName = res.data.orgName 
                this.detailsData.remark = res.data.remark 
                this.detailsData.stockName = res.data.stockName 
                this.detailsData.stockCode = res.data.stockCode 
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
