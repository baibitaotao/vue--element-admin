import request from '@/utils/request'

export function bannerList(params) {
  return request({
    url: '/banner/list',
    method: 'get',
    params
  })
}

export function bannerAdd(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}

export function bannerDetail(params) {
  return request({
    url: `/banner/detail/${params}`,
    method: 'get',
  })
}

export function bannerUpdate(data) {
  return request({
    url: `/banner/update`,
    method: 'put',
    data
  })
}