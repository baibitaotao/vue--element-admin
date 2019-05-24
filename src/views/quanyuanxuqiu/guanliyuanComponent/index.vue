<template>
    <div>
        <div style="width:410px"> 
            <el-input
               placeholder="请输入内容"
               prefix-icon="el-icon-search"
               v-model="input2">
             </el-input>
        </div>
        <div class = 'applyTime'>
            <span>申请时间</span>
            <div class="userDateSelect">
             <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>   
        </div>
         <div class="userType">
             <span>用户类型</span>
                 <el-radio-group v-model="radio2" size="medium">
                   <el-radio-button label="全部" ></el-radio-button>
                   <el-radio-button label="融入方"></el-radio-button>
                   <el-radio-button label="融出方"></el-radio-button>
                 </el-radio-group>
        </div> 
        <div class="userStatus">
            <span>用户状态</span>
            <el-radio-group v-model="tabPosition">
                <el-radio-button label="mangerAudit">客户经理待审核</el-radio-button>
                <el-radio-button label="nowAudit">本级待审核</el-radio-button>
                <el-radio-button label="alreadyAudit">已审核</el-radio-button>
            </el-radio-group>
        </div> 
        <div class="userStausSon">
            <el-tabs :tab-position="tabPosition">
                <keep-alive>  
                 <component :is="tabPosition"></component>         
                </keep-alive>
            </el-tabs>
        </div>

         <el-table
           :data="tableData"
           height="250"
           border
           style="width: 100%;margin-top:10px">
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
</template>

<script>
import  nowAudit from './userStatusComponents/correspondingAudit'
import alreadyAudit from './userStatusComponents/alreadyAudit'
import mangerAudit from './userStatusComponents/mangerAudit'

export default {
    components:{
        nowAudit,
        alreadyAudit,
        mangerAudit
    },
    data () {
        return {
            input2:'',
            value1:'',
            radio2:'全部',
            tabPosition:'mangerAudit',
            tableData: [{
             date: '2016-05-03',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-02',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-04',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-01',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-08',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-06',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }, {
             date: '2016-05-07',
             name: '王小虎',
             address: '上海市普陀区金沙江路 1518 弄'
           }]
        }
    }
}
</script>
