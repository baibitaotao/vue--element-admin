import {getStockSupplyList,stockSupplyInfo,stockSelectByKeyWord,stockSupplyAdd,stockSupplyUpdate} from '../../api/quanyuangonjiManger'
import {getStockDemandList,stockDemandInfo,stockDemandUpdate} from '../../api/quanyuangonjiManger'

const state = {}
const mutations = {}
  
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
    getStockDemandList({commit},params){
           return new Promise((resolve, reject) => {
            getStockDemandList(params).then(response => {
               let {data} = response
             resolve(data)
             }).catch(error => {
               reject(error)
             })
           })
    },
    stockSupplyInfo({commit},supplyId){
      return new Promise((resolve, reject) => {
        stockSupplyInfo(supplyId).then(response => {
          resolve(response.data)
        }).catch(err => {
          reject('获取详情接口' + err)
        })
      })
    },
    stockDemandInfo({commit},demandId){
      return new Promise((resolve, reject) => {
        stockDemandInfo(demandId).then(response => {
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
    },
    stockDemandUpdate({commit},payload){
      return new Promise((resolve, reject) => {
        stockDemandUpdate(payload.demandId,payload.dto).then(response => {
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
  