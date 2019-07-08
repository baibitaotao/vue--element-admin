<template>
    <div>
        <div style="marginBottom:10px">
            <el-button :disabled="btnstatus[index]" @click="option(item)"  type="danger" plain size="mini" v-for="(item,index) in comBtn" :key='index'>{{comBtn[index].name}}</el-button>
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
             prop="bannerId"
             label="ID">
           </el-table-column>
            
           <el-table-column
             prop="title"
             label="banner标题">
           </el-table-column>
            <el-table-column
             prop="publishTime"
             label="发布时间">
           </el-table-column>

           <el-table-column
             prop="summary"
             label="摘要">
           </el-table-column>
            <el-table-column
             prop="content"
             label="内容">
           </el-table-column>

           <el-table-column
             prop="pictureUrl"
             label="图片地址">
           </el-table-column>

            <el-table-column
             prop="statusName"
             label="发布状态">
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

      <add-dialog ref = 'addDialog'  @refresh = 'refresh'></add-dialog>
      <modify ref = 'modifyDialog' :seletedItem = 'seletedItem' @refresh = 'refresh'></modify>
    </div>
</template>


<script>
import userApprovalDiolog from './userApprovalDialog'
import detailDialog from './detailDialog'
import addDialog from './addDialog'
import modify from './modify'

import {mapGetters} from 'vuex'

export default {
  mounted () {
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
        addDialog,
        modify
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
        addOrmodify:'',
        btnstatus:[false,true,true,true],
        comBtn:[],
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
        this.queryParams.pageSize =  5
        this.queryParams.currPage = 1
        this.queryParams.keyWord = ''
        this.queryParams.publishTimeBegin = ''
        this.queryParams.publishTimeEnd = ''
        this.getTableList()
      },
      getTableList(){
          this.$store.dispatch('banngerManger/bannerList',this.queryParams).then(res => { 
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
      option(val){
        if(val.code == '10003080201'){
          this.$refs.addDialog.showDialog()  
          return
        }
        console.log(val)
        if(val.code == "10003080202"){
          this.$refs.modifyDialog.showDialog(this.seletedItem[0])    
          return
        }
         if(val.code == "10003080203"){
          this.$refs.detailDialog.isShowDialog(this.seletedItem[0])    
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
     isDisableBtn(val,oldVal){
        if(val.length == 1){
           for(let i = 0;i < this.btnstatus.length;++i){
               this.$set(this.btnstatus,i,false)
             }
        }else{
            this.$set(this.btnstatus,1,true)
            this.$set(this.btnstatus,2,true)
            this.$set(this.btnstatus,3,true)
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

