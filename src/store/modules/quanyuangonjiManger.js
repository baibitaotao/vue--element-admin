import {getStockSupplyList,getStockDetails,stockSelectByKeyWord,stockSupplyAdd,stockSupplyUpdate} from '../../api/quanyuangonjiManger'


const state = {
   
  }
  
  const mutations = {
    
  }
  
  const actions = {
    getStockSupplyList({commit},params){
             return new Promise((resolve, reject) => {
                getStockSupplyList(params).then(response => {
                  let {data} = response
                resolve(data)
                }).catch(error => {
                  reject(error)
                })
              }) 
    },
    getStockDetails({commit},supplyId){
      return new Promise((resolve, reject) => {
        getStockDetails(supplyId).then(response => {
          resolve(response.data)
        }).catch(err => {
          reject('获取详情接口' + err)
        })
      })
    },
    stockSelectByKeyWord({commit},abc){
      return new Promise((resolve, reject) => {
        stockSelectByKeyWord(abc).then(response => {
          resolve(response.data)
        }).catch(err => {
          reject('获取详情接口' + err)
        })
      })
    },
    stockSupplyAdd({commit},data){
      return new Promise((resolve, reject) => {
        stockSupplyAdd(data).then(response => {
          resolve(response.data)
        }).catch(err => {
          reject('获取详情接口' + err)
        })
      })
    },

    stockSupplyUpdate({commit},payload){
      return new Promise((resolve, reject) => {
        stockSupplyUpdate(payload.supplyId,payload.dto).then(response => {
          resolve(response.data)
        }).catch(err => {
          reject('获取详情接口' + err)
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
  