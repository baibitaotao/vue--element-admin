<template>
    <div>
        <el-button type="primary" @click="auditApprove">审核通过</el-button>
    </div>
</template>


<script>
export default {
    methods: {
        auditApprove(){
            console.log('触发')
        }
    }
}
</script>


