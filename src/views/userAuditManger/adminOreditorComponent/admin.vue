<template>
    <div class="coomComponent">
    <h6 style="marginBottom:10px">用户审核管理</h6>
    <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
         </el-input>
    </div>     
         <transition name="el-zoom-in-top">
             <div v-show="isShowCondition" class="nini">
                <div class="releaseTime" style="width:400px">
                    <span>注册时间</span>
                    <el-date-picker
                     v-model="value1"
                     type="daterange"
                     value-format='yyyy-MM-dd'
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期">
                 </el-date-picker>
                </div>

                <div style="width:400px" class="userType">
                    <link-tag parentId='1001' contextPath='http://172.29.201.223:8077/smt-admin' v-model="radio2"></link-tag>
                </div>

                 <div class="status">
                    <link-tag parentId='1000' contextPath='http://172.29.201.223:8077/smt-admin' v-model="radio4"></link-tag>
                 </div>

                 <div style="marginTop:10px">
                     <el-button type="danger" plain size="mini" @click="query">查询</el-button>
                 </div>   

             </div>
         </transition>
          <el-divider><a style="color:#B40005" @click="conditionsOn">{{showCondition}}&nbsp;&nbsp;<i :class="showConditionIcon"></i></a></el-divider>   
          <my-table ref='table' :queryParams ='queryParams'></my-table>      
    </div>
</template>


<script>
 import myTable from './coomComponent/table'
 import linkTag from '../../aacoment/linkTag/src/linkTag'

export default {
    mounted () {
        this.$refs.table.refresh() 
    },
    watch:{
        radio2(){
                
        },
        radio3(){

        },
        radio4(){

        }
    },
    components:{
       myTable,
       linkTag
    },
    props:{
        whitchActive:String,
    }, 
    methods:{
        query(){
            this.input3 = ''
            console.log(this.queryParams)
        },
        search(){
            this.queryParams.keyWord = this.input3
            this.$refs.table.getTableList() 
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
        }
    },
    data () {
        return {
            queryParams:{
                accountFlag: 1,
                approveStatus: "02",
                createDtBegin: "",
                createDtEnd: "",
                currPage: 1,
                keyWord: '',
                pageSize: 5
            },
            input3:'',
            value1:'',
            value:'',
            radio2:'全部',
            registerType:'',
            radio3:'全部',
            accountFlag:1,
            radio4:"全部",
            approveStatus:'02',
            showConditionIcon:'el-icon-arrow-up',
            showCondition:'条件收起',
            isShowCondition:true,
            options: []
        }
    }
}
</script>




