<template>
    <div class="tanchuang">
        <div class="tanchuangContain" style="backgroundColor:#fff; opacity: 1;position:absolute;min-width:500px;">
            <div class="top" style="color:#fff;position:relative">新建banner
                <i class="el-icon-close" style="position:absolute;top:50%;transform:translateY(-50%);right:10px" @click="closeNewBaner"></i>
            </div> 
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="banner标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="浏览量" prop="browse">
                  <el-input v-model="ruleForm.browse"></el-input>
                </el-form-item>
                <el-form-item label="转发量" prop="forwarding">
                  <el-input v-model="ruleForm.forwarding"></el-input>
                </el-form-item>
                <el-form-item label="点赞量" prop="like">
                  <el-input v-model="ruleForm.like"></el-input>
                </el-form-item>
                 <el-form-item label="banner链接" prop="connection">
                  <el-input v-model="ruleForm.connection"></el-input>
                </el-form-item>
                <el-form-item label="banner内容" prop="contain">
                  <el-input v-model="ruleForm.contain"></el-input>
                </el-form-item>
                 <el-form-item label="banner封面" prop="face">
                        <el-upload
                             class="avatar-uploader"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                             <img v-if="imageUrl" :src="imageUrl" class="avatar">
                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>    
                </el-form-item>
                 <el-form-item label="是否发布" prop="isIssued">

                </el-form-item>
            </el-form>
            <div class="sureOrCanle">
                <el-button size="mini">确定</el-button>
                <el-button size="mini" @click="cancel">取消</el-button>
            </div>
            
        </div>
    </div>
</template>


<script>
export default {
    props:{
       isShowNewBaner:{
           type: Boolean,
           required: true
       }
    },
    data () {
        return {
            imageUrl: '',
            ruleForm: {
                  title: '',
                  browse: '',
                  forwarding: '',
                  like: '',
                  connection: '',
                  contain: '',
                  radio:'1',
                },
            rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           browse: [
            { required: true, message: '请输入浏览量', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           forwarding: [
            { required: true, message: '请输入转发量', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           connection: [
            { required: true, message: '请输入点赞量', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           contain: [
            { required: true, message: '请输入连接', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ], 
          like: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           face: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           isIssued: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          }
        }
    },
    methods:{
      cancel(){
          this.closeNewBaner()
      },
      closeNewBaner(){
           this.$emit('modifyBannerStatus');
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
    
}
</script>






