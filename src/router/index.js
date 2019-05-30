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
  quanyuanxuqiu: _import('quanyuanxuqiu/index'),
  quanyuangonji: _import('quanyuangonji/index'),
  waitmatching:_import('quanyuanjiaoyi/quanyuanjiaoyi-waiting/index'),
  matching:_import('quanyuanjiaoyi/quanyuanjiaoyi-matching/index'),
  matchingFail:_import('quanyuanjiaoyi/quanyuanjiaoyi-matchingFail/index'),
  matchingSucess:_import('quanyuanjiaoyi/quanyuanjiaoyi-matchingSuccess/index'),
  userAuditManger:_import('userAuditManger/index'),
  userAdmin:_import('userAdmin/index'),
  quanyuanManger:_import('quanyuanManger/index'),
  jichushezhi:_import('jichushezhi/index'),
  gangweiguanli:_import('gangweiguanli/index'),
  bannerguanli:_import('bannerguanli/index'),
  anyue:_import('cuoheguanli/anyue'),
  peidui:_import('cuoheguanli/peidui'),
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
 */

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
    redirect: '/quanyuanxuqiu/index',
    children: [
      {
        path: 'quanyuanxuqiu',
        component: () => import('@/views/quanyuanxuqiu/index'),
        name: 'quanyuanxuqiu/index',
        meta: { title: '券源需求发布审核', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/

  chartsRouter,
  nestedRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 假设后端
// export const asyncRoutes1 = [
//   {
//     path: '/userAuditManger',
//     component: 'Layout',
//     alwaysShow: false, // will always show the root menu
//     name: 'userAuditManger',
//     meta: {
//       title: '用户审核管理',
//       icon: 'lock',
//       roles: ['admin'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'index',
//       component: 'userAuditManger',
//       name: 'userAuditManger',
//       meta: {
//         title: '用户审核管理',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },{
//     path: '/userAdmin',
//     component: 'Layout',
//     redirect: '/userAdmin/index',
//     alwaysShow: false, // will always show the root menu
//     name: 'userAdmin',
//     meta: {
//       title: 'userAdmin',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'index',
//       component: 'userAdmin',
//       name: 'userAdmin',
//       meta: {
//         title: '用户管理',
//       }
//     }]
//   },
//   {
//     path: '/quanyuanManger',
//     component: 'Layout',
//     redirect: '/quanyuanManger/index',
//     alwaysShow: false, // will always show the root menu
//     name: 'quanyuanManger',
//     meta: {
//       title: 'quanyuanManger',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'index',
//       component: 'quanyuanManger',
//       name: 'quanyuanManger',
//       meta: {
//         title: '券源管理',
//         roles: ['admin','editor'] // or you can only set roles in sub nav
//       }
//     }]
//   }, 
//   {
//     path: '/quanyuanjiaoyiguanli',
//     component: 'Layout',
//     redirect: '/quanyuanjiaoyiguanli',
//     alwaysShow: false, // will always show the root menu
//     name: 'quanyuanjiaoyiguanli',
//     meta: {
//       title: '券源交易管理',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'wait-matching',
//       component: 'waitmatching',
//       name: 'wait-matching',
//       meta: {
//         title: '交易进度-待撮合',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     },
//     {
//       path: 'matching',
//       component: 'matching',
//       name: 'matching',
//       meta: {
//         title: '交易进度-撮合中',
//         roles: ['admin']
//       // if do not set roles, means: this page does not require permission
//       }
//     }, {
//       path: 'matching-success',
//       component: 'matchingSucess',
//       name: 'matching-success',
//       meta: {
//         title: '交易进度-撮合成功',
//         roles: ['admin']
//       }
//      },{
//       path: 'matching-fail',
//       component: 'matchingFail',
//       name: 'matching-fail',
//       meta: {
//         title: '交易进度-撮合失败',
//         roles: ['admin']
//       }
//      }]
//     },
//   {
//     path: '/quanyuanxuqiu',
//     component: 'Layout',
//     name: 'quanyuanxuqiu',
//     meta: {
//       title: 'quanyuanxuqiu',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'index',
//       component: 'quanyuanxuqiu',
//       name: 'quanyuanxuqiu',
//       meta: {
//         title: '券源需求发布审核',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   }, {
//     path: '/quanyuangonji',
//     component: 'Layout',
//     redirect: '/quanyuangonji/index',
//     alwaysShow: false, // will always show the root menu
//     name: 'quanyuangonji',
//     meta: {
//       title: 'quanyuangonji',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'index',
//       component: 'quanyuangonji',
//       name: 'quanyuangonji',
//       meta: {
//         title: '券源供给发布审核',
//         roles: ['admin'] // or you can only set roles in sub nav
//         }
//       }]
//     },
//     {
//       path: '/jichushezhi',
//       component: 'Layout',
//       redirect: '/jichushezhi/index',
//       alwaysShow: true, // will always show the root menu
//       meta: {
//         title: '基础设置',
//         icon: 'lock',  
//         },
//       children: [{
//         path: 'index',
//         component: 'jichushezhi',
//         name: 'jichushezhi',
//         meta: {
//           title: '基础设置',
//           }
//         }]
//       },
//       {
//         path: '/gangweiguanli',
//         component: 'Layout',
//         redirect: '/gangweiguanli/index',
//         alwaysShow: true, // will always show the root menu
//         meta: {
//           title: '岗位管理',
//           icon: 'lock',  
//           },
//         children: [{
//           path: 'index',
//           component: 'gangweiguanli',
//           name: 'gangweiguanli',
//           meta: {
//             title: '岗位管理',
//             }
//           }]
//         },{
//         path: '/bannerguanli',
//         component: 'Layout',
//         redirect: '/bannerguanli/index',
//         alwaysShow: true, // will always show the root menu
//         meta: {
//           title: 'banner图管理',
//           icon: 'lock',  
//           },
//         children: [{
//           path: 'index',
//           component: 'bannerguanli',
//           name: 'bannerguanli',
//           meta: {
//             title: 'banner图管理',
//             }
//           }]

//         },

//   { path: '*', redirect: '/404', hidden: true }
// ]


export const asyncRoutes1 = [ 
  {
    path: '/cuoheguanli',
    component: 'Layout',
    redirect: '/cuoheguanli/anyue',
    alwaysShow: false, // will always show the root menu
    name: 'cuoheguanli',
    meta: {
      title: 'userAdmin',
      icon: 'lock',
    },
    children: [{
      path: 'anyue',
      component: 'anyue',
      name: 'anyue',
      meta: {
        title: '券源按约分配管理',
      }
    },
    {
      path: 'abc',
      component: 'anyue',
      name: 'userAdmin',
      meta: {
        title: '券源配对管理',
      }
    }]
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
