<template>
    <div>
        <span style="fontSize:14px;">交易详情</span>
        <el-button type="danger" size="small">交易中</el-button>
        <el-table
           :data="tableData"
           style="width: 100%"
           :row-class-name="tableRowClassName">
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
        
        <div class="cuoheStep">
            <component :is="accordingRoleShow"></component>
            <div style="margin-top:10px;">
                <el-button>撮合成功</el-button>
                <el-button>撮合失败</el-button>
            </div>
        </div>

    </div>
</template>

<script>

import adminComponent from './admin/index'
import editorComponent from './editor/index'

export default {
  
    components:{
        editorComponent,
        adminComponent
    },
    data () {
        return {
            accordingRoleShow:'editorComponent',
            tableData: [{
                 date: '2016-05-02',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1518 弄',
               }, {
                 date: '2016-05-04',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1518 弄'
               }, {
                 date: '2016-05-01',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1518 弄',
               }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },
    methods: {
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }
}
</script>

