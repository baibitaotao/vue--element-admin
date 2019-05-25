<template>
    <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
               <el-tab-pane label="待审核" name="first">
                    <wait-audit></wait-audit>
               </el-tab-pane>
               <el-tab-pane label="已审核" name="second">
                    <already-audit></already-audit>
               </el-tab-pane>
          </el-tabs>  
    </div>
</template>


<script>
import waitAudit from './waitAudit/index'
import alreadyAudit from './alreadyAudit/index'

export default {
    components: {
        waitAudit,
        alreadyAudit
    },
    data () {
        return {
        activeName:'first',
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
        handleClick(){
            
        }
    }
}
</script>
