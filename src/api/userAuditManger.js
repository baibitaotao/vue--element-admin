import request from '@/utils/request'


export function userApprovalList(data) {
    return request({
      url: '/userApproval/list',
      method: 'post',
      data
    })
  }

  export function userApprovalApproval(data) {
    return request({
      url: '/userApproval/approval',
      method: 'put',
      data
    })
  }  

  export function userApprovalDetail(params) {
    return request({
      url: `/userApproval/detail/${params}`,
      method: 'get',
    })
  } 

  export function selectOrgUserByRoleCode(params) {
    return request({
      url: `/orgUser/selectOrgUserByRoleCode`,
      method: 'get',
      params
    })
  } 

  export function assignCustomerManager(data) {
    return request({
      url: `/userApproval/assignCustomerManager`,
      method: 'put',
      data
    })
  }