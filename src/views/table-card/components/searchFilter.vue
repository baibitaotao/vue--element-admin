<template>
  <div class="search-filter-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目维度" name="first" />
      <el-tab-pane label="企业维度" name="second" />
    </el-tabs>
    <el-row>
      <el-col :span="24">
        <div class="search-nav">
          <div class="grid-search">
            <el-input v-model="input" class="inputWd" placeholder="请输入项目名称/企业名称/项目经理" />
            <span class="search">
              <i class="el-icon-search" />
            </span>
          </div>
          <div class="title">
            <span>全部结果   共458个项目</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-header">
        <el-button class="bgBtn" size="small" icon="el-icon-plus">新建项目</el-button>
        <el-button class="bgBtnColor" type="text" icon="el-icon-document">导出</el-button>
      </div></el-col>
    </el-row>
    <transition name="fade">
      <div class="filter-inner" :style="{borderBottom:isShow?'1px solid #d8d8d8':'0'}">
        <h2 @click="isShow = !isShow">
          {{ !isShow?'筛选条件收起':'筛选条件张开' }}
          <i v-if="!isShow" class="el-icon-arrow-up" />
          <i v-else class="el-icon-arrow-down" />
        </h2>
        <div v-if="isShow" class="filter-content">
          <el-row>
            <el-col :span="2"><div class="grid grid-title">
              时间类型：
            </div></el-col>
            <el-col :span="22" class="col-grid"><div class="grid">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="span-b" />
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid grid-title">
              管理平台：
            </div></el-col>
            <el-col :span="22" class="col-grid"><div class="grid">
              <link-tag
                v-if="arr.length>0"
                v-model="value"
                parent-id="2604"
                cmax-width="900"
                :data-arr="arr"
              />
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid grid-title">
              出资主体：
            </div></el-col>
            <el-col :span="22" class="col-grid"><div class="grid">
              <link-tag
                v-if="arr.length>0"
                v-model="value"
                parent-id="2604"
                cmax-width="900"
                :data-arr="arr1"
              />
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid grid-title">
              项目状态：
            </div></el-col>
            <el-col :span="22" class="col-grid"><div class="grid">
              <link-tag
                v-if="arr.length>0"
                v-model="value"
                parent-id="2604"
                cmax-width="900"
                :data-arr="arr"
              />
            </div></el-col>
          </el-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import linkTag from '@/components/linkTag/index'
export default {
  components: {
    linkTag
  },
  data() {
    return {
      activeName: 'second',
      input: '',
      isShow: true,
      arr: [
        { label: '博士', value: '1' },
        { label: '博士1博士1博士1博士1', value: '2' },
        { label: '博士2博士1博士1', value: '3' }
        // {label: "博士3", value: "4"},
        // {label: "博士4", value: "5"},
        // {label: "博士41", value: "6"},
        // {label: "博士42博士1博士1", value: "7"},
        // {label: "博士43博士1博士1", value: "8"},
        // {label: "博士4博士14", value: "9"},
        // {label: "博士4博士1博士15", value: "10"},
        // {label: "博士4博士1博士16", value: "11"},
        // {label: "博士47", value: "12"},
        // {label: "博士48", value: "13"},
        // {label: "博士4博士1博士19", value: "14"},
        // {label: "博士50", value: "15"}
      ],
      arr1: [
        { label: '博博士47士', value: '1' },
        { label: '博士1博士1博士1博士1', value: '2' },
        { label: '博博士47士2博士1博士1', value: '3' },
        { label: '博士47', value: '4' },
        { label: '博士4', value: '5' },
        { label: '博士43博士1博士1', value: '6' },
        { label: '博士博士1博士1', value: '7' },
        { label: '博士43博士1博士1', value: '8' },
        { label: '博士4博士14', value: '9' },
        { label: '博士4博士1博士15', value: '10' },
        { label: '博士4博士1博士16', value: '11' },
        { label: '博博士47士47', value: '12' },
        { label: '博士博士4748', value: '13' },
        { label: '博士博士474博士1博士19', value: '14' },
        { label: '博士50', value: '15' }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      value1: ''
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    isClick() {}
  }
}
</script>

<style lang="scss">
.search-filter-box{
  .el-tabs__item.is-active {
    color: #b40005;
  }
  .el-tabs__active-bar{
    background-color:#b40005;
  }
  .search-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      color: #999;
      font-size: 14px;
    }
  }
  .grid-search{
    // margin-top: 16px;
    width: 330px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    display: flex;
    .search{
      width: 45px;
      text-align: center;
      background-color: #b40005;
      color: #fff;
      cursor: pointer;
    }
    .el-input__inner{
      border: none;
      height: 28px;
      line-height: 28px;
      box-sizing: border-box;
    }
  }
  .grid-header{
    display: flex;
    justify-content: space-between;
    height: 62px;
    align-items:center;
  }
  .filter-inner{
    border-top:1px solid #d8d8d8;
    padding-bottom: 21px;
    h2{
      cursor: pointer;
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: #b40005;
      text-align: center;
      padding-top: 6px;
    }
    .filter-content{
      padding-top: 10px;
      .grid-title{
        font-size: 14px;
        color: #666;
        height: 36px;
        line-height: 36px;
      }
      .span-b{
          padding: 0 10px;
          display: inline-block;
      }
      .col-grid{}
    }
  }
  .inputWd{
    // width: 282px;
    // border: none !important;
  }
}
</style>
