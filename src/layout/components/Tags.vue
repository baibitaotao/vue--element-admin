<template>
  <div v-if="showTags" class="tags">
    <!-- swiper 暂时不做 -->
    <!-- <swiper :options="swiperOption">
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 4</swiper-slide>
          <swiper-slide>Slide 5</swiper-slide>
          <swiper-slide>Slide 6</swiper-slide>
          <swiper-slide>Slide 7</swiper-slide>
          <swiper-slide>Slide 8</swiper-slide>
          <swiper-slide>Slide 9</swiper-slide>
          <swiper-slide>Slide 10</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper> -->
    <ul>
      <li v-for="(item,index) in tagsList" :key="index" class="tags-li" :class="{'active': isActive(item.path)}">
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
        <span class="border-bottom" />
        <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close" /></span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini">
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" size="small">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import bus from './bus'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      tagsList: [],
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },

  computed: {
    showTags() {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.hash) {
        return
      }
      console.log('newValue==', newValue)
      this.setTags(newValue)
    }
  },
  created() {
    this.setTags(this.$route)
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i]
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path)
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path)
          } else {
            this.$router.push('/')
          }
          this.tagsList.splice(i, 1)
          break
        }
      }
    })
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = []
      this.$router.push('/')
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.tagsList = curItem
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList)
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  }
}

</script>

<style lang='scss' scope>
    .tags {
      position: relative;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      background: #fff;
      padding-right: 78px;
      // box-shadow: 0 5px 10px #ddd;
      .swiper-container{
        height: 100%;
      }
      .swiper-wrapper{
        display: flex;
      }
      .swiper-slide {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        width: 140px !important;
      }
    }

    .tags ul {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      padding-left: 40px;
    }

    .tags-li {
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        background: #fff;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
        width: 140px;
        position: relative;
        box-sizing: border-box;
        padding-left: 14px;
        border-left: 1px solid #ccc;
        // & +.tags-li{
        //   border-left: 1px solid #ccc;
        // }
        &.tags-li:last-child{
          border-right: 1px solid #ccc;
        }
    }

    .tags-li:not(.active):hover {
        background: #f2f2f2;
    }

    .tags-li.active {
      background: #f2f2f2;
      .border-bottom{
        width: 100%;
        height:3px;
        background-color: #b40005;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    .tags-li-title {
        float: left;
        width:100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        /* color: #fff; */
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        // box-sizing: border-box;
        // padding-top: 1px;
        // text-align: center;
        // width: 110px;
        // height: 30px;
        // background: #fff;
        // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        // z-index: 10;
        .el-button{
          height: 40.5px;
          border-left: 1px solid rgb(205, 205, 205) !important;
          border: none;
          border-radius: 0;
        }
    }
    .tags-li-icon{
      position: absolute;
      right:5px;
      top: 3px;
      i{
        font-size:18px;
      }
    }

</style>
