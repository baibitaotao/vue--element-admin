<template>
  <div class="detail-page">
    <Head />
    <div class="inner">
      <Title value-title="基本信息" c-height="20" class="notes_text" data-id="1" />
      <div class="detail-content">
        <div class="button-nav">
          <el-button class="bgBtn" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button class="bgBtn" size="mini" icon="el-icon-refresh-right">刷新</el-button>
          <el-button class="bgBtn" size="mini" icon="el-icon-warning-outline">工商信息</el-button>
        </div>
        <detail />
      </div>
      <div>
        <Title value-title="信息1" c-height="20" class="notes_text" data-id="1-1" />
        <div style="height:300px;" />
      </div>
    </div>
    <div class="table-page">
      <Title value-title="股东信息" c-height="20" class="notes_text" data-id="2" />
      <div class="inner">
        <Table />
      </div>
    </div>

    <div style="background-color: #fff; margin-top:16px;">
      <Title value-title="日常维护" c-height="20" class="notes_text" data-id="3" />
      <div style="height:600px;" />
    </div>
    <!-- 右侧 -->
    <!-- <div class="category-btn" id="iebug">
    <ul id="list">
        <li class="active 1">
          <a id="1" name="section1" href="#">走访纪要</a>
          <div class="text"><span></span></div>
        </li>
        <li class="2">
          <a id="2" href="#">合同</a>
          <div class="text"><span></span></div>
        </li>
        <li>
          <a id="3" href="#">日常维护</a>
          <div class="text"><span></span></div>
        </li>
        <li>
          <a id="4" href="#">对接投资机构</a>
          <div class="text"><span></span></div>
        </li>
        <li>
          <a id="5" href="#">项目交割</a>
          <div class="text"><span></span></div>
        </li>
    </ul>
  </div> -->
    <div width="124px" class="asideMenu sidebar">
      <div id="chap_nav" class="side_nav">
        <ul v-for="NItem in menuList" :key="NItem.id" class="side_nav_level1">
          <li id="lis" class="first_li">
            <span />
            <a id="nav_a" class="menuItem" :class="{'active':NItem.isShow}">{{ NItem.name }}</a>
            <div v-if="NItem.children.length>0" class="subMenu">
              <ul v-for="subItem in NItem.children" :key="subItem.id">
                <li>
                  <span />
                  <a id="nav_a_1" :class="{'active':subItem.isShow}">{{ subItem.name }}</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--
  <div class="goodShow">
    <div class="category-btn">
      <Anchor show-ink container=".goodShow">
        <AnchorLink href="#basic_usage" title="Basic Usage" />
        <AnchorLink href="#static_position" title="Static Position" />
      </Anchor>
    </div>
    <div id="basic_usage" style="height:30rem;">12312312312</div>
    <div id="static_position" style="height:1000px;">123123123123</div>
  </div> -->
  </div>

</template>

<script>
import detail from './components/detail'
import Head from './components/header'
import Table from './components/table'
import Title from '@/components/Title/title'
import { getScrollTop, getWindowHeight, getScrollHeight } from '@/utils/srcoll-nav.js'
export default {
  components: {
    detail,
    Title,
    Head,
    Table
  },
  data() {
    return {
      menuList: [
        {
          id: '1',
          name: '基本信息',
          isShow: false,
          children: [
            {
              id: '1-1',
              name: '信息1',
              isShow: false
            }
          ]
        },
        {
          id: '2',
          name: '股东信息',
          children: []
        },
        {
          id: '3',
          name: '日常维护',
          children: []
        }
      ],
      // scroll事件
      scrollTop: '',
      scroll: ''// 存储滚动条的高度
    }
  },
  watch: {
    // scroll: function () { //用来监听data中的scroll字符串的变化
    //   this.loadSroll()
    // }
  },
  created() {
    $(function() {

    })
  },
  mounted() {
    // window.addEventListener('scroll',this.menu,false) //在mounted钩子中给window添加一个滚动监听事件
  },
  methods: {
    menu() { // 滚动监听Start
      // 获取滚动条的高度
      this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    },
    jump(index) { // 平滑滚动的方法
      this.isshow = index// 使左边导航出现相应的样式
      $('html, body').animate({ scrollTop: $('#chapter-' + index).offset().top - 160 }, { duration: 500, easing: 'swing' })
      const divArr = document.querySelectorAll('.notes_text')// 获取右边的div数组
      // chapter-50020303
      const sindex = '#chapter-' + index
      const offset = $(sindex).offset()// 获取第index个div到窗口顶部的距离
      const total = offset.top
      const distance = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset// 获取滚动条的高度(兼容三种浏览器版本)
    },
    loadSroll() {
      const menu = this.menuList
      const len = this.menuList.length
      if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
        this.menuList.forEach((item) => {
          this.$set(item, 'isShow', false)
        })
        this.$set(menu[len - 1], 'isShow', true)
        return
      }
      const divArr = document.querySelectorAll('.notes_text')// 获取右边div的数组
      console.log(divArr)
      for (var i = 0; i < divArr.length; i++) {
        if (this.scroll >= divArr[i].offsetTop - 114) { // 滚动条的高度>divArr[index].offsetTop，左边导航栏样式改变
          var OrderId = divArr[i].getAttribute('data-id') // 获取div中data-id的属性值。为了实现左边一级标题打开的效果
          console.log('OrderId==', OrderId)
          // 筛选数据高亮数据
          this.menuList.forEach((item) => {
            if (item.id == OrderId) {
              this.$set(item, 'isShow', true)
            } else {
              if (item.children.length > 0) {
                item.children.forEach((sItem) => {
                  if (sItem.id == OrderId) {
                    this.$set(sItem, 'isShow', true)
                  } else {
                    console.log('===zx===')
                    this.$set(sItem, 'isShow', false)
                  }
                })
                return
              }
              item.children.forEach((sItem) => {
                this.$set(sItem, 'isShow', false)
              })
              this.$set(item, 'isShow', false)
            }
          })
          console.log(this.menuList)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goodShow{position: relative;overflow-y: scroll;}
.active{
  color: #b40005;
}
// 侧边栏
.asideMenu{
  position: fixed;
  right:16px;
  top: 116px;
  background-color: #fff;
  width: 144px;
  box-sizing: border-box;
  padding: 0 10px;
  .side_nav_level1{
    display: flex;
    flex-direction: column;
    .menuItem{
      display: inline-block;
      padding: 14px 0;
    }
    .subMenu{
      padding-left: 14px;
    }
  }
}
.category-btn{
  position: fixed;
  right:16px;
  top: 116px;
  background-color: #fff;
  width: 144px;
  box-sizing: border-box;
  padding: 0 10px;
  ul{
    li{
      line-height: 46px;
      font-size: 18px;
      color: #333;
      padding-left: 7px;
      &+li{
        border-top: 1px dotted #f2f2f2;
      }
    }
  }
}
.detail-page{
  margin-top: 16px;
  margin-right: 160px;
  position: relative;
  .inner{
    background-color: #fff;
    .detail-content{
      padding: 0px 21px 24px 21px;
      background-color: #fff;
      .button-nav{
        padding-bottom: 15px;
      }
    }
  }
  .table-page{
    margin-top: 16px;
    background-color: #fff;
    .inner{
       padding: 0px 21px;
    }
  }
}

</style>

