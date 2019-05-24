<template>
    <div class="userSonComponent">
        <div style="width:400px;">
            <el-input
             placeholder="请输入内容"
             prefix-icon="el-icon-search"
             v-model="input2">
            </el-input>
        </div>
        <div style="width:400px;display: flex;align-items: center;margin-top:10px">
            <span style="width:100px;fontSize:14px;">申请时间</span>
            <el-date-picker
             v-model="value1"
             type="monthrange"
             range-separator="至"
             start-placeholder="开始月份"
             end-placeholder="结束月份">
           </el-date-picker>
        </div>
        <div style = 'width:400px;margin-top:10px;'>
            <span>状态</span>
             <el-radio-group v-model="tabPosition">
                <el-radio-button label="mangerAudit">客户经理待审核</el-radio-button>
                <el-radio-button label="nowAudit">本级待审核</el-radio-button>
                <el-radio-button label="alreadyAudit">已审核</el-radio-button>
            </el-radio-group>
        </div>
        <div class="userStausSon">
            <el-tabs :tab-position="tabPosition">
                <keep-alive>
                    {{tabPosition}}  
                 <!-- <component :is="tabPosition"></component>          -->
                </keep-alive>
            </el-tabs>
        </div>
         
    </div>
</template>


<script>
export default {
    data () {
        return {
           input2:'',
           value1:'', 
           tabPosition:'mangerAudit',
        }
    }
}
</script>

