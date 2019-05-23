<template>
    <div class="daishenhe">
      <div class="searchInput">
        <el-input
           placeholder="请输入用户编号/用户昵称/券源供给编号/证券代码/证券名称"
           prefix-icon="el-icon-search"
           v-model="input2">
         </el-input>
      </div>
      <div class="timeselect">
        <span>审核时间</span>
           <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
      </div>
      <div style="margin-top:10px">
        <el-button type="primary" plain>审核通过</el-button>
      </div>
      <div style="margin-top:10px">
          <el-table
         :data="tableData"
         border
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
      </div>
     
    </div>
</template>

<script>
export default {
  data () {
    return {
      input2:'',
      value1:'',
      radio2:'全部',
      radio3:'全部',
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
  },
  methods: {
    selectCondation(){
      console.log('okoko')
    }
  }
}
</script>