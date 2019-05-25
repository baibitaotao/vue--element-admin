<template>
    <div class="editorStep">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="融入方客户经理撮合进度" name="first" style="height:200px">
                    <el-steps direction="vertical" :active="2" finish-status="success">
                            <el-step title="撮合进度1" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="撮合进度3"></el-step>
                            <el-step title="撮合进度2" description="这段就没那么长了"></el-step>
                     </el-steps>
            </el-tab-pane>
            <el-tab-pane label="融出方客户经理撮合进度" name="second" style="height:200px">
                    <el-steps direction="vertical" :active="2" finish-status="success">
                            <el-step title="撮合进度1" description="这是一段很长很长很长的描述性文字"></el-step>
                            <el-step title="撮合进度3"></el-step>
                            <el-step title="撮合进度2" description="这段就没那么长了"></el-step>
                     </el-steps>
            </el-tab-pane>
          </el-tabs>
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
