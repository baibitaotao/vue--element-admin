<template>
    <div style="display:inline-block">
           <el-radio-group v-model="radio3" size="medium">
              <el-radio-button label="全部" ></el-radio-button>
              <el-radio-button label="待审核" ></el-radio-button>
              <el-radio-button label="正常"></el-radio-button>
              <el-radio-button label="禁用"></el-radio-button>
            </el-radio-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            radio3:'全部'
        }
    }
}
</script>
