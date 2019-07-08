<template>
    <div class="banngerManger">
         <el-dialog title="新增banner图片" :visible.sync="dialogFormVisible">
               <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="banner标题" prop="title" :label-width="formLabelWidth">
                      <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="banner链接" prop="url" :label-width="formLabelWidth">
                      <el-input  v-model="form.url" autocomplete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="banner摘要" prop="summary" :label-width="formLabelWidth">
                      <textarea  cols="59" rows="2" v-model="form.summary"></textarea>
                    </el-form-item>
                    <el-form-item label="是否发布" :label-width="formLabelWidth" prop="status">
                        <el-radio v-model="form.status" label="01">是</el-radio>
                        <el-radio v-model="form.status" label="02">否</el-radio>
                    </el-form-item>
                    <el-form-item label="上传图片" :label-width="formLabelWidth" prop="fileList">
                        <upload-image v-model="pictureId" contextPath = '/smt-admin/' @getFileList ='getFileList' ></upload-image>
                    </el-form-item>
                              
                </el-form>
               <div slot="footer" class="dialog-footer">
                 <el-button @click="dialogCancel">取消</el-button>
                 <el-button type="danger" @click="dialogConfirm('form')">确定</el-button>
               </div>
          </el-dialog>      
    </div>
</template>

<script>
import uploadImage from '../../../../../../components/upload/src/upload'
export default {
    components:{
      uploadImage
    },
    data () {
        return {
              pictureId:'',
              formLabelWidth: '120px',
              dialogFormVisible:false, 
              radio:'',
              form: {
                title:'',
                url:'',
                summary:'',
                status:'01',
                fileList:[]
              },
              rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                url: [{required: true, message: '请输入地址', trigger: 'blur' }],
                summary: [{required: true, message: '请输入摘要', trigger: 'change' }],
                status: [{ required: true, message: '请确认是否预约', trigger: 'change' }],
                fileList:[{required: true, message: '请上传图片', trigger: 'change' }]    
            },
        }
    },
    methods: {
      getFileList(val){
        this.form.fileList = val
      },
      showDialog(item){
        this.pictureId = ''
        this.dialogFormVisible = true
      },
      dialogCancel(){
        this.dialogFormVisible = false
      },
      dialogConfirm(from){
        this.$refs[from].validate((valid) => {
          if (valid) {
                let data = {}
                    data.pictureId = this.pictureId
                    data.pictureUrl = this.form.fileList[0].url
                    data.status = this.form.status
                    data.summary = this.form.summary
                    data.title = this.form.title
                    data.url = this.form.url
                    this.$store.dispatch('banngerManger/bannerAdd',data).then(res => {
                      if(res.status == '0'){
                         this.dialogFormVisible = false 
                         this.$message({ message: res.msg,type: 'success'});
                         this.$refs.form.resetFields();
                         this.$emit('refresh')
                         }
                    }).catch(res =>　{
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


<style lang="scss">

.banngerManger{
  .el-dialog{
    width:40%;
    .el-dialog__header{
      text-align: center;
      background-color: #B42D29;
      >span{
        color: #fff;
      }
      >button{
        >i::before{
          color: #fff
        }
      }
    }
  }
}


</style>
