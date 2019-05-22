<template>
  <div class="upload-box">
    <div v-if="hiddenUpload" class="fileView">
      <h3 v-for="item in fileList" :key="item.uid">
        <a :href="contextPath + 'attachController/download?fileId=' + item.uid" target="_blank">{{ item.name }}</a>
      </h3>
    </div>
    <div v-if="!hiddenUpload" class="el-upload-box">
      <el-upload
        ref="upload"
        :limit="limit"
        :action="updatePath"
        :auto-upload="true"
        :name="upLoadName"
        :data="extraData"
        :file-list="fileList"
        :accept="acceptFormat"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-error="handleError"
        :on-change="handleChange"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
      >
        <input ref="input" type="hidden" :value="value" @input="updateValue($event.target.value)">
        <el-button :class="{active:hiddenUpload}" :size="size" type="primary">
          {{ uploadTitle }}
        </el-button>
        <div v-if="isShowTip" slot="tip" class="el-upload__tip">{{ TipTitle }}</div>
      </el-upload>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Upload',
  props: {
    value: {// v-model
      type: String,
      default: ''
    },
    isShowTip: { // 是否开启上传提示
      type: Boolean,
      default: false
    },
    hiddenUpload: {// 隐藏上传按钮
      type: Boolean,
      default: false
    },
    tipTitle: { // 是否开启上传提示
      type: String,
      default: '只能上传jpg / png文件， 且不超过500kb'
    },
    uploadTitle: { // 替换上传title
      type: String,
      default: '点击上传'
    },
    limit: { // 限制上传文件的个数
      type: Number,
      default: 1
    },
    extraData: { // 上传时附带的额外参数
      type: Object,
      default: function() {
        return {
          bizTableName: '',
          bizTablePk: '',
          fieldName: ''
        }
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    upLoadName: { // 上传的文件字段名
      type: String,
      default: 'file'
    },
    contextPath: { // 请求地址
      type: String,
      default: '/yhhr-web/'
    },
    acceptFormat: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.rp,.vsd'
    }
  },
  data: function() {
    return {
      updatePath: this.contextPath + 'attachController/upload?fieldToken=' + this.value, // 默认上传地址
      fileList: [] // 上传数据data
    }
  },
  watch: {
    value(val) {
      this.getFileData()
    }
  },
  created() {
    const that = this

    setTimeout(function() {
      that.$nextTick(function() {
        that.updatePath = that.contextPath + 'attachController/upload?fieldToken=' + that.value
        that.getFileData()
      })
    }, 500)
  },
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function(value) {
      var formattedValue = value
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过input 事件发出数值
      this.$emit('input', formattedValue)
    },
    getFileData() { // 获取文件列表
      var that = this
      var v = this.value

      if (v == '' || v == null) {
        v = '-1'
      }

      axios({
        url: this.contextPath + 'attachController/getFileList?fieldToken=' + v,
        method: 'get'
      })
        .then(function(response) {
          if (response.data.status === '0') {
            if (response.data.data.fileList) {
              that.$nextTick(function() {
                that.fileList = response.data.data.fileList
                if (that.fileList.length == 0) {
                  that.updateValue('')
                }
              })
            }
          } else {
            that.$message({ type: 'info', duration: 1000, message: response.data.msg })
          }
        })
    },
    beforeUpload(file) { // 上传文件之前的钩子
    },
    handleChange(file, fileList) { // 文件状态改变时的钩子
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'rp'
      const extension2 = testmsg === 'vsd'

      if (extension || extension2) {
        this.$message({
          message: `上传文件不能是 rp 、vsd 格式!`,
          type: 'warning'
        })
        this.$refs.upload.clearFiles()
      }
    },
    handleExceed(files, fileList) { // 文件超出个数限制时
      this.$message.warning(`当前限制选择 ${files.length} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleRemove(file, fileList) { // 删除file
      var that = this
      axios({// 数据库删除
        url: this.contextPath + 'attachController/delete?fileId=' + file.uid,
        method: 'get'
      })
        .then(function(response) {
          if (response.data.status === '0') {
            if (fileList.length == 0) {
              that.updateValue('')
            }
          }
        })
    },
    handleError(err, file, fileList) { // 文件上传失败时的钩子

    },
    handleSuccess(response, file, fileList) {
      let fieldToken = response.data.fieldToken
      if (fieldToken == undefined) {
        fieldToken = this.value
      }
      const arr = this.updatePath.split('=')
      if (arr[1] != '' && fieldToken == '') {
        fieldToken = arr[1]
      }
      this.updatePath = this.contextPath + 'attachController/upload?fieldToken=' + fieldToken
      this.updateValue(fieldToken)
    },
    beforeRemove(file, fileList) { // 删除之前提示
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlePreview(file) { // 点击文件列表中已上传的文件时
      window.open(this.contextPath + 'attachController/download?fileId=' + file.uid)
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
    display: none ! important;
}

.activeM {
    margin-top: -22px;
}

.activeM .el-upload-list__item .el-icon-close {
    display: none ! important;
}

.fileView h3 a {
    color: blue;
    padding: 6px 4px;
    display: block;
}
</style>
