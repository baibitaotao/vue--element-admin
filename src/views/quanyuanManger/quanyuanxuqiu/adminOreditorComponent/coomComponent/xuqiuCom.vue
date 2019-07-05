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
                 <!-- <link-tag parentId='1004' contextPath='http://172.29.201.223:8077/smt-admin' v-model="radio2"></link-tag> -->
                    
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
                 <!-- <link-tag parentId='1040' contextPath='http://172.29.201.223:8077/smt-admin' v-model="radio3"></link-tag> -->

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
          <!-- <div style='marginBottom:20px'><el-button type="primary" @click="stockDemand">发布券源需求</el-button></div> -->
          <gonji-table ref = 'table' :demandConditionOfTransmission = 'demandConditionOfTransmission' @showStockSupplyDialog = 'showStockSupplyDialog' :refresh = 'refresh' :whitchActive = 'whitchActive'></gonji-table>
          <gonji-dialog :whichClick = 'whichClick' ref="Dialog"></gonji-dialog>
    </div>
</template>


<script>

import {mapGetters} from 'vuex'
import gonjiTable from './gonjiTable'
import { constants } from 'crypto';
import gonjiDialog from './gonjiDialog'
import linkTag from '../../../../aacoment/linkTag/src/linkTag'

export default {
    watch: {
        date:{
        handler: function (val, oldVal) {
              if(val){
                this.demandConditionOfTransmission.publishTimeBegin = val[0]
                this.demandConditionOfTransmission.publishTimeEnd = val[1]
              }else{
                this.demandConditionOfTransmission.publishTimeBegin = ''
                this.demandConditionOfTransmission.publishTimeEnd = ''
              }
              
         },
         deep: true
        },
        radio3(val, oldVal){
            if(val == '全部'){
                this.demandConditionOfTransmission.approveStatus = ''
            }
            if(val == '待提交'){
              this.demandConditionOfTransmission.approveStatus = '01'
            }
            if(val == '待审核'){
              this.demandConditionOfTransmission.approveStatus = '02'
            }
            if(val == '待复核'){
              this.demandConditionOfTransmission.approveStatus = '03'
            }
            if(val == '复核通过'){
              this.demandConditionOfTransmission.approveStatus = '04'
            }
        },
        radio4(val, oldVal){
            if(val == '全部'){
                this.demandConditionOfTransmission.matchStatus = ''
            }
            if(val == '待撮合'){
              this.demandConditionOfTransmission.matchStatus = '01'
            }
            if(val == '撮合中'){
              this.demandConditionOfTransmission.matchStatus = '02'
            }
            if(val == '部分撮合成功'){
              this.demandConditionOfTransmission.matchStatus = '03'
            }
            if(val == '全部撮合成功'){
              this.demandConditionOfTransmission.matchStatus = '04'
            }
        }
    },
    components:{
       gonjiTable,
       gonjiDialog,
       linkTag,
    },
    props:{
        whitchActive:{
            type:String,
            require:true,
        },
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
      refresh(){
        this.demandConditionOfTransmission.keyWord = ''
        this.demandConditionOfTransmission.publishTimeBegin = ''
        this.demandConditionOfTransmission.publishTimeEnd = ''
        this.demandConditionOfTransmission.approveStatus = ''
        this.demandConditionOfTransmission.matchStatus = ''
        this.demandConditionOfTransmission.pageSize = 5
        this.demandConditionOfTransmission.currPage = 1
        this.$refs.table.getStockDemandList()
      },
      dealStockList(res){
           let stocklist = []
           res.data.list.forEach(element => {
           let  obj = {}
           obj.value = element.stockCode
           obj.label = element.stockName + '/' + element.stockCode
           stocklist.push(obj)
        });
        return new Promise((resolve, reject) => {
          resolve(stocklist)
        })
      },
      stockDemand(){
        this.whichClick.name = 'stockDemand'
        this.$store.dispatch('quanyuangonjiManger/stockSelectByKeyWord',{keyWord:''}).then(res => {
          this.dealStockList(res).then(res =>　{
             res.name = 'stockDemand'
             this.$refs.Dialog.showDialog(res)
          })
        }).catch(err => {
          console.log(err)
        })
      },
      showStockSupplyDialog(changeItem){
        this.whichClick.name = 'stockDemandChange'
        this.$refs.Dialog.showDialog(changeItem)
      },
      search(){
        this.demandConditionOfTransmission.keyWord = this.keyWord     
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
          whichClick:{
            name:'',
            demandId:'',
          },
          date:'',
          demandConditionOfTransmission:{
                keyWord:'',
                publishTimeBegin:'',
                publishTimeEnd:'',
                approveStatus:'',
                matchStatus:'',
                pageSize:5,
                currPage:1,  
          },
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



