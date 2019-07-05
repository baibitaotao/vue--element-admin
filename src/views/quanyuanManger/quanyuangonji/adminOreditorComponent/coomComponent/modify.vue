<template>
    <div>
         <el-dialog title="券源供给修改" :visible.sync="dialogFormVisible">
               <el-form :model="form" :rules="rules" ref="form">
                
                <div>
                    <el-form-item label="券源供给编号" :label-width="formLabelWidth" v-if='shoSupplyOrdemand'>
                      <el-input v-model="form.supplyId" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>

                    <el-form-item label="证券代码" :label-width="formLabelWidth">
                      <el-input v-model="form.stockCode" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>  
                    <el-form-item label="证券名称"  :label-width="formLabelWidth">
                      <el-input v-model="form.stockName" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                </div>
              
                  <div>
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
export default {
    data () {
        return {
              shoSupplyOrdemand:true,
              formLabelWidth: '120px',
              dialogFormVisible:false, 
              form: {
                stockCode:'',
                lendQuantity:'',
                lendRate:'',
                lendDays:'',
                rowVersion:'',
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
          console.log(item)
          this.dialogFormVisible = true
          this.form.supplyId = item[0].supplyId 
          this.form.stockCode = item[0].stockCode
          this.form.stockName = item[0].stockName
          this.form.rowVersion = item[0].rowVersion
          this.form.lendQuantity = item[0].lendQuantity 
          this.form.lendRate = item[0].lendRate
          this.form.lendDays = item[0].lendDays
          this.form.reserveExpireDate = item[0].reserveExpireDate
          this.form.remark = item[0].remark 
      },
      dialogCancel(){
        this.dialogFormVisible = false
      },
      dialogConfirm(from){
        this.$refs[from].validate((valid) => {
          if (valid) {
                       console.log('校验通过') 
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
                  } else {
                      console.log('error submit!!');
                  return false;
          }
        });
      }  
    }
}
</script>


