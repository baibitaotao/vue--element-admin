import {getStockSupplyList} from '../../api/quanyuangonjiManger'


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
            
    }
    
  
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  