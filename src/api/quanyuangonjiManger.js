import request from '@/utils/request'
  
export function getStockSupplyList(params) {
    return request({
      url: '/stockSupply/List',
      method: 'get',
      params
    })
  }

  export function getStockDetails(params) {
    console.log(params)
    return request({
      url: `/stockSupply/info/${params}`,
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