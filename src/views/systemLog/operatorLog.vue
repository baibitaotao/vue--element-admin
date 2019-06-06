<template>
    <div class="operatorLog">
       <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
        </div>     
        <transition name="el-zoom-in-top">
             <div class="nini">
                <div class="releaseTime" style="width:400px">
                    <span>操作时间</span>
                    <el-date-picker
                     v-model="value1"
                     type="daterange"
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期">
                 </el-date-picker>
                </div>
                 
                 <div style="marginTop:10px;">
                    <span style="fontSize:12px;marginRight:29px;">操作类型</span>
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                 </div>

                 <div class="status">
                    <span style="fontSize:12px;width: 100px;marginRight:53px;">用户类型</span>
                    <el-radio-group v-model="radio3" size="mini">
                     <el-radio-button label="全部" ></el-radio-button>
                     <el-radio-button label="融入方"></el-radio-button>
                     <el-radio-button label="融出方"></el-radio-button>
                     <el-radio-button label="客户经理"></el-radio-button>
                     <el-radio-button label="业务管理员"></el-radio-button>
                   </el-radio-group>
                 </div>
        
             </div>
         </transition>
         <my-table></my-table>      


    </div>
</template>

<script>
import myTable from '../table/index'
export default {
    components: {
        myTable,
    },
    data () {
        return {
            input3:'',
            radio2:'全部',
            radio3:'全部',
            value1:'',
            value:'',
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
             }],
             }
    }
}
</script>

