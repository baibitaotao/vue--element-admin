import request from '@/utils/request'
  
export function getStockSupplyList(params) {
    return request({
      url: '/stockSupply/List',
      method: 'get',
      params
    })
  }
