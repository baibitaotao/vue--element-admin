 <template>
 <div class="table">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

  <div class="paging">
    <el-pagination
      background
      layout="prev, pager, next, total, jumper"
     :total="100">
    </el-pagination>
  </div>
  
 </div>
   
  </template>

   <script>
    export default {
      data() {
        return {
          currentPage4:4,
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>



<style lang="scss">

.table{
  margin:10px;
    .el-input__inner{
     width:100%;   
    }
    .paging{
      margin-top: 10px;
      .el-input__inner{
        width:100%;   
      }
    }
    .el-pagination{
      display: flex;
      justify-content: flex-end;
    }


}



</style>



