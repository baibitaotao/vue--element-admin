<template>
    <div class="coomComponent">
    <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
    </div>     
         <transition name="el-zoom-in-top">
             <div v-show="isShowCondition" class="nini">
                <div class="releaseTime" style="width:400px">
                    <span>发布时间</span>
                    <el-date-picker
                     v-model="value1"
                     type="daterange"
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期">
                 </el-date-picker>
                </div>

                <div style="marginTop:10px;width:400px" class="accountManager">
                 <span style="fontSize:12px;width: 100px;">所属客户经理</span>
                    <el-select v-model="value" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div style="width:400px" class="userType" v-if="isShowUsertype">
                    <span style="fontSize:12px;width: 100px;marginRight:29px;">用户类型</span>
                    <el-radio-group v-model="radio2" size="mini">
                      <el-radio-button label="全部" ></el-radio-button>
                      <el-radio-button label="融入方"></el-radio-button>
                      <el-radio-button label="融出方"></el-radio-button>
                    </el-radio-group>
                </div>

                 <div class="status">
                    <span style="fontSize:12px;width: 100px;marginRight:53px;">状态</span>
                    <el-radio-group v-model="radio3" size="mini">
                     <el-radio-button label="全部" ></el-radio-button>
                     <el-radio-button label="待预约"></el-radio-button>
                     <el-radio-button label="预约未成功"></el-radio-button>
                     <el-radio-button label="部分预约成功"></el-radio-button>
                     <el-radio-button label="全部预约成功"></el-radio-button>
                   </el-radio-group>
                 </div>
        
             </div>
         </transition>
     <el-divider><a style="color:#B40005" @click="conditionsOn">{{showCondition}}&nbsp;&nbsp;<i :class="showConditionIcon"></i></a></el-divider>   
          <my-table></my-table>      
    </div>
</template>


<script>
import myTable from '../../../table/index'

export default {
    components:{
       myTable,
    },
    props:{
        whitchActive:String,
    },
    computed:{
        isShowUsertype(){
            if(this.whitchActive == 'first'){
                return false
            } else if(this.whitchActive == 'second'){
                return true
            }
        }
    },
    methods:{
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
            input3:'',
            value1:'',
            value:'',
            radio2:'全部',
            radio3:'全部',
            showConditionIcon:'el-icon-arrow-up',
            showCondition:'条件收起',
            isShowCondition:true,
              options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }]
        }
    }
}
</script>



