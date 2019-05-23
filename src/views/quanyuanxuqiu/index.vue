<template>
<div class="quanyuanxuqiu">
    <h4>券源需求发布审核</h4>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待审核" name="first">
            <dai-shenhe></dai-shenhe>
    </el-tab-pane>
    <el-tab-pane label="已审核" name="second">
            <yi-shenhe></yi-shenhe>
    </el-tab-pane>
  </el-tabs>
</div>
 
</template>
<script>
import daiShenhe from './shenheComponent/daishenhe'
import yiShenhe from './shenheComponent/yishenhe'

  export default {
    components:{
        daiShenhe,
        yiShenhe
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
