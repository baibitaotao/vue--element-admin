<template>
    <div>
        <div class="auditTime">
            <span>审核时间</span>
               <el-date-picker
                   v-model="value1"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
               </el-date-picker>
        </div>
        <div class="status">
            <span class="shenheStatus">审核状态</span>
                <el-radio-group v-model="radio">
                    <el-radio :label="3">备选项</el-radio>
                    <el-radio :label="6">备选项</el-radio>
                    <el-radio :label="9">备选项</el-radio>
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

