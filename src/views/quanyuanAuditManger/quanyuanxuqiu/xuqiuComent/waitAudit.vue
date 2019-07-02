<template>
    <div class="waitAudit">
    <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
         </el-input>
    </div>     
         <transition name="el-zoom-in-top">
             <div v-show="isShowCondition" class="nini">
                <div class="releaseTime" style="width:400px">
                    <span>申请时间</span>
                    <el-date-picker
                     v-model="value1"
                     type="daterange"
                     value-format='yyyy-MM-dd'
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期">
                 </el-date-picker>
                </div>
                 <link-tag parentId='1004' contextPath='http://172.29.201.223:8077/smt-admin' v-model="tagedata"></link-tag>
                 
                <div style="marginTop:10px">
                    <el-button type="danger" plain size="mini" @click="query">查询</el-button>
                </div>   
             </div>
         </transition>
          <el-divider><a style="color:#B40005" @click="conditionsOn">{{showCondition}}&nbsp;&nbsp;<i :class="showConditionIcon"></i></a></el-divider> 
         <div>
            <quanyuan-audit-manger-table :queryParams='queryParams' ref="quanyuanAuditMangerTable" :roles='roles'></quanyuan-audit-manger-table>
         </div>  


    </div>
</template>
<script>
import { constants } from 'crypto'
import {mapGetters} from 'vuex'
import linkTag from '../../../aacoment/linkTag/src/linkTag'
import quanyuanAuditMangerTable from './table'

export default {
 
  components:{
    linkTag,
    quanyuanAuditMangerTable
  },
  watch: {
      tagedata(val,oldval){
         this.queryParams.approveStatus = val
      },
      value1(val,oldval){
          if(val){
            this.queryParams.createDtBegin = val[0]
            this.queryParams.createDtEnd = val[1]
          }else{
            this.queryParams.createDtBegin = ''
            this.queryParams.createDtEnd = ''
          }
      
      }
  },  
  mounted () {
        this.$refs.quanyuanAuditMangerTable.refresh()
  },
  computed:{
      ...mapGetters([
          'roles'
      ]),
      isAdminOrManger(){
          if(this.roles[0] === 'admin'){
            this.queryParams = {
              pageSize:5,
              currPage:1,
              keyWord:'',
              createDtBegin:'',
              createDtEnd:'',
              approveStatus:'',
              approveTimeBegin:'',
              approveTimeEnd:'' }
              return true
          }
          else if(this.roles[0] === 'manger'){
              this.queryParams = {
                pageSize:5,
                currPage:1,
                keyWord:'',
                createDtBegin:'',
                createDtEnd:'',
                approveStatus:'',
              }
              return false
          }
      }
  },
  data () {
    return {
      queryParams:{},
      isShowCondition:true,
      showConditionIcon:'el-icon-arrow-up',
      tagedata:'',
      tabPosition:'',
      input3:'',
      value1:'',
      showCondition:'条件收起',
    }
  },
  methods: {
    query(){
         this.$refs.quanyuanAuditMangerTable.getTableList() 
      },
      search(){
          this.queryParams.keyWord = this.input3
          this.$refs.quanyuanAuditMangerTable.getTableList() 
      },
    conditionsOn(){
       if(this.showConditionIcon === 'el-icon-arrow-up'){
           this.showConditionIcon = 'el-icon-arrow-down'
           this.showCondition = '条件展开'
           this.isShowCondition = false
       }
       else if(this.showConditionIcon === 'el-icon-arrow-down'){
           this.showConditionIcon = 'el-icon-arrow-up'
           this.showCondition = '条件收起'
           this.isShowCondition = true
       }
    },
    auditApprove(){
      
    },  
    selectCondation(){
     
    }
  }
}
</script>