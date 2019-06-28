<template>
    <div class="coomComponent">
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
                    <span style="fontSize:12px;width: 100px;marginRight:29px;">注册类型</span>
                    <el-radio-group v-model="radio2" size="mini">
                      <el-radio-button label="全部" ></el-radio-button>
                      <el-radio-button label="个人"></el-radio-button>
                      <el-radio-button label="企业"></el-radio-button>
                    </el-radio-group>
                </div>

                 <div class="status">
                    <span style="fontSize:12px;width: 100px;marginRight:30px;">用户类型</span>
                    <el-radio-group v-model="radio3" size="mini">
                     <el-radio-button label="全部" ></el-radio-button>
                     <el-radio-button label="融入方"></el-radio-button>
                     <el-radio-button label="融出方"></el-radio-button>
                   </el-radio-group>
                 </div>

                 <div class="status">
                    <span style="fontSize:12px;width: 100px;marginRight:30px;">审核状态</span>
                    <el-radio-group v-model="radio4" size="mini">
                     <el-radio-button label="全部" ></el-radio-button>
                     <el-radio-button label="待审核"></el-radio-button>
                     <el-radio-button label="已审核"></el-radio-button>
                   </el-radio-group>
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




