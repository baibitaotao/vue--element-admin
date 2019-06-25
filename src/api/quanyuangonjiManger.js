import request from '@/utils/request'
  
export function getStockSupplyList(params) {
    return request({
      url: '/stockSupply/List',
      method: 'get',
      params
    })
  }

  export function getStockDemandList(params) {
    return request({
      url: `/stockDemand/list`,
      method: 'get',
      params
    })
  }   

  export function stockSupplyInfo(params) {
    return request({
      url: `/stockSupply/info/${params}`,
      method: 'get',
    })
  }
  export function stockDemandInfo(params) {
    return request({
      url: `/stockDemand/info/${params}`,
      method: 'get',
    })
  }


  export function stockSelectByKeyWord(params) {
    return request({
      url: `/stock/selectByKeyWord`,
      method: 'get',
      params
    })
  } 

  
  export function stockSupplyAdd(data) {
    return request({
      url: `/stockSupply/add`,
      method: 'post',
      data
    })
  } 

    
  export function stockSupplyUpdate(supplyId,data) {
    return request({
      url: `/stockSupply/update/${supplyId}`,
      method: 'put',
      data
    })
  } 

  export function stockDemandUpdate(demandId,data) {
    return request({
      url: `/stockDemand/update/${demandId}`,
      method: 'put',
      data
    })
  } 


