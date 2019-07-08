<template>
    <div class="upload-box">
        <div class="fileView" v-if="hiddenUpload">
            <h3 v-for="item in fileList" :key="item.uid">
                <a :href="contextPath + 'attachmentController/download?fileId=' + item.uid" target="_blank">{{item.name}}</a>
            </h3>
        </div>
        <div class="el-upload-box" v-if="!hiddenUpload">
            <el-upload
                    ref="upload"
                    :limit="limit"
                    :action="updatePath"
                    :auto-upload ='true'
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
                <el-button :class="{active:hiddenUpload}" :size="size" type="primary">
                    {{uploadTitle}}
                </el-button>
                <div slot="tip" class="el-upload__tip" v-if="isShowTip">{{TipTitle}}</div>
            </el-upload>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'GuluUpload',
        model: {
            prop: 'value',
            event: 'update-value'
        },
        props: {
            value: [String],
            isShowTip: { //是否开启上传提示
                type: Boolean,
                default: false
            },
            hiddenUpload: {//隐藏上传按钮
                type: Boolean,
                default: false
            },
            TipTitle: { //是否开启上传提示
                type: String,
                default: "只能上传jpg / png文件， 且不超过500kb"
            },
            uploadTitle: { //替换上传title
                type: String,
                default: "点击上传"
            },
            limit: { //限制上传文件的个数
                type: Number,
                default: 1
            },
            extraData: { //上传时附带的额外参数
                type: Object,
                default: function () {
                    return {
                        bizTableName: '',
                        bizTablePk: '',
                        fieldName: '',
                    }
                }
            },
            size: {
                type: String,
                default: 'small'
            },
            upLoadName: { //上传的文件字段名
                type: String,
                default: "file"
            },
            contextPath: { //请求地址
                type: String,
                default: "/smt-admin/"
            },
            acceptFormat: {
                type: String,
                default: ".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.rp,.vsd"
            }
        },
        data () {
            return {
                updatePath: 'attachmentController/upload', //默认上传地址
                fileList: [] //上传数据data
            }
        },
        watch: {
            value(val) {
                // this.getFileData()
            }
        },
        created() {
            setTimeout(()=>{
                this.$nextTick(()=>{
                    this.updatePath = this.contextPath + 'attachmentController/upload?fieldToken=' + this.value
                    this.getFileData()
                })
            },500)
        },
        methods: {
            getFileData() { //获取文件列表
                var that = this;
                var v = this.value;

                if(v==""||v==null){
                    v = "-1";
                }

                axios({
                    url: this.contextPath + 'attachmentController/getFileList?fieldToken=' + v,
                    method: "get"
                })
                    .then(function (response) {
                        if (response.data.status === '0') {

                            if (response.data.data.fileList) {
                                that.$nextTick(function () {
                                    that.fileList = response.data.data.fileList;
                                    if (that.fileList.length == 0) {
                                        that.$emit('update-value', '')
                                    }
                                })
                            }
                        } else {
                            that.$message({ type: 'info', duration: 1000, message: response.data.msg });
                        }
                    })
            },
            //上传文件之前的钩子
            beforeUpload(file) {},
            handleChange(file, fileList) {//文件状态改变时的钩子
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'rp'
                const extension2 = testmsg === 'vsd'

                if (extension || extension2) {
                    this.$message({
                        message: `上传文件不能是 rp 、vsd 格式!`,
                        type: 'warning'
                    });
                    this.$refs.upload.clearFiles()
                }
            },
            handleExceed(files, fileList) { //文件超出个数限制时
                this.$message.warning(`当前限制选择 ${files.length} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {//删除file
                var that = this;
                axios({//数据库删除
                    url: this.contextPath + 'attachmentController/delete?fileId=' + file.uid,
                    method: "get"
                })
                    .then(function (response) {
                        if (response.data.status === '0') {
                            if (fileList.length == 0) {
                                that.$emit('update-value', '')
                            }
                        }
                    })
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {},
            handleSuccess(response, file, fileList) {
                let fieldToken = response.data.fieldToken;
                if(fieldToken==undefined){
                    fieldToken = this.value;
                }
                let arr =  this.updatePath.split('=')
                if(arr[1]!=''&&fieldToken==''){
                    fieldToken = arr[1]
                }
                this.updatePath = this.contextPath + 'attachmentController/upload?fieldToken=' + fieldToken;
                this.$emit('update-value', fieldToken)
                this.$emit('getFileList',response.data.fileList)
            },
            beforeRemove(file, fileList) {//删除之前提示
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handlePreview(file) { //点击文件列表中已上传的文件时
                window.open(this.contextPath + 'attachmentController/download?fileId=' + file.uid)
            },
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
