import request from '@/utils/request'
  
export function stockDemandToReviewList(params) {
    return request({
      url: '/stockDemand/toReviewList',
      method: 'get',
      params
    })
  }

export function stockDemandReview(data,id) {
    return request({
      url: `/stockDemand/review/${id}`,
      method: 'put',
      data
    })
  } 
  
export function stockDemandToApproveList(params) {
    return request({
      url: `/stockDemand/toApproveList`,
      method: 'get',
      params
    })
  } 

  export function stockDemandApprove(data,id) {
    return request({
      url: `/stockDemand/approve/${id}`,
      method: 'put',
      data
    })
  } 


  export function stockSupplyToReviewList(params) {
    return request({
      url: '/stockSupply/toReviewList',
      method: 'get',
      params
    })
  }