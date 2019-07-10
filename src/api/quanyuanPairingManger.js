import request from '@/utils/request'
  
export function stockReserveListStockReserve(data) {
    return request({
      url: '/stockReserve/listStockReserve',
      method: 'post',
      data
    })
  }


export function stockMatchTradeAdd(data) {
    return request({
      url: `/stockMatchTrade/add?reserveId=${data.reserveId}`,
      method: 'post',
      data
    })
  }  
  
  export function stockReserveListMatchStockSupply(data) {
    return request({
      url: `/stockReserve/listMatchStockSupply`,
      method: 'post',
      data
    })
  } 

  
  export function stockReserveListMatchStockDemand(data) {
    return request({
      url: `/stockReserve/listMatchStockDemand`,
      method: 'post',
      data
    })
  } 

  export function stockMatchTradeAddMatch(data) {
    return request({
      url: `/stockMatchTrade/addMatch?supplyId=${data.supplyId}&demandId=${data.demandId}&stockType=${data.stockType}`,
      method: 'post',
    })
  } 

  export function stockReserveListMatchStockDemandForSupply(data) {
    return request({
      url: `/stockReserve/listMatchStockDemandForSupply`,
      method: 'post',
      data
    })
  }

  export function stockReserveListMatchStockSupplyForDemand(data) {
    return request({
      url: `/stockReserve/listMatchStockSupplyForDemand`,
      method: 'post',
      data
    })
  }

  
  
  
