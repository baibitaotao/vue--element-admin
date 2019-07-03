<template>
    <div>
       <el-button type="danger" v-for="(item,index) in arr1" :key="index">{{item}}</el-button>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
          <el-form-item label="券源需求最低期望借入天数值" prop="a">
            <el-input v-model="ruleForm.a"></el-input>
          </el-form-item>

          <el-form-item label="券源需求最低期望借入数量值" prop="b">
              <el-input v-model="ruleForm.b"></el-input>
          </el-form-item>
          
            <el-form-item label="券源需求最低期望利率值" prop="c">
              <el-input v-model="ruleForm.c"></el-input>
          </el-form-item>

            <el-form-item label="券源供给最低出借天数值" prop="d">
              <el-input v-model="ruleForm.d"></el-input>
          </el-form-item>

            <el-form-item label="券源供给最低出借数量值" prop="e">
              <el-input v-model="ruleForm.e"></el-input>
          </el-form-item>

            <el-form-item label="券源供给最低出借利率值" prop="f">
              <el-input v-model="ruleForm.f"></el-input>
          </el-form-item>
       
        </el-form>  
   
        <div><el-button type="danger" >保存</el-button></div>
        <el-button>abc</el-button>
        <el-button ></el-button>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        arr:[1,2,3,4,5,6],
        arr1:[45,4,56,56],
        ruleForm: {
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
        },
        rules: {
          a: [
            { required: true, message: '券源需求最低期望借入天数值', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          b: [
             { required: true, message: '券源需求最低期望借入数量值', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         c: [
             { required: true, message: '券源需求最低期望利率值', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         d: [
             { required: true, message: '券源供给最低出借天数值', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         e: [
             { required: true, message: '券源供给最低出借数量值', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         f: [
             { required: true, message: '券源供给最低出借利率值', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
