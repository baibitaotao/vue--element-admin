import request from '@/utils/request'
  
export function stockReserveListStockReserve(data) {
    return request({
      url: '/stockReserve/listStockReserve',
      method: 'post',
      data
    })
  }