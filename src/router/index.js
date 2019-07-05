import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 获取组件的方法
const _import = require('./_import_' + process.env.NODE_ENV)


/* Layout */
import Layout from '@/layout'

export const routerMap = {
  Table: _import('table-card/index'),
  Table1: _import('detail/index'),
  Table3: _import('anchor/index'),
  Layout: Layout,
  page: _import('permission/page'),
  directive: _import('permission/directive'),
  role: _import('permission/role'),
  Steps: _import('steps/index'),
  matching:_import('quanyuanjiaoyi/quanyuanjiaoyi-matching/index'),
  userAuditManger:_import('userAuditManger/index'),

  permissionsManger:_import('systemManger/permissionsManger'),
  rolesManger:_import('systemManger/rolesManger'),
  userManger:_import('systemManger/userManger'),

  quanyuangonjiManger:_import('quanyuanManger/quanyuangonji/index'),
  quanyuanxuqiuManger:_import('quanyuanManger/quanyuanxuqiu/index'),
  // jichushezhi:_import('jichushezhi/index'),
  adminManger:_import('gangweiguanli/adminManger'),
  mangerManger:_import('gangweiguanli/mangerManger'),
  // bannerguanli:_import('bannerguanli/index'),
  accountManagerManagement:_import('accountManagerManagement/index'),
  gonjiAuditManger:_import('quanyuanAuditManger/quanyuangonji/index'),
  xuqiuAuditManger:_import('quanyuanAuditManger/quanyuanxuqiu/index'),
  appointmentPairing:_import('quanyuanPairingManger/appointmentPairing/index'),
  aKeyPairing:_import('quanyuanPairingManger/aKeyPairing/index'),
  MyStockSupply:_import('leftSideList/myStockmanger/myStockSupply/index'),
  MyStockReserve:_import('leftSideList/myStockmanger/MyStockReserve/index'),
  MyStockDelLog:_import('leftSideList/myStockmanger/MyStockDelLog/index'),
  BanerManger:_import('leftSideList/systemSet/BanerManger/index'),
  basicalSet:_import('leftSideList/systemSet/basicalSet/index'),
  baobiao:_import('leftSideList/baobiaoManger/baobiao/index'),
  functionMeanueManger:_import('leftSideList/systemManger/functionMeanueManger/index'),
  roleManger:_import('leftSideList/systemManger/roleManger/index'),
  roleRelationshipManger:_import('leftSideList/systemManger/roleRelationshipManger/index'),
  userManger:_import('leftSideList/systemManger/userManger/index'),
  loginLog:_import('leftSideList/systemLog/loginLog/index'),
  operationLog:_import('leftSideList/systemLog/operationLog/index'),
  // systemLog:_import('systemLog/index'),
  // quanyuanDelQuery:_import('reportManger/quanyuanDealQuery'),
  // quanyuanGonjiQuery:_import('reportManger/quanyuanGonjiQuery'),
  // quanyuanXuqiuQuery:_import('reportManger/quanyuanXuqiuQuery'),
  // ronruQuery:_import('reportManger/ronruQuery'),
  // ronchuQuery:_import('reportManger/ronchuQuery'),
  // quanyuanAppointmentQuery:_import('reportManger/quanyuanAppointmentQuery'),
  // mangerQuery:_import('reportManger/mangerQuery'),
}


/* Router Modules */

import chartsRouter from './modules/charts'
import nestedRouter from './modules/nested'

  /**
       * Note: sub-menu only appear when route children.length >= 1
       * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
       *
       * hidden: true                   if set true, item will not show in the sidebar(default is false)
       * alwaysShow: true               if set true, will always show the root menu
       *                                if not set alwaysShow, when item has more than one children route,
       *                                it will becomes nested mode, otherwise not show the root menu
       * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
       * name:'router-name'             the name is used by <keep-alive> (must set!!!)
       * meta : {
          roles: ['admin','editor']    control the page roles (you can set multiple roles)
          title: 'title'               the name show in sidebar and breadcrumb (recommend set)
          icon: 'svg-name'             the icon show in the sidebar
          noCache: true                if set true, the page will no be cached(default is false)
          affix: true                  if set true, the tag will affix in the tags-view
          breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
          activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
        }
 *  /

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userAuditManger/userAuditManger',
    hidden: true,
  },

]




// 假设后端
export const asyncRoutes1 = [
  {
    path: '/userAuditManger',
    component: 'Layout',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '用户审核管理',
      icon: 'lock',
    },
    children: [{
      path: 'index',
      component: 'userAuditManger',
      meta: {
        title: '用户审核管理',
        roles: ['admin','manger'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/quanyuanManger',
    component: 'Layout',
    redirect: '/quanyuanManger/index',
    alwaysShow: false, // will always show the root menu
    meta: {
      title: 'quanyuanManger',
      icon: 'lock',
    },
    children: [{
      path: 'index',
      component: 'quanyuangonjiManger',
      meta: {
        title: '券源管理',
        roles: ['admin','ronchu'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/quanyuanAuditManger',
     component: 'Layout',
     meta: {
       title: '券源审核管理',
       icon: 'lock',
     },
     children: [{
       path: 'xuqiuAuditManger',
       component: 'xuqiuAuditManger',
       meta: {
         title: '券源需求审核管理',
         roles: ['manger'] // or you can only set roles in sub nav
       }
     },{
       path:'gonjiAuditManger',
       component:'gonjiAuditManger',
       meta:{
         title:'券源供给审核管理',
         roles:['manger']
       }
     }]
  },
  {
    path: '/quanyuanPairingManger',
    component: 'Layout',
    redirect: '/quanyuanPairingManger/appointmentPairing',
    alwaysShow: false, 
    meta: {
      title: '券源撮合管理',
      icon: 'lock',
    },
    children: [{
      path: 'appointmentPairing',
      component: 'appointmentPairing',
      meta: {
        title: '预约撮合管理',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'aKeyPairing',
      component: 'aKeyPairing',
      meta: {
        title: '中介撮合一键配对',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }  
  ]
  }, 
  {
    path: '/quanyuanjiaoyiguanli',
    component: 'Layout',
    redirect: '/quanyuanjiaoyiguanli/matching',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '券源交易管理',
      icon: 'lock',
    },
    children: [
    {
      path: 'matching',
      component: 'matching',
      meta: {
        title: '券源交易管理',
        roles: ['admin']
      }
    }]
    },

    {
      path: '/baobiaoManger',
      component: 'Layout',
      alwaysShow: true, // will always show the root menu
      meta: {
        title: '券源交易管理',
        icon: 'lock',
      },
      children: [
      {
        path: 'BanerManger',
        component: 'BanerManger',
        meta: {title: '券源交易管理'}
      },
      {
        path: 'basicalSet',
        component: 'basicalSet',
        meta: {title: '券源交易管理'}
      },
      {
        path: 'MyStockDelLog',
        component: 'MyStockDelLog',
        meta: {title: '券源交易管理'}
      }
    ]
      },



  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // base: '/app/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

