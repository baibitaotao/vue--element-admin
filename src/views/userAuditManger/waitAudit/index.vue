<template>
    <div >
        <div style="width:410px;">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

          <transition name="fade">
              <div class="condition" style="margin-top:10px"> 
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <div class="postStatus" style="marginTop:10px;">
                  <span  style="display:inline-block;width:100px;">发布状态</span>
                  <el-radio-group v-model="radio1">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="草稿"></el-radio-button>
                    <el-radio-button label="发布中"></el-radio-button>
                    <el-radio-button label="已下架"></el-radio-button>
                  </el-radio-group>
                </div>
                  <div class="postStatus" style="marginTop:10px;">
                  <span style="display:inline-block; width:100px;">发布状态</span>
                  <el-radio-group v-model="radio2">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="草稿"></el-radio-button>
                    <el-radio-button label="发布中"></el-radio-button>
                    <el-radio-button label="已下架"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </transition>
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
</template>
<script>
export default {
    data () {
        return {
            input3:'',
            radio1:'全部',
            radio2:'全部',
            value1:'',
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

<style lang="scss" scoped>
    .abc{
        display: inline-block
    }


</style>


