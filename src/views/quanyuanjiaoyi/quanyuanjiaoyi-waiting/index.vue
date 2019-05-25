<template>
    <div>
        <span style="font-size:14px;">交易详情</span> <el-button type="danger" size='mini'>待撮合</el-button>
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
         <div style="display:flex;justifyContent: space-around;marginTop:10px">
             <el-button type="danger" size='mini'>{{roles|waitingmarching}}</el-button>
         </div>
         
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    data () {
        return {
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
    computed:{
        ...mapGetters([
            'roles'
        ])
    },
    filters: {
        waitingmarching(val){
                if(val[0] === 'admin'){
                    return '受理'
                }
                else if(val[0] === 'editor'){
                    return '提心客户经理撮合'
                }
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


<style>

.abc{
    display: flex;
    align-items: center;
    justify-content: space-around
    
}

</style>

