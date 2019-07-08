<template>
    <div class="banngerManger">
         <el-dialog title="修改banner图片" :visible.sync="dialogFormVisible">
               <el-form :model="form" ref="form" :rules="rules">
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
                        <el-radio-group v-model="radio">
                          <el-radio :label="'01'">是</el-radio>
                          <el-radio :label="'02'">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上传图片" :label-width="formLabelWidth" prop="fileList">
                        <!-- <el-upload
                            class="upload-demo"
                            action="/smt-admin/attachmentController/upload?fieldToken=''"
                            :before-remove="beforeRemove"
                            :limit="1"
                            accept = 'image/png, image/jpeg, image/gif, image/jpg'
                            :on-exceed="handleExceed"
                            :on-success="success"
                            :file-list="form.fileList">
                            <el-button size="small" type="danger">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">推荐尺寸1920*356</div>
                        </el-upload> -->
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
import uploadImage from '../../../../../../components/upload/src/upload';
export default {
    
    components:{
      uploadImage
    },
    props:['seletedItem'],
    watch:{
      radio(val,oldval){
        this.form.status = val + ''
      }
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
                status:'',
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
      showDialog(item){
        this.dialogFormVisible = true
        this.pictureId = this.seletedItem[0].pictureId + ''
        this.assignmentValue(this.seletedItem[0])
      },    
      assignmentValue(item){
        this.form.title = item.title
        this.form.url = item.url
        this.form.summary = item.summary
        this.radio = item.status
      },
      dialogCancel(){
        this.dialogFormVisible = false
      },
      getFileList(val){
        this.form.fileList = val
        console.log(val)
      },
      dialogConfirm(){
        let data = {}
            data.bannerId = this.seletedItem[0].bannerId
            data.pictureUrl = this.form.fileList[0].url || ''
            data.pictureId = this.pictureId
            data.status = this.form.status
            data.summary = this.form.summary
            data.title = this.form.title
            data.url = this.form.url
            this.$store.dispatch('banngerManger/bannerUpdate',data).then(res => {
              if(res.status == '0'){
                 this.dialogFormVisible = false 
                 this.$message({ message: res.msg,type: 'success'});
                 console.log('刷新')
                 this.$emit('refresh')  
                 }
            }).catch(res =>　{
                console.log(res)
             })
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
