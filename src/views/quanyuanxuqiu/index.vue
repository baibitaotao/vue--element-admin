<template>
<div class="quanyuanxuqiu">
    <h4>{{roles|quanyuanTitle}}</h4>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if = 'isShowshenhe'>
    <el-tab-pane label="待审核" name="first">
            <dai-shenhe></dai-shenhe>
    </el-tab-pane>
    <el-tab-pane label="已审核" name="second">
            <yi-shenhe></yi-shenhe>
    </el-tab-pane>
  </el-tabs>
  <div v-if = '!isShowshenhe' style="margin-top:10px">
      <user-component></user-component>
  </div>
</div>
 
</template>
<script>
import daiShenhe from './shenheComponent/daishenhe'
import yiShenhe from './shenheComponent/yishenhe'
import userComponent from './guanliyuanComponent/index'
import {mapGetters} from 'vuex'

  export default {
    components:{
        daiShenhe,
        yiShenhe,
        userComponent
    },
    filters: {
      quanyuanTitle(val){
        if(val[0] === 'admin'){
          return '券源需求发布审核'
        }
        else if(val[0] === '业务管理员'){
          return '券源需求审核'
        }
      } 
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        
      }
    }, 
  computed: {
    ...mapGetters([
      'roles'
    ]),
    isShowshenhe(){
      if(this.roles[0] === 'admin'){
        return true
      }
      else if(this.roles[0] === '业务管理员'){
        return false
      }
    }  
  },
  };
</script>
