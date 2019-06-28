<template>
    <div>
         <el-dialog :title="supplyOrChangeOrDemandOrChange" :visible.sync="dialogFormVisible">
               <el-form :model="form" :rules="rules" ref="form">
                 
                 <el-form-item label="证券名称" prop="stockCode" :label-width="formLabelWidth" v-if = "showSupplyOrChange">
                    <el-select v-model="form.stockCode" filterable placeholder="请选择">
                       <el-option
                         v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                       </el-option>
                   </el-select>
                 </el-form-item>
                
                <div v-if = "!showSupplyOrChange">
                    <el-form-item label="券源供给编号" :label-width="formLabelWidth" v-if='shoSupplyOrdemand'>
                      <el-input v-model="modifyForm.supplyId" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>

                    <el-form-item label="券源需求编号" :label-width="formLabelWidth" v-if='!shoSupplyOrdemand'>
                      <el-input v-model="modifyForm.demandId" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>    
                    
                    <el-form-item label="证券代码" :label-width="formLabelWidth">
                      <el-input v-model="modifyForm.stockCode" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>  
                    <el-form-item label="证券名称"  :label-width="formLabelWidth">
                      <el-input v-model="modifyForm.stockName" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                </div>
                  <div v-if='shoSupplyOrdemand'>
                    <el-form-item label="可出借数量" prop="lendQuantity" :label-width="formLabelWidth">
                      <el-input v-model="form.lendQuantity" autocomplete="off" type="number"></el-input>
                    </el-form-item>
                     <el-form-item label="出借利率（%）" prop="lendRate" :label-width="formLabelWidth">
                      <el-input v-model="form.lendRate" autocomplete="off" type="number"></el-input>
                    </el-form-item>
                     <el-form-item label="出借天数" prop="lendDays" :label-width="formLabelWidth">
                      <el-input v-model="form.lendDays" autocomplete="off" type="number"></el-input>
                    </el-form-item>
                  </div>
                   <div v-if='!shoSupplyOrdemand'>
                    <el-form-item label="借入数量" prop="borrowableQuantity" :label-width="formLabelWidth">
                      <el-input v-model="form.borrowableQuantity" autocomplete="off" type="number"></el-input>
                    </el-form-item>
                     <el-form-item label="借入利率（%）" prop="borrowRate" :label-width="formLabelWidth">
                      <el-input v-model="form.borrowRate" autocomplete="off" type="number"></el-input>
                    </el-form-item>
                     <el-form-item label="借入天数" prop="borrowDays" :label-width="formLabelWidth">
                      <el-input v-model="form.borrowDays" autocomplete="off" type="number"></el-input>
                    </el-form-item>
                  </div>

                  <el-form-item label="预约过期日期" prop="reserveExpireDate" :label-width="formLabelWidth">
                  <div class="setInputWidth">
                    <el-date-picker
                      v-model="form.reserveExpireDate"
                      align="right"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择预约过期日期">
                    </el-date-picker>
                  </div> 
                 </el-form-item>
                 <el-form-item label="备注" :label-width="formLabelWidth">
                   <el-input v-model="form.remark" autocomplete="off"></el-input>
                 </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogCancel">取消</el-button>
                 <el-button type="primary" @click="dialogConfirm('form')">确定</el-button>
               </div>
          </el-dialog>      
    </div>
</template>

<script>
import { constants } from 'crypto';
export default {
    props:{
        whichClick:{
            type:Object,
        }
    },
    computed:{
        supplyOrChangeOrDemandOrChange(){
            if(this.whichClick.name == 'stockSupply'){
                return '发布券源供给'
            }
              else if(this.whichClick.name == 'stockDemand'){
                return '发布券源需求' 
            }
            else if(this.whichClick.name == 'stockDemand'){
                return '发布券源需求' 
            }
            else if(this.whichClick.name == 'stockDemandChange'){
               return '修改券源需求' 
            }
        }
    },
    data () {
        return {
              showSupplyOrChange:null,
              shoSupplyOrdemand:true,
              formLabelWidth: '120px',
              dialogFormVisible:false, 
              modifyForm:{},
              form: {
                stockCode:'',
                lendQuantity:'',
                lendRate:'',
                lendDays:'',
                borrowableQuantity:'',
                borrowRate:'',
                borrowDays:'',
                reserveExpireDate:'',
                remark:'',
              },
              options: [],
              rules: {
                stockCode: [
                    { required: true, message: '请输入证券名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                lendQuantity: [
                    { required: true, message: '请输入出借数量', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                  ],
                borrowableQuantity: [
                    { required: true, message: '请输入出借数量', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                  ],
                lendRate: [
                    { required: true, message: '请输入出借利率', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                borrowRate: [
                    { required: true, message: '请输入出借利率', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                lendDays: [
                    { required: true, message: '请输入出借天数', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                  ],
                borrowDays: [
                    { required: true, message: '请输入出借天数', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                  ],
                reserveExpireDate: [
                    { required: true, message: '请输入预约截止日期', trigger: 'blur' },
                  ],  
            },
        }
    },
    methods: {
      showDialog(item){
        this.dialogFormVisible = true
        if(!(item instanceof Array)){
          this.showSupplyOrChange = false
          if(item.supplyId){
          this.shoSupplyOrdemand = true
          this.modifyForm.supplyId = item.supplyId 
          this.modifyForm.stockCode = item.stockCode
          this.modifyForm.stockName = item.stockName
          this.modifyForm.rowVersion = item.rowVersion
          this.form.lendQuantity = item.lendQuantity 
          this.form.lendRate = item.lendRate
          this.form.lendDays = item.lendDays
          this.form.reserveExpireDate = item.reserveExpireDate
          this.form.remark = item.remark 
          return
          }else if(item.demandId){
             this.shoSupplyOrdemand = false
             this.modifyForm.demandId = item.demandId 
             this.modifyForm.stockCode = item.stockCode
             this.modifyForm.stockName = item.stockName
             this.modifyForm.rowVersion = item.rowVersion
             this.form.borrowableQuantity = item.borrowableQuantity 
             this.form.borrowRate = item.borrowRate
             this.form.borrowDays = item.borrowDays
             this.form.reserveExpireDate = item.reserveExpireDate
             this.form.remark = item.remark  
            return
          }
   
        }else{
          this.showSupplyOrChange = true
          if(item.name == 'stockSupply'){
          this.shoSupplyOrdemand = true  
          }
          else if(item.name == 'stockDemand'){
          this.shoSupplyOrdemand = false  
          }
          this.form.stockCode = ''
          this.options = item
        }
      },
      dialogCancel(){
        this.dialogFormVisible = false
      },
      dialogConfirm(from){
        this.$refs[from].validate((valid) => {
          if (valid) {
              if(this.whichClick.name == 'stockSupply') { 
                let dto = {}
                dto.stockCode = Number(this.form.stockCode)
                dto.lendDays = Number(this.form.lendDays)
                dto.lendQuantity = Number(this.form.lendQuantity)
                dto.lendRate =  Number(this.form.lendRate)
                dto.remark =  this.form.remark
                dto.reserveExpireDate = this.form.reserveExpireDate
                this.$store.dispatch('quanyuangonjiManger/stockSupplyAdd',dto).then(res => {
                    if(res.status == '0'){
                      this.dialogFormVisible = false 
                      this.$message({ message: res.msg,type: 'success'});
                      this.$refs[from].resetFields();      
                        }
                    }).catch(res =>　{
                      console.log(res)
                    })
                }else if(this.whichClick.name == 'stockDemandChange'){
                       let payload = {
                        demandId:Number(this.modifyForm.demandId),
                        dto:{
                          stockCode: Number(this.modifyForm.stockCode),
                          borrowDays: Number(this.form.borrowDays),
                          borrowableQuantity: Number(this.form.borrowableQuantity),
                          borrowRate: Number(this.form.borrowRate),
                          rowVersion:Number(this.modifyForm.rowVersion),
                          remark:this.form.remark,
                          reserveExpireDate:this.form.reserveExpireDate,
                        }
                      }
                      this.$store.dispatch('quanyuangonjiManger/stockDemandUpdate',payload).then(res => {
                        if(res.status == '0'){
                            this.dialogFormVisible = false 
                            this.$message({ message: res.msg,type: 'success'});
                            this.$emit('refresh')
                        }
                    }).catch(res => {
                      console.log(res)
                    })
                      
                }
                else if(this.whichClick.name == 'stockChange'){
                      let payload = {
                        supplyId:Number(this.modifyForm.supplyId),
                        dto:{
                          stockCode: Number(this.modifyForm.stockCode),
                          lendDays: Number(this.form.lendDays),
                          lendQuantity: Number(this.form.lendQuantity),
                          lendRate: Number(this.form.lendRate),
                          rowVersion:Number(this.modifyForm.rowVersion),
                          remark:this.form.remark,
                          reserveExpireDate:this.form.reserveExpireDate,
                        }
                      }
                    this.$store.dispatch('quanyuangonjiManger/stockSupplyUpdate',payload).then(res => {
                        if(res.status == '0'){
                            this.dialogFormVisible = false 
                            this.$message({ message: res.msg,type: 'success'});
                            this.$emit('refresh')
                        }
                    }).catch(res => {
                      console.log(res)
                    })
                } 
                else{
                  console.log('检查修改发布的传值')
                }

              } else {
                console.log('error submit!!');
            return false;
          }
        });
      }  
    }
}
</script>


