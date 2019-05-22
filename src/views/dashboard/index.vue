<template>
  <div class="dashboard-container">
    <div class="search">  
      <el-input v-model="input" placeholder="请输入标题" style="margin-right:5px"></el-input> 
      <el-button type="danger" icon="el-icon-search"></el-button>    
    </div>
    <el-divider></el-divider>
    <p class="serchCondition"><span @click="isShowCondition">{{showCondition}}&nbsp;<i :class="showConditionIcon"></i></span></p>
    
    <transition name="fade">
    <div class="condition" v-if='showcondationDh'>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <div class="postStatus">
        <span class="postStatustext">发布状态</span>
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="草稿"></el-radio-button>
          <el-radio-button label="发布中"></el-radio-button>
          <el-radio-button label="已下架"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
</transition>
<el-button style="margin-top:10px">新建</el-button>
<el-button style="margin-top:10px">删除</el-button>
<my-table></my-table>

  </div>
</template>

<script>

import myTable from './table/index'

export default {
  data () {
    return {
      input:'',
      value1:'',
      radio1: '上海',
      showcondationDh:false,
      showCondition:'筛选条件展开',
      showConditionIcon:'el-icon-arrow-down'
    }
  },
  methods: {
     isShowCondition(){
       this.showcondationDh = !this.showcondationDh
       if(this.showCondition === '筛选条件展开' && this.showConditionIcon === 'el-icon-arrow-down'){
         this.showCondition =  '筛选条件收起'
         this.showConditionIcon = 'el-icon-arrow-up'
       }
       else{
         this.showCondition =  '筛选条件展开'
         this.showConditionIcon = 'el-icon-arrow-down'
       }
     } 
  },
  components: {
    myTable
  }

}
</script>


<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}


$main-color : #B40005;

.dashboard-container{
  .search{
    display: flex;
    justify-content:flex-start; 
  }
  .serchCondition{
    text-align: center;
    font-size: 12px;
    color:$main-color;
    span{
      cursor: pointer;
    }
  }

}


</style>


<style lang="scss">
$main-color : #B40005;
.dashboard-container{
.el-input__inner{
  width:200px;
}
.condition{
  .el-input__inner{
    width:400px;
  }
  .postStatus{
    height:40px;
    margin-top: 12px;
    display: flex;
    align-items:Center;
    .is-active{
      .el-radio-button__inner{
        border-radius: 4px;
      }
      span{
        background: #409EFF!important;
        color: #fff;
      }
    }
    label{
      margin-bottom: 0px;
      margin-right: 20px;
      .el-radio-button__inner{
         background: #f2f2f2;
      }
    .el-radio-button__inner:hover{
       color:#fff 
    }
      span{
        color:$main-color;
        font-size: 12px;
        border:0;
      }
    }
    .postStatustext{
      color:#666;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
.el-input{
  width:auto;
}
.el-divider{
  margin-bottom: 0px;
}

}

</style>



