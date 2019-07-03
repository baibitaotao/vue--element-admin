<template>
    <div class="xuqiuPairing">
        <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" style=""></el-button>
         </el-input>
        </div>
        <div>
            <chujie></chujie>
        </div>
         <div> 
            <span style="fontSize:12px;marginRight:30px">类型</span>
            <el-radio-group v-model="radio">
                <el-radio :label="3">全部</el-radio>
                <el-radio :label="6">待配对</el-radio>
                <el-radio :label="9">已配对</el-radio>
            </el-radio-group>
        </div>
        <div>
            <xuqiu-table :queryParams='queryParams'></xuqiu-table>
        </div>

    </div>
</template>

<script>
 import chujie from '../../../aacoment/chujie'
 import xuqiuTable from './table/xuqiutable'
 

export default {
    data () {
        return {
            input3:'',
            radio:'',
            queryParams:{},           
        }
    },
    components:{
      chujie,
      xuqiuTable 
    }
}
</script>

