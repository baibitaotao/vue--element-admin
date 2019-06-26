import {stockReserveListStockReserve} from '../../api/quanyuanPairingManger'



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
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
  }