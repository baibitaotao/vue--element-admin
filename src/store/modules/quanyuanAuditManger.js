import {stockDemandToReviewList,stockSupplyToReviewList} from '../../api/quanyuanAuditManger'



const state = {}
const mutations = {}
  
const actions = {
    stockDemandToReviewList({commit},params){
        return new Promise((resolve, reject) => {
        stockDemandToReviewList(params).then(response => {
            let {data} = response
          resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
 },



 stockSupplyToReviewList({commit},params){
  return new Promise((resolve, reject) => {
    stockSupplyToReviewList(params).then(response => {
        let {data} = response
      resolve(data)
      }).catch(error => {
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