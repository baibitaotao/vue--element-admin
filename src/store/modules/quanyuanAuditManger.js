import {stockDemandToReviewList,stockSupplyToReviewList,stockDemandReview,stockDemandToApproveList,stockDemandApprove,stockSupplyReview} from '../../api/quanyuanAuditManger'
import {stockSupplyToApproveList,stockDemandRemindApprove,stockSupplyApprove,stockSupplyRemindApprove} from '../../api/quanyuanAuditManger'



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

 stockDemandReview({commit},params){
  return new Promise((resolve, reject) => {
    let data = {}
    data.approveReason = params.approveReason
    data.approveResult = params.approveResult
    let id = params.userId
    stockDemandReview(data,id).then(response => {
        let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },

 stockDemandToApproveList({commit},params){
  return new Promise((resolve, reject) => {
    stockDemandToApproveList(params).then(response => {
        let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },
 
 stockDemandApprove({commit},params){
  return new Promise((resolve, reject) => {
    let data = {}
    data.approveReason = params.approveReason
    data.approveResult = params.approveResult
    let id = params.userId
    stockDemandApprove(data,id).then(response => {
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
 },

 stockSupplyReview({commit},params){
  return new Promise((resolve, reject) => {
    let data = {}
    data.approveReason = params.approveReason
    data.approveResult = params.approveResult
    let id = params.userId
    stockSupplyReview(data,id).then(response => {
        let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },

 stockSupplyToApproveList({commit},params){
  return new Promise((resolve, reject) => {
    stockSupplyToApproveList(params).then(response => {
      let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },

 stockDemandRemindApprove({commit},params){
  return new Promise((resolve, reject) => {
    stockDemandRemindApprove(params).then(response => {
      let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },
 
 stockSupplyApprove({commit},params){
  return new Promise((resolve, reject) => {
    let data = {}
    data.approveReason = params.approveReason
    data.approveResult = params.approveResult
    let id = params.userId
    stockSupplyApprove(data,id).then(response => {
        let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },

 stockSupplyRemindApprove({commit},params){
  return new Promise((resolve, reject) => {
    stockSupplyRemindApprove(params).then(response => {
      let {data} = response
      resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
 },

 
 
 

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
  }