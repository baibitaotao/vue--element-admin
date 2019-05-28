<template>
    <div>
    <div style="margin-top: 10px; width:410px">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
             <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
    <div style="margin-top:10px;">
        <span style="width:100px;fontSize:14px;">注册时间</span>
          <el-date-picker
           v-model="value1"
           type="daterange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
         </el-date-picker>
    </div>
    <div style="margin-top:10px">
        <span style="width:100px;fontSize:14px;">用户类型</span>
            <el-radio-group v-model="radio2" size="medium">
                <el-radio-button label="全部" ></el-radio-button>
                <el-radio-button label="融入方"></el-radio-button>
                <el-radio-button label="融出方"></el-radio-button>
            </el-radio-group>
    </div>
    <div>
        <span style="width:100px;fontSize:14px;">用户状态</span>
        <components :is = 'isShowAdminOrEditor'></components>
    </div>

    <div>
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

import adminComponent from './adminOreditor/adminComponent'
import editorComponent from './adminOreditor/editorComponent'
import {mapGetters} from 'vuex'

export default {
    components:{
        adminComponent,
        editorComponent
    },
    computed: {
        ...mapGetters([
            'roles'
        ]),
        isShowAdminOrEditor(){
            if(this.roles[0] === 'admin'){
                return 'editorComponent'
            }
         else if(this.roles[0] === 'editor'){
             return 'editorComponent'
         }
        }
    },
    data () {
        return {
            value1:'',
            input3:'',
            radio2:'全部',
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
    }
}
</script>
