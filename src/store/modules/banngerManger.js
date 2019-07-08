import {bannerList,bannerAdd,bannerDetail,bannerUpdate,bannerDelete} from '@/api/banngerManger'


const state = {}
const mutations = {}

const actions = {

  bannerList({commit},params){
    return new Promise((resolve,reject) => {
        bannerList(params).then(res => {
        resolve(res.data)
        }).catch(err => {
        reject(error)
      })
    })       
  },

  bannerAdd({commit},data){
    return new Promise((resolve,reject) => {
      bannerAdd(data).then(res => {
      resolve(res.data)
      }).catch(err => {
      reject(error)
      })
      })
    },

    bannerDetail({commit},data){
      return new Promise((resolve,reject) => {
        bannerDetail(data).then(res => {
        resolve(res.data)
        }).catch(err => {
        reject(error)
        })
        })
      },
      
      bannerUpdate({commit},data){
      return new Promise((resolve,reject) => {
        bannerUpdate(data).then(res => {
        resolve(res.data)
        }).catch(err => {
        reject(error)
        })
        })
      },
      bannerDelete({commit},data){
        return new Promise((resolve,reject) => {
          bannerDelete(data).then(res => {
          resolve(res.data)
          }).catch(err => {
          reject(error)
          })
          })

      }


    }  

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
