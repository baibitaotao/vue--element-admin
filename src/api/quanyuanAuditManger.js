import request from '@/utils/request'
  
export function stockDemandToReviewList(params) {
    return request({
      url: '/stockDemand/toReviewList',
      method: 'get',
      params
    })
  }

  export function stockSupplyToReviewList(params) {
    return request({
      url: '/stockSupply/toReviewList',
      method: 'get',
      params
    })
  }