import axios from 'axios'

import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import { Loading } from 'element-ui';

// create an axios instance
// baseURL: 'http://172.29.201.223:8077/smt-admin',
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  baseURL: '/smt-admin',
  // baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
})


// request interceptor
var loadingInstance 
service.interceptors.request.use(
  
  config => {
    // Do something before request is sent
    // if (store.getters.USER_ID) {
    //   loadingInstance = Loading.service({
    //     fullscreen: true,
    //     lock:true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    // }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(res => {
  // if (store.getters.USER_ID) {
  //     loadingInstance.close()
  // }
  if(res.status !== 200){
    console.log(res)
    Message({
      message:'error:' + res.status,
      type: 'error',
      duration: 3 * 1000
    })
    return
  }
  if(res.data.status !== '0'){
        Message({
           message: res.data.msg || 'error',
           type: 'error',
           duration: 3 * 1000
         })
      }
    return res
})


// service.interceptors.response.use(res => {
//   console.log(res)
// })

// response interceptor
  // service.interceptors.response.use(
  //   /**
  //    * If you want to get information such as headers or status
  //    * Please return  response => response
  //    */
  //   /**
  //    * 下面的注释为通过在response里，自定义code来标示请求状态
  //    * 当code返回如下情况则说明权限有问题，登出并返回到登录页
  //    * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
  //    * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
  //    */
  //   response => {
  //     const res = response.data
    
  //     if (res.code !== 20000) {
        
  //       Message({
  //         message: res.message || 'error',
  //         type: 'error',
  //         duration: 5 * 1000
  //       })

  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        
  //         // 请自行在引入 MessageBox
  //         // import { Message, MessageBox } from 'element-ui'
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('user/resetToken').then(() => {
  //             location.reload() // 为了重新实例化vue-router对象 避免bug
  //           })
  //         })
          
  //       }
  //       return Promise.reject(res.message || 'error')
  //     } else {
        
  //       return res
  //     }
  //   },
  //   error => {
    
  //     console.log('err' + error) // for debug
  //     Message({
  //       message: error.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     return Promise.reject(error)
  //   }
  // )

export default service
