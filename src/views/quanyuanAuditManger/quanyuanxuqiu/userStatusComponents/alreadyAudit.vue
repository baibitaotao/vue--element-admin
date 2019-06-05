<template>
    <div>
        <div class="auditTime">
            <span style="marginRight:30px">审核时间</span>
               <el-date-picker
                   v-model="value1"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
               </el-date-picker>
        </div>
        <div class="status">
            <span class="shenheStatus" style="marginRight:30px">审核状态</span>
                <el-radio-group v-model="radio">
                    <el-radio :label="3">全部</el-radio>
                    <el-radio :label="6">审核通过</el-radio>
                    <el-radio :label="9">审核不通过</el-radio>
                </el-radio-group> 
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           value1:'',
           radio:3,
        }
    }
}
</script>

