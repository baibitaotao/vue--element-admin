import {userApprovalList,userApprovalApproval,userApprovalDetail,selectOrgUserByRoleCode,assignCustomerManager} from '../../api/userAuditManger'


const state = {}
const mutations = {}
const actions = {
  userApprovalList({commit},params){
    return new Promise((resolve, reject) => {
      userApprovalList(params).then(response => {
       let {data} = response
       resolve(data)
       }).catch(error => {
         reject(error)
       })
     }) 
  },
  userApprovalApproval({commit},params){
    return new Promise((resolve, reject) => {
      userApprovalApproval(params).then(response => {
       let {data} = response
       resolve(data)
       }).catch(error => {
         reject(error)
       })
     }) 
  },
  userApprovalDetail({commit},params){
    return new Promise((resolve, reject) => {
      userApprovalDetail(params).then(response => {
       let {data} = response
       resolve(data)
       }).catch(error => {
         reject(error)
       })
     }) 
  },
  selectOrgUserByRoleCode({commit},params){
    return new Promise((resolve, reject) => {
      selectOrgUserByRoleCode(params).then(response => {
       let {data} = response
       resolve(data)
       }).catch(error => {
         reject(error)
       })
     }) 
  },

 assignCustomerManager({commit},data){
    return new Promise((resolve, reject) => {
      assignCustomerManager(data).then(response => {
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
