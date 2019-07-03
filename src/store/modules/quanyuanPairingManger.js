import {stockReserveListStockReserve,stockMatchTradeAdd,stockReserveListMatchStockSupply} from '../../api/quanyuanPairingManger'



const state = {}
const mutations = {}
  
const actions = {
stockReserveListStockReserve({commit},params){
    return new Promise((resolve, reject) => {
       stockReserveListStockReserve(params).then(response => {
       let {data} = response
       resolve(data)
       }).catch(error => {
         reject(error)
       })
     }) 
},

stockMatchTradeAdd({commit},params){
  return new Promise((resolve, reject) => {
    stockMatchTradeAdd(params).then(response => {
    let {data} = response
    resolve(data)
    }).catch(error => {
      reject(error)
    })
  }) 
},

stockReserveListMatchStockSupply({commit},params){
  return new Promise((resolve, reject) => {
    stockReserveListMatchStockSupply(params).then(response => {
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