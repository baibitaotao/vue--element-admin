<template>
    <div class="editorStep">
        <div class="contain">
            <div>
                <el-timeline>
                      <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                          <h4>更新 Github 模板</h4>
                          <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                      </el-timeline-item>
                      <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                          <h4>更新 Github 模板</h4>
                          <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                      </el-timeline-item>
                      <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                          <h4>更新 Github 模板</h4>
                          <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                     </el-timeline-item>
                </el-timeline>
            </div>
            <div>
                  <el-timeline>
                      <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                          <h4>更新 Github 模板</h4>
                          <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                      </el-timeline-item>
                      <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                          <h4>更新 Github 模板</h4>
                          <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                      </el-timeline-item>
                      <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                          <h4>更新 Github 模板</h4>
                          <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                     </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        
        <div style="margin-top:20px;">
            <el-button type="primary">撮合成功</el-button>
            <el-button type="primary">撮合失败</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
             activeName: 'first',
        }
    },
    methods: {
        handleClick(){

        }
    }

}
</script>

<style lang="scss" scoped>
    .editorStep{
        .contain{
            display: flex;
            >div{
                :first-child{
                    margin-right: 10px;
                }
                flex:1
            }
        }
    }
</style>

