<template>
<div class="quanyuangonji">
    <h4>券源供给发布审核</h4>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="isShowshenhe">
    <el-tab-pane label="待审核" name="first">
            <dai-shenhe></dai-shenhe>
    </el-tab-pane>
    <el-tab-pane label="已审核" name="second">
            <yi-shenhe></yi-shenhe>
    </el-tab-pane>
  </el-tabs>

   <div class="userComponent" v-if = '!isShowshenhe' style="margin-top:10px">
      <user-component></user-component>
  </div>

</div>
 
</template>
<script>
import daiShenhe from './shenheComponent/daishenhe'
import yiShenhe from './shenheComponent/yishenhe'
import userComponent from './userComponent/index'
import {mapGetters} from 'vuex'

  export default {
    components:{
        daiShenhe,
        yiShenhe,
        userComponent
    },
    computed:{
     ...mapGetters([
     'roles'
       ]),
     isShowshenhe(){
      if(this.roles[0] === 'admin'){
        return false
      }
      else if(this.roles[0] === '业务管理员'){
        return true
       }
      }
    },
    filters: {
      
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
  }
</script>
