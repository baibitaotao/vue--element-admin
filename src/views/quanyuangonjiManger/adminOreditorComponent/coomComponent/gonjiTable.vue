<template>
    <div>
        <div style="marginBottom:10px"><el-button size="mini" v-for="(item,index) in optionsBtn" :key="index" @click="delFn(item)">{{item}}</el-button></div>
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
                   {{scope.row.approveStatus | whitchStatus}}
              </template>
           </el-table-column>
            <el-table-column
             label="撮合状态"
             width="100">
              <template slot-scope="scope">
                   {{scope.row.matchStatus | whitchCuoheStatus}}
              </template>
           </el-table-column>

         </el-table>
          <div style="marginBottom:30px;marginTop:20px;">
             <el-pagination
                 style="float:right;"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage4"
                 :page-sizes="[5, 10, 20]"
                 :page-size="5"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="tableData.totalCount">
              </el-pagination>
          </div>


    </div>
</template>


<script>

export default {
    props:{
      conditionOfTransmission:{
        type:Object,
        require:true
      }
    },
    watch: {
       conditionOfTransmission:{
         handler: function (val, oldVal) {
           this.getStockSupplyList()
         },
         deep: true
       } 
    },
    filters: {
      whitchStatus(value){
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
      whitchCuoheStatus(value){
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
      }
    },
    mounted () {
      this.getStockSupplyList()
    },
    data () {
      return {
        currentPage4:1,
        optionsBtn:['详情','删除','更改信息','取消发布','置顶'],
        tableData:{},      
      }
    },
    methods:{
      handleSelectionChange(value){
        console.log(value)
      },
      getStockSupplyList(){
          this.$store.dispatch('quanyuangonjiManger/getStockSupplyList',this.conditionOfTransmission).then(res => { 
              if(res.status == '0'){
                 this.tableData = res
              }  
              if(res.status == '1'){
               this.$message({showClose: true,message: res.msg,type: 'error'});
               return
              }
              console.log(res)
          }).catch((err) => {
            console.log(err)
          })
        },
      handleSizeChange(value){
            this.conditionOfTransmission.pageSize = value
      },
      handleCurrentChange(value){
          this.conditionOfTransmission.currPage = value
      }  
    },
}
</script>




