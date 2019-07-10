/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getUserId } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
 const userId = getUserId()

 
  if (userId) {
    
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next()
      NProgress.done()
      return
    } else {
              // determine whether the user has obtained his permission roles through getInfo
              //  const hasRoles = store.getters.roles && store.getters.roles.length > 0
          // console.log(to.path)
          // next()    
          // const accessRoutes = await store.dispatch('permission/generateRoutes')
          // store.dispatch('user/setButtons', to.meta.buttons)
          // router.addRoutes(accessRoutes)
          // NProgress.done()
          // next()
          // const buttons = await store.dispatch('user/setButtons', to.meta.buttons)
          // console.log(to)
          if (to.meta.title) { // 判断当前用户是否已拉取完user_info信息 
              console.log('正常走')
              await store.dispatch('user/setButtons', to.meta.buttons)  
              next()
              return
            }{
                store.dispatch('permission/generateRoutes').then((res) => { // 根据roles权限生成可访问的路由表 
                router.addRoutes(res) // 动态添加可访问路由表 
                console.log('添加路由')
                if(res.length == 0){
                    this.$message.error('左侧菜单为空');
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                    return
                }
                next({ ...to, replace: true})
                return
                })
            }
    }
  } 
  else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }



})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// // 这个方法暂时没有用到
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
