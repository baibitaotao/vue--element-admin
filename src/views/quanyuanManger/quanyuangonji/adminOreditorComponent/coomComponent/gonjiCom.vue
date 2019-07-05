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

                <div style="marginTop:10px;width:400px" class="accountManager">
                 <span style="fontSize:12px;width: 100px;">所属客户经理</span>
                  <el-input
                       size="small"
                       placeholder="请输入内容"
                       v-model="input3">
                  </el-input>
                    <!-- <el-select v-model="value" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                </div>

                 <div style="display:flex;fontSize:12px;" class="userType">
                     <div style="marginRight:10px;width:72px"><span >撮合状态</span></div>
                     <link-tag parentId='1005' v-model="radio4"></link-tag>
                 </div>

                  <div style="marginTop:10px">
                      <el-button type="danger" plain size="mini" @click="query">查询</el-button>
                  </div>
             </div>
            
         </transition>
          <el-divider><a style="color:#B40005" @click="conditionsOn">{{showCondition}}&nbsp;&nbsp;<i :class="showConditionIcon"></i></a></el-divider>   
          <div style='marginBottom:20px'><el-button type="primary" @click="stockSupply">{{fabuSupplyBtn.name}}</el-button></div>
          
          <gonji-table @btnArr = 'btnArr' ref = 'table' :conditionOfTransmission = 'conditionOfTransmission' @showStockSupplyDialog = 'showStockSupplyDialog'></gonji-table>
          
          <gonji-dialog ref="Dialog"></gonji-dialog>
    </div>
</template>


<script>

import {mapGetters} from 'vuex'
import gonjiTable from './gonjiTable'
import gonjiDialog from './gonjiDialog'
import linkTag from '../../../../aacoment/linkTag/src/linkTag'

export default {
    mounted () {
      this.$refs.table.refresh()
    },
    watch: {
       date:{
         handler(val,oldval){
           if(val){
            this.conditionOfTransmission.publishTimeBegin = val[0]
            this.conditionOfTransmission.publishTimeEnd = val[1]
          }else{
            this.conditionOfTransmission.publishTimeBegin = ''
            this.conditionOfTransmission.publishTimeEnd = ''
          }
         }
       },
       radio4(val,oldval){
            this.conditionOfTransmission.matchStatus = val
        },
        input3(val,oldval){
             this.conditionOfTransmission.customerManagerSearch = val 
        }
    },
    components:{
       gonjiTable,
       gonjiDialog,
       linkTag,
    },
    props:{},
    computed:{},
    methods:{
      query(){
          this.$refs.table.getStockSupplyList()
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
      btnArr(val){
        this.fabuSupplyBtn = val[0]
      },
      stockSupply(){
        this.$store.dispatch('quanyuangonjiManger/stockSelectByKeyWord',{keyWord:''}).then(res => {
          this.dealStockList(res).then(res =>　{
             this.$refs.Dialog.showDialog(res)
          })
        }).catch(err => {
          console.log(err)
        })
      },

      showStockSupplyDialog(changeItem){
        this.$refs.Dialog.showDialog(changeItem)
      },
      search(){
        this.conditionOfTransmission.keyWord = this.keyWord
        this.$refs.table.getStockSupplyList()     
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
          fabuSupplyBtn:{},
          conditionOfTransmission:{
                keyWord:'',
                publishTimeBegin:'',
                publishTimeEnd:'',
                approveStatus:'',
                matchStatus:'',
                customerManagerSearch:'',
                pageSize:5,
                currPage:1,  
          },
            tableData:{},
            keyWord:'',
            date:'',
            value:'',
            radio4:'',
            input3:'',
            showConditionIcon:'el-icon-arrow-up',
            showCondition:'条件收起',
            isShowCondition:true,
            options: []
        }
    }
}
</script>



