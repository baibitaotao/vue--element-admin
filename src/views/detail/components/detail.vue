<template lang="html">
  <div>
    <div class="table-P1-view">
      <div class="item_view">
        <div class="item">
          <div class="left">企业全称* </div>
          <div class="right">企业全称</div>
        </div>
        <div class="item">
          <div class="left">保密等级</div>
          <div class="right">保密等级</div>
        </div>
      </div>
      <div class="item_view">
        <div class="item">
          <div class="left">统一社会信用代码*</div>
          <div class="right">统一社会信用代码</div>
        </div>
        <div class="item">
          <div class="left">组织机构代码*	 </div>
          <div class="right">组织机构代码</div>
        </div>
      </div>
      <div class="item_view">
        <div class="item">
          <div class="left">企业阶段</div>
          <div class="right">企业阶段</div>
        </div>
        <div class="item">
          <div class="left">所属行业</div>
          <div class="right">所属行业</div>
        </div>
      </div>
      <div class="editItem">
        <div class="left">主营业务</div>
        <div class="right"> <p>餐饮服务;蛋糕制售;饮品店;预包装食品的销售;室内外装饰装修工程的设计、施工;普通货物运输(不含危险化学品);餐饮管理;酒店管理;会议服务;企业形象策划;商务信息咨询;企业管理咨询;办公用品及设备、酒店用品、农副产品、厨房用品、日用百货、工艺礼品、服饰服装、儿童游乐设施、电动玩具的销售。(依法须经批准的项目,经相关部门批准后方可开展经营活动)</p> </div>
      </div>
      <div class="editItem">
        <div class="left">企业简介</div>
        <div class="right"><p /></div>
      </div>
      <!-- :style="{borderWidth:cborderWidth +'px',borderTopStyle:cborderStyle,borderColor:cborderColor}" -->
      <div class="item_view">
        <div class="item">
          <div class="left">联系人</div>
          <div class="right">联系人</div>
        </div>
        <div class="item">
          <div class="left">手机</div>
          <div class="right">手机</div>
        </div>
      </div>
      <div class="editItem">
        <div class="left">注册地址</div>
        <div class="right"><p>注册地址</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import { projInfoDetailApp } from '@/api/ei-web/project'
export default {
  components: {

  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      alert('123')
      // projInfoDetailApp().then(response => {
      //   alert('123')
      //   const data = response.data

      //   // var asyncRouterMap = generateAsyncRouter(routerMap, serverRouterMap)

      //   // console.log('==asyncRouterMap-123==')
      //   // console.log(asyncRouterMap)
      //   // if (roles.indexOf('admin') >= 0) {
      //   //   accessedRoutes = asyncRouterMap || []
      //   // } else {
      //   //   accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      //   // }
      //   // console.log('accessedRoutes-123--')
      //   // console.log(accessedRoutes)
      //   // commit('SET_ROUTES', accessedRoutes)
      //   // resolve(accessedRoutes)
      // })
    }

  }
}
</script>

