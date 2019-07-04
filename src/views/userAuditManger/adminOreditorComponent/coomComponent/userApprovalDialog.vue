<template>
    <div>
        <el-dialog
            title="用户审核"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
             <div>
                 <el-radio v-model="radio2" label="1" border size="medium">通过</el-radio>
                 <el-radio v-model="radio2" label="2" border size="medium">不通过</el-radio>
             </div>
             <textarea name="" id="" cols="80" rows="10" style=" resize:none;" :placeholder='placeholder' v-model='approveReason'></textarea> 
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm" >确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { type } from 'os';
  export default {
    props:{
      seletedItem:{
        type:Array,
      }
      
    },
    watch:{
        radio2(val,old){
            if(val == '1'){
                this.placeholder = '请输入通过理由'
                this.reasonValue = ''
                return
            }
            if(val == '2'){
                this.placeholder = '请输入不通过理由'
                this.reasonValue = ''
            }
        }
    },
    data() {
      return {
        dialogVisible: false,
        radio2:'1',
        placeholder:'请输入通过理由',
        approveReason:'',
      };
    },
    methods: {
      valueSetnull(){
        this.approveReason = null
      },
      isShowDialog(){
       if(this.seletedItem[0].approveStatus == '03'){
          this.dialogVisible =  !this.dialogVisible
          return
        }
        this.$message({
          message: '券源状态不为待审核',
          type: 'warning'
        });
          
      },  
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      confirm(){
          if(this.radio2 == '1'){
               let request  = {
                  approveReason:this.approveReason,
                  approveResult:'1',
                  rowVersion:this.seletedItem[0].rowVersion,
                  userId:this.seletedItem[0].userId||''
                  }
               this.$store.dispatch('userAuditManger/userApprovalApproval',request).then(res => {
                  if(res.status == 0){
                      this.$message({
                         message: '状态修改'+res.msg,
                         type: 'success'
                        });
                     this.isShowDialog()
                     this.$emit('refresh')
                     this.valueSetnull()
                  }
               }).catch(err =>　{
                 console.log(err)
               })
          }
          if(this.radio2 == '2'){
              if(this.approveReason){
                  let request  = {
                  approveReason:this.approveReason,
                  approveResult:'2',
                  rowVersion:this.seletedItem[0].rowVersion,
                  userId:this.seletedItem[0].userId||''
                 }
                 this.$store.dispatch('userAuditManger/userApprovalApproval',request).then(res => {
                  if(res.status == 0){
                      this.$message({
                         message: '状态修改'+res.msg,
                         type: 'success'
                        });
                     this.isShowDialog()
                     this.$emit('refresh')
                     this.valueSetnull()
                  }
               }).catch(err =>　{
                 console.log(err)
               })    
              
              }else{
                   this.$message.error('请填写不通过理由');
              }
          }
      }
    }
  };
</script>
