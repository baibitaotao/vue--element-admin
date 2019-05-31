import request from '@/utils/request'


export function Approval(data) {
    return request({
      url: '/userApproval/list',
      method: 'post',
      data
    })
  }