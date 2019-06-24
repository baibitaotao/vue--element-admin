<template>
    <div class="coomComponent">
    <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="keyWord" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
         </el-input>
    </div>     
         <transition name="el-zoom-in-top">
             <div v-show="isShowCondition" class="nini">
                <div class="releaseTime" style="width:410px">
                  <span style="width:100px;">发布时间</span>
                   <el-date-picker
                      v-model="date"
                      type="daterange"
                      range-separator="至"
                      value-format='yyyy-MM-dd'
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                   </el-date-picker>
                </div>

                <div style="marginTop:10px;width:400px" class="accountManager" v-if="!isAdminAndronru">
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
                    <span style="fontSize:12px;width: 100px;marginRight:28px;">审核状态</span>
                    <el-radio-group v-model="radio3" size="mini">
                     <el-radio-button label="全部" ></el-radio-button>
                     <el-radio-button label="待提交"></el-radio-button>
                     <el-radio-button label="待审核"></el-radio-button>
                     <el-radio-button label="待复核"></el-radio-button>
                     <el-radio-button label="复核通过"></el-radio-button>
                   </el-radio-group>
                 </div>

                   <div class="status">
                    <span style="fontSize:12px;width: 100px;marginRight:28px;">撮合状态</span>
                    <el-radio-group v-model="radio4" size="mini">
                     <el-radio-button label="全部" ></el-radio-button>
                     <el-radio-button label="待撮合"></el-radio-button>
                     <el-radio-button label="撮合中"></el-radio-button>
                     <el-radio-button label="部分撮合成功"></el-radio-button>
                     <el-radio-button label="全部撮合成功"></el-radio-button>
                   </el-radio-group>
                 </div> 

        
             </div>
         </transition>
          <el-divider><a style="color:#B40005" @click="conditionsOn">{{showCondition}}&nbsp;&nbsp;<i :class="showConditionIcon"></i></a></el-divider>   
          <div style='marginBottom:20px'><el-button type="primary" @click="dialogFormVisible = true">发布券源供给</el-button></div>
          <gonji-table :conditionOfTransmission = 'conditionOfTransmission'></gonji-table>

          <el-dialog title="发布券源供给" :visible.sync="dialogFormVisible">
               <el-form :model="form" :rules="rules">
                 <el-form-item label="证券名称" prop="stockCode" :label-width="formLabelWidth">
                   <!-- <el-input v-model="" autocomplete="off"></el-input> -->
                    <el-select v-model="form.stockCode" filterable placeholder="请选择">
                       <el-option
                         v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                       </el-option>
                   </el-select>
                 </el-form-item>
                  <el-form-item label="出借数量" prop="lendQuantity" :label-width="formLabelWidth">
                   <el-input v-model="form.lendQuantity" autocomplete="off"></el-input>
                 </el-form-item>
                  <el-form-item label="出借利率（%）" prop="lendRate" :label-width="formLabelWidth">
                   <el-input v-model="form.lendRate" autocomplete="off"></el-input>
                 </el-form-item>
                  <el-form-item label="出借天数" prop="lendDays" :label-width="formLabelWidth">
                   <el-input v-model="form.lendDays" autocomplete="off"></el-input>
                 </el-form-item>
                  <el-form-item label="预约截止日期" prop="reserveExpireDate" :label-width="formLabelWidth">
                   <!-- <el-input v-model="form.reserveExpireDate" autocomplete="off"></el-input> -->
                  <div class="setInputWidth">
                       <el-date-picker
                         v-model="form.reserveExpireDate"
                         align="right"
                         type="date"
                         placeholder="选择截止预约日期">
                       </el-date-picker>
                  </div> 
                 </el-form-item>
                 <el-form-item label="备注" :label-width="formLabelWidth">
                   <el-input v-model="form.remark" autocomplete="off"></el-input>
                 </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogCancel">取 消</el-button>
                 <el-button type="primary" @click="dialogConfirm">确 定</el-button>
               </div>
          </el-dialog>      
    </div>
</template>


<script>

import {mapGetters} from 'vuex'
import gonjiTable from './gonjiTable'
import { constants } from 'crypto';

export default {
    watch: {
        date:{
           handler: function (val, oldVal) {
              this.conditionOfTransmission.publishTimeBegin = val[0]
              this.conditionOfTransmission.publishTimeEnd = val[1]
         },
         deep: true
        },
        radio3(val, oldVal){
            if(val == '全部'){
                this.conditionOfTransmission.approveStatus = ''
            }
            if(val == '待提交'){
              this.conditionOfTransmission.approveStatus = '01'
            }
            if(val == '待审核'){
              this.conditionOfTransmission.approveStatus = '02'
            }
            if(val == '待复核'){
              this.conditionOfTransmission.approveStatus = '03'
            }
            if(val == '复核通过'){
              this.conditionOfTransmission.approveStatus = '04'
            }
        },
        radio4(val, oldVal){
              if(val == '全部'){
                this.conditionOfTransmission.matchStatus = ''
            }
            if(val == '待撮合'){
              this.conditionOfTransmission.matchStatus = '01'
            }
            if(val == '撮合中'){
              this.conditionOfTransmission.matchStatus = '02'
            }
            if(val == '部分撮合成功'){
              this.conditionOfTransmission.matchStatus = '03'
            }
            if(val == '全部撮合成功'){
              this.conditionOfTransmission.matchStatus = '04'
            }
        }
    },
    components:{
       gonjiTable,
    },
    props:{
        whitchActive:String,
    },
    computed:{
        isAdminAndronru(){
          if(this.roles.length === 2 && this.roles[0] === 'admin' && this.roles[1] === 'ronchu'){
               return true
             }
             else if(this.roles[0] === 'admin' && this.roles.length === 1){
                return false 
             } 
        },
        ...mapGetters([
            'roles'
        ]),
        isShowUsertype(){
            if(this.whitchActive == 'first'){
                return false
            } else if(this.whitchActive == 'second'){
                return true
            }
        }
    },
    methods:{
      search(){
        this.conditionOfTransmission.keyWord = this.keyWord     
      },
      delFn(item){
        console.log(item)
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
          date:'',
          conditionOfTransmission:{
                keyWord:'',
                publishTimeBegin:'',
                publishTimeEnd:'',
                approveStatus:'',
                matchStatus:'',
                pageSize:5,
                currPage:1,  
          },
          options: [],
           form: {
             stockCode: '',
             lendQuantity: '',
             lendRate:'',
             lendDays:'',
             reserveExpireDate:'',
             remark:''
             },
              rules: {
                stockCode: [
                    { required: true, message: '请输入证券名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                lendQuantity: [
                    { required: true, message: '请输入出借数量', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                  ],
                lendRate: [
                    { required: true, message: '请输入出借利率', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                lendDays: [
                    { required: true, message: '请输入出借天数', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                  ],
                reserveExpireDate: [
                    { required: true, message: '请输入预约截止日期', trigger: 'blur' },
                  ],  
            },
            formLabelWidth: '120px',
            dialogFormVisible:false,
            tableData:{},
            keyWord:'',
            value:'',
            radio2:'全部',
            radio3:'全部',
            radio4:'全部',
            showConditionIcon:'el-icon-arrow-up',
            showCondition:'条件收起',
            isShowCondition:true,
            options: []
        }
    }
}
</script>



