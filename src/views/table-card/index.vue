<template>
  <div class="table-card-contanier">
    <!-- filter-top -->
    <div class="header-filter">
      <search-filter />
    </div>
    <!-- <titleAddBtn :addBtnList="addBtnList" @clkCallBk="listenCall"/> -->
    <div>
      <cardRow v-for="(item,index) in tableData" :key="index" :data="item" :column="columnData" class="card-item" @mouseover.native="changeActive(item)" @mouseout.native="removeActive(item)">
        <div class="tip" :style="{top:item.active?'74px':'100px'}">
          <img v-if="!item.active" src="@/assets/layout/card-left-1.png" alt="">
          <div class="tip-buttom" :class="{'bounceInLeft':item.active}">
            <div class="button">项目信息</div>
            <div class="button">企业信息</div>
          </div>
        </div>
      </cardRow>
    </div>
    <el-row>
      <el-col :span="24"><div class="grid-pagination">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="prev, pager, next, total, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import cardRow from '@/components/card-row/index'
import mixins from './mixins/index.js'
import searchFilter from './components/searchFilter'
import titleAddBtn from './components/titleAddBtn'
export default {
  components: {
    cardRow,
    searchFilter,
    titleAddBtn
  },
  mixins: [mixins],
  data() {
    return {
      hoverIndex: -1,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    listenCall(methodsWords) {
      console.log('methodsWords', methodsWords)
      this[methodsWords]()
    },
    addItem() {
      console.log(1)
    },
    addItem2() {
      console.log(1)
    },
    addItem3() {
      console.log(3)
    },
    changeActive(item) {
      var _this = this
      this.$nextTick(function() {
        this.tableData.forEach(function(item) {
          _this.$set(item, 'active', false)
        })
        this.$set(item, 'active', true)
      })
    },
    removeActive(item) {
      this.$set(item, 'active', false)
    },
    selectStyle(item) {
      var _this = this
      this.$nextTick(function() {
        this.items.forEach(function(item) {
          _this.$set(item, 'active', false)
        })
        this.$set(item, 'active', true)
      })
    }
  }
}
</script>

<style lang="scss">
  // .card-item:last-child{
  //   background-color: red;
  // }
// @import '../../styles/animate.scss';
.table-card-contanier{
  margin-top: 15px;
  padding-bottom: 24px;
  background-color: #fff;

  .card-item{
    padding: 16px 0 21px 0;
    margin: 0 19px 0 22px;
    position: relative;
    &:last-child{
     border-bottom: 1px solid #d8d8d8;
    }
    &:hover .tip img{
      display: none;
    }
    &+.card-item{
      border-top: 1px solid #d8d8d8;
    }

    .tip{
      position: absolute;
      right: 0;
      img{
        margin-left: 100px
      }
    }
  }
  .tip-buttom{
    opacity: 0;
    .button{
      width: 82px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      color: #b40005;
      border: 1px solid #b40005;
      border-radius: 4px;
      cursor: pointer;
      &+.button{
        margin-top: 10px;
      }
    }
  }
  .header-filter{
    padding: 10px 0 0 0;
    margin: 0 19px 0 22px;
  }

}

@keyframes bounceInLeft {

  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }

  60% {
    opacity: 1;
    // -webkit-transform: translate3d(25px, 0, 0);
    // transform: translate3d(25px, 0, 0);
  }

  75% {
    // -webkit-transform: translate3d(-10px, 0, 0);
    // transform: translate3d(-10px, 0, 0);
  }

  90% {
    // -webkit-transform: translate3d(5px, 0, 0);
    // transform: translate3d(5px, 0, 0);
  }

  to {
    // -webkit-transform: translate3d(0, 0, 0);
    // transform: translate3d(0, 0, 0);

  }
}

.bounceInLeft {
  // animation:bounceInLeft 3s 1;
  opacity:1 !important;
}

</style>
