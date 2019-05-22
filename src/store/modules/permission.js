/* eslint-disable no-unused-vars */
import { asyncRoutes, constantRoutes, routerMap, asyncRoutes1 } from '@/router'
import { serverRouterMap, getRoles } from '@/api/role'

import { ayscRouterMap } from '@/api/router'

const _import = require('../../router/_import_' + process.env.NODE_ENV) // 获取组件的方法
import Layout from '@/layout' // Layout 是架构组件，不在后台返回，在文件里单独引入

// 将本地routerMap映射到ajax获取到的serverRouterMap;
function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach((item, index) => {
    // 这个地方
    item.component = routerMap[item.component]
    console.log('item.component', item.component)
    if (item.children && item.children.length > 0) {
      generateAsyncRouter(routerMap, item.children)
    }
  })
  return serverRouterMap
}

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

/**
 * Use meta.role to determine if the current user has permission
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 按递归筛选异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log('==routes==')
    console.log(routes)
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // console.log('===accessedRoutes123===')
      // console.log(accessedRoutes)
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)

      // actions中GenerateRoutes方法合适的地方将后端请求的路由表映射到routerMap,
      // 并筛选出可访问的路由,serverRouterMap是我定义的从后台请求路由表的方法
      // serverRouterMap().then(response => {
      //   const serverRouterMap = response.data

      //   var asyncRouterMap = generateAsyncRouter(routerMap, serverRouterMap)

      //   console.log('==asyncRouterMap-123==')
      //   console.log(asyncRouterMap)
      //   if (roles.indexOf('admin') >= 0) {
      //     accessedRoutes = asyncRouterMap || []
      //   } else {
      //     accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      //   }
      //   console.log('accessedRoutes-123--')
      //   console.log(accessedRoutes)
      //   commit('SET_ROUTES', accessedRoutes)
      //   resolve(accessedRoutes)
      // })

      setTimeout(() => {
        console.log('==ayscRouterMap 123==')
        console.log(asyncRoutes1)

        const serverRouterMap = asyncRoutes1

        const asyncRouterMap = generateAsyncRouter(routerMap, serverRouterMap)
        if (roles.indexOf('admin') >= 0) {
          accessedRoutes = asyncRouterMap || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
        }

        commit('SET_ROUTES', asyncRouterMap)
        resolve(asyncRouterMap)
      }, 1000)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
