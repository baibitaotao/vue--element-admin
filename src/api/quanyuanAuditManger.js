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

  export function stockSupplyReview(data,id) {
    return request({
      url: `/stockSupply/review/${id}`,
      method: 'put',
      data
    })
  }

  export function stockSupplyToApproveList(params) {
    return request({
      url: `/stockSupply/toApproveList`,
      method: 'get',
      params
    })
  }

  export function stockDemandRemindApprove(data) {
    return request({
      url: `/stockDemand/remindApprove`,
      method: 'put',
      data
    })
  }

  export function stockSupplyApprove(data,id) {
    return request({
      url: `/stockSupply/approve/${id}`,
      method: 'put',
      data
    })
  } 

  export function stockSupplyRemindApprove(data) {
    return request({
      url: `/stockSupply/remindApprove`,
      method: 'put',
      data
    })
  }

  