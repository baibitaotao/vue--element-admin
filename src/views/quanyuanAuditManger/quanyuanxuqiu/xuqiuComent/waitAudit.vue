<template>
    <div class="waitAudit">
         <div class="searchInput">
            <el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
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
       <div style="margin-top: 10px" class="status">
         <span style="margin-right:32px">用户类型</span>
            <el-radio-group v-model="radio3" size="medium">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="融入方"></el-radio-button>
              <el-radio-button label="融出方"></el-radio-button>
            </el-radio-group>
       </div>
        <div v-if="!isAdminOrManger"><el-button @click = auditApprove>审核通过</el-button></div>
        <div v-if="isAdminOrManger">
            <div>
            <span style="marginRight:55px">状态</span>
            <el-radio-group v-model="tabPosition">
                <el-radio-button label="mangerAudit">客户经理待审核</el-radio-button>
                <el-radio-button label="nowAudit">本级待审核</el-radio-button>
                <el-radio-button label="alreadyAudit">已审核</el-radio-button>
            </el-radio-group> 
            </div>
            <div class="userStausSon">
                <keep-alive>  
                 <component :is="tabPosition"></component>         
                </keep-alive>
            </div>
        </div>
      
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
import { constants } from 'crypto'
import {mapGetters} from 'vuex'
import  nowAudit from '../userStatusComponents/correspondingAudit'
import alreadyAudit from '../userStatusComponents/alreadyAudit'
import mangerAudit from '../userStatusComponents/mangerAudit'



export default {
  components:{
      nowAudit,
      alreadyAudit,
      mangerAudit
  },  
  mounted () {
    console.log(this.isAdminOrManger)  
  },
  computed:{
      ...mapGetters([
          'roles'
      ]),
      isAdminOrManger(){
          if(this.roles[0] === 'admin'){
              return true
          }
          else if(this.roles[0] === 'manger'){
              return false
          }
      }
  },
  data () {
    return {
      tabPosition:'',
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
    auditApprove(){
      
    },  
    selectCondation(){
     
    }
  }
}
</script>